import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="background-blue-gradient h-fit  ">
      <Image
        src="/background-images/hero-section.svg"
        width={1280}
        height={595}
        className="w-full h-full md:h-fit object-cover md:object-contain relative top-[69px] sm:top-[53px] z-10"
        alt=""
      />
      <section className="flex flex-col items-center justify-center relative z-20 bottom-14 ">
        <div className="background-blue-gradient blur-[64px] min-h-full"></div>

        <h1 className="heading-2 text-white">Discover Dubai</h1>
        <h2 className="stylish-yellow-text ">by experience</h2>
        <p className="text-white px-[38px]  sm:px-[60px] md:px-[160px] lg:px-[240px] 2xl:px-[480px] font-inter font-normal text-[20px] leading-[30px] tracking-[-0.02em] text-center">
          Cras tempus orci sed risus tempor, quis accumsan magna ultricies.
          Nullam pulvinar semper mi, eget vehicula lorem. Lorem ipsum dolor.
        </p>

        <div></div>
      </section>
      <h1></h1>
    </section>
  );
}
