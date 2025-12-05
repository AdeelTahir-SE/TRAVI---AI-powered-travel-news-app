import Image from "next/image"
import Link from "next/link"
export default function RelatedArticlesSection() {
    return (
        <section className="flex flex-col items-center justify-center px-[20px] py-[60px] lg:py-[100px] lg:px-[140px] gap-[18px] lg:gap-[50px]">
            <div className="flex flex-col items-center justify-center">
                <h2 className="flex items-center justify-center gap-[12px]"><span className="heading-2">Related</span><span className="stylish-yellow-text">Articles</span></h2>
                <p
                    className="text-center font-inter font-normal text-[15px] lg:text-[20px] leading-[24px] lg:leading-[32px] tracking-[-0.02em] text-[#1B1B1B]"
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt, nisl id pulvinar tincidunt, mi nunc fringilla augue, ut faucibus risus augue ac magna.</p>

            </div>


            <div className="flex flex-row items-center justify-center flex-wrap gap-[20px] lg:gap-[30px]">
                <RelatedArticleCard />
                <RelatedArticleCard />
                <RelatedArticleCard />

            </div>

        </section>
    )
}


function RelatedArticleCard() {
    return (
        <div className="flex flex-col items-center justify-center shadow-[9px_9px_75px_0px_#00000029] w-[388px] min-h-[537px] gap-[28px] rounded-[25px]">
            <div className="flex flex-col items-center justify-center p-[8px] w-full  overflow-hidden">
                <Image src={"/images/related-article.png"} width={1200} height={600} alt="" className=" w-[371px] h-[295px] overflow-hidden object-cover rounded-[25px]" />
            </div>

            <div className="flex flex-col items-start justify-center px-[24px] pb-[22px] gap-[18px]">
                <h2 className="font-manrope font-extrabold text-[26px] leading-[30px] tracking-[-0.04em] text-[#112259]">Dubai 2025 : The Future of Urban Luxury</h2>
                <p className="font-inter font-normal text-[18px] leading-[27px] tracking-[-0.02em] text-[#000000]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt, nisl id pulvinar tincidunt, mi nunc fringilla augue, ut faucibus risus augue ac magna.</p>
                <Link href="/" className="flex flex-row items-center justify-center text-[#F8A900] gap-[8px] font-inter font-semibold text-[20px] leading-[30px] tracking-[-0.02em]">Read More <Image src={"/icons/read-more.svg"} width={27} height={27} alt="" className="w-[27px] h-[27px]" /></Link>
            </div>

        </div>
    )
}