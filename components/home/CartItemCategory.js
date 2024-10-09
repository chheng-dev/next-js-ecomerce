import React from 'react'
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

function CartItemCategory({ title, image }) {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none"
    >
      <img
        alt="Woman listing to music"
        className="object-cover h-[400px]"
        src={image}
      />
      <CardFooter className="justify-center px-2 before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 shadow-small z-10">
        <p className="text-tiny text-primary/80 uppercase font-bold">{title}</p>
      </CardFooter>
    </Card>
  )
}

export default CartItemCategory
