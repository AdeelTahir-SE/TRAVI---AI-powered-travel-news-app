import Link from "next/link";
import Image from "next/image";
export default function AboutLocationSection(){
    return (
      <section className="flex flex-col lg:flex-row items-start justiy-center relative  w-full  py-[60px] px-[20px] lg:py-[120px] lg:px-[140px]">
        <div className="w-full *:lg:w-1/2 relative z-10 flex flex-col lg:flex-row gap-[60px] lg:gap-[100px]">
          <section className="flex flex-col items-center justify-center gap-[24px] z-10">
            <section className="gap-[12px] flex flex-col w-full">
              <h2 className="stylish-yellow-text">Overview</h2>
              <h3 className="heading-2 text-black">About This Area</h3>
            </section>
            <section className="flex flex-col items-start justify-center gap-[12px] font-inter text-normal text-[20px] lg:text-[24px] leading-[20px] lg:leading-[36px] tracking-[-0.02em] text-[#475467]">
              <p>
                Downtown Dubai is the vibrant city center and one of
                Dubai&apos;s most prestigious neighborhoods. Home to the
                world&apos;s tallest building, the Burj Khalifa, and the
                world&apos;s largest shopping mall, The Dubai Mall, this area
                offers an unparalleled urban experience.
              </p>
              <p>
                The district features luxury residential towers, five-star
                hotels, fine dining restaurants, and world-class entertainment
                venues. With the stunning Dubai Fountain at its heart, Downtown
                Dubai is a hub for tourism, shopping, and cultural experiences.
              </p>
              <Link
                href="/"
                className="text-[#0066CA] font-inter font-semibold text-[24px] leading-[32px] tracking-[0.02em]"
              >
                Read More
              </Link>
            </section>
          </section>
          <section className="z-10 relative">
            <Image
              src="/images/location-about.jpg"
              width={600}
              height={400}
              alt=""
              className="rounded-[32px] object-cover max-h-[355px] lg:max-h-[562px] lg:w-full "
            />
          </section>
        </div>
        <div className="md:flex flex-col items-center justify-center absolute inset-0 hidden overflow-hidden  z-0">
          <Image
            src="/background-images/explore-dubai-background-effect.png"
            className="w-full absolute z-0"
            width={1200}
            height={400}
            alt=""
          />
          <div
            className="
      absolute inset-0 z-0 
bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,1)_100%)]
    "
          ></div>
        </div>
      </section>
    );
}