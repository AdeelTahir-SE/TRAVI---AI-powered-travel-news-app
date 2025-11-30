import Image from "next/image";
export default function HotelCard() {
  return (
    <div className="flex flex-col items-center justify-center border-[1px] border-[#D0D5DD] rounded-[16px] lg:rounded-[30px] bg-white w-[400px] lg:w-[525px] max-w-[525px] shadow-lg">
      <Image
        src="/images/trending-jewelery.png"
        width={525}
        height={725}
        className="h-fit object-cover w-full  rounded-t-[16px] lg:rounded-t-[30px]"
        alt=""
      />
      <div className="p-[20px] lg:p-[24px] gap-[32px] flex flex-col items-center justify-center ">
        <div className="gap-[12px] lg:gap-[16px] flex flex-col items-start justify-center ">
          <div className="flex flex-col items-start justify-center gap-[8px] ">
            <h3 className="font-inter font-medium text-[28px] lg:text-[32px] leading-[100%] tracking-[-0.02em]">
              Burj Al Arab
            </h3>
            <p className="font-inter font-normal text-[#475467] text-[20px] lg:text-[24px] leading-[28px] lg:leading-[34px] tracking-[-0.02em]">
              Luxury hotel known for its distinctive sail-shaped silhouette and
              opulent services.
            </p>
          </div>
          <div className="flex flex-row items-center justify-start gap-[8px]">
            <Image
              src={"/icons/location.svg"}
              width={26}
              height={26}
              className="w-[26px] h-[26px]"
              alt=""
            />
            <h4 className="font-inter font-normal text-[20px] lg:text-[24px] leading-[28px] lg:leading-[32px] tracking-[-0.02em]">
              Jumeirah Beach, Dubai
            </h4>
          </div>
          <div className="flex flex-row items-center justify-center gap-[12px] ">
            <div className="flex flex-row items-center justify-center">
              {[0, 1, 2, 3, 4, 5]?.map((v, i) => {
                return (
                  <Image
                    key={i}
                    src={"/icons/star.svg"}
                    width={26}
                    height={26}
                    className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
                    alt=""
                  />
                );
              })}
            </div>
            <h4 className="font-inter font-normal text-[24px] leading-[32px] tracking-[-0.02em] ">
              4.7 (5,000 reviews){" "}
            </h4>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full p-[20px] lg:p-[24px] border-t-1 border-[#D0D5DD]">
        <div className="flex flex-col items-center justify-center  gap-[4px]">
          <h6 className="font-inter text-[18px] leading-[26px] font-normal  text-[#475467]">
            From
          </h6>
          <h6 className="font-inter text-[28px] leading-[100%] font-[500px]  text-[#0D7FF2]">
            $500
          </h6>
        </div>
        <button className="border-[#D0D5DD] border-1 py-[24px] px-[30px] rounded-[800px] font-inter font-[600px] font-extrabold text-[20px] leading-[100%] tracking-0">
          View Details
        </button>
      </div>
    </div>
  );
}
