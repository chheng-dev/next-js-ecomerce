"use client";

import { Button, Input, Modal, Pagination } from '@nextui-org/react';
import React, { Component } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/react';
import ModalComp from '../components/modal/category/ModalComp';
import { toast } from 'react-toastify';
import { CategoryService } from '@/app/(client)/services/categoryService';
import { FileEdit, Trash2Icon } from 'lucide-react';
import PropTypes from 'prop-types';
import Humanize from '@/lib/humanize';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: '',
      categoryColor: '#2020a7',
      loading: false,
      isModalOpen: false,
      categories: [],
      isCategoryNameValid: true,
      page: 1,
      rowsPerPage: 10,
      isDeleteModalOpen: false,
      categoryIdToDelete: null,
      categoryToEdit: null
    };

    this.handleOpenChange = this.handleOpenChange.bind(this);
    this.handleConfirmModalOpen = this.handleConfirmModalOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategoryNameChange = this.handleCategoryNameChange.bind(this);
    this.handleCategoryColorChange = this.handleCategoryColorChange.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
  }

  async componentDidMount(){
    await this.getCategories();
  }

  handleOpenChange(open, category = null) {
    if(open && category){

      this.setState({ 
        isModalOpen: true,
        categoryToEdit: category,
        categoryName: category.title,
        categoryColor: category.color,
        isCategoryNameValid: true
      });
    } else {
      this.setState({
        isModalOpen: open,
        categoryToEdit: null,
        categoryName: ' ',
        categoryColor: ' ',
        isCategoryNameValid: false
      })

      this.resetForm();
    }
  }

  handleConfirmModalOpen(open) {
    this.setState({ isDeleteModalOpen: open });
  }

  handleCategoryNameChange(e) {
    this.setState({ categoryName: e.target.value, isCategoryNameValid: true });

  }

  handleCategoryColorChange(event) {
    this.setState({ categoryColor: event.target.value });
  }

  resetForm = () => {
    this.setState({
      categoryName: '',
      categoryColor: '#2020a7',
      isCategoryNameValid: true,
    });
  };

  async getCategories() {
    try {
      const response = await CategoryService.fetchCategories(); 
      if (response.ok) {
        this.setState({ categories: response.data });
      } else {
        toast.error(`Failed to fetch categories:)`);
      }
    } catch (error) {
      toast.error('An error occurred while fetching categories');
      console.error('Error details:', error);
    }
  }

  async handleSubmit() {
    const { categoryToEdit, categoryName, categoryColor } = this.state;
  
    if (!categoryName.trim(), !categoryColor.trim()) {
      this.setState({ isCategoryNameValid: false });
      return;
    }
    
    try {
      this.setState({ loading: true });
      
      let response;

      if(categoryToEdit) {
        response = await CategoryService.updateCategoryById(categoryToEdit.id, categoryName, categoryColor);
      } else {
        response = await CategoryService.createCategory(categoryName, categoryColor);
      }

      if(response.ok){
        const successMessage = categoryToEdit ? 'Category updated successfully!' : 'New category created successfully!';
        toast.success(successMessage);

        this.setState({
          categoryColor: '#2020a7',
          categoryName: '',
          isModalOpen: false,
          categoryToEdit: null
        });

        this.getCategories();
      } else {
        toast.error(`Something went wrong: ${response.data}`);
      }

    } catch (error) {
      toast.error('An error occurred while making the request');
      console.error('Error details:', error);
    } finally {
      this.setState({ loading: false });
    }
  }

  handleEditCategory(category){
    this.setState({ 
      isModalOpen: true,
      categoryToEdit: category,
      categoryName: category.title,
      categoryColor: category.color
    });
  }

  async handleDeleteClick(catId) {
    this.setState({ 
      isDeleteModalOpen: true,
      categoryIdToDelete: catId
    });
  };


  async handleDeleteConfirm(){
    const {categoryIdToDelete} = this.state;
    try {
      this.setState({ loading: true})
      const response = await CategoryService.deleteCategoryById(categoryIdToDelete)

      if (response.ok) {
        this.getCategories();
        toast.success('Category deleted successfully!');
      } else {
        toast.error('Failed to delete category');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the category');
      console.error('Error details:', error);
    } finally {
      this.setState({
        loading: false,
        isDeleteModalOpen: false
      })
    }
  }




  render() {
    const { 
      categoryName, 
      categoryColor, 
      isModalOpen, 
      categories, 
      isCategoryNameValid, 
      page, 
      rowsPerPage, 
      isDeleteModalOpen,
      categoryToEdit
    } = this.state;

    const columns = [
      { key: 'id', label: 'ID'},
      { key: 'title', label: 'Category Title' },
      { key: 'color', label: 'Color' },
      { key: 'created_at', label: 'Created At' },
      { key: 'updated_at', label: 'Updated At' },
      { key: 'action', label: 'Action' },
    ];

    const pages = Math.ceil(categories.length / rowsPerPage) || 1;
    const start = (page - 1) * rowsPerPage;
    const end   = start + rowsPerPage;
    const items = categories.slice(start, end);

    const isEditMode = !!categoryToEdit;

    return (
      <div>
        <div className="flex items-center justify-between">
          <h4>Categories List</h4>
          <Button color="primary" size="sm" onClick={() => this.handleOpenChange(true)}>
            Add New Category
          </Button>
        </div>

        <div className="my-3">
          <div className="flex flex-col gap-3">
            <Table 
              aria-label="Selection behavior table example with dynamic content" 
              selectionMode="multiple" 
              shadow="none"
              isStriped
              bottomContent={
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
              }
            >
              <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
              </TableHeader>
              <TableBody items={items}>
                {items.map((item, idx) => {
                  const color = item.color;
                  return (
                    <TableRow key={`row-${idx}`}>
                      {
                        (columnKey) => {
                          if (columnKey === 'id') {
                            return <TableCell>{idx + 1}</TableCell>; 
                          }
  
                          if (columnKey === 'color') {
                            return (
                              <TableCell>
                                <button 
                                  style={{ backgroundColor: color }} 
                                  className={`w-6 h-6 rounded-lg`}>
                                </button>
                              </TableCell>
                            )
                          }

                          if(columnKey === 'created_at') {
                            const humanizedDate = new Humanize(item.created_at);
                            return <TableCell>{humanizedDate.formatDate()}</TableCell>;
                          }

                          if(columnKey === 'updated_at') {
                            const humanizedDate = new Humanize(item.updated_at);
                            return <TableCell>{humanizedDate.ago()}</TableCell>;
                          }
  
                          if(columnKey === 'action') {
                            return(
                              <TableCell className='space-x-2'>
                                <Button 
                                  isIconOnly 
                                  color="warning" 
                                  variant="faded"  
                                  aria-label="edit" 
                                  size='sm'
                                  onClick={() => this.handleEditCategory(item)}
                                >
                                  <FileEdit className='w-4' />
                                </Button>  
                                <Button 
                                  isIconOnly 
                                  color="danger" 
                                  variant="faded"  
                                  aria-label="delete" 
                                  size='sm'
                                  onClick={() => this.handleDeleteClick(item.id)}
                                >
                                  <Trash2Icon className='w-4' />
                                </Button>  
                              </TableCell>
                            );
                          }
                          return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                        }
                      }
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <ModalComp
          isOpen={isModalOpen}
          onOpenChange={this.handleOpenChange}
          title={isEditMode ? 'Update Category' : 'Add Category'}
          content={
            <>
              <Input
                type="text"
                label="Category name"
                placeholder="Enter Category name"
                labelPlacement="outside"
                value={categoryName}
                onChange={this.handleCategoryNameChange}
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
                onChange={this.handleCategoryColorChange}
              />
            </>
          }
          btnTitle={isEditMode ? 'Update' : 'Save'}
          btnClose="Cancel"
          onAction={this.handleSubmit}
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

Page.propType = {
  color: PropTypes.string.isRequired
}

export default Page;
