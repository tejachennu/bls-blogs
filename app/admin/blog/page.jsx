"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BlogRenderer } from "@/components/blog/blog-renderer"
import { getAllBlogPosts } from "@/data/blog-posts"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Copy,
  Calendar,
  User,
  TrendingUp,
  FileText,
  Globe,
  Layers,
  Code,
  Settings,
  AlertCircle,
  AlertTriangle,
  ImageIcon,
  RefreshCw,
  Quote,
  CheckCircle,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Component templates for easy addition
const componentTemplates = {
  heading: {
    id: "",
    type: "heading",
    level: 2,
    content: "New Heading",
    anchor: "",
    className: "",
  },
  paragraph: {
    id: "",
    type: "paragraph",
    content: "New paragraph content goes here.",
    className: "",
  },
  list: {
    id: "",
    type: "list",
    items: [
      { content: "First item", children: [] },
      { content: "Second item", children: [] },
    ],
    className: "",
  },
  orderedList: {
    id: "",
    type: "orderedList",
    items: [
      { content: "First item", children: [] },
      { content: "Second item", children: [] },
    ],
    className: "",
  },
  alert: {
    id: "",
    type: "alert",
    title: "Alert Title",
    content: "Alert content goes here.",
    variant: "default",
    className: "",
  },
  warning: {
    id: "",
    type: "warning",
    title: "Warning Title",
    content: "Warning content goes here.",
    variant: "destructive",
    className: "",
  },
  image: {
    id: "",
    type: "image",
    src: "/placeholder.svg?height=400&width=600",
    alt: "Image description",
    width: 600,
    height: 400,
    className: "",
  },
  link: {
    id: "",
    type: "link",
    href: "https://example.com",
    content: "Link text",
    isExternal: true,
    className: "",
  },
  button: {
    id: "",
    type: "button",
    content: "Button Text",
    href: "https://example.com",
    variant: "default",
    size: "default",
    className: "",
  },
  separator: {
    id: "",
    type: "separator",
    className: "",
  },
  quote: {
    id: "",
    type: "quote",
    content: "Quote content goes here.",
    author: "Author Name",
    className: "",
  },
  card: {
    id: "",
    type: "card",
    title: "Card Title",
    content: "Card content goes here.",
    children: [],
    className: "",
  },
  table: {
    id: "",
    type: "table",
    headers: ["Header 1", "Header 2", "Header 3"],
    rows: [
      ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
      ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
    ],
    className: "",
  },
  cta: {
    id: "",
    type: "cta",
    title: "Call to Action Title",
    description: "CTA description goes here.",
    buttonText: "Click Here",
    buttonHref: "https://example.com",
    className: "",
  },
}

