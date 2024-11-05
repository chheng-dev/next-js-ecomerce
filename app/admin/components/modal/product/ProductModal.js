import React, { useState } from 'react'
import { Input, Textarea } from '@nextui-org/react';
import ModalComp from '../ModalComp';
import { UploadButton } from '@/utils/uploadthing';
import SizesComp from '../../product/SizesComp';
import ColorComp from '../../product/ColorComp';
import DiscountTypeComp from '../../product/DiscountTypeComp';
import SelectCategoryComp from '../category/SelectCategoryComp';
import SelectedBrandComp from '../category/SelectedBrandComp';
import { colorItems } from '@/lib/data/colors';
import { sizes } from '@/lib/data/sizes';
import { discountTypes } from '@/lib/data/discountTypes';

const ProductModal = ({
  isOpen,
  onOpenChange,
  isEditMode,
  prodName,
  description,
  stock,
  selectedColors,
  selectedCategoryId,
  selectedBrandId,
  isProdNameValid,
  isInValidSize,
  isInvalidOriPrice,
  isInValidColor,
  isInValidStock,
  onProdNameChange,
  size,
  discount,
  priceData,
  selectedDiscountType,
  selectedSizes,
  placement,
  isInvalidBrand,
  isInValidCategory,
  isInValidPrice,
  onSelectionChangeCategory,
  onDescriptionChange,
  onSelectedSizes,
  onChangeColor,
  onChangeOriPrice,
  selectedOriCurrency,
  selectedCurrency,
  onChangeStockQuantity,
  onChangeDiscount,
  onSelectedDiscountType,
  onChangeBrand,
  onChangePrice,
  onChangeCurrency,
  onChangeOriCurrency,
  onUploadImageUrls,
  onSubmit
}) => {

  const [loading, setLoading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  const onIconUploadComplete = (urls) => {
    setUploadedImageUrls((prevUrls) => [...prevUrls, ...urls]);
    onUploadImageUrls(uploadedImageUrls);
  };

  const handleSizesChange = (sizes) => {
    onSelectedSizes(sizes);
  }
  return (
    <>
      < ModalComp
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={isEditMode ? 'Update Product' : 'Add New Product'}
        size={size}
        placement={placement}
        content={
          <>
            <form>
              <div className='flex gap-4 items-start justify-between'>
                <div className='w-4/6'>
                  <div className='bg-secondary p-4 rounded-md'>
                    <h5 className='pb-6 font-semibold'>General Infomation</h5>
                    <Input
                      type="text"
                      label="New Product"
                      placeholder="Enter product name"
                      labelPlacement="outside"
                      className='shadow-none'
                      raduis="xl"
                      value={prodName}
                      onChange={onProdNameChange}
                      isRequired
                      validationState={!isProdNameValid ? 'invalid' : 'valid'}
                      errorMessage={!isProdNameValid ? 'New product name is required' : ''}
                    />

                    <Textarea
                      label="Description"
                      labelPlacement="outside"
                      placeholder="Enter your description"
                      className="my-3"
                      value={description}
                      onChange={onDescriptionChange}
                    />

                    <div className='flex items-center justify-between'>
                      <div className='flex w-1/2 flex-col'>
                        <SizesComp
                          items={sizes}
                          isInValidSize={isInValidSize}
                          selectedSizes={selectedSizes}
                          onSizesChange={handleSizesChange}
                        />
                      </div>

                      <div className='w-1/2'>
                        <ColorComp
                          items={colorItems}
                          selectedColors={selectedColors}
                          isInValidColor={isInValidColor}
                          onChangeColor={(selected) => onChangeColor(selected)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing and stock  */}
                  <div className='bg-secondary p-4 rounded-md my-3'>
                    <h5 className='pb-6 font-semibold'>Pricing And Stock</h5>

                    {/* Product Prices  */}
                    <div className="flex items-center justify-between gap-4">
                      {/* Original Price Input */}
                      <div className="w-1/2">
                        <Input
                          label="Original Price"
                          placeholder="0.00"
                          labelPlacement="outside"
                          value={priceData.oriPrice}
                          onChange={(e) => onChangeOriPrice('oriPrice', e.target.value)} // Update the value directly
                          isRequired
                          validationState={priceData.isInvalidOriPrice ? 'invalid' : 'valid'}
                          errorMessage={priceData.isInvalidOriPrice ? 'Original price is required' : ''}
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                {priceData.oriCurrency === 'usd' ? '$' : '៛'}
                              </span>
                            </div>
                          }
                          endContent={
                            <div className="flex items-center">
                              <label className="sr-only" htmlFor="currency-ori">
                                Original Currency
                              </label>
                              <select
                                className="outline-none border-0 bg-transparent text-default-400 text-small"
                                id="currency-ori"
                                name="oriCurrency"
                                value={priceData.oriCurrency}
                                onChange={(e) => onChangeOriCurrency(e.target.value)}
                              >
                                <option value="usd">USD</option>
                                <option value="riel">RIEL</option>
                              </select>
                            </div>
                          }
                          type="number"
                        />
                      </div>

                      {/* Price Input */}
                      <div className="w-1/2">
                        <Input
                          label="Price"
                          placeholder="0.00"
                          labelPlacement="outside"
                          value={priceData.price}
                          onChange={(e) => onChangePrice("price", e.target.value)}
                          isRequired
                          validationState={priceData.isInValidPrice ? 'invalid' : 'valid'}
                          errorMessage={priceData.isInValidPrice ? 'Price is required' : ''}
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                {priceData.currency === 'usd' ? '$' : '៛'}
                              </span>
                            </div>
                          }
                          endContent={
                            <div className="flex items-center">
                              <label className="sr-only" htmlFor="currency-price">
                                Currency
                              </label>
                              <select
                                className="outline-none border-0 bg-transparent text-default-400 text-small"
                                id="currency-price"
                                name="currency"
                                value={priceData.currency}
                                onChange={(e) => onChangeCurrency(e.target.value)}
                              >
                                <option value="usd">USD</option>
                                <option value="riel">RIEL</option>
                              </select>
                            </div>
                          }
                          type="number"
                        />
                      </div>
                    </div>


                    <div className='flex items-center justify-between gap-4 my-4'>
                      <div className='w-1/3'>
                        <Input
                          type="number"
                          label="Stock"
                          placeholder="Enter quantiry of stock"
                          labelPlacement="outside"
                          className='shadow-none'
                          raduis="xl"
                          isRequired
                          value={stock}
                          validationState={isInValidStock ? 'invalid' : 'valid'}
                          errorMessage={isInValidStock ? 'Stock quatity is required' : ''}
                          onChange={onChangeStockQuantity}
                        />
                      </div>

                      <div className='w-1/3'>
                        <Input
                          type="number"
                          label="Discount"
                          placeholder="0%"
                          labelPlacement="outside"
                          value={discount}
                          endContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">%</span>
                            </div>
                          }
                          onChange={onChangeDiscount}
                        />
                      </div>
                      <div className='w-1/3'>
                        <DiscountTypeComp
                          items={discountTypes}
                          selectedDiscountType={selectedDiscountType}
                          onSelectedDiscountType={onSelectedDiscountType}
                        />
                      </div>


                    </div>

                  </div>
                </div>
                <div className='w-2/6'>

                  {/* Upload multiple image  */}
                  <div className='bg-secondary p-4 rounded-md'>
                    <label htmlFor='images'>Upload Images</label>
                    <UploadButton
                      multiple
                      className='bg-gray-100 rounded-md my-3 py-2'
                      endpoint="imageUploader"
                      onClientUploadStart={() => {
                        setLoading(true);
                      }}
                      onClientUploadComplete={(res) => {
                        setLoading(false);
                        const uploadedIconUrls = res.map(file => file.url);
                        onIconUploadComplete(uploadedIconUrls);
                      }}
                      onUploadError={(error) => {
                        setLoading(false);
                        alert(`ERROR! ${error.message}`);
                      }}
                    />

                    <div className="mt-4">
                      {uploadedImageUrls.length > 0 && (
                        <h5 className='pb-3 font-semibold'>Uploaded Images:</h5>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {uploadedImageUrls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Uploaded Image ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-md border border-gray-300"
                          />
                        ))}
                      </div>
                    </div>

                    {loading && <p>Uploading...</p>}

                  </div>

                  {/* Category and Brand  */}
                  <div className='bg-secondary p-4 rounded-md my-3'>
                    <h5 className='font-semibold'>Category And Brand</h5>
                    <div className='pt-6'>
                      <SelectCategoryComp
                        isInValidCategory={isInValidCategory}
                        selectedValueCategory={selectedCategoryId}
                        onSelectionChangeCategory={onSelectionChangeCategory}
                      />

                      <SelectedBrandComp
                        isInvalidBrand={isInvalidBrand}
                        selectedValueBrand={selectedBrandId}
                        onChangeBrand={onChangeBrand}
                      />
                    </div>
                  </div>
                </div>
              </div >
            </form>
          </>
        }
        btnTitle={isEditMode ? 'Update' : 'Save'}
        btnClose="Cancel"
        onAction={onSubmit}
      />
    </>
  )
}
export default ProductModal
