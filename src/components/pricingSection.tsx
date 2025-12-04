import Image from "next/image"
export default function PricingSection() {
    return (
        <section className="flex flex-col items-center justify-center py-[60px] px-[20px] gap-[48px] lg:gap-[80px] lg:py-[100px] lg:px-[140px]">
            <div className="flex flex-col items-center justify-center gap-[12px] text-center">
                <h2 className="stylish-yellow-text">Pricing</h2>
                <h3 className="font-manrope font-extrabold text-[48px] leading-[100%] tracking-[-0.03em] ">Choose Your Experience</h3>
                <p className="font-inter text-normal text-[20px] lg:text-[24px] leading-[20px] lg:leading-[36px] tracking-[-0.02em] text-[#475467]">Select the Ticket That Fits Your Plan</p>
            </div>

            <div className="flex flex-row items-center flex-wrap justify-center gap-[48px] rounded-[24px]">
                <div className="shadow-[0px_4px_40px_0px_#7F7F7F40] flex flex-col items-center justify-center p-[48px] gap-[32px] border-t-[4px] border-[#0D7FF2] rounded-[24px] text-center">
                    <div className="items-center justify-center rounded-[24px] gap-[10px] flex w-[100px] h-[100px] shadow-[0px_4px_40px_0px_#7F7F7F40]">
                        <Image src={"/icons/star.svg"} width={56} height={56} className="w-[56px] h-[56px]" alt="" />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-[20px]">
                        <h2 className="font-inter font-medium text-[32px] leading-[100%] tracking-[-0.02em]">Standard Admission</h2>
                        <h3 className="text-[#0D7FF2] font-inter font-medium text-[56px] leading-[100%] tracking-[-0.02em]">AED 149</h3>
                        <p className="font-inter font-normal text-[24px] leading-[36px] tracking-[-0.02em] text-[#475467]">Access to all permanent exhibitions and public spaces</p>

                    </div>
                    <button className="py-[24px] px-[30px] bg-[#F8A900] gap-[10px] rounded-[800px] font-inter font-semibold text-[20px] leading-[100%] tracking-[0px] text-black flex items-center justify-center gap-[8px]">
                        <Image src={"/icons/ticket.svg"} width={24} height={24} className="w-[24px] h-[24px]" alt="" />Select Ticket
                    </button>
                </div>

                <div className="shadow-[0px_4px_40px_0px_#7F7F7F40] flex flex-col items-center justify-center p-[48px] gap-[32px] border-t-[4px] border-[#0D7FF2] rounded-[24px] text-center">
                    <div className="items-center justify-center rounded-[24px] gap-[10px] flex w-[100px] h-[100px] shadow-[0px_4px_40px_0px_#7F7F7F40]">
                        <Image src={"/icons/star.svg"} width={56} height={56} className="w-[56px] h-[56px]" alt="" />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-[20px]">
                        <h2 className="font-inter font-medium text-[32px] leading-[100%] tracking-[-0.02em]">Standard Admission</h2>
                        <h3 className="text-[#0D7FF2] font-inter font-medium text-[56px] leading-[100%] tracking-[-0.02em]">AED 149</h3>
                        <p className="font-inter font-normal text-[24px] leading-[36px] tracking-[-0.02em] text-[#475467]">Access to all permanent exhibitions and public spaces</p>

                    </div>
                    <button className="py-[24px] px-[30px] bg-[#F8A900] gap-[10px] rounded-[800px] font-inter font-semibold text-[20px] leading-[100%] tracking-[0px] text-black flex items-center justify-center gap-[8px]">
                        <Image src={"/icons/ticket.svg"} width={24} height={24} className="w-[24px] h-[24px]" alt="" />Select Ticket
                    </button>
                </div>
            </div>
        </section>
    )
}