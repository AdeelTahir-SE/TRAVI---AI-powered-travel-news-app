import SidebarList from "./sideBarList";

export default function HotelComparisonTableSection(){
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
      <section className=" relative z-10 flex flex-col items-center justify-center  py-[60px] px-[20px] lg:py-[100px] lg:px-[140px] gap-[48px] lg:gap-[80px] overflow-x-auto ">
        <h2 className="heading-2"> Hotel Comparison</h2>

          <div className="flex flex-row items-center justify-center rounded-[20px] border-1 border-[#EAECF0] bg-white  overflow-hidden ">
            <div className="flex flex-row items-center justify-center border-r-1 border-[#EAECF0]  ">
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