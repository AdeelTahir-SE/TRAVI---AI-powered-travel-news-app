import Image from "next/image";
export default function TagCard(){
    return (
      <section className="flex flex-col items-center justify-center rounded-[20px] border-1 lg:p-[32px] lg:rounded-[30px] p-[20px] gap-[24px] bg-white border-[#D0D5DD] max-w-[525.33px]">
        <div className="w-full ">
          <Image
            src={"/images/trending-dirtbike.png"}
            className="rounded-[16px] lg:rounded-[24px] w-full h-[286px] gap-[10px]"
            alt=""
            width={1200}
            height={400}
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-[8px]">
          <span className="px-[16px] py-[6px] lg:py-[8px] lg:px-[20px] bg-[#0D7FF21A] rounded-[900px] lg:gap-[10px]">
            <p className="text-[#0D7FF2] font-inter font-medium text-[14px] lg:text-[20px] keading-[28px] tracking-[-0.02em]">
              Mountain Retreat{" "}
            </p>
          </span>
          <h2 className="font-inter font-mediu text-[24px] lg:text-[32px] leading-[100%] tracking-[-0.02em]">
            The Ritz-Carlton, Lake Tahoe
          </h2>
          <p className="text-[#475467] font-inter font-normal text-[18px] lg:text-[24px] leading-[24px] lg:leading-[32px] tracking-[-0.02em]">
            Charming lodge-style resort with ski-in/ski-out access and mountain
            scenery.
          </p>
        </div>
        <button className="flex fitems-center justify-center gap-[8px] border-[#D0D5DD] border-1 py-[24px] px-[30px] gap-[8px] rounded-[800px] font-inter font-semibold text-[20px] leading-[100%]">Explore Destination <Image src={"/icons/email-submit.svg"} width={24} height={24} className="rotate-45 w-[24px] h-[24px]" alt=""/></button>
      </section>
    );
}