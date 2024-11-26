import { CategoryService } from '@/app/(client)/services/categoryService';
import { generateSlug } from '@/lib/slugHelper';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';

const SelectCategoryComp = ({ selectedValueCategory, onSelectionChangeCategory, isInValidCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(selectedValueCategory || '');

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await CategoryService.fetchCategories();
        if (response.ok) {
          const result = response.data;
          const categoriesOption = result.map(item => ({
            id: item.id,
            value: generateSlug(item.title),  
            label: item.title,
          }));
          setCategories(categoriesOption);
        } else {
          toast.error(`Failed to fetch categories.`);
        }
      } catch (error) {
        toast.error('An error occurred while fetching categories');
        console.error('Error details:', error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedValueCategory !== selectedCategory) {
      setSelectedCategory(selectedValueCategory);
    }
  }, [selectedValueCategory]);

  const handleSelectionChange = (selectedOption) => {
    const categoryId = selectedOption ? selectedOption.id : '';
    setSelectedCategory(categoryId);
    onSelectionChangeCategory(categoryId); 
  };

  const selectedCategoryObj = categories.find(cat => cat.value === selectedCategory);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Category <span className='text-red-500'>*</span>
      </label>
      <Select
        onChange={handleSelectionChange}
        options={categories}
        isInvalid={isInValidCategory}
        placeholder="Select a category"
        classNamePrefix="react-select text-xs"
        theme={(theme) => ({
          ...theme,
          borderRadius: '10px',
          colors: {
            ...theme.colors,
            primary: '#D4D4D8',
          },
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? 'grey' : '',
            fontSize: '14px',
          }),
        }}
        value={selectedCategoryObj}  // Ensure the selected category is correctly passed as an object
      />
      {isInValidCategory && <p className="text-red-500 text-xs mt-1">Please enter a valid category</p>}
    </div>
  );
};

export default SelectCategoryComp;
