import { Button } from '@nextui-org/react'
import { MoveRight } from 'lucide-react'
import React from 'react'
import CountdownTimer from '../sd/CountdownTimer'

function DealsMonth() {
  return (
    <div className='w-full container my-5 lg:px-0 px-4'>
      <div className='lg:flex items-center justify-between'>
        <div className='lg:w-1/2'>
          <div>
            <h4>Deals of the Month</h4>
            <p className='text-xs my-1'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia nobis laborum ab cum ipsum magnam ratione, possimus omnis, deserunt ducimus vero nemo adipisci dolores fugit eos optio sint tempora eligendi.</p>

            <CountdownTimer targetDate="2024-12-31T00:00:00" />

            <Button size='sm' className='my-5 bg-primary text-white'>
              View All Products <MoveRight className='text-primay w-3 h-3' />
            </Button>
          </div>
        </div>

        {/* Image  */}
        <div className='lg:w-1/2 hidden lg:block'>
          <img 
            className='h-96 w-full rounded-lg'
            src="https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/457630460_1245623306885926_9020507602625721443_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFOVUUP2cGoY2hGbmvDwvkQpLjNnaGkVMykuM2doaRUzALLkHLyLAY3ybWEBJ_uBPfx16ke-BAKxuNPKDpKoRaW&_nc_ohc=gL5h---N8IMQ7kNvgFT76Oa&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=ApXCO97Wvh0NZxZSuCT5Ijd&oh=00_AYAnM3KlTKuIdGiaZOWiJkzyiqD508FGcfBjv1RMZqyTSQ&oe=670BEFF7" 
            alt="deal month image" />
        </div>
      </div>
    </div>
  )
}

export default DealsMonth
