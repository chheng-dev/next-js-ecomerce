import React from 'react'
import CartItem from '../CartItem'

const OurBestSeller = () => {
  return (
    <div className='my-16 lg:px-0 px-4'>
      <div className='w-full text-center my-5'>
        <h4>Our Bestseller</h4>
      </div>

      <div className='grid lg:grid-cols-5 gap-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1'>
        <CartItem 
          image="https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/462421959_1274883460626577_8769107904760115115_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFBe2e0yePrmoYdWEuynucZNMa3Rafysn40xrdFp_KyfhuMwVzhHEfJwWpdGbGiCvFHW3wqOjtgZAJCAbH_d3QS&_nc_ohc=XYOZVuLY7WUQ7kNvgGSCHQT&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=AVvfW2Y8BkpPPku2tbCHVnV&oh=00_AYCsOYRcBjKSFn6ZPsY9ZuFblHzG-ZaUrgA6-mfcZ9hJSA&oe=670BEBA1"
          title="White Line Baby"
          price={10}
          brand='Chang'
          originalPrice={20.00}
        />

         <CartItem 
          image="https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/462205371_1274187497362840_6895783581697655483_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHgt834CFpw90USNwydcunJa6Z0LqpV67VrpnQuqlXrtSqcXP07hvpp4_AYftri7beeCNVBb_J0ohggXjHsI6lO&_nc_ohc=FGq-EcssyvsQ7kNvgFDE1r4&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=AgdRrj29MseNN-BG6JT0kCc&oh=00_AYB8-fidu9lfSFepzzymwVJ2R1KJ4YFjO0yFRavi-JAuaA&oe=670BED1C"
          title="Glee Supima Set"
          price={10}
          brand='Phunchun'
          originalPrice={23.00}
        />

        <CartItem 
          image="https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/461772669_1268796851235238_4202494309067829830_n.jpg?stp=cp6_dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHVDJHHkqhChY4WtATTtgZ1DuAQPu53fjUO4BA-7nd-NQ75D7xuImBf9ATZZb8QAGOX5zJcxDxR3uzSN0I79Oqz&_nc_ohc=KDJYwgwXtLgQ7kNvgHL3PhM&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=A3foTtsynJ9QFaAIvZ_AsiQ&oh=00_AYBrIJ8NT3btEj15-zoHIxLZ3wC1xsEFFWmX3LIebgqB3w&oe=670BF06A"
          title="Chang Bamboo"
          price={5}
          brand='Chang'
          originalPrice={11.00}
        />

        <CartItem 
          image="https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/461759510_1268645887917001_964466108288428658_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEuJK4-1pnaTTFaQyRbRGry3jZ9kHghcu3eNn2QeCFy7XQxuOzKBAWQBRh4Qw2zllq2En1-hUtx5lxe5dWxG10f&_nc_ohc=SI3MCO6Wh3EQ7kNvgEK9vhN&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=A_GF3EFp_onO-eAKmCZihmZ&oh=00_AYDikkeK65minDrKZoiGtToR1FD5OP5S4EtjkTJ8zKIfPw&oe=670BFD7F"
          title="Chang Bamboo Set"
          price={6}
          brand="Bamboo"
          originalPrice={12.00}
        />

        <CartItem 
          image="https://scontent.fpnh19-1.fna.fbcdn.net/v/t39.30808-6/461419848_1266276664820590_3496728419058471081_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHG806_hZPqO916IV76om9tv66WmjDvqnS_rpaaMO-qdCAPwuHNkboXY8HHuO4aQz8J4v--fyCXXaJJ_DXKHzXa&_nc_ohc=eRPvK44i5AAQ7kNvgGUeCbx&_nc_ht=scontent.fpnh19-1.fna&_nc_gid=AdraYLRSOutSFjMOmQIKken&oh=00_AYCrV-ODUqmKyPYXZog5RPMqBbTaQnkL3dRJRKsRisNbVA&oe=670C068E"
          title="White Line Baby"
          price={5}
          brand='Chang'
          originalPrice={9.00}
        />
      </div>
    </div>
  )
}

export default OurBestSeller
