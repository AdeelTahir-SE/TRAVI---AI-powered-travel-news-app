import HotelCard from "./hotelCard";

export default function LocationHotelsSection(){
    return (
      <section className="flex flex-col items-center justify-center gap-[60px] lg:gap-[80px] py-[60px] px-[20px] lg:py-[100px] lg:px-[140px]">
        <div className="flex flex-col items-center justify-center gap-[12px] text-center">
          <h2 className="stylish-yellow-text">Hotels</h2>
          <h3 className="heading-2">Hotels in Downtown Dubai</h3>
          <p className="flex flex-col items-start justify-center gap-[12px] font-inter text-normal text-[20px] lg:text-[24px] leading-[20px] lg:leading-[36px] tracking-[-0.02em] text-[#475467]">
            Discover the finest accommodations for your stay.
          </p>
        </div>



{/* cards section */}
        <div className="flex flex-row flex-wrap items-center justify-start gap-[32px] w-full">
                <HotelCard/>
                <HotelCard/>
                <HotelCard/>
                <HotelCard/>
                <HotelCard/>
              </div>
      </section>
    );
}