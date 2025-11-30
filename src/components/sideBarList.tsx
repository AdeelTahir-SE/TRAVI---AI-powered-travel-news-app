
export default function SidebarList({sidebarItems,backgrounColor,textColor}:{sidebarItems:string[],backgrounColor:string,textColor:string}) {
  return (
    <div
      className="
        flex flex-col items-center justify-center 
        border-r border-[#EAECF0]
      "
    >
      {sidebarItems.map((item, index) => (
        <span
          key={index}
          className={`
           py-[24px] w-[205px] bg-[${backgrounColor}]  border-b-1  border-[#EAECF0] px-[20px] gap-[12px] text-ellipsis
          `}
        >
          <p
            className={`font-inter  text-[18px] leading-[100%] 
              ${
                index === 0
                  ? "space-[12px] font-medium text-black"
                  : `font-normal  text-[${textColor}] `
              }
            `}
          >
            {item}
          </p>
        </span>
      ))}
    </div>
  );
}
