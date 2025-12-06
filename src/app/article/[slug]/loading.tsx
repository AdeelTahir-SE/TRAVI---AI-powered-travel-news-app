export default function Loading() {
  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-transparent"></div>
      <p className="text-gray-600 text-sm">Loading Article...</p>
    </div>
  );
}
