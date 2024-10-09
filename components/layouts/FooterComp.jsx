import { Input } from '@nextui-org/react'
import { FacebookIcon, InstagramIcon, Mail, MailIcon, MapPin, MoveRight, PhoneCall, TwitterIcon } from 'lucide-react'
import React from 'react'

function FooterComp() {
  return (
    <footer className="w-full bg-primary text-white mt-8">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
                <div className="col-span-1 mb-10 lg:col-span-2 lg:mb-0">
                  <a href="https://pagedone.io/"  className="flex justify-center lg:justify-start text-2xl font-black">
                    BRAVA MAMA
                  </a>

                  <div>
                    <div className='flex items-center justify-start mt-4 gap-4 text-sm'>
                      <div>
                        <PhoneCall className='w-4 h-4' />
                      </div>
                      <div>(+855) 122-9291</div>
                    </div>

                    <div className='flex items-center justify-start mt-4 gap-4 text-sm'>
                      <Mail className='w-4 h-4' />
                      bravama@gmail.com
                    </div>

                    <div className='flex items-center justify-start mt-4 gap-4 text-sm'>
                      <MapPin className='w-4 h-4' />
                      Oknha try Heng St. 2011, Phnom Penh, Cambodia
                    </div>
                  </div>
                </div>
                <div className="lg:mx-auto text-left">
                    <h4 className="text-white font-medium mb-7">Infomation</h4>
                    <ul className="text-sm  transition-all duration-500">
                        <li className="mb-6"><a href="javascript:;"  className="text-white hover:text-white">My Account</a></li>
                        <li className="mb-6"><a href="javascript:;"  className="text-white hover:text-white">Login</a></li>
                        <li className="mb-6"><a href="javascript:;"  className="text-white hover:text-white">My Cart</a></li>
                        <li className="mb-6"><a href="javascript:;"  className="text-white hover:text-white">My Wishlist</a></li>
                        <li className="mb-6"><a href="javascript:;"  className="text-white hover:text-white">Checkout</a></li>
                    </ul>
                </div>
                <div className="lg:mx-auto text-left ">
                    <h4 className="text-lg text-white font-medium mb-7">Service</h4>
                    <ul className="text-sm  transition-all duration-500">
                        <li className="mb-6"><a href="javascript:;"  className="text-white hover:text-white">About Us</a></li>
                        <li className="mb-6"><a href="javascript:;"  className=" text-white hover:text-white">Careers</a></li>
                        <li className="mb-6"><a href="javascript:;"  className=" text-white hover:text-white">Delivery Infomation</a></li>
                        <li className="mb-6"><a href="javascript:;"  className=" text-white hover:text-white">Privacy Policy</a></li>
                        <li className="mb-6"><a href="javascript:;"  className=" text-white hover:text-white">Terms & Conditions</a></li>
                    </ul>
                </div>
                <div className="lg:mx-auto text-left lg:col-span-2">
                  <h4 className="text-lg text-white font-medium mb-7">Subscribe</h4>
                  <p className='text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae veniam soluta, ad molestias architecto est aperiam sequi ea minus dignissimos quibusdam quisquam ipsum a nostrum accusamus deleniti ipsa ratione provident.</p>
                  
                  <Input
                    type="email"
                    label="Email"
                    placeholder="Your Email"
                    variant="bordered"
                    labelPlacement="outside"
                    startContent={
                      <MailIcon className="w-4 h-4 text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    endContent={
                      <MoveRight className="w-4 h-4 text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                </div>
            </div>
            <div class="py-7 border-t border-[#29282D]">
              <div class="grid grid-cols-3 gap-2">
                <div>
                  <img 
                    className='w-32'
                    src="https://vetairbus.com/packs/_/assets/images/virak_buntham/visa-logo-cd1630ac887bbd4b4fcc6b81d114445d.svg"
                    alt="visa" />
                </div>
                <div>
                  <p className='text-sm'>© 2023 Bravamama. All rights reserved.</p>
                </div>

                <div className='flex items-center justify-end gap-3'>
                  <FacebookIcon />
                  <InstagramIcon />
                  <TwitterIcon />
                </div>
              </div>
            </div>
        </div>
    </footer>
  )
}

export default FooterComp
