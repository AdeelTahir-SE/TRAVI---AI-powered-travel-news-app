import Image from "next/image";
import Link from "next/link";

export default function TrendingSection() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full gap-[35px] lg:gap-[95px] pt-[90px] ">
      {/* Background image */}
      <Image
        src="/background-images/explore-dubai-background-effect.png"
        alt=""
        width={1200} // can adjust
        height={600}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Optional gradient overlay */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,_rgba(255,255,255,1)_0%,_rgba(255,255,255,0.4)_20%,_rgba(255,255,255,1)_30%,_rgba(255,255,255,1)_100%)]" />

      {/* Foreground content */}
      <h2
        className="font-manrope font-bold uppercase text-center text-[50px]
     sm:text-[80px] md:text-[310px] 
     leading-[80px] md:leading-[320px] 
     tracking-[0em] 
     bg-[linear-gradient(180deg,_rgba(0,0,0,0.09)_0%,_rgba(0,0,0,0.008)_100%)] 
     bg-clip-text text-transparent z-20 relative max-w-screen "
      >
        Trending
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center relative z-20 gap-[20px]">
        <div className="flex flex-col md:items-start items-center justify-center text-center md:text-left">
          <h2 className="heading-2">Trending</h2>
          <h1 className="stylish-yellow-text">in Dubai</h1>
          <p
            className="font-manrope font-normal text-center tracking-[0em] 
       text-[16px] leading-[26px] 
       md:text-[23px] md:leading-[34px] px-15"
          >
            Nam in dui at est convallis scelerisque vel vitae tellus. Curabitur
            volutpat dui ut volutpat varius. Ut sapien nibh, sagittis vel
            sagittis nec, tempus ut arcu.
          </p>
        </div>

        <div className="flex justify-center md:justify-end lg:justify-end">
          <Image
            src="/images/trending-restaurant.png"
            className="rounded-[30px] w-[400px] h-[412px] object-cover"
            alt=""
            width={400}
            height={412}
          />
        </div>
        <div className="flex justify-center md:justify-end lg:justify-end">
          <Image
            src="/images/trending-jewelery.png"
            className="rounded-[30px] w-[400px] h-[478px] object-cover"
            alt=""
            width={400}
            height={478}
          />
        </div>
        <div className="flex justify-center md:justify-end lg:justify-end">
          <Image
            src="/images/trending-dirtbike.png"
            className="rounded-[30px] w-[400px] h-[391px] object-cover"
            alt=""
            width={400}
            height={391}
          />
        </div>
        <div className="flex justify-center md:justify-end lg:justify-end">
          <Image
            src="/images/trending-tower.png"
            className="rounded-[30px] w-[400px] h-[594px] object-cover"
            alt=""
            width={400}
            height={594}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-[20px]">
          <p
            className="font-manrope font-normal text-center tracking-[0em] 
       text-[16px] leading-[26px] 
       md:text-[23px] md:leading-[34px] px-15"
          >
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout...
          </p>
          <Link
            href="/"
            className="yellow-button flex flex-col items-center justify-center"
          >
            View all Trends
          </Link>
        </div>
      </div>
    </section>
  );
}
