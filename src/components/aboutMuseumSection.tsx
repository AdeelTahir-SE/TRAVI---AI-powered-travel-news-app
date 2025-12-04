import Link from "next/link"
import Image from "next/image"
import { JSX } from "react"
import AboutMuseumCloudSection from "./aboutMuseumCloudSection"
export default function AboutMuseumSection(): JSX.Element {
    return (
        <section className="relative flex flex-row items-center justify-center py-[60px] px-[20px] lg:px-[60px] lg:py-[120px] gap-[100px] ">
            <div className="relative z-10 flex flex-col items-center justify-center lg:p-[40px] lg:gap-[40px] p-[32px] rounded-[32px] gap-[40px] bg-transparent lg:bg-[#FFFFFFCC] lg:backdrop-blur-[144px]">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-[32px] z-10  ">
                    <section className="gap-[12px] flex flex-col w-full">
                        <h2 className="stylish-yellow-text">About</h2>
                        <h3 className="heading-2 text-black">Museum of the Future</h3>
                    </section>
                    <section className="flex flex-col items-start justify-center gap-[12px] font-inter text-normal text-[20px] lg:text-[24px] leading-[28px] lg:leading-[36px] tracking-[-0.02em] text-[#475467]">
                        <p>
                            The Museum of the Future is an architectural marvel and exhibition space dedicated to innovation and future technologies. Located in the heart of Dubai, this iconic torus-shaped building showcases cutting-edge advancements in science, technology, and sustainability.
                        </p>

                        <Link
                            href="/"
                            className="text-[#0066CA] font-inter font-semibold text-[24px] leading-[32px] tracking-[0.02em]"
                        >
                            Read More
                        </Link>
                    </section>
                </div>
                <div className="w-full max-h-[687px] ">
                    <Image src={"/images/about-museum.jpeg"} width={1200} height={500} className="min-h-[240px] max-h-[687px] object-cover rounded-[32px] w-full h-auto " alt="" />
                </div>
            </div>
            <AboutMuseumCloudSection />

            <div className="block absolute inset-0 z-0 ">
                <Image
                    src={"/background-images/explore-dubai-background-effect.png"}
                    alt=""
                    fill
                    className="object-cover"
                />

                <div
                    className="absolute inset-0 pointer-events-none z-0  bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0.7)_20%,rgba(255,255,255,0.1)_80%,rgba(255,255,255,1)_100%)]  bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.7)_100%)]
                 "
                ></div>

            </div>
        </section>
    )
}