import { Slider } from '@nextui-org/react'
import React from 'react'

const FilterByPrice = () => {
  return (
    <Slider
      label="Price Range"
      step={50} 
      minValue={0} 
      maxValue={2000} 
      showSteps={false}
      defaultValue={[0, 2000]} 
      formatOptions={{style: "currency", currency: "USD"}}
      className="max-w-md"
      size='sm'
    />
  )
}

export default FilterByPrice
