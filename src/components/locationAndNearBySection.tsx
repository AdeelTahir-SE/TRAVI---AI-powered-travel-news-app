import Image from "next/image"
import Link from "next/link"
export default function LocationAndNearBySection() {
    return (
        <section className="min-w-full flex flex-col items-center lg:items-start justify-center  py-[60px] px-[20px] lg:py-[100px] lg:px-[140px] gap-[48px] lg:gap-[80px]">
            <h2 className="heading-2 text-center lg:text-start">Locations & Nearby</h2>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px] ">
                <Image src={"/images/map.png"} width={400} height={420} className="w-full max-h-[420px] lg:max-h-[960px] min-h-full rounded-[24px] border-1 object-cover  gap-[12px] border-[#EAECF0]" alt="" />
                <div className="flex flex-col items-center justify-center gap-[32px]">


                    <div className="w-full flex flex-col items-start justify-center rounded-[24px] border-1 p-[24px] gap-[20px] border-[#D0D5DD]">
                        <Image src={"/icons/location-orange.svg"} width={36} height={36} className="w-[36px] h-[36px] " alt="" />
                        <div className="flex flex-col items-start justify-center gap-[12px]">
                            <h2 className="font-inter font-medium text-[28px] leading-[36px] tracking-[-0.02em]">Address:</h2>
                            <p className="font-inter font-normal text-[20px] leading-[28px] tracking-[-0.02em] text-[#475467]">Sheikh Zayed Road, Trade Centre 2, Dubai, UAE</p>
                        </div>
                    </div>




                    <div className="w-full flex flex-col items-start justify-center rounded-[24px] border-1 p-[24px] gap-[20px] border-[#D0D5DD]">
                        <Image src={"/icons/route-orange.svg"} width={36} height={36} className="w-[36px] h-[36px] " alt="" />
                        <div className="flex flex-col items-start justify-center gap-[12px]">
                            <h2 className="font-inter font-medium text-[28px] leading-[36px] tracking-[-0.02em]">Getting There:</h2>
                            <span className="font-inter font-normal text-[20px] leading-[28px] tracking-[-0.02em] ">Metro:
                                <span className="text-[#475467]"> Emirates Towers Station (Red Line), 5-minute walk</span>
                            </span>
                            <span className="font-inter font-normal text-[20px] leading-[28px] tracking-[-0.02em] ">Metro:
                                <span className="text-[#475467]"> Emirates Towers Station (Red Line), 5-minute walk</span>
                            </span>
                            <span className="font-inter font-normal text-[20px] leading-[28px] tracking-[-0.02em] ">Metro:
                                <span className="text-[#475467]"> Emirates Towers Station (Red Line), 5-minute walk</span>
                            </span>
                        </div>
                    </div>




                    <div className="flex flex-col items-start justify-center rounded-[24px] border-1 p-[24px] gap-[20px] border-[#D0D5DD] w-full">
                        <Image src={"/icons/stars-orange.svg"} width={36} height={36} className="w-[36px] h-[36px] " alt="" />
                        <div className="flex flex-col items-start justify-center gap-[12px]">
                            <h2 className="font-inter font-medium text-[28px] leading-[36px] tracking-[-0.02em]">Nearby Attractions:</h2>
                            <ul className="flex flex-col items-start justify-center gap-[12px]">
                                <li className="flex flex-row items-center justify-center gap-1">
                                    <Link href="/" className="font-inter font-semibold text-[20px] leading-[28px] tracking-[-0.02em] underline decoration-solid decoration-[1px] underline-offset-[0px] decoration-current text-[#0D7FF2]">Burj Khalifa</Link>{" "}
                                    <span className="font-inter font-normal text-[20px] leading-[28px] tracking-[-0.02em] text-[#475467]">{"  "}</span>
                                    <span className="font-inter font-normal text-[20px] leading-[28px] tracking-[-0.02em] text-[#475467]">(10 min drive)</span>
                                </li>

                                <li className="flex flex-row items-center justify-center gap-1">
                                    <Link href="/" className="font-inter font-semibold text-[20px] leading-[28px] tracking-[-0.02em] underline decoration-solid decoration-[1px] underline-offset-[0px] decoration-current text-[#0D7FF2]">Burj Khalifa</Link>{" "}
                                    <span className="font-inter font-normal text-[20px] leading-[28px] tracking-[-0.02em] text-[#475467]">{"  "}</span>
                                    <span className="font-inter font-normal text-[20px] leading-[28px] tracking-[-0.02em] text-[#475467]">(10 min drive)</span>
                                </li>

                                <li className="flex flex-row items-center justify-center gap-1">
                                    <Link href="/" className="font-inter font-semibold text-[20px] leading-[28px] tracking-[-0.02em] underline decoration-solid decoration-[1px] underline-offset-[0px] decoration-current text-[#0D7FF2]">Burj Khalifa</Link>{" "}
                                    <span className="font-inter font-normal text-[20px] leading-[28px] tracking-[-0.02em] text-[#475467]">{"  "}</span>
                                    <span className="font-inter font-normal text-[20px] leading-[28px] tracking-[-0.02em] text-[#475467]">(10 min drive)</span>
                                </li>

                            </ul>
                        </div>
                    </div>





                </div>
            </div>
        </section>
    )
}