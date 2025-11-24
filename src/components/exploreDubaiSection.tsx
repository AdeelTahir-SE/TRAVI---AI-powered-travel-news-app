import Image from "next/image";
export default function ExploreDubaiSection() {
  return (
    <section className="flex flex-col items-center w-full justify-center bg-white">
      <div className="flex flex-col items-start mb-[30px] justify-center w-full pl-8">
        <h2 className="heading-2">Ready to </h2>
        <h2 className="stylish-yellow-text">Explore Dubai</h2>
      </div>
      <section className="flex flex-col items-start w-full relative justify-center">
        <Image
          src="background-images/explore-dubai.svg"
          width={420}
          height={320}
          className="rounded-tr-[18px] rounded-0 object-cover ml-0 pl-0 w-[420px] z-10   h-[320px]"
          alt=""
        />
        <section className="absolute inset-0 w-full overflow-x-hidden min-h-[200px] z-20 pointer-events-none">
          <div className="absolute inset-0 flex flex-row items-center bottom-4 justify-start gap-[5px]">
            <Image
              src={"/clouds/cloud.svg"}
              width={400}
              height={200}
              className="absolute left-[-38px] bottom-8 w-[400px] h-[200px]"
              alt=""
            />
            <Image
              src={"/clouds/cloud.svg"}
              width={400}
              height={200}
              className="absolute left-[-38px] bottom-8 w-[400px] h-[200px]"
              alt=""
            />
            <Image
              src={"/clouds/cloud.svg"}
              width={400}
              height={200}
              className="absolute left-[-38px] bottom-8 w-[400px] h-[200px]"
              alt=""
            />

            <Image
              src={"/clouds/cloud.svg"}
              width={400}
              height={200}
              className="absolute left-[-16px] bottom-8 w-[400px] h-[200px]"
              alt=""
            />

            <Image
              src={"/clouds/cloud.svg"}
              width={400}
              height={200}
              className="absolute left-40 bottom-8 w-[400px] h-[200px]"
              alt=""
            />

            <Image
              src={"/clouds/cloud.svg"}
              width={400}
              height={200}
              className="absolute left-[450px] bottom-8 w-[400px] h-[200px]"
              alt=""
            />
            <Image
              src={"/clouds/cloud.svg"}
              width={400}
              height={200}
              className="absolute left-[5px] bottom-8 w-[400px] h-[200px]"
              alt=""
            />
            <Image
              src={"/clouds/cloud.svg"}
              width={400}
              height={200}
              className="absolute left-[450px] bottom-8 w-[400px] h-[200px]"
              alt=""
            />
          </div>
        </section>

        <section className="relative  w-full  flex flex-row items-center justify-start overflow-hidden gap-[11px]  ">
          <div className="relative z-30 flex flex-row mt-[18px] items-center justify-start pl-8 overflow-hidden gap-[11px]">
            <Image
              src={"/background-images/explore-dubai.svg"}
              className="min-w-[158px] min-h-[123px] rounded-[10.72px]"
              width={158}
              height={123}
              alt=""
            />
            <Image
              src={"/background-images/explore-dubai.svg"}
              className="min-w-[158px] min-h-[123px] rounded-[10.72px]"
              width={158}
              height={123}
              alt=""
            />
            <Image
              src={"/background-images/explore-dubai.svg"}
              className="min-w-[158px] min-h-[123px] rounded-[10.72px]"
              width={158}
              height={123}
              alt=""
            />
          </div>

          <div className="absolute flex flex-col gap-[10px] items-center justify-center left-[350px] z-30">
            <button className=" w-[30px] h-[30px] bg-[#F8A900] border-[1.57px] border-white rounded-full flex flex-row items-center justify-center">
              <Image
                src={"/icons/right.svg"}
                width={9.78}
                height={5.35}
                alt=""
                className="w-fit h-fit"
              />
            </button>
            <button className=" rotate-180  flex flex-row items-center justify-center w-[30px] h-[30px] bg-[#F8A900] border-[1.57px] border-white rounded-full">
              <Image
                src={"/icons/right.svg"}
                width={29.57}
                height={29.57}
                alt=""
                className="w-fit h-fit"
              />
            </button>
          </div>
        </section>
        <section className="absolute w-full top-12 min-h-[760px]">
          <Image
            src="/background-images/explore-dubai-background-effect.png"
            width={1200}
            height={600}
            className="absolute w-full min-h-[760px] h-full z-0"
            alt=""
          />

          {/* gradient overlay above image */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_45%,_rgba(255,255,255,0)_50%,_rgba(255,255,255,1)_100%)]"></div>
        </section>
      </section>

      <section className="flex flex-col items-start justify-center pl-8 pt-7 relative z-40 font-inter font-normal text-[14px] text-[#0066CA] sm:text-[22px] leading-[35px] tracking-[-0.02em]">
        <h4 className="font-inter font-normal text-[22px] leading-[35px] tracking-[-0.02em]">
          Date : 24.10.2025{" "}
        </h4>
        <h3 className="text-[#112259] font-inter font-semibold text-[28px] md:text-[45px] leading-[100%] tracking-[-0.02em]">
          Integer imperdiet magna gravida mauris posuere
        </h3>
        <p className="text-black py-[30px] font-inter font-normal text-[16px] md:text-[22px] leading-[25px] md:leading-[35px] tracking-[-0.02em]">
          Donec ut est id massa tristique dignissim. Sed dictum blandit eros non
          cursus. Nam accumsan nisl lectus, euismod placerat dui pellentesque
          maximus. Integer urna libero, tincidunt id eros non, cursus placerat
          magna. Morbi bibendum efficitur metus. Mauris porta feugiat ligula eu
          scelerisque. Etiam eu viverra metus. Etiam vestibulum elit imperdiet
          tempor aliquam. Proin pretium non nulla eu aliquet...
        </p>
        <button className="flex flex-row items-center justify-center rounded-[39px] bg-[#F8A900] text-black px-[25px] py-[15px] font-inter font-semibold text-[16px] sm:text-[20px] leading-[23.28px] tracking-[-0.02em]">
          View Details
        </button>
      </section>
    </section>
  );
}
