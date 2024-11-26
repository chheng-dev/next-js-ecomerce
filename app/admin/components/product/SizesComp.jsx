 import React from 'react';

const SizesComp = ({ items, isInValidSize, selectedSizes, onSizesChange }) => {
  const safeSelectedSizes = Array.isArray(selectedSizes) ? selectedSizes : [];

  const handleSizeClick = (size) => {
    const updatedSizes = safeSelectedSizes.includes(size)
      ? safeSelectedSizes.filter((item) => item !== size) 
      : [...safeSelectedSizes, size]; 
      
    onSizesChange(updatedSizes);
  };

  return (
    <div className="my-3 space-x-2 flex flex-wrap">
      <div className='w-full mb-2'>
        <label htmlFor="size" className='text-sm'>Sizes 
          <span className='text-red-500'>*</span>
        </label>
      </div>
      {items.map((item, idx) => {
        const isSelected = safeSelectedSizes.includes(item.label);
        return (
          <span
            key={idx}
            onClick={() => handleSizeClick(item.label)}
            className={`
              inline-flex 
              items-center 
              justify-center 
              rounded-md p-3 
              uppercase 
              text-xs 
              cursor-pointer 
              transition 
              duration-300 
              ${isSelected ? 'bg-primary text-white' : 'bg-[#EFEFEE] text-black'}
              ${isInValidSize ? 'border border-red-500' : ''}
            `}
            style={{ width: '30px', height: '30px' }}
          >
            {item.label}
          </span>
        );
      })}
      {isInValidSize && (
        <span className="text-xs text-red-500 my-1">Sizes are required</span>
      )}
    </div>
  );
};

export default SizesComp;
