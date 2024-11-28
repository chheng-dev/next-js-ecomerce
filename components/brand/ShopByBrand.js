"use client"

import React, { Component } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CarouselCategoryComp from '../home/CarouselCategory';
import { BrandService } from '@/app/(client)/services/brandService';
import { toast } from 'react-toastify';

class ShopByBrand extends Component {
  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
    this.state = {
      loading: false,
      items: []
    }
  }

  componentDidMount() {
    this.fetchTopBrands();
  }

  async fetchTopBrands() {
    try {
      this.setState({ loading: true });
      const response = await BrandService.getTopBrands();
      if (response.ok) {
        this.setState({ items: response.data, loading: false });
      } else {
        toast.error("Failed to fetch brands");
        this.setState({ loading: false });
      }
    } catch (error) {
      toast.error("An error occurred while fetching brands");
      console.error("Error details:", error);
      this.setState({ loading: false });
    }
  }

  handlePrevClick = () => {
    if (this.carouselRef.current) {
      this.carouselRef.current.slickPrev();
    }
  };

  handleNextClick = () => {
    if (this.carouselRef.current) {
      this.carouselRef.current.slickNext();
    }
  };

  render() {
    const { items, loading } = this.state

    return (
      <div className="w-full h-full px-4 lg:px-0">
        <div className="flex justify-between items-center">
          <h2>Shop By Brand</h2>
          <div className="flex gap-2">
            <button
              className="bg-primary rounded-md p-1.5 cursor-pointer"
              onClick={this.handlePrevClick}
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              className="bg-primary rounded-md p-1.5"
              onClick={this.handleNextClick}
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="mt-4">
          <CarouselCategoryComp ref={this.carouselRef} items={items} loading={loading} />
        </div>
      </div>
    );
  }
}

export default ShopByBrand;
