import Image from "next/image";
export default function ShalimarCloudSection({className}:{className:string}){
    return (
      <section
        className={` ${className} flex flex-row items-center justify-center  max-h-[600px] h-[200px] md:h-[350px]  *:min-h-[400px] *:min-w-[1200px] *:top-5 *:lg:top-20 `}
      >
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Middle"
          width={1200}
          height={400}
          className="absolute right-[500px] "
        />
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Middle"
          width={1200}
          height={400}
          className="absolute "
        />
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Middle"
          width={1200}
          height={400}
          className="absolute "
        />
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Middle"
          width={1200}
          height={400}
          className="absolute "
        />
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Middle"
          width={1200}
          height={400}
          className="absolute left-[500px]"
        />

        {/* <Image
          src="/clouds/cloud.svg"
          alt="Cloud Right"
          width={1200}
          height={400}
          className="absolute 2xl:bottom-[-200px]  right-[-100px]"
        />
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Right"
          width={1200}
          height={400}
          className="absolute bottom-[-200px]  right-[-10px]"
        />
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Right"
          width={1200}
          height={400}
          className="absolute top-[-8px]  left-[-200px]"
        />
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Right"
          width={1200}
          height={400}
          className="absolute top-[-8px]  left-[-200px]"
        />
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Right"
          width={1200}
          height={400}
          className="absolute bottom-[-200px]  left-[-200px]"
        />
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Right"
          width={1200}
          height={400}
          className="absolute bottom-[-280px]  right-[-350px]"
        /> */}
      </section>
    );
}
