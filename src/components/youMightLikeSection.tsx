import HotelCard from "./hotelCard";

export default function YouMightLikeSection() {
    return (
        <section className="flex flex-col items-center justify-center py-[60px] px-[20px] lg:px-[140px] lg:py-[100px] gap-[48px] lg:gap-[80px]">
            <h2 className="heading-2">You Might Also Like</h2>
            <div className="flex flex-row items-center justify-center gap-[32px] flex-wrap">
                <HotelCard />
                <HotelCard />
                <HotelCard />

            </div>
        </section>
    )
}