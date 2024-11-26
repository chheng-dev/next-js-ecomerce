import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const DiscountTypeComp = ({ items, onSelectedDiscountType, selectedDiscountType }) => {
  const options = items.map((item) => ({
    value: item.value,
    label: item.label,
  }));

  const handleSelectionChange = (selectedOption) => {
    onSelectedDiscountType(selectedOption ? selectedOption.value : null);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      fontSize: "14px",
      borderRadius: "8px",
      borderColor: "#D1D5DB", // Tailwind's gray-300
      boxShadow: "none",
      "&:hover": {
        borderColor: "#9CA3AF", // Tailwind's gray-400
      },
    }),
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Discount Type
      </label>
      <Select
        options={options}
        value={options.find((option) => option.value === selectedDiscountType) || null} // Safeguard for invalid `selectedDiscountType`
        onChange={handleSelectionChange}
        placeholder="Select a discount"
        styles={customStyles}
        classNamePrefix="react-select"
      />
    </div>
  );
};

// Add PropTypes for validation
DiscountTypeComp.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectedDiscountType: PropTypes.func.isRequired,
  selectedDiscountType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

// Default Props
DiscountTypeComp.defaultProps = {
  selectedDiscountType: null,
};

export default DiscountTypeComp;
