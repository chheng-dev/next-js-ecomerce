import { CategoryService } from '@/app/(client)/services/categoryService';
import { Select, SelectItem } from '@nextui-org/react';
import React, { Component } from 'react';
import { toast } from 'react-toastify';

class SelectCategoryComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };

    this.onSelectionChangeCategory = this.props.onSelectionChangeCategory.bind(this)
  }

  componentDidMount() {
    this.getCategories();
  }

  async getCategories() {
    try {
      const response = await CategoryService.fetchCategories();
      if (response.ok) {
        const result = response.data;

        const categoriesOption = result.map(item => ({
          key: item.id,
          value: item.title,
        }));

        this.setState({ categories: categoriesOption });
      } else {
        toast.error(`Failed to fetch categories:)`);
      }
    } catch (error) {
      toast.error('An error occurred while fetching categories');
      console.error('Error details:', error);
    }
  }

  render() {
    const { categories } = this.state;
    const { selectedValueCategory, isInValidCategory, onSelectionChangeCategory } = this.props;

    return (
      <Select
        isRequired
        label="Category"
        placeholder="Select a category"
        className="w-full"
        isInvalid={isInValidCategory}
        selectedKeys={selectedValueCategory ? [selectedValueCategory] : []}
        value={selectedValueCategory} 
        errorMessage="Please enter a valid category"
        labelPlacement='outside'
        onChange={onSelectionChangeCategory} 
      >
        {categories.map(category => (
          <SelectItem key={category.key} textValue={category.value}>
            {category.value}
          </SelectItem>
        ))}
      </Select>
    );
  }
}

export default SelectCategoryComp;
