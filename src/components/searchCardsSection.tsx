import Image from "next/image";
import HotelCard from "./hotelCard";
import BookStaySection from "./bookStaySection";
export default function CategoryCardsSection() {
  const arr = [
    {
      name: "hello",
    },
    {
      name: "hello",
    },
    {
      name: "hello",
    },
    {
      name: "hello",
    },
  ];
 if (!arr || arr.length <= 0) {
   return (
     <div className="flex flex-col items-center justify-center gap-[70px] md:gap-0 min-w-full">
       <section className="relative w-full min-h-full flex flex-col items-center justify-center px-[20px] py-[100px] lg:py-[210px] lg:px-[140px]">
         {/* Background image only on large screens */}
         <div className="hidden lg:block absolute inset-0 top-[160px] -z-10 ">
           <Image
             src={"/background-images/explore-dubai-background-effect.png"}
             alt=""
             fill
             className="object-cover"
           />

           <div
             className="absolute inset-0 pointer-events-none   bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_20%,rgba(255,255,255,0)_80%,rgba(255,255,255,1)_100%)]  bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.7)_100%)]
"
           ></div>
         </div>

         {/* No result content */}
         <div className="flex flex-col items-center justify-center gap-[48px] text-center">
           <Image
             src={"/images/no-result.svg"}
             width={511}
             height={390}
             alt="No results"
             className="hidden md:block md:w-[511px] md:h-[390px]"
           />
           <Image
             src={"/images/no-result-phones.svg"}
             width={511}
             height={390}
             alt="No results"
             className="w-[183px] h-[166px] md:hidden block"
           />

           {/* Text below SVG */}
           <div className="flex flex-col items-center justify-center gap-[20px]">
             <h2 className="font-manrope font-semibold text-[48px] leading-[100%] tracking-[-0.03em]">
               Nothing Matches Your Search
             </h2>
             <p className="font-inter text-[28px] font-normal text-[#475467] leading-[100%] tracking-[0.03em]">
               No results found. Try adjusting your filters.
             </p>
           </div>
         </div>
       </section>
       <div className="md:hidden">
         <BookStaySection />
       </div>
     </div>
   );
 }

  return (
    <section className="relative  flex flex-col items-center justify-center lg:gap-[80px] gap-[60px] px-[20px] md:px-[70px] py-[60px] 2xl:px-[140px] 2xl:py-[120px] w-full h-full">
      <div className="absolute inset-0 -z-10 top-[500px]">
        {/* Background Image */}
        <Image
          src="/background-images/explore-dubai-background-effect.png"
          alt=""
          fill
          className="object-cover object-center absolute z-0 lg:min-h-[900px]"
        />
        

        {/* Gradient Overlay */}
        <div className="absolute z-10 inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,1)_100%)]"></div>
      </div>

      {arr && arr?.length > 0 && (
        <div className="flex flex-col gap-[24px] lg:gap-0 lg:flex-row items-center justify-between w-full ">
          <div className="lg:flex flex-row items-center justify-center w-fit hidden flex-wrap gap-[20px] *:border-1 *:rounded-[12px] *:py-[16px] *:px-[24px] *:bg-white *:text-black *:border-[#D0D5DD] *:font-inter *:font-medium *:text-[22px] *:leading-[100%] *:tracking-[-0.02em]">
            <button>All</button>
            <button>Hotels</button>
            <button>Attractions</button>
            <button>Guides</button>
          </div>
          {/* Mobile Filter Button - visible on small screens only */}
          <div className="min-w-full font-inter font-medium text-[22px] leading-[100%] tracking-[-0.02em] flex lg:hidden items-center justify-between  py-[16px] px-[24px] border-1  border-[#D0D5DD] min-w-full rounded-[12px]">
            <select className="flex justify-between min-w-full">
              <option value="">Location</option>
              <option value="downtown">Downtown</option>
              <option value="beach">Beach</option>
              <option value="airport">Near Airport</option>
              <option value="suburbs">Suburbs</option>
            </select>
          </div>
          <div className="flex flex-row items-center lg:justify-center gap-[20px] w-full lg:w-fit justify-between ">
            <span className="font-inter font-bold text-[22px] leading-[100%] tracking-[-0.02em]">
              Sort By:{" "}
            </span>
            <div className="border-[1px] border-[#D0D5DD] rounded-[12px] px-[24px] py-[16px] focus:outline-none focus:ring-2 focus:ring-blue-400 font-inter font-medium text-[22px] leading-[100%] tracking-[-0.02em]">
              <select>
                <option value="">Location</option>
                <option value="downtown">Downtown</option>
                <option value="beach">Beach</option>
                <option value="airport">Near Airport</option>
                <option value="suburbs">Suburbs</option>
              </select>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row flex-wrap items-center justify-center gap-[32px] w-full">
        {arr &&
          arr?.length > 0 &&
          arr?.map((v, i) => {
            return <HotelCard key={i} />;
          })}
      </div>

      {arr && arr?.length > 0 && (
        <div className="hidden md:flex flex-row items-center justify-between border-t-1 w-full border-white">
          <button className="flex flex-row items-center justify-center px-[30px]  py-[24px] border-[1px] border-[#D0D5DD] gap-[8px] rounded-[800px] ">
            <Image
              src="/icons/arrow-left.svg"
              alt=""
              width={24}
              height={24}
              className="w-[24px] h-[24px]"
            />
            <span className="font-inter font-bold text-[20px] leading-[100%] tracking-0">
              Previous
            </span>
          </button>
          <div className="flex items-center justify-center gap-[2px]  min-h-full *:font-inter *:font-medium *:text-[18px] *:leading-[26px] *:text-center *:tracking-[-0.05em] ">
            {/* Page 1 */}
            <button className="bg-white px-4 py-2 w-full rounded-[8px] active:bg-[#0D7FF2] active:text-white active:rounded-[12px]">
              1
            </button>
            {/* Page 2 */}
            <button className="bg-white px-4 py-2 rounded-[8px] active:bg-[#0D7FF2] active:text-white active:rounded-[12px]">
              2
            </button>
            {/* Page 3 */}
            <button className="bg-white px-4 py-2 rounded-[8px] active:bg-[#0D7FF2] active:text-white active:rounded-[12px]">
              3
            </button>
            {/* Ellipsis */}
            <span className="px-4 py-2">...</span>
            {/* Page 8 */}
            <button className="bg-white px-4 py-2 rounded-[8px] active:bg-[#0D7FF2] active:text-white active:rounded-[12px]">
              8
            </button>
            {/* Page 9 */}
            <button className="bg-white px-4 py-2 rounded-[8px] active:bg-[#0D7FF2] active:text-white active:rounded-[12px]">
              9
            </button>
            {/* Page 10 */}
            <button className="bg-white px-4 py-2 rounded-[8px] active:bg-[#0D7FF2] active:text-white active:rounded-[12px]">
              10
            </button>
          </div>

          <button className="flex flex-row items-center justify-center px-[30px] py-[24px] border-[1px] border-[#D0D5DD] gap-[8px] rounded-[800px] ">
            <span className="font-inter font-bold text-[20px] leading-[100%] tracking-0">
              Next
            </span>
            <Image
              src="/icons/arrow-left.svg"
              alt=""
              width={24}
              height={24}
              className="w-[24px] h-[24px] rotate-180"
            />
          </button>
        </div>
      )}
      {arr && arr?.length > 0 && (
        <div className=" md:hidden flex flex-row items-center justify-between w-full border-t-[1px] border-white ">
          <button className="rounded-full flex items-center justify-center gap-[8px] border-1 border-[#D0D5DD] w-[58px] h-[58px]">
            <Image
              src="/icons/arrow-left.svg"
              alt=""
              width={24}
              height={24}
              className="w-[24px] h-[24px]"
            />
          </button>
          <span className="font-inter font-normal text-[20px] leading-[28px] text-[#344054]">
            Page 1 of 10
          </span>
          <button className="rounded-full flex items-center justify-center gap-[8px] border-1 border-[#D0D5DD] w-[58px] h-[58px]">
            <Image
              src="/icons/arrow-left.svg"
              alt=""
              width={24}
              height={24}
              className="w-[24px] h-[24px] rotate-180 border-2"
            />
          </button>
        </div>
      )}
    </section>
  );
}
