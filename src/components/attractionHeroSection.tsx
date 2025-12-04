import Image from "next/image"
import CategoryHeroCloudSection from "./categoryHeroCloudSection"

export default function AttractionHeroSection() {
    return (
        <div className="flex flex-col items-center justify-center relative w-full  ">
            <section className="flex flex-col items-center justify-center w-full">
                <Image
                    src={"/images/museum.jpg"}
                    width={700}
                    height={835}
                    className="w-auto object-cover h-[990px] lg:h-[1000px] min-w-full"
                    alt=""
                />
                <div className="gap-[24px] lg:gap-[32px] absolute inset-0 w-full h-full flex flex-col items-center justify-center text-white z-10 text-center px-[20px] md:px-[40px] lg:px-[100px] ">
                    <div className="flex flex-col items-center justify-center relative gap-[24px] lg:gap-[32px] ">
                        <div className="flex flex-col items-center justify-center gap-[12px] z-10">
                            <div className="py-[12px] px-[24px] rounded-[600px] bg-[#FFFFFF33] z-10">
                                <h2 className="font-inter font-[600px] text-[16px] lg:text-[20px] leading-[30px] tracking-[-0.02em] opacity-100 ">
                                    Home &gt; Attraction &gt; Museum of the Future
                                </h2>
                            </div>
                            <div className="flex flex-row items-center justify-center">
                                <h2 className="font-manrope font-extrabold text-[56px]  lg:text-[100px] leading-[68px] lg:leading-[100%] tracking-[-0.03em]">
                                    Museum of the Future,
                                    <span className="font-hurricane font-normal text-[74px] lg:text-[160px] leading-[68px] lg:leading-[54.4px] tracking-[-0.03em] text-[#f8a900]">
                                        Dubai
                                    </span>
                                </h2>
                            </div>
                            <p className="font-inter font-normal text-[20px] lg:text-[24px] leading-[32px]  tracking-[-0.02em] text-center text-[#FFFFFF]">
                                Dubai’s iconic innovation hub on Sheikh Zayed Road – a gateway to a future where technology and humanity coexist.
                            </p>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-[16px] z-10">
                            <button className="py-[24px] px-[30px] bg-[#F8A900] gap-[10px] rounded-[800px] font-inter font-semibold text-[20px] leading-[100%] tracking-[0px] text-black flex items-center justify-center gap-[8px]">
                                <Image src={"/icons/ticket.svg"} width={24} height={24} className="w-[24px] h-[24px]" alt="" />Book Ticket Online
                            </button>

                        </div>
                        <div className="absolute inset-0 pointer-events-none z-0 max-h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(35,132,200,0.3)_0%,rgba(35,132,200,0.3)_40%,rgba(35,132,200,0.1)_65%,rgba(35,132,200,0)_100%)] "></div>
                    </div>
                </div>
                <div
                    className="
                      absolute inset-0 z-0
                      bg-[linear-gradient(to_bottom,rgba(35,132,200,1)_0%,rgba(35,132,200,0.2)_50%,rgba(35,132,200,0.2)_100%)]
                    "
                ></div>
            </section>
            <CategoryHeroCloudSection />
        </div>
    )
}