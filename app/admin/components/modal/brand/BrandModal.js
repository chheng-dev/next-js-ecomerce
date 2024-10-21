import React, { useState } from 'react'
import { Input } from '@nextui-org/react';
import ModalComp from '../ModalComp';
import { UploadButton } from '@/utils/uploadthing';

const BrandModal = ({
  isOpen,
  onOpenChange,
  isEditMode,
  brandName,
  brandIcon,
  isBrandNameValid,
  onBrandNameChange,
  onIconUploadComplete,
  onSubmit
}) => {
  const [loading, setLoading] = useState(false);

  return (

    <>
      < ModalComp
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={isEditMode ? 'Update Brand' : 'Add Brand'}
        content={
          <>
            <Input
              type="text"
              label="Brand name"
              placeholder="Enter Brand name"
              labelPlacement="outside"
              value={brandName}
              onChange={onBrandNameChange}
              isRequired
              validationState={!isBrandNameValid ? 'invalid' : 'valid'}
              errorMessage={!isBrandNameValid ? 'Brand name is required' : ''}
            />

            <div className='my-3'>
              <label htmlFor="">Image</label>
              {
                loading ? (
                  <span>Uploading...</span>
                ) : (
                  <UploadButton
                    className='bg-gray-100 rounded-md my-3 py-2'
                    endpoint="imageUploader"
                    onClientUploadStart={() => {
                      setLoading(true)
                    }}
                    onClientUploadComplete={(res) => {
                      setLoading(false)
                      const uploadedIconUrl = res ? res[0].url : null;
                      onIconUploadComplete(uploadedIconUrl)
                    }}
                    onUploadError={(error) => {
                      setLoading(false);
                      alert(`ERROR! ${error.message}`);
                    }}
                  />

                )
              }
              {
                brandIcon && (
                  <img
                    className='w-full h-[200px] bg-cover object-cover rounded-md'
                    alt={brandName}
                    src={brandIcon}
                  />
                )
              }
            </div>,
          </>
        }
        btnTitle={isEditMode ? 'Update' : 'Save'}
        btnClose="Cancel"
        onAction={onSubmit}
      />
    </>
  )
}


export default BrandModal
