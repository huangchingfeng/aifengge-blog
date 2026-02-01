import Link from "next/link";
import Image from "next/image";
import { Eye, Clock } from "lucide-react";
import { formatDate, calculateReadingTime } from "@/lib/utils";
import type { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  showCategory?: boolean;
}

export function PostCard({ post, showCategory = true }: PostCardProps) {
  return (
    <article className="group border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow">
      <Link href={`/blog/${post.slug}`}>
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.coverImage || "/images/default-cover.png"}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          {/* Category */}
          {showCategory && post.categoryName && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-muted rounded">
              {post.categoryName}
            </span>
          )}

          {/* Title */}
          <h2 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-muted-foreground text-sm line-clamp-2">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
            <span>{post.authorName || "阿峰老師"}</span>
            <span>
              {post.publishedAt ? formatDate(post.publishedAt) : ""}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.viewCount}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {calculateReadingTime(post.content || "")} 分鐘
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <div className="aspect-video bg-muted animate-pulse" />
      <div className="p-6 space-y-3">
        <div className="h-4 w-16 bg-muted rounded animate-pulse" />
        <div className="h-6 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        <div className="flex gap-4 pt-2">
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

interface PostsGridProps {
  posts: Post[];
  showCategory?: boolean;
  emptyMessage?: string;
}

export function PostsGrid({
  posts,
  showCategory = true,
  emptyMessage = "目前還沒有文章",
}: PostsGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} showCategory={showCategory} />
      ))}
    </div>
  );
}
