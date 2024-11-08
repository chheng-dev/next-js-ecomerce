"use client";
import React, { Component } from 'react';
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User
} from '@nextui-org/react';
import { ProductService } from '@/app/(client)/services/productService';
import Humanize from '@/lib/humanize';
import { EllipsisVertical } from 'lucide-react';
import Currency from '@/lib/formatterAmount';
import { toast } from 'react-toastify';
import { removeSlug } from '@/lib/removeSlug';
import PropTypes from 'prop-types';
import { percentage } from '@/lib/percentage';
import ModalComp from '../components/modal/ModalComp';
import EditProductModal from '../components/modal/product/EditProductModal';
import CreateProductModal from '../components/modal/product/CreateProdcutModal';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      product: {},
      page: 1,
      rowsPerPage: 10,
      isDeleteModalOpen: false,
      isEditModalOpen: false,
      productToEdit: null,
      isCreateModalOpen: false,
    };

    this.createProductRef = React.createRef();
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
  } 
  
  componentDidMount() {
    this.getListProducts();
  }

  async getListProducts() {
    try {
      const response = await ProductService.fetchProductsList();
      if (response.ok) {
        this.setState({ products: response.data });
      } else {
        toast.error('Failed to fetch products');
      }
    } catch (error) {
      toast.error('An error occurred while fetching products');
      console.error('Error details:', error);
    }
  }

  handleOpenChange = (open) => {
    this.setState({ isCreateModalOpen: open });
    if (!open && this.createProductRef.current) {
      this.createProductRef.current.resetForm();
    }
  };

  handleOpenEditModal = (open) => {
    this.setState({ isEditModalOpen: open });
  };

  handleConfirmModalOpen = (open) => {
    this.setState({ isDeleteModalOpen: open });
  };

  handleDeleteClick = (product) => {
    this.setState({
      isDeleteModalOpen: true,
      productToEdit: product.id,
    });
  };

  async handleDeleteConfirm() {
    const { productToEdit } = this.state;
    try {
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
        isDeleteModalOpen: false,
      });
    }
  }

  filteredProductImage(product) {
    if (!product || !product.images) return null;
    const mainImage = product.images.find((item) => item.is_main_image);
    return mainImage ? mainImage.image_url : null;
  }

  handleEditProduct = (product) => {
    this.setState({
      isEditModalOpen: true,
      product: product,
    });
  };

  render() {
    const {
      products,
      isCreateModalOpen,
      isEditModalOpen,
      page,
      product,
      rowsPerPage,
      isDeleteModalOpen,
    } = this.state;

    const columns = [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Item Name' },
      { key: 'ori_price', label: 'Original Price' },
      { key: 'price', label: 'Price' },
      { key: 'stock_quantity', label: 'Stock' },
      { key: 'category', label: 'Category' },
      { key: 'brand', label: 'Brand' },
      { key: 'discount', label: 'Discount' },
      { key: 'discount_type', label: 'Discount Type' },
      { key: 'created_at', label: 'Created At' },
      { key: 'updated_at', label: 'Updated At' },
      { key: 'action', label: 'Action' },
    ];

    const pages = Math.ceil(products.length / rowsPerPage) || 1;
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const items = products.slice(start, end);

    return (
      <div>
        <div className="flex items-center justify-between">
          <h4>Products</h4>
          <Button color="primary" size="sm" className="rounded-full" onClick={() => this.handleOpenChange(true)}>
            Add New Product
          </Button>
        </div>

        <div className="my-3">
          <Table
            aria-label="Products Table"
            shadow="none"
            bottomContent={
              items.length > 0 && (
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    color="primary"
                    page={page}
                    total={pages}
                    initialPage={1}
                    onChange={(newPage) => this.setState({ page: newPage })}
                  />
                </div>
              )
            }
          >
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>

            <TableBody items={items} emptyContent="No rows to display.">
              {items.map((product, idx) => (
                <TableRow key={`row-${product.id}`}>
                  {(columnKey) => {
                    if (columnKey === 'id') return <TableCell>{idx + 1}</TableCell>;

                    if (columnKey === 'name') {
                      return (
                        <TableCell>
                          <User
                            avatarProps={{ radius: 'full', src: this.filteredProductImage(product) }}
                            name={product.name}
                            className="text-xs"
                          >
                            {product.name}
                          </User>
                        </TableCell>
                      );
                    }

                    if (columnKey === 'ori_price') {
                      return <TableCell>{Currency.formatToDollar(product.ori_price, product.ori_currency)}</TableCell>;
                    }

                    if (columnKey === 'price') {
                      return <TableCell>{Currency.formatToDollar(product.price, product.currency)}</TableCell>;
                    }

                    if (columnKey === 'stock_quantity') {
                      return (
                        <TableCell>
                          {product.stock_quantity > 0 ? (
                            <span className="text-xs text-green-500 font-semibold">
                              {`${product.stock_quantity} In Stock`}
                            </span>
                          ) : (
                            <span className="text-xs text-red-500">Out of stock</span>
                          )}
                        </TableCell>
                      );
                    }

                    if (columnKey === 'category') {
                      return (
                        <TableCell>
                          <Chip className="capitalize text-white" style={{ background: product.category?.color }} size="sm" variant="flat">
                            {product.category?.label}
                          </Chip>
                        </TableCell>
                      );
                    }

                    if (columnKey === 'brand') {
                      return <TableCell>{product.brand.label}</TableCell>;
                    }

                    if (columnKey === 'discount') {
                      return <TableCell>{percentage(product.discount)}</TableCell>;
                    }

                    if (columnKey === 'discount_type') {
                      return <TableCell className="text-xs">{removeSlug(product.discount_type)}</TableCell>;
                    }

                    if (columnKey === 'created_at') {
                      return <TableCell className="text-xs">{new Humanize(product.created_at).formatDate()}</TableCell>;
                    }

                    if (columnKey === 'updated_at') {
                      return <TableCell className="text-xs">{new Humanize(product.updated_at).ago()}</TableCell>;
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

                    return <TableCell>{product[columnKey]}</TableCell>;
                  }}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <CreateProductModal
          ref={this.createProductRef}
          size="full"
          isOpen={isCreateModalOpen}
          onOpenChange={this.handleOpenChange}
          placement="top"
          getListProducts={() => this.getListProducts()}
        />

        {isEditModalOpen && product && (
          <EditProductModal
            size="full"
            isOpen={isEditModalOpen}
            onOpenChange={this.handleOpenEditModal}
            reloadGetProductList={() => this.getListProducts()}
            placement="top"
            product={product}
          />
        )}

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
  products: PropTypes.array,
  product: PropTypes.object,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  isDeleteModalOpen: PropTypes.bool,
  isEditModalOpen: PropTypes.bool,
  productToEdit: PropTypes.object,
  isCreateModalOpen: PropTypes.bool,
};

export default ProductPage;
