"use client"

import { ArrowLeftSquare, ArrowRightSquare, ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useRef } from 'react'
import CarouselCategoryComp from '../home/CarouselCategory'

const ShopByCategory = () => {

  const carouselRef = useRef(null);


  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.slickNext();
    }
  };

  const items = [
    {
      image: "https://via.placeholder.com/550",
      title: "IAS Brand"
    },
    {
      image: "https://via.placeholder.com/550",
      title: "Bamboo Set"
    },
    {
      image: 'https://via.placeholder.com/550',
      title: "Chang"
    },
    {
      image: 'https://via.placeholder.com/550',
      title: "Baby Set"
    }
  ]
  return (
    <div className='w-full h-full px-4 lg:px-0'>
      <div className='flex justify-between items-center'>
        <div>
          <h4>Shop By Categories</h4>
        </div>
        <div className='flex gap-2'>
          <span className='bg-primary rounded-md p-1.5 cursor-pointer' onClick={handlePrevClick}>
            <ChevronLeft className='w-4 h-4 text-white' />
          </span>
          <span className='bg-primary rounded-md p-1.5' onClick={handleNextClick}
          >
            <ChevronRight className='w-4 h-4 text-white' />
          </span>
        </div>
      </div>


      {/* Cart Item  */}
      <div className='mt-4'>
        <CarouselCategoryComp ref={carouselRef} items={items} />
      </div>
    </div>
  )
}

export default ShopByCategory
