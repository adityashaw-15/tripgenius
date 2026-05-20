export function LoadingSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="glass h-48 animate-pulse rounded-lg p-5">
          <div className="h-4 w-24 rounded bg-muted" />
          <div className="mt-5 h-7 w-3/4 rounded bg-muted" />
          <div className="mt-4 space-y-2">
            <div className="h-3 rounded bg-muted" />
            <div className="h-3 w-4/5 rounded bg-muted" />
            <div className="h-3 w-2/3 rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
