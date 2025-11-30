import AboutLocationSection from "@/components/aboutLocationComponent"
import BookStaySection from "@/components/bookStaySection"
import CategoryHeroSection from "@/components/categoryHeroSection"
import LocationAttractionsSection from "@/components/locationAttractionsSection"
import LocationDownTownMap from "@/components/locationDownTownMap"
import LocationHotelsSection from "@/components/locationHotelsSection"
import ShalimarWithAboveSection from "@/components/shalimarWithAboveCloudSection"
export default function Location()
{
    return(
        <div>
<CategoryHeroSection/>
<AboutLocationSection/>
<LocationHotelsSection/>
<LocationAttractionsSection/>
<LocationDownTownMap/>
<BookStaySection/>
<ShalimarWithAboveSection/>
        </div>
    )
}