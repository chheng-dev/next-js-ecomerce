import { Button } from '@nextui-org/react'
import { MoveRight } from 'lucide-react'
import React from 'react'

function BannerComp() {
  return (
    <div className='relative'>
      <div className='relative'>
        <img
          className='w-full lg:h-auto object-cover h-96'
          src='https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/350937107_802074954520427_3916137285799211522_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeENo03HNiSTBquMuHLXtEa8FsuWo4BZjUMWy5ajgFmNQx1XHXZDv2Xd5HMJYhC1cjD2PVXt3UHpJA5Ina1v4Ztw&_nc_ohc=nFZvSXPbvDkQ7kNvgGGZ_BV&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=AInJsMl-66PNzE_ZjjpKYo3&oh=00_AYDuc_N_cPwhSljirab3bg-IVWTaeiLh3aOzymwSNw2zfg&oe=670AE739'
          alt='background'
        />
      </div>
      <div className='absolute inset-0 flex items-center bg-white bg-opacity-30 px-4 lg:px-0'>
        <div className='container mx-auto'>
          <h4 className='lg:text-2xl text-primary sm:text-sm'>Classic Exclusive</h4>
          <h2 className='category'>Women's Collection</h2>
          <p className='uppercase my-2'>Up to 40% off</p>
          <Button color="primary" href="#" variant="flat" className='bg-primary text-white mt-4'>
            Shop Now <MoveRight className='w-3 h-3' />
          </Button>
        </div>
      </div>
    </div>

  )
}

export default BannerComp
