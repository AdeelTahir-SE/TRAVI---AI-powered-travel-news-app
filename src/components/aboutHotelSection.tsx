import Link from "next/link";
import Image from "next/image";


export default function AboutHotelSection() {
  return (
    <section className="relative flex flex-col items-center justify-center py-[60px] px-[20px] lg:px-[140px] lg:py-[120px] gap-[60px] lg:gap-[100px]">
      <div className="flex flex-col items-start justify-center lg:justify-between lg:flex-row gap-[12px] z-10 ">
        <section className="gap-[12px] flex flex-col w-full">
          <h2 className="stylish-yellow-text">About</h2>
          <h3 className="heading-2 text-black">Hotel This Area</h3>
        </section>
        <section className="flex flex-col items-start justify-center gap-[12px] font-inter text-normal text-[20px] lg:text-[24px] leading-[28px] lg:leading-[36px] tracking-[-0.02em] text-[#475467]">
          <p>
            Atlantis The Palm is one of Dubai&apos;s most iconic resorts,
            offering luxury rooms, breathtaking ocean views, and direct access
            to the world-famous Aquaventure Waterpark.
          </p>

          <Link
            href="/"
            className="text-[#0066CA] font-inter font-semibold text-[24px] leading-[32px] tracking-[0.02em]"
          >
            Read More
          </Link>
        </section>
      </div>

      <div className="flex flex-row items-center flex-wrap justify-center gap-[24px] lg:gap-[32px] min-w-full z-10 *:z-10">
        <div className="relative flex flex-col items-center justify-center lg:h-[500px] w-auto">
          <Image
            src={"/images/atlantis1.jpg"}
            width={400}
            height={500}
            className="object-cover rounded-[30px] lg:h-[500px] lg:w-[720px] w-auto "
            alt=""
          />
          <span className="absolute inset-0 left-[30px] top-[30px] z-10 py-[12px] px-[24px] bg-white w-fit h-fit rounded-[600px] gap-[10px] font-inter font-semibold  text-[20px] leading-[30px] tracking-[-0.02em]">
            Private Beach
          </span>
        </div>
        <div className="relative flex flex-col items-center justify-center lg:h-[500px] w-auto">
          <Image
            src={"/images/atlantis2.jpg"}
            width={400}
            height={500}
            className="object-cover rounded-[30px] lg:h-[500px] lg:w-[428px] w-auto"
            alt=""
          />
          <span className="absolute inset-0 left-[30px] top-[30px] z-10 py-[12px] px-[24px] bg-white w-fit h-fit rounded-[600px] gap-[10px] font-inter font-semibold  text-[20px] leading-[30px] tracking-[-0.02em]">
            Private Beach
          </span>
        </div>
        <div className="relative flex flex-row lg:flex-col 2xl:flex-nowrap flex-wrap items-center justify-center gap-[32px] lg:h-[500px] w-auto z-10">
          <Image
            src={"/images/atlantis3.jpg"}
            width={400}
            height={500}
            className="object-cover rounded-[30px] lg:min-h-[234px] "
            alt=""
          />
          <Image
            src={"/images/atlantis4.jpg"}
            width={400}
            height={500}
            className="object-cover rounded-[30px] h-full lg:min-:h-[234px]"
            alt=""
          />
        </div>
      </div>

        <div className="hidden lg:block absolute inset-0 z-0 ">
                <Image
                  src={"/background-images/explore-dubai-background-effect.png"}
                  alt=""
                  fill
                  className="object-cover"
                />
     
                <div
                  className="absolute inset-0 pointer-events-none z-0  bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0.7)_20%,rgba(255,255,255,0.1)_80%,rgba(255,255,255,1)_100%)]  bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0)_45%,rgba(255,255,255,0.7)_100%)]
     "
                ></div>
              </div>
    </section>
  );
}
