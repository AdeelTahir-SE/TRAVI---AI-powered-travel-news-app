import Image from "next/image"
export default function QuoteWithoutImage() {
    return (
        <section className="relative flex flex-row items-center justify-center w-[381px] h-[246px]">
            <Image src={"/images/quote-noimage-container.svg"} className="w-full h-full" width={381} height={246} alt="" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[47px] pl-[28px] pt-[73px] pb-[65px] ">
                <div className=" ">

                    <p className="font-inter font-bold font-italic text-[25px] leading-[30px] tracking-[-0.02em] text-[#000000]">
                        Mauris nulla eros, rutrum quis imperdiet ut, lacinia at arcu. Sed sit amet risus magna.
                    </p>
                    <span className="absolute flex flex-row items-center justify-center gap-[2px] bottom-[34px] right-[60px]">
                        <span className="w-[31px] border-[2px] border-[#000000] "></span>
                        <span className="font-inter font-bold text-[#112259] text-[19px] leading-[30px] tracking-[-0.02em]">Michael Scott</span>
                    </span>

                </div>



            </div>

            <Image src={"/images/quote.svg"} className="absolute top-[-20px] left-[-5px] max-h-[98px]" width={100} height={100} alt="" />
        </section>
    )
}