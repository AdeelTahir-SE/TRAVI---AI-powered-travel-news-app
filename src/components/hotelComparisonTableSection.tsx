import SidebarList from "./sideBarList";

export default function HotelComparisonTableSection() {
  const sidebarItems = [
    "Hotels",
    "Accommodations",
    "Activities Included",
    "Dining Experience",
    "Duration",
    "Transportation",
    "Guide",
    "Customization",
    "Price Range",
    "Room Types",
  ];

  return (
    <section className="relative z-10 flex flex-col items-center justify-center py-[60px] px-[20px] lg:py-[100px] lg:px-[140px] gap-[48px] lg:gap-[80px]">
      <h2 className="heading-2"> Hotel Comparison</h2>

      {/* Scroll wrapper — scrolls horizontally on small screens */}
      <div className="w-full overflow-x-auto rounded-[20px] border border-[#EAECF0]">
        <div className="flex flex-row items-stretch min-w-max bg-white overflow-hidden rounded-[20px]">
          <SidebarList
            sidebarItems={sidebarItems}
            backgrounColor="#F9FAFB"
            textColor="#000000"
          />
          <SidebarList
            sidebarItems={sidebarItems}
            backgrounColor="#FFFFFF"
            textColor="#475467"
          />
          <SidebarList
            sidebarItems={sidebarItems}
            backgrounColor="#FFFFFF"
            textColor="#475467"
          />
          <SidebarList
            sidebarItems={sidebarItems}
            backgrounColor="#FFFFFF"
            textColor="#475467"
          />
          <SidebarList
            sidebarItems={sidebarItems}
            backgrounColor="#FFFFFF"
            textColor="#475467"
          />
          <SidebarList
            sidebarItems={sidebarItems}
            backgrounColor="#FFFFFF"
            textColor="#475467"
          />
          <SidebarList
            sidebarItems={sidebarItems}
            backgrounColor="#FFFFFF"
            textColor="#475467"
          />
        </div>
      </div>
    </section>
  );
}
