import Image from "next/image";
export default function TopHotelsSection(){
    return (
        <div className="relative ">
      <div className=" relative z-10 flex flex-col items-center justify-center py-[60px] px-[20px] lg:py-[100px] lg:px-[140px] gap-[48px] lg:gap-[80px]">
        <div className="flex flex-col items-center justify-center gap-[12px] text-center">
          <h2 className="stylish-yellow-text">Top Picks</h2>
          <h3 className="heading-2">10 Best Hotels in Downtown Dubai</h3>
          <p className="font-inter font-normal text-[#475467] text-[20px] lg:text-[24px] leading-[28px] lg:leading-[36px] tracking-[-0.02em] text-center">
            Luxury accommodations with stunning views and premium amenities
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-[32px]">
          <div className="flex flex-row flex-wrap 2xl:flex-nowrap items-center justify-center gap-[32px]">
            <HotelRatingCard />
            <HotelRatingCard />
          </div>
          <div className="flex flex-row items-center flex-wrap 2xl:flex-nowrap justify-center gap-[32px]">
            <HotelRatingCard />
            <HotelRatingCard />
          </div>
          <div className="flex flex-row items-center flex-wrap 2xl:flex-nowrap justify-center gap-[32px]">
            <HotelRatingCard />
            <HotelRatingCard />
          </div>
        </div>
        
      </div>
      <div className="z-0 md:flex flex-col items-center justify-center absolute inset-0 hidden overflow-hidden  z-0">
                <Image
                  src="/background-images/explore-dubai-background-effect.png"
                  className="w-full h-full absolute z-0"
                  width={1200}
                  height={400}
                  alt=""
                />
                <div
                  className="
                    absolute inset-0 z-0 
              bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,1)_100%)]
                  "
                ></div>
              </div>
      </div>
    );
}


function HotelRatingCard(){
    return (
      <section className="bg-white flex flex-col lg:flex-row items-center justify-center p-[24px] lg:p-[32px] gap-[32px] border-1 border-[#D0D5DD] rounded-[20px] lg:rounded-[30px] ">
        <div className="rounded-[24px] gap-[10px]">
          <Image
            src="/images/trending-restaurant.png"
            width={350}
            height={200}
            alt=""
            className="min-w-[185px] lg:w-[185px] lg:h-[185px] h-[200px] rounded-[24px]"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-[24px]">
          <div className="flex flex-col items-start justify-center gap-[32px]">
            <h2 className="font-inter font-medium text-[32px] leading-[100%] tracking-[0.02em]">
              Burj Khalifa
            </h2>
            <p className="font-inter font-normal text-[20px] leading-[28px] text-[#475467] tracking-[0.02em]">
              The world&apos;s tallest choreographed fountain system set on Burj
              Khalifa Lake.
            </p>
          </div>
          <div className="gap-[20px] flex flex-row items-start justify-center *:py-[24px] *:px-[30px] *:gap-[10px] *:rounded-[800px] *:font-inter *:font-semibold *:text-[20px] *:leading-[100%] *:tracking-[-0.0em]">
            <button className="bg-[#F8A900]">Compare</button>
            <button className="border-1 border-[#D0D5DD]">View Details</button>
          </div>
        </div>
        <span className="font-inter font-italic font-semibold text-[40px] leading-[32px] tracking-[-0.02em] text-[#0D7FF2]">
          01
        </span>
      </section>
    );
}