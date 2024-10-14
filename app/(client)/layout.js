"use client"

import FooterComp from "@/components/layouts/FooterComp";
import HeaderComp from "@/components/layouts/HeaderComp";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ExpericenSection from "@/components/home/ExpericenSection";
import { useEffect } from "react";

export default function Layout({ children }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])
  return (
    <>
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
    </>
  );
}