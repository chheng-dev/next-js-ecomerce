import React, { Fragment } from 'react'
import { Button } from "@nextui-org/react";
import { ArrowRightLeft, Eye, StarIcon } from 'lucide-react';
import Link from 'next/link';
import Currency from '@/lib/formatterAmount';
import { motion } from 'framer-motion'

const animationVariants = {
  hidden: {opacity:0, y: 20},
  visible: {opacity: 1, y: 0}
}

const CartItem = ({index, title, brand, image, price, currency, oriPrice, oriCurrency}) => {
  return (
    <motion.div
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      transition={{
        data: index * 0.1,
        duration: 0.3
      }}
    >
      <Link href={`/products/${title}`}>
        <div className="hover:shadow-md hover:rounded-lg transition duration-300 ease-in-out xl:mb-0 lg:mb-0 md:mb-0 mb-6 cursor-pointer group">
          <div className="overflow-hidden relative">
            <img 
              className="w-full transition lg:h-64 h:72 duration-700 ease-in-out group-hover:opacity-60 rounded-md" 
              src={image || `https://via.placeholder.com/150`} 
              alt={title} 
              loading="lazy"
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

          <div className="px-4 py-3 bg-white rounded-b-md">
            <h6 className="section-title my-0 text-gray-800 font-semibold hover:text-red-500 transition duration-300 ease-in-out">
              {title}
            </h6>
            {
              brand && 
              <span className='bg-primary px-1.5 py-0.3 rounded-md text-xs text-white'>
                {brand}
              </span>
            }
            
            <div className="flex py-2 items-center">
              <p className="mr-2 text-md text-gray-600">{Currency.formatToDollar(price, currency)}</p>
              <p className="mr-2 text-xs text-red-600 line-through">{Currency.formatToDollar(oriPrice, oriCurrency)}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default CartItem;
