import Image from "next/image"
export default function CommentContainer({ author, author_image, quote, author_role }: { author?: string, author_image?: string, author_role?: string, quote?: string }) {
    return (
        <section className="relative flex felx-row items-center justify-center max-w-screen w-[330px] sm:w-[381px] h-[365px]">
            <Image src={"/images/comment-container.svg"} className="w-full h-auto" width={381} height={365} alt="" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[47px] px-[26px] pt-[44px] pb-[38px]">
                <div className="relative ">

                    <p className="font-inter font-bold font-italic text-[20px] sm:text-[25px] leading-[30px] tracking-[-0.02em] text-[#000000] ">
                        {quote}
                    </p>
                    <Image src={"/images/quote.svg"} className="absolute bottom-[-28px] sm:bottom-[-14px] right-[48px] max-h-[32px] rotate-[180deg]" width={100} height={100} alt="" />

                </div>


                <div className="flex flex-row items-center justify-start min-w-full border-t-[1px] pt-[18px] border-[rgba(0,0,0,0.1)] gap-[20px]">
                    <Image src={author_image || "/images/comment-avatar.jpg"} className="object-cover rounded-full shadow-[0px_7px_20px_0px_#0000001A] border-[3px] border-white w-[57px] h-[57px]" width={57} height={57} alt="" />
                    <div className="flex flex-col items-start justify-center">
                        <span className="font-inter font-bold text-[23px] leading-[30px] tracking-[-0.02em] text-[#000000]">{author}</span>
                        <p className="font-inter font-normal text-[18px] leading-[30px] tracking-[-0.02em]">{author_role}</p>
                    </div>

                </div>

            </div>

            <Image src={"/images/quote.svg"} className="absolute top-[-2px] left-[12px] max-h-[32px]" width={100} height={100} alt="" />
        </section>
    )
}