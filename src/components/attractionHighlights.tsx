import Image from "next/image"
export default function AttractionHighlights() {
    return (
        <section className="flex flex-col items-center justify-center py-[60px] px-[20px] gap-[48px] lg:gap-[80px] lg:py-[100px] lg:px-[140px]">
            <div className="flex flex-col items-center justify-center gap-[12px] text-center">
                <h2 className="stylish-yellow-text">Highlights</h2>
                <h3 className="font-manrope font-extrabold text-[48px] leading-[100%] tracking-[-0.03em] ">What to Expect</h3>
                <p className="font-inter text-normal text-[20px] lg:text-[24px] leading-[20px] lg:leading-[36px] tracking-[-0.02em] text-[#475467]">Explore the Main Attractions of Your Visit</p>
            </div>

            <div className="gap-[32px] radius-[24px] flex flex-row items-center justify-center flex-wrap">
                <AttractionHighlightsCard />
                <AttractionHighlightsCard />
                <AttractionHighlightsCard />
            </div>
        </section>
    )
}

function AttractionHighlightsCard() {
    return (
        <div className="max-w-[528px] bg-white shadow-[0px_4px_40px_0px_#7F7F7F40] flex flex-col rounded-[16px] border-[1px] p-[24px] gap-[32px] bg-white border-[#D0D5DD] ">
            <div className="flex">
                <Image src={"/images/attraction-highlight.jpg"} width={600} height={400} className="min-w-full h-auto max-h-[210px] object-cover lg:max-h-[355px] rounded-[24px] gap-[10px]" alt="" />
            </div>
            <div className="text-center flex flex-col items-center justify-center gap-[12px]">
                <h2 className="font-inter font-medium text-[32px] leading-[100%] tracking-[-0.02em]">
                    Architectural Marvel
                </h2>
                <p className="text-wrap font-inter font-normal text-[24px] leading-[34px] tracking-[-0.02em] text-[#475467]">
                    Experience the stunning torus-shaped building with its Arabic calligraphy facade and sustainable design features.
                </p>

            </div>
        </div>
    )
}