"use client"

import { Avatar } from '@nextui-org/react';
import React from 'react';
import { FaStar } from "react-icons/fa";

const CartCustomerReview = ({ rating, content, name, avatar }) => {
  return (
    <div className='bg-white p-4 rounded-lg lg:my-6'>
      <div className='flex gap-2'>
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className={`w-3 h-3 ${index < rating ? 'text-warning' : 'text-gray-300'}`} />
        ))}
      </div>
      <p className='text-sm my-2 line-clamp-2'>{content}</p>
      
      <div className='flex gap-2 mt-6'>
        <Avatar src={avatar} />
        <div className="block">
          <p>{name}</p> 
          <span className='text-xs text-gray-400'>Customer</span>
        </div>
      </div>
    </div>
  )
}

export default CartCustomerReview;