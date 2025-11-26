"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [isActive, setIsActive] = useState({
    quickLinks: false,
    moreLinks: false,
  });
  return (
    <section className="flex flex-col items-center justify-center relative">
      <section className="absolute w-full top-0   min-h-[760px] ">
        <Image
          src="/background-images/explore-dubai-background-effect.png"
          width={1200}
          height={600}
          className="absolute w-full min-h-[760px] h-full z-0"
          alt=""
        />

        {/* gradient overlay above image */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,1)_100%)]"></div>
      </section>
      <div className="flex flex-col items-center justify-center  gap-[30px] py-8 lg:flex-row ">
        <div className="flex flex-col items-start justify-center z-20 px-8">
          <h2 className="heading-2">Subscribe to our</h2>
          <h2 className="stylish-yellow-text relative bottom-4">Newsletter</h2>
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
            className="bg-white rounded-[34.72px] min-w-[400px] min-h-[53.7px] pl-4"
          />
          <button className="absolute insets-0   right-2 w-[31px] h-[31px]  flex flex-row items-center justify-center rounded-full bg-[#FFD116]">
            <Image
              src="/icons/email-submit.svg"
              alt=""
              width={31}
              height={31}
              className="w-[13px] h-[13px] "
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-center *:border-t-1 w-full px-8 z-50 *:w-full ">
        <div className="flex flex-col items-center justify-center z-50 pb-7 ">
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
  md:text-[20px] md:leading-[28px] md:tracking-[0em]   /* large screens */
  text-black"
          >
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
        </div>
        <div className="flex flex-row items-start justify-between py-[30px] ">
          <div className="flex flex-col items-center justify center gap-[30px]">
            <h3 className="footer-section-heading">Quick Links</h3>
            {isActive?.quickLinks && (
              <ul className="flex flex-col items-start justify-center list-style-none gap-[32px]">
                <li
                  className="font-inter font-normal text-[20px] leading-[14px] tracking-[-0.02em] 
          md:text-[24px] md:leading-[100%]"
                >
                  About
                </li>
                <li
                  className="font-inter font-normal text-[20px] leading-[14px] tracking-[-0.02em] 
          md:text-[24px] md:leading-[100%]"
                >
                  Program
                </li>
                <li
                  className="font-inter font-normal text-[20px] leading-[14px] tracking-[-0.02em] 
          md:text-[24px] md:leading-[100%]"
                >
                  Speakers
                </li>
                <li
                  className="font-inter font-normal text-[20px] leading-[14px] tracking-[-0.02em] 
          md:text-[24px] md:leading-[100%]"
                >
                  Venue & Travel
                </li>
                <li
                  className="font-inter font-normal text-[20px] leading-[14px] tracking-[-0.02em] 
          md:text-[24px] md:leading-[100%]"
                >
                  Resources
                </li>
              </ul>
            )}
          </div>
          <button
            className="bg-[#F8A900] border-[1.57px] border-white rounded-full min-w-[30px] min-h-[30px] flex items-center justify-center"
            onClick={() =>
              setIsActive((prev) => ({ ...prev, quickLinks: !prev.quickLinks }))
            }
          >
            <Image
              src={
                isActive?.quickLinks ? "/icons/minus.svg" : "/icons/plus.svg"
              }
              width={12}
              height={12}
              className="min-w-[12px] h-auto"
              alt=""
            />
          </button>
        </div>
        <div className="flex flex-row items-start justify-between py-[30px]">
          <div className="flex flex-col items-center justify center gap-[30px]">
            <h3 className="footer-section-heading">More Links</h3>
            {isActive?.moreLinks && (
              <ul className="flex flex-col items-start justify-center list-style-none gap-[32px]">
                <li
                  className="font-inter font-normal text-[20px] leading-[14px] tracking-[-0.02em] 
          md:text-[24px] md:leading-[100%]"
                >
                  About
                </li>
                <li
                  className="font-inter font-normal text-[20px] leading-[14px] tracking-[-0.02em] 
          md:text-[24px] md:leading-[100%]"
                >
                  Program
                </li>
                <li
                  className="font-inter font-normal text-[20px] leading-[14px] tracking-[-0.02em] 
          md:text-[24px] md:leading-[100%]"
                >
                  Speakers
                </li>
                <li
                  className="font-inter font-normal text-[20px] leading-[14px] tracking-[-0.02em] 
          md:text-[24px] md:leading-[100%]"
                >
                  Venue & Travel
                </li>
                <li
                  className="font-inter font-normal text-[20px] leading-[14px] tracking-[-0.02em] 
          md:text-[24px] md:leading-[100%]"
                >
                  Resources
                </li>
              </ul>
            )}
          </div>
          <button
            className="bg-[#F8A900] border-[1.57px] border-white rounded-full min-w-[30px] min-h-[30px] flex items-center justify-center"
            onClick={() =>
              setIsActive((prev) => ({ ...prev, moreLinks: !prev.moreLinks }))
            }
          >
            <Image
              src={isActive?.moreLinks ? "/icons/minus.svg" : "/icons/plus.svg"}
              width={12}
              height={12}
              className="min-w-[12px] h-auto"
              alt=""
            />
          </button>
        </div>
        <div className="flex flex-col items-start justify-center py-[30px] gap-[26px] border-b-[1px]">
          <h3 className="footer-section-heading">Follow Us</h3>
          <div className="flex flex-row items-center justify-start gap-[16px]">
            <Link
              href="/"
              className="max-w-[48px] max-h-[48px] border-[1px] rounded-full flex items-center justify-center p-3"
            >
              <Image
                src="/icons/facebook.svg"
                className="filter invert"
                alt=""
                width={30}
                height={30}
              />
            </Link>
            <Link
              href="/"
              className="max-w-[48px] max-h-[48px] border-[1px] rounded-full flex items-center justify-center p-3"
            >
              <Image
                src="/icons/instagram.svg"
                className="filter invert"
                alt=""
                width={30}
                height={30}
              />
            </Link>
            <Link
              href="/"
              className="max-w-[48px] max-h-[48px] border-[1px] rounded-full flex items-center justify-center p-3"
            >
              <Image
                src="/icons/youtube.svg"
                className="filter invert"
                alt=""
                width={30}
                height={30}
              />
            </Link>
            <Link
              href="/"
              className="max-w-[48px] max-h-[48px] border-[1px] rounded-full flex items-center justify-center p-3"
            >
              <Image
                src="/icons/twitter.svg"
                className="filter invert"
                alt=""
                width={30}
                height={30}
              />
            </Link>
            <Link
              href="/"
              className="max-w-[48px] max-h-[48px] border-[1px] rounded-full flex items-center justify-center p-3"
            >
              <Image
                src="/icons/linkedin.svg"
                className="filter invert"
                alt=""
                width={30}
                height={30}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-black z-20 gap-[20px] py-12">
        <p>Copyright © 2025 Travi - All Rights Reserved.</p>
        <p>Privacy Policy | Terms of Service</p>
      </div>
    </section>
  );
}
