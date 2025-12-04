import Image from "next/image"
export default function TravelerTips() {
    return (
        <section className="flex flex-col items-center justify-center gap-[80px] py-[60px] lg:py-[100px] px-[20px] lg:px-[140px] min-w-full">
            <div className="min-w-full flex flex-col items-start justify-center rounded-[24px] gap-[32px] p-[32px] lg:rounded-[60px] lg:p-[72px] lg:gap-[48px] bg-[#112259] text-white">
                <h2 className="font-manrope font-extrabold text-[40px] lg:text-[48px] leading-[100%] tracking-[0.03em]">Traveler Tips</h2>
                <div className="grid grid-cols-1 2xl:grid-cols-2 gap-[32px] lg:gap-[60px] ">



                    <div className="flex flex-col gap-6 *:*:text-white text-[#D0D5DD]">
                        <p className="font-inter font-normal text-[24px] leading-[36px] tracking-[-0.02em]">
                            • <span className="font-medium">Best time to visit:</span> October–April for pleasant weather and outdoor activities
                        </p>

                        <p className="font-inter font-normal text-[24px] leading-[36px] tracking-[-0.02em]">
                            • <span className="font-medium">Book waterpark tickets early:</span> Reserve your Aquaventure slots in advance to avoid queues
                        </p>

                        <p className="font-inter font-normal text-[24px] leading-[36px] tracking-[-0.02em]">
                            • <span className="font-medium">Ask for high-floor ocean view rooms:</span> Higher floors offer the best panoramic views of the Arabian Gulf
                        </p>

                        <p className="font-inter font-normal text-[24px] leading-[36px] tracking-[-0.02em] ">
                            • <span className="font-medium">Reserve dining restaurants 48 hours prior:</span> Popular restaurants like Nobu and Ossiano book up quickly
                        </p>

                        <p className="font-inter font-normal text-[24px] leading-[36px] tracking-[-0.02em] ">
                            • <span className="font-medium">Use monorail for easy access to Palm Jumeirah:</span> The Palm Monorail connects directly to the mainland
                        </p>

                        <p className="font-inter font-normal text-[24px] leading-[36px] tracking-[-0.02em] ">
                            • <span className="font-medium">Pack swimwear and sunscreen:</span> You'll want to take full advantage of the pools and beach
                        </p>
                    </div>
                    <div className="flex flex-row items-center justify-center rounded-[32px]">
                        <Image src={"/images/traveler-tips.jpg"} width={600} height={400} className="rounded-[32px] w-full h-full" alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}