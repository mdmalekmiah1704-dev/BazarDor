export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-base-300"
        >
          <div className="h-44 animate-pulse bg-base-300" />

          <div className="space-y-3 p-5">
            <div className="h-4 w-20 animate-pulse rounded bg-base-300" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-base-300" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-base-300" />
            <div className="h-8 w-1/3 animate-pulse rounded bg-base-300" />
          </div>
        </div>
      ))}
    </div>
  );
}