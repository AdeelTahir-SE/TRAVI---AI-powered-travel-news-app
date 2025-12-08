'use client'
import Image from 'next/image'
import { useState } from 'react'
import { uploadImage, uploadMultipleImages } from '@/utils/storage'

interface ImageUploadProps {
    multiple?: boolean
    onUploadComplete: (urls: string[]) => void
    existingImages?: string[]
    label?: string
    bucket?: string
    folder?: string
}

export default function ImageUpload({
    multiple = false,
    onUploadComplete,
    existingImages = [],
    label = 'Upload Images',
    bucket = 'hotel-images',
    folder = 'images'
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [previews, setPreviews] = useState<string[]>(existingImages)
    const [uploadProgress, setUploadProgress] = useState(0)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        // Validate file types
        const validFiles = Array.from(files).filter(file => {
            const isImage = file.type.startsWith('image/')
            const isUnder10MB = file.size <= 10 * 1024 * 1024 // 10MB limit

            if (!isImage) {
                alert(`${file.name} is not an image file`)
                return false
            }
            if (!isUnder10MB) {
                alert(`${file.name} is too large. Maximum size is 10MB`)
                return false
            }
            return true
        })

        if (validFiles.length === 0) return

        setUploading(true)
        setUploadProgress(0)

        try {
            let uploadedUrls: string[]

            if (multiple) {
                // Upload multiple images
                uploadedUrls = await uploadMultipleImages(validFiles, bucket, folder)
                setUploadProgress(100)
            } else {
                // Upload single image
                const url = await uploadImage(validFiles[0], bucket, folder)
                uploadedUrls = url ? [url] : []
                setUploadProgress(100)
            }

            if (uploadedUrls.length > 0) {
                const newPreviews = multiple
                    ? [...previews, ...uploadedUrls]
                    : uploadedUrls

                setPreviews(newPreviews)
                onUploadComplete(newPreviews)
            } else {
                alert(uploadedUrls)
                alert('Failed to upload images. Please try again.')
            }
        } catch (error) {
            console.error('Upload error:', error)
            alert('An error occurred during upload')
        } finally {
            setUploading(false)
            setUploadProgress(0)
            // Reset file input
            e.target.value = ''
        }
    }

    const handleRemoveImage = (index: number) => {
        const newPreviews = previews.filter((_, i) => i !== index)
        setPreviews(newPreviews)
        onUploadComplete(newPreviews)
    }

    return (
        <div className="space-y-3 ">
            <label className="block text-sm font-semibold text-gray-700">
                {label}
            </label>

            {/* Upload Button */}
            <div className="flex items-center gap-3">
                <label className="cursor-pointer">
                    <div className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        {uploading ? 'Uploading...' : multiple ? 'Choose Images' : 'Choose Image'}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        multiple={multiple}
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="hidden"
                    />
                </label>

                {uploading && (
                    <div className="flex-1 max-w-xs">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Image Previews */}
            {previews.length > 0 && (
                < div className="relative z-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                    {previews.map((url, index) => (
                        <div key={index} className="relative group">
                            <Image
                                width={500}
                                height={500}
                                src={url}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )
            }

            <p className="text-xs text-gray-500">
                {multiple ? 'You can upload multiple images. ' : 'Upload a single image. '}
                Maximum file size: 10MB. Supported formats: JPG, PNG, GIF, WebP
            </p>
        </div >
    )
}
