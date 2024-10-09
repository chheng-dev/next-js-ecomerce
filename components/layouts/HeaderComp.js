import React from 'react'
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { Heart, SearchIcon, ShoppingBag } from 'lucide-react';

function HeaderComp() {
  const menuItems = [
    "Home",
    "Shop",
    "Our Story",
    "Blog",
    "Contact Us"
  ];

  return (
    <Navbar className='container-fluid' isBordered maxWidth="xl">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">BRAVA MAMA</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 w-3/5" justify="center">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          <p className="font-bold text-inherit">BRAVA MAMA</p>
        </NavbarBrand>

        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Shop
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Our Story
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="/blog">
            Blog
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="#">
            Contact Us
          </Link>
        </NavbarItem>

      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <SearchIcon className='w-5 h-5' />
        </NavbarItem>
        <NavbarItem>
          <Heart className='w-5 h-5' />
        </NavbarItem>
        <NavbarItem>
          <ShoppingBag className='w-5 h-5' />
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat" className='bg-primary text-white'>
            Login
          </Button>
        </NavbarItem>

      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default HeaderComp
