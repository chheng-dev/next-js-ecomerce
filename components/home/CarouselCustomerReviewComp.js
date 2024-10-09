"use client"
import Slider from "react-slick";
import React from "react";
import CartCustomerReview from "./CartCustomerReivew";

const CarouselCustomerReviewComp = React.forwardRef(({ reviews }, ref) => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
        {reviews.map((review, index) => (
          <div key={index} className="p-2">
            <CartCustomerReview
              rating={review.rating}
              content={review.content}
              name={review.name}
              avatar={review.avatar}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
});

export default CarouselCustomerReviewComp;
