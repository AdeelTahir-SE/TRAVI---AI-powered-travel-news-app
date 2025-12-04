import Link from "next/link";
import Image from "next/image";
export default function RoomTypesSection() {
  return (
    <section className="min-w-full relative flex flex-col items-center justify-center py-[60px] px-[20px] lg:px-[140px] lg:py-[100px] gap-[80px] ">
      <div className="flex flex-col items-start justify-center lg:justify-between lg:flex-row gap-[20px] z-10 min-w-full ">
        <section className="gap-[12px] flex flex-col w-full">
          <h2 className="stylish-yellow-text">Room Types</h2>
          <h3 className="heading-2 text-black">Rooms & Suits</h3>
        </section>
        <section className="flex flex-col items-start justify-center gap-[20px] font-inter text-normal text-[20px] lg:text-[24px] leading-[28px] lg:leading-[36px] tracking-[-0.02em] text-[#475467]">
          <p>Explore room options designed for comfort and stunning views.</p>

          <Link
            href="/"
            className="text-black py-[24px] px-[30px] bg-[#F8A900] rounded-[800px] gap-[10px] font-inter font-semibold text-[20px] leading-[100%] tracking-[0px]"
          >
            Explore more
          </Link>
        </section>
      </div>

      <div className="flex flex-row items-center justify-center flex-wrap gap-[32px] rounded-[24px] z-10">
    <RoomTypeCard/>
    <RoomTypeCard/>
    <RoomTypeCard/>
      </div>

      <div className="hidden lg:block absolute inset-0 z-0 ">
        <Image
          src={"/background-images/explore-dubai-background-effect.png"}
          alt=""
          fill
          className="object-cover"
        />

        <div
          className="absolute inset-0 pointer-events-none z-0  bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0.7)_20%,rgba(255,255,255,0.1)_80%,rgba(255,255,255,1)_100%)]  bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.7)_100%)]
     "
        ></div>
      </div>
    </section>
  );
}



function RoomTypeCard(){
    return (
      <section className="flex flex-col items-start justify-center  p-[32px] gap-[32px] rounded-[30px] border-1 border-[#D0D5DD] bg-white">
        <div className="rounded-[24px] gap-[10px]">
          <Image
            src={"/images/room.jpg"}
            width={450}
            height={350}
            className="rounded-[24px] gap-[10px] w-full"
            alt=""
          />
        </div>

        <div className="flex flex-col items-start justify-center gap-[16px]">
          <h2 className="font-inter font-medium text-[28px] lg:text-[32px] leading-[100%] tracking-[0.02em]">
            Ocean King Room
          </h2>
          <div className="flex flex-row items-center flex-wrap gap-[16px] max-w-[465px]">
            <RoomSpecTag />
            <RoomSpecTag />
            <RoomSpecTag />
            <RoomSpecTag />
          </div>
          <button className="py-[24px] px-[30px] min-w-full gap-[10px] border-1 border-[#D0D5DD] rounded-[800px] font-inter font-semibold text-[20px] leading-[100%] tracking-[0px]">
            View Rooms Details
          </button>
        </div>
      </section>
    );
}

function RoomSpecTag(){
    return (
      <span className="py-[8px] px-[16px] bg-[#F2F4F7] rounded-[60px] flex flex-row items-center justify-center flex-nowrap gap-[8px]">
        <Image
          src="/icons/aspect-ratio.svg"
          width={24}
          height={24}
          alt=""
          className="w-[24px] h-[24px]"
        />
        <h3 className="font-inter text-[18px] font-medium leading-[26px] tracking-[0.02em] text-[#475467]">
          45 sqm
        </h3>
      </span>
    );
}