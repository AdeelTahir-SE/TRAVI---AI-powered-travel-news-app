import Image from "next/image"
import { JSX } from "react"
import CategoryHeroCloudSection from "./categoryHeroCloudSection"
import ShalimarCloudSection from "./shalimarCloudSection"
export default function ArticleCoupleSection(): JSX.Element {
    return (
        <div className="relative flex flex-col items-center justify-center relative w-full  ">
            <section className="relative flex flex-col items-center justify-center w-full">
                <Image
                    src={"/images/article-couple.jpg"}
                    width={700}
                    height={835}
                    className="z-0 w-auto object-cover h-[337px] md:h-[842px] min-w-full relative rotate-[-180]"
                    alt=""
                />
                <div
                    className="
              absolute inset-0 z-0
bg-[linear-gradient(180deg,_#FFFFFF_0%,_rgba(255,255,255,0.7)_21.57%,_rgba(247,252,254,0.1)_35%,_rgba(239,250,253,0)_50%,_rgba(248,253,254,0)_79.2%,_#E1F4FB_100%)]
              "
                ></div>
            </section>
            <ShalimarCloudSection className="absolute overflow-hidden w-full bottom-[-40px] " />
        </div>
    )
}