"use client"
import { Badge, Input } from '@nextui-org/react'
import { Bell, MenuIcon, SearchIcon } from 'lucide-react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";

import React from 'react'

const Header = () => {
  return (
    <div className='bg-white shadow-sm text-primary py-3 px-4 sticky top-0 z-30'>
      <div className='flex items-center justify-between'>
        <div className='w-1/6'>
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </a>
        </div>
        <div className='w-2/6'>
          <div className='flex items-center gap-x-4'>
            <MenuIcon className='w-4 h-4' />
            <div className='w-full'>
              <Input
                type="search"
                size='sm'
                placeholder="Search"
                defaultValue=""
                className="w-full"
                variant='flat'
                radius='lg'
                startContent={
                  <SearchIcon className='w-4 h-4' />
                }
              />
            </div>
          </div>
        </div>
        <div className='w-4/6 text-end'>
          <div className='flex gap-x-5 items-center justify-end'>
            <Badge content="5" color="danger" size='sm' >
              <Bell className='w-5 h-5 text-green-600' />
            </Badge>
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  name="English"
                  avatarProps={{
                    className: "w-6 h-4 rounded-none cusor-pointer",
                    src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg"
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="khmer">
                  <div className='flex items-center gap-2'>
                    <Avatar className='w-6 h-4 rounded-none' src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/1200px-Flag_of_Cambodia.svg.png' />
                    ភាសាខ្មែរ
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  name="Jane Doe"
                  description="Product Designer"
                  avatarProps={{
                    className: "w-8 h-8 cursor-pointer",
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Signed in as</p>
                  <p className="font-bold">@tonyreichert</p>
                </DropdownItem>
                <DropdownItem key="settings">
                  My Settings
                </DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">
                  Analytics
                </DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
