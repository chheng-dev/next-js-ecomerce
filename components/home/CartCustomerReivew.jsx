import { Avatar } from '@nextui-org/react';
import React from 'react'
import { FaStar } from "react-icons/fa";


const CartCustomerReivew = () => {
  return (
    <div className='bg-white p-4 rounded-lg lg:my-6'>
      <div className='flex gap-2'>
        <FaStar className='w-3 h-3 text-warning' />
        <FaStar className='w-3 h-3 text-warning' />
        <FaStar className='w-3 h-3 text-warning' />
        <FaStar className='w-3 h-3 text-warning' />
        <FaStar className='w-3 h-3 text-warning' />
      </div>
      <p className='text-sm my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, earum quisquam natus fuga aliquam nisi numquam quibusdam eaque! Nobis ipsa facilis explicabo totam, laudantium quidem tempora a amet? Voluptates, sapiente.</p>
      
      <div className='flex gap-2 mt-6'>
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <div className="block">
          <p>Leslie Alexaner</p> 
          <span className='text-xs text-gray-400'>Customer</span>
        </div>
      </div>
    </div>
  )
}

export default CartCustomerReivew
