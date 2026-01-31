import { PostCardSkeleton } from "@/components/PostCard";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center space-y-4">
          <div className="h-12 w-64 bg-muted rounded-lg mx-auto animate-pulse" />
          <div className="h-6 w-96 bg-muted rounded mx-auto animate-pulse" />
        </div>
      </section>

      {/* Categories Skeleton */}
      <section className="py-6 border-b">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 w-20 bg-muted rounded-full animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid Skeleton */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
