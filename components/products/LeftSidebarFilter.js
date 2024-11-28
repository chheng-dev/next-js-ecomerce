"use client"

import React, { useEffect, useState } from 'react'
import FilterByProductCategories from './left/FilterByProductCategories'
import FilterByPrice from './left/FilterByPrice'
import { Accordion, AccordionItem, Checkbox } from "@nextui-org/react";
import FilterByColor from './left/FilterByColor';
import FilterBySizes from './left/FilterBySizes';
import { CategoryService } from '@/app/(client)/services/categoryService';
import { toast } from 'react-toastify';
import { generateSlug } from '@/lib/slugHelper';

export default function LeftSidebarFilter() {
  const [categories, setCategories] = useState([]);

  const itemClasses = {
    base: "py-0 w-full",
    title: "font-bold text-medium",
    indicator: "text-medium",
    content: "text-medium py-0",
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await CategoryService.fetchCategories();
      if (response.ok) {
        setCategories(response.data);
      } else {
        toast.error(`Failed to fetch categories:)`);
      }
    } catch (error) {
      toast.error('An error occurred while fetching categories');
      console.error('Error details:', error);
    }
  }

  const productCategoriesContent = categories.map((item, idx) => ({
    value: generateSlug(item.title),
    label: item.title,
    id: `${item.title}-${idx}`
  }));

  const filterByColorItems = [
    {
      value: "red",
      label: "Red",
      code: "#dc2626",
      qty: 10
    },
    {
      value: "blue",
      label: "Blue",
      code: "#1d4ed8",
      qty: 14
    },
    {
      value: "green",
      label: "Green",
      code: "#16a34a",
      qty: 8
    },
    {
      value: "yellow",
      label: "Yellow",
      code: "#facc15",
      qty: 12
    },
    {
      value: "purple",
      label: "Purple",
      code: "#9333ea",
      qty: 7
    },
    {
      value: "orange",
      label: "Orange",
      code: "#f97316",
      qty: 9
    },
    {
      value: "black",
      label: "Black",
      code: "#000000",
      qty: 20
    }
  ];

  const filterBySizes = [
    {
      value: 's',
      label: 'S',
      qty: 20
    },
    {
      value: 'm',
      label: 'M',
      qty: 15
    },
    {
      value: 'l',
      label: 'L',
      qty: 10
    },
    {
      value: 'xl',
      label: 'XL',
      qty: 8
    },
    {
      value: 'xxl',
      label: 'XXL',
      qty: 5
    },
    {
      value: 'xxxl',
      label: 'XXXL',
      qty: 2
    }
  ];

  return (
    <>
      <Accordion
        showDivider={false}
        className="p-2 flex flex-col gap-1 w-full"
        variant="light"
        itemClasses={itemClasses}
        defaultExpandedKeys={["1", "2"]}
      >
        {/* Filter by Product Categories  */}
        <AccordionItem
          key="1"
          aria-label="Product Categories"
          title="Product Categories"
        >
          <div className='flex flex-col gap-y-2 items-start'>
            <FilterByProductCategories items={productCategoriesContent} />
          </div>
        </AccordionItem>


        {/* Filter by Price  */}
        <AccordionItem
          key="2"
          aria-label="Filter by Price"
          title="Filter by Price"
        >
          <div className='flex flex-col gap-y-2 items-start'>
            <FilterByPrice />
          </div>
        </AccordionItem>

        {/* Filter by Color  */}
        <AccordionItem
          key="3"
          aria-label="Filter by Color"
          title="Filter by Color"
        >
          <div className='w-full'>
            <FilterByColor items={filterByColorItems} />
          </div>
        </AccordionItem>

        {/* Filter by Size  */}
        <AccordionItem
          key="4"
          aria-label="Filter by Size"
          title="Filter by Size"
        >
          <div className='w-full'>
            <FilterBySizes items={filterBySizes} />
          </div>
        </AccordionItem>
      </Accordion>
    </>
  )
}

