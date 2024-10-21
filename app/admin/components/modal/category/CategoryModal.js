import React from 'react'
import ModalComp from '../ModalComp';
import { Input } from '@nextui-org/react';

const CategoryModal = ({
  isOpen,
  onOpenChange,
  isEditMode,
  categoryName,
  categoryColor,
  isCategoryNameValid,
  onCategoryNameChange,
  onCategoryColorChange,
  onSubmit
}) => {
  return (
    <ModalComp
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={isEditMode ? 'Update Category' : 'Add Category'}
      content={
        <>
          <Input
            type="text"
            label="Category name"
            placeholder="Enter Category name"
            labelPlacement="outside"
            value={categoryName}
            onChange={onCategoryNameChange}
            isRequired
            validationState={!isCategoryNameValid ? 'invalid' : 'valid'}
            errorMessage={!isCategoryNameValid ? 'Category name is required' : ''}
          />

          <Input
            type="color"
            label="Category color"
            placeholder="Choose Category color"
            labelPlacement="outside"
            value={categoryColor}
            onChange={onCategoryColorChange}
          />
        </>
      }
      btnTitle={isEditMode ? 'Update' : 'Save'}
      btnClose="Cancel"
      onAction={onSubmit}
    />
  )
}


export default CategoryModal
