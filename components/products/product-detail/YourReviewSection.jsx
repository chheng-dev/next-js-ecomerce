import { Button, Input, Textarea } from '@nextui-org/react'
import React, { useState } from 'react'
import { Star } from 'lucide-react';

const YourReviewSection = () => {

  const [rating, setRating] = useState(0);

  const handleClick = (index) => {
    setRating(index + 1);
  };


  return (
    <div class="py-6">
      <h5 class="text-2xl font-bold text-gray-800 mb-12">Add your Review</h5>
      
      <form>
        <div class="mb-4">
          <div className='pb-4'>
            <Input 
              key={'outside'}
              type="text"
              label="Name"
              placeholder="Enter Your Name"
              labelPlacement="outside"
              color='primary'
              variant='bordered'
            />
          </div>

          <div className='pb-4'>
            <label htmlFor="star" className='text-sm'>Rating</label>
            <div className='flex gap-3 mt-2'>
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={`w-6 h-6 cursor-pointer ${
                    index < rating ? 'text-warning-500' : 'text-gray-300'
                  }`}
                  onClick={() => handleClick(index)}
                />
              ))}
            </div>
          </div>

          <div className='pb-4'>
            <Input 
              key={'outside'}
              type="email"
              label="Email Address"
              placeholder="Enter Your Email"
              labelPlacement="outside"
              color='primary'
              variant='bordered'
            />
          </div>

          <div className='pb-4'>
            <Textarea
              label="Your Review"
              labelPlacement="outside"
              placeholder="Enter your Your Review"
              className="max-w-full"
              variant='bordered'
            />
          </div>

        </div>
        <div class="flex items-center justify-between">
          <Button
            type="submit"
            color='primary'
            className='text-white'
          >
            Submit Review
          </Button>
        </div>
      </form>
    </div>

  )
}

export default YourReviewSection
