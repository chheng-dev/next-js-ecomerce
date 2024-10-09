import FooterComp from "@/components/layouts/FooterComp";
import HeaderComp from "@/components/layouts/HeaderComp";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Layout({ children }) {
  return (
    <>
      <div className="w-full">
        <div className="flex gap-4 body-content">
          <div className="w-full flex flex-col">
            <HeaderComp />
            <div className="">
              {children}
            </div>
            <FooterComp />
          </div>
        </div>
      </div>
    </>
  );
}