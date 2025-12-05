import Image from "next/image"
import CommentContainer from "./commentContainer"
import QuoteWithoutImage from "./quoteWithoutImage"
export default function ArticleContentSection() {
    return (
        <section className="flex flex-col items-start justify-center w-full py-[60px] px-[20px] lg:py-[100px] lg:px-[140px]  gap-[20px] lg:gap-[28px]">
            <div className="flex flex-col items-start justify-center gap-[20px] lg:gap-[28px]">
                <span className="text-black flex items-center justify-center bg-[#F8A900] rounded-[50px] py-[14px] px-[30px] font-inter font-normal text-[20px] leading-[32px] tracking-[-0.02em] gap-[8px]"><Image src={"/icons/article-calender.svg"} className="w-[20px] h-[20px]" alt="" width={20} height={20} />28.10.2025</span>
                <h1 className="font-manrope text-[50px] font-extrabold leading-[55px] tracking-[-0.03em]">Discover Dubai: Where Tradition Meets Tomorrow</h1>
            </div>

            <div className="flex flex-col items-start justify-center gap-[32px] font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt, nisl id pulvinar tincidunt, mi nunc fringilla augue, ut faucibus risus augue ac magna. Phasellus non convallis elit, ac tempus odio. Vivamus a interdum dolor. Donec tincidunt accumsan leo ac lacinia. In commodo nulla augue, sed tempus nulla euismod sed. Integer auctor et elit vel eleifend. Etiam sed mauris posuere, condimentum tortor nec, luctus odio. </p>
                <p>Proin dignissim aliquet felis, eget pulvinar risus commodo sed. Nulla malesuada turpis sed posuere dictum. Praesent auctor magna et sapien facilisis, et fermentum lectus hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus ullamcorper malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                <div className="flex flex-col gap-[27px] lg:flex-row items-center justify-center">
                    <div className="flex flex-col items-start justify-center gap-[32px]">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt, nisl id pulvinar tincidunt, mi nunc fringilla augue, ut faucibus risus augue ac magna. Phasellus non convallis elit, ac tempus odio. Vivamus a interdum dolor. Donec tincidunt accumsan leo ac lacinia. </p>
                        <p>Nullam non ipsum ac leo euismod sodales non eu lectus. Sed rhoncus purus quis tellus vestibulum, et lacinia dui varius. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam in dignissim justo. Vestibulum pharetra mollis erat, nec molestie leo vulputate quis.</p>
                        <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi condimentum, eros et sodales convallis, ante elit aliquam arcu, eu lobortis dolor urna a mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed placerat lectus eget metus tincidunt venenatis. Duis quis sapien diam. Aenean aliquam lectus et molestie pulvinar.</p>
                    </div>
                    <div className="w-full flex flex-row items-center justify-center">
                        <CommentContainer />
                    </div>


                </div>
            </div>



            {/* SubSection 1 */}

            <div className="relative flex flex-col items-start justify-center">
                <h2 className="font-manrope text-[30px] font-extrabold leading-[55px] tracking-[-0.03em] text-[#2384C8]">Beaches, Desert, and Adventure</h2>
                <p className="font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">Dubai&apos;s natural landscapes are just as spectacular as its skyscrapers. Spend a lazy afternoon at Jumeirah Beach, or head to Kite Beach for water sports and a beachfront food truck feast.</p>
            </div>
            <div className="overflow-hidden rounded-[20px] h-[210px] max-h-[210px] sm:max-h-[647px] sm:h-[400px] lg:h-[647px] relative flex flex-col items-center justify-center min-w-full rounded-[20px]">
                <Image src={"/images/attraction-cars-images.jpg"} width={700} height={835} className="h-auto object-cover  min-w-full h-[210px] sm:h-[400px] max-h-[210px] lg:h-[647px] sm:max-h-[647px] rounded-[20px]" alt="" />
                <div className="absolute flex flex-row items-center justify-center overflow-hidden gap-[30px] bottom-[-250px] overflow-hidden *:relative bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_40%,rgba(255,255,255,1)_90.94%,rgba(255,255,255,0.9)_100%)]" >
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[1200px] h-[400px] left-[200px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[1200px] h-[400px] left-[400px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[1200px] h-[400px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[1200px] h-[400px] right-[400px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[1200px] h-[400px] right-[800px]" alt="" />

                </div>
            </div>


            <p className="font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">
                For something truly unique, take a desert safari — dune bashing, camel rides, and a sunset dinner under the stars capture the magic of Arabia in one evening.
            </p>

            <div className="flex flex-row items-center justify-center gap-[37px] lg:gap-[70px] w-full">
                <div className="w-fit">
                    <QuoteWithoutImage />
                </div >
                <div className="flex flex-col items-start justify-center gap-[20px]  font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt, nisl id pulvinar tincidunt, mi nunc fringilla augue, ut faucibus risus augue ac magna. Phasellus non convallis elit, ac tempus odio. Vivamus a interdum dolor. Donec tincidunt accumsan leo ac lacinia. </p>
                    <p>Praesent tincidunt varius tortor, molestie tempus nunc mollis sit amet. Aenean tincidunt dictum eros id rhoncus. Praesent quis justo non risus ultricies efficitur. Integer sit amet facilisis ante, et feugiat erat.</p>
                    <p> Sed justo magna, finibus non enim nec, aliquet consequat arcu. Nullam a malesuada augue. In commodo nulla augue, sed tempus nulla euismod sed. Integer auctor et elit vel eleifend. Etiam sed mauris posuere, condimentum tortor nec, luctus odio. Sed vitae risus ultrices, efficitur urna id, tempor arcu. </p>
                </div>
            </div>





            {/* subsection2 */}
            <div className="relative flex flex-col items-start justify-center">
                <h2 className="font-manrope text-[30px] font-extrabold leading-[55px] tracking-[-0.03em] text-[#2384C8]">Culture and Heritage</h2>
                <p className="font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">Amid the glitz, Dubai proudly preserves its heritage. Wander through Al Fahidi Historical Neighborhood, where narrow lanes and wind towers reveal the city’s humble beginnings. Visit the Dubai Creek, hop on an abra (wooden boat), and explore the bustling Gold and Spice Souks — timeless reminders of the city’s trading past.</p>
            </div>
            <div className="overflow-hidden rounded-[20px] h-[210px] max-h-[210px] sm:max-h-[647px] sm:h-[400px] lg:h-[647px] relative flex flex-col items-center justify-center min-w-full rounded-[20px]">
                <Image src={"/images/attraction-camels.png"} width={700} height={835} className="h-auto object-cover  min-w-full h-[210px] sm:h-[400px] max-h-[210px] lg:h-[647px] sm:max-h-[647px] rounded-[20px]" alt="" />
                <div className="absolute flex flex-row items-center justify-center overflow-hidden gap-[30px] bottom-[-250px] overflow-hidden *:relative bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_40%,rgba(255,255,255,1)_90.94%,rgba(255,255,255,0.9)_100%)]" >
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[1200px] h-[400px] left-[200px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[1200px] h-[400px] left-[400px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[1200px] h-[400px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[1200px] h-[400px] right-[400px]" alt="" />
                    <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[1200px] h-[400px] right-[800px]" alt="" />

                </div>
            </div>


            <p className="font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt, nisl id pulvinar tincidunt, mi nunc fringilla augue, ut faucibus risus augue ac magna. Phasellus non convallis elit, ac tempus odio. Vivamus a interdum dolor. Donec tincidunt accumsan leo ac lacinia. </p>
            <div className="flex flex-row items-center justify-center gap-[37px] lg:gap-[60px] ">
                <div className="felx flex-col items-start justify-center gap-[20px] w-full font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">
                    <p>Mauris nulla eros, rutrum quis imperdiet ut, lacinia at arcu. Sed sit amet risus magna. Sed elementum tellus at dui hendrerit, a finibus sapien porta. Sed et nibh ultrices, dictum libero eget, hendrerit nisl. Donec et turpis varius, lacinia arcu nec, posuere libero. Suspendisse posuere, metus eu commodo aliquet, diam neque luctus ligula, eget molestie lacus dolor ut libero. Pellentesque dignissim eros vitae orci sollicitudin mattis. Vestibulum rhoncus, justo bibendum tincidunt volutpat, libero justo gravida est, convallis pharetra massa libero in diam. Pellentesque varius consectetur vulputate.</p>
                    <p>Sed quis dui non enim varius faucibus quis id augue. Suspendisse in tincidunt tortor. Integer in gravida est. Integer vel ultrices felis, quis vehicula ante.</p>
                </div>
                <div className="border-[#F8A900] rounded-[20px] border-[2px] py-[24px] px-[10px] gap-[10px] flex lg:flex-row flex-col items-start  bg-[#FEF6E5] justify-center w-full h-full">
                    <div className="">
                        <Image src={"/icons/article-star.svg"} width={60} height={60} className="min-w-[60px] min-h-[60px]" alt="" />
                    </div>
                    <div className="py-[26px] px-[12px] text-[#112259]">
                        <p className="font-inter font-bold font-italic text-[27px] leading-[34px] tracking-[-0.02em] ">Nunc feugiat, neque eget vehicula rutrum, ipsum magna condimentum tellus, sit amet eleifend nisl felis accumsan justo. Donec consectetur aliquam eros non vestibulum. Quisque imperdiet rhoncus eros, sit amet luctus ligula </p>
                    </div>

                </div>
            </div>
            <p className="font-inter font-normal text-[22px] leading-[32px] tracking-[-0.02em]">Nullam non ipsum ac leo euismod sodales non eu lectus. Sed rhoncus purus quis tellus vestibulum, et lacinia dui varius. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam in dignissim justo. Vestibulum pharetra mollis erat, nec molestie leo vulputate quis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi condimentum, eros et sodales convallis, ante elit aliquam arcu, eu lobortis dolor urna a mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed placerat lectus eget metus tincidunt venenatis. Duis quis sapien diam. Aenean aliquam lectus et molestie pulvinar.</p>
        </section>
    )
}