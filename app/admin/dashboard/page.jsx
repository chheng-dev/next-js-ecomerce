import React from 'react'
import CartTotal from '../components/dashboard/CartTotal'
import { BoxesIcon, ChartNoAxesCombinedIcon, ClockArrowDownIcon, User2 } from 'lucide-react'

function DashboardPage() {
  const totalSaleItems = [
    {
      title: 'Total Users',
      icon: User2,
      qty: '40,289',
      date: 'Up from yesterday',
      percentage: 8.5,
      status: 'height',
      bgColor: '#E5E4FF',
      color: '#8281FE'
    },
    {
      title: 'Total Orders',
      icon: BoxesIcon, 
      qty: '15,432',
      date: 'Up from past week',
      percentage: 5.2,
      status: 'height',
      bgColor: "#FFF2D7",
      color: '#FEC43C'
    },
    {
      title: 'Total Sales',
      icon: ChartNoAxesCombinedIcon, 
      qty: '$250,000',
      date: 'Down from yesterday',
      percentage: 12.3,
      status: 'low',
      bgColor: "#D9F7E8",
      color: '#4BD991'
    },
    {
      title: 'Total Pending',
      icon: ClockArrowDownIcon, 
      qty: '1,245',
      date: 'Up from yesterday',
      percentage: 3.8,
      status: 'low',
      bgColor: "#FFDED1",
      color: '#FF9873'
    }
  ]

  return (
    <div>
      <h4>Dashboard</h4>
      <div className='grid grid-cols-4 gap-4 my-3'>
        <CartTotal items = {totalSaleItems} />
      </div>
    </div>
  )
}

export default DashboardPage
