import Image from "next/image";
import TransparentCloudsSection from "./transparentCloudSection";
import ShalimarCloudSection from "./shalimarCloudSection";
export default function ShalimarWithAboveSection() {
  return (
    <section className="relative flex flex-col items-center justify-center  z-0 ">
      {/* above cloud section */}
      <div className="absolute inset-0 z-10 lg:flex flex-row hidden items-center justify-center min-h-[600px] ">
        <div className="flex flex-row items-center justify-center max-h-[250px] *:top-[-70px] *:2xl:top-[-20px] ">
          <Image
            src="/clouds/cloud.svg"
            width={600}
            height={400}
            className="w-[600px] h-[400px] absolute "
            alt=""
          />
          <Image
            src="/clouds/cloud.svg"
            width={600}
            height={400}
            className="w-[600px] h-[400px] absolute "
            alt=""
          />
          <Image
            src="/clouds/cloud.svg"
            width={600}
            height={400}
            className="w-[600px] h-[400px] absolute  left-[-110px]"
            alt=""
          />
          <Image
            src="/clouds/cloud.svg"
            width={600}
            height={400}
            className="w-[600px] absolute left-[100px]"
            alt=""
          />
        </div>
      </div>
      <section className="relative w-full flex flex-col items-center justify-center">
        <Image
          src="/background-images/shalimar.svg"
          width={800}
          height={360}
          className="w-full h-auto min-h-[360px] object-cover md:object-contain rotate-y-180 "
          alt=""
        />

        {/* Transparent → visible → transparent */}
        <div
          className="absolute inset-0 pointer-events-none    bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.7)_100%)]
"
        ></div>
      </section>

      <ShalimarCloudSection className="absolute overflow-hidden w-full bottom-[-40px] " />
    </section>
  );
}
