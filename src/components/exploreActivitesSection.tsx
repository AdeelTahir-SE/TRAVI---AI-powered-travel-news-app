import ActivitiesCarousel from "./activitiesCarousel";
import Image from "next/image";
import TransparentCloudsSection from "./transparentCloudSection";
export default function ExploreActivitiesSection() {
  return (
    <section className="flex flex-col items-center justify-center ">
      <section className="relative flex flex-col items-center justify-center gap-[10px]">
        <Image src={"/images/aeroplane.png"} width={400} height={100} className="absolute left-[20px] lg:block hidden top-[-200px] rotate-y-[180deg]" alt="" />
        <h2 className="heading-2 text-center">Explore From Wide Range</h2>
        <h2 className="stylish-yellow-text">of activites</h2>
        <p className="sub-heading color-[#1B1B1B] px-[30px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae erat
          et odio fermentum rutrum. Nulla in dolor rutrum, consequat augue id,
          tristique leo. Etiam sollicitudin facilisis malesuada.{" "}
        </p>
      </section>
      <ActivitiesCarousel />
      <section className="relative w-full flex flex-col items-center justify-center  ">
        <Image
          src="/background-images/explore-activities.jpg"
          width={1200}
          height={433}
          className="w-full h-auto min-h-[433px]  object-cover md:object-contain rotate-y-180"
          alt=""
        />

        {/* OVERLAY */}
        <div className="absolute  inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgb(255,255,255,1)_0%,rgba(255,255,255,0)_50%,rgb(255,255,255,1)_100%)]"></div>

        {/* <div className="w-full h-[200px]"></div> */}
        <TransparentCloudsSection className="absolute overflow-x-hidden w-full top-[230px] md:top-[230px] z-50 " />
      </section>
    </section>
  );
}
