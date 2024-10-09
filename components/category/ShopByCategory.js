"use client"

import { ArrowLeftSquare, ArrowRightSquare, ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useRef } from 'react'
import CarouselCategoryComp from '../home/CarouselCategory'

const ShopByCategory = () => {

  const carouselRef = useRef(null);


  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.slickNext();
    }
  };

  const items = [
    {
      image: "https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/462212871_1274884187293171_813487367334278070_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeESvJAwifc9Gepj0wzXgft9nyUsizC3wKyfJSyLMLfArJYORN5KHabvUycCfmq6eeEDdgXlG6ppMt8WSMh6xuJX&_nc_ohc=eHaE4c1_ml8Q7kNvgHcwV2U&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=APCQKVPovIFcQ2Ja_R5yKdP&oh=00_AYD0uG3qplt4qWWZqb5e0Jl5NHHlWIkjiK0dD9Hr92BDcA&oe=670AFAB5",
      title: "IAS Brand"
    },
    {
      image: "https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/462144311_1272847254163531_2038875184300257113_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGgfq-Z6ML-aGOjvjRIHZXvWdK-dRSp7YVZ0r51FKnthdKZqC8ETnOtorNFplT6iFU2zkmcutPJCtg2Cgi4LM0A&_nc_ohc=Kd1jIVfXLlcQ7kNvgFVhigA&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=Aw9omGu1_MoJXVFtWqbE1tQ&oh=00_AYCRLFULpZmaTSkmXI0WMajOeVMo7fPocH7zDA8WrdAT2w&oe=670ACF37",
      title: "Bamboo Set"
    },
    {
      image: "https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/461522062_1268656107915979_2689256980205437054_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFekWMBiyd07DugnkrPbLBuwrYudrvHS9DCti52u8dL0F6HXFWQKlXg40OFHkvaOoe3OCUM2I2Pp67TfSHDJAm8&_nc_ohc=APNAlUMFsy0Q7kNvgERN4Ow&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=ArjMYQjFGBU09CZhQM1uIb3&oh=00_AYCFg4U3AbOl7idiQ04uT_MUfzWO4dy56L_gCFwv5QnAng&oe=670AD639",
      title: "Chang"
    },
    {
      image: "https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/461321837_1266353711479552_4872476058716952470_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGPWfD03tXOfZumILHUg84c14zgPIK7EtvXjOA8grsS234fetV_sktXouIXEeCApq9q2VwrzONRi5-laIacrXbh&_nc_ohc=lmIs_uOa_AcQ7kNvgGwAnxS&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=AaiZ5-jQRRTwtnLnkNMsMj9&oh=00_AYDZb-b-6GQW5kmwOxXgKm_rWqPUFJsOzZa2UsVLKaAgGg&oe=670AD99A",
      title: "Baby Set"
    }
  ]
  return (
    <div className='w-full h-full px-4 lg:px-0'>
      <div className='flex justify-between items-center'>
        <div>
          <h4>Shop By Categories</h4>
        </div>
        <div className='flex gap-2'>
          <span className='bg-primary rounded-md p-1.5' onClick={handlePrevClick}>
            <ChevronLeft className='w-4 h-4 text-white cursor-pointer' />
          </span>
          <span className='bg-primary rounded-md p-1.5' onClick={handleNextClick}
          >
            <ChevronRight className='w-4 h-4 text-white cursor-pointer' />
          </span>
        </div>
      </div>


      {/* Cart Item  */}
      <div className='mt-4'>
        <CarouselCategoryComp ref={carouselRef} items={items} />
      </div>
    </div>
  )
}

export default ShopByCategory
