"use client"
import React, { Component } from 'react'
import {  Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, User } from '@nextui-org/react';
import ProductModal from '../components/modal/product/ProductModal';
import { ProductService } from '@/app/(client)/services/productService';
import Humanize from '@/lib/humanize';
import { EllipsisVertical } from 'lucide-react';
import Currency from '@/lib/formatterAmount';
import slugify from 'react-slugify';
import { toast } from 'react-toastify';
import { removeSlug } from '@/lib/removeSlug';
import PropTypes from 'prop-types';
import { percentage } from '@/lib/percentage';
import ModalComp from '../components/modal/ModalComp';

class ProductPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      products: [],
      isModalOpen: false,
      productToEdit: null,
      isProdNameValid: false,
      isInValidCategory: false,
      isInvalidBrand: false,
      isInValidSize: false,
      isInvalidOriPrice: false,
      isInValidColor: false,
      isInValidPrice: false,
      isInValidStock: false,
      prodName: "",
      description: '',
      selectedSizes: [],
      oriPrice: null,
      price: null,
      stock: null,
      discount: "",
      selectedDiscountType: "",
      selectedColors: [],
      category: null,
      selectedOriCurrency: 'usd',
      selectedCurrency:'usd',
      selectedCategoryId: null,
      selectedBrandId: null,
      imageUrls: null,
      brandId: null,
      page: 1,
      rowsPerPage: 10,
      isDeleteModalOpen: false,
      priceData: {
        oriCurrency: 'usd',
        currency: 'usd',
        oriPrice: null,
        price: null,
        isInValidPrice: false,
        isInvalidOriPrice: false,
      }
    }

    this.handleOpenChange = this.handleOpenChange.bind(this);
    this.handleProdNameChange = this.handleProdNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectedSized = this.handleSelectedSized.bind(this);
    this.onSelectionChangeCategory = this.onSelectionChangeCategory.bind(this);
    this.handleChangeBrand = this.handleChangeBrand.bind(this);
    this.handleChangeColors = this.handleChangeColors.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeOriPrice = this.handleChangeOriPrice.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleOriCurrencyChange = this.handleOriCurrencyChange.bind(this);
    this.handleStockQuantity = this.handleStockQuantity.bind(this);
    this.handleDiscount = this.handleDiscount.bind(this);
    this.handleSelectedDiscountType = this.handleSelectedDiscountType.bind(this);
    this.handleUploadImageUrls = this.handleUploadImageUrls.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
  }

  componentDidMount(){
    this.getListProducts();
  }

  async getListProducts() {
    try {
      const response = await ProductService.fetchProductsList();
      if (response.ok) {
        this.setState({ products: response.data });
      } else {
        toast.error(`Failed to fetch products:)`);
      }
    } catch (error) {
      toast.error('An error occurred while fetching products');
      console.error('Error details:', error);
    }
  }
  

  handleOpenChange(open, product = null){
    if(open && product){
      this.setState({ 
        isModalOpen: true,
        productToEdit: product,
        isProdNameValid: true,
        isInValidCategory: true,
        isInvalidBrand: true,
        isInValidSize: true,
        isInValidStock: true,
        imageUrls: null,
        priceData: {
          isInvalidOriPrice: true,
          isInValidPrice: true,
          oriCurrency: 'usd',
          currency: 'usd',
          oriPrice: '',
          price: '',
        }
      });  
    } else{
      this.setState({
        isModalOpen: open
      });

      this.resetForm();
    }
  }

  async fetchProductsById(id){
    try {
      this.setState({ loading: true})
      const response = await ProductService.getProductById(id)

      if (response.ok) {
        this.setState({ productById: response.data });
      } else {
        toast.error('Failed to fetching product');
      }
    } catch (error) {
      toast.error('An error occurred while fetching the product');
      console.error('Error details:', error);
    } finally {
      this.setState({
        loading: false,
      })
    }
  }
  
  handleEditProduct(product){
    this.setState({ 
      isModalOpen: true,
      productToEdit: product,
      prodName: product.name,
      description: product.description,
      oriPrice: product.ori_price,
      price: product.price,
      stock: product.stock_quantity,
      discount: product.discount,
      selectedDiscountType: product.discount_type,
      selectedCategoryId: product.category_name,
      isProdNameValid: true,
      isInValidStock: false,
      isInValidPrice: false,
      isInvalidOriPrice: false,
    });
  }

  handleConfirmModalOpen(open) {
    this.setState({ isDeleteModalOpen: open });
  }

  handleDeleteClick(product){
    this.setState({ 
      isDeleteModalOpen: true,
      productToEdit: product.id,
    });
  }

  async handleDeleteConfirm(){
    const {productToEdit} = this.state;
    try {
      this.setState({ loading: true})
      const response = await ProductService.deleteProduct(productToEdit);

      if (response.ok) {
        this.getListProducts();
        toast.success('Product deleted successfully!');
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the product');
      console.error('Error details:', error);
    } finally {
      this.setState({
        loading: false,
        isDeleteModalOpen: false
      })
    }
  }

  handleProdNameChange(e){
    this.setState({ 
      prodName: e.target.value, 
      isProdNameValid: true,
    });
  }

  handleDescriptionChange(e){
    this.setState({ description: e.target.value });
  }
  
  onSelectionChangeCategory(e) {
    const value = e.target.value; 
  
    if (!value) {
      this.setState({ 
        isInValidCategory: true, 
      });
    } else {
      this.setState({ 
        selectedCategoryId: value, 
        isInValidCategory: false, 
      });
    }
  }

  handleChangeBrand(e){
    const value = e.target.value; 
    if (!value) {
      this.setState({ 
        isInvalidBrand: true, 
      });
    } else {
      this.setState({ 
        selectedBrandId: value, 
        isInvalidBrand: false, 
      });
    }
  }
  
  handleSelectedSized(selectedSizes){
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

  handleChangeColors(e) {
    const value = e.target.value;

    if (!value) {
      this.setState({ 
        isInValidColor: true,
      });
    } else {
      const selecteItems = Array.isArray(value) ?  value : [value];
      console.log(selecteItems)
      this.setState({ 
        selectedColors: selecteItems,
        isInValidColor: false, 
      });
    }
  } 

  handleChangeOriPrice(key, value) {
    this.setState((prevState) => ({
      priceData: {
        ...prevState.priceData,
        [key]: value,
        isInvalidOriPrice: !value
      }
    }));
  }

  handleChangePrice(key, value) {
    this.setState((prevState) => ({
      priceData: {
        ...prevState.priceData,
        [key]: value,
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

  handleStockQuantity(e){
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

  handleDiscount(e){
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

  handleSelectedDiscountType(e){
    const value = e.target.value;
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

  resetForm() {
    this.setState({
      prodName: '', 
      description: '', 
      oriPrice: '',
      price: '',
      stock: "",
      discount: "",
      selectedDiscountType: null,
      selectedColors: "",
      selectedSizes: [],
      selectedBrandId: null,
      selectedCategoryId: null,
      isProdNameValid: true,
      productToEdit: null,
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
  
  handleUploadImageUrls(urls) {
    if (urls && urls.length > 0) {
      this.setState((prevState) => ({
        imageUrls: [...prevState.imageUrls, ...urls],
      }));
    } else {
      this.setState({ imageUrls: [] }); 
    }
  }

  async handleSubmit() {
    const {
      productToEdit,
      prodName,
      description,
      selectedCategoryId,
      selectedBrandId,
      selectedSizes,
      selectedColors,
      stock,
      discount,
      selectedDiscountType,
      imageUrls,
      priceData
    } = this.state;

    const { oriPrice, price, currency, oriCurrency } = priceData;
      
    // Validation checks
    const isValid =
      prodName.trim() &&
      selectedCategoryId &&
      selectedBrandId &&
      Array.isArray(selectedSizes) &&
      selectedSizes.length > 0 &&
      oriPrice &&
      Array.isArray(selectedColors) &&
      selectedColors.length > 0 &&
      price &&
      stock;
  
    if (!isValid) {
      this.setState({
        isProdNameValid: !!prodName.trim(),
        isInValidCategory: !selectedCategoryId,
        isInvalidBrand: !selectedBrandId,
        isInValidSize: !(Array.isArray(selectedSizes) && selectedSizes.length > 0),
        priceData: {
          isInvalidOriPrice: !oriPrice,
          isInValidPrice: !price,
          oriCurrency: oriCurrency,
          currency: currency
        },
        isInValidColor: !(Array.isArray(selectedColors) && selectedColors.length > 0),
        isInValidStock: !stock,
      });
      return;
    }

    console.log("priceData", priceData)
  
    const slug = slugify(prodName);
  
    try {
      this.setState({
        loading: true,
        isProdNameValid: true,
        isInValidCategory: false,
        isInvalidBrand: false,
        isInValidSize: false,
        isInvalidOriPrice: false,
        isInValidPrice: false,
        isInValidColor: false,
        isInValidStock: false,
      });
  
      let response;
      if (productToEdit) {
        response = await ProductService.updateProductById(
          productToEdit.id,
          prodName,
          slug,
          description,
          selectedCategoryId,
          selectedBrandId,
          selectedSizes,
          selectedColors,
          stock,
          discount,
          selectedDiscountType,
        );
      } else {
        response = await ProductService.createProduct(
          prodName,
          slug,
          description,
          selectedCategoryId,
          selectedBrandId,
          selectedSizes,
          selectedColors,
          priceData,
          stock,
          discount,
          selectedDiscountType,
          imageUrls
        );
      }
  
      if (response.ok) {
        const successMessage = productToEdit
          ? 'Product updated successfully!'
          : 'New Product created successfully!';
        toast.success(successMessage);
        this.getListProducts();
        this.resetForm(); 
        this.setState({selectedColors: []});
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

  filteredProductImage(product){
    if(!product || !product.images){
      return null;
    }

    const images = product.images;
    const mainImage = images.find(item => item.is_main_image === true);
    return mainImage ? mainImage.image_url : null;
  }

  render(){
    const {
      products,
      priceData,
      isModalOpen,
      isProdNameValid,
      isInValidCategory,
      isInvalidBrand,
      isInValidSize,
      isInValidColor,
      isInValidStock,
      prodName,
      description,
      oriPrice,
      price,
      stock,
      discount,
      selectedDiscountType,
      selectedOriCurrency,
      selectedCurrency,
      selectedColors,
      selectedSizes,
      selectedBrandId,
      selectedCategoryId,
      page,
      rowsPerPage,
      isDeleteModalOpen,
    } = this.state;

    const columns = [
      { key: 'id', label: 'ID'},
      { key: 'name', label: 'Item Name' },
      { key: 'ori_price', label: 'Original Price' },
      { key: 'price', label: 'Price' },
      { key: 'stock_quantity', label: 'Stock' },
      { key: 'category_id', label: 'Category' },
      { key: 'brand_id', label: 'Brand' },
      { key: 'discount', label: 'Discount' },
      { key: 'discount_type', label: 'Discount Type' },
      { key: 'created_at', label: 'Created At' },
      { key: 'updated_at', label: 'Updated At' },
      { key: 'action', label: 'Action' },
    ];

    const pages = Math.ceil(products.length / rowsPerPage) || 1;
    const start = (page - 1) * rowsPerPage;
    const end   = start + rowsPerPage;
    const items = products.slice(start, end);

    const {isInvalidOriPrice, isInValidPrice} = priceData;

    return(
      <div>
        <div className="flex items-center justify-between">
          <h4>Products</h4>
          <Button color="primary" size="sm" className='rounded-full' onClick={() => this.handleOpenChange(true)}>
            Add New Product
          </Button>
        </div>

        <div className='my-3'>
          <Table
            aria-label="Products Table" 
            // selectionMode="multiple" 
            shadow="none"
            bottomContent={
              <div className="flex w-full justify-center">
                {
                  items.length > 0 && (
                    <Pagination
                      isCompact
                      showControls
                      color="primary"
                      page={page}
                      total={pages}
                      initialPage={1}
                      onChange={(newPage) => this.setState({ page: newPage })}
                    />
                  )
                }
              </div>
            }
            >
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key} data-column-id={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={items} emptyContent={"No rows to display."}>
              {items.map((product, idx) => {
                return (
                  <TableRow key={`row-${product.id}`}>
                    {
                      (columnKey) => {
                        if (columnKey === 'id') {
                          return <TableCell>{idx + 1}</TableCell>; 
                        }

                        if (columnKey === 'name') {
                          return <TableCell>
                                         <User
                                            avatarProps={{radius: "full", src:  this.filteredProductImage(product)  }}
                                            name={product.name}
                                            className='"text-xs'
                                          >
                                            {product.name}
                                          </User>
                                    </TableCell>; 
                        }

                        if(columnKey === 'ori_price') {
                          // return <TableCell>{Currency.formatToDollar(product.ori_price)}</TableCell>;
                        }

                        if(columnKey === 'price') {
                          // return <TableCell>{Currency.formatToDollar(product.price)}</TableCell>;
                        }

                        if(columnKey === 'stock_quantity') {
                          return <TableCell>
                            {product.stock_quantity > 0 ? (
                              <span className='text-xs text-green-500 font-semibold'>{`${product.stock_quantity} In Stock`}</span>
                            ): (
                              <span className='text-xs text-red-500'>Out of stock</span>
                            )}
                          </TableCell>;
                        }

                        if(columnKey === 'category_id') {
                          return <TableCell>
                                    <Chip className="capitalize text-white" style={{background: product.category_color}} size="sm" variant="flat">
                                      {product.category_name}
                                  </Chip>
                                </TableCell>;
                        }

                        if(columnKey === 'brand_id') {
                          return <TableCell>{product.brand_name}</TableCell>;
                        }

                        if(columnKey === 'discount') {
                          return <TableCell>{percentage(product.discount)}</TableCell>;
                        }

                        if(columnKey === 'discount_type') {
                          return <TableCell>{removeSlug(product.discount_type)}</TableCell>;
                        }

                        if(columnKey === 'created_at') {
                          const humanizedDate = new Humanize(product.created_at);
                          return <TableCell className='text-xs'>{humanizedDate.formatDate()}</TableCell>;
                        }

                        if(columnKey === 'updated_at') {
                          const humanizedDate = new Humanize(product.updated_at);
                          return <TableCell>{humanizedDate.ago()}</TableCell>;
                        }

                        if (columnKey === 'action') {
                          return (
                            <TableCell className="relative flex justify-end items-center gap-2 bg-background">
                              <Dropdown>
                                <DropdownTrigger>
                                  <Button isIconOnly radius="full" size="sm" variant="light">
                                    <EllipsisVertical className="text-default-400" />
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                  <DropdownItem onClick={() => this.handleViewBrand(product)}>View</DropdownItem>
                                  <DropdownItem onClick={() => this.handleEditProduct(product)}>Edit</DropdownItem>
                                  <DropdownItem onClick={() => this.handleDeleteClick(product)}>Delete</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </TableCell>
                          );
                        }
                        
                        return <TableCell>{getKeyValue(product, columnKey)}</TableCell>;
                      }
                    }
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        <ProductModal 
          size="full"
          isOpen={isModalOpen}
          placement="top"
          onOpenChange={this.handleOpenChange}
          isProdNameValid={isProdNameValid}
          isInValidCategory={isInValidCategory}
          isInvalidBrand={isInvalidBrand}
          isInValidSize={isInValidSize}
          isInvalidOriPrice={isInvalidOriPrice}
          isInValidColor={isInValidColor}
          isInValidPrice={isInValidPrice}
          isInValidStock={isInValidStock}
          prodName={prodName}
          selectedColors={selectedColors}
          selectedBrandId={selectedBrandId}
          selectedCategoryId={selectedCategoryId}
          description={description}
          oriPrice={oriPrice}
          price={price}
          stock={stock}
          discount={discount}
          priceData={priceData}
          selectedDiscountType={selectedDiscountType}
          selectedSizes={selectedSizes}
          selectedOriCurrency={selectedOriCurrency}
          selectedCurrency={selectedCurrency}
          onProdNameChange={this.handleProdNameChange}
          onDescriptionChange={this.handleDescriptionChange}
          onSelectedSizes={this.handleSelectedSized}
          onChangeColor={this.handleChangeColors}
          onChangeOriPrice={this.handleChangeOriPrice}
          onChangePrice={this.handleChangePrice}
          onChangeCurrency={this.handleCurrencyChange}
          onChangeOriCurrency={this.handleOriCurrencyChange}
          onChangeStockQuantity={this.handleStockQuantity}
          onChangeDiscount={this.handleDiscount}
          onSelectedDiscountType={this.handleSelectedDiscountType}
          onSelectionChangeCategory={this.onSelectionChangeCategory}
          onChangeBrand={this.handleChangeBrand}
          onUploadImageUrls={this.handleUploadImageUrls}
          onSubmit={this.handleSubmit}
        />

        <ModalComp
          title="Confirmation"
          content={
            <>
              <p className='text-xs'>
                Are you sure you want to delete this record? 
              </p>
            </>
          }
          isOpen={isDeleteModalOpen}
          onClose={() => this.setState({ isDeleteModalOpen: false })}
          onOpenChange={this.handleConfirmModalOpen}
          btnTitle="Ok"
          btnClose="Cancel"
          onAction={this.handleDeleteConfirm}
        />

      </div>
    );
  }
}

ProductPage.propTypes = {
  columnKey: PropTypes.string.isRequired,
  products: PropTypes.shape({
    category_color: PropTypes.string,
    category_name: PropTypes.string
  }).isRequired
}

export default ProductPage