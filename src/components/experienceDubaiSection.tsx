import Image from "next/image"
import { JSX } from "react"
import CategoryHeroCloudSection from "./categoryHeroCloudSection"
import ShalimarCloudSection from "./shalimarCloudSection"
export default function ExperienceDubaiSection(): JSX.Element {
    return (
        <div className="relative flex flex-col items-center justify-center relative w-full  ">
            <section className="relative flex flex-col items-center justify-center w-full">
                <Image
                    src={"/images/experience-dubai.jpg"}
                    width={700}
                    height={835}
                    className="z-0 w-auto object-cover h-[337px] md:h-[842px] lg:h-[1182px] min-w-full relative rotate-[-180]"
                    alt=""
                />

                <div className="*:relative absolute z-10 inset-0  uppercase gap-[230px] w-full h-full flex flex-col items-center justify-center">
                    <h2 className="text-[#F8A900] font-oswald text-[250px] leading-[28.25px] text-center  tracking-[-0.03em] font-bold">Experience</h2>
                    <h2 className="text-[#FFFFFF] font-oswald text-[290px] leading-[28.25px] text-center  tracking-[-0.03em] font-bold">Dubai</h2>

                </div>
                <div
                    className="
              absolute inset-0 z-0
bg-[linear-gradient(180deg,#FFFFFF_0%,rgba(255,255,255,0.3)_11.05%,rgba(255,255,255,0.1)_18.2%,rgba(255,255,255,0)_31.72%,rgba(255,255,255,0)_50%,rgba(255,255,255,0)_68.41%,rgba(255,255,255,0)_90.54%,#FFFFFF_100%)]"                ></div>




            </section>
            <div className="absolute flex flex-row items-center justify-center overflow-hidden gap-[30px] bottom-[-250px] overflow-hidden *:relative bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_40%,rgba(255,255,255,1)_90.94%,rgba(255,255,255,0.9)_100%)]" >
                <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[1200px] h-[400px] left-[200px]" alt="" />
                <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[1200px] h-[400px] left-[400px]" alt="" />
                <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[1200px] h-[400px]" alt="" />
                <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[1200px] h-[400px] right-[400px]" alt="" />
                <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[1200px] h-[400px] right-[800px]" alt="" />

            </div>
        </div>
    )
}