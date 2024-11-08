import PropTypes from 'prop-types'; 
import { ColorService } from "@/app/(client)/services/colorService";
import { generateSlug } from "@/lib/slugHelper";
import React, { forwardRef, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const ColorComp = forwardRef(({ selectedColors, onChangeColor, isInValidColor }, ref) => {
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const getColorListOptions = async () => {
      try {
        const response = await ColorService.fetchColorsList();
        if (response.ok) {
          const result = response.data;
          const colorOptions = result.map((item) => ({
            id: item.id,
            value: generateSlug(item.name),
            key: `${item.id}-${item.name}`,
            label: item.name,
            code: item.code, 
          }));
          setColors(colorOptions);
        } else {
          toast.error("Failed to fetch colors.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching colors.");
        console.error("Error details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getColorListOptions();
  }, []);

  const handleSelectionChange = (selectedOptions) => {
    const selectedIds = selectedOptions ? selectedOptions.map((opt) => opt.id) : [];
    onChangeColor(selectedOptions);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: isInValidColor ? "red" : state.isFocused ? "gray" : base.borderColor,
      fontSize: "14px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      display: "flex",
      alignItems: "center",
    }),
    multiValueRemove: (base) => ({
      ...base,
      cursor: "pointer",
    }),
  };

  const formatOptionLabel = (option) => (
    <div className="flex gap-2 items-center">
      <span
        className="w-6 h-6 rounded-full border border-gray-300"
        style={{ backgroundColor: option.code }}
      ></span>
      {option.label}
    </div>
  );

  const selectedColorOptions = selectedColors.map((item) => ({
    value: generateSlug(item.value),
    label: item.value,
    code: item.code,
    id: item.id,
  }));

  return (
    <div className="w-full" ref={ref}>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Colors <span className='text-red-500'>*</span>
      </label>
      {isLoading ? (
        <p>Loading colors...</p>
      ) : (
        <Select
          isMulti
          options={colors}
          value={selectedColorOptions} 
          onChange={handleSelectionChange}
          placeholder="Select colors"
          classNamePrefix="react-select"
          theme={(theme) => ({
            ...theme,
            borderRadius: 8,
            colors: {
              ...theme.colors,
              primary: "#D4D4D8",
            },
          })}
          styles={customStyles}
          formatOptionLabel={formatOptionLabel}
        />
      )}
      {isInValidColor && (
        <p className="text-red-500 text-xs mt-1">Please select valid colors</p>
      )}
    </div>
  );
});

ColorComp.propTypes = {
  selectedColors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChangeColor: PropTypes.func.isRequired,
  isInValidColor: PropTypes.bool.isRequired,
};

export default ColorComp;
