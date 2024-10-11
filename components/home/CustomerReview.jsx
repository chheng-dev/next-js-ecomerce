"use client"

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useRef } from 'react'
import CarouselCustomerReviewComp from './CarouselCustomerReviewComp';


function CustomerReview() {

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


  const reviews = [
    {
      rating: 5,
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci",
      name: "Leslie Alexander",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    {
      rating: 4,
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci.",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026025d"
    },
    {
      rating: 3,
      content: "Adipisci, earum quisquam natus fuga aliquam nisi numquam quibusdam eaque!",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026026d"
    },
    {
      rating: 5,
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      name: "Emma Johnson",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026027d"
    },
  ];  
  
  return (
    <div className='bg-secondary mt-16 px-4 lg:px-0'>
      <div className='header-section container mx-auto py-8'>
        <div className='flex items-center justify-between lg:mb-4 mb-2'>
          <h4 className='mb-2'>What our Customer say's</h4>
          <div className='flex gap-2'>
            <span 
              className='bg-primary rounded-md p-1.5'
              onClick={handlePrevClick}
            >
              <ChevronLeft 
                className='w-4 h-4 text-white cursor-pointer' />
            </span>
            <span className='bg-primary rounded-md p-1.5' onClick={handleNextClick}>
              <ChevronRight className='w-4 h-4 text-white cursor-pointer' />
            </span>
          </div>
        </div>

        <CarouselCustomerReviewComp ref={carouselRef} reviews={reviews} />
      </div>
    </div>
  )
}

export default CustomerReview
