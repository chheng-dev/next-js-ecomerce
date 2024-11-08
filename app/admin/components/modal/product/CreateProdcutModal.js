import React, { Component } from 'react';
import { Input, Textarea } from '@nextui-org/react';
import ModalComp from '../ModalComp';
import { UploadButton } from '@/utils/uploadthing';
import SizesComp from '../../product/SizesComp';
import ColorComp from '../../product/ColorComp';
import DiscountTypeComp from '../../product/DiscountTypeComp';
import SelectCategoryComp from '../category/SelectCategoryComp';
import SelectedBrandComp from '../category/SelectedBrandComp';
import { sizes } from '@/lib/data/sizes';
import { discountTypes } from '@/lib/data/discountTypes';
import slugify from 'react-slugify';
import { toast } from 'react-toastify';
import { ProductService } from '@/app/(client)/services/productService';
import { ColorService } from '@/app/(client)/services/colorService';

class CreateProductModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isProdNameInValid: false,
      isInValidCategory: false,
      isInvalidBrand: false,
      isInValidSize: false,
      isInvalidOriPrice: false,
      isInValidColor: false,
      isInValidPrice: false,
      isInValidStock: false,
      name: "",
      description: '',
      selectedSizes: [],
      stock: null,
      discount: "",
      selectedDiscountType: "",
      selectedColors: [],
      selectedCategoryId: null,
      selectedBrandId: null,
      selectedColorIds: null,
      uploadedImageUrls: [],
      colorItems: [],
      priceData: {
        oriCurrency: 'usd',
        currency: 'usd',
        oriPrice: null,
        price: null,
        isInValidPrice: false,
        isInvalidOriPrice: false,
      }
    }

    this.handleProdNameChange = this.handleProdNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSizesChange = this.handleSizesChange.bind(this);
    this.handleChangeColors = this.handleChangeColors.bind(this);
    this.handleChangeOriPrice = this.handleChangeOriPrice.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleOriCurrencyChange = this.handleOriCurrencyChange.bind(this);
    this.handleStockQuantity = this.handleStockQuantity.bind(this);
    this.handleDiscount = this.handleDiscount.bind(this);
    this.handleSelectedDiscountType = this.handleSelectedDiscountType.bind(this);
    this.onSelectionChangeCategory = this.onSelectionChangeCategory.bind(this);
    this.handleChangeBrand = this.handleChangeBrand.bind(this);
    this.onIconUploadComplete = this.onIconUploadComplete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getColorsList();
  }

  async getColorsList() {
    try {
      const response = await ColorService.fetchColorsList();
      if (response.ok) {
        this.setState({ colorItems: response.data });
      } else {
        toast.error(`Failed to fetch colors:)`);
      }
    } catch (error) {
      toast.error('An error occurred while fetching colors');
      console.error('Error details:', error);
    }
  }

  handleProdNameChange(e) {
    const value = e.target.value;

    this.setState({
      name: value,
      isProdNameInValid: !value,
    });
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  handleSizesChange(selectedSizes) {
    if (!selectedSizes) {
      this.setState({
        isInValidSize: true,
      });
    } else {
      this.setState({
        selectedSizes: selectedSizes,
        isInValidSize: false,
      });
    }
  }

  handleChangeColors(selectedOptions) {
    const selectedIds = selectedOptions ? selectedOptions.map((opt) => opt.id) : [];
    this.setState({
      selectedColors: selectedOptions,
      selectedColorIds: selectedIds,
      isInValidColor: selectedOptions.length === 0,
    });
  };

  handleChangeOriPrice(key, value) {
    console.log(key, value);
    this.setState((prevState) => ({
      priceData: {
        ...prevState.priceData,
        [key]: value,
        isInvalidOriPrice: !value
      }
    }));
  }

  handleChangePrice(value) {
    this.setState((prevState) => ({
      priceData: {
        ...prevState.priceData,
        price: value,
        isInValidPrice: !value
      }
    }));
  }

  handleOriCurrencyChange(value) {
    this.setState(
      (prevState) => ({
        priceData: {
          ...prevState.priceData,
          oriCurrency: value
        }
      }),
      () => this.convertOriPrices(value)
    );
  }

  handleCurrencyChange(value) {
    this.setState(
      (prevState) => ({
        priceData: {
          ...prevState.priceData,
          currency: value
        }
      }),
      () => this.convertPrices(value)
    );
  }

  handleStockQuantity(e) {
    const value = e.target.value;
    if (!value) {
      this.setState({
        isInValidStock: true,
      });
    } else {
      this.setState({
        stock: value,
        isInValidStock: false,
      });
    }
  }

  handleDiscount(e) {
    const value = e.target.value;
    if (!value) {
      this.setState({
        discount: '',
      });
    } else {
      this.setState({
        discount: value,
      });
    }
  }

  handleSelectedDiscountType(value) {
    if (!value) {
      this.setState({
        selectedDiscountType: '',
      });
    } else {
      this.setState({
        selectedDiscountType: value,
      });
    }
  }

  onSelectionChangeCategory(key) {
    if (!key) {
      this.setState({
        isInValidCategory: true,
      });
    } else {
      this.setState({
        selectedCategoryId: key,
        isInValidCategory: false,
      });
    }
  }

  handleChangeBrand(key) {
    if (!key) {
      this.setState({
        isInvalidBrand: true,
      });
    } else {
      this.setState({
        selectedBrandId: key,
        isInvalidBrand: false,
      });
    }
  }

  convertOriPrices(oriCurrency) {
    this.setState((prevState) => {
      const oriPrice = parseFloat(prevState.priceData.oriPrice) || 0;
      const updatedPriceData = { ...prevState.priceData };

      if (oriCurrency === 'usd') {
        updatedPriceData.oriPrice = (oriPrice / 4000).toFixed(2);
      } else if (oriCurrency === 'riel') {
        updatedPriceData.oriPrice = (oriPrice * 4000).toFixed(2);
      }

      return { priceData: updatedPriceData };
    });
  }

  convertPrices(currency) {
    this.setState((prevState) => {
      const price = parseFloat(prevState.priceData.price) || 0;
      const updatedPriceData = { ...prevState.priceData };

      if (currency === 'usd') {
        updatedPriceData.price = (price / 4000).toFixed(2);
      } else if (currency === 'riel') {
        updatedPriceData.price = (price * 4000).toFixed(2);
      }

      return { priceData: updatedPriceData };
    });
  }

  onIconUploadComplete = (urls) => {
    this.setState((prevState) => ({
      uploadedImageUrls: [...prevState.uploadedImageUrls, ...urls], // Append new URLs to the existing list
      loading: false,
    }));
  };

  resetForm() {
    this.setState({
      name: '',
      description: '',
      oriPrice: '',
      price: '',
      stock: "",
      discount: "",
      selectedDiscountType: null,
      selectedColors: [],
      selectedSizes: [],
      selectedBrandId: null,
      selectedCategoryId: null,
      uploadedImageUrls: [],
      isProdNameInValid: false,
      isInValidCategory: false,
      isInvalidBrand: false,
      isInValidSize: false,
      isInValidColor: false,
      isInValidStock: false,
      priceData: {
        isInvalidOriPrice: false,
        isInValidPrice: false,
        oriCurrency: 'usd',
        currency: 'usd',
        oriPrice: '',
        price: '',
      }
    });
  }

  async handleSubmit() {
    const {
      name,
      description,
      selectedCategoryId,
      selectedBrandId,
      selectedSizes,
      selectedColorIds,
      stock,
      discount,
      selectedDiscountType,
      uploadedImageUrls,
      priceData
    } = this.state;

    const { oriPrice, price, currency, oriCurrency } = priceData;

    // Validation checks
    const isValid =
      name.trim() &&
      selectedCategoryId &&
      selectedBrandId &&
      Array.isArray(selectedSizes) &&
      selectedSizes.length > 0 &&
      oriPrice &&
      Array.isArray(selectedColorIds) &&
      selectedColorIds.length > 0 &&
      price &&
      stock;

    if (!isValid) {
      this.setState({
        isProdNameInValid: !name.trim(),
        isInValidCategory: !selectedCategoryId,
        isInvalidBrand: !selectedBrandId,
        isInValidSize: !(Array.isArray(selectedSizes) && selectedSizes.length > 0),
        priceData: {
          isInvalidOriPrice: !oriPrice,
          isInValidPrice: !price,
          oriCurrency: oriCurrency,
          currency: currency
        },
        isInValidColor: !(Array.isArray(selectedColorIds) && selectedColorIds.length > 0),
        isInValidStock: !stock,
      });
      return;
    }

    const slug = slugify(name);

    try {
      this.setState({
        loading: true,
        isProdNameInValid: false,
        isInValidCategory: false,
        isInvalidBrand: false,
        isInValidSize: false,
        isInvalidOriPrice: false,
        isInValidPrice: false,
        isInValidColor: false,
        isInValidStock: false,
      });

      const response = await ProductService.createProduct(
        name,
        slug,
        description,
        selectedCategoryId,
        selectedBrandId,
        selectedSizes,
        selectedColorIds,
        priceData,
        stock,
        discount,
        selectedDiscountType,
        uploadedImageUrls
      );

      if (response.ok) {
        toast.success('New Product created successfully');
        this.props.getListProducts();
        this.resetForm();
      } else {
        toast.error(`Something went wrong: ${response.data || response.statusText}`);
      }
    } catch (error) {
      console.error("Error during product submit:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      name,
      description,
      stock,
      selectedColors,
      selectedCategoryId,
      selectedBrandId,
      isProdNameInValid,
      isInValidSize,
      isInValidColor,
      isInValidStock,
      discount,
      priceData,
      selectedDiscountType,
      selectedSizes,
      isInvalidBrand,
      isInValidCategory,
      uploadedImageUrls
    } = this.state;

    const {
      isOpen,
      onOpenChange,
      size,
      placement
    } = this.props;

    return (
      <ModalComp
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Add New Product"
        size={size}
        placement={placement}
        content={
          <>
            <form>
              <div className='flex gap-4 items-start justify-between'>
                <div className='w-4/6'>
                  <div className='bg-secondary p-4 rounded-md'>
                    <h5 className='pb-6 font-semibold'>General Information</h5>
                    <Input
                      type="text"
                      label="New Product"
                      placeholder="Enter product name"
                      labelPlacement="outside"
                      className='shadow-none'
                      raduis="xl"
                      value={name}
                      onChange={this.handleProdNameChange}
                      isRequired
                      validationState={isProdNameInValid ? 'invalid' : 'valid'}
                      errorMessage={isProdNameInValid ? 'New product name is required' : ''}
                    />

                    <Textarea
                      label="Description"
                      labelPlacement="outside"
                      placeholder="Enter your description"
                      className="my-3"
                      value={description}
                      onChange={this.handleDescriptionChange}
                    />

                    <div className='flex items-center justify-between'>
                      <div className='flex w-1/2 flex-col'>
                        <SizesComp
                          items={sizes}
                          isInValidSize={isInValidSize}
                          selectedSizes={selectedSizes}
                          onSizesChange={this.handleSizesChange}
                        />
                      </div>

                      <div className='w-1/2'>
                        <ColorComp
                          items={this.state.colorItems}
                          selectedColors={selectedColors}
                          isInValidColor={isInValidColor}
                          onChangeColor={this.handleChangeColors}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing and stock */}
                  <div className='bg-secondary p-4 rounded-md my-3'>
                    <h5 className='pb-6 font-semibold'>Pricing And Stock</h5>
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-1/2">
                        <Input
                          label="Original Price"
                          placeholder="0.00"
                          labelPlacement="outside"
                          value={priceData.oriPrice}
                          onChange={(e) => this.handleChangeOriPrice('oriPrice', e.target.value)}
                          isRequired
                          validationState={priceData.isInvalidOriPrice ? 'invalid' : 'valid'}
                          errorMessage={priceData.isInvalidOriPrice ? 'Original price is required' : ''}
                          startContent={
                            <span className="text-default-400 text-small">
                              {priceData.oriCurrency === 'usd' ? '$' : '៛'}
                            </span>
                          }
                          endContent={
                            <select
                              className="outline-none border-0 bg-transparent text-default-400 text-small"
                              value={priceData.oriCurrency}
                              onChange={(e) => this.handleOriCurrencyChange(e.target.value)}
                            >
                              <option value="usd">USD</option>
                              <option value="riel">RIEL</option>
                            </select>
                          }
                          type="number"
                        />
                      </div>

                      <div className="w-1/2 relative z-0">
                        <Input
                          label="Price"
                          placeholder="0.00"
                          labelPlacement="outside"
                          value={priceData.price}
                          onChange={(e) => this.handleChangePrice(e.target.value)}
                          isRequired
                          validationState={priceData.isInValidPrice ? 'invalid' : 'valid'}
                          errorMessage={priceData.isInValidPrice ? 'Price is required' : ''}
                          startContent={
                            <span className="text-default-400 text-small">
                              {priceData.currency === 'usd' ? '$' : '៛'}
                            </span>
                          }
                          endContent={
                            <select
                              className="outline-none border-0 bg-transparent text-default-400 text-small"
                              value={priceData.currency}
                              onChange={(e) => this.handleCurrencyChange(e.target.value)}
                            >
                              <option value="usd">USD</option>
                              <option value="riel">RIEL</option>
                            </select>
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
                          placeholder="Enter quantity of stock"
                          labelPlacement="outside"
                          className='shadow-none'
                          raduis="xl"
                          isRequired
                          value={stock}
                          validationState={isInValidStock ? 'invalid' : 'valid'}
                          errorMessage={isInValidStock ? 'Stock quantity is required' : ''}
                          onChange={this.handleStockQuantity}
                        />
                      </div>

                      <div className='w-1/3'>
                        <Input
                          type="number"
                          label="Discount"
                          placeholder="0%"
                          labelPlacement="outside"
                          value={discount}
                          endContent={<span className="text-default-400 text-small">%</span>}
                          onChange={this.handleDiscount}
                        />
                      </div>

                      <div className='w-1/3'>
                        <DiscountTypeComp
                          items={discountTypes}
                          selectedDiscountType={selectedDiscountType}
                          onSelectedDiscountType={this.handleSelectedDiscountType}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className='w-2/6'>
                  <div className="bg-secondary p-4 rounded-md">
                    <label htmlFor="images">Upload Images</label>

                    <UploadButton
                      multiple
                      className="bg-gray-100 rounded-md my-3 py-2"
                      endpoint="imageUploader"
                      onClientUploadStart={() => this.setState({ loading: true })}
                      onClientUploadComplete={(res) => {
                        const uploadedIconUrls = res.map((file) => file.url);
                        this.onIconUploadComplete(uploadedIconUrls);
                      }}
                      onUploadError={(error) => {
                        this.setState({ loading: false });
                        alert(`ERROR! ${error.message}`);
                      }}
                    />

                    {this.state.loading && <p>Uploading...</p>}

                    {uploadedImageUrls.length > 0 && (
                      <div className="mt-4">
                        <h5 className="pb-3 font-semibold">Uploaded Images:</h5>
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
                    )}
                  </div>

                  <div className='bg-secondary p-4 rounded-md my-3'>
                    <SelectCategoryComp
                      isInValidCategory={isInValidCategory}
                      selectedValueCategory={selectedCategoryId}
                      onSelectionChangeCategory={this.onSelectionChangeCategory}
                    />
                    <SelectedBrandComp
                      isInvalidBrand={isInvalidBrand}
                      selectedValueBrand={selectedBrandId}
                      onChangeBrand={this.handleChangeBrand}
                    />
                  </div>
                </div>
              </div>
            </form>
          </>
        }
        btnTitle={'Save'}
        btnClose="Cancel"
        onAction={this.handleSubmit}
      />
    );
  }
}

export default CreateProductModal;
