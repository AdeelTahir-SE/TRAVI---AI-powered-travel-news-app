import Image from "next/image"
export default function TraviRecommends() {
    return (
        <section className="relative z-10 flex flex-col items-center justify-center px-[20px] py-[60px] lg:py-[100px] lg:px-[140px] gap-[28px] lg:gap-[40px]">
            <div className="flex flex-col items-center justify-center gap-[28px] text-center">
                <h2 className="flex flex-row items-center justify-center gap-[6px]"><span className="heading-2">Travi</span><span className="stylish-yellow-text"> Recommends</span></h2>
                <p className="font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a ipsum nec tellus venenatis venenatis a quis tortor. Aliquam erat volutpat. Donec sed mi risus.
                </p>
            </div>

            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-[25px] lg:gap-[30px]">
                <TraviRecommendsCard />
                <TraviRecommendsCard /><TraviRecommendsCard />
            </div>

        </section>
    )
}

function TraviRecommendsCard() {
    return (
        <section className="relative flex flex-row items-center justify-center relative min-h-[360px] lg:min-h-[600px]  rounded-[30px]">
            <Image src={"/images/travi-recommends.png"} width={1200} height={600} alt="" className="relative z-0 object-cover rounded-[30px]  min-h-[360px] lg:min-h-[600px] min-w-full min-h-full " />
            <div className="z-20 absolute inset-0 flex flex-col items-center justify-center text-center text-white px-[16px] lg:px-[84px] pt-[33px] lg:pt-[45px] pb-[150px] lg:pb-[370px] rounded-[30px] gap-[20px] lg:gap-[26px]">
                <h2 className="font-manrope text-[25px] md:text-[40px] font-extrabold leading-[32px] tracking-[-0.04em] ">Book Burf Khalifa Sky Tickets</h2>
                <p className="font-inter text-[15px] md:text-[22px] leading-[20px] md:leading-[32px] tracking-[-0.02em] text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a ipsum nec tellus venenatis venenatis a quis tortor. </p>
                <button className="py-[24px] px-[30px] bg-[#F8A900] text-black rounded-[800px] font-inter font-bold text-[20px] leading-[100%] tracking-0">
                    Book Tickets Now
                </button>
            </div>
            <div className="min-w-full bg-[linear-gradient(180deg,_#B2B6C2_0%,_rgba(178,182,194,0)_39.48%)] absolute top-0 lg:min-h-[700px] h-[300px] z-10 rounded-[30px]">
            </div>

        </section>
    )
}










