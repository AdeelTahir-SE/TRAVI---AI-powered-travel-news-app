import Image from "next/image";
export default function HotelHighLightsSection(){
    return (
      <div className="flex relative flex-col">
        <section className="flex flex-col items-center justify-center py-[60px] px-[20px] lg:py-[100px] lg:px-[140px] gap-[48px] lg:gap-[80px] relative z-10">
          <div className="flex flex-col items-center justify-center gap-[12px]">
            <h2 className="stylish-yellow-text">Highlights</h2>
            <h3 className="heading-2">Why Guests Love This Hotel</h3>
            <p className="flex flex-col items-start justify-center gap-[12px] font-inter text-normal text-[20px] lg:text-[24px] leading-[20px] lg:leading-[36px] tracking-[-0.02em] text-[#475467]">
              Top features and experiences that make it stand out.
            </p>
          </div>

          <div className="flex flex-row flex-wrap items-center justify-center gap-[24px] lg:gap-[40px] ">
            <HighLightCard />
            <HighLightCard />
            <HighLightCard />
            <HighLightCard />
            <HighLightCard />
            <HighLightCard />
          </div>
        </section>
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
                bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,1)_100%)]
                    "
                  ></div>
                </div>
      </div>
    );
}

function HighLightCard(){
    return (
      <section className="lg:max-w-[523px] max-w-[400px] flex flex-col items-center justify-center bg-[#FFFFFF66] border-1 border-[#D0D5DD] p-[48px] gap-[32px] rounded-[30px]">
        <div className="flex items-center justify-center rounded-[24px] gap-[10px] bg-white shadow-[0px_4px_40px_0px_rgba(127,127,127,0.25)] w-[100px] h-[100px]">
            <Image src="/icons/water-polo.svg" width={56} height={56} alt="" className="w-[56px] h-[56px]"/>
        </div>
        <div className="flex flex-col items-center justify-center gap-[12px]  text-center">
          <h3 className="font-inter font-medium text-[32px] leading-[100%] tracking-[0.02em] text-[#000000]">
            Waterpark Access
          </h3>
          <p className="font-inter font-normal text-[24px] leading-[36px] tracking-[0.02em] text-[#475467]">
            Unlimited access to the Middle East&apos;s largest waterpark with
            thrilling slides and attractions.
          </p>
        </div>
      </section>
    );
}