import Link from "next/link"
import Image from "next/image"
import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { getAllBlogPosts } from "@/data/blog-posts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Tag, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Generate static paths for all categories
export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  const categories = new Set()

  posts.forEach((post) => {
    if (post.categories) {
      post.categories.forEach((category) => categories.add(category))
    }
  })

  return Array.from(categories).map((category) => ({
    slug: category.toLowerCase().replace(/\s+/g, "-"),
  }))
}

// Generate metadata for the category page
export async function generateMetadata({ params }) {
  const { slug } = params
  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://indiahelpdesk.ca"

  return {
    title: `${categoryName} Articles - IndiaConsularBlog`,
    description: `Browse our collection of articles about ${categoryName.toLowerCase()} for Indian citizens in Canada.`,
    keywords: [`${categoryName}`, "Indian consular services", "blog", "articles", "Canada", "immigration"],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/category/${slug}`,
    },
    openGraph: {
      title: `${categoryName} Articles - IndiaConsularBlog`,
      description: `Browse our collection of articles about ${categoryName.toLowerCase()} for Indian citizens in Canada.`,
      url: `${baseUrl}/category/${slug}`,
      siteName: "IndiaConsularBlog",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${categoryName} Articles`,
        },
      ],
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} Articles - IndiaConsularBlog`,
      description: `Browse our collection of articles about ${categoryName.toLowerCase()} for Indian citizens in Canada.`,
      images: ["/twitter-image.jpg"],
    },
  }
}

export default function CategoryPage({ params }) {
  const { slug } = params
  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const allPosts = getAllBlogPosts()
  const posts = allPosts.filter(
    (post) =>
      post.categories &&
      post.categories.some(
        (category) =>
          category.toLowerCase() === categoryName.toLowerCase() ||
          category.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase(),
      ),
  )

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} Articles`,
    description: `Browse our collection of articles about ${categoryName.toLowerCase()} for Indian citizens in Canada.`,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://indiahelpdesk.ca"}/category/${slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "IndiaConsularBlog",
      url: process.env.NEXT_PUBLIC_BASE_URL || "https://indiahelpdesk.ca",
    },
    about: {
      "@type": "Thing",
      name: categoryName,
    },
    hasPart: posts.map((post) => ({
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://indiahelpdesk.ca"}/blsindia-canada/${post.slug}`,
      datePublished: new Date(post.date).toISOString(),
      author: {
        "@type": "Person",
        name: post.author.name,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-gray-50">
        <BlogHeader />
        <main className="container mx-auto px-4 py-8">
          <CategoryBreadcrumbs category={categoryName} />

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{categoryName} Articles</h1>
            <p className="text-gray-600 text-sm">
              Browse our collection of articles about {categoryName.toLowerCase()} for Indian citizens in Canada.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
              <h2 className="text-xl font-medium mb-2">No articles found</h2>
              <p className="text-gray-600 mb-4">We couldn't find any articles in this category.</p>
              <Button asChild>
                <Link href="/blsindia-canada">Browse All Articles</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  {post.featuredImage ? (
                    <div className="h-64 bg-gray-200">
                      <Image
                        src={post.featuredImage || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gray-200" />
                  )}
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.categories?.map((category) => (
                        <Badge key={category} variant="outline" className="text-xs text-blue-600 border-blue-200">
                          <Link href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>{category}</Link>
                        </Badge>
                      ))}
                    </div>
                    <h2 className="mb-2 text-xl font-semibold hover:text-blue-600 transition-colors">
                      <Link href={`/blsindia-canada/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <div className="mb-2 flex items-center text-xs text-gray-500">
                      <CalendarIcon className="mr-1 h-3 w-3" />
                      {post.date}
                      {post.readTime && <span className="ml-2">· {post.readTime}</span>}
                    </div>
                    {post.excerpt && <p className="mb-4 text-sm text-gray-600">{post.excerpt}</p>}
                    <div className="flex items-center justify-between">
                      <Button variant="link" className="p-0" asChild>
                        <Link href={`/blsindia-canada/${post.slug}`} className="flex items-center text-blue-600">
                          Read More
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Tag className="mr-1 h-3 w-3" />
                          <span>{post.tags.length} tags</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
        <BlogFooter />
      </div>
    </>
  )
}

function CategoryBreadcrumbs({ category }) {
  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <Link href="/" className="flex items-center hover:text-blue-600 transition-colors">
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/blog" className="hover:text-blue-600 transition-colors">
        Blog
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-gray-900 dark:text-gray-100 font-medium">{category}</span>
    </nav>
  )
}
