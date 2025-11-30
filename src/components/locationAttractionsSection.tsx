import HotelCard from "./hotelCard";
import Image from "next/image";
export default function LocationAttractionsSection(){
    return (
      <section className="relative flex flex-col items-center justify-center gap-[60px] lg:gap-[80px] py-[60px] px-[20px] lg:py-[100px] lg:px-[140px]">
        <div className="z-10 flex flex-col items-center justify-center gap-[12px] text-center">
          <h2 className="stylish-yellow-text">Attractions</h2>
          <h3 className="heading-2">Things to Do Nearby</h3>
          <p className="flex flex-col items-start justify-center gap-[12px] font-inter text-normal text-[20px] lg:text-[24px] leading-[20px] lg:leading-[36px] tracking-[-0.02em] text-[#475467]">
            Top attractions around Downtown Dubai
          </p>
        </div>

        <div className="flex flex-row items-center lg:justify-between justify-center gap-[32px] min-w-full flex-wrap z-10">
          <HotelCard />
          <div className="lg:mt-[54px]">
            <HotelCard />
          </div>
          <HotelCard />
        </div>

        <div className="z-0 md:flex flex-col items-center justify-center absolute inset-0 hidden overflow-hidden  z-0">
          <Image
            src="/background-images/explore-dubai-background-effect.png"
            className="w-full absolute z-0"
            width={1200}
            height={400}
            alt=""
          />
          <div
            className="
              absolute inset-0 z-0 
        bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,1)_100%)]
            "
          ></div>
        </div>
      </section>
    );
}