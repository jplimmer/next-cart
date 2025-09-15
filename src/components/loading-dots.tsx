export default function LoadingDots() {
  return (
    <div className="bg-lime-900 w-full max-w-sm flex flex-col p-3 rounded-lg border border-green-300 animate-pulse">
      <div className="h-6 bg-green-300/30 rounded w-3/4 mb-4" /> {/* Title */}
      <div className="loading-dots font-mono text-lg font-semibold text-white">
        Loading...
      </div>
      <div className="bg-green-300/20 rounded-lg h-40 w-full mb-4 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-green-300 rounded-full" />{' '}
        {/* Toaster silhouette */}
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-green-300/30 rounded w-full" />
        <div className="h-4 bg-green-300/30 rounded w-5/6" />
        <div className="h-4 bg-green-300/30 rounded w-2/3" />
      </div>
      <div className="h-6 bg-green-300/40 rounded w-1/3 mb-4" /> {/* Price */}
      <div className="h-10 border border-green-300 rounded flex items-center justify-center text-green-300 text-sm">
        Add to cart
      </div>
    </div>
  );
}
