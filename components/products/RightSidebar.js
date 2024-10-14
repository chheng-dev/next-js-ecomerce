"use client"
import React from 'react'
import CartItem from '../CartItem'
import { TopRightHeaderFilter } from './right/TopRightHeaderFilter'

export default function RightSidebar() {

  const productItems = [
    {
      "id": 1,
      "key": "1",
      "slug": "slug-1",
      "image": "https://via.placeholder.com/150",
      "title": "White Line Baby",
      "price": 10,
      "brand": "Chang",
      "originalPrice": 20.00
    },
    {
      "id": 2,
      "key": "2",
      "slug": "baby-cloth",
      "image": "https://via.placeholder.com/150",
      "title": "Baby Cloth",
      "price": 10,
      "brand": "Chang",
      "originalPrice": 20.00
    },
    {
      "id": 3,
      "key": "3",
      "slug": "blue-baby-shoes",
      "image": "https://via.placeholder.com/150",
      "title": "Blue Baby Shoes",
      "price": 15,
      "brand": "Nike",
      "originalPrice": 30.00
    },
    {
      "id": 4,
      "key": "4",
      "slug": "cute-baby-hat",
      "image": "https://via.placeholder.com/150",
      "title": "Cute Baby Hat",
      "price": 8,
      "brand": "Adidas",
      "originalPrice": 18.00
    },
    {
      "id": 5,
      "key": "5",
      "slug": "soft-baby-blanket",
      "image": "https://via.placeholder.com/150",
      "title": "Soft Baby Blanket",
      "price": 20,
      "brand": "Pampers",
      "originalPrice": 40.00
    },
    {
      "id": 6,
      "key": "6",
      "slug": "baby-diaper-bag",
      "image": "https://via.placeholder.com/150",
      "title": "Baby Diaper Bag",
      "price": 25,
      "brand": "Chicco",
      "originalPrice": 50.00
    },
    {
      "id": 7,
      "key": "7",
      "slug": "baby-carrier",
      "image": "https://via.placeholder.com/150",
      "title": "Baby Carrier",
      "price": 30,
      "brand": "BabyBjörn",
      "originalPrice": 60.00
    },
    {
      "id": 8,
      "key": "8",
      "slug": "infant-car-seat",
      "image": "https://via.placeholder.com/150",
      "title": "Infant Car Seat",
      "price": 100,
      "brand": "Graco",
      "originalPrice": 200.00
    },
    {
      "id": 9,
      "key": "9",
      "slug": "baby-play-gym",
      "image": "https://via.placeholder.com/150",
      "title": "Baby Play Gym",
      "price": 45,
      "brand": "Fisher-Price",
      "originalPrice": 90.00
    },
    {
      "id": 10,
      "key": "10",
      "slug": "pacifier-clips",
      "image": "https://via.placeholder.com/150",
      "title": "Pacifier Clips",
      "price": 5,
      "brand": "Binky",
      "originalPrice": 10.00
    },
  ];

  return (
    <div>
      <TopRightHeaderFilter />
      <div className='grid grid-cols-4 gap-3 my-4'>
        {
          productItems.map((item, idx) => {
            return (
              <CartItem
                key={idx}
                slug={item.slug}
                image={item.image}
                title={item.title}
                price={item.price}
                brand={item.brand}
                originalPrice={item.originalPrice}
              />
            )
          })
        }
      </div>
    </div>
  )
}




