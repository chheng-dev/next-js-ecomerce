import { BrandService } from '@/app/(client)/services/brandService';
import { generateSlug } from '@/lib/slugHelper';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

const SelectBrandComp = ({ selectedValueBrand, onChangeBrand, isInvalidBrand }) => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(selectedValueBrand || '');

  useEffect(() => {
    const getListBrands = async () => {
      try {
        const response = await BrandService.fetchBrandsList();
        if (response.ok) {
          const result = response.data;
          const brandsOption = result.map((item) => ({
            id: item.id,
            value: generateSlug(item.name), 
            label: item.name, 
          }));
          setBrands(brandsOption);
        } else {
          toast.error('Failed to fetch brands');
        }
      } catch (error) {
        toast.error('An error occurred while fetching brands');
        console.error('Error details:', error);
      }
    };
    getListBrands();
  }, []);

  useEffect(() => {
    if (selectedValueBrand !== selectedBrand) {
      setSelectedBrand(selectedValueBrand);
    }
  }, [selectedValueBrand]);

  const handleSelectionChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.id : '';
    setSelectedBrand(selectedValue);
    onChangeBrand(selectedValue); 
  };

  return (
    <div className="w-full mt-3">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Brand <span className='text-red-500'>*</span>
      </label>
      <Select
        options={brands}
        value={brands.find((brand) => brand.value === selectedBrand)} 
        onChange={handleSelectionChange} 
        placeholder="Select a brand"
        classNamePrefix="react-select"
        theme={(theme) => ({
          ...theme,
          borderRadius: '8px',
          colors: {
            ...theme.colors,
            primary: '#D4D4D8',
          },
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: isInvalidBrand ? 'red' : state.isFocused ? 'gray' : baseStyles.borderColor,
            fontSize: '14px',
          }),
        }}
      />
      {isInvalidBrand && <p className="text-red-500 text-xs mt-1">Please select a valid brand</p>}
    </div>
  );
};

export default SelectBrandComp;
