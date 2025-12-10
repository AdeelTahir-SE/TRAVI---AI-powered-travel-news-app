import Image from "next/image"
import { EssentialInformation } from "@/utils/types"
export default function HotelDetailsEssentialInformation({ information, image }: { information?: EssentialInformation, image?: string }) {
    return (
        <section className="flex flex-col items-center justify-center lg:py-[100px] lg:px-[140px] py-[60px] px-[20px] lg:gap-[80px] gap-[60px]">
            <h2 className="heading-2">Essential Information</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px]">
                <div className="flex flex-col items-center justify-center gap-[32px] min-w-full">

                    <EssentialItem image="/icons/essential-features-hotel/calender.svg" title="Check-in / Check-out" desc={information?.checkin_checkout} />
                    <EssentialItem image="/icons/essential-features-hotel/route.svg" title="Location & Distance" desc={information?.location_distance} />
                    <EssentialItem image="/icons/essential-features-hotel/coin.svg" title="Price Range" desc={information?.price_range} />
                    <EssentialItem image="/icons/essential-features-hotel/beach.svg" title="Beach Access" desc={information?.beach_access} />

                </div>
                <div className="flex flex-col items-center justify-center rounded-[24px] gap-[10px] h-full min-h-full">
                    <Image
                        src={image || "/images/essential-info.jpg"}
                        width={400}
                        height={600}
                        className="w-fit min-h-full h-full object-cover rounded-[24px]"
                        alt=""
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-[32px]">

                    <EssentialItem image="/icons/essential-features-hotel/serving-food.svg" title="Dining Options" desc={information?.dining_options} />
                    <EssentialItem image="/icons/essential-features-hotel/stars.svg" title="Family Facilities" desc={information?.family_facilities} />
                    <EssentialItem image="/icons/essential-features-hotel/wifi.svg" title="Wifi Availability" desc={information?.wifi_availability} />
                    <EssentialItem image="/icons/essential-features-hotel/parking.svg" title="Parking Availability" desc={information?.parking_availability} />
                </div>
            </div>
        </section>)
}

function EssentialItem({ image, title, desc }: { image?: string, title?: string, desc?: string }) {
    return (
        <div className="bg-white w-full rounded-[24px] flex flex-row items-center justify-start gap-[20px] lg:gap-[32px] p-[20px] lg:p-[32px] border-[1px] border-[#D0D5DD]">
            <div className="flex flex-row items-center justify-center rounded-[16px] gap-[10px] bg-[#4999D21A] min-w-[64px] min-h-[64px] lg:min-w-[80px] lg:min-h-[80px] w-[64px] h-[64px] lg:w-[80px] lg:h-[80px]">
                {image && <Image src={image} className="w-[32px]  lg:w-[46px] h-[32px] lg:h-[46px] " width={46} height={46} alt="" />}
            </div>

            <div className="flex flex-col items-start justify-center gap-[12px]">
                <h3 className="font-inter font-normal text-[24px] leading-[32px] tracking-[-0.02em] text-[#475467]">
                    {title}
                </h3>
                <span className="font-inter font-medium text-[28px] leading-[36px] tracking-[-0.02em] text-black">
                    {desc}
                </span>
            </div>
        </div>
    )
}