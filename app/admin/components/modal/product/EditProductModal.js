import React, { Component } from 'react';
import { code, image, Input, Textarea } from '@nextui-org/react';
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
import { generateSlug } from '@/lib/slugHelper';
import { XIcon } from 'lucide-react';

class EditProductModal extends Component {
  constructor(props) {
    super(props);
    var { product } = this.props;
    var categorySlug = generateSlug(product.category.key)
    var brandSlug = product.brand.key

    this.state = {
      product: product,
      isProdNameInValid: false,
      isInValidCategory: false,
      isInvalidBrand: false,
      isInValidSize: false,
      isInvalidOriPrice: false,
      isInValidColor: false,
      isInValidPrice: false,
      isInValidStock: false,
      loading: false,
      productId: product.id || null,
      name: product.name || '',
      description: product.description || '',
      selectedSizes: product.sizes || [],
      stock: product.stock_quantity || '',
      discount: product.discount || '',
      categoryId: null || product.category.id,
      brandId: null || product.brand.id,
      selectedDiscountType: product.discount_type || '',
      selectedColors: [],
      selectedCategoryKey: categorySlug,
      selectedBrandKey: brandSlug,
      selectedColorIds: null,
      uploadedImageUrls: this.filterImages() || [],
      priceData: {
        oriCurrency: product.ori_currency || 'usd',
        currency: product.currency || 'usd',
        oriPrice: product.ori_price || '',
        price: product.price || ''
      },
    };
    console.log(product);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    this.colorRef = React.createRef();

  }

  componentDidMount() {
    this.filterColors();
  }

  filterColors() {
    const { product } = this.state;
    if (product.colors !== null) {
      var selectedColors = product.colors.map(item => ({
        id: item.id,
        value: item.name,
        code: item.code
      }));

      let colorIds = product.colors.map((item) => item.id);
      this.setState({
        selectedColors: selectedColors,
        selectedColorIds: colorIds
      })
      return
    }
  }

  filterImages() {
    const { images } = this.props.product;
    if (images !== null) {
      const imagesArray = images.map(item => item.image_url);
      return imagesArray;
    }
    return;
  }

  handleInputChange(field, value) {
    this.setState({ [field]: value });
  }

  onSelectionChangeCategory(categoryId) {
    if (!categoryId) {
      this.setState({
        isInValidCategory: true,
      });
    } else {
      this.setState({
        categoryId: categoryId,
        isInValidCategory: false,
      });
    }
  }

