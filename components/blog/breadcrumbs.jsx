import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumbs() {
  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <Link href="/" className="flex items-center hover:text-blue-600 transition-colors">
        <Home className="h-4 w-4 mr-1" />
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/blog" className="hover:text-blue-600 transition-colors">
        Blog
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-gray-900 dark:text-gray-100 font-medium">Police Clearance Certificate</span>
    </nav>
  )
}
