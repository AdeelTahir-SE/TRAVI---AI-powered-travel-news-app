'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { Article, Quotation, Subsection } from '@/utils/types'
import ImageUpload from '@/components/admin/ImageUpload'
import ImageGenerator from '@/components/admin/ImageGenerator'
import { useToast } from '@/components/admin/Toaster'
import { AdminPageSkeleton } from '@/components/Skeletons'
import { SectionNav } from '@/components/admin/FormSection'

export default function ArticlesAdminPage() {
    const { toast } = useToast()
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingArticle, setEditingArticle] = useState<Article | null>(null)
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)
    const [formData, setFormData] = useState<Partial<Article>>({
        title: '',
        paras: [],
        subsections: [],
    })

    useEffect(() => {
        fetchArticles()
    }, [])

    const fetchArticles = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('article')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching articles:', error)
            toast('Failed to fetch articles: ' + error.message, 'error')
        } else {
            setArticles(data || [])
        }
        setLoading(false)
    }


    const handleCreate = () => {
        setEditingArticle(null)
        setFormData({
            title: 'Discover Dubai: Where Tradition Meets Tomorrow',
            images: [],
            published_date: '2025-10-28',
            paras: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt, nisl id pulvinar tincidunt, mi nunc fringilla augue, ut faucibus risus augue ac magna. Phasellus non convallis elit, ac tempus odio. Vivamus a interdum dolor. Donec tincidunt accumsan leo ac lacinia. In commodo nulla augue, sed tempus nulla euismod sed. Integer auctor et elit vel eleifend. Etiam sed mauris posuere, condimentum tortor nec, luctus odio.',
                'Proin dignissim aliquet felis, eget pulvinar risus commodo sed. Nulla malesuada turpis sed posuere dictum. Praesent auctor magna et sapien facilisis, et fermentum lectus hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempus ullamcorper malesuada. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt, nisl id pulvinar tincidunt, mi nunc fringilla augue, ut faucibus risus augue ac magna. Phasellus non convallis elit, ac tempus odio. Vivamus a interdum dolor. Donec tincidunt accumsan leo ac lacinia.',
                'Nullam non ipsum ac leo euismod sodales non eu lectus. Sed rhoncus purus quis tellus vestibulum, et lacinia dui varius. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam in dignissim justo. Vestibulum pharetra mollis erat, nec molestie leo vulputate quis.',
                'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi condimentum, eros et sodales convallis, ante elit aliquam arcu, eu lobortis dolor urna a mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed placerat lectus eget metus tincidunt venenatis. Duis quis sapien diam. Aenean aliquam lectus et molestie pulvinar.'
            ],
            subsections: [
                {
                    heading: 'Beaches, Desert, and Adventure',
                    paras: [
                        "Dubai's natural landscapes are just as spectacular as its skyscrapers. Spend a lazy afternoon at Jumeirah Beach, or head to Kite Beach for water sports and a beachfront food truck feast.",
                        'For something truly unique, take a desert safari — dune bashing, camel rides, and a sunset dinner under the stars capture the magic of Arabia in one evening.',
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt, nisl id pulvinar tincidunt, mi nunc fringilla augue, ut faucibus risus augue ac magna. Phasellus non convallis elit, ac tempus odio. Vivamus a interdum dolor. Donec tincidunt accumsan leo ac lacinia.',
                        'Praesent tincidunt varius tortor, molestie tempus nunc mollis sit amet. Aenean tincidunt dictum eros id rhoncus. Praesent quis justo non risus ultricies efficitur. Integer sit amet facilisis ante, et feugiat erat.',
                        'Sed justo magna, finibus non enim nec, aliquet consequat arcu. Nullam a malesuada augue. In commodo nulla augue, sed tempus nulla euismod sed. Integer auctor et elit vel eleifend. Etiam sed mauris posuere, condimentum tortor nec, luctus odio. Sed vitae risus ultrices, efficitur urna id, tempor arcu.'
                    ]
                },
                {
                    heading: 'Culture and Heritage',
                    paras: [
                        "Amid the glitz, Dubai proudly preserves its heritage. Wander through Al Fahidi Historical Neighborhood, where narrow lanes and wind towers reveal the city's humble beginnings. Visit the Dubai Creek, hop on an abra (wooden boat), and explore the bustling Gold and Spice Souks — timeless reminders of the city's trading past.",
                        'Mauris nulla eros, rutrum quis imperdiet ut, lacinia at arcu. Sed sit amet risus magna. Sed elementum tellus at dui hendrerit, a finibus sapien porta. Sed et nibh ultrices, dictum libero eget, hendrerit nisl. Donec et turpis varius, lacinia arcu nec, posuere libero. Suspendisse posuere, metus eu commodo aliquet, diam neque luctus ligula, eget molestie lacus dolor ut libero. Pellentesque dignissim eros vitae orci sollicitudin mattis. Vestibulum rhoncus, justo bibendum tincidunt volutpat, libero justo gravida est, convallis pharetra massa libero in diam. Pellentesque varius consectetur vulputate.',
                        'Sed quis dui non enim varius faucibus quis id augue. Suspendisse in tincidunt tortor. Integer in gravida est. Integer vel ultrices felis, quis vehicula ante.',
                        'Nunc feugiat, neque eget vehicula rutrum, ipsum magna condimentum tellus, sit amet eleifend nisl felis accumsan justo. Donec consectetur aliquam eros non vestibulum. Quisque imperdiet rhoncus eros, sit amet luctus ligula',
                        'Nullam non ipsum ac leo euismod sodales non eu lectus. Sed rhoncus purus quis tellus vestibulum, et lacinia dui varius. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam in dignissim justo. Vestibulum pharetra mollis erat, nec molestie leo vulputate quis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi condimentum, eros et sodales convallis, ante elit aliquam arcu, eu lobortis dolor urna a mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed placerat lectus eget metus tincidunt venenatis. Duis quis sapien diam. Aenean aliquam lectus et molestie pulvinar.'
                    ]
                }
            ],
            quotation1: {
                quote: 'Duis ultrices erat sed elementum facilisis. Fusce congue lobortis augue nec congue. Vivamus tellus velit, vestibulum eget elit dignissim',
                person_name: 'James Joyce',
                person_role: 'Travel Enthusiast',
                person_image: '/images/comment-avatar.jpg'
            },
            quotation2: {
                quote: 'Dubai is where dreams become reality',
                person_name: 'Sarah Ahmed'
            },
            tip: 'Best time to visit Dubai is between November and March when the weather is pleasant. Book desert safaris in advance and dress modestly when visiting cultural sites.',
        })
        setShowModal(true)
    }

    const handleEdit = (article: Article) => {
        setEditingArticle(article)
        setFormData(article)
        setShowModal(true)
    }

    const handleDelete = async (articleId: number) => {
        const { error } = await supabase
            .from('article')
            .delete()
            .eq('article_id', articleId)

        if (error) {
            console.error('Error deleting article:', error)
            toast('Failed to delete article: ' + error.message, 'error')
        } else {
            toast('Article deleted successfully!', 'success')
            setDeleteConfirmId(null)
            fetchArticles()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.tip) {
            toast('Title and Tip are required!', 'error')
            return
        }

        const submitData = {
            ...formData,
            published_date: formData.published_date || new Date().toISOString(),
        }

        if (editingArticle) {
            const { error } = await supabase
                .from('article')
                .update(submitData)
                .eq('article_id', editingArticle.article_id)

            if (error) {
                console.error('Error updating article:', error)
                toast('Failed to update article: ' + error.message, 'error')
            } else {
                toast('Article updated successfully!', 'success')
                setShowModal(false)
                fetchArticles()
            }
        } else {
            const { error } = await supabase
                .from('article')
                .insert([submitData])

            if (error) {
                console.error('Error creating article:', error)
                toast('Failed to create article: ' + error.message, 'error')
            } else {
                toast('Article created successfully!', 'success')
                setShowModal(false)
                fetchArticles()
            }
        }
    }

    const handleInputChange = (field: keyof Article, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    // Paragraphs are fixed at 5, no add/remove needed

    const updateParagraph = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            paras: (prev.paras || []).map((p, i) => i === index ? value : p)
        }))
    }

    const addSubsection = () => {
        setFormData(prev => ({
            ...prev,
            subsections: [...(prev.subsections || []), { heading: '', paras: ['', '', '', '', ''] }]
        }))
    }

    const removeSubsection = (index: number) => {
        setFormData(prev => ({
            ...prev,
            subsections: (prev.subsections || []).filter((_, i) => i !== index)
        }))
    }

    const updateSubsection = (index: number, field: keyof Subsection, value: any) => {
        setFormData(prev => ({
            ...prev,
            subsections: (prev.subsections || []).map((s, i) =>
                i === index ? { ...s, [field]: value } : s
            )
        }))
    }

    const updateSubsectionPara = (subsectionIndex: number, paraIndex: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            subsections: (prev.subsections || []).map((s, i) =>
                i === subsectionIndex
                    ? { ...s, paras: s.paras.map((p, pi) => pi === paraIndex ? value : p) }
                    : s
            )
        }))
    }

    const updateImage = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            images: (prev.images || []).map((img, i) => i === index ? value : img)
        }))
    }

    const handleImageUpload = (urls: string[]) => {
        setFormData(prev => ({ ...prev, images: urls }))
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                    <div>
                        <h1 className="font-manrope font-extrabold text-[30px] leading-none tracking-[-0.03em] text-[#112259]">Articles</h1>
                        <p className="text-gray-500 text-sm mt-1 font-inter">Create, edit, and manage travel articles.</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="cursor-pointer flex items-center gap-2 bg-[#F8A900] hover:bg-[#e09800] text-black px-5 py-2.5 rounded-[14px] font-bold text-sm font-manrope shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Article
                    </button>
                </div>

                {loading ? (
                    <AdminPageSkeleton count={4} />
                ) : articles.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-[25px] shadow-[9px_9px_75px_0px_#00000029]">
                        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-gray-500 font-medium">No articles yet</p>
                        <p className="text-gray-400 text-sm mt-1">Create your first article to get started.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {articles.map((article) => (
                            <div
                                key={article.article_id}
                                className="bg-white rounded-[20px] shadow-[9px_9px_75px_0px_#00000029] p-6 hover:shadow-[9px_9px_100px_0px_#00000040] transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h2 className="font-manrope font-extrabold text-[16px] text-[#112259] truncate mb-2">{article.title}</h2>
                                        <div className="flex flex-wrap gap-3">
                                            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                {new Date(article.published_date).toLocaleDateString()}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                                                {article.paras?.length || 0} paragraphs
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
                                                {article.subsections?.length || 0} subsections
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => handleEdit(article)}
                                            className="cursor-pointer flex items-center gap-1.5 bg-[#F8A900] hover:bg-[#e09800] text-black px-4 py-2 rounded-xl text-sm font-bold font-manrope transition-all duration-200"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            Edit
                                        </button>
                                        {deleteConfirmId === article.article_id ? (
                                            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-1.5">
                                                <span className="text-xs text-red-600 font-medium whitespace-nowrap">Sure?</span>
                                                <button
                                                    onClick={() => handleDelete(article.article_id)}
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
                                                onClick={() => setDeleteConfirmId(article.article_id)}
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
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-[24px] shadow-[9px_9px_75px_0px_#00000029] max-w-5xl w-full max-h-[90vh] overflow-hidden my-8 flex flex-col">
                            <div className="sticky z-20 top-0 bg-white border-b border-gray-100 px-6 py-5 flex justify-between items-center rounded-t-[24px]">
                                <div>
                                    <h2 className="font-manrope font-extrabold text-[20px] tracking-tight text-[#112259]">
                                        {editingArticle ? 'Edit Article' : 'New Article'}
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-0.5 font-inter">{editingArticle ? 'Update article content and images' : 'Fill in article details to publish'}</p>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="cursor-pointer p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-1 overflow-hidden">
                                    <div className="w-48 flex-shrink-0 border-r border-gray-100 p-4 overflow-y-auto bg-gray-50/50 hidden md:block">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 font-inter">Jump to</p>
                                        <SectionNav sections={[{id:"a-basic",label:"Basic Info",icon:null},{id:"a-images",label:"Images",icon:null},{id:"a-paras",label:"Paragraphs",icon:null},{id:"a-subs",label:"Subsections",icon:null},{id:"a-quotes",label:"Quotes & Tip",icon:null}]} />
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
<div id="a-basic" className="scroll-mt-2"><div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-gray-100"><div className="w-1 h-5 bg-[#F8A900] rounded-full"></div><h3 className="font-manrope font-extrabold text-[14px] text-[#112259] tracking-tight uppercase">Basic Info</h3></div>
                                    {/* Title */
                                    <div>
                                        <label className="block text-sm font-semibold text-[#112259] mb-2 font-inter">
                                            Title <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title || ''}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none"
                                            required
                                        />
                                    </div>

                                    <div id="a-images" className="scroll-mt-2"><div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-gray-100"><div className="w-1 h-5 bg-[#F8A900] rounded-full"></div><h3 className="font-manrope font-extrabold text-[14px] text-[#112259] tracking-tight uppercase">Images</h3></div>
                                    <div>
                                        <ImageUpload
                                            multiple={true}
                                            onUploadComplete={handleImageUpload}
                                            existingImages={formData.images || []}
                                            label="Article Images (3 Required)"
                                            bucket="article-images"
                                            folder="articles"
                                        />
                                        <ImageGenerator
                                            context={formData.title ? `Travel article: ${formData.title}` : 'Travel article hero image'}
                                            label="Generate Article Image with DALL·E 3"
                                            onGenerated={(url) => handleImageUpload([...(formData.images || []), url])}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4"><div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#112259] mb-2 font-inter">Published Date</label>
                                        <input
                                            type="date"
                                            value={formData.published_date?.split('T')[0] || ''}
                                            onChange={(e) => handleInputChange('published_date', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none"
                                        />
                                    </div>

                                    </div></div><div id="a-paras" className="scroll-mt-2"><div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-gray-100"><div className="w-1 h-5 bg-[#F8A900] rounded-full"></div><h3 className="font-manrope font-extrabold text-[14px] text-[#112259] tracking-tight uppercase">Paragraphs</h3></div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#112259] mb-2 font-inter">Paragraphs (5 Required)</label>
                                        <div className="space-y-2">
                                            {[0, 1, 2, 3, 4].map((index) => (
                                                <div key={index}>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">Paragraph {index + 1}</label>
                                                    <textarea
                                                        value={formData.paras?.[index] || ''}
                                                        onChange={(e) => updateParagraph(index, e.target.value)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none"
                                                        rows={3}
                                                        placeholder={`Paragraph ${index + 1}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div id="a-subs" className="scroll-mt-2"><div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-gray-100"><div className="w-1 h-5 bg-[#F8A900] rounded-full"></div><h3 className="font-manrope font-extrabold text-[14px] text-[#112259] tracking-tight uppercase">Subsections</h3></div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#112259] mb-2 font-inter">Subsections</label>
                                        <div className="space-y-4">
                                            {(formData.subsections || []).map((subsection, index) => (
                                                <div key={index} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <span className="text-[13px] font-bold text-[#112259] font-manrope">Subsection #{index + 1}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSubsection(index)}
                                                            className="cursor-pointer  px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-bold transition-all duration-200 cursor-pointer"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <input
                                                            type="text"
                                                            value={subsection.heading}
                                                            onChange={(e) => updateSubsection(index, 'heading', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none bg-white"
                                                            placeholder="Heading"
                                                        />
                                                        <div className="space-y-2">
                                                            <label className="block text-xs font-semibold text-gray-600">Paragraphs (5 Required)</label>
                                                            {[0, 1, 2, 3, 4].map((paraIndex) => (
                                                                <textarea
                                                                    key={paraIndex}
                                                                    value={subsection.paras?.[paraIndex] || ''}
                                                                    onChange={(e) => updateSubsectionPara(index, paraIndex, e.target.value)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none bg-white text-sm"
                                                                    rows={2}
                                                                    placeholder={`Paragraph ${paraIndex + 1}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={addSubsection}
                                                className="cursor-pointer w-full px-4 py-2 border-2 border-dashed border-gray-200 hover:border-[#F8A900] text-gray-500 hover:text-[#112259] rounded-xl font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                                            >
                                                <span className="text-xl">+</span> Add Subsection
                                            </button>
                                        </div>
                                    </div>

                                    <div id="a-quotes" className="scroll-mt-2"><div className="flex items-center gap-2.5 mb-4 pb-2 border-b border-gray-100"><div className="w-1 h-5 bg-[#F8A900] rounded-full"></div><h3 className="font-manrope font-extrabold text-[14px] text-[#112259] tracking-tight uppercase">Quotes & Tip</h3></div>
                                    <div className="border-t border-gray-400 pt-6">
                                        <label className="block text-sm font-semibold text-[#112259] mb-3 font-inter">Quotation 1 (Full)</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="col-span-2">
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Quote</label>
                                                <textarea
                                                    value={formData.quotation1?.quote || ''}
                                                    onChange={(e) => handleInputChange('quotation1', {
                                                        ...formData.quotation1,
                                                        quote: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none"
                                                    rows={2}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Person Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.quotation1?.person_name || ''}
                                                    onChange={(e) => handleInputChange('quotation1', {
                                                        ...formData.quotation1,
                                                        person_name: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Person Role</label>
                                                <input
                                                    type="text"
                                                    value={formData.quotation1?.person_role || ''}
                                                    onChange={(e) => handleInputChange('quotation1', {
                                                        ...formData.quotation1,
                                                        person_role: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Person Image URL</label>
                                                <input
                                                    type="url"
                                                    value={formData.quotation1?.person_image || ''}
                                                    onChange={(e) => handleInputChange('quotation1', {
                                                        ...formData.quotation1,
                                                        person_image: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    
                                    <div className="border-t border-gray-400 pt-6">
                                        <label className="block text-sm font-semibold text-[#112259] mb-3 font-inter">Quotation 2 (Simplified)</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="col-span-2">
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Quote</label>
                                                <textarea
                                                    value={formData.quotation2?.quote || ''}
                                                    onChange={(e) => handleInputChange('quotation2', {
                                                        ...formData.quotation2,
                                                        quote: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none"
                                                    rows={2}
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Person Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.quotation2?.person_name || ''}
                                                    onChange={(e) => handleInputChange('quotation2', {
                                                        ...formData.quotation2,
                                                        person_name: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    
                                    <div className='border-t border-gray-400 pt-6'>
                                        <label className="block text-sm font-semibold text-[#112259] mb-2 font-inter">
                                            Tip <span className="text-red-600">*</span>
                                        </label>
                                        <textarea
                                            value={formData.tip || ''}
                                            onChange={(e) => handleInputChange('tip', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none"
                                            rows={3}
                                            required
                                        />
                                    </div>
                                </div>

                                </div></div><div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-white flex-shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="cursor-pointer px-5 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 font-medium text-sm transition-all duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="cursor-pointer px-6 py-2.5 bg-[#F8A900] hover:bg-[#e09800] text-black rounded-[14px] font-bold text-sm font-manrope shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        {editingArticle ? 'Update Article' : 'Create Article'}
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
