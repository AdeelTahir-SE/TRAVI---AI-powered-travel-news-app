import Image from "next/image"

export default function HotelDetailsEssentialInformation() {
    return (
        <section className="flex flex-col items-center justify-center lg:py-[100px] lg:px-[140px] py-[60px] px-[20px] lg:gap-[80px] gap-[60px]">
            <h2 className="heading-2">Essential Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
                <div className="flex flex-col items-center justify-center gap-[32px]">
                    <EssentialItem />
                    <EssentialItem />
                    <EssentialItem />
                    <EssentialItem />
                </div>
                <div className="flex flex-col items-center justify-center rounded-[24px] gap-[10px] h-full min-h-full">
                    <Image
                        src={"/images/essential-info.jpg"}
                        width={400}
                        height={600}
                        className="w-fit min-h-full h-full object-cover rounded-[24px]"
                        alt=""
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-[32px]">
                    <EssentialItem />
                    <EssentialItem />
                    <EssentialItem />
                    <EssentialItem />
                </div>
            </div>
        </section>)
}

function EssentialItem() {
    return (
        <div className="bg-white rounded-[24px] flex flex-row items-center justify-center gap-[20px] lg:gap-[32px] p-[20px] lg:p-[32px] border-[1px] border-[#D0D5DD]">
            <div className="flex flex-row items-center justify-center rounded-[16px] gap-[10px] bg-[#4999D21A] w-[64px] h-[64px] lg:w-[80px] lg:h-[80px]">
                <Image src="/icons/calender.svg" className="w-[32px] lg:w-[46px] h-[32px] lg:h-[46px] " width={46} height={46} alt="" />
            </div>

            <div className="flex flex-col items-start justify-center gap-[12px]">
                <h3 className="font-inter font-normal text-[24px] leading-[32px] tracking-[-0.02em] text-[#475467]">
                    Check-in / Check-out
                </h3>
                <span className="font-inter font-medium text-[28px] leading-[36px] tracking-[-0.02em] text-black">
                    3:00 PM / 12:00 PM
                </span>
            </div>
        </div>
    )
}