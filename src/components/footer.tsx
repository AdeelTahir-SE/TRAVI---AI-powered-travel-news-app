import { section } from "motion/react-client";
import Image from "next/image";
export default function Footer() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center  min-h- ">
        
      <Image
        src={"/background-images/footer.png"}
        width={1200}
        height={600}
        className="w-full h-auto min-h-[360px]  object-cover md:object-contain absolute z-0 md:min-h-[1130px]"
        alt=""
      />

      <section className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center  gap-[70px] z-50">
        <section className="flex flex-col sm:flex-row items-center justify-center gap-[28px] md:gap-[95px] borer-b-1">
          <div className="flex flex-col items-start justify-center ">
            <h2 className="heading-2">Subscribe to our </h2>
            <h2 className="stylish-yellow-text">NewsLetter</h2>
            <p className="sub-heading text-black">
              Donec ut est id massa tristique dignissim. Sed dictum blandit eros
              non cursus. Nam accumsan nisl lectus, euismod placerat dui
              pellentesque maximus.{" "}
            </p>
          </div>
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Enter Your Email here"
              className="w-full rounded-[34.72px] px-[50px] py-3 border border-gray-300"
            />

            <button className="absolute right-2 top-1/2 transform -translate-y-1/2  w-[45px] h-[45px] bg-[#FFD116] rounded-full flex items-center justify-center">
              <Image
                src="/icons/email-submit.svg"
                width={32}
                height={32}
                alt="Submit"
                className="w-[32px] h-[32px] rotate-[47.52deg]"
              />
            </button>
          </div>
        </section>
        <section></section>
      </section>
    </section>
  );
}