  handleChangeBrand(brandId) {
    if (!brandId) {
      this.setState({
        isInvalidBrand: true,
      });
    } else {
      this.setState({
        brandId: brandId,
        isInvalidBrand: false,
      });
    }
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
      uploadedImageUrls: [...prevState.uploadedImageUrls, ...urls],
      loading: false,
    }));
  };


  validateForm() {
    const { name, selectedCategoryKey, selectedBrandKey, selectedSizes, selectedColors, stock, priceData } = this.state;
    const { oriPrice, price } = priceData;

    return {
      isProdNameInValid: !name.trim(),
      isInValidCategory: !selectedCategoryKey,
      isInvalidBrand: !selectedBrandKey,
      isInValidSize: !(Array.isArray(selectedSizes) && selectedSizes.length > 0),
      isInValidColor: !(Array.isArray(selectedColors) && selectedColors.length > 0),
      isInValidStock: !stock,
      isInvalidOriPrice: !oriPrice,
      isInValidPrice: !price
    };
  }

  async handleUpdate() {
    const {
      productId,
      name,
      description,
      categoryId,
      brandId,
      selectedSizes,
      selectedColorIds,
      stock,
      discount,
      selectedDiscountType,
      uploadedImageUrls,
      priceData
    } = this.state;

    console.log("selectedColorIds", selectedColorIds);

    const { oriPrice, price } = priceData;

    const isValid = name.trim() && categoryId && brandId &&
      Array.isArray(selectedSizes) && selectedSizes.length > 0 &&
      oriPrice && Array.isArray(selectedColorIds) && selectedColorIds.length > 0 &&
      price && stock;

    if (!isValid) {
      this.setState({
        isProdNameInValid: !name.trim(),
        isInValidCategory: !categoryId,
        isInvalidBrand: !brandId,
        isInValidSize: !(Array.isArray(selectedSizes) && selectedSizes.length > 0),
        isInValidColor: !(Array.isArray(selectedColorIds) && selectedColorIds.length > 0),
        isInValidStock: !stock,
        priceData: {
          ...priceData,
          isInvalidOriPrice: !oriPrice,
          isInValidPrice: !price,
        }
      });
      return;
    }

    const slug = slugify(name);

    try {
      this.setState({ loading: true });

      const response = await ProductService.updateProduct(
        productId,
        name,
        slug,
        description,
        categoryId,
        brandId,
        selectedSizes,
        selectedColorIds,
        priceData,
        stock,
        discount,
        selectedDiscountType,
        uploadedImageUrls
      );

      if (response.ok) {
        toast.success('Product updated successfully');
        this.props.onOpenChange();
        this.props.reloadGetProductList();
      } else {
        toast.error(`Something went wrong: ${response.data || response.statusText}`);
      }
    } catch (error) {
      console.error("Error during product update:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      this.setState({ loading: false });
    }
  }

  removeImage(indexToRemove) {
    this.setState((prevState) => ({
      uploadedImageUrls: prevState.uploadedImageUrls.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  }

  render() {
    const {
      name,
      description,
      stock,
      selectedColors,
      selectedCategoryKey,
      selectedBrandKey,
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
      uploadedImageUrls,
      loading,
      product
    } = this.state;

    const { isOpen, onOpenChange, size, placement } = this.props;

    return (
      <ModalComp
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Edit Product"
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
                      label="Edit Product Name"
                      placeholder="Enter product name"
                      labelPlacement="outside"
                      className='shadow-none'
                      radius="xl"
                      value={name}
                      onChange={(e) => this.handleInputChange('name', e.target.value)}
                      isRequired
                      validationState={isProdNameInValid ? 'invalid' : 'valid'}
                      errorMessage={isProdNameInValid ? 'Product name is required' : ''}
                    />

                    <Textarea
                      label="Description"
                      labelPlacement="outside"
                      placeholder="Enter your description"
                      className="my-3"
                      value={description}
                      onChange={(e) => this.handleInputChange('description', e.target.value)}
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
                          ref={this.colorRef}
                          selectedColors={selectedColors}
                          isInValidColor={isInValidColor}
                          onChangeColor={this.handleChangeColors}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pricing and stock */}
                  <div className='bg-secondary p-4 rounded-md my-3 relative z-0'>
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

                      <div className="w-1/2">
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
                            <div key={index} className="relative border border-gray-500 p-2 rounded-md flex items-center">
                              <img
                                src={url}
                                alt={`Uploaded Image ${index + 1}`}
                                className="w-24 h-24 object-cover"
                              />
                              <XIcon
                                className="absolute top-1 right-1 bg-primary text-white rounded-md cursor-pointer"
                                onClick={() => this.removeImage(index)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='bg-secondary p-4 rounded-md my-3'>
                    <SelectCategoryComp
                      isInValidCategory={isInValidCategory}
                      selectedValueCategory={selectedCategoryKey}
                      onSelectionChangeCategory={this.onSelectionChangeCategory}
                    />
                    <SelectedBrandComp
                      isInvalidBrand={isInvalidBrand}
                      selectedValueBrand={selectedBrandKey}
                      onChangeBrand={this.handleChangeBrand}
                    />
                  </div>
                </div>
              </div>
            </form>
          </>
        }
        btnTitle={'Update'}
        btnClose="Cancel"
        onAction={this.handleUpdate}
      />
    );
  }
}

export default EditProductModal;