export default function AdminBlogPage() {
  const [blogPost, setBlogPost] = useState(getAllBlogPosts()[0])
  const [jsonView, setJsonView] = useState("")
  const [jsonError, setJsonError] = useState("")
  const [activeTab, setActiveTab] = useState("visual")
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const posts = getAllBlogPosts()

  // Filter posts based on search and category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || post.categories?.includes(selectedCategory)

    return matchesSearch && matchesCategory
  })

  // Get all categories for filter
  const allCategories = ["all", ...new Set(posts.flatMap((post) => post.categories || []))]

  const stats = {
    totalPosts: posts.length,
    published: posts.length, // Assuming all are published for now
    drafts: 0,
    totalViews: "12.5k", // Mock data
  }

  // Initialize JSON view
  useEffect(() => {
    setJsonView(JSON.stringify(blogPost, null, 2))
  }, [])

  // Generate unique ID for components
  const generateId = () => {
    return `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Handle JSON changes
  const handleJsonChange = (value) => {
    setJsonView(value)
    try {
      const parsed = JSON.parse(value)
      setBlogPost(parsed)
      setJsonError("")
    } catch (error) {
      setJsonError(error.message)
    }
  }

  // Update blog post and sync JSON
  const updateBlogPost = (updatedPost) => {
    setBlogPost(updatedPost)
    setJsonView(JSON.stringify(updatedPost, null, 2))
  }

  // Add new component
  const addComponent = (type) => {
    const template = { ...componentTemplates[type] }
    template.id = generateId()

    const updatedPost = {
      ...blogPost,
      content: [...blogPost.content, template],
    }
    updateBlogPost(updatedPost)
  }

  // Remove component
  const removeComponent = (index) => {
    const updatedPost = {
      ...blogPost,
      content: blogPost.content.filter((_, i) => i !== index),
    }
    updateBlogPost(updatedPost)
  }

  // Move component up/down
  const moveComponent = (index, direction) => {
    const newContent = [...blogPost.content]
    const newIndex = direction === "up" ? index - 1 : index + 1

    if (newIndex >= 0 && newIndex < newContent.length) {
      ;[newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]]
      updateBlogPost({ ...blogPost, content: newContent })
    }
  }

  // Update component
  const updateComponent = (index, updatedComponent) => {
    const updatedContent = [...blogPost.content]
    updatedContent[index] = updatedComponent
    updateBlogPost({ ...blogPost, content: updatedContent })
  }

  // Copy JSON to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonView)
      alert("JSON copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  // Download JSON file
  const downloadJson = () => {
    const blob = new Blob([jsonView], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${blogPost.slug || "blog-post"}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Load JSON file
  const loadJsonFile = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target.result
          const parsed = JSON.parse(content)
          setBlogPost(parsed)
          setJsonView(JSON.stringify(parsed, null, 2))
          setJsonError("")
        } catch (error) {
          setJsonError("Invalid JSON file")
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-sm text-gray-600">Manage your blog posts and content</p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/admin/blog/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Post
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold">{stats.totalPosts}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-green-600">{stats.published}</p>
                </div>
                <Globe className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.drafts}</p>
                </div>
                <Edit className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalViews}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search posts by title, content, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  All Categories
                </Button>
                {allCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Posts Table */}
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Categories</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <div className="text-gray-500">
                          <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                          <p>No posts found</p>
                          <p className="text-sm">Try adjusting your search or filters</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{post.title}</div>
                            {post.excerpt && (
                              <div className="text-sm text-gray-500 truncate max-w-md">{post.excerpt}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{post.author.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {post.categories?.map((category) => (
                              <Badge key={category} variant="outline" className="text-xs">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Published
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/blsindia-canada/${post.slug}`} className="flex items-center gap-2">
                                  <Eye className="h-4 w-4" />
                                  View Post
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/blog/edit/${post.id}`} className="flex items-center gap-2">
                                  <Edit className="h-4 w-4" />
                                  Edit Post
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2">
                                <Copy className="h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Editor */}
        {!isPreviewMode && (
          <div className="w-1/2 border-r border-gray-200 bg-white">
            {/* Tabs component should be imported and used here */}
            <div className="border-b border-gray-200 px-4">
              <div className="grid w-full grid-cols-3">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Visual Editor
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  JSON Editor
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Metadata
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="h-full m-0">
                <div className="p-4 space-y-4">
                  {/* Add Component Section */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Components
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.keys(componentTemplates).map((type) => {
                          const icons = {
                            heading: Layers,
                            paragraph: FileText,
                            list: ImageIcon,
                            orderedList: ImageIcon,
                            alert: AlertCircle,
                            warning: AlertTriangle,
                            image: ImageIcon,
                            link: Link,
                            button: Plus,
                            separator: RefreshCw,
                            quote: Quote,
                            card: Layers,
                            table: FileText,
                            cta: Plus,
                          }
                          const Icon = icons[type] || Plus

                          return (
                            <Button
                              key={type}
                              variant="outline"
                              size="sm"
                              onClick={() => addComponent(type)}
                              className="flex items-center gap-1 text-xs"
                            >
                              <Icon className="h-3 w-3" />
                              {type}
                            </Button>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Components List */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Content Components ({blogPost.content.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {blogPost.content.map((component, index) => (
                          <div
                            key={`${component.id}-${index}`}
                            className={`p-3 border rounded-md transition-colors ${
                              selectedComponent === index
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {component.type}
                                </Badge>
                                <span className="text-xs text-gray-600">#{index + 1}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => moveComponent(index, "up")}
                                  disabled={index === 0}
                                  className="h-6 w-6 p-0"
                                >
                                  ↑
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => moveComponent(index, "down")}
                                  disabled={index === blogPost.content.length - 1}
                                  className="h-6 w-6 p-0"
                                >
                                  ↓
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedComponent(selectedComponent === index ? null : index)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Settings className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeComponent(index)}
                                  className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            <div className="text-xs text-gray-700 truncate">
                              {component.content || component.title || `${component.type} component`}
                            </div>

                            {/* Component Editor */}
                            {selectedComponent === index && (
                              <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                                <ComponentEditor
                                  component={component}
                                  onChange={(updated) => updateComponent(index, updated)}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="h-full m-0">
                {jsonError && (
                  <Alert variant="destructive" className="m-4 mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>JSON Error: {jsonError}</AlertDescription>
                  </Alert>
                )}
                <div className="flex-1 p-4">
                  <Textarea
                    value={jsonView}
                    onChange={(e) => handleJsonChange(e.target.value)}
                    className="font-mono text-xs h-full resize-none"
                    placeholder="Enter your blog post JSON here..."
                  />
                </div>
              </div>

              <div className="h-full m-0">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    <MetadataEditor blogPost={blogPost} onChange={updateBlogPost} />
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        )}

        {/* Right Panel - Preview */}
        <div className={`${isPreviewMode ? "w-full" : "w-1/2"} bg-gray-50 overflow-auto`}>
          <div className="p-4">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    Live Preview
                  </h2>
                  {!jsonError && (
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Valid JSON
                    </Badge>
                  )}
                </div>
              </div>
              <div className="p-4">
                {jsonError ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Cannot render preview due to JSON errors. Please fix the JSON syntax.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <BlogRenderer post={blogPost} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component Editor for individual components
function ComponentEditor({ component, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...component, [field]: value })
  }

  const commonFields = (
    <>
      <div>
        <Label className="text-xs">ID</Label>
        <Input
          value={component.id || ""}
          onChange={(e) => updateField("id", e.target.value)}
          className="h-7 text-xs"
          placeholder="component-id"
        />
      </div>
      <div>
        <Label className="text-xs">CSS Classes</Label>
        <Input
          value={component.className || ""}
          onChange={(e) => updateField("className", e.target.value)}
          className="h-7 text-xs"
          placeholder="custom-class-name"
        />
      </div>
    </>
  )

  switch (component.type) {
    case "heading":
      return (
        <div className="space-y-2">
          <div>
            <Label className="text-xs">Content</Label>
            <Input
              value={component.content || ""}
              onChange={(e) => updateField("content", e.target.value)}
              className="h-7 text-xs"
            />
          </div>
          <div>
            <Label className="text-xs">Level</Label>
            <Select
              value={component.level?.toString()}
              onValueChange={(value) => updateField("level", Number.parseInt(value))}
            >
              <div className="h-7 text-xs">
                <div>{component.level?.toString()}</div>
              </div>
              <div>
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <div key={level} value={level.toString()}>
                    H{level}
                  </div>
                ))}
              </div>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Anchor</Label>
            <Input
              value={component.anchor || ""}
              onChange={(e) => updateField("anchor", e.target.value)}
              className="h-7 text-xs"
              placeholder="section-anchor"
            />
          </div>
          {commonFields}
        </div>
      )

    case "paragraph":
      return (
        <div className="space-y-2">
          <div>
            <Label className="text-xs">Content</Label>
            <Textarea
              value={component.content || ""}
              onChange={(e) => updateField("content", e.target.value)}
              className="text-xs min-h-[60px]"
            />
          </div>
          {commonFields}
        </div>
      )

    case "button":
      return (
        <div className="space-y-2">
          <div>
            <Label className="text-xs">Button Text</Label>
            <Input
              value={component.content || ""}
              onChange={(e) => updateField("content", e.target.value)}
              className="h-7 text-xs"
            />
          </div>
          <div>
            <Label className="text-xs">URL</Label>
            <Input
              value={component.href || ""}
              onChange={(e) => updateField("href", e.target.value)}
              className="h-7 text-xs"
              placeholder="https://example.com"
            />
          </div>
          <div>
            <Label className="text-xs">Variant</Label>
            <Select value={component.variant} onValueChange={(value) => updateField("variant", value)}>
              <div className="h-7 text-xs">
                <div>{component.variant}</div>
              </div>
              <div>
                <div value="default">Default</div>
                <div value="destructive">Destructive</div>
                <div value="outline">Outline</div>
                <div value="secondary">Secondary</div>
                <div value="ghost">Ghost</div>
                <div value="link">Link</div>
              </div>
            </Select>
          </div>
          {commonFields}
        </div>
      )

    case "alert":
    case "warning":
      return (
        <div className="space-y-2">
          <div>
            <Label className="text-xs">Title</Label>
            <Input
              value={component.title || ""}
              onChange={(e) => updateField("title", e.target.value)}
              className="h-7 text-xs"
            />
          </div>
          <div>
            <Label className="text-xs">Content</Label>
            <Textarea
              value={component.content || ""}
              onChange={(e) => updateField("content", e.target.value)}
              className="text-xs min-h-[60px]"
            />
          </div>
          <div>
            <Label className="text-xs">Variant</Label>
            <Select value={component.variant} onValueChange={(value) => updateField("variant", value)}>
              <div className="h-7 text-xs">
                <div>{component.variant}</div>
              </div>
              <div>
                <div value="default">Default</div>
                <div value="destructive">Destructive</div>
                <div value="success">Success</div>
                <div value="info">Info</div>
              </div>
            </Select>
          </div>
          {commonFields}
        </div>
      )

    case "image":
      return (
        <div className="space-y-2">
          <div>
            <Label className="text-xs">Image URL</Label>
            <Input
              value={component.src || ""}
              onChange={(e) => updateField("src", e.target.value)}
              className="h-7 text-xs"
              placeholder="/placeholder.svg?height=400&width=600"
            />
          </div>
          <div>
            <Label className="text-xs">Alt Text</Label>
            <Input
              value={component.alt || ""}
              onChange={(e) => updateField("alt", e.target.value)}
              className="h-7 text-xs"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Width</Label>
              <Input
                type="number"
                value={component.width || ""}
                onChange={(e) => updateField("width", Number.parseInt(e.target.value))}
                className="h-7 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Height</Label>
              <Input
                type="number"
                value={component.height || ""}
                onChange={(e) => updateField("height", Number.parseInt(e.target.value))}
                className="h-7 text-xs"
              />
            </div>
          </div>
          {commonFields}
        </div>
      )

    default:
      return (
        <div className="space-y-2">
          <div>
            <Label className="text-xs">Raw JSON</Label>
            <Textarea
              value={JSON.stringify(component, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value)
                  onChange(parsed)
                } catch (error) {
                  // Handle JSON parse error
                }
              }}
              className="font-mono text-xs min-h-[100px]"
            />
          </div>
        </div>
      )
  }
}

