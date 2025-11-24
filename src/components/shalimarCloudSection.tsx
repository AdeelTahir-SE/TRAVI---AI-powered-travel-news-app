import Image from "next/image";
export default function ShalimarCloudSection({className}:{className:string}){
    return (
      <section className={` ${className} flex flex-row items-center justify-center  max-h-[600px] h-[200px] md:h-[350px]  *:min-h-[400px] *:min-w-[1200px]`} >
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Left"
          width={1200}
          height={400}
          className="absolute  top-[-12px]   "
        />
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Middle"
          width={1200}
          height={400}
          className="absolute top-[-12px]"
        />
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Right"
          width={1200}
          height={400}
          className="absolute top-[-18px]  left-3"
        />
        <Image
          src="/clouds/cloud.svg"
          alt="Cloud Right"
          width={1200}
          height={400}
          className="absolute top-[-8px]  right-[-100px]"
        />
        
      </section>
    );
}
