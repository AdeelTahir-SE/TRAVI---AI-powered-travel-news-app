'use client'

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import HotelCard from "./hotelCard";
import BookStaySection from "./bookStaySection";
import { Hotel } from "@/utils/types";

interface SearchCardsSectionProps {
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

export default function SearchCardsSection({ hotels, loading, error, currentPage, totalPages }: SearchCardsSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentType = searchParams.get('type') || 'all';
  const currentLocation = searchParams.get('location') || '';
  const currentSortBy = searchParams.get('sortBy') || '';
  const query = searchParams.get('q') || '';

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all' && value !== '') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== 'page') {
      params.set('page', '1');
    }
    router.push(`/search?${params.toString()}`);
  };

  // Function to handle page navigation
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    updateSearchParams('page', page.toString());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }
  if (!hotels || hotels.length <= 0) {
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
    <section className="relative  overflow-y-hidden  flex flex-col items-center justify-center lg:gap-[80px] gap-[60px] px-[20px] md:px-[70px] py-[60px] 2xl:px-[140px] 2xl:py-[120px] w-full h-full">
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

      {hotels && hotels?.length > 0 && (
        <div className="flex flex-col gap-[24px] lg:gap-0 lg:flex-row items-center justify-between w-full ">
          {/* Desktop Type Filter Buttons */}
          <div className="lg:flex flex-row items-center justify-center w-fit hidden flex-wrap gap-[20px]">
            <button
              onClick={() => updateSearchParams('type', 'all')}
              className={`border-1 rounded-[12px] py-[16px] px-[24px] font-inter font-medium text-[22px] leading-[100%] tracking-[-0.02em] transition-colors ${currentType === 'all'
                ? 'bg-[#0D7FF2] text-white border-[#0D7FF2]'
                : 'bg-white text-black border-[#D0D5DD] hover:border-[#0D7FF2]'
                }`}
            >
              All
            </button>
            <button
              onClick={() => updateSearchParams('type', 'hotels')}
              className={`border-1 rounded-[12px] py-[16px] px-[24px] font-inter font-medium text-[22px] leading-[100%] tracking-[-0.02em] transition-colors ${currentType === 'hotels'
                ? 'bg-[#0D7FF2] text-white border-[#0D7FF2]'
                : 'bg-white text-black border-[#D0D5DD] hover:border-[#0D7FF2]'
                }`}
            >
              Hotels
            </button>
            <button
              onClick={() => updateSearchParams('type', 'attractions')}
              className={`border-1 rounded-[12px] py-[16px] px-[24px] font-inter font-medium text-[22px] leading-[100%] tracking-[-0.02em] transition-colors ${currentType === 'attractions'
                ? 'bg-[#0D7FF2] text-white border-[#0D7FF2]'
                : 'bg-white text-black border-[#D0D5DD] hover:border-[#0D7FF2]'
                }`}
            >
              Attractions
            </button>
            <button
              onClick={() => updateSearchParams('type', 'guides')}
              className={`border-1 rounded-[12px] py-[16px] px-[24px] font-inter font-medium text-[22px] leading-[100%] tracking-[-0.02em] transition-colors ${currentType === 'guides'
                ? 'bg-[#0D7FF2] text-white border-[#0D7FF2]'
                : 'bg-white text-black border-[#D0D5DD] hover:border-[#0D7FF2]'
                }`}
            >
              Guides
            </button>
          </div>
          {/* Mobile Type Filter Dropdown */}
          <div className="min-w-full font-inter font-medium text-[22px] leading-[100%] tracking-[-0.02em] flex lg:hidden items-center justify-between py-[16px] px-[24px] border-1 border-[#D0D5DD] rounded-[12px]">
            <select
              className="flex justify-between min-w-full bg-transparent outline-none"
              value={currentType}
              onChange={(e) => updateSearchParams('type', e.target.value)}
            >
              <option value="all">All</option>
              <option value="hotels">Hotels</option>
              <option value="attractions">Attractions</option>
              <option value="guides">Guides</option>
            </select>
          </div>
          {/* Sort By Dropdown */}
          <div className="flex flex-row items-center lg:justify-center gap-[20px] w-full lg:w-fit justify-between ">
            <span className="font-inter font-bold text-[22px] leading-[100%] tracking-[-0.02em]">
              Sort By:{" "}
            </span>
            <div className="border-[1px] border-[#D0D5DD] rounded-[12px] px-[24px] py-[16px] focus:outline-none focus:ring-2 focus:ring-blue-400 font-inter font-medium text-[22px] leading-[100%] tracking-[-0.02em]">
              <select
                className="bg-transparent outline-none"
                value={currentSortBy}
                onChange={(e) => updateSearchParams('sortBy', e.target.value)}
              >
                <option value="">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row flex-wrap items-center justify-center gap-[32px] w-full">
        {hotels &&
          hotels?.length > 0 &&
          hotels?.map((hotel, i) => {
            return <HotelCard key={i} hotel={hotel} />;
          })}
      </div>

      {hotels && hotels?.length > 0 && totalPages > 1 && (
        <div className="hidden md:flex flex-row items-center justify-between border-t-1 w-full border-white">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex flex-row items-center justify-center px-[30px] py-[24px] border-[1px] border-[#D0D5DD] gap-[8px] rounded-[800px] transition-opacity ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
          >
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
          <div className="flex items-center justify-center gap-[2px] min-h-full">
            {/* Generate page numbers dynamically */}
            {(() => {
              const pages = [];
              const showEllipsisStart = currentPage > 3;
              const showEllipsisEnd = currentPage < totalPages - 2;

              // Always show first page
              pages.push(
                <button
                  key={1}
                  onClick={() => goToPage(1)}
                  className={`font-inter font-medium text-[18px] leading-[26px] text-center tracking-[-0.05em] px-4 py-2 rounded-[8px] transition-colors ${currentPage === 1
                    ? 'bg-[#0D7FF2] text-white rounded-[12px]'
                    : 'bg-white hover:bg-gray-100'
                    }`}
                >
                  1
                </button>
              );

              // Show ellipsis or page 2
              if (showEllipsisStart) {
                pages.push(<span key="ellipsis-start" className="px-4 py-2 font-inter font-medium text-[18px]">...</span>);
              } else if (totalPages > 1) {
                pages.push(
                  <button
                    key={2}
                    onClick={() => goToPage(2)}
                    className={`font-inter font-medium text-[18px] leading-[26px] text-center tracking-[-0.05em] px-4 py-2 rounded-[8px] transition-colors ${currentPage === 2
                      ? 'bg-[#0D7FF2] text-white rounded-[12px]'
                      : 'bg-white hover:bg-gray-100'
                      }`}
                  >
                    2
                  </button>
                );
              }

              // Show current page and neighbors (if not first or last)
              for (let i = Math.max(3, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) {
                if (i > 2 && i < totalPages - 1) {
                  pages.push(
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      className={`font-inter font-medium text-[18px] leading-[26px] text-center tracking-[-0.05em] px-4 py-2 rounded-[8px] transition-colors ${currentPage === i
                        ? 'bg-[#0D7FF2] text-white rounded-[12px]'
                        : 'bg-white hover:bg-gray-100'
                        }`}
                    >
                      {i}
                    </button>
                  );
                }
              }

              // Show ellipsis or second-to-last page
              if (showEllipsisEnd) {
                pages.push(<span key="ellipsis-end" className="px-4 py-2 font-inter font-medium text-[18px]">...</span>);
              } else if (totalPages > 2) {
                pages.push(
                  <button
                    key={totalPages - 1}
                    onClick={() => goToPage(totalPages - 1)}
                    className={`font-inter font-medium text-[18px] leading-[26px] text-center tracking-[-0.05em] px-4 py-2 rounded-[8px] transition-colors ${currentPage === totalPages - 1
                      ? 'bg-[#0D7FF2] text-white rounded-[12px]'
                      : 'bg-white hover:bg-gray-100'
                      }`}
                  >
                    {totalPages - 1}
                  </button>
                );
              }

              // Always show last page if more than 1 page
              if (totalPages > 1) {
                pages.push(
                  <button
                    key={totalPages}
                    onClick={() => goToPage(totalPages)}
                    className={`font-inter font-medium text-[18px] leading-[26px] text-center tracking-[-0.05em] px-4 py-2 rounded-[8px] transition-colors ${currentPage === totalPages
                      ? 'bg-[#0D7FF2] text-white rounded-[12px]'
                      : 'bg-white hover:bg-gray-100'
                      }`}
                  >
                    {totalPages}
                  </button>
                );
              }

              return pages;
            })()}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex flex-row items-center justify-center px-[30px] py-[24px] border-[1px] border-[#D0D5DD] gap-[8px] rounded-[800px] transition-opacity ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
          >
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
      {hotels && hotels?.length > 0 && totalPages > 1 && (
        <div className="md:hidden flex flex-row items-center justify-between w-full border-t-[1px] border-white">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-full flex items-center justify-center gap-[8px] border-1 border-[#D0D5DD] w-[58px] h-[58px] ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
          >
            <Image
              src="/icons/arrow-left.svg"
              alt=""
              width={24}
              height={24}
              className="w-[24px] h-[24px]"
            />
          </button>
          <span className="font-inter font-normal text-[20px] leading-[28px] text-[#344054]">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded-full flex items-center justify-center gap-[8px] border-1 border-[#D0D5DD] w-[58px] h-[58px] ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
          >
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
    </section>
  );
}
