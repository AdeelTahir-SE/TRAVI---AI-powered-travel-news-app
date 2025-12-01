import AboutHotelSection from "@/components/aboutHotelSection";
import HotelDetailHeroSection from "@/components/hotelDetailHeroSection";
import HotelSpecsSection from "@/components/hotelSpecsSection";
export default function HotelPage(){
    return(
        <div className="flex flex-col items-center justify-center">
            <HotelDetailHeroSection/>
            <HotelSpecsSection/>
            <AboutHotelSection/>
        </div>
    )
}