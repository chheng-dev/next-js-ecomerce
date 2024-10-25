import { BrandService } from '@/app/(client)/services/brandService';
import { Select, SelectItem } from '@nextui-org/react';
import React, { Component } from 'react';
import { toast } from 'react-toastify';

class SelectedBrandComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
    };

    this.onChangeBrand = this.props.onChangeBrand.bind(this)
  }

  componentDidMount() {
    this.getListBrands();
  }

  async getListBrands() {
    try {
      const response = await BrandService.fetchBrandsList();
      if (response.ok) {
        const result = response.data;

        const brandsOption = result.map(item => ({
          key: item.id,
          value: item.name,
        }));

        this.setState({ brands: brandsOption });
      } else {
        toast.error('Failed to fetch brands');
      }
    } catch (error) {
      toast.error('An error occurred while fetching brands');
      console.error('Error details:', error);
    }
  }

  render() {
    const { brands } = this.state;
    const { selectedValueBrand, isInvalidBrand, onChangeBrand  } = this.props;

    return (
      <Select
        isRequired
        label="Brand"
        placeholder="Select a brand"
        className="w-full py-3"
        selectedKeys={selectedValueBrand ? [selectedValueBrand] : []}
        value={selectedValueBrand}
        isInvalid={isInvalidBrand}
        errorMessage="Please select a valid brand"
        labelPlacement="outside"
        onChange={onChangeBrand}
      >
        {brands.map(brand => (
          <SelectItem key={brand.key} textValue={brand.value}>
            {brand.value}
          </SelectItem>
        ))}
      </Select>
    );
  }
}

export default SelectedBrandComp;
