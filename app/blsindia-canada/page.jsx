import Link from "next/link"
import Image from "next/image"
import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { getAllBlogPosts } from "@/data/blog-posts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://indiahelpdesk.ca"

  return {
    title: "Blog - Indian Consular Services Guide | IndiaConsularBlog",
    description:
      "Latest articles and guides on Indian consular services for Indians living in Canada. Get expert advice on PCC, passport renewal, visa applications, and more.",
    keywords: [
      "Indian consular services blog",
      "Canada immigration blog",
      "PCC guide",
      "Indian passport renewal",
      "BLS services",
      "Indian visa Canada",
    ],
    authors: [{ name: "IndiaConsularBlog Team" }],
    creator: "IndiaConsularBlog",
    publisher: "IndiaConsularBlog",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/blog`,
    },
    openGraph: {
      title: "Blog - Indian Consular Services Guide",
      description: "Latest articles and guides on Indian consular services for Indians living in Canada.",
      url: `${baseUrl}/blog`,
      siteName: "IndiaConsularBlog",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "IndiaConsularBlog - Indian Consular Services Guide",
        },
      ],
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog - Indian Consular Services Guide",
      description: "Latest articles and guides on Indian consular services for Indians living in Canada.",
      images: ["/twitter-image.jpg"],
      creator: "@indiaconsularblog",
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Blog Posts</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              {post.featuredImage ? (
                <div className="h-52">
                  <Image
                    src={post.featuredImage || "/placeholder.svg"}
                    alt={post.title}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gray-200" />
              )}
              <CardContent className="p-4">
                <div className="mb-2 flex items-center text-xs text-gray-500">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {post.date}
                </div>
                <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
                {post.excerpt && <p className="mb-4 text-sm text-gray-600">{post.excerpt}</p>}
                <Button variant="link" className="p-0" asChild>
                  <Link href={`/blsindia-canada/${post.slug}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <BlogFooter />
    </div>
  )
}
