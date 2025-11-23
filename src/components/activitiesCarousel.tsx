"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
async function fetchActivities() {}
export default function ActivitiesCarousel() {
  const [activities, setActivities] = useState([
    {
      id: "extreme-sports",
      title: "Extreme Sports",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus arcu .",
      link: "",
      imageUrl: "/background-images/testing.png",
    },
    {
      id: "extreme-sprt",
      title: "Extreme Sports",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus arcu .",
      link: "",
      imageUrl: "/background-images/testing.png",
    },
    {
      id: "exeme-sports",
      title: "Extreme Sports",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus arcu .",
      link: "",
      imageUrl: "/background-images/hero-section.jpg",
    },
    {
      id: "extremsports",
      title: "Extreme Sports",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus arcu .",
      link: "",
      imageUrl: "/background-images/explore-activites.png",
    },
    {
      id: "extremesport",
      title: "Extreme Sports",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus arcu .",
      link: "",
      imageUrl: "/background-images/testing.png",
    },
    {
      id: "extreme-asdports",
      title: "Extreme Sports",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus arcu .",
      link: "",
      imageUrl: "/background-images/testing.png",
    },
    {
      id: "extreme-srqwprt",
      title: "Extreme Sports",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus arcu .",
      link: "",
      imageUrl: "/background-images/testing.png",
    },
    {
      id: "exeme-strports",
      title: "Extreme Sports",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus arcu .",
      link: "",
      imageUrl: "/background-images/hero-section.jpg",
    },
    {
      id: "extremsytrports",
      title: "Extreme Sports",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus arcu .",
      link: "",
      imageUrl: "/background-images/explore-activites.png",
    },
    {
      id: "extremespiuyort",
      title: "Extreme Sports",
      explanation:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus arcu .",
      link: "",
      imageUrl: "/background-images/testing.png",
    },
  ]);
  const [scrollPos, setScrollPos] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentActive, setCurrentActive] = useState(0);
  // useEffect(()=>{
  //     fetchActivities().then((data)=>{
  //         setActivities(data);
  //     })
  // },[])

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollPos(container.scrollLeft);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (index: number) => {
    setCurrentActive(index);

    const container = containerRef.current;
    const child = container?.children[index] as HTMLElement;

    if (child && container) {
      // let fixbug=-80 if scrolling to right else 10
      const fixbug = scrollPos > child.offsetLeft ? 12 : -12;

      const scrollLeft =
        child.offsetLeft +
        child.offsetWidth / 2 -
        window.innerWidth / 2 +
        fixbug;

      container.scrollTo({ left: scrollLeft, behavior: "smooth" });

      // Save new scroll position immediately
      setScrollPos(scrollLeft);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative flex flex-row w-full no-scrollbar max-w-screen items-center md:items-start justify-start gap-[31px] lg:gap-[100px] overflow-x-auto scroll-smooth py-15 "
    >
      {activities &&
        activities?.length > 0 &&
        activities.map((activity, index) => {
          return (
            <CarouselItem
              key={activity.id}
              index={index}
              title={activity.title}
              explanation={activity.explanation}
              link={activity.link}
              imageUrl={activity.imageUrl}
              isActive={currentActive === index}
              onClick={() => handleClick(index)}
            />
          );
        })}
    </section>
  );
}
function CarouselItem({
  index,
  title,
  explanation,
  imageUrl,
  link,
  isActive,
  onClick,
}: {
  index: number;
  title: string;
  explanation: string;
  imageUrl: string;
  link: string;
  isActive: boolean;
  onClick: (index: number) => void;
}) {
  return (
    <>
      {isActive ? (
        <section className="relative rounded-[3280px] lg:rounded-[5000px] flex-shrink-0 min-w-[320px] lg:w-[490px] min-h-[527px] lg:h-[803px] relative  border-white shadow-2xl shadow-black ">
          <Image
            src={imageUrl}
            width={320}
            height={527}
            alt=""
            className="rounded-[3280px] lg:rounded-[5000px] min-w-[320px] lg:w-[490px] min-h-[527px] lg:h-[803px] object-cover border-[12px]"
          />
          <div className="absolute top-[102px] left-0 right-0 px-4 lg:px-8 flex flex-col items-center justify-center gap-[14px]">
            <h3 className="text-white font-inter font-bold text-[25px] lg:text-[40px] leading-[100%] tracking-[-0.02em] text-center">
              {title}
            </h3>
            <p className="font-inter font-bold text-[15px] lg:text-[20px] leading-[18px] lg:leading-[28px] tracking-[-0.02em] text-center text-white max-w-[280px] lg:max-w-[450px]">
              {explanation}
            </p>
            <Link
              href={link}
              className="text-black bg-[#F8A900] rounded-[38.7px] p-[17px] lg:px-[24px] lg:py-[22px] font-inter font-semibold lg:font-bold text-[16px] lg:text-[25px] leading-[23.28px] lg:leading-[30px] tracking-[-0.02em] text-center"
            >
              View Details
            </Link>
          </div>
        </section>
      ) : (
        <section
          className="relative rounded-[3280px] lg:rounded-[5000px] min-w-[296px] lg:min-w-[428px] min-h-[434px] lg:h-[628px] relative  border-white shadow-2xl shadow-black "
          onClick={() => onClick(index)}
        >
          <Image
            src={imageUrl}
            width={320}
            height={527}
            alt=""
            className="rounded-[3280px] lg:rounded-[5000px] min-w-[296px] lg:w-[428px] min-h-[434px] lg:h-[628px]  object-cover border-[12px]"
          />
        </section>
      )}
    </>
  );
}
