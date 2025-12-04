import Image from "next/image"
export default function PricingSection() {
    return (
        <section className="flex flex-col items-center justify-center py-[60px] px-[20px] gap-[48px] lg:gap-[80px] lg:py-[100px] lg:px-[140px]">
            <div className="flex flex-col items-center justify-center gap-[12px]">
                <h2 className="stylish-yellow-text">Pricing</h2>
                <h3 className="heading-2 text-black">Choose YourExperience</h3>
                <p className="font-inter text-normal text-[20px] lg:text-[24px] leading-[20px] lg:leading-[36px] tracking-[-0.02em] text-[#475467]"></p>
            </div>

            <div className="flex flex-row items-center justify-center gap-[48px] rounded-[24px]">
                <div className="flex flex-col items-center justify-center p-[48px] gap-[32px] border-t-[4px] border-[#0D7FF2]">
                    <div>

                    </div>
                    <div>

                    </div>
                    <button className="py-[24px] px-[30px] bg-[#F8A900] gap-[10px] rounded-[800px] font-inter font-semibold text-[20px] leading-[100%] tracking-[0px] text-black flex items-center justify-center gap-[8px]">
                        <Image src={"/icons/ticket.svg"} width={24} height={24} className="w-[24px] h-[24px]" alt="" />Select Ticket
                    </button>
                </div>
            </div>
        </section>
    )
}