"use client"
import { Accordion, AccordionItem } from '@nextui-org/react';
import { ActivityIcon, CalendarPlus2, ChevronDown, FileHeartIcon, LayoutGridIcon, Percent, SlidersIcon, TrendingDown, TrendingUp } from 'lucide-react'
import Link from 'next/link';
import React, { useState } from 'react'

export const TopRightHeaderFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sortByContent = [
    {
      value: 'default',
      label: 'Default',
      icon: LayoutGridIcon
    },
    {
      value: 'trending',
      label: 'Trending',
      icon: ActivityIcon
    },
    {
      value: 'discount',
      label: 'Discount',
      icon: Percent
    },
    {
      value: 'newest',
      label: 'Newest First',
      icon: CalendarPlus2
    },
    {
      value: 'price_high_to_low',
      label: 'Price: High to Low',
      icon: TrendingUp
    },
    {
      value: 'price_low_to_high',
      label: 'Price: Low to High',
      icon: TrendingDown
    }
  ];


  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-sm text-end",
    trigger: "py-0",
    indicator: "text-sm",
    content: "text-sm",
  };

  return (
    <div className='flex items-start justify-between gap-4'>
      <div className='flex gap-3 w-4/5'>
        <LayoutGridIcon className='w-5 h-5' />
        <SlidersIcon className='w-5 h-5' />
        <span className='text-sm'>Showing 1-16 of 72 results</span>
      </div>
      <div className='w-1/5 flex justify-end'>
        <Accordion
          isCompact
          itemClasses={itemClasses}
          showDivider={false}
          className="py-0"
        >
          <AccordionItem key="1" aria-label="Sort by latest" title="Sort by latest">
            {
              sortByContent.map(item => {
                const Icon = item.icon;
                return (
                  <div className="w-full mx-auto" key={item.value}>
                    <div className="flex items-center justify-end space-x-2 gap-3">
                      <Link href={item.value} className="py-2 flex items-center">
                        {item.label}
                        <Icon className="w-3 h-3 ml-2" />
                      </Link>
                    </div>
                  </div>
                )
              })
            }
          </AccordionItem>
        </Accordion>

      </div>


    </div>
  )
}

