import Image from "next/image";

export default function BookStaySection(){
    return (
      <section className="z-10 relative flex items-center justify-center py-[60px] lg:py-[100px] lg:px-[70px] 2xl:px-[140px] px-[20px] min-w-full  min-h-[412px]">
        <div className="relative rounded-[32px] 2xl:rounded-[60px] z-20">
          <Image
            src="/background-images/book-stay.jpg"
            width={1200}
            height={400}
            className=" min-w-full  object-cover rounded-[32px] 2xl:rounded-[60px] max-h-[512px]  min-h-[412px] "
            alt=""
          />
          <div className="absolute inset-0 py-[48px] px-[32px]  2xl:p-[72px]">
            <div className="flex flex-col items-center justify-center w-full h-full gap-[48px]">
              <div className="flex flex-col items-center justify-center text-center gap-[12px]">
                <h2 className="font-manrope font-extrabold text-[48px] lg:text-[72px] leading-[100%] tracking-[-0.03em] text-center text-white">
                  Ready to Book Your Stay?
                </h2>
                <p className="font-manrope font-normal text-[24px] lg:text-[28px] leading-[100%] text-white tracking-[-0.03em]">
                  Experience world-class luxury at Atlantis The Palm, Dubai
                </p>
              </div>
              <button className="py-[24px] px-[30px] bg-[#F8A900] text-black rounded-[800px] font-inter font-bold text-[20px] leading-[100%] tracking-0">
                Check Rates and Book Now
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-10 flex flex-row items-center justify-center ">
          <div className="flex flex-row items-center justify-center max-h-[250px]  ">
            <Image
              src="/clouds/cloud.svg"
              width={600}
              height={400}
              className="w-[600px] h-[400px] absolute top-[400px]"
              alt=""
            />
            <Image
              src="/clouds/cloud.svg"
              width={600}
              height={400}
              className="w-[600px] h-[400px] absolute top-[400px]"
              alt=""
            />
            <Image
              src="/clouds/cloud.svg"
              width={600}
              height={400}
              className="w-[600px] h-[400px] absolute top-[400px] left-[-110px]"
              alt=""
            />
            <Image
              src="/clouds/cloud.svg"
              width={600}
              height={400}
              className="w-[600px] h-[400px] absolute "
              alt=""
            />
          </div>
        </div>
      </section>
    );
}