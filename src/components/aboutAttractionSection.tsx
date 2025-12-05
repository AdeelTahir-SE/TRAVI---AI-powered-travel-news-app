import Image from "next/image"
import CategoryHeroCloudSection from "@/components/categoryHeroCloudSection"
import { JSX } from "react"
import ArticleCloudSection from "./articleCloudSection"
export default function AboutAttractionHeroSection(): JSX.Element {
    return (
        <div className="relative flex flex-col items-center justify-center relative w-full  ">
            <section className="relative flex flex-col items-center justify-center w-full">
                <Image
                    src={"/images/about-attraction.jpg"}
                    width={700}
                    height={835}
                    className="w-auto object-cover h-[731px] lg:h-[1069px] min-w-full"
                    alt=""
                />
                <div className="z-30 text-center absolute inset-0 flex flex-col items-center justify-center gap-[24px] text-[#171A1F] text-center bottom-0 ">
                    <div className="flex flex-col items-center justify-center gap-[24px] absolute bottom-[-50px] px-[20px] py-[60px] 2xl:px-[600px] lg:py-[100px]">
                        <h1 className="font-playfair font-extrabold text-[48px] leading-[48px] tracking-[-0.02em]">Museum of the Future Dubai</h1>
                        <p className="font-playfiar font-normal text-[24px] leading-[32px] tracking-[0px] text-wrap">Cras tempus orci sed risus tempor, quis accumsan magna ultricies. Nullam pulvinar semper mi, eget vehicula lorem. Lorem ipsum dolor.</p>
                    </div>

                </div>

                {/* <div
                    className="
                      absolute inset-0 z-0
                      bg-[linear-gradient(180deg,#2384C8_0%,rgba(35,132,200,0.75)_26.24%,rgba(35,132,200,0.25)_51.94%,rgba(35,132,200,0)_100%)] h-[40%]
                    "
                ></div> */}
            </section>
            <ArticleCloudSection />
        </div>
    )
}