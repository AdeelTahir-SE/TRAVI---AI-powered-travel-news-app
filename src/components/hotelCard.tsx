import Image from "next/image";
import { Hotel } from "@/utils/types";
import Link from "next/link";
interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  // Calculate filled stars based on rating
  const filledStars = Math.floor(hotel.rating || 0);
  const totalStars = 5;

  return (
    <div className="flex flex-col items-center justify-center border-[1px] border-[#D0D5DD] rounded-[16px] lg:rounded-[30px] bg-white w-[300px] sm:w-[350px] md:w-[400px] lg:w-[525px] max-w-[525px] shadow-lg">
      <Image
        src={hotel.hotel_image_in_clouds || hotel.about_hotel_images?.[0] || "/images/trending-jewelery.png"}
        width={525}
        height={725}
        className="h-fit object-cover w-full lg:max-h-[300px] 2xl:max-h-[354px] rounded-t-[16px] lg:rounded-t-[30px]"
        alt={hotel.title}
      />
      <div className="p-[20px] lg:p-[24px] gap-[32px] flex flex-col items-start justify-center w-full  ">
        <div className="gap-[12px] lg:gap-[16px] flex flex-col items-start justify-center ">
          <div className="flex flex-col items-start justify-center gap-[8px] ">
            <h3 className="font-inter font-medium text-[28px] lg:text-[30px] 2xl:text-[32px] leading-[100%] tracking-[-0.02em]">
              {hotel.title}
            </h3>
            <p className="font-inter font-normal text-[#475467] text-[20px] lg:text-[22px] 2xl:text-[24px] leading-[28px] lg:leading-[34px] tracking-[-0.02em]">
              {hotel.tagline}
            </p>
          </div>
          {hotel.location && (
            <div className="flex flex-row items-center justify-start gap-[8px]">
              <Image
                src={"/icons/location.svg"}
                width={26}
                height={26}
                className="w-[26px] h-[26px]"
                alt=""
              />
              <h4 className="font-inter font-normal text-[20px] lg:text-[22px] 2xl:text-[24px] leading-[28px] lg:leading-[32px] tracking-[-0.02em]">
                {hotel.location}
              </h4>
            </div>
          )}
          {hotel.rating && (
            <div className="flex flex-row items-center justify-center gap-[12px] ">
              <div className="flex flex-row items-center justify-center">
                {Array.from({ length: totalStars }).map((_, i) => (
                  <Image
                    key={i}
                    src={"/icons/star.svg"}
                    width={26}
                    height={26}
                    className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px]"
                    alt=""
                    style={{ opacity: i < filledStars ? 1 : 0.3 }}
                  />
                ))}
              </div>
              <h4 className="font-inter font-normal text-[24px] leading-[32px] tracking-[-0.02em] ">
                {hotel.rating} {hotel.reviews && `(${hotel.reviews.toLocaleString()} reviews)`}
              </h4>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full p-[20px] lg:p-[24px] border-t-1 border-[#D0D5DD]">
        <div className="flex flex-col items-center justify-center  gap-[4px]">
          <h6 className="font-inter text-[18px] leading-[26px] font-normal  text-[#475467]">
            From
          </h6>
          <h6 className="font-inter text-[28px] leading-[100%] font-[500px]  text-[#0D7FF2]">
            ${hotel.price || '---'}
          </h6>
        </div>
        <Link href={"/hotel/" + hotel?.title?.replace(" ", "-")} className="border-[#D0D5DD] border-1 py-[24px] px-[30px] rounded-[800px] font-inter font-[600px] font-extrabold text-[20px] leading-[100%] tracking-0">
          View Details
        </Link>
      </div>
    </div>
  );
}
