import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import CartCustomerReivew from './CartCustomerReivew'

function CustomerReview() {
  return (
    <div className='bg-secondary mt-16 px-4 lg:px-0'>
      <div className='header-section container mx-auto py-8'>
        <div className='flex items-center justify-between lg:mb-4 mb-2'>
          <h4 className='mb-2'>What our Customer say's</h4>
          <div className='flex gap-2'>
            <span className='bg-primary rounded-md p-1.5'>
              <ChevronLeft className='w-4 h-4 text-white cursor-pointer' />
            </span>
            <span className='bg-primary rounded-md p-1.5'>
              <ChevronRight className='w-4 h-4 text-white cursor-pointer' />
            </span>
          </div>
        </div>

        {/* Customer Item Review  */}
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3'>
          <CartCustomerReivew />
          <CartCustomerReivew />
          <CartCustomerReivew />
        </div>
      </div>
    </div>
  )
}

export default CustomerReview
