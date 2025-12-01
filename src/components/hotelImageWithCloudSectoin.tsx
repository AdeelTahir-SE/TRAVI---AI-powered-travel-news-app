import Image from "next/image";
import CategoryHeroCloudSection from "./categoryHeroCloudSection";
export default function HotelImageWithCloudSection() {
  return (
    <div className="flex flex-col items-center justify-center relative w-full  ">
      <section className="relative flex flex-col items-center justify-center w-full">
        <Image
          src={"/images/atlantis-with-clouds.jpg"}
          width={700}
          height={835}
          className="z-0 w-auto object-cover h-[835px] min-w-full relative rotate-[-180]"
          alt=""
        />
        <div
          className="
      absolute inset-0 z-0
bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(255,255,255,0.81)_23.86%,rgba(255,255,255,0)_50%,rgba(255,255,255,0)_69.94%,rgba(255,255,255,0.3)_84.55%,#FFFFFF_100%)]
      "
        ></div>
      </section>
      <CategoryHeroCloudSection />
    </div>
  );
}
