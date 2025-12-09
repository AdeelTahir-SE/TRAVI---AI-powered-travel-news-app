import HotelSpecsCard from "./hotelSpecsCard";

export default function HotelSpecsSection({ hotelSpecs }: { hotelSpecs?: (string | undefined)[] }) {
    return (
        <section className="z-30 relative bottom-[125px] lg:bottom-[40px] flex flex-col lg:flex-row  flex-wrap items-start justify-center rounded-[24px] gap-[16px] lg:gap-[32px]">

            {hotelSpecs?.[0] && <HotelSpecsCard imageurl={"/icons/location.svg"} title="Location" description={hotelSpecs[0]} />}
            {hotelSpecs?.[1] && <HotelSpecsCard imageurl={"/icons/hotel-star.svg"} title="Rating" description={hotelSpecs[1]} />}
            {hotelSpecs?.[2] && <HotelSpecsCard imageurl={"/icons/hotel-beach.svg"} title="Beach" description={hotelSpecs[2]} />}
            {hotelSpecs?.[3] && <HotelSpecsCard imageurl={"/icons/hotel-facilities.svg"} title="Facilities" description={hotelSpecs[3]} />}
        </section>
    )
}