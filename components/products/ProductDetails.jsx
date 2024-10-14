"use client"
import ModalPreviewImage from '@/components/products/modal/ModalPreviewImage';
import TabsFilter from '@/components/products/product-detail/TabsFilter';
import RelatedProduct from '@/components/products/RelatedProduct';
import { Button, Input } from '@nextui-org/react'
import { Heart, HeartIcon, Minus, Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function ProductDetails() {
  const [count, setCount] = useState(1);
  const [isModalPreviewImageOpen, setModalPreviewImage] = useState(false);
  const [selectedImagePreview, setImagePreview] = useState(null);

  const sizeItems = [
    {
      title: 's',
      key: 's'
    },
    {
      title: 'm',
      key: 'm'
    },
    {
      title: 'l',
      key: 'l'
    },
    {
      title: 'xl',
      key: 'xl'
    },
    {
      title: 'xxl',
      key: 'xxl'
    },
  ]

  const handleDecrement = () => {
    if(count > 1) setCount(count - 1)
  }

  const handleIncrement = () => {
    setCount(count + 1)
  }

  const [mainImageSrc, setMainImageSrc] = useState("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080");

  const handleThumbnailClick = (newSrc) => {
    setMainImageSrc(newSrc);
  };

  const handlePreviewImage = (src) => {
    setModalPreviewImage(true);
    setImagePreview(src)
  }

  const closeModal = () => {
    setModalPreviewImage(false);
    setImagePreview(null);
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={mainImageSrc}
              alt="Product"
              className="w-full h-auto rounded-lg shadow-md mb-4 image-zoom-container relative hover:cursor-pointer"
              id="mainImage"
              onClick={() => handlePreviewImage(mainImageSrc)}
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {[
                "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080",
                "https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
                "https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
                "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080",
              ].map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => handleThumbnailClick(src)}
                />
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4">
            <div className='flex items-start justify-between'>
              <div>
                <h4 className="text-3xl font-bold mb-2">Premium Wireless Headphones</h4>
                <p className="text-gray-600 mb-4">SKU: WH1000XM4</p>
              </div>
              <div className='py-2'>
                <span className='bg-green-200 text-green-500 px-2 py-0.5 rounded-md text-xs'>In stock</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="text-xl font-bold mr-2">$349.99</span>
              <span className="text-gray-500 line-through">$399.99</span>
            </div>
            <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                className="size-6 text-yellow-500">
                <path fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                className="size-6 text-yellow-500">
                <path fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                className="size-6 text-yellow-500">
                <path fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                className="size-6 text-yellow-500">
                <path fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                className="size-6 text-yellow-500">
                <path fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
            </div>
            <p className="text-gray-700 mb-6">Experience premium sound quality and industry-leading noise cancellation
              with
              these wireless headphones. Perfect for music lovers and frequent travelers.</p>

            <div className="mb-6">
              <h5 className="text-lg font-semibold mb-2">Color:</h5>
              <div className="flex space-x-2">
                <button className="w-6 h-6 bg-black rounded-lg"></button>
                <button className="w-6 h-6 bg-gray-300 rounded-lg"></button>
                <button className="w-6 h-6 bg-blue-500 rounded-lg"></button>
                <button className="w-6 h-6 bg-red-500 rounded-lg"></button>
                <button className="w-6 h-6 bg-green-500 rounded-lg"></button>

              </div>
            </div>

            <div className="mb-8">
              <h5 className="text-lg font-semibold mb-2">Size:</h5>
              <div className="flex space-x-2">
                {
                  sizeItems.map(item => {
                    return (
                      <button key={item.key} className="w-8 h-8 uppercase border border-primary rounded-md text-xs font-bold active:bg-primary">
                        {item.title}
                      </button>
                    )
                  })
                }
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              <div className="w-32 h-full">
              <div className="flex items-center justify-between h-full border border-primary rounded-md px-1">
                <button
                  className="w-8 h-8 flex items-center justify-center cursor-pointer focus:outline-none"
                  onClick={handleDecrement}
                  aria-label="Decrease count"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className='text-sm'>{count}</span>
                <button
                  className="w-8 h-8 flex items-center justify-center cursor-pointer focus:outline-none"
                  onClick={handleIncrement}
                  aria-label="Increase count"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              </div>
              <div className='w-full'>
                <Button className='bg-primary text-white w-full'>Add to Cart</Button>
              </div>
              <div className='col-span-1'>
                <div className='border border-primary rounded-md py-2.5 px-3'>
                  <HeartIcon className='w-4 h-4' />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Image Preview  */}
          <ModalPreviewImage 
            isOpen={isModalPreviewImageOpen} 
            item={selectedImagePreview} 
            onClose={closeModal}
          />
        </div>

        {/* Tab Content  */}
        <TabsFilter />

        {/* Related Products  */}
        <RelatedProduct />
      </div>
    </div>
  )
}

export default ProductDetails
