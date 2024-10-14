import { Star } from 'lucide-react'
import React from 'react'

const CustomerReview = ({items}) => {
  return (
   <>
    {
      items.map((item, idx) => {
        return(
          <section className="py-4 relative border-b border-slate-200" key={idx}>
            <div className="container mx-auto">
              <div className="grid grid-cols-1 gap-8">
                <div className="col-span-12 lg:col-span-10">
                    <div className="flex items-start gap-4">
                      <img
                        src={item.userImage}
                        alt={item.title}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <p className="font-medium text-sm leading-8 text-gray-900">
                          {item.username}
                        </p>
                        <div className="flex gap-x-1">
                          {
                            Array.from({ length: 5 }, (_, index) => (
                              <Star 
                                key={index}
                                className={
                                  `w-4 h-4 ${index < item.star ? 'text-warning-500' : 'text-gray-300'}`
                                }
                              />
                            ))
                          }
                        </div>
                        <p className="text-gray-600 text-sm font-semibold mt-4">
                          {item.title}
                        </p>
                        <span className='text-gray-500 text-xs'>
                          {item.description}
                        </span>
                        <p className='text-xs mt-4'>
                          <span className='text-gray-500'>
                            Review by  
                          </span>     
                          <span className='text-xs pl-1'>{item.reviewer}</span>             
                          <span className='text-xs text-gray-500 pl-1'>Posted on</span> 
                          <span className='text-xs pl-1'>{item.date}</span>
                        </p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </section>    
        )
      })
    }
   </>                                
  )
}

export default CustomerReview
