"use client"

import React, { useEffect } from 'react'
import FooterComp from "@/components/layouts/FooterComp";
import HeaderComp from "@/components/layouts/HeaderComp";
import ExpericenSection from "@/components/home/ExpericenSection";


export function ClientLayout({children}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])
  
  return (
    <div className="w-full">
      <div className="flex gap-4 body-content">
        <div className="w-full flex flex-col">
          <HeaderComp />
          <div className="">
            {children}
          </div>
          <ExpericenSection />
          <FooterComp />
        </div>
      </div>
    </div>
  )
}

export default ClientLayout
