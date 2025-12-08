import HotelCard from "./hotelCard";

export default function YouMightLikeSection() {
    const hotel = {
        hotel_id: "1",
        created_at: "2025-12-08T10:09:05.000Z",
        title: "Hotel 1",
        tagline: "Tagline 1",
        price: 100,
        check_rates_link: "https://example.com/check-rates",
        view_rooms_link: "https://example.com/view-rooms",
        location: "Location 1",
        rating_desc: "Rating Description 1",
        beach: "Beach 1",
        facilities: "Facilities 1",
        rating: 4.5,
        reviews: 100,
        about_hotel_images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        hotel_image_in_clouds: "https://example.com/hotel-image.jpg",
        highlights: [
            { title: "Highlight 1", description: "Description 1" },
            { title: "Highlight 2", description: "Description 2" },
        ],
        rooms_link: "https://example.com/rooms",
        rooms: [
            {
                image: "https://example.com/room-image.jpg",
                title: "Room 1",
                size: "Size 1",
                bed_type: "Bed Type 1",
                view: "View 1",
                ventilation: "Ventilation 1",
                link: "https://example.com/room-link",
            },
            {
                image: "https://example.com/room-image.jpg",
                title: "Room 2",
                size: "Size 2",
                bed_type: "Bed Type 2",
                view: "View 2",
                ventilation: "Ventilation 2",
                link: "https://example.com/room-link",
            },
        ],
        essential_information: {
            checkin_checkout: "Check-in/Check-out 1",
            location_distance: "Location Distance 1",
            price_range: "Price Range 1",
            beach_access: "Beach Access 1",
            dining_options: "Dining Options 1",
            family_facilities: "Family Facilities 1",
            wifi_availability: "WiFi Availability 1",
            parking_availability: "Parking Availability 1",
        },
        traveler_tips: ["Tip 1", "Tip 2", "Tip 3"],
        faqs: [
            { question: "Question 1", answer: "Answer 1" },
            { question: "Question 2", answer: "Answer 2" },
        ],
    };
    return (
        <section className="flex flex-col items-center justify-center py-[60px] px-[20px] lg:px-[140px] lg:py-[100px] gap-[48px] lg:gap-[80px]">
            <h2 className="heading-2">You Might Also Like</h2>
            <div className="flex flex-row items-center justify-center gap-[32px] flex-wrap">
                <HotelCard hotel={hotel} />
                <HotelCard hotel={hotel} />
                <HotelCard hotel={hotel} />

            </div>
        </section>
    )
}