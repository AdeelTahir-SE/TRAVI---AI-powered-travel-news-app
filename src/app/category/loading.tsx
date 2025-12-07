export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center py-[60px] lg:py-[100px] px-[20px] lg:px-[140px]">
            {/* Hero Section Skeleton */}
            <div className="flex flex-col items-center justify-center gap-[10px] mb-8 w-full">
                <div className="h-12 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
                <div className="h-12 bg-yellow-100 rounded-lg w-1/2 animate-pulse"></div>
                <div className="h-6 bg-gray-100 rounded-lg w-full max-w-2xl mt-4 animate-pulse"></div>
            </div>

            {/* Cards Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-4 space-y-3">
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-100 rounded w-full"></div>
                            <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
