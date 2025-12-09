export default function AdminDashboard() {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">*/}
                {/* Stats Cards */}
                {/* <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Hotels</p>
                                <p className="text-3xl font-bold text-gray-900">-</p>
                            </div>
                            <div className="bg-gradient-to-br from-[#0D7FF2] to-[#0B6FD9] p-3 rounded-xl shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Articles</p>
                                <p className="text-3xl font-bold text-gray-900">-</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Storage Used</p>
                                <p className="text-3xl font-bold text-gray-900">-</p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Welcome Message */}
                <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Welcome to TRAVI Admin Panel</h2>
                    <p className="text-gray-600 mb-6">
                        Manage your travel content from this dashboard. Use the sidebar to navigate between different sections.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
                        <div className="border-l-4 border-[#0D7FF2] pl-4 py-2 bg-blue-50 rounded-r-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Hotels Management</h3>
                            <p className="text-sm text-gray-600">
                                Create, edit, and manage hotel listings with image uploads and detailed information.
                            </p>
                        </div>
                        <div className="border-l-4 border-green-600 pl-4 py-2 bg-green-50 rounded-r-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Articles Management</h3>
                            <p className="text-sm text-gray-600">
                                Manage travel articles and blog posts with rich content editing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
