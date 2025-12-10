"use client";
import Image from "next/image";
import { useState } from "react";
export default function FAQSection({ faqs }: { faqs?: { question: string, answer: string }[] }) {

  const [active, setActive] = useState<number>(-1);
  function handleActive(index: number) {
    setActive(index);
  }
  return (
    <>{faqs && faqs?.length > 0 && <section className="flex flex-col items-center justify-center py-[60px] px-[20px] text-center  sm:px-[100px] sm:py-[140px] sm:gap-[80px] gap-[48px] min-w-full">
      {/* heading */}
      <div className="flex flex-col items-center justify-center gap-[12px]">
        <h2 className="stylish-yellow-text">Faq&apos;s</h2>
        <h2 className="heading-2">Frequently Asked Questions</h2>
        <p
          className="sub-heading text-[#475467]"
        >
          Answers to the most common guest queries.{" "}
        </p>
      </div>

      {/* questions answers */}

      <section className="flex flex-col items-center justify-center w-full gap-[12px] border-[1px] p-[20px] rounded-[24px] border-[#EAECF0] bg-white">
        {faqs &&
          faqs?.length > 0 &&
          faqs.map((faq, index) => (
            <div
              key={index}
              className={`flex flex-row items-start justify-between w-full rounded-[16px] gap-[24px] rounded-[16px] p-[20px] sm:p-[32px] sm:gap-[160px] ${active === index ? "bg-[#F2F4F7]" : ""
                }`}
            >
              <div className="flex flex-col items-start justify-center text-start gap-[12px]">
                <h3 className="font-inter font-semibold sm:text-[32px] text-[20px] leading-[120%] -tracking-[0.03em] ">
                  {faq.question}
                </h3>
                {active === index && (
                  <p className="font-inter font-[400px] text-[16px] sm:text-[24px] leading-[22px] sm:leading-[32px]  text-start tracking-[0.02em] text-[#475467]  ">
                    {faq.answer}
                  </p>
                )}
              </div>
              {active === index ? (
                <Image
                  src="/icons/minus.svg"
                  width={24}
                  height={24}
                  alt="minus icon"
                  onClick={() => handleActive(-1)}
                />
              ) : (
                <Image
                  src="/icons/plus.svg"
                  width={24}
                  height={24}
                  alt="plus icon"
                  onClick={() => handleActive(index)}
                />
              )}
            </div>
          ))}
      </section>
    </section>
    }</>
  );
}
