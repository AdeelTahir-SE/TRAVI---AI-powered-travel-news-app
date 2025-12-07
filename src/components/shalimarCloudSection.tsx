import Image from "next/image";
export default function ShalimarCloudSection({ className }: { className: string }) {
  return (
    <section
      className={` ${className} flex flex-row items-center justify-center  max-h-[600px] h-[200px] md:h-[350px] 2xl:h-[450px] *:min-h-[400px] *:min-w-[1200px] *:top-5 *:lg:top-20 *:2xl:top-[150px] `}
    >

      <Image
        src="/clouds/cloud.svg"
        alt="Cloud Middle"
        width={1200}
        height={400}
        className="absolute left-[-170px] "
      />
      <Image
        src="/clouds/cloud.svg"
        alt="Cloud Middle"
        width={1200}
        height={400}
        className="absolute left-[500px]"
      />

      <Image
        src="/clouds/cloud.svg"
        alt="Cloud Middle"
        width={1200}
        height={400}
        className="absolute left-[800px]"
      />
      <Image
        src="/clouds/cloud.svg"
        alt="Cloud Middle"
        width={1200}
        height={400}
        className="absolute left-[1150px] "
      />
      <Image
        src="/clouds/cloud.svg"
        alt="Cloud Middle"
        width={1200}
        height={400}
        className="absolute left-[-350px]"
      />

      <Image
        src="/clouds/cloud.svg"
        alt="Cloud Right"
        width={1200}
        height={400}
        className="absolute left-[650px]"
      />
      <Image
        src="/clouds/cloud.svg"
        alt="Cloud Right"
        width={1200}
        height={400}
        className="absolute left-[200px]"
      />
      {/*<Image
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
