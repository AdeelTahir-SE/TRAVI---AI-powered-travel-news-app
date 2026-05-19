// Shared skeleton pulse primitives for admin pages

export function SkeletonLine({ width = 'w-full', height = 'h-4' }: { width?: string; height?: string }) {
    return <div className={`${width} ${height} bg-gray-200 rounded-lg animate-pulse`} />
}

export function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div className="flex-1 space-y-3">
                    <SkeletonLine width="w-2/3" height="h-5" />
                    <div className="flex gap-2">
                        <SkeletonLine width="w-20" height="h-6" />
                        <SkeletonLine width="w-24" height="h-6" />
                        <SkeletonLine width="w-16" height="h-6" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <SkeletonLine width="w-16" height="h-9" />
                    <SkeletonLine width="w-20" height="h-9" />
                </div>
            </div>
        </div>
    )
}

export function AdminPageSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header skeleton */}
                <div className="flex justify-between items-center mb-8">
                    <div className="space-y-2">
                        <SkeletonLine width="w-40" height="h-8" />
                        <SkeletonLine width="w-56" height="h-4" />
                    </div>
                    <SkeletonLine width="w-28" height="h-10" />
                </div>
                {/* Cards */}
                <div className="grid gap-4">
                    {Array.from({ length: count }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export function ArticleDetailSkeleton() {
    return (
        <div className="flex flex-col items-center w-full animate-pulse">
            {/* Hero */}
            <div className="w-full h-[300px] sm:h-[500px] bg-gray-200" />
            {/* Content */}
            <div className="w-full py-16 px-6 lg:px-40 space-y-6">
                <SkeletonLine width="w-32" height="h-8" />
                <SkeletonLine width="w-3/4" height="h-12" />
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => <SkeletonLine key={i} height="h-5" />)}
                </div>
                <SkeletonLine width="w-full" height="h-64" />
                <div className="space-y-3">
                    {[...Array(4)].map((_, i) => <SkeletonLine key={i} height="h-5" />)}
                </div>
            </div>
        </div>
    )
}
