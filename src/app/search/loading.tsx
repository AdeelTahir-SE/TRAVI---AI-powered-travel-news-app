export default function Loading() {
    return (
        <div className="flex flex-col items-center py-[60px] px-[20px] lg:px-[140px]">
            {/* Search Hero Skeleton */}
            <div className="flex flex-col items-center justify-center gap-4 mb-8 w-full">
                <div className="h-12 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>

                {/* Search Bar Skeleton */}
                <div className="w-full max-w-2xl h-14 bg-gray-100 rounded-full animate-pulse"></div>
            </div>

            {/* Results Count Skeleton */}
            <div className="w-full max-w-6xl mb-6">
                <div className="h-6 bg-gray-200 rounded-lg w-1/4 animate-pulse"></div>
            </div>

            {/* Search Results Grid Skeleton */}
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-4 space-y-3">
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-100 rounded w-full"></div>
                            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                            <div className="flex gap-2 mt-3">
                                <div className="h-6 bg-yellow-100 rounded-full w-16"></div>
                                <div className="h-6 bg-yellow-100 rounded-full w-16"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
