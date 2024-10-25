import React from 'react';

const SizesComp = ({ items, onSizesChange, selectedSizes, isInValidSize }) => {
  const handleSizeClick = (sizeLabel) => {
    let updatedSelectedSizes;

    if (selectedSizes.includes(sizeLabel)) {
      updatedSelectedSizes = selectedSizes.filter((size) => size !== sizeLabel);
    } else {
      updatedSelectedSizes = [...selectedSizes, sizeLabel];
    }

    if (onSizesChange) {
      onSizesChange(updatedSelectedSizes);
    }
  };

  return (
    <>
      <label htmlFor="size" className="text-sm">
        Sizes<span className="text-red-500">*</span>
      </label>
      <span className="text-xs text-gray-500">
        <small>Pick Available sizes</small>
      </span>

      <div className="my-3 space-x-2 flex flex-wrap">
        {items.map((item, idx) => {
          const isSelected = selectedSizes.includes(item.label);
          return (
            <span
              key={idx} // Correct placement of key prop
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
      </div>
      {isInValidSize && (
        <span className='text-xs text-red-500'>Sizes is required</span>
      )}
    </>
  );
};

export default SizesComp;
