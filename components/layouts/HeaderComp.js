"use client"
import { Button } from '@nextui-org/react';
import { ChevronDown, Heart, HeartIcon, SearchIcon, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function HeaderComp() {
  const dropdownCategoryMen = [
    {
      title: 'T-Shirts',
      key: 't-shirts'
    },
    {
      title: 'Casual Shirts',
      key: 'casual-shirts'
    },
    {
      title: 'Formal Shirts',
      key: 'formal-shirts'
    },
    {
      title: 'Jeans',
      key: 'jeans'
    },
    {
      title: 'Chinos',
      key: 'chinos'
    },
    {
      title: 'Jackets',
      key: 'jackets'
    },
    {
      title: 'Blazers',
      key: 'blazers'
    },
    {
      title: 'Sweaters',
      key: 'sweaters'
    },
    {
      title: 'Hoodies',
      key: 'hoodies'
    },
    {
      title: 'Shorts',
      key: 'shorts'
    }
  ];

  const dropdownCategoryWomen = [
    {
      title: 'Dresses',
      key: 'dresses'
    },
    {
      title: 'Blouses',
      key: 'blouses'
    },
    {
      title: 'Skirts',
      key: 'skirts'
    },
    {
      title: 'Jeans',
      key: 'jeans'
    },
    {
      title: 'Jackets',
      key: 'jackets'
    },
    {
      title: 'Cardigans',
      key: 'cardigans'
    }
  ];

  const dropdownCategoryFootwear = [
    {
      title: 'Sneakers',
      key: 'sneakers'
    },
    {
      title: 'Loafers',
      key: 'loafers'
    },
    {
      title: 'Boots',
      key: 'boots'
    },
    {
      title: 'Sandals',
      key: 'sandals'
    },
    {
      title: 'Flip Flops',
      key: 'flip-flops'
    },
    {
      title: 'Formal Shoes',
      key: 'formal-shoes'
    }
  ];

  const dropdownCategoryKids = [
    {
      title: 'T-Shirts',
      key: 't-shirts'
    },
    {
      title: 'Casual Tops',
      key: 'casual-tops'
    },
    {
      title: 'Dresses',
      key: 'dresses'
    },
    {
      title: 'Shorts',
      key: 'shorts'
    },
    {
      title: 'Jeans',
      key: 'jeans'
    },
    {
      title: 'Skirts',
      key: 'skirts'
    },
    {
      title: 'Sweaters',
      key: 'sweaters'
    },
    {
      title: 'Jackets',
      key: 'jackets'
    },
    {
      title: 'Pajamas',
      key: 'pajamas'
    },
    {
      title: 'Activewear',
      key: 'activewear'
    },
    {
      title: 'Footwear',
      key: 'footwear'
    },
    {
      title: 'Accessories',
      key: 'accessories'
    }
  ];


  return (
    <nav className="bg-white border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto py-4 lg:px-0 px-4">
        <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BRAVA MAMA</span>
        </a>
        <div className="flex items-center md:order-2 space-x-1 md:space-x-4 rtl:space-x-reverse">
          <div className='items-center justify-end md:order-2 space-x-1 md:space-x-4 rtl:space-x-reverse hidden lg:flex'>
            <SearchIcon className='w-4 h-4' />
            <HeartIcon className='w-4 h-4' />
            <ShoppingBag className='w-4 h-4' />

            <Button color='primary' size='sm'>Login</Button>
          </div>

          <button data-collapse-toggle="mega-menu" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mega-menu" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div id="mega-menu" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
            <li>
              <Link href="/" className="block py-2 px-3 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0">
                Home
              </Link>
            </li>

            <li className="relative group">
              <button
                id="mega-menu-dropdown-button"
                className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                All Categories
                <ChevronDown className='w-4 h-4' />
              </button>

              <div className="relative">
                <div
                  id="mega-menu-dropdown"
                  className="absolute z-10 top-3 left-1/2 transform -translate-x-1/2 w-[800px] max-w-screen-lg text-sm bg-white border border-gray-100 rounded-lg shadow-lg hidden group-hover:grid grid-cols-4"
                >
                  <div className="border-r border-slate-300 px-4 pb-0 my-4 w-full">
                    <div className="text-gray-900">
                      <div className="my-3">
                        <h5 className="category-title">Men</h5>
                      </div>
                      <ul className="space-y-4" aria-labelledby="mega-menu-dropdown-button">
                        {dropdownCategoryMen.map((item, idx) => (
                          <li key={idx}>
                            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-r border-slate-300 px-4 pb-0 my-4 w-full">
                    <div className="my-3">
                      <h5 className="category-title">Women</h5>
                    </div>
                    <ul className="space-y-4">
                      {dropdownCategoryWomen.map((item, idx) => (
                        <li key={idx}>
                          <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-r border-slate-300 px-4 pb-0 my-4 w-full">
                    <div className="my-3">
                      <h5 className="category-title">Footwear</h5>
                    </div>
                    <ul className="space-y-4">
                      {dropdownCategoryFootwear.map((item, idx) => (
                        <li key={idx}>
                          <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="px-4 pb-0 my-4 w-full">
                    <div className="my-3">
                      <h5 className="category-title">Kids</h5>
                    </div>
                    <ul className="space-y-4">
                      {dropdownCategoryKids.map((item, idx) => (
                        <li key={idx}>
                          <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500">
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

            </li>

            <li>
              <Link href="/product-listing" className="block py-2 px-3 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0">All Products</Link>
            </li>

            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Team</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HeaderComp;
