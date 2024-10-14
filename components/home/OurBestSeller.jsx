import React from 'react'
import CartItem from '../CartItem'

const OurBestSeller = () => {
  const products = [
    {
      image: 'https://via.placeholder.com/150',
      title: 'Placeholder Item 1',
      price: 10,
      brand: 'Brand A',
      originalPrice: 20.00,
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Placeholder Item 2',
      price: 15,
      brand: 'Brand B',
      originalPrice: 30.00,
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Placeholder Item 3',
      price: 12,
      brand: 'Brand C',
      originalPrice: 25.00,
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Placeholder Item 4',
      price: 8,
      brand: 'Brand D',
      originalPrice: 16.00,
    },
    {
      image: 'https://via.placeholder.com/150',
      title: 'Placeholder Item 5',
      price: 18,
      brand: 'Brand E',
      originalPrice: 36.00,
    },
  ];
  return (
    <div className='my-16 lg:px-0 px-4'>
      <div className='w-full text-center my-5'>
        <h4>Our Bestseller</h4>
      </div>

      <div className='grid lg:grid-cols-5 gap-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1'>
        {
          products.map((item, idx) => (
            <CartItem 
              key={idx}
              image={item.image}
              title={item.title}
              price={item.price}
              brand={item.brand}
              originalPrice={item.originalPrice}
            />
          ))
        }
      </div>
    </div>
  )
}

export default OurBestSeller
