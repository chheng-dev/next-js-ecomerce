import LeftSidebarFilter from '@/components/product-listing/LeftSidebarFilter'
import RightSidebar from '@/components/product-listing/RightSidebar'
import React from 'react'

const page = () => {
  return (
    <div className='container mx-auto p-4'>
      <div className='flex gap-6'>
        <div className='w-1/5 sticky top-[70px] h-full'>
          <LeftSidebarFilter />
        </div>
        <div className='w-4/5 h-screen overflow-y-auto py-6'>
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}

export default page
