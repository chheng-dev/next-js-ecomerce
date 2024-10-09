"use client"
import Slider from "react-slick";
import React from "react";
import CartItemCategory from "./CartItemCategory";

const CarouselCategoryComp = React.forwardRef(({ items }, ref) => {

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
        {items.map((item, index) => (
          <div key={index} className="p-2">
            <CartItemCategory
              title={item.title}
              image={item.image}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
});

export default CarouselCategoryComp;
