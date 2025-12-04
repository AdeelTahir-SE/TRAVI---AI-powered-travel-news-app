import Image from "next/image";

export default function AttractionBookStaySection() {
    return (
        <section className="z-10 relative flex items-center justify-center py-[60px] lg:py-[100px] lg:px-[70px] 2xl:px-[140px] px-[20px] min-w-full  min-h-[512px]">
            <div className="relative rounded-[32px] 2xl:rounded-[60px] z-20">
                <Image
                    src="/background-images/book-stay.jpg"
                    width={1200}
                    height={400}
                    className=" min-w-full  object-cover rounded-[32px] 2xl:rounded-[60px] max-h-[512px]  min-h-[512px] "
                    alt=""
                />
                <div className="absolute inset-0 py-[48px] px-[32px]  2xl:p-[72px]">
                    <div className="flex flex-col items-center justify-center w-full h-full gap-[48px]">
                        <div className="flex flex-col items-center justify-center text-center gap-[28px]">
                            <h2 className="font-manrope font-extrabold text-[48px] lg:text-[72px] leading-[100%] tracking-[-0.03em] text-center text-white">
                                Ready to Book Your Stay?
                            </h2>

                        </div>
                        <button className="py-[24px] px-[30px] bg-[#F8A900] text-black rounded-[800px] font-inter font-bold text-[20px] leading-[100%] tracking-0">
                            Check Rates and Book Now
                        </button>
                        <div className="flex flex-row items-center justify-center flex-wrap gap-[20px] lg:gap-[48px]">
                            <span className="flex items-center justify-cente rgap-[8px]"><Image src={"/icons/book-tick.svg"} width={30} height={30} className="w-[30px] h-[30px]" alt="" />
                                <h4 className="font-manrope font-medium text-[24px] leading-[100%] tracking-[-0.03em] text-white">Instant confirmation</h4>
                            </span>
                            <span className="flex items-center justify-cente rgap-[8px]"><Image src={"/icons/book-tick.svg"} width={30} height={30} className="w-[30px] h-[30px]" alt="" />
                                <h4 className="font-manrope font-medium text-[24px] leading-[100%] tracking-[-0.03em] text-white">Instant confirmation</h4>
                            </span>
                            <span className="flex items-center justify-cente rgap-[8px]"><Image src={"/icons/book-tick.svg"} width={30} height={30} className="w-[30px] h-[30px]" alt="" />
                                <h4 className="font-manrope font-medium text-[24px] leading-[100%] tracking-[-0.03em] text-white">Instant confirmation</h4>
                            </span>
                            <span className="flex items-center justify-cente rgap-[8px]"><Image src={"/icons/book-tick.svg"} width={30} height={30} className="w-[30px] h-[30px]" alt="" />
                                <h4 className="font-manrope font-medium text-[24px] leading-[100%] tracking-[-0.03em] text-white">Instant confirmation</h4>
                            </span>

                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}