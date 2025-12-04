import Image from "next/image"
export default function AboutMuseumCloudSection() {
    return (
        <div className="z-10 absolute flex flex-row items-center justify-center  bottom-0 overflow-hidden ">

            <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[500px] h-[200px] lg:h-[300px] lg:w-[1200px] 2xl:h-[400px] bottom-[-90px]" alt="" />
            <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[500px] h-[200px] lg:h-[300px] lg:w-[1200px] 2xl:h-[400px] bottom-[-90px] absolute border-2" alt="" />
            <Image src={"/clouds/cloud.svg"} width={1200} height={400} className="w-[500px] h-[200px] lg:h-[300px] lg:w-[1200px] 2xl:h-[400px] bottom-[-90px]" alt="" />
        </div>
    );
}