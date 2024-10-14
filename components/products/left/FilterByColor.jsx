import React from 'react'

function FilterByColor({items}) {
  return (
    <div>
      {
        items.sort((a, b) => b.qty - a.qty)
        .map(item => {
          return(
            <div key={item.value} className='flex justify-between items-center mb-2'>
              <div className="flex items-center w-1/2 space-x-2">
                <div 
                  className="w-4 h-4 rounded-md" 
                  style={{ backgroundColor: item.code }} 
                  title={item.label} 
                />
                <span className='text-sm truncate'>{item.label}</span>
              </div>
              <div className='w-1/2 flex justify-end'>
                <span className='text-sm'>({item.qty})</span>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default FilterByColor
