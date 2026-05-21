'use client'

import { useEffect, useRef } from 'react'

export interface MapMarker {
    lat: number
    lng: number
    title: string
    description?: string
    type?: 'main' | 'nearby'
}

interface LeafletMapProps {
    /** Center of the map */
    center: [number, number]
    /** Zoom level (default: 14) */
    zoom?: number
    /** Markers to display */
    markers?: MapMarker[]
    /** Height of the map container (default: 420px) */
    height?: string
    className?: string
}

export default function LeafletMap({
    center,
    zoom = 14,
    markers = [],
    height = '420px',
    className = '',
}: LeafletMapProps) {
    const mapRef      = useRef<HTMLDivElement>(null)
    const mapInstance = useRef<import('leaflet').Map | null>(null)

    useEffect(() => {
        if (!mapRef.current || mapInstance.current) return

        // Dynamically import leaflet so it never runs on the server
        import('leaflet').then((L) => {
            // Fix default icon paths broken by webpack
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (L.Icon.Default.prototype as any)._getIconUrl
            L.Icon.Default.mergeOptions({
                iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            })

            // Create map
            const map = L.map(mapRef.current!, {
                center,
                zoom,
                zoomControl: true,
                scrollWheelZoom: false,
            })
            mapInstance.current = map

            // Tile layer — OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
            }).addTo(map)

            // Custom icons
            const mainIcon = L.divIcon({
                className: '',
                html: `
                    <div style="
                        width:36px;height:36px;
                        background:#F8A900;
                        border:3px solid #fff;
                        border-radius:50% 50% 50% 0;
                        transform:rotate(-45deg);
                        box-shadow:0 3px 12px rgba(248,169,0,0.5);
                    "></div>
                `,
                iconSize:   [36, 36],
                iconAnchor: [18, 36],
                popupAnchor:[0, -38],
            })

            const nearbyIcon = L.divIcon({
                className: '',
                html: `
                    <div style="
                        width:24px;height:24px;
                        background:#112259;
                        border:2px solid #fff;
                        border-radius:50% 50% 50% 0;
                        transform:rotate(-45deg);
                        box-shadow:0 2px 8px rgba(17,34,89,0.4);
                    "></div>
                `,
                iconSize:   [24, 24],
                iconAnchor: [12, 24],
                popupAnchor:[0, -26],
            })

            // Add markers
            markers.forEach(m => {
                const icon = m.type === 'nearby' ? nearbyIcon : mainIcon
                const marker = L.marker([m.lat, m.lng], { icon }).addTo(map)
                if (m.title) {
                    marker.bindPopup(`
                        <div style="font-family:Inter,sans-serif;min-width:140px">
                            <p style="font-weight:700;color:#112259;margin:0 0 4px">${m.title}</p>
                            ${m.description ? `<p style="font-size:12px;color:#6B7280;margin:0">${m.description}</p>` : ''}
                        </div>
                    `)
                }
            })
        })

        return () => {
            mapInstance.current?.remove()
            mapInstance.current = null
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {/* Leaflet CSS */}
            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                crossOrigin=""
            />
            <div
                ref={mapRef}
                style={{ height }}
                className={`w-full rounded-[24px] border border-[#EAECF0] overflow-hidden z-0 ${className}`}
            />
        </>
    )
}
