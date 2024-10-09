import React from 'react'

const ExperienceCard = ({icon, title, description}) => {
  const Icon = icon;
  return (
    <div className='lg:mb-0 mb-4'>
      <Icon />
      <h5 className='mt-3 font-black'>{title}</h5>
      <p className='text-xs text-gray-400 my-1'>{description}</p>
    </div>
  )
} 

export default ExperienceCard
