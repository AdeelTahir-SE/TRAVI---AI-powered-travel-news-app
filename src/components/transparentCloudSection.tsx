import Image from "next/image";
export default function TransparentCloudsSection({className}:{className:string}){
    return (
      <section className={`overflow-hidden ${className} max-h-[600px] h-[200px] md:h-[350px]  *:min-h-[400px] *:min-w-[1200px]`} >
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Left"
          width={1200}
          height={400}
          className="relative right-[700px]     "
        />
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Middle"
          width={1200}
          height={400}
          className="relative bottom-[410px] 2xl:bottom-[400px]  left-[50px] md:left-[100px] 2xl:left-[400px] "
        />
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Right"
          width={1200}
          height={400}
          className="relative left-[100px] sm:left-[150px] md:left-[200px] lg:left-[350px] xl:left-[420px] 2xl:left-[900px] bottom-[940px] lg:bottom-[940px] "
        />
      </section>
    );
}
