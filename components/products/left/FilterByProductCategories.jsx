import React from 'react'
import { Checkbox } from "@nextui-org/react";

const FilterByProductCategories = ({ items }) => {
  return (
    <div className='flex flex-col gap-y-2 items-start'>
    {
      items.map(item => {
        return (
          <Checkbox size='sm' key={item.value}>
            {item.label}
          </Checkbox>
        )
      })
    }
  </div>
  )
}

export default FilterByProductCategories
