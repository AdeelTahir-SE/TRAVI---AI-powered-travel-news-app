export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center gap-4">
                {/* Spinner */}
                <div className="w-16 h-16 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin"></div>

                {/* Loading text */}
                <p className="text-lg font-medium text-gray-600 animate-pulse">Loading...</p>
            </div>
        </div>
    );
}
