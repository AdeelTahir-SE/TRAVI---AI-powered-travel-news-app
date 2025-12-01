import Image from "next/image";
export default function HotelSpecsCard(){
    return (
      <section className="bg-white flex flex-row items-center justify-center p-[20px] lg:p-6 gap-[16px] lg:gap-[24px] rounded-[16px] lg:rounded-[24px] border-1 border-[#D0D5DD] shadow-[0px_4px_40px_0px_rgba(127,127,127,0.25)]">
        <div className="w-[70px] h-[70px] bg-[#F2F4F7] flex items-center justify-center rounded-[12px]">
          <Image
            src={"/icons/location-hotel-detail.svg"}
            width={40}
            height={40}
            className="w-[40px] h-[40px]"
            alt=""
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-[12px]">
          <h3 className="font-inter text-[#475467] font-normal text-[22px] leading-[32px] tracking-[-0.02em]">
            Location
          </h3>
          <h2 className="font-inter text-[#000000] font-medium text-[26px] leading-[32px] tracking-[-0.02em]">
            Palm Jumeirah, Dubai
          </h2>
        </div>
      </section>
    );
}