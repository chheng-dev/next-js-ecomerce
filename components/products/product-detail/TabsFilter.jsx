import React from 'react'
import {Tabs, Tab, Chip, Card, CardBody} from "@nextui-org/react";
import ReviewSection from './ReviewSection';

function TabsFilter() {

  return (
    <div className="flex w-full flex-col">
      <Tabs 
        aria-label="Options" 
        variant="underlined"
        color="primary" 
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]"
        }}
      >
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <span>Descriptions</span>
            </div>
          }
        >
          <div>
            <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam fuga perferendis consequuntur officia corporis eaque. Eum aspernatur fugit et expedita, rem aut enim quas fugiat optio nobis tempore mollitia aliquam nam nesciunt facere. Laboriosam facilis esse quisquam magnam itaque doloremque atque iure nisi eum voluptate libero architecto, corrupti nobis facere totam aliquid! Cumque tempora at inventore odit delectus officia, ab quae possimus laudantium consequatur modi commodi deleniti nisi ad ratione neque placeat molestias ut ea sint atque? Architecto vitae quod dolorem, eius, cupiditate, aliquam placeat distinctio deleniti in consectetur enim.</p>
          </div>
        </Tab>
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
              <span>Additional Infomation</span>
            </div>
          }
        >
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm">
          <div className="font-semibold">Color</div>
          <span className="text-gray-700">Red, Blue, Orange, Black, Green, Yellow</span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="font-semibold">Size</div>
          <span className="text-gray-700">S, M, L, XL, XXL</span>
        </div>
      </div>


        </Tab>
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              <span>Reviews</span>
            </div>
          }
        >
          <ReviewSection />
        </Tab>
      </Tabs>
    </div>  
  )
}

export default TabsFilter


