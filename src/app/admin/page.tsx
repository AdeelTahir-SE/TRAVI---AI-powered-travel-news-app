'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { Hotel } from '@/utils/types'

export default function AdminPage() {
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
            title: '',
            tagline: '',
            about_hotel_images: [],
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

        if (!formData.title || !formData.tagline) {
            alert('Title and tagline are required!')
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
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Hotel Management</h1>
                    <button
                        onClick={handleCreate}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        + Create New Hotel
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading hotels...</p>
                    </div>
                ) : hotels.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-600 text-lg">No hotels found. Create your first hotel!</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {hotels.map((hotel) => (
                            <div key={hotel.hotel_id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{hotel.title}</h2>
                                        <p className="text-gray-600 mb-3">{hotel.tagline}</p>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
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
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleEdit(hotel)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(hotel.hotel_id)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingHotel ? 'Edit Hotel' : 'Create New Hotel'}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
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
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Beach</label>
                                            <input
                                                type="text"
                                                value={formData.beach || ''}
                                                onChange={(e) => handleInputChange('beach', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating (0-5)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                min="0"
                                                max="5"
                                                value={formData.rating || ''}
                                                onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Reviews</label>
                                            <input
                                                type="number"
                                                value={formData.reviews || ''}
                                                onChange={(e) => handleInputChange('reviews', parseInt(e.target.value))}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Rating Description</label>
                                        <input
                                            type="text"
                                            value={formData.rating_desc || ''}
                                            onChange={(e) => handleInputChange('rating_desc', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Facilities</label>
                                        <textarea
                                            value={formData.facilities || ''}
                                            onChange={(e) => handleInputChange('facilities', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            rows={3}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Check Rooms Link</label>
                                            <input
                                                type="url"
                                                value={formData.check_rooms_link || ''}
                                                onChange={(e) => handleInputChange('check_rooms_link', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">View Rooms Link</label>
                                            <input
                                                type="url"
                                                value={formData.view_rooms_link || ''}
                                                onChange={(e) => handleInputChange('view_rooms_link', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Rooms Link</label>
                                        <input
                                            type="url"
                                            value={formData.rooms_link || ''}
                                            onChange={(e) => handleInputChange('rooms_link', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Hotel Image in Clouds (URL)</label>
                                        <input
                                            type="url"
                                            value={formData.hotel_image_in_clouds || ''}
                                            onChange={(e) => handleInputChange('hotel_image_in_clouds', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            About Hotel Images (comma-separated URLs)
                                        </label>
                                        <textarea
                                            value={formData.about_hotel_images?.join(', ') || ''}
                                            onChange={(e) => handleArrayInput('about_hotel_images', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            rows={3}
                                            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Essential Information (comma-separated)
                                        </label>
                                        <textarea
                                            value={formData.essential_information?.join(', ') || ''}
                                            onChange={(e) => handleArrayInput('essential_information', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            rows={3}
                                            placeholder="Check-in: 3 PM, Check-out: 11 AM, Free WiFi"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Traveler Tips (comma-separated)
                                        </label>
                                        <textarea
                                            value={formData.traveler_tips?.join(', ') || ''}
                                            onChange={(e) => handleArrayInput('traveler_tips', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            rows={3}
                                            placeholder="Book early for best rates, Request ocean view rooms"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        {editingHotel ? 'Update Hotel' : 'Create Hotel'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}