import React, { Fragment } from 'react'
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { ArrowRightLeft, Eye, Star, StarIcon } from 'lucide-react';

const CartItem = ({title, image, price, originalPrice}) => {
  return (
    <Fragment>
      <div className="hover:shadow-md hover:rounded-lg transition duration-300 ease-in-out xl:mb-0 lg:mb-0 md:mb-0 mb-6 cursor-pointer group">
        <div className="overflow-hidden relative">
        <img 
          className="w-full transition h-64 duration-700 ease-in-out group-hover:opacity-60 rounded-md" 
          src={image} 
          alt="image" 
        />
        <div className="flex justify-end">
          <div className="absolute top-4 right-4 block transition duration-500 ease-in-out opacity-0 group-hover:opacity-100">
            <div className='rounded-full bg-slate-200 p-2 my-1.5'>
              <StarIcon className='w-4 h-4' />
            </div>

            <div className='rounded-full bg-slate-200 p-2 my-1.5'>
              <ArrowRightLeft className='w-4 h-4' />
            </div>

            <div className='rounded-full bg-slate-200 p-2 my-1.5'>
              <Eye className='w-4 h-4' />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="absolute bottom-4 block transition duration-500 ease-in-out opacity-0 group-hover:opacity-100">
            <Button className='bg-white' radius="lg">
              Add to cart
            </Button>  
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-white">
        <a href="#" className="">
          <h5 className="my-0 text-gray-800 font-semibold text-lg hover:text-red-500 transition duration-300 ease-in-out">
            {title}
          </h5>
        </a>
        <div className="flex py-2">
            <p className="mr-2 text-xs text-gray-600">${price}</p>
                <p className="mr-2 text-xs text-red-600 line-through">${originalPrice}</p>
        </div>
      </div>
    </div>
    </Fragment>
  )
}

export default CartItem
