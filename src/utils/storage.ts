import { supabase } from './supabase'

/**
 * Upload a single image to Supabase storage
 * @param file - The file to upload
 * @param bucket - The storage bucket name
 * @param folder - Optional folder path within the bucket
 * @returns Public URL of the uploaded image or null if failed
 */
export async function uploadImage(
    file: File,
    bucket: string = 'hotel-images',
    folder: string = ''
): Promise<string | null> {
    try {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
        const filePath = folder ? `${folder}/${fileName}` : fileName

        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (error) {
            console.error('Error uploading image:', error)
            return null
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(data.path)

        return publicUrl
    } catch (error) {
        console.error('Error in uploadImage:', error)
        return null
    }
}

/**
 * Upload multiple images to Supabase storage
 * @param files - Array of files to upload
 * @param bucket - The storage bucket name
 * @param folder - Optional folder path within the bucket
 * @returns Array of public URLs for uploaded images
 */
export async function uploadMultipleImages(
    files: File[],
    bucket: string = 'hotel-images',
    folder: string = ''
): Promise<string[]> {
    const uploadPromises = files.map(file => uploadImage(file, bucket, folder))
    const results = await Promise.all(uploadPromises)
    return results.filter((url): url is string => url !== null)
}

/**
 * Delete an image from Supabase storage
 * @param url - The public URL of the image to delete
 * @param bucket - The storage bucket name
 * @returns True if successful, false otherwise
 */
export async function deleteImage(
    url: string,
    bucket: string = 'hotel-images'
): Promise<boolean> {
    try {
        // Extract the file path from the public URL
        const urlParts = url.split(`${bucket}/`)
        if (urlParts.length < 2) {
            console.error('Invalid URL format')
            return false
        }

        const filePath = urlParts[1]

        const { error } = await supabase.storage
            .from(bucket)
            .remove([filePath])

        if (error) {
            console.error('Error deleting image:', error)
            return false
        }

        return true
    } catch (error) {
        console.error('Error in deleteImage:', error)
        return false
    }
}

/**
 * Delete multiple images from Supabase storage
 * @param urls - Array of public URLs to delete
 * @param bucket - The storage bucket name
 * @returns Number of successfully deleted images
 */
export async function deleteMultipleImages(
    urls: string[],
    bucket: string = 'hotel-images'
): Promise<number> {
    const deletePromises = urls.map(url => deleteImage(url, bucket))
    const results = await Promise.all(deletePromises)
    return results.filter(success => success).length
}
