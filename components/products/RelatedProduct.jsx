import React from 'react'
import CartItem from '../CartItem'

const RelatedProduct = () => {
  const relatedProducts = [
    {
      image: "https://via.placeholder.com/150",
      title: "White Line Baby",
      price: 10,
      brand: 'Chang',
      originalPrice: 20.00,
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Black Line Baby",
      price: 12,
      brand: 'Chang',
      originalPrice: 22.00,
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Blue Line Baby",
      price: 15,
      brand: 'Chang',
      originalPrice: 25.00,
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Green Line Baby",
      price: 9,
      brand: 'Chang',
      originalPrice: 19.00,
    },
  ];


  return (
    <div className='container mx-auto my-6'>
      <h4 className='font-normal'>Related Products</h4>
      <div className='grid grid-cols-4 gap-4 mt-4'>
        {
          relatedProducts.map((product, idx) => (
            <CartItem 
              image={product.image}
              title={product.title}
              price={product.price}
              brand={product.brand}
              originalPrice={product.originalPrice}
            />
          ))
        }
      </div>
    </div>
  )
}

export default RelatedProduct
