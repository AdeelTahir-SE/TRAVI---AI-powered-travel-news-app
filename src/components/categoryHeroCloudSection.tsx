import Image from "next/image"
export default function CategoryHeroCloudSection(){
    return (
      <div className="absolute flex flex-col items-center justify-center bottom-0 overflow-hidden w-full h-[100px] 2xl:h-[200px]">
        <div className="flex flex-row items-center justify-around relative w-full *:z-20 *:2xl:top-[-64] *:top-[-10] *:lg:top-[-30]">
          <Image
            src="/clouds/cloud.svg"
            className="absolute w-1/2 right-4  h-auto"
            width={1200}
            height={400}
            alt=""
          />
          <Image
            src="/clouds/cloud.svg"
            className="absolute w-1/2 right-4  h-auto"
            width={1200}
            height={400}
            alt=""
          />
          <Image
            src="/clouds/cloud.svg"
            className="absolute w-1/2 left-4  h-auto"
            width={1200}
            height={400}
            alt=""
          />
          <Image
            src="/clouds/cloud.svg"
            className="absolute w-1/2 left-40  h-auto"
            width={1200}
            height={400}
            alt=""
          />
          <Image
            src="/clouds/cloud.svg"
            className="absolute w-1/2 right-4  h-auto"
            width={1200}
            height={400}
            alt=""
          />
          <Image
            src="/clouds/cloud.svg"
            className="absolute w-1/2 left-4  h-auto"
            width={1200}
            height={400}
            alt=""
          />
          <Image
            src="/clouds/cloud.svg"
            className="absolute w-1/2 left-[-70]  h-auto"
            width={1200}
            height={400}
            alt=""
          />
          <Image
            src="/clouds/cloud.svg"
            className="absolute w-1/2 left-[-4] h-auto"
            width={1200}
            height={400}
            alt=""
          />
        </div>
        <div
          className="
      absolute inset-0 z-0
      bg-[linear-gradient(to_bottom,rgba(35,132,200,0)_0%,rgba(35,132,200,0.15)_33.27%,rgba(35,132,200,0.7)_70%,rgba(255,255,255,1)_100%))]
    "
        ></div>
      </div>
    );
}