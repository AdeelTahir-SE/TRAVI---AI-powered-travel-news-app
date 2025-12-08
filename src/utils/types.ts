// interface Experience{
// title:string,
// slug:string,
// category:ENUM(),//as homepage
// images:Array<string>,//urls
// info_json:JSON, //all fields like (location, hours, ticket info, contact, highlights, overview text...)
// affiliate_links:Array<{label:string,url:string}>,
// banner_zone_override:string?//to specify which banner appears
// }

// interface News{
//     title:string,
//     body:string,
//     source:string,//url
//     status:ENUM("draft","published"),
//     imported_at:Date,
// }
// interface Banner{
//     zone:ENUM("header,sidebar,in-content1,footer"),
//     image:string,
//     link:string,
//     start_date:Date,
//     end_date:Date,
//     active:boolean
// }

export interface FAQ {
    question: string,
    answer: string,
}

export interface Highlight {
    title: string;
    description: string;
}

export interface Room {
    name: string;
    price?: number;
    description?: string;
    amenities?: string[];
}

export interface Hotel {
    hotel_id: string;
    created_at: string;
    title: string;
    tagline: string;
    check_rooms_link?: string;
    view_rooms_link?: string;
    location?: string;
    rating_desc?: string;
    beach?: string;
    facilities?: string;
    rating?: number;
    reviews?: number;
    about_hotel_images: string[];
    hotel_image_in_clouds?: string;
    highlights?: Highlight[];
    rooms_link?: string;
    room?: Room[];
    essential_information?: string[];
    traveler_tips?: string[];
    faqs?: FAQ[];
}