'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/utils/supabase'
import { Hotel } from '@/utils/types'
import ImageUpload from '@/components/admin/ImageUpload'
import { useToast } from '@/components/admin/Toaster'
import { AdminPageSkeleton } from '@/components/Skeletons'

export default function HotelsPage() {
    const { toast } = useToast()
    const [hotels, setHotels] = useState<Hotel[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingHotel, setEditingHotel] = useState<Hotel | null>(null)
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
    const [formData, setFormData] = useState<Partial<Hotel>>({
        title: '',
        tagline: '',
        about_hotel_images: [],
    })

    useEffect(() => {
        fetchHotels()
    }, [])

    const fetchHotels = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('hotel')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching hotels:', error)
            toast('Failed to fetch hotels: ' + error.message, 'error')
        } else {
            setHotels(data || [])
        }
        setLoading(false)
    }

    const handleCreate = () => {
        setEditingHotel(null)
        setFormData({
            title: 'Paradise Beach Resort',
            tagline: 'Your Perfect Tropical Getaway',
            location: 'Maldives',
            beach: 'Private white sand beach',
            rating: 4.8,
            reviews: 1250,
            price: 350,
            rating_desc: 'Excellent',
            facilities: 'Spa, Pool, Gym, Restaurant',
            check_rates_link: 'https://example.com/check-rates',
            view_rooms_link: 'https://example.com/view-rooms',
            rooms_link: 'https://example.com/rooms',
            main_image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
            about_hotel_images: [
                'https://images.unsplash.com/photo-1566073771259-6a8506099945',
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
                'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
                'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9'
            ],
            about_hotel: 'Paradise Beach Resort offers an unparalleled tropical experience in the heart of the Maldives. Nestled on a pristine private island, our resort combines luxury accommodations with breathtaking natural beauty. Each villa and suite is designed to provide maximum comfort while showcasing stunning ocean views. Our world-class amenities include multiple dining options, a full-service spa, infinity pools, and direct beach access. Whether you\'re seeking adventure or relaxation, Paradise Beach Resort is your perfect escape.',
            essential_information_image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6',
            traveler_tips_image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
            hotel_cloud_image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
            essential_information: {
                checkin_checkout: 'Check-in: 3:00 PM, Check-out: 11:00 AM',
                location_distance: '5 km from Male International Airport',
                price_range: '$200 - $500 per night',
                beach_access: 'Private beach, direct access',
                dining_options: '3 restaurants, 2 bars, room service 24/7',
                family_facilities: 'Kids club, playground, babysitting service',
                wifi_availability: 'Free WiFi in all areas',
                parking_availability: 'Free on-site parking available'
            },
            highlights: {
                waterpolo: 'Unlimited access to the Middle East\'s largest waterpark with thrilling slides and attractions',
                underwater_suites: 'Experience the world\'s first underwater suites with stunning views of the ocean',
                dining_option: 'Choose from a variety of dining options to suit your taste and preferences',
                beach: 'Enjoy the beautiful beach with its crystal-clear waters and soft sand',
                smile: 'Exceptional service that makes you smile every day',
                bed: 'Luxurious beds designed for ultimate comfort and relaxation'
            },
            traveler_tips: [
                'Book early for best rates and room selection',
                'Request ocean view rooms for stunning sunsets',
                'Try the seafood restaurant for fresh local cuisine',
                'Book spa treatments in advance during peak season'
            ],
            faqs: [
                {
                    question: 'What time is check-in and check-out?',
                    answer: 'Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out may be available upon request, subject to availability.'
                },
                {
                    question: 'Is breakfast included in the room rate?',
                    answer: 'Breakfast is included with most room packages. Please check your specific booking details or contact us for confirmation.'
                },
                {
                    question: 'Do you offer airport transfers?',
                    answer: 'Yes, we offer complimentary airport shuttle service. Please inform us of your arrival time at least 24 hours in advance.'
                }
            ],
            rooms: [
                {
                    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32',
                    title: 'Deluxe Ocean View Suite',
                    size: '45 sqm',
                    bed_type: 'King bed',
                    view: 'Ocean view',
                    ventilation: 'Air conditioning',
                    link: 'https://example.com/rooms/deluxe-ocean'
                },
                {
                    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427',
                    title: 'Beach Villa with Pool',
                    size: '85 sqm',
                    bed_type: 'King bed + Sofa bed',
                    view: 'Beach front',
                    ventilation: 'Air conditioning + Ceiling fan',
                    link: 'https://example.com/rooms/beach-villa'
                }
            ]
        })
        setShowModal(true)
    }

    const handleEdit = (hotel: Hotel) => {
        setEditingHotel(hotel)
        setFormData(hotel)
        setShowModal(true)
    }

    const handleDelete = async (hotelId: string) => {
        const { error } = await supabase
            .from('hotel')
            .delete()
            .eq('hotel_id', hotelId)

        if (error) {
            console.error('Error deleting hotel:', error)
            toast('Failed to delete hotel: ' + error.message, 'error')
        } else {
            toast('Hotel deleted successfully!', 'success')
            setDeleteConfirmId(null)
            fetchHotels()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate required fields
        if (!formData.title || !formData.tagline) {
            toast('Title and tagline are required!', 'error')
            return
        }

        if (!formData.about_hotel || formData.about_hotel.trim() === '') {
            toast('About Hotel description is required!', 'error')
            return
        }

        if (!formData.about_hotel_images || formData.about_hotel_images.length < 4) {
            toast('At least 4 About Hotel images are required!', 'error')
            return
        }

        if (!formData.essential_information_image) {
            toast('Essential Information Image is required!', 'error')
            return
        }

        if (!formData.traveler_tips_image) {
            toast('Traveler Tips Image is required!', 'error')
            return
        }

        if (!formData.hotel_cloud_image) {
            toast('Hotel Cloud Image is required!', 'error')
            return
        }

        // Validate all highlight descriptions are filled
        if (!formData.highlights?.waterpolo || !formData.highlights?.underwater_suites ||
            !formData.highlights?.dining_option || !formData.highlights?.beach ||
            !formData.highlights?.smile || !formData.highlights?.bed) {
            toast('All highlight descriptions are required!', 'error')
            return
        }

        if (editingHotel) {
            // Update existing hotel
            const { error } = await supabase
                .from('hotel')
                .update(formData)
                .eq('hotel_id', editingHotel.hotel_id)

            if (error) {
                console.error('Error updating hotel:', error)
                toast('Failed to update hotel: ' + error.message, 'error')
            } else {
                toast('Hotel updated successfully!', 'success')
                setShowModal(false)
                fetchHotels()
            }
        } else {
            // Create new hotel
            const { error } = await supabase
                .from('hotel')
                .insert([formData])

            if (error) {
                console.error('Error creating hotel:', error)
                toast('Failed to create hotel: ' + error.message, 'error')
            } else {
                toast('Hotel created successfully!', 'success')
                setShowModal(false)
                fetchHotels()
            }
        }
    }

    const handleInputChange = (field: keyof Hotel, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleArrayInput = (field: keyof Hotel, value: string) => {
        const array = value.split(',').map(item => item.trim()).filter(item => item)
        setFormData(prev => ({ ...prev, [field]: array }))
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Hotels</h1>
                        <p className="text-gray-500 text-sm mt-1">Create, edit, and manage hotel listings.</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="cursor-pointer flex items-center gap-2 bg-[#0D7FF2] hover:bg-[#0B6FD9] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Hotel
                    </button>
                </div>

                {loading ? (
                    <AdminPageSkeleton count={4} />
                ) : hotels.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-100">
                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <p className="text-gray-500 font-medium">No hotels yet</p>
                        <p className="text-gray-400 text-sm mt-1">Create your first hotel listing to get started.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {hotels.map((hotel) => (
                            <div key={hotel.hotel_id} className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-200">
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-base font-bold text-gray-900 truncate mb-2">{hotel.title}</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {hotel.location && (
                                                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                    {hotel.location}
                                                </span>
                                            )}
                                            {hotel.rating && (
                                                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                                                    <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                                    {hotel.rating}/5
                                                </span>
                                            )}
                                            {hotel.reviews && (
                                                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                                                    {hotel.reviews.toLocaleString()} reviews
                                                </span>
                                            )}
                                            {hotel.price && (
                                                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                                                    ${hotel.price}/night
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => handleEdit(hotel)}
                                            className="cursor-pointer flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            Edit
                                        </button>
                                        {deleteConfirmId === hotel.hotel_id ? (
                                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-1.5">
                                                <span className="text-xs text-red-600 font-medium whitespace-nowrap">Sure?</span>
                                                <button
                                                    onClick={() => handleDelete(hotel.hotel_id)}
                                                    className="cursor-pointer text-xs bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-lg font-semibold transition-colors"
                                                >
                                                    Yes, delete
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirmId(null)}
                                                    className="cursor-pointer text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded-lg font-medium transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDeleteConfirmId(hotel.hotel_id)}
                                                className="cursor-pointer flex items-center gap-1.5 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal for Create/Edit */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
                            <div className="sticky z-20 top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        {editingHotel ? 'Edit Hotel' : 'New Hotel'}
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-0.5">{editingHotel ? 'Update hotel details and images' : 'Fill in hotel details to publish'}</p>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="cursor-pointer p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                                    aria-label="Close modal"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="grid gap-6">
                                    {/* Required Fields */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Title <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title || ''}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Tagline <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.tagline || ''}
                                            onChange={(e) => handleInputChange('tagline', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    {/* Image Uploads */}
                                    <ImageUpload
                                        label="Main Hotel Image"
                                        multiple={false}
                                        existingImages={formData.main_image ? [formData.main_image] : []}
                                        onUploadComplete={(urls) => handleInputChange('main_image', urls[0] || '')}
                                    />

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            About Hotel Images (Minimum 4) *
                                        </label>
                                        {/* Reorder grid */}
                                        {(formData.about_hotel_images || []).length > 0 && (
                                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
                                                {(formData.about_hotel_images || []).map((url, idx) => (
                                                    <div key={idx} className="relative group rounded-xl overflow-hidden border-2 border-gray-200 aspect-square bg-gray-100">
                                                        <Image src={url} alt={`Hotel image ${idx + 1}`} fill sizes="120px" className="object-cover" />
                                                        {/* overlay controls */}
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-between p-1">
                                                            {/* order arrows */}
                                                            <div className="flex gap-1 w-full justify-between">
                                                                <button
                                                                    type="button"
                                                                    disabled={idx === 0}
                                                                    onClick={() => {
                                                                        const imgs = [...(formData.about_hotel_images || [])]
                                                                        ;[imgs[idx - 1], imgs[idx]] = [imgs[idx], imgs[idx - 1]]
                                                                        handleInputChange('about_hotel_images', imgs)
                                                                    }}
                                                                    className="cursor-pointer text-white bg-black/50 hover:bg-black/70 disabled:opacity-30 rounded-lg px-2 py-1 text-xs font-bold transition-all"
                                                                >←</button>
                                                                <span className="text-white text-[10px] font-bold bg-black/50 rounded px-1.5 flex items-center">{idx + 1}</span>
                                                                <button
                                                                    type="button"
                                                                    disabled={idx === (formData.about_hotel_images || []).length - 1}
                                                                    onClick={() => {
                                                                        const imgs = [...(formData.about_hotel_images || [])]
                                                                        ;[imgs[idx], imgs[idx + 1]] = [imgs[idx + 1], imgs[idx]]
                                                                        handleInputChange('about_hotel_images', imgs)
                                                                    }}
                                                                    className="cursor-pointer text-white bg-black/50 hover:bg-black/70 disabled:opacity-30 rounded-lg px-2 py-1 text-xs font-bold transition-all"
                                                                >→</button>
                                                            </div>
                                                            {/* remove */}
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const imgs = (formData.about_hotel_images || []).filter((_, i) => i !== idx)
                                                                    handleInputChange('about_hotel_images', imgs)
                                                                }}
                                                                className="cursor-pointer w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                                                            >×</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {/* Append more images */}
                                        <ImageUpload
                                            label=""
                                            multiple={true}
                                            existingImages={[]}
                                            onUploadComplete={(urls) => handleInputChange('about_hotel_images', [...(formData.about_hotel_images || []), ...urls])}
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Hover a thumbnail to reorder with ← → or remove with ×. Minimum 4 images required.</p>
                                    </div>

                                    <ImageUpload
                                        label="Essential Information Image *"
                                        multiple={false}
                                        existingImages={formData.essential_information_image ? [formData.essential_information_image] : []}
                                        onUploadComplete={(urls) => handleInputChange('essential_information_image', urls[0] || '')}
                                    />

                                    <ImageUpload
                                        label="Traveler Tips Image *"
                                        multiple={false}
                                        existingImages={formData.traveler_tips_image ? [formData.traveler_tips_image] : []}
                                        onUploadComplete={(urls) => handleInputChange('traveler_tips_image', urls[0] || '')}
                                    />

                                    <ImageUpload
                                        label="Hotel Cloud Image *"
                                        multiple={false}
                                        existingImages={formData.hotel_cloud_image ? [formData.hotel_cloud_image] : []}
                                        onUploadComplete={(urls) => handleInputChange('hotel_cloud_image', urls[0] || '')}
                                    />

                                    {/* Highlights Descriptions */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Highlights Descriptions <span className="text-red-600">*</span>
                                        </label>
                                        <div className="grid grid-cols-1 gap-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Waterpolo</label>
                                                <textarea
                                                    value={formData.highlights?.waterpolo || ''}
                                                    onChange={(e) => handleInputChange('highlights', {
                                                        ...formData.highlights,
                                                        waterpolo: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                    rows={2}
                                                    placeholder="e.g., Unlimited access to the Middle East's largest waterpark"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Underwater Suites</label>
                                                <textarea
                                                    value={formData.highlights?.underwater_suites || ''}
                                                    onChange={(e) => handleInputChange('highlights', {
                                                        ...formData.highlights,
                                                        underwater_suites: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                    rows={2}
                                                    placeholder="e.g., Experience the world's first underwater suites"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Dining Option</label>
                                                <textarea
                                                    value={formData.highlights?.dining_option || ''}
                                                    onChange={(e) => handleInputChange('highlights', {
                                                        ...formData.highlights,
                                                        dining_option: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                    rows={2}
                                                    placeholder="e.g., Choose from a variety of dining options"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Beach</label>
                                                <textarea
                                                    value={formData.highlights?.beach || ''}
                                                    onChange={(e) => handleInputChange('highlights', {
                                                        ...formData.highlights,
                                                        beach: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                    rows={2}
                                                    placeholder="e.g., Enjoy the beautiful beach with crystal-clear waters"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Smile</label>
                                                <textarea
                                                    value={formData.highlights?.smile || ''}
                                                    onChange={(e) => handleInputChange('highlights', {
                                                        ...formData.highlights,
                                                        smile: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                    rows={2}
                                                    placeholder="e.g., Exceptional service that makes you smile"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Bed</label>
                                                <textarea
                                                    value={formData.highlights?.bed || ''}
                                                    onChange={(e) => handleInputChange('highlights', {
                                                        ...formData.highlights,
                                                        bed: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                    rows={2}
                                                    placeholder="e.g., Luxurious beds for ultimate comfort"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* About Hotel */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            About Hotel <span className="text-red-600">*</span>
                                        </label>
                                        <textarea
                                            value={formData.about_hotel || ''}
                                            onChange={(e) => handleInputChange('about_hotel', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent"
                                            rows={6}
                                            placeholder="Enter detailed description about the hotel..."
                                            required
                                        />
                                    </div>

                                    {/* Optional Fields */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                                            <input
                                                type="text"
                                                value={formData.location || ''}
                                                onChange={(e) => handleInputChange('location', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Beach</label>
                                            <input
                                                type="text"
                                                value={formData.beach || ''}
                                                onChange={(e) => handleInputChange('beach', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent"
                                            />
                                        </div>
                                    </div>


                                    <div className="grid grid-cols-2 gap-4">

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating Description</label>
                                            <input
                                                type="text"
                                                value={formData.rating_desc || ''}
                                                onChange={(e) => handleInputChange('rating_desc', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Facilities</label>
                                            <input
                                                value={formData.facilities || ''}
                                                onChange={(e) => handleInputChange('facilities', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (0–5)</label>
                                            {/* Star picker */}
                                            <div className="flex items-center gap-1 mb-1">
                                                {[1, 2, 3, 4, 5].map((star) => {
                                                    const val = formData.rating ?? 0
                                                    const filled = val >= star
                                                    const half = !filled && val >= star - 0.5
                                                    return (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => handleInputChange('rating', val === star ? star - 0.5 : star)}
                                                            title={`${star} stars`}
                                                            className="cursor-pointer p-0.5 transition-transform hover:scale-110"
                                                        >
                                                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                                                                {/* full fill */}
                                                                {filled && (
                                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#F8A900" />
                                                                )}
                                                                {/* half fill */}
                                                                {half && (
                                                                    <>
                                                                        <defs>
                                                                            <linearGradient id={`half-${star}`}>
                                                                                <stop offset="50%" stopColor="#F8A900" />
                                                                                <stop offset="50%" stopColor="#E5E7EB" />
                                                                            </linearGradient>
                                                                        </defs>
                                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`url(#half-${star})`} />
                                                                    </>
                                                                )}
                                                                {/* empty */}
                                                                {!filled && !half && (
                                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#E5E7EB" />
                                                                )}
                                                                {/* outline */}
                                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#D1D5DB" strokeWidth="0.5" fill="none" />
                                                            </svg>
                                                        </button>
                                                    )
                                                })}
                                                <span className="ml-2 text-sm font-semibold text-gray-700">{formData.rating?.toFixed(1) ?? '—'}</span>
                                            </div>
                                            <p className="text-xs text-gray-400">Click a star to set rating. Click again for half star.</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Reviews</label>
                                            <input
                                                type="number"
                                                value={formData.reviews || ''}
                                                onChange={(e) => handleInputChange('reviews', parseInt(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (per night)</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={formData.price || ''}
                                                onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent"
                                                placeholder="e.g., 250"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Check Rates Link</label>
                                            <input
                                                type="url"
                                                value={formData.check_rates_link || ''}
                                                onChange={(e) => handleInputChange('check_rates_link', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">View Rooms Link</label>
                                            <input
                                                type="url"
                                                value={formData.view_rooms_link || ''}
                                                onChange={(e) => handleInputChange('view_rooms_link', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Rooms Link</label>
                                        <input
                                            type="url"
                                            value={formData.rooms_link || ''}
                                            onChange={(e) => handleInputChange('rooms_link', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Essential Information
                                        </label>
                                        <div className="grid grid-cols-2 gap-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Check-in / Check-out</label>
                                                <input
                                                    type="text"
                                                    value={formData.essential_information?.checkin_checkout || ''}
                                                    onChange={(e) => handleInputChange('essential_information', {
                                                        ...formData.essential_information,
                                                        checkin_checkout: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                    placeholder="e.g., Check-in: 3 PM, Check-out: 11 AM"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Location & Distance</label>
                                                <input
                                                    type="text"
                                                    value={formData.essential_information?.location_distance || ''}
                                                    onChange={(e) => handleInputChange('essential_information', {
                                                        ...formData.essential_information,
                                                        location_distance: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                    placeholder="e.g., 5 km from city center"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Price Range</label>
                                                <input
                                                    type="text"
                                                    value={formData.essential_information?.price_range || ''}
                                                    onChange={(e) => handleInputChange('essential_information', {
                                                        ...formData.essential_information,
                                                        price_range: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                    placeholder="e.g., $100 - $300 per night"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Beach Access</label>
                                                <input
                                                    type="text"
                                                    value={formData.essential_information?.beach_access || ''}
                                                    onChange={(e) => handleInputChange('essential_information', {
                                                        ...formData.essential_information,
                                                        beach_access: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                    placeholder="e.g., Private beach, 2 min walk"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Dining Options</label>
                                                <input
                                                    type="text"
                                                    value={formData.essential_information?.dining_options || ''}
                                                    onChange={(e) => handleInputChange('essential_information', {
                                                        ...formData.essential_information,
                                                        dining_options: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                    placeholder="e.g., 3 restaurants, room service"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Family Facilities</label>
                                                <input
                                                    type="text"
                                                    value={formData.essential_information?.family_facilities || ''}
                                                    onChange={(e) => handleInputChange('essential_information', {
                                                        ...formData.essential_information,
                                                        family_facilities: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                    placeholder="e.g., Kids club, playground"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">WiFi Availability</label>
                                                <input
                                                    type="text"
                                                    value={formData.essential_information?.wifi_availability || ''}
                                                    onChange={(e) => handleInputChange('essential_information', {
                                                        ...formData.essential_information,
                                                        wifi_availability: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                    placeholder="e.g., Free WiFi in all areas"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Parking Availability</label>
                                                <input
                                                    type="text"
                                                    value={formData.essential_information?.parking_availability || ''}
                                                    onChange={(e) => handleInputChange('essential_information', {
                                                        ...formData.essential_information,
                                                        parking_availability: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                    placeholder="e.g., Free on-site parking"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Traveler Tips
                                        </label>
                                        <div className="space-y-2">
                                            {(formData.traveler_tips || []).map((tip, index) => (
                                                <div key={index} className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={tip}
                                                        onChange={(e) => {
                                                            const newTips = [...(formData.traveler_tips || [])]
                                                            newTips[index] = e.target.value
                                                            handleInputChange('traveler_tips', newTips)
                                                        }}
                                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent"
                                                        placeholder="Enter a traveler tip"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newTips = (formData.traveler_tips || []).filter((_, i) => i !== index)
                                                            handleInputChange('traveler_tips', newTips)
                                                        }}
                                                        className="cursor-pointer px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newTips = [...(formData.traveler_tips || []), '']
                                                    handleInputChange('traveler_tips', newTips)
                                                }}
                                                className="cursor-pointer w-full px-4 py-2 border-2 border-dashed border-gray-300 hover:border-blue-500 text-gray-600 hover:text-blue-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                            >
                                                <span className="text-xl">+</span> Add Tip
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            FAQs
                                        </label>
                                        <div className="space-y-4">
                                            {(formData.faqs || []).map((faq, index) => (
                                                <div key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <span className="text-sm font-semibold text-gray-600">FAQ #{index + 1}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newFaqs = (formData.faqs || []).filter((_, i) => i !== index)
                                                                handleInputChange('faqs', newFaqs)
                                                            }}
                                                            className="cursor-pointer px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-bold transition-colors"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Question</label>
                                                            <input
                                                                type="text"
                                                                value={faq.question}
                                                                onChange={(e) => {
                                                                    const newFaqs = [...(formData.faqs || [])]
                                                                    newFaqs[index] = { ...newFaqs[index], question: e.target.value }
                                                                    handleInputChange('faqs', newFaqs)
                                                                }}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                                placeholder="Enter question"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Answer</label>
                                                            <textarea
                                                                value={faq.answer}
                                                                onChange={(e) => {
                                                                    const newFaqs = [...(formData.faqs || [])]
                                                                    newFaqs[index] = { ...newFaqs[index], answer: e.target.value }
                                                                    handleInputChange('faqs', newFaqs)
                                                                }}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                                rows={3}
                                                                placeholder="Enter answer"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newFaqs = [...(formData.faqs || []), { question: '', answer: '' }]
                                                    handleInputChange('faqs', newFaqs)
                                                }}
                                                className="cursor-pointer w-full px-4 py-2 border-2 border-dashed border-gray-300 hover:border-blue-500 text-gray-600 hover:text-blue-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                            >
                                                <span className="text-xl">+</span> Add FAQ
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Rooms
                                        </label>
                                        <div className="space-y-4">
                                            {(formData.rooms || []).map((room, index) => (
                                                <div key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <span className="text-sm font-semibold text-gray-600">Room #{index + 1}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newRooms = (formData.rooms || []).filter((_, i) => i !== index)
                                                                handleInputChange('rooms', newRooms)
                                                            }}
                                                            className="cursor-pointer px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-bold transition-colors"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="col-span-2">
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Room Image URL</label>
                                                            <input
                                                                type="text"
                                                                value={room.image || ''}
                                                                onChange={(e) => {
                                                                    const newRooms = [...(formData.rooms || [])]
                                                                    newRooms[index] = { ...newRooms[index], image: e.target.value }
                                                                    handleInputChange('rooms', newRooms)
                                                                }}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                                placeholder="Enter image URL"
                                                            />
                                                        </div>
                                                        <div className="col-span-2">
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Room Title *</label>
                                                            <input
                                                                type="text"
                                                                value={room.title}
                                                                onChange={(e) => {
                                                                    const newRooms = [...(formData.rooms || [])]
                                                                    newRooms[index] = { ...newRooms[index], title: e.target.value }
                                                                    handleInputChange('rooms', newRooms)
                                                                }}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                                placeholder="e.g., Deluxe Ocean View Suite"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Size</label>
                                                            <input
                                                                type="text"
                                                                value={room.size || ''}
                                                                onChange={(e) => {
                                                                    const newRooms = [...(formData.rooms || [])]
                                                                    newRooms[index] = { ...newRooms[index], size: e.target.value }
                                                                    handleInputChange('rooms', newRooms)
                                                                }}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                                placeholder="e.g., 45 sqm"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Bed Type</label>
                                                            <input
                                                                type="text"
                                                                value={room.bed_type || ''}
                                                                onChange={(e) => {
                                                                    const newRooms = [...(formData.rooms || [])]
                                                                    newRooms[index] = { ...newRooms[index], bed_type: e.target.value }
                                                                    handleInputChange('rooms', newRooms)
                                                                }}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                                placeholder="e.g., King bed"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">View</label>
                                                            <input
                                                                type="text"
                                                                value={room.view || ''}
                                                                onChange={(e) => {
                                                                    const newRooms = [...(formData.rooms || [])]
                                                                    newRooms[index] = { ...newRooms[index], view: e.target.value }
                                                                    handleInputChange('rooms', newRooms)
                                                                }}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                                placeholder="e.g., Ocean view"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Ventilation</label>
                                                            <input
                                                                type="text"
                                                                value={room.ventilation || ''}
                                                                onChange={(e) => {
                                                                    const newRooms = [...(formData.rooms || [])]
                                                                    newRooms[index] = { ...newRooms[index], ventilation: e.target.value }
                                                                    handleInputChange('rooms', newRooms)
                                                                }}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                                placeholder="e.g., Air conditioning"
                                                            />
                                                        </div>
                                                        <div className="col-span-2">
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">Details Link</label>
                                                            <input
                                                                type="url"
                                                                value={room.link || ''}
                                                                onChange={(e) => {
                                                                    const newRooms = [...(formData.rooms || [])]
                                                                    newRooms[index] = { ...newRooms[index], link: e.target.value }
                                                                    handleInputChange('rooms', newRooms)
                                                                }}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent bg-white"
                                                                placeholder="Enter link to room details"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newRooms = [...(formData.rooms || []), { title: '', image: '', size: '', bed_type: '', view: '', ventilation: '', link: '' }]
                                                    handleInputChange('rooms', newRooms)
                                                }}
                                                className="cursor-pointer w-full px-4 py-2 border-2 border-dashed border-gray-300 hover:border-blue-500 text-gray-600 hover:text-blue-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                            >
                                                <span className="text-xl">+</span> Add Room
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="cursor-pointer px-5 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-medium text-sm transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="cursor-pointer px-5 py-2.5 bg-[#0D7FF2] hover:bg-[#0B6FD9] text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200"
                                    >
                                        {editingHotel ? 'Update Hotel' : 'Create Hotel'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    )
}
