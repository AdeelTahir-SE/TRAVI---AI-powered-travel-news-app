import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import type { MapMarker } from "./LeafletMap"

// Dynamic import to avoid SSR issues with Leaflet
const LeafletMap = dynamic(() => import("./LeafletMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-[420px] lg:h-full min-h-[420px] rounded-[24px] border border-[#EAECF0] bg-gray-100 animate-pulse" />
    ),
})

interface LocationAndNearBySectionProps {
    /** Latitude of the main location */
    lat?: number
    /** Longitude of the main location */
    lng?: number
    /** Address text */
    address?: string
    /** Getting there instructions */
    gettingThere?: { label: string; detail: string }[]
    /** Nearby attractions */
    nearbyAttractions?: { name: string; href: string; time: string; lat?: number; lng?: number }[]
}

export default function LocationAndNearBySection({
    lat = 25.2048,
    lng = 55.2708,
    address = "Sheikh Zayed Road, Trade Centre 2, Dubai, UAE",
    gettingThere = [
        { label: "Metro", detail: "Emirates Towers Station (Red Line), 5-minute walk" },
        { label: "Bus",   detail: "Routes 13, 42, and X22 stop at Trade Centre" },
        { label: "Taxi",  detail: "Ride-hailing apps (Careem / Uber) readily available" },
    ],
    nearbyAttractions = [
        { name: "Burj Khalifa",  href: "/", time: "10 min drive", lat: 25.1972,  lng: 55.2744 },
        { name: "Dubai Mall",    href: "/", time: "12 min drive", lat: 25.1985,  lng: 55.2796 },
        { name: "Dubai Frame",   href: "/", time: "8 min drive",  lat: 25.2353,  lng: 55.3003 },
    ],
}: LocationAndNearBySectionProps) {

    const markers: MapMarker[] = [
        { lat, lng, title: "Location", description: address, type: "main" },
        ...nearbyAttractions
            .filter(a => a.lat && a.lng)
            .map(a => ({
                lat: a.lat!,
                lng: a.lng!,
                title: a.name,
                description: a.time,
                type: "nearby" as const,
            })),
    ]

    return (
        <section className="min-w-full flex flex-col items-center lg:items-start justify-center py-[60px] px-[20px] lg:py-[100px] lg:px-[140px] gap-[48px] lg:gap-[80px]">
            <h2 className="heading-2 text-center lg:text-start">Locations &amp; Nearby</h2>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-[40px]">
                {/* ── Interactive Leaflet Map ── */}
                <div className="w-full min-h-[420px] lg:min-h-[600px]">
                    <LeafletMap
                        center={[lat, lng]}
                        zoom={13}
                        markers={markers}
                        height="100%"
                        className="min-h-[420px] lg:min-h-[600px]"
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-[32px]">

                    {/* Address */}
                    <div className="w-full flex flex-col items-start justify-center rounded-[24px] border-1 p-[24px] gap-[20px] border-[#D0D5DD]">
                        <Image src={"/icons/location-orange.svg"} width={36} height={36} className="w-[36px] h-[36px]" alt="" />
                        <div className="flex flex-col items-start justify-center gap-[12px]">
                            <h2 className="font-inter font-medium text-[28px] leading-[36px] tracking-[-0.02em]">Address:</h2>
                            <p className="font-inter font-normal text-[20px] leading-[28px] tracking-[-0.02em] text-[#475467]">
                                {address}
                            </p>
                        </div>
                    </div>

                    {/* Getting There */}
                    <div className="w-full flex flex-col items-start justify-center rounded-[24px] border-1 p-[24px] gap-[20px] border-[#D0D5DD]">
                        <Image src={"/icons/route-orange.svg"} width={36} height={36} className="w-[36px] h-[36px]" alt="" />
                        <div className="flex flex-col items-start justify-center gap-[12px]">
                            <h2 className="font-inter font-medium text-[28px] leading-[36px] tracking-[-0.02em]">Getting There:</h2>
                            {gettingThere.map((item, i) => (
                                <span key={i} className="font-inter font-normal text-[20px] leading-[28px] tracking-[-0.02em]">
                                    {item.label}:{" "}
                                    <span className="text-[#475467]">{item.detail}</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Nearby Attractions */}
                    <div className="flex flex-col items-start justify-center rounded-[24px] border-1 p-[24px] gap-[20px] border-[#D0D5DD] w-full">
                        <Image src={"/icons/stars-orange.svg"} width={36} height={36} className="w-[36px] h-[36px]" alt="" />
                        <div className="flex flex-col items-start justify-center gap-[12px]">
                            <h2 className="font-inter font-medium text-[28px] leading-[36px] tracking-[-0.02em]">Nearby Attractions:</h2>
                            <ul className="flex flex-col items-start justify-center gap-[12px]">
                                {nearbyAttractions.map((attraction, i) => (
                                    <li key={i} className="flex flex-row items-center justify-center gap-1">
                                        <Link
                                            href={attraction.href}
                                            className="font-inter font-semibold text-[20px] leading-[28px] tracking-[-0.02em] underline decoration-solid decoration-[1px] underline-offset-[0px] decoration-current text-[#0D7FF2]"
                                        >
                                            {attraction.name}
                                        </Link>
                                        <span className="font-inter font-normal text-[20px] leading-[28px] tracking-[-0.02em] text-[#475467]">
                                            {"  "}
                                        </span>
                                        <span className="font-inter font-normal text-[20px] leading-[28px] tracking-[-0.02em] text-[#475467]">
                                            ({attraction.time})
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}