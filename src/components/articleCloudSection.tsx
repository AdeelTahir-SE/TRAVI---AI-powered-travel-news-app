import Image from "next/image"
export default function ArticleCloudSection() {
    return (
        <div className="absolute flex flex-col items-center justify-center bottom-0 overflow-hidden w-full h-[100px] 2xl:h-[200px]">
            <div className="flex flex-row items-center justify-around relative w-full *:z-20 *:2xl:top-[-74] *:top-[-30] *:lg:top-[-40]">
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
                    className="absolute w-1/2 left-[-184px]  h-auto"
                    width={1200}
                    height={400}
                    alt=""
                />
                <Image
                    src="/clouds/cloud.svg"
                    className="absolute w-1/2 right-[-184px]  h-auto"
                    width={1200}
                    height={400}
                    alt=""
                />
                <Image
                    src="/clouds/cloud.svg"
                    className="absolute w-1/2 right-[-194px]  h-auto"
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
      bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1)_0%,rgba(35,132,200,0)_33.27%,rgba(255,255,255,0.2)_70%,rgba(255,255,255,1)_100%)]
    "
            ></div>
        </div>
    );
}