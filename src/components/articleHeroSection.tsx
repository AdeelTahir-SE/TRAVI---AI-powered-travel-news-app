import Image from "next/image"
import CategoryHeroCloudSection from "@/components/categoryHeroCloudSection"
import { JSX } from "react"
import ArticleCloudSection from "./articleCloudSection"
export default function ArticleHeroSection(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center relative w-full  ">
            <section className="flex flex-col items-center justify-center w-full">
                <Image
                    src={"/images/article-banner.jpg"}
                    width={700}
                    height={835}
                    className="w-auto object-cover h-[685px] lg:h-[986px] min-w-full"
                    alt=""
                />

                <div
                    className="
                      absolute inset-0 z-0
                      bg-[linear-gradient(180deg,#2384C8_0%,rgba(35,132,200,0.75)_26.24%,rgba(35,132,200,0.25)_51.94%,rgba(35,132,200,0)_100%)] h-[40%]
                    "
                ></div>
            </section>
            <ArticleCloudSection />
        </div>
    )
}