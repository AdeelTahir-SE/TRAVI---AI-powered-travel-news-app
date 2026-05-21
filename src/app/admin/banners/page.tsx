'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { Banner, BannerZone } from '@/utils/types'
import ImageUpload from '@/components/admin/ImageUpload'
import { useToast } from '@/components/admin/Toaster'
import { AdminPageSkeleton } from '@/components/Skeletons'
import Image from 'next/image'
import Link from 'next/link'

// Maps each zone to the most relevant existing public page where that banner renders
const ZONE_PREVIEW_PAGE: Record<BannerZone, string> = {
    'header':     '/',        // header banner appears on the homepage hero
    'sidebar':    '/search',  // sidebar banner appears on the search/explore page
    'in-content': '/search',  // in-content banner appears within article/search listings
    'footer':     '/',        // footer banner appears on every page — homepage is best preview
}

const ZONE_OPTIONS: { value: BannerZone; label: string; color: string; bg: string }[] = [
    { value: 'header',     label: 'Header',     color: 'text-purple-700', bg: 'bg-purple-100' },
    { value: 'sidebar',    label: 'Sidebar',    color: 'text-blue-700',   bg: 'bg-blue-100'   },
    { value: 'in-content', label: 'In-Content', color: 'text-emerald-700',bg: 'bg-emerald-100'},
    { value: 'footer',     label: 'Footer',     color: 'text-orange-700', bg: 'bg-orange-100' },
]

const EMPTY_FORM: Partial<Banner> = {
    title: '',
    zone: 'header',
    image: '',
    link: '',
    start_date: '',
    end_date: '',
    active: true,
}

function ZoneBadge({ zone }: { zone: BannerZone }) {
    const opt = ZONE_OPTIONS.find(o => o.value === zone)
    return (
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${opt?.bg} ${opt?.color}`}>
            {opt?.label ?? zone}
        </span>
    )
}

function StatusBadge({ active }: { active: boolean }) {
    return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
            active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
        }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-green-500' : 'bg-gray-400'}`} />
            {active ? 'Active' : 'Inactive'}
        </span>
    )
}

export default function BannersAdminPage() {
    const { toast } = useToast()
    const [banners, setBanners] = useState<Banner[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)
    const [formData, setFormData] = useState<Partial<Banner>>(EMPTY_FORM)
    const [saving, setSaving] = useState(false)

    /* ── fetch ──────────────────────────────────────────────────────── */
    const fetchBanners = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('banner')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            toast('Failed to fetch banners: ' + error.message, 'error')
        } else {
            setBanners(data || [])
        }
        setLoading(false)
    }

    useEffect(() => { fetchBanners() }, [])

    /* ── helpers ────────────────────────────────────────────────────── */
    const openCreate = () => {
        setEditingBanner(null)
        setFormData(EMPTY_FORM)
        setShowModal(true)
    }

    const openEdit = (banner: Banner) => {
        setEditingBanner(banner)
        setFormData({
            ...banner,
            start_date: banner.start_date?.split('T')[0] ?? '',
            end_date:   banner.end_date?.split('T')[0]   ?? '',
        })
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setEditingBanner(null)
    }

    const set = <K extends keyof Banner>(field: K, value: Banner[K]) =>
        setFormData(prev => ({ ...prev, [field]: value }))

    /* ── submit ─────────────────────────────────────────────────────── */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.title?.trim()) { toast('Title is required!', 'error'); return }
        if (!formData.image?.trim()) { toast('Please upload a banner image!', 'error'); return }
        if (!formData.link?.trim())  { toast('Link is required!', 'error'); return }

        setSaving(true)
        const payload = {
            title:      formData.title,
            zone:       formData.zone,
            image:      formData.image,
            link:       formData.link,
            start_date: formData.start_date || null,
            end_date:   formData.end_date   || null,
            active:     formData.active ?? true,
        }

        if (editingBanner) {
            const { error } = await supabase
                .from('banner')
                .update(payload)
                .eq('banner_id', editingBanner.banner_id)
            if (error) { toast('Update failed: ' + error.message, 'error') }
            else       { toast('Banner updated!', 'success'); closeModal(); fetchBanners() }
        } else {
            const { error } = await supabase.from('banner').insert([payload])
            if (error) { toast('Create failed: ' + error.message, 'error') }
            else       { toast('Banner created!', 'success'); closeModal(); fetchBanners() }
        }
        setSaving(false)
    }

    /* ── delete ─────────────────────────────────────────────────────── */
    const handleDelete = async (id: number) => {
        const { error } = await supabase.from('banner').delete().eq('banner_id', id)
        if (error) { toast('Delete failed: ' + error.message, 'error') }
        else       { toast('Banner deleted!', 'success'); setDeleteConfirmId(null); fetchBanners() }
    }

    /* ── toggle active ──────────────────────────────────────────────── */
    const toggleActive = async (banner: Banner) => {
        const { error } = await supabase
            .from('banner')
            .update({ active: !banner.active })
            .eq('banner_id', banner.banner_id)
        if (error) { toast('Toggle failed: ' + error.message, 'error') }
        else       { fetchBanners() }
    }

    /* ── render ─────────────────────────────────────────────────────── */
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                    <div>
                        <h1 className="font-manrope font-extrabold text-[30px] leading-none tracking-[-0.03em] text-[#112259]">
                            Banners
                        </h1>
                        <p className="text-gray-500 text-sm mt-1 font-inter">
                            Manage site-wide advertising and promotional banners.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Preview site link */}
                        <Link
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer flex items-center gap-2 border border-[#112259]/20 text-[#112259] hover:bg-[#112259] hover:text-white px-4 py-2.5 rounded-[14px] font-semibold text-sm font-manrope transition-all duration-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Preview Site
                        </Link>
                        <button
                            onClick={openCreate}
                            className="cursor-pointer flex items-center gap-2 bg-[#F8A900] hover:bg-[#e09800] text-black px-5 py-2.5 rounded-[14px] font-bold text-sm font-manrope shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Banner
                        </button>
                    </div>
                </div>

                {/* Zone summary pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {ZONE_OPTIONS.map(zone => {
                        const count  = banners.filter(b => b.zone === zone.value).length
                        const active = banners.filter(b => b.zone === zone.value && b.active).length
                        return (
                            <div key={zone.value} className="bg-white rounded-2xl shadow-[4px_4px_30px_0px_#00000018] p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${zone.color}`}>{zone.label}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${zone.bg} ${zone.color}`}>{count}</span>
                                </div>
                                <p className="text-2xl font-extrabold text-[#112259] font-manrope">{active}</p>
                                <p className="text-xs text-gray-400 mt-0.5">active banner{active !== 1 ? 's' : ''}</p>
                            </div>
                        )
                    })}
                </div>

                {/* Banner list */}
                {loading ? (
                    <AdminPageSkeleton count={4} />
                ) : banners.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-[25px] shadow-[9px_9px_75px_0px_#00000029]">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-medium">No banners yet</p>
                        <p className="text-gray-400 text-sm mt-1">Create your first banner to get started.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {banners.map(banner => (
                            <div
                                key={banner.banner_id}
                                className="bg-white rounded-[20px] shadow-[9px_9px_75px_0px_#00000029] overflow-hidden hover:shadow-[9px_9px_100px_0px_#00000040] transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <div className="flex flex-col sm:flex-row">
                                    {/* Thumbnail */}
                                    <div className="relative sm:w-48 h-32 sm:h-auto flex-shrink-0 bg-gray-100">
                                        {banner.image ? (
                                            <Image
                                                src={banner.image}
                                                alt={banner.title}
                                                fill
                                                className="object-cover"
                                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                <ZoneBadge zone={banner.zone} />
                                                <StatusBadge active={banner.active} />
                                            </div>
                                            <h2 className="font-manrope font-extrabold text-[15px] text-[#112259] truncate mb-1">
                                                {banner.title}
                                            </h2>
                                            <p className="text-xs text-gray-400 truncate mb-2 font-inter">{banner.link}</p>
                                            {(banner.start_date || banner.end_date) && (
                                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {banner.start_date ? new Date(banner.start_date).toLocaleDateString() : '—'}
                                                    {' → '}
                                                    {banner.end_date   ? new Date(banner.end_date).toLocaleDateString()   : 'ongoing'}
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {/* View on site — opens the page where this zone's banner renders */}
                                            <Link
                                                href={ZONE_PREVIEW_PAGE[banner.zone]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title={`View ${banner.zone} zone on site`}
                                                className="cursor-pointer w-9 h-9 rounded-xl flex items-center justify-center bg-[#112259]/8 text-[#112259] hover:bg-[#112259] hover:text-white transition-all duration-200"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </Link>

                                            {/* Toggle */}
                                            <button
                                                onClick={() => toggleActive(banner)}
                                                title={banner.active ? 'Deactivate' : 'Activate'}
                                                className={`cursor-pointer w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                                                    banner.active
                                                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                                }`}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={banner.active ? 'M5 13l4 4L19 7' : 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636'} />
                                                </svg>
                                            </button>

                                            <button
                                                onClick={() => openEdit(banner)}
                                                className="cursor-pointer flex items-center gap-1.5 bg-[#F8A900] hover:bg-[#e09800] text-black px-4 py-2 rounded-xl text-sm font-bold font-manrope transition-all duration-200"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </button>

                                            {deleteConfirmId === banner.banner_id ? (
                                                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-1.5">
                                                    <span className="text-xs text-red-600 font-medium whitespace-nowrap">Sure?</span>
                                                    <button
                                                        onClick={() => handleDelete(banner.banner_id)}
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
                                                    onClick={() => setDeleteConfirmId(banner.banner_id)}
                                                    className="cursor-pointer flex items-center gap-1.5 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Create / Edit Modal ──────────────────────────────── */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl shadow-[9px_9px_75px_0px_#00000029] max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Modal header */}
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h2 className="font-manrope font-extrabold text-[20px] tracking-tight text-[#112259]">
                                    {editingBanner ? 'Edit Banner' : 'New Banner'}
                                </h2>
                                <p className="text-xs text-gray-400 mt-0.5 font-inter">
                                    {editingBanner ? 'Update banner settings and image.' : 'Configure your new site banner.'}
                                </p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="cursor-pointer p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal body */}
                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">

                            {/* Title */}
                            <div>
                                <label className="block text-sm font-semibold text-[#112259] mb-1.5 font-inter">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title ?? ''}
                                    onChange={e => set('title', e.target.value)}
                                    placeholder="e.g. Summer Sale — Header Banner"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none font-inter text-sm"
                                    required
                                />
                            </div>

                            {/* Zone */}
                            <div>
                                <label className="block text-sm font-semibold text-[#112259] mb-1.5 font-inter">
                                    Zone <span className="text-red-500">*</span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {ZONE_OPTIONS.map(zone => (
                                        <button
                                            key={zone.value}
                                            type="button"
                                            onClick={() => set('zone', zone.value)}
                                            className={`py-2.5 px-3 rounded-xl border-2 text-sm font-semibold transition-all duration-150 cursor-pointer ${
                                                formData.zone === zone.value
                                                    ? `border-[#F8A900] ${zone.bg} ${zone.color}`
                                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                            }`}
                                        >
                                            {zone.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Image upload */}
                            <div>
                                <label className="block text-sm font-semibold text-[#112259] mb-1.5 font-inter">
                                    Banner Image <span className="text-red-500">*</span>
                                </label>
                                <ImageUpload
                                    multiple={false}
                                    onUploadComplete={(urls) => set('image', urls[0] ?? '')}
                                    existingImages={formData.image ? [formData.image] : []}
                                    label="Upload Banner Image"
                                    bucket="banner-images"
                                    folder="banners"
                                />
                                {/* Or paste URL */}
                                <div className="mt-2">
                                    <label className="block text-xs text-gray-500 mb-1">Or paste image URL</label>
                                    <input
                                        type="url"
                                        value={formData.image ?? ''}
                                        onChange={e => set('image', e.target.value)}
                                        placeholder="https://..."
                                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none font-inter"
                                    />
                                </div>
                            </div>

                            {/* Link */}
                            <div>
                                <label className="block text-sm font-semibold text-[#112259] mb-1.5 font-inter">
                                    Destination Link <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="url"
                                    value={formData.link ?? ''}
                                    onChange={e => set('link', e.target.value)}
                                    placeholder="https://example.com/offer"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none font-inter text-sm"
                                    required
                                />
                            </div>

                            {/* Date range */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#112259] mb-1.5 font-inter">Start Date</label>
                                    <input
                                        type="date"
                                        value={formData.start_date ?? ''}
                                        onChange={e => set('start_date', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none font-inter text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[#112259] mb-1.5 font-inter">End Date</label>
                                    <input
                                        type="date"
                                        value={formData.end_date ?? ''}
                                        onChange={e => set('end_date', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none font-inter text-sm"
                                    />
                                </div>
                            </div>

                            {/* Active toggle */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <div>
                                    <p className="text-sm font-semibold text-[#112259] font-inter">Active</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Show this banner on the site immediately</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => set('active', !formData.active)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 cursor-pointer focus:outline-none ${
                                        formData.active ? 'bg-[#F8A900]' : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                            formData.active ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* Preview */}
                            {formData.image && (
                                <div>
                                    <p className="text-sm font-semibold text-[#112259] mb-2 font-inter">Preview</p>
                                    <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                                        <Image
                                            src={formData.image}
                                            alt="Banner preview"
                                            fill
                                            className="object-cover"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                                        />
                                    </div>
                                </div>
                            )}
                        </form>

                        {/* Modal footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="cursor-pointer px-5 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-medium text-sm transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={saving}
                                className="cursor-pointer px-6 py-2.5 bg-[#F8A900] hover:bg-[#e09800] text-black rounded-[14px] font-bold text-sm font-manrope shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {saving && (
                                    <span className="inline-block w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                )}
                                {editingBanner ? 'Update Banner' : 'Create Banner'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
