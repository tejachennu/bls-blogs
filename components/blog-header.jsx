"use client"

import Link from "next/link"
import { Search, Menu, Globe, Phone, Mail, MapPin, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { searchBlogPosts } from "@/data/blog-posts"

export function BlogHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  // Debounced search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const timeoutId = setTimeout(() => {
      const results = searchBlogPosts(searchQuery)
      setSearchResults(results.slice(0, 5)) // Limit to 5 results
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleResultClick = (slug) => {
    router.push(`/blsindia-canada/${slug}`)
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60">
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-1">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>+1-416-491-9700</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span>info@indiahelpdesk.ca</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>BLS India Canada - Serving all of Canada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 bg-blue-600 rounded-md flex items-center justify-center">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-gray-900 dark:text-white">IndiaConsular</span>
              <span className="text-base font-bold text-blue-600">Blog</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/category/bls-services"
            className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            BLS Services
          </Link>
          <Link
            href="/category/immigration"
            className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            Immigration
          </Link>
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Search and Mobile Menu */}
        <div className="flex items-center space-x-2">
          {/* Desktop Search */}
          <div className="relative hidden sm:block">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search BLS India Canada services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-64 pl-8 h-8 text-xs bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
            </form>

            {/* Search Results Dropdown */}
            {isSearchOpen && (searchQuery.trim() !== "" || searchResults.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-1 z-50">
                <Card className="shadow-lg border border-gray-200">
                  <CardContent className="p-0">
                    {isSearching ? (
                      <div className="p-4 text-center text-sm text-gray-500">Searching...</div>
                    ) : searchResults.length > 0 ? (
                      <div className="max-h-80 overflow-y-auto">
                        {searchResults.map((post) => (
                          <div
                            key={post.id}
                            className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => handleResultClick(post.slug)}
                          >
                            <h4 className="text-sm font-medium text-gray-900 mb-1">{post.title}</h4>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">{post.excerpt}</p>
                            <div className="flex flex-wrap gap-1">
                              {post.tags?.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                        {searchQuery.trim() && (
                          <div className="p-3 border-t border-gray-100">
                            <button
                              onClick={handleSearchSubmit}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                            >
                              View all results for "{searchQuery}"
                            </button>
                          </div>
                        )}
                      </div>
                    ) : searchQuery.trim() !== "" ? (
                      <div className="p-4 text-center text-sm text-gray-500">No results found for "{searchQuery}"</div>
                    ) : null}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="sm"
            className="sm:hidden h-8 w-8 p-0 text-blue-600"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-3 w-3" />
          </Button>

          <Button size="sm" className="h-8 text-xs bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="https://blsindia-canada.ca/services">Get Help</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden h-8 w-8 p-0 text-blue-600">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-3 mt-6">
                <Link href="/" className="text-sm hover:text-blue-600 transition-colors">
                  Home
                </Link>
                <Link href="/blog" className="text-sm hover:text-blue-600 transition-colors">
                  Blog
                </Link>
                <Link href="/category/bls-services" className="text-sm hover:text-blue-600 transition-colors">
                  BLS Services
                </Link>
                <Link href="/category/immigration" className="text-sm hover:text-blue-600 transition-colors">
                  Immigration
                </Link>
                <Link href="/about" className="text-sm hover:text-blue-600 transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-sm hover:text-blue-600 transition-colors">
                  Contact
                </Link>
                <div className="pt-3">
                  <form onSubmit={handleSearchSubmit}>
                    <Input
                      type="search"
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs h-8"
                    />
                  </form>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="sm:hidden border-t bg-white dark:bg-gray-900 p-3">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-gray-500" />
              <Input
                type="search"
                placeholder="Search BLS India Canada services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 text-xs h-8"
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-1 top-1 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </form>

          {/* Mobile Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-2 space-y-2">
              {searchResults.map((post) => (
                <div
                  key={post.id}
                  className="p-2 bg-gray-50 rounded cursor-pointer"
                  onClick={() => handleResultClick(post.slug)}
                >
                  <h4 className="text-sm font-medium text-gray-900">{post.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-1">{post.excerpt}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search Backdrop */}
      {isSearchOpen && <div className="fixed inset-0 bg-black/20 z-30" onClick={() => setIsSearchOpen(false)} />}
    </header>
  )
}
