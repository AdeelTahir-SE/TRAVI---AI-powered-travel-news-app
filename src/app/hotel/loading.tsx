export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center py-[60px] px-[20px] lg:px-[140px]">
            {/* Hero Image Skeleton */}
            <div className="w-full max-w-6xl h-[400px] bg-gray-200 rounded-lg mb-8 animate-pulse"></div>

            {/* Hotel Title Skeleton */}
            <div className="w-full max-w-6xl mb-6">
                <div className="h-10 bg-gray-200 rounded-lg w-2/3 mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-100 rounded-lg w-1/2 animate-pulse"></div>
            </div>

            {/* Hotel Specs Skeleton */}
            <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-lg p-4 shadow-md animate-pulse">
                        <div className="h-8 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                    </div>
                ))}
            </div>

            {/* About Section Skeleton */}
            <div className="w-full max-w-6xl mb-8 space-y-3">
                <div className="h-8 bg-gray-200 rounded-lg w-1/3 mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded w-4/6 animate-pulse"></div>
            </div>

            {/* Room Types Skeleton */}
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-4 space-y-3">
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-100 rounded w-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
