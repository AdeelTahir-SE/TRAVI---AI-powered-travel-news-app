import Image from "next/image";
import SearchInput from "./seachInput";
import CloudSection from "./cloudSection";
export default function HeroSection() {
  return (
    <section className="background-blue-gradient h-full  ">
      <div className="relative w-full">
        <Image
          src="/background-images/hero-section.svg"
          width={1280}
          height={595}
          className="w-full h-auto min-h-[595px] object-cover md:object-contain"
          alt="Hero"
        />
        <Image
          src="/logos/hero-section.svg"
          width={1200}
          height={400}
          alt=""
          className="absolute w-full h-auto z-10
             top-[140px]  md:top-[80px] 
             px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48"
        />

        {/* Subtle bluish overlay */}
        <div
          className="absolute inset-0 z-10 
      bg-[linear-gradient(180deg,rgba(35,132,200,0.1)_0%,rgba(35,132,200,0)_20%,rgba(35,132,200,0)_80%,rgba(35,132,200,1)_100%)]"
        ></div>
      </div>

      <div className="bg-[linear-gradient(to_bottom,rgba(35,132,200,0)_0%,rgba(35,132,200,0)_0%,#2384C8_100%)]  w-full relative bottom-[109px] z-20">
        <section className="flex flex-col items-center justify-center relative z-20  ">
          <div className="relative flex flex-col items-center justify-center z-10">
            <h1 className="heading-2 text-white">Discover Dubai</h1>
            <h2 className="stylish-yellow-text ">by experience</h2>
            <p className="text-white px-[38px]  sm:px-[60px] md:px-[160px] lg:px-[240px] 2xl:px-[480px] font-inter font-normal text-[20px] leading-[30px] tracking-[-0.02em] text-center">
              Cras tempus orci sed risus tempor, quis accumsan magna ultricies.
              Nullam pulvinar semper mi, eget vehicula lorem. Lorem ipsum dolor.
            </p>
          </div>
        </section>
        <div className="flex flex-col items-center justify-center mt-[20px]">
          <SearchInput action="/" />
        </div>
      </div>
      <CloudSection />

      <h1></h1>
    </section>
  );
}