// Metadata Editor Component
function MetadataEditor({ blogPost, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...blogPost, [field]: value })
  }

  const updateAuthor = (field, value) => {
    onChange({
      ...blogPost,
      author: { ...blogPost.author, [field]: value },
    })
  }

  const updateTags = (tagsString) => {
    const tags = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag)
    updateField("tags", tags)
  }

  const updateCategories = (categoriesString) => {
    const categories = categoriesString
      .split(",")
      .map((cat) => cat.trim())
      .filter((cat) => cat)
    updateField("categories", categories)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-xs">Title</Label>
            <Input
              value={blogPost.title || ""}
              onChange={(e) => updateField("title", e.target.value)}
              className="h-8 text-xs"
            />
          </div>
          <div>
            <Label className="text-xs">Slug</Label>
            <Input
              value={blogPost.slug || ""}
              onChange={(e) => updateField("slug", e.target.value)}
              className="h-8 text-xs"
            />
          </div>
          <div>
            <Label className="text-xs">Excerpt</Label>
            <Textarea
              value={blogPost.excerpt || ""}
              onChange={(e) => updateField("excerpt", e.target.value)}
              className="text-xs min-h-[60px]"
            />
          </div>
          <div>
            <Label className="text-xs">Featured Image URL</Label>
            <Input
              value={blogPost.featuredImage || ""}
              onChange={(e) => updateField("featuredImage", e.target.value)}
              className="h-8 text-xs"
              placeholder="/placeholder.svg?height=400&width=600"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Author Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-xs">Author Name</Label>
            <Input
              value={blogPost.author?.name || ""}
              onChange={(e) => updateAuthor("name", e.target.value)}
              className="h-8 text-xs"
            />
          </div>
          <div>
            <Label className="text-xs">Author Role</Label>
            <Input
              value={blogPost.author?.role || ""}
              onChange={(e) => updateAuthor("role", e.target.value)}
              className="h-8 text-xs"
            />
          </div>
          <div>
            <Label className="text-xs">Author Avatar URL</Label>
            <Input
              value={blogPost.author?.avatar || ""}
              onChange={(e) => updateAuthor("avatar", e.target.value)}
              className="h-8 text-xs"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Publishing Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-xs">Date</Label>
            <Input
              value={blogPost.date || ""}
              onChange={(e) => updateField("date", e.target.value)}
              className="h-8 text-xs"
              placeholder="June 10, 2025"
            />
          </div>
          <div>
            <Label className="text-xs">Read Time</Label>
            <Input
              value={blogPost.readTime || ""}
              onChange={(e) => updateField("readTime", e.target.value)}
              className="h-8 text-xs"
              placeholder="5 min read"
            />
          </div>
          <div>
            <Label className="text-xs">Tags (comma-separated)</Label>
            <Input
              value={blogPost.tags?.join(", ") || ""}
              onChange={(e) => updateTags(e.target.value)}
              className="h-8 text-xs"
              placeholder="PCC, Immigration, Canada"
            />
          </div>
          <div>
            <Label className="text-xs">Categories (comma-separated)</Label>
            <Input
              value={blogPost.categories?.join(", ") || ""}
              onChange={(e) => updateCategories(e.target.value)}
              className="h-8 text-xs"
              placeholder="Immigration, Documents"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
