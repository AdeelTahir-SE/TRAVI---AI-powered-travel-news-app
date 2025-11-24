import Image from "next/image";
export default function Foooter() {
  return (
    <section className="flex flex-col items-center justify-center relative">
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
      <div className="flex flex-col items-center justify-center  gap-[30px] px-8">
        <div className="flex flex-col items-center justify-center gap-2 z-50">
          <h2 className="heading-2">Subscribe to our</h2>
          <h2 className="stylish-yellow-text">Newsletter</h2>
          <p
            className="
            font-inter font-normal
  text-[16px] leading-[23px] tracking-[-0.02em]    /* mobile */
  md:text-[22px] md:leading-[35px] md:tracking-[-0.02em]   /* large screens */
          "
          >
            Donec ut est id massa tristique dignissim. Sed dictum blandit eros
            non cursus. Nam accumsan nisl lectus, euismod placerat dui
            pellentesque maximus.{" "}
          </p>
        </div>
        <div className="flex flex-row items-center justify-center relative">
          <input
            type="text"
            placeholder="Enter your email here"
            className="bg-white rounded-[34.72px] min-w-[400px] min-h-[53.7px]"
          />
          <button className="absolute insets-0   right-2 w-[31px] h-[31px] flex flex-row items-center justify-center rounded-full bg-[#FFD116]">
            <Image
              src="/icons/email-submit.svg"
              alt=""
              width={31}
              height={31}
              className="w-[13px] h-[13px] rotate-45"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center *:border-t-1 w-full px-8 z-50 *:w-full ">
        <div className="flex flex-col items-center justify-center z-50 ">
          <Image
            src="/logos/footer-cartoon.png"
            alt=""
            width={160}
            height={200}
            className="w-[160px] h-[200px] "
          />

          <p
            className=" font-inter font-normal text-center
  text-[16px] leading-[23.2px] tracking-[0em]   /* mobile */
  md:text-[20px] md:leading-[28px] md:tracking-[0em]   /* large screens */"
          >
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
        </div>
        <div className="flex flex-row items-center justify-center ">
          <h3 className="footer-section-heading">Quick Links</h3>
          <button></button>
        </div>
        <div className="flex flex-row items-center justify-center">
          <h3 className="footer-section-heading">More Links</h3>
          <button></button>
        </div>
        <div className="flex flex-row items-center justify-center">
          <h3 className="footer-section-heading">Follow Us</h3>
          <button></button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-black z-20 gap-[20px]">
        <p>Copyright © 2025 Travi - All Rights Reserved.</p>
        <p>Privacy Policy | Terms of Service</p>
      </div>
    </section>
  );
}
