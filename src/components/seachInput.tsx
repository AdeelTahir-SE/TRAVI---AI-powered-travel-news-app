import Image from "next/image";
export default function SearchInput({action}: {action:string}) {
  return (
            <div className="w-fit h-fit bg-[#FFFFFF1A]  rounded-[10.8px]">

    <form
      action={action}
      className="
    relative
    border-[13.2px] border-[#ffffff00]
   rounded-[10.8px]
    md:w-[733px]
    w-[365px]
  "
    >
      <input
        type="text"
        className="
      input-placeholder             /* enables custom placeholder style */
      bg-white
      w-full
      md:h-[72px] h-[60px]
      rounded-[10.8px]
      pl-14                        /* space for search icon */
      pr-[60px]                    /* space for submit button */
      outline-none
      font-inter font-normal
    "
        placeholder="Search Experiences..."
      />

      {/* SEARCH ICON (SVG INSIDE INPUT) */}
      <Image
        src="/icons/search.svg"
        width={24}
        height={24}
        className="absolute left-4 top-1/2 -translate-y-1/2 
    md:w-[24px] md:h-[24px] w-[16px] h-[16px]
    invert-[60%] sepia-[10%] saturate-[300%] hue-rotate-[180deg] brightness-[90%]"
        alt="Search Icon"
      />

      {/* BUTTON OVER INPUT */}
      <button
        type="submit"
        className="
      absolute 
      right-4 top-1/2 -translate-y-1/2
      bg-[#F8A900]
      rounded-[6px]
      w-[38px] h-[38px]
      md:w-[57.6px] md:h-[57.6px]
      flex items-center justify-center
      shadow-md
    "
      >
        <Image
          src="/icons/submit.svg"
          width={30}
          height={30}
          className="
        w-[20px] h-[20px]
        md:w-[30px] md:h-[30px]
      "
          alt=""
        />
      </button>
    </form>
    </div>
  );
}
