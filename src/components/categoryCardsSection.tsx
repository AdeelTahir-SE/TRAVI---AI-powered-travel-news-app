import Image from "next/image";
import HotelCard from "./hotelCard";
export default function CategoryCardsSection() {
  return (
    <section className="relative  flex flex-col items-center justify-center lg:gap-[80px] gap-[60px] px-[20px] md:px-[70px] py-[60px] 2xl:px-[140px] 2xl:py-[120px] w-full h-full">
      <div className="absolute inset-0 -z-10 top-[500px]">
        {/* Background Image */}
        <Image
          src="/background-images/explore-dubai-background-effect.png"
          alt=""
          fill
          className="object-cover object-center absolute z-0"
        />

        {/* Gradient Overlay */}
        <div className="absolute z-10 inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,1)_100%)]"></div>
      </div>

      <div className="flex flex-col gap-[24px] lg:gap-0 lg:flex-row items-center justify-between w-full ">
        <div className="hidden lg:flex flex-row items-center flex-wrap justify-center gap-[20px]  w-fit      *:border-[1px] *:border-[#D0D5DD] *:2xl:rounded-[12px] *:rounded-[8px] *:2xl:px-[24px] *:px-[18px] *:2xl:py-[16px] *:py-[8px] *:focus:outline-none *:focus:ring-2 *:focus:ring-blue-400 *:font-inter *:font-medium *:text-[22px] *:leading-[100%] *:tracking-[-0.02em]">
          {/* Price Range */}
          <div>
            <select>
              <option value="">Price Range</option>
              <option value="0-100">$0 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200-500">$200 - $500</option>
              <option value="500+">$500+</option>
            </select>
          </div>

          {/* Star Rating */}
          <div>
            <select>
              <option value="">Star Rating</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          {/* Amenities */}
          <div>
            <select>
              <option value="">Amenities</option>
              <option value="pool">Pool</option>
              <option value="wifi">WiFi</option>
              <option value="parking">Parking</option>
              <option value="spa">Spa</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <select>
              <option value="">Location</option>
              <option value="downtown">Downtown</option>
              <option value="beach">Beach</option>
              <option value="airport">Near Airport</option>
              <option value="suburbs">Suburbs</option>
            </select>
          </div>
        </div>
        {/* Mobile Filter Button - visible on small screens only */}
          <button className="flex lg:hidden items-center justify-between py-[16px] px-[24px] border-1  border-[#D0D5DD] min-w-full rounded-[12px]">
            <span className="font-inter font-medium text-[22px] leading-[100%] tracking-[-0.02em]">Filters</span>
            <Image src="/icons/filter-lines.svg" alt="" width={24} height={24}/>
          </button>

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
      <div className="flex flex-row flex-wrap items-center justify-center gap-[32px] w-full">
        <HotelCard/>
        <HotelCard/>
        <HotelCard/>
        <HotelCard/>
        <HotelCard/>
        <HotelCard/>
      </div>

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
    </section>
  );
}
