import Image from "next/image"
export default function LocationAndNearBySection() {
    return (
        <section className="flex flex-col items-center justify-center lg:flex-row py-[60px] px-[20px] lg:py-[100px] lg:px-[140px] gap-[48px] lg:gap-[80px]">
            <h2 className="heading-2">Locations & Nearby</h2>

            <div className="flex flex-col items-center justify-center gap-[40px] lg:gap-[80px]">
                <Image src={"/images/map.png"} width={400} height={420} className="w-full max-h-[420px] rounded-[24px] border-1 object-cover p-[20px] gap-[12px] border-[#EAECF0]" alt="" />
                <div className="flex flex-col items-center justify-center gap-[32px]">

                </div>
            </div>
        </section>
    )
}