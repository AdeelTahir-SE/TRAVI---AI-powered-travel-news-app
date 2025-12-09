import Link from "next/link";
import Image from "next/image";


export default function AboutHotelSection({ aboutHotel, images }: { aboutHotel?: string, images: string[] }) {
  return (
    <section className="w-full relative ">
      <div className="relative flex flex-col items-center justify-center py-[60px] px-[20px] lg:px-[140px] lg:py-[120px] gap-[60px] lg:gap-[100px] relative z-10">
        <div className="flex flex-col items-start justify-center lg:justify-between lg:flex-row w-full gap-[12px] z-10 ">
          <section className="gap-[12px] flex flex-col w-full">
            <h2 className="stylish-yellow-text">About</h2>
            <h3 className="heading-2 text-black">Hotel Overview</h3>
          </section>
          <section className="flex flex-col items-start justify-center gap-[12px] font-inter text-normal text-[20px] lg:text-[24px] leading-[28px] lg:leading-[36px] tracking-[-0.02em] text-[#475467] lg:max-w-[400px] 2xl:max-w-[700px]">
            <p>
              {aboutHotel?.slice(0, 165)}
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
          {images?.[0] && <div className="relative flex flex-col items-center justify-center lg:h-[500px] w-auto">
            <Image
              src={images?.[0]}
              width={400}
              height={500}
              className="object-cover rounded-[30px] lg:h-[500px] lg:w-[720px] w-auto "
              alt=""
            />
            <span className="absolute inset-0 left-[30px] top-[30px] z-10 py-[12px] px-[24px] bg-white w-fit h-fit rounded-[600px] gap-[10px] font-inter font-semibold  text-[20px] leading-[30px] tracking-[-0.02em]">
              Private Beach
            </span>
          </div>}
          {images?.[1] && <div className="relative flex flex-col items-center justify-center lg:h-[500px] w-auto">
            <Image
              src={images?.[1]}
              width={400}
              height={500}
              className="object-cover rounded-[30px] lg:h-[500px] lg:w-[428px] w-auto"
              alt=""
            />
            <span className="absolute inset-0 left-[30px] top-[30px] z-10 py-[12px] px-[24px] bg-white w-fit h-fit rounded-[600px] gap-[10px] font-inter font-semibold  text-[20px] leading-[30px] tracking-[-0.02em]">
              Private Beach
            </span>
          </div>}
          <div className="relative *:h-full flex flex-row lg:flex-col 2xl:flex-nowrap flex-wrap items-center justify-center gap-[32px] lg:h-[500px] w-auto z-10">
            {images?.[2] && <Image
              src={images?.[2]}
              width={400}
              height={500}
              className="object-cover rounded-[30px] lg:min-h-[234px] "
              alt=""
            />
            }
            {images?.[3] && <Image
              src={images?.[3]}
              width={400}
              height={500}
              className="object-cover rounded-[30px] h-full lg:min-:h-[234px]"
              alt=""
            />}
          </div>
        </div>

      </div>

      <div className="hidden lg:block absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/background-images/explore-dubai-background-effect.png"
            alt=""
            fill
            className="object-cover"
          />

          {/* Gradient Overlay */}
          <div
            className="
        absolute inset-0 z-10
        pointer-events-none 
        bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_20%,rgba(255,255,255,0)_80%,rgba(255,255,255,1)_100%)]
      "
          ></div>
        </div>
      </div>

    </section>
  );
}
