import ShopByCategory from '@/components/category/ShopByCategory'
import CustomerReview from '@/components/home/CustomerReview'
import DealsMonth from '@/components/home/DealsMonth'
import ExpericenSection from '@/components/home/ExpericenSection'
import OurBestSeller from '@/components/home/OurBestSeller'
import BannerComp from '@/components/layouts/BannerComp'
import React from 'react'

function page() {
  return (
    <div className='w-full'>
      <BannerComp />
      <div className='container mx-auto mt-24'>
        <ShopByCategory />
        <OurBestSeller />
        <DealsMonth />
      </div>
      <CustomerReview />
    </div>
  )
}

export default page
