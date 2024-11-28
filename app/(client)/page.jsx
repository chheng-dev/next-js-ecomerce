import ShopByBrand from '@/components/brand/ShopByBrand'
import CustomerReview from '@/components/home/CustomerReview'
import DealsMonth from '@/components/home/DealsMonth'
import OurBestSeller from '@/components/home/OurBestSeller'
import BannerComp from '@/components/layouts/BannerComp'
import React from 'react'
import TopCategories from '@/components/category/TopCategories'

function page() {
  return (
    <div className='w-full'>
      <BannerComp />
      <div className='container mx-auto mt-24'>
        <TopCategories />
        <ShopByBrand />
        <OurBestSeller />
        <DealsMonth />
      </div>
      <CustomerReview />
    </div>
  )
}

export default page
