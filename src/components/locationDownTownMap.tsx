import Image from "next/image";
export default function LocationDownTownMap() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-[48px] lg:gap-[60px] lg:gap-[80px] py-[60px] px-[20px] lg:py-[100px] lg:px-[140px]">
      <h2 className="heading-2 text-center">View Downtown on the Map</h2>
      <div className="border-1 border-[#EAECF0] gap-[12px] rounded-[24px]">
        <Image
          src="/images/map.png"
          width={1200}
          height={400}
          className="object-cover min-h-[520px] rounded-[24px]"
          alt=""
        />
      </div>
    </section>
  );
}
