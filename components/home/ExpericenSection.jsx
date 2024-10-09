import React from 'react'
import ExperienceCard from './ExperienceCard'
import { BoxIcon, CircleDollarSignIcon, HeadphonesIcon, WalletCardsIcon } from 'lucide-react'


const ExpericenSection = () => {
  const experienceItems = [
    {
      icon: BoxIcon,
      title: 'Free Shipping',
      description: 'Free shipping for order above $150'
    },
    {
      icon: CircleDollarSignIcon,
      title: 'Money Guarantee',
      description: 'Within 3- days for an exchange'
    },
    {
      icon: HeadphonesIcon,
      title: 'Online Support',
      description: '8AM - 6PM a day, 7 days a week'
    },
    {
      icon: WalletCardsIcon,
      title: 'Flexitble Payment',
      description: 'Pay with multiple credit cards'
    },
    
  ]

  return (
    <div className='container mx-auto bg-white lg:mt-16 my-8'>
      <div className='text-center'>
        <h4>Shopping Experience</h4>
      </div>

      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 mt-8 lg:px-0 px-4'>
        {
          experienceItems.map((item, idx) => {
            return(
              <ExperienceCard 
                key={idx}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            )
          })
        }
      </div>

    </div>
  )
}

export default ExpericenSection
