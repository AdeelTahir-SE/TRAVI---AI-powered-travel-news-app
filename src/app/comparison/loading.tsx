export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center overflow-x-auto py-[60px] px-[20px] lg:px-[140px]">
            {/* Hero Section Skeleton */}
            <div className="flex flex-col items-center justify-center gap-[10px] mb-8 w-full">
                <div className="h-12 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
                <div className="h-6 bg-gray-100 rounded-lg w-full max-w-2xl mt-4 animate-pulse"></div>
            </div>

            {/* Description Skeleton */}
            <div className="w-full max-w-4xl mb-8 space-y-3">
                <div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded w-4/6 animate-pulse"></div>
            </div>

            {/* Comparison Table Skeleton */}
            <div className="w-full overflow-x-auto">
                <div className="min-w-[800px] bg-white rounded-lg shadow-md p-6 animate-pulse">
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-8 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                    {[1, 2, 3, 4, 5].map((row) => (
                        <div key={row} className="grid grid-cols-4 gap-4 mb-3">
                            {[1, 2, 3, 4].map((col) => (
                                <div key={col} className="h-6 bg-gray-100 rounded"></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
