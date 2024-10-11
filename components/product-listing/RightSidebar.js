"use client"
import React from 'react'
import CartItem from '../CartItem'
import { TopRightHeaderFilter } from './right/TopRightHeaderFilter'

export default function RightSidebar() {

  const productItems = [
    {
      "id": 1,
      "key": "1",
      "image": "https://via.placeholder.com/150",
      "title": "White Line Baby",
      "price": 10,
      "brand": "Chang",
      "originalPrice": 20.00
    },
    {
      "id": 2,
      "key": "2",
      "image": "https://via.placeholder.com/150",
      "title": "Baby Cloth",
      "price": 10,
      "brand": "Chang",
      "originalPrice": 20.00
    },
    {
      "id": 3,
      "key": "3",
      "image": "https://via.placeholder.com/150",
      "title": "Blue Baby Shoes",
      "price": 15,
      "brand": "Nike",
      "originalPrice": 30.00
    },
    {
      "id": 4,
      "key": "4",
      "image": "https://via.placeholder.com/150",
      "title": "Cute Baby Hat",
      "price": 8,
      "brand": "Adidas",
      "originalPrice": 18.00
    },
    {
      "id": 5,
      "key": "5",
      "image": "https://via.placeholder.com/150",
      "title": "Soft Baby Blanket",
      "price": 20,
      "brand": "Pampers",
      "originalPrice": 40.00
    },
    {
      "id": 6,
      "key": "6",
      "image": "https://via.placeholder.com/150",
      "title": "Baby Diaper Bag",
      "price": 25,
      "brand": "Chicco",
      "originalPrice": 50.00
    },
    {
      "id": 7,
      "key": "7",
      "image": "https://via.placeholder.com/150",
      "title": "Baby Carrier",
      "price": 30,
      "brand": "BabyBjörn",
      "originalPrice": 60.00
    },
    {
      "id": 8,
      "key": "8",
      "image": "https://via.placeholder.com/150",
      "title": "Infant Car Seat",
      "price": 100,
      "brand": "Graco",
      "originalPrice": 200.00
    },
    {
      "id": 9,
      "key": "9",
      "image": "https://via.placeholder.com/150",
      "title": "Baby Play Gym",
      "price": 45,
      "brand": "Fisher-Price",
      "originalPrice": 90.00
    },
    {
      "id": 10,
      "key": "10",
      "image": "https://via.placeholder.com/150",
      "title": "Pacifier Clips",
      "price": 5,
      "brand": "Binky",
      "originalPrice": 10.00
    },
    {
      "id": 11,
      "key": "11",
      "image": "https://via.placeholder.com/150",
      "title": "Baby Walker",
      "price": 75,
      "brand": "VTech",
      "originalPrice": 150.00
    },
    {
      "id": 12,
      "key": "12",
      "image": "https://via.placeholder.com/150",
      "title": "Baby Food Maker",
      "price": 80,
      "brand": "Beaba",
      "originalPrice": 160.00
    },
    {
      "id": 13,
      "key": "13",
      "image": "https://via.placeholder.com/150",
      "title": "Baby Monitor",
      "price": 150,
      "brand": "Motorola",
      "originalPrice": 300.00
    },
    {
      "id": 14,
      "key": "14",
      "image": "https://via.placeholder.com/150",
      "title": "Musical Mobile",
      "price": 30,
      "brand": "Tiny Love",
      "originalPrice": 60.00
    },
    {
      "id": 15,
      "key": "15",
      "image": "https://via.placeholder.com/150",
      "title": "Teething Toys",
      "price": 10,
      "brand": "Nuby",
      "originalPrice": 20.00
    },
    {
      "id": 16,
      "key": "16",
      "image": "https://via.placeholder.com/150",
      "title": "Bath Time Set",
      "price": 25,
      "brand": "Pigeon",
      "originalPrice": 50.00
    },
    {
      "id": 17,
      "key": "17",
      "image": "https://via.placeholder.com/150",
      "title": "Stroller",
      "price": 200,
      "brand": "Britax",
      "originalPrice": 400.00
    },
    {
      "id": 18,
      "key": "18",
      "image": "https://via.placeholder.com/150",
      "title": "Baby Swing",
      "price": 150,
      "brand": "4moms",
      "originalPrice": 300.00
    },
    {
      "id": 19,
      "key": "19",
      "image": "https://via.placeholder.com/150",
      "title": "Baby Shoes",
      "price": 20,
      "brand": "Stride Rite",
      "originalPrice": 40.00
    },
    {
      "id": 20,
      "key": "20",
      "image": "https://via.placeholder.com/150",
      "title": "Baby Essentials Kit",
      "price": 50,
      "brand": "Little Me",
      "originalPrice": 100.00
    }
  ]

  return (
    <div>
      <TopRightHeaderFilter />
      <div className='grid grid-cols-4 gap-3 my-4'>
        {
          productItems.map((item, idx) => {
            return (
              <CartItem
                key={idx}
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




