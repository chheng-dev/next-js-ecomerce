"use client"
import React, { Component } from 'react'
import BrandModal from '../components/modal/brand/BrandModal';
import { Avatar, Button, getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { BrandService } from '@/app/(client)/services/brandService';
import { toast } from 'react-toastify';
import slugify from 'react-slugify';
import Humanize from '@/lib/humanize';
import { FileEdit, Trash2Icon } from 'lucide-react';
import ModalComp from '../components/modal/ModalComp';

class Page extends Component{
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      brandToEdit: null,
      isBrandNameValid: false,
      brandName: '',
      brandIcon: null,
      loading: false,
      brands: [],
      page: 1,
      rowsPerPage: 10,
      isDeleteModalOpen: false,
    }

    this.handleOpenChange = this.handleOpenChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBrandNameChange = this.handleBrandNameChange.bind(this);
    this.handleIconUploadComplete = this.handleIconUploadComplete.bind(this);
    this.handleConfirmModalOpen = this.handleConfirmModalOpen.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
  }

  componentDidMount(){
    this.getListBrands();
  }

  async getListBrands() {
    try {
      const response = await BrandService.fetchBrandsList();
      if (response.ok) {
        this.setState({ brands: response.data });
      } else {
        toast.error(`Failed to fetch brands:)`);
      }
    } catch (error) {
      toast.error('An error occurred while fetching brands');
      console.error('Error details:', error);
    }
  }
  
  handleOpenChange(open, brand = null) {
    if(open && brand){
      this.setState({ 
        isModalOpen: true,
        brandToEdit: brand,
        brandName: brand.name,
        branImage: brand.brandIcon,
        isBrandNameValid: true
      });
    } else {
      this.setState({
        isModalOpen: open,
        brandToEdit: null,
        brandName: ' ',
        branImage: ' ',
        isBrandNameValid: false
      });

      this.resetForm();
    }
  }

  resetForm(){
    this.setState({
      brandName: '',
      brandIcon: null,
      isBrandNameValid: true
    })
  }

  handleBrandNameChange(e){
    this.setState({ 
      brandName: e.target.value, 
      isBrandNameValid: true 
    });
  }

  async handleSubmit(){
    const {brandToEdit, brandName, brandIcon } = this.state;

    if(!brandName.trim()){
      this.setState({ isBrandNameValid: false });
      return;
    }

    const slug = slugify(brandName);

    try {
      this.setState({ loading: true, isBrandNameValid: true });

      let response;
      
      if(brandToEdit){
        response = await BrandService.updateBrandById(brandToEdit.id, brandName, slug, brandIcon);
      } else{
        response = await BrandService.createBrand(brandName, slug, brandIcon);
      }

      if(response.ok){
        const successMessage = brandToEdit ? 'Brand updated successfully!' : 'New brand created successfully!';
        toast.success(successMessage);
        this.getListBrands();

        this.resetForm();
      } else {
        toast.error(`Something went wrong: ${response.data || response.statusText}`);
      }

    } catch(error){

    }
  }

  handleIconUploadComplete(uploadedIconUrl){
    this.setState({ brandIcon: uploadedIconUrl })
  }

  handleConfirmModalOpen(open) {
    this.setState({ isDeleteModalOpen: open });
  }

  async handleDeleteClick(brand) {
    this.setState({ 
      isDeleteModalOpen: true,
      brandToEdit: brand.id,
      brandIcon: brand.icon_url
    });
  };

  handleEditBrand(brand){
    this.setState({ 
      isModalOpen: true,
      brandToEdit: brand,
      brandName: brand.name,
      brandIcon: brand.icon_url,
      isBrandNameValid: true
    });
  }

  async handleDeleteConfirm(){
    const {brandToEdit, brandIcon} = this.state;
    console.log(brandIcon);
    try {
      this.setState({ loading: true})
      const response = await BrandService.deleteBrandById(brandToEdit, brandIcon);

      if (response.ok) {
        this.getListBrands();
        toast.success('Brand deleted successfully!');
      } else {
        toast.error('Failed to delete brand');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the brand');
      console.error('Error details:', error);
    } finally {
      this.setState({
        loading: false,
        isDeleteModalOpen: false
      })
    }
  }

  render(){

    const {
      isModalOpen,
      brandToEdit,
      brandName,
      brandIcon,
      isBrandNameValid,
      brands,
      page,
      rowsPerPage,
      isDeleteModalOpen,
    } = this.state;

    const columns = [
      { key: 'id', label: 'ID'},
      { key: 'name', label: 'Brand name' },
      { key: 'image', label: 'Image' },
      { key: 'created_at', label: 'Created At' },
      { key: 'updated_at', label: 'Updated At' },
      { key: 'action', label: 'Action' },
    ];

    const pages = Math.ceil(brands.length / rowsPerPage) || 1;
    const start = (page - 1) * rowsPerPage;
    const end   = start + rowsPerPage;
    const items = brands.slice(start, end);

    const isEditMode = !!brandToEdit;
    

    return (
      <div>
        <div className="flex items-center justify-between">
          <h4>Brands</h4>
          <Button color="primary" size="sm" onClick={() => this.handleOpenChange(true)}>
            Add New Brand
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
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
              </TableHeader>
              <TableBody items={items} emptyContent={"No rows to display."}>
                {items.map((brand, idx) => {
                  return (
                    <TableRow key={`row-${idx}`}>
                      {
                        (columnKey) => {
                          if (columnKey === 'id') {
                            return <TableCell>{idx + 1}</TableCell>; 
                          }
  
                          if (columnKey === 'image') {
                            return (
                              <TableCell>
                                <Avatar src={brand.icon_url} className='rounded-md' alt={brand.name} />
                              </TableCell>
                            )
                          }

                          if(columnKey === 'created_at') {
                            const humanizedDate = new Humanize(brand.created_at);
                            return <TableCell>{humanizedDate.formatDate()}</TableCell>;
                          }

                          if(columnKey === 'updated_at') {
                            const humanizedDate = new Humanize(brand.updated_at);
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
                                  onClick={() => this.handleEditBrand(brand)}
                                >
                                  <FileEdit className='w-4' />
                                </Button>  
                                <Button 
                                  isIconOnly 
                                  color="danger" 
                                  variant="faded"  
                                  aria-label="delete" 
                                  size='sm'
                                  onClick={() => this.handleDeleteClick(brand)}
                                >
                                  <Trash2Icon className='w-4' />
                                </Button>  
                              </TableCell>
                            );
                          }
                          return <TableCell>{getKeyValue(brand, columnKey)}</TableCell>;
                        }
                      }
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        <BrandModal 
          isOpen={isModalOpen}
          isEditMode={isEditMode}
          onOpenChange={this.handleOpenChange}
          isBrandNameValid={isBrandNameValid}
          brandName={brandName}
          brandIcon={brandIcon}
          onBrandNameChange={this.handleBrandNameChange}
          onSubmit={this.handleSubmit}
          onIconUploadComplete={this.handleIconUploadComplete}
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
    )
  }
}

export default Page;
