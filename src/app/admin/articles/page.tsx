'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { Article, Quotation, Subsection } from '@/utils/types'
import ImageUpload from '@/components/admin/ImageUpload'

export default function ArticlesAdminPage() {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingArticle, setEditingArticle] = useState<Article | null>(null)
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
            alert('Failed to fetch articles: ' + error.message)
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
        if (!confirm('Are you sure you want to delete this article?')) return

        const { error } = await supabase
            .from('article')
            .delete()
            .eq('article_id', articleId)

        if (error) {
            console.error('Error deleting article:', error)
            alert('Failed to delete article: ' + error.message)
        } else {
            alert('Article deleted successfully!')
            fetchArticles()
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.tip) {
            alert('Title and Tip are required!')
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
                alert('Failed to update article: ' + error.message)
            } else {
                alert('Article updated successfully!')
                setShowModal(false)
                fetchArticles()
            }
        } else {
            const { error } = await supabase
                .from('article')
                .insert([submitData])

            if (error) {
                console.error('Error creating article:', error)
                alert('Failed to create article: ' + error.message)
            } else {
                alert('Article created successfully!')
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
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 ">
                    <h1 className="text-3xl font-bold text-gray-900">Articles Management</h1>
                    <button
                        onClick={handleCreate}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium z-10"
                    >
                        + Create New Article
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t border-gray-400-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading articles...</p>
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-600 text-lg">No articles found. Create your first article!</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {articles.map((article) => (
                            <div key={article.article_id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h2>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="font-semibold text-gray-700">Published:</span>
                                                <span className="ml-2 text-gray-600">
                                                    {new Date(article.published_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="font-semibold text-gray-700">Paragraphs:</span>
                                                <span className="ml-2 text-gray-600">{article.paras?.length || 0}</span>
                                            </div>
                                            <div>
                                                <span className="font-semibold text-gray-700">Subsections:</span>
                                                <span className="ml-2 text-gray-600">{article.subsections?.length || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleEdit(article)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(article.article_id)}
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
                    <div className=" bg-black fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky z-20 top-0 bg-white border-b border-gray-400  px-6 py-4 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingArticle ? 'Edit Article' : 'Create New Article'}
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
                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Title <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title || ''}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-t border-gray-400ransparent"
                                            required
                                        />
                                    </div>

                                    {/* Images (3) */}
                                    <ImageUpload
                                        multiple={true}
                                        onUploadComplete={handleImageUpload}
                                        existingImages={formData.images || []}
                                        label="Article Images (3 Required)"
                                        bucket="article-images"
                                        folder="articles"
                                    />

                                    {/* Published Date */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Published Date</label>
                                        <input
                                            type="date"
                                            value={formData.published_date?.split('T')[0] || ''}
                                            onChange={(e) => handleInputChange('published_date', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-t border-gray-400ransparent"
                                        />
                                    </div>

                                    {/* Paragraphs (Fixed 5) */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Paragraphs (5 Required)</label>
                                        <div className="space-y-2">
                                            {[0, 1, 2, 3, 4].map((index) => (
                                                <div key={index}>
                                                    <label className="block text-xs font-medium text-gray-600 mb-1">Paragraph {index + 1}</label>
                                                    <textarea
                                                        value={formData.paras?.[index] || ''}
                                                        onChange={(e) => updateParagraph(index, e.target.value)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-t border-gray-400ransparent"
                                                        rows={3}
                                                        placeholder={`Paragraph ${index + 1}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Subsections */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Subsections</label>
                                        <div className="space-y-4">
                                            {(formData.subsections || []).map((subsection, index) => (
                                                <div key={index} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <span className="text-sm font-semibold text-gray-600">Subsection #{index + 1}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSubsection(index)}
                                                            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-bold transition-colors"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <input
                                                            type="text"
                                                            value={subsection.heading}
                                                            onChange={(e) => updateSubsection(index, 'heading', e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-t border-gray-400ransparent bg-white"
                                                            placeholder="Heading"
                                                        />
                                                        <div className="space-y-2">
                                                            <label className="block text-xs font-semibold text-gray-600">Paragraphs (5 Required)</label>
                                                            {[0, 1, 2, 3, 4].map((paraIndex) => (
                                                                <textarea
                                                                    key={paraIndex}
                                                                    value={subsection.paras?.[paraIndex] || ''}
                                                                    onChange={(e) => updateSubsectionPara(index, paraIndex, e.target.value)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-t border-gray-400ransparent bg-white text-sm"
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
                                                className="w-full px-4 py-2 border-2 border-dashed border-gray-300 hover:border-blue-500 text-gray-600 hover:text-blue-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                            >
                                                <span className="text-xl">+</span> Add Subsection
                                            </button>
                                        </div>
                                    </div>

                                    {/* Quotation 1 */}
                                    <div className="border-t border-gray-400 pt-6">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">Quotation 1 (Full)</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2">
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Quote</label>
                                                <textarea
                                                    value={formData.quotation1?.quote || ''}
                                                    onChange={(e) => handleInputChange('quotation1', {
                                                        ...formData.quotation1,
                                                        quote: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-t border-gray-400ransparent"
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
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-t border-gray-400ransparent"
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
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-t border-gray-400ransparent"
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
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-t border-gray-400ransparent"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quotation 2 */}
                                    <div className="border-t border-gray-400 pt-6">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">Quotation 2 (Simplified)</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2">
                                                <label className="block text-xs font-medium text-gray-600 mb-1">Quote</label>
                                                <textarea
                                                    value={formData.quotation2?.quote || ''}
                                                    onChange={(e) => handleInputChange('quotation2', {
                                                        ...formData.quotation2,
                                                        quote: e.target.value
                                                    })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-t border-gray-400ransparent"
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
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-t border-gray-400ransparent"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tip */}
                                    <div className='border-t border-gray-400 pt-6'>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Tip <span className="text-red-600">*</span>
                                        </label>
                                        <textarea
                                            value={formData.tip || ''}
                                            onChange={(e) => handleInputChange('tip', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-t border-gray-400ransparent"
                                            rows={3}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-400">
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
