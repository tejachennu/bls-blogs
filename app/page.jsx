import { BlogSidebar } from "@/components/blog-sidebar"
import { BlogHeader } from "@/components/blog-header"
import { BlogFooter } from "@/components/blog-footer"
import { BlogRenderer } from "@/components/blog/blog-renderer"
import { pccBlogPost } from "@/data/blog-posts"
import { Breadcrumbs } from "@/components/blog/breadcrumbs"

// Dynamic metadata generation
export async function generateMetadata() {
  const post = pccBlogPost

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://indiahelpdesk.ca"
  const canonicalUrl = `${baseUrl}/`

  return {
    title: `${post.title} Guide for Indians in Canada | IndiaConsularBlog`,
    description:
      post.excerpt ||
      "Complete guide for Indian citizens in Canada to obtain a Police Clearance Certificate (PCC) from India. Step-by-step process, required documents, fees, and expert assistance.",
    keywords: [
      "Police Clearance Certificate",
      "PCC India",
      "Indian PCC Canada",
      "BLS International",
      "Indian consular services",
      "immigration documents",
      "passport services",
      "Indian citizens Canada",
      ...(post.tags || []),
    ],
    authors: [{ name: post.author.name || "IndiaConsularBlog Team" }],
    creator: "IndiaConsularBlog",
    publisher: "IndiaConsularBlog",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${post.title} Guide for Indians in Canada`,
      description:
        post.excerpt ||
        "Complete guide for Indian citizens in Canada to obtain a Police Clearance Certificate (PCC) from India.",
      url: canonicalUrl,
      siteName: "IndiaConsularBlog",
      images: [
        {
          url: post.featuredImage || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_CA",
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} Guide for Indians in Canada`,
      description:
        post.excerpt ||
        "Complete guide for Indian citizens in Canada to obtain a Police Clearance Certificate (PCC) from India.",
      images: [post.featuredImage || "/twitter-image.jpg"],
      creator: "@indiaconsularblog",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "article:author": post.author.name,
      "article:published_time": new Date(post.date).toISOString(),
      "article:modified_time": new Date().toISOString(),
      "article:section": post.categories?.[0] || "Immigration",
      "article:tag": post.tags?.join(",") || "",
    },
  }
}

export default function BlogPage() {
  const post = pccBlogPost

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage || "https://indiahelpdesk.ca/og-image.jpg",
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "IndiaConsularBlog",
      logo: {
        "@type": "ImageObject",
        url: "https://indiahelpdesk.ca/logo.png",
      },
    },
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://indiahelpdesk.ca",
    },
    keywords: post.tags?.join(", "),
    articleSection: post.categories?.[0] || "Immigration",
    wordCount: post.content.reduce((count, component) => {
      if (component.type === "paragraph") {
        return count + component.content.split(" ").length
      }
      return count
    }, 0),
    inLanguage: "en-CA",
    isAccessibleForFree: true,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
        <BlogHeader />
        <main className="container mx-auto px-4 py-8">
          <Breadcrumbs />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <BlogRenderer post={post} />
            </div>
            <BlogSidebar />
          </div>
        </main>
        <BlogFooter />
      </div>
    </>
  )
}
