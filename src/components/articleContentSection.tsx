

import Image from "next/image"
import CommentContainer from "./commentContainer"
import QuoteWithoutImage from "./quoteWithoutImage"
import { Article } from "@/utils/types"
export default function ArticleContentSection({ article }: { article: Article }) {
    return (
        <section className="flex flex-col items-start justify-center w-full py-[60px] px-[20px] lg:py-[100px] lg:px-[140px]  gap-[20px] lg:gap-[28px]">
            <div className="flex flex-col items-start justify-center gap-[20px] lg:gap-[28px]">
                <span className="text-black flex items-center justify-center bg-[#F8A900] rounded-[50px] py-[14px] px-[30px] font-inter font-normal text-[20px] leading-[32px] tracking-[-0.02em] gap-[8px]"><Image src={"/icons/article-calender.svg"} className="w-[20px] h-[20px]" alt="" width={20} height={20} />{article.published_date}</span>
                <h1 className="font-manrope text-[50px] font-extrabold leading-[55px] tracking-[-0.03em]">{article?.title}</h1>
            </div>

            <div className="flex flex-col items-start justify-center gap-[32px] font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">
                <p>{article?.paras?.[0]}</p>
                <p>{article?.paras?.[1]}</p>
                <div className="flex flex-col gap-[27px] lg:flex-row items-center justify-center">
                    <div className="flex flex-col items-start justify-center gap-[32px]">
                        <p>{article?.paras?.[2]}</p>
                        <p>{article?.paras?.[3]}</p>
                        <p>{article?.paras?.[4]}</p>
                    </div>
                    <div className="w-full flex flex-row items-center justify-center max-w-screen">
                        <CommentContainer author={article?.quotation1?.person_name} author_image={article?.quotation1?.person_image} author_role={article?.quotation1?.person_role} quote={article?.quotation1?.quote} />
                    </div>


                </div>
            </div>



            {/* SubSection 1 */}

            <div className="relative flex flex-col items-start justify-center">
                <h2 className="font-manrope text-[30px] font-extrabold leading-[55px] tracking-[-0.03em] text-[#2384C8]">{article?.subsections?.[0]?.heading}</h2>
                <p className="font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">{article?.subsections?.[0]?.paras?.[0]}</p>
            </div>
            <div className="overflow-hidden rounded-[20px] h-[210px] max-h-[210px] sm:max-h-[647px] sm:h-[400px] lg:h-[647px] relative flex flex-col items-center justify-center min-w-full rounded-[20px]">
                <Image src={article?.images?.[1]} width={700} height={835} className="h-auto object-cover  min-w-full h-[210px] sm:h-[400px] max-h-[210px] lg:h-[647px] sm:max-h-[647px] rounded-[20px]" alt="" />
                <div className="z-10 absolute flex flex-row items-center justify-center overflow-hidden gap-[30px] bottom-[-250px] 2xl:bottom-[-230px] min-w-full overflow-hidden *:relative " >
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="min-w-[800px] lg:min-w-[1200px] w-[1200px] h-[400px] left-[200px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="min-w-[800px] lg:min-w-[1200px] w-[1200px] h-[400px] left-[400px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="min-w-[800px] lg:min-w-[1200px] w-[1200px] h-[400px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="min-w-[800px] lg:min-w-[1200px] w-[1200px] h-[400px] right-[400px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="min-w-[800px] lg:min-w-[1200px] w-[1200px] h-[400px] right-[800px]" alt="" />

                </div>
                <div className="absolute z-0 bottom-0 w-full h-[20px] md:h-[50px] lg:h-[100px] 2xl:h-[200px] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_40%,rgba(255,255,255,1)_90.94%,rgba(255,255,255,0.9)_100%)] ">

                </div>
            </div>


            <p className="font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">
                {article?.subsections?.[0]?.paras?.[1]}
            </p>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-[37px] lg:gap-[70px] w-full">
                <div className="w-fit">
                    <QuoteWithoutImage />
                </div >
                <div className="flex flex-col items-start justify-center gap-[20px]  font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">
                    <p>{article?.subsections?.[0]?.paras?.[2]}</p>
                    <p>{article?.subsections?.[0]?.paras?.[3]}</p>
                    <p>{article?.subsections?.[0]?.paras?.[4]}</p>
                </div>
            </div>





            {/* subsection2 */}
            <div className="relative flex flex-col items-start justify-center">
                <h2 className="font-manrope text-[30px] font-extrabold leading-[55px] tracking-[-0.03em] text-[#2384C8]">{article?.subsections?.[1]?.heading}</h2>
                <p className="font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">{article?.subsections?.[1]?.paras?.[0]}</p>
            </div>
            <div className="overflow-hidden rounded-[20px] h-[210px] max-h-[210px] sm:max-h-[647px] sm:h-[400px] lg:h-[647px] relative flex flex-col items-center justify-center min-w-full rounded-[20px]">
                <Image src={article?.images?.[2]} width={700} height={835} className="h-auto object-cover  min-w-full h-[210px] sm:h-[400px] max-h-[210px] lg:h-[647px] sm:max-h-[647px] rounded-[20px]" alt="" />
                <div className="z-10 absolute flex flex-row items-center justify-center overflow-hidden gap-[30px] bottom-[-250px] 2xl:bottom-[-230px] min-w-full overflow-hidden *:relative " >
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="min-w-[800px] lg:min-w-[1200px] w-[1200px] h-[400px] left-[200px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="min-w-[800px] lg:min-w-[1200px] w-[1200px] h-[400px] left-[400px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="min-w-[800px] lg:min-w-[1200px] w-[1200px] h-[400px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="min-w-[800px] lg:min-w-[1200px] w-[1200px] h-[400px] right-[400px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="min-w-[800px] lg:min-w-[1200px] w-[1200px] h-[400px] right-[800px]" alt="" />

                </div>
                <div className="absolute z-0 bottom-0 w-full h-[20px] md:h-[50px] lg:h-[100px] 2xl:h-[200px] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.5)_40%,rgba(255,255,255,1)_90.94%,rgba(255,255,255,0.9)_100%)] ">

                </div>
            </div>


            <p className="font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt, nisl id pulvinar tincidunt, mi nunc fringilla augue, ut faucibus risus augue ac magna. Phasellus non convallis elit, ac tempus odio. Vivamus a interdum dolor. Donec tincidunt accumsan leo ac lacinia. </p>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-[37px] lg:gap-[60px] ">
                <div className="felx flex-col items-start justify-center gap-[20px] w-full font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">
                    <p>{article?.subsections?.[1]?.paras?.[1]}</p>
                    <p>{article?.subsections?.[1]?.paras?.[2]}</p>
                </div>
                <div className="border-[#F8A900] rounded-[20px] border-[2px] py-[24px] px-[10px] gap-[10px] flex lg:flex-row flex-col items-start  bg-[#FEF6E5] justify-center w-full h-full">
                    <div className="">
                        <Image src={"/icons/article-star.svg"} width={60} height={60} className="min-w-[60px] min-h-[60px]" alt="" />
                    </div>
                    <div className="py-[26px] px-[12px] text-[#112259]">
                        <p className="font-inter font-bold font-italic text-[27px] leading-[34px] tracking-[-0.02em] ">{article?.subsections?.[1]?.paras?.[3]}</p>
                    </div>

                </div>
            </div>
            <p className="font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">{article?.subsections?.[1]?.paras?.[4]}</p>
        </section>
    )
}