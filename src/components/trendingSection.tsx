import Image from "next/image";
import Link from "next/link";

export default function TrendingSection() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full gap-[35px] lg:gap-[95px] px-[20px] lg:px-[140px] py-[60px] lg:py-[100px] ">
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
        className="font-manrope font-bold uppercase text-center w-full
     bg-[linear-gradient(180deg,_rgba(0,0,0,0.09)_0%,_rgba(0,0,0,0.008)_100%)] 
     bg-clip-text text-transparent z-20 relative"
        style={{
          fontSize: 'clamp(70px, 15vw, 310px)',
          lineHeight: 'clamp(80px, 16vw, 320px)',
          letterSpacing: '0em'
        }}
      >
        Trending
      </h2>

      <div className="relative z-20 flex flex-col lg:flex-row  items-center lg:items-start justify-center  flex-wrap  *:max-w-fit gap-[30px] *:gap-[30px]">


        <div className="flex flex-col  items-center lg:items-stretch justify-center gap-10">

          {/* TEXT SIDE */}
          <div className="flex flex-col justify-between lg:text-left text-center max-w-[400px] h-full">
            <div className="flex flex-col items-center lg:items-start lg:gap-[12px]">
              <h2 className="heading-2">Trending</h2>
              <h2 className="stylish-yellow-text">in Dubai</h2>
            </div>

            <p className="font-manrope font-normal tracking-[0em] 
       text-[16px] leading-[26px] 
       md:text-[23px] md:leading-[34px]">
              Nam in dui at est convallis scelerisque vel vitae tellus.
              Curabitur volutpat dui ut volutpat varius. Ut sapien nibh,
              sagittis vel sagittis nec, tempus ut arcu.
            </p>
          </div>

          {/* IMAGE SIDE */}
          <div className="flex justify-start">
            <Image
              src="/images/trending-jewelery.png"
              alt=""
              className="rounded-[30px] w-[500px] h-[478px] object-cover"
              width={400}
              height={412}
            />
          </div>

        </div>





        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex justify-center md:justify-end lg:justify-end">
            <Image
              src="/images/trending-restaurant.png"
              className="rounded-[30px] w-[500px] h-[412px]"
              alt=""
              width={400}
              height={478}
            />
          </div>
          <div className="flex justify-center md:justify-end lg:justify-end">
            <Image
              src="/images/trending-dirtbike.png"
              className="rounded-[30px] w-[500px] h-[391px] object-cover"
              alt=""
              width={400}
              height={391}
            />
          </div>
        </div>




        <div className="flex flex-col  items-center lg:items-stretch justify-center gap-10">

          {/* IMAGE SIDE */}
          <div className="flex justify-start">
            <Image
              src="/images/trending-tower.png"
              className="rounded-[30px] w-[500px] h-[594px] object-cover"
              alt=""
              width={400}
              height={594}
            />
          </div>

          {/* TEXT SIDE */}
          <div className="flex flex-col justify-between h-full items-center lg:items-start text-center lg:text-left gap-[20px] max-w-[450px]">

            <p className="font-manrope font-normal tracking-[0em] 
       text-[16px] leading-[26px] 
       md:text-[23px] md:leading-[34px] py-4">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout...
            </p>

            <Link
              href="/"
              className="yellow-button flex items-center justify-center"
            >
              View all Trends
            </Link>

          </div>

        </div>



      </div>
    </section>
  );
}
