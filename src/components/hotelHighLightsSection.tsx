import Image from "next/image";
import { HighlightsDescriptions } from "@/utils/types";
export default function HotelHighLightsSection({ highLights }: { highLights?: HighlightsDescriptions }) {
  const highlights = [
    {
      image: "/icons/water-polo.svg",
      title: "Waterpolo",
      description: highLights?.waterpolo || "Unlimited access to the Middle East's largest waterpark with thrilling slides and attractions.",
    },
    {
      image: "/icons/underwater-suites.svg",
      title: "Underwater Suites",
      description: highLights?.underwater_suites || "Experience the world's first underwater suites with stunning views of the ocean.",
    },
    {
      image: "/icons/dining-option.svg",
      title: "Dining Option",
      description: highLights?.dining_option || "Choose from a variety of dining options to suit your taste and preferences.",
    },
    {
      image: "/icons/beach-icon.svg",
      title: "Beach",
      description: highLights?.beach || "Enjoy the beautiful beach with its crystal-clear waters and soft sand.",
    },
    {
      image: "/icons/smile-icon.svg",
      title: "Smile",
      description: highLights?.smile || "Experience the world's first underwater suites with stunning views of the ocean.",
    },
    {
      image: "/icons/bed-icon.svg",
      title: "Bed",
      description: highLights?.bed || "Experience the world's first underwater suites with stunning views of the ocean.",
    },
  ]
  return (
    <div className="flex relative flex-col">
      <section className="flex flex-col items-center justify-center py-[60px] px-[20px] lg:py-[100px] lg:px-[140px] gap-[48px] lg:gap-[80px] relative z-10">
        <div className="flex flex-col items-center justify-center gap-[12px]">
          <h2 className="stylish-yellow-text">Highlights</h2>
          <h3 className="heading-2">Why Guests Love This Hotel</h3>
          <p className="flex flex-col items-start justify-center gap-[12px] font-inter text-normal text-[20px] lg:text-[24px] leading-[20px] lg:leading-[36px] tracking-[-0.02em] text-[#475467]">
            Top features and experiences that make it stand out.
          </p>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center gap-[24px] lg:gap-[40px] ">
          {highlights && highlights?.length > 0 && highlights?.map((highLight, index) => (
            <HighLightCard key={index} image={highLight.image} title={highLight.title} description={highLight.description} />
          ))}
        </div>
      </section>
      <div className="z-0 md:flex flex-col h-full items-center justify-center absolute inset-0 hidden overflow-hidden  z-0">
        <Image
          src="/background-images/explore-dubai-background-effect.png"
          className="w-full absolute h-full z-0"
          width={1200}
          height={400}
          alt=""
        />
        <div
          className="
                      absolute inset-0 z-0 
                bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_50%,rgba(255,255,255,1)_100%)]
                    "
        ></div>
      </div>
    </div>
  );
}

function HighLightCard({ image, title, description }: { image: string, title: string, description: string }) {
  return (
    <section className="lg:max-w-[523px] max-w-[400px] flex flex-col items-center justify-center bg-[#FFFFFF66] border-1 border-[#D0D5DD] p-[48px] gap-[32px] rounded-[30px]">
      <div className="flex items-center justify-center rounded-[24px] gap-[10px] bg-white shadow-[0px_4px_40px_0px_rgba(127,127,127,0.25)] w-[100px] h-[100px]">
        <Image src={image} width={56} height={56} alt="" className="w-[56px] h-[56px]" />
      </div>
      <div className="flex flex-col items-center justify-center gap-[12px]  text-center">
        <h3 className="font-inter font-medium text-[32px] leading-[100%] tracking-[0.02em] text-[#000000]">
          {title}
        </h3>
        <p className="font-inter font-normal text-[24px] leading-[36px] tracking-[0.02em] text-[#475467]">
          {description}
        </p>
      </div>
    </section>
  );
}