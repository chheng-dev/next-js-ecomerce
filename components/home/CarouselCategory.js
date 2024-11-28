"use client";
import Slider from "react-slick";
import React from "react";
import CartItemCategory from "./CartItemCategory";
import { Skeleton } from '@nextui-org/react'; // Add Skeleton import

const CarouselCategoryComp = React.forwardRef(({ items, loading }, ref) => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative">
      <Slider ref={ref} {...settings}>
        {loading
          ? Array(5).fill(0).map((_, index) => (
            <div key={index} className="p-2">
              <Skeleton height={200} width="100%" />
            </div>
          ))
          : items.map((item, index) => (
            <div key={index} className="p-2">
              <CartItemCategory
                title={item.name}
                image={item.icon_url}
              />
            </div>
          ))}
      </Slider>
    </div>
  );
});

export default CarouselCategoryComp;
