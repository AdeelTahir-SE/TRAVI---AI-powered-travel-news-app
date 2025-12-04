import Image from "next/image";
export default function AttractionSpecsCard() {
    return (
        <section className="bg-white flex flex-row items-center justify-center p-[24px] gap-[16px] lg:gap-[24px] rounded-[16px]  border-1 border-[#D0D5DD] shadow-[0px_4px_40px_0px_rgba(127,127,127,0.25)]">
            <Image
                src={"/icons/location-hotel-detail.svg"}
                width={36}
                height={36}
                className="w-[36px] h-[36px] "
                alt=""
            />
            <div className="flex flex-col items-start justify-center gap-[12px]">
                <h2 className="font-inter text-[#000000] font-medium text-[24px] leading-[100%] tracking-[-0.02em]">
                    Palm Jumeirah, Dubai
                </h2>
            </div>
        </section>
    );
}