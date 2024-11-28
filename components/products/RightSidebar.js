"use client"
import React, { Component } from 'react'
import { ProductService } from '@/app/(client)/services/productService'
import CartItem from '../CartItem'
import { TopRightHeaderFilter } from './right/TopRightHeaderFilter'
import InfiniteScroll from 'react-infinite-scroll-component'

class RightSidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productItems: [],
      hasMore: true,
      loading: false,
      page: 1,
    }
  }

  componentDidMount() {
    this.fetchProductList()
  }

  filteredProductImage(product) {
    if (!product || !product.images) return null;
    const mainImage = product.images.find((item) => item.is_main_image);
    return mainImage ? mainImage.image_url : null;
  }

  fetchProductList = async () => {
    const { page, productItems } = this.state
    const limit = 12;

    this.setState({ loading: true })

    try {
      const response = await ProductService.fetchProductsList(page, limit);
      const { products, total, hasMore } = response.data;

      if (response.ok) {
        this.setState({
          productItems: [...productItems, ...products],
          loading: false,
          hasMore: hasMore,
        })
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching product list:', error)
      this.setState({
        loading: false,
      })
    }
  };

  fetchMoreData = async () => {
    if (this.state.loading || !this.state.hasMore) return;
    this.setState(
      (prevState) => ({ page: prevState.page + 1, loading: true }),
      this.fetchProductList
    );
  }

  render() {
    const { productItems, hasMore, loading } = this.state

    if (loading && productItems.length === 0) {
      return <div>Loading products...</div>
    }

    return (
      <div className='w-full'>
        <TopRightHeaderFilter items={productItems} />
        <InfiniteScroll
          dataLength={productItems.length}
          next={this.fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className='text-center'>Loading more...</h4>}
          scrollThreshold={0.95}
        >
          <div className='grid grid-cols-4 gap-3 my-4'>
            {productItems.map((item, index) => (
              <CartItem
                index={index}
                key={item.id}
                title={item.name}
                image={this.filteredProductImage(item)}
                price={item.price}
                oriPrice={item.ori_price}
                currency={item.currency}
                oriCurrency={item.ori_currency}
                brand={item.brand.label}
              />
            ))}
          </div>
        </InfiniteScroll >
      </div >
    )
  }
}

export default RightSidebar;
