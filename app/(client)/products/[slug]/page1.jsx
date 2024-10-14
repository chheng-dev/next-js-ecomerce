"use client"
import ModalPreviewImage from '@/components/products/modal/ModalPreviewImage';
import TabsFilter from '@/components/products/product-detail/TabsFilter';
import RelatedProduct from '@/components/products/RelatedProduct';
import { Button, Input } from '@nextui-org/react'
import { Heart, HeartIcon, Minus, Plus, X } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { products } from '@/data/products';

function ProductDetails({ product }) {
  const [count, setCount] = useState(1);
  const [isModalPreviewImageOpen, setModalPreviewImage] = useState(false);
  const [selectedImagePreview, setImagePreview] = useState(null);

  const router = useRouter();

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

  if(router.isFallback) {
    return <div>Loading...</div>;
  }

  if(!product) {
    return <div>Product not found</div>;
  }

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
              src={product.mainImage}
              alt="Product"
              className="w-full h-auto rounded-lg shadow-md mb-4 cursor-pointer"
              onClick={() => handleThumbnailClick(product.mainImage)}
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {product.images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => handleThumbnailClick(src)}
                />
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4">
            <h4 className="text-3xl font-bold mb-2">{product.title}</h4>
            <p className="text-gray-600 mb-4">SKU: {product.sku}</p>
            <div className="mb-4">
              <span className="text-xl font-bold mr-2">${product.price.toFixed(2)}</span>
              <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center mb-4">
              {/* Stars Rating */}
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="mb-6">
              <h5 className="text-lg font-semibold mb-2">Size:</h5>
              <div className="flex space-x-2">
                {sizeItems.map(item => (
                  <button key={item.key} className="border rounded-md px-4 py-2 hover:bg-gray-200 transition">
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center mb-6">
              <button onClick={handleDecrement} className="border rounded-md px-3 py-1">-</button>
              <span className="mx-4">{count}</span>
              <button onClick={handleIncrement} className="border rounded-md px-3 py-1">+</button>
            </div>

            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {isModalPreviewImageOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg relative">
            <button className="absolute top-2 right-2 text-black" onClick={closeModal}>
              X
            </button>
            <img src={selectedImagePreview} alt="Preview" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails
