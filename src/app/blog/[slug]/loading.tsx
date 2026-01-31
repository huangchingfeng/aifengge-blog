export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-4xl">
          {/* Back Button */}
          <div className="h-4 w-24 bg-muted rounded mb-6" />

          {/* Category */}
          <div className="h-6 w-20 bg-muted rounded-full mb-4" />

          {/* Title */}
          <div className="h-12 w-full bg-muted rounded mb-4" />
          <div className="h-12 w-3/4 bg-muted rounded mb-6" />

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="h-4 w-20 bg-muted rounded" />
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-4 w-16 bg-muted rounded" />
            <div className="h-4 w-20 bg-muted rounded" />
          </div>

          {/* Tags */}
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-muted rounded-full" />
            <div className="h-6 w-20 bg-muted rounded-full" />
            <div className="h-6 w-14 bg-muted rounded-full" />
          </div>
        </div>
      </section>

      {/* Cover Image Skeleton */}
      <section className="container max-w-4xl py-8">
        <div className="aspect-video bg-muted rounded-lg" />
      </section>

      {/* Content Skeleton */}
      <section className="container max-w-4xl py-8">
        <div className="space-y-4">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-5/6 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-4/5 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-3/4 bg-muted rounded" />
        </div>
      </section>
    </div>
  );
}
