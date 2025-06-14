import Link from "next/link"
import Image from "next/image"
import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { searchBlogPosts } from "@/data/blog-posts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Tag, ChevronRight, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export async function generateMetadata({ searchParams }) {
  const query = searchParams.q || ""
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://indiahelpdesk.ca"

  return {
    title: query ? `Search Results for "${query}" | IndiaConsularBlog` : "Search | IndiaConsularBlog",
    description: query
      ? `Search results for "${query}" on IndiaConsularBlog. Find articles about BLS India Canada services, immigration, and Indian consular services.`
      : "Search IndiaConsularBlog for articles about BLS India Canada services, immigration, and Indian consular services.",
    keywords: ["search", "BLS India Canada", "IndiaHelpDesk", "Indian consular services", query].filter(Boolean),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/search${query ? `?q=${encodeURIComponent(query)}` : ""}`,
    },
    openGraph: {
      title: query ? `Search Results for "${query}"` : "Search IndiaConsularBlog",
      description: query
        ? `Search results for "${query}" on IndiaConsularBlog`
        : "Search IndiaConsularBlog for articles about Indian consular services",
      url: `${baseUrl}/search${query ? `?q=${encodeURIComponent(query)}` : ""}`,
      siteName: "IndiaConsularBlog",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "IndiaConsularBlog Search",
        },
      ],
      locale: "en_CA",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function SearchPage({ searchParams }) {
  const query = searchParams.q || ""
  const results = query ? searchBlogPosts(query) : []

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-blue-600" />
            <h1 className="text-2xl font-bold">{query ? `Search Results for "${query}"` : "Search"}</h1>
          </div>

          {query && (
            <p className="text-gray-600 text-sm">
              Found {results.length} result{results.length !== 1 ? "s" : ""} for your search.
            </p>
          )}
        </div>

        {!query ? (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">Search IndiaConsularBlog</h2>
            <p className="text-gray-600 mb-4">
              Find articles about BLS India Canada services, immigration guides, and Indian consular services.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="outline">BLS India Canada</Badge>
                <Badge variant="outline">PCC</Badge>
                <Badge variant="outline">Passport Renewal</Badge>
                <Badge variant="outline">OCI Card</Badge>
                <Badge variant="outline">Indian Visa</Badge>
                <Badge variant="outline">IndiaHelpDesk</Badge>
              </div>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
            <h2 className="text-xl font-medium mb-2">No results found</h2>
            <p className="text-gray-600 mb-4">
              We couldn't find any articles matching "{query}". Try different keywords or browse our categories.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/category/bls-services">BLS Services</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/category/immigration">Immigration</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/category/documents">Documents</Link>
              </Button>
            </div>
            <Button asChild>
              <Link href="/blog">Browse All Articles</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                {post.featuredImage ? (
                  <div className="h-48 bg-gray-200">
                    <Image
                      src={post.featuredImage || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <div className="text-blue-600 text-center">
                      <Search className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">IndiaConsularBlog</p>
                    </div>
                  </div>
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
                  {post.excerpt && <p className="mb-4 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>}
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

        {/* SEO Content for Target Keywords */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">About IndiaConsularBlog & BLS India Canada</h2>
          <div className="prose prose-sm max-w-none text-gray-700">
            <p className="mb-4">
              <strong>IndiaConsularBlog</strong> is your trusted source for comprehensive information about Indian
              consular services in Canada. We specialize in providing detailed guides and expert assistance for all{" "}
              <strong>BLS India Canada</strong> services.
            </p>
            <p className="mb-4">
              Our platform serves as an <strong>IndiaHelpDesk</strong> for Indian citizens and people of Indian origin
              living in Canada. Whether you need help with Police Clearance Certificate (PCC), passport renewal, OCI
              card applications, or Indian visa services, we provide step-by-step guidance and professional assistance.
            </p>
            <p className="mb-4">
              <strong>BLS India Canada</strong> operates multiple centers across Canada including Toronto, Vancouver,
              Calgary, and Ottawa. Our guides cover all aspects of their services, from document requirements to
              processing times and fees.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="font-semibold mb-2">Popular Services:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Police Clearance Certificate (PCC)</li>
                  <li>• Indian Passport Renewal</li>
                  <li>• OCI Card Applications</li>
                  <li>• Indian Visa Services</li>
                  <li>• Document Attestation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Coverage Areas:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Toronto, Ontario</li>
                  <li>• Vancouver, British Columbia</li>
                  <li>• Calgary, Alberta</li>
                  <li>• Ottawa, Ontario</li>
                  <li>• All provinces across Canada</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BlogFooter />
    </div>
  )
}
