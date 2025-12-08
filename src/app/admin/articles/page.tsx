export default function ArticlesPage() {
    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Articles Management</h1>

                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <div className="max-w-md mx-auto">
                        <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Coming Soon</h2>
                        <p className="text-gray-600">
                            Article management functionality will be available soon. You'll be able to create, edit, and manage travel articles and blog posts.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
