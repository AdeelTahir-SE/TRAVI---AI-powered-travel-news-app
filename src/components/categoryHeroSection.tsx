import Image from "next/image";
export default function CategoryHeroSection() {
  return (
    <div className="flex flex-col items-center justify-center relative w-full ">
      <section className="flex flex-col items-center justify-center w-full">
        <Image
          src={"/background-images/category-hero-section.jpg"}
          width={700}
          height={835}
          className="w-auto object-cover h-[835px] min-w-full"
          alt=""
        />
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-white z-10 text-center px-[20px] md:px-[40px] lg:px-[100px] ">
          <div className="py-[12px] px-[24px] rounded-[600px] bg-[rgba(132,140,151,0.55)] z-10">
            <h2 className="font-inter font-[600px] text-[20px] leading-[30px] tracking-[-0.02em] opacity-100 ">
              Home &gt; Categories &gt; 5-Star Hotels
            </h2>
          </div>
          <div className="relative flex flex-col items-center justify-center">
            <div
              className="absolute inset-0 pointer-events-none z-0 max-h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(35,132,200,0.3)_0%,rgba(35,132,200,0.3)_40%,rgba(35,132,200,0.1)_65%,rgba(35,132,200,0)_100%)]"
            ></div>
            <h1 className="font-manrope font-extrabold text-[56px] lg:text-[100px] leding-[100%] tracking-[-0.03em] z-10">
              Dubai 5-Star Hotels
            </h1>
            <p className="font-inter font-normal text-[20px] lg:text-[24px] leading-[32px] tracking-[-0.02em] text-center z-10">
              Explore top-rated luxury hotels in Dubai offering premium
              amenities, exceptional service, and unforgettable experiences in
              the heart of the UAE.
            </p>
          </div>
        </div>
      </section>
      <div
        className="
      absolute inset-0 z-0
      bg-[linear-gradient(to_bottom,rgba(35,132,200,1)_0%,rgba(35,132,200,0.85)_13.27%,rgba(35,132,200,0)_50%)]
    "
      ></div>
    </div>
  );
}
