import Image from "next/image";
import CategoryHeroCloudSection from "./categoryHeroCloudSection";
import SearchInput from "./seachInput";
export default function SearchHeroSectoion() {
  return (
    <div className="flex flex-col items-center justify-center relative w-full h-[574px]  ">
      <section className="flex flex-col items-center justify-center w-full">
        <Image
          src={"/background-images/category-hero-section.jpg"}
          width={700}
          height={835}
          className="w-auto object-cover h-[574px] min-w-full"
          alt=""
        />
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center ">
          <div className="flex flex-col items-center justify-center  z-10 text-center gap-[32px]">
            <SearchInput action="" />
            <p className="text-white font-manrope text-[24px] lg:text-[32px] leading-[100%] tracking-[-0.03em]">
              0 results found for &quot;Luxury hotels in Dubai &quot;
            </p>
          </div>
          <div className="absolute inset-0 pointer-events-none z-0 max-h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(35,132,200,0.3)_0%,rgba(35,132,200,0.3)_40%,rgba(35,132,200,0.1)_65%,rgba(35,132,200,0)_100%)]"></div>
        </div>
        <div
          className="
      absolute inset-0 z-0
      bg-[linear-gradient(to_bottom,rgba(35,132,200,1)_0%,rgba(35,132,200,0.85)_13.27%,rgba(35,132,200,0)_50%)]
    "
        ></div>
      </section>
      <CategoryHeroCloudSection />
    </div>
  );
}
