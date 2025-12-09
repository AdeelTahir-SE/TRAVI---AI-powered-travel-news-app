'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { Hotel } from '@/utils/types'
import ImageUpload from '@/components/admin/ImageUpload'

export default function HotelsPage() {
    const [hotels, setHotels] = useState<Hotel[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingHotel, setEditingHotel] = useState<Hotel | null>(null)
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
            alert('Failed to fetch hotels: ' + error.message)
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
        if (!confirm('Are you sure you want to delete this hotel?')) return

        const { error } = await supabase
            .from('hotel')
            .delete()
            .eq('hotel_id', hotelId)

        if (error) {
            console.error('Error deleting hotel:', error)
            alert('Failed to delete hotel: ' + error.message)
        } else {
            alert('Hotel deleted successfully!')
            fetchHotels()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate required fields
        if (!formData.title || !formData.tagline) {
            alert('Title and tagline are required!')
            return
        }

        if (!formData.about_hotel || formData.about_hotel.trim() === '') {
            alert('About Hotel description is required!')
            return
        }

        if (!formData.about_hotel_images || formData.about_hotel_images.length < 4) {
            alert('At least 4 About Hotel images are required!')
            return
        }

        if (!formData.essential_information_image) {
            alert('Essential Information Image is required!')
            return
        }

        if (!formData.traveler_tips_image) {
            alert('Traveler Tips Image is required!')
            return
        }

        if (!formData.hotel_cloud_image) {
            alert('Hotel Cloud Image is required!')
            return
        }

        // Validate all highlight descriptions are filled
        if (!formData.highlights?.waterpolo || !formData.highlights?.underwater_suites ||
            !formData.highlights?.dining_option || !formData.highlights?.beach ||
            !formData.highlights?.smile || !formData.highlights?.bed) {
            alert('All highlight descriptions (Waterpolo, Underwater Suites, Dining Option, Beach, Smile, Bed) are required!')
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
                alert('Failed to update hotel: ' + error.message)
            } else {
                alert('Hotel updated successfully!')
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
                alert('Failed to create hotel: ' + error.message)
            } else {
                alert('Hotel created successfully!')
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
        <div className="min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Hotel Management</h1>
                    <button
                        onClick={handleCreate}
                        className="bg-[#0D7FF2] hover:bg-[#0B6FD9] active:bg-[#0956B8] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full sm:w-auto"
                    >
                        + Create New Hotel
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#0D7FF2] border-t-transparent"></div>
                        <p className="mt-4 text-gray-600 font-medium">Loading hotels...</p>
                    </div>
                ) : hotels.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl shadow-md">
                        <p className="text-gray-600 text-lg">No hotels found. Create your first hotel!</p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:gap-6">
                        {hotels.map((hotel) => (
                            <div key={hotel.hotel_id} className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                                    <div className="flex-1 w-full">
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{hotel.title}</h2>
                                        <p className="text-gray-600 mb-3">{hotel.tagline}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                                            {hotel.location && (
                                                <div>
                                                    <span className="font-semibold text-gray-700">Location:</span>
                                                    <span className="ml-2 text-gray-600">{hotel.location}</span>
                                                </div>
                                            )}
                                            {hotel.rating && (
                                                <div>
                                                    <span className="font-semibold text-gray-700">Rating:</span>
                                                    <span className="ml-2 text-gray-600">{hotel.rating} / 5</span>
                                                </div>
                                            )}
                                            {hotel.reviews && (
                                                <div>
                                                    <span className="font-semibold text-gray-700">Reviews:</span>
                                                    <span className="ml-2 text-gray-600">{hotel.reviews}</span>
                                                </div>
                                            )}
                                            {hotel.beach && (
                                                <div>
                                                    <span className="font-semibold text-gray-700">Beach:</span>
                                                    <span className="ml-2 text-gray-600">{hotel.beach}</span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Show images if available */}
                                        {hotel.about_hotel_images && hotel.about_hotel_images.length > 0 && (
                                            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                                                {hotel.about_hotel_images.slice(0, 3).map((img, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={img}
                                                        alt={`${hotel.title} ${idx + 1}`}
                                                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                                                    />
                                                ))}
                                                {hotel.about_hotel_images.length > 3 && (
                                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-gray-600 text-sm font-semibold flex-shrink-0">
                                                        +{hotel.about_hotel_images.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto">
                                        <button
                                            onClick={() => handleEdit(hotel)}
                                            className="flex-1 lg:flex-none bg-green-600 hover:bg-green-700 active:bg-green-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(hotel.hotel_id)}
                                            className="flex-1 lg:flex-none bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal for Create/Edit */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
                            <div className="sticky z-20 top-0 bg-gradient-to-r from-white to-blue-50 border-b border-[#0D7FF2]/20 px-4 sm:px-6 py-4 flex justify-between items-center">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    {editingHotel ? 'Edit Hotel' : 'Create New Hotel'}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="cursor-pointer text-gray-500 hover:text-red-600 text-3xl font-bold cursor-pointer transition-colors w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50"
                                    aria-label="Close modal"
                                >
                                    ×
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

                                    <ImageUpload
                                        label="About Hotel Images (Minimum 4) *"
                                        multiple={true}
                                        existingImages={formData.about_hotel_images || []}
                                        onUploadComplete={(urls) => handleInputChange('about_hotel_images', urls)}
                                    />

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
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (0-5)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="5"
                                                value={formData.rating || ''}
                                                onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0D7FF2] focus:border-transparent"
                                            />
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

                                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="cursor-pointer px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="cursor-pointer px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
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
