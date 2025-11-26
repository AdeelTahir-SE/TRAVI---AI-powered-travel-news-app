import Image from "next/image";
import TransparentCloudsSection from "./transparentCloudSection";
import ShalimarCloudSection from "./shalimarCloudSection";
export default function ShalimarSection() {
  return (
    <section className="relative flex flex-col items-center justify-center ">
      <section className="relative w-full flex flex-col items-center justify-center  ">
        <Image
          src="/background-images/shalimar.svg"
          width={800}
          height={360}
          className="w-full h-auto min-h-[360px]  object-cover md:object-contain rotate-y-180"
          alt=""
        />
        <div className="absolute  inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(73,153,210,0)_89.93%,#4999D2_100%]"></div>
      </section>
      <ShalimarCloudSection className="absolute overflow-hidden w-full bottom-[-40px]   " />
    </section>
  );
}
