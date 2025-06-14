import { ComponentRenderer } from "@/components/blog/component-renderer"
import { CalendarIcon, Clock, Tag, Eye, ThumbsUp, MessageCircle, Bookmark, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import Image from "next/image"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { ShareButtons } from "@/components/blog/share-buttons"
import { TableOfContents } from "@/components/blog/table-of-contents"

export function BlogRenderer({ post }) {
  return (
    <>
      <ReadingProgress />

      <article className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative h-56 md:h-72 overflow-hidden">
            <Image
              src={post.featuredImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {post.categories?.map((category) => (
                  <Badge key={category} variant="secondary" className="bg-white/80 text-gray-800 text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{post.title}</h1>
            </div>
          </div>
        )}

        <div className="p-4 md:p-6">
          {/* Blog Header */}
          {!post.featuredImage && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {post.categories?.map((category) => (
                  <Badge key={category} variant="outline" className="text-xs text-blue-600 border-blue-200">
                    {category}
                  </Badge>
                ))}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
            </div>
          )}

          {/* Meta Information */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-md border border-blue-100 dark:border-blue-800">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                <CalendarIcon className="h-3 w-3 text-blue-500" />
                <span>{post.date}</span>
              </div>
              {post.readTime && (
                <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                  <Clock className="h-3 w-3 text-green-500" />
                  <span>{post.readTime}</span>
                </div>
              )}
              <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                <Eye className="h-3 w-3 text-purple-500" />
                <span>1.2k views</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <ShareButtons post={post} />
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-blue-600 h-7 px-2 border-blue-200 hover:bg-blue-50"
              >
                <ThumbsUp className="h-3 w-3 mr-1 text-blue-500" />
                24
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-blue-600 h-7 px-2 border-blue-200 hover:bg-blue-50"
              >
                <Bookmark className="h-3 w-3 text-blue-500" />
              </Button>
            </div>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <div className="mb-6 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-md border-l-2 border-blue-300 dark:border-blue-700">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">{post.excerpt}</p>
            </div>
          )}

          {/* Table of Contents */}
          <TableOfContents content={post.content} />

          {/* Blog Content */}
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div className="space-y-4">
              {post.content && post.content.length > 0 ? (
                post.content.map((component, index) => (
                  <ComponentRenderer key={`${component.id || component.type}-${index}`} component={component} />
                ))
              ) : (
                <div className="text-center p-8 text-gray-500">
                  <p>No content available</p>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-md border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-1 mb-3">
                <Tag className="h-3 w-3 text-blue-500" />
                <h3 className="font-medium text-xs text-blue-700 dark:text-blue-300">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator className="my-8" />

          {/* Author Info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-md border border-blue-100 dark:border-blue-800">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-blue-200 dark:border-blue-700">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Written by {post.author.name}</h3>
                {post.author.role && <p className="text-xs text-blue-600 dark:text-blue-400">{post.author.role}</p>}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8 text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                Previous Post
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8 text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                Next Post
              </Button>
            </div>
          </div>

          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-blue-500" />
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {post.relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="overflow-hidden border border-blue-100 dark:border-blue-800 hover:border-blue-300 transition-colors"
                  >
                    {relatedPost.featuredImage && (
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={relatedPost.featuredImage || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-medium text-sm mb-2 hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      {relatedPost.excerpt && (
                        <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      )}
                      <Button variant="link" className="p-0 h-auto text-xs text-blue-600" asChild>
                        <Link href={`/blsindia-canada/${relatedPost.slug}`} className="flex items-center gap-1">
                          Read More
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  )
}
