import { Checkbox } from '@nextui-org/react'
import React from 'react'

const FilterBySizes = ({items}) => {
  return (
   <>
    {
      items.map(item => {
        return (
          <div key={item.value} className='flex justify-between items-center mb-2'>
            <div className="flex items-center w-1/2 space-x-2">
              <Checkbox size='sm' key={item.value}>
                {item.label}
              </Checkbox>              
            </div>
            <div className='w-1/2 flex justify-end'>
              <span className='text-sm'>({item.qty})</span>
            </div>
          </div>
        )
      })
    }
   </>
  )
}

export default FilterBySizes
