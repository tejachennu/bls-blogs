"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { BlogRenderer } from "@/components/blog/blog-renderer"
import { SeoPreview } from "@/components/admin/seo-preview"
import {
  Plus,
  Trash2,
  Copy,
  Download,
  Upload,
  Eye,
  Code,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  FileText,
  Settings,
  Layers,
  Type,
  List,
  ImageIcon,
  LinkIcon,
  Quote,
  Table,
  AlertTriangle,
  PanelLeft,
  PanelRight,
  Globe,
  ArrowLeft,
  HelpCircle,
  Clock,
  Clipboard,
  DollarSign,
  Building,
  Play,
  FormInput,
  NotebookTabsIcon,
  LayoutGrid,
  Sparkles,
} from "lucide-react"

// Empty blog post template
const emptyBlogPost = {
  id: "",
  title: "New Blog Post",
  slug: "",
  author: {
    name: "Admin",
    role: "Author",
    avatar: "",
  },
  date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  readTime: "5 min read",
  excerpt: "",
  featuredImage: "",
  tags: [],
  categories: [],
  content: [],
  seo: {
    metaTitle: "",
    metaDescription: "",
    focusKeywords: [],
    canonicalUrl: "",
    ogImage: "",
    noIndex: false,
    structuredData: {},
  },
}

// Component templates for easy addition - now includes both dynamic and basic components
const componentTemplates = {
  // Dynamic/Styled Components
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
  faq: {
    id: "",
    type: "faq",
    questions: [
      {
        question: "Sample question?",
        answer: "Sample answer goes here.",
      },
    ],
    className: "",
  },
  timeline: {
    id: "",
    type: "timeline",
    events: [
      {
        title: "Step 1",
        description: "First step description",
        duration: "1-2 days",
      },
    ],
    className: "",
  },
  checklist: {
    id: "",
    type: "checklist",
    title: "Document Checklist",
    items: ["First item to check", "Second item to check"],
    className: "",
  },
  pricing: {
    id: "",
    type: "pricing",
    plans: [
      {
        name: "Basic Plan",
        price: "99",
        period: "month",
        features: ["Feature 1", "Feature 2"],
        buttonText: "Get Started",
      },
    ],
    className: "",
  },
  contact: {
    id: "",
    type: "contact",
    contacts: [
      {
        office: "Main Office",
        address: "123 Main St, City, State",
        phone: "+1 (555) 123-4567",
        email: "info@example.com",
        hours: "Mon-Fri 9AM-5PM",
      },
    ],
    className: "",
  },
  video: {
    id: "",
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Video Title",
    thumbnail: "/placeholder.svg?height=400&width=600",
    className: "",
  },
  // Basic Components
  basicHeading: {
    id: "",
    type: "basicHeading",
    level: 2,
    content: "Basic Heading",
    anchor: "",
    className: "",
  },
  basicParagraph: {
    id: "",
    type: "basicParagraph",
    content: "Basic paragraph content goes here.",
    className: "",
  },
  basicList: {
    id: "",
    type: "basicList",
    items: [
      { content: "First item", children: [] },
      { content: "Second item", children: [] },
    ],
    className: "",
  },
  basicOrderedList: {
    id: "",
    type: "basicOrderedList",
    items: [
      { content: "First item", children: [] },
      { content: "Second item", children: [] },
    ],
    className: "",
  },
  basicAlert: {
    id: "",
    type: "basicAlert",
    title: "Basic Alert Title",
    content: "Basic alert content goes here.",
    variant: "default",
    className: "",
  },
  basicImage: {
    id: "",
    type: "basicImage",
    src: "/placeholder.svg?height=400&width=600",
    alt: "Basic image description",
    width: 600,
    height: 400,
    className: "",
  },
  basicLink: {
    id: "",
    type: "basicLink",
    href: "https://example.com",
    content: "Basic link text",
    isExternal: true,
    className: "",
  },
  basicButton: {
    id: "",
    type: "basicButton",
    content: "Basic Button Text",
    href: "https://example.com",
    className: "",
  },
  basicSeparator: {
    id: "",
    type: "basicSeparator",
    className: "",
  },
  basicQuote: {
    id: "",
    type: "basicQuote",
    content: "Basic quote content goes here.",
    author: "Author Name",
    className: "",
  },
  basicCard: {
    id: "",
    type: "basicCard",
    title: "Basic Card Title",
    content: "Basic card content goes here.",
    children: [],
    className: "",
  },
  basicTable: {
    id: "",
    type: "basicTable",
    headers: ["Header 1", "Header 2", "Header 3"],
    rows: [
      ["Row 1 Col 1", "Row 1 Col 2", "Row 1 Col 3"],
      ["Row 2 Col 1", "Row 2 Col 2", "Row 2 Col 3"],
    ],
    className: "",
  },
  basicCode: {
    id: "",
    type: "basicCode",
    content: "console.log('Hello World');",
    language: "javascript",
    className: "",
  },
  basicVideo: {
    id: "",
    type: "basicVideo",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Basic Video Title",
    className: "",
  },
  basicAccordion: {
    id: "",
    type: "basicAccordion",
    items: [
      {
        question: "Basic question?",
        answer: "Basic answer goes here.",
      },
    ],
    className: "",
  },
  basicTimeline: {
    id: "",
    type: "basicTimeline",
    events: [
      {
        title: "Basic Step 1",
        description: "Basic first step description",
        duration: "1-2 days",
      },
    ],
    className: "",
  },
  basicForm: {
    id: "",
    type: "basicForm",
    fields: [
      {
        name: "name",
        label: "Name",
        type: "text",
        placeholder: "Enter your name",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
      },
    ],
    submitText: "Submit",
    className: "",
  },
  basicTabs: {
    id: "",
    type: "basicTabs",
    tabs: [
      {
        title: "Tab 1",
        content: "Content for tab 1",
      },
      {
        title: "Tab 2",
        content: "Content for tab 2",
      },
    ],
    className: "",
  },
  basicGrid: {
    id: "",
    type: "basicGrid",
    columns: 2,
    children: [
      {
        type: "basicParagraph",
        content: "Grid item 1",
      },
      {
        type: "basicParagraph",
        content: "Grid item 2",
      },
    ],
    className: "",
  },
}

export default function NewBlogPostPage() {
  const [blogPost, setBlogPost] = useState(emptyBlogPost)
  const [jsonView, setJsonView] = useState("")
  const [jsonError, setJsonError] = useState("")
  const [activeTab, setActiveTab] = useState("content")
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [saveStatus, setSaveStatus] = useState("")

  // Initialize JSON view
  useEffect(() => {
    setJsonView(JSON.stringify(blogPost, null, 2))
  }, [])

  // Generate unique ID for components
  const generateId = () => {
    return `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
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

    // Auto-select the newly added component
    setSelectedComponent(blogPost.content.length)
  }

  // Remove component
  const removeComponent = (index) => {
    const updatedPost = {
      ...blogPost,
      content: blogPost.content.filter((_, i) => i !== index),
    }
    updateBlogPost(updatedPost)

    // Clear selection if the selected component was removed
    if (selectedComponent === index) {
      setSelectedComponent(null)
    } else if (selectedComponent > index) {
      // Adjust selection if a component before the selected one was removed
      setSelectedComponent(selectedComponent - 1)
    }
  }

  // Move component up/down
  const moveComponent = (index, direction) => {
    const newContent = [...blogPost.content]
    const newIndex = direction === "up" ? index - 1 : index + 1

    if (newIndex >= 0 && newIndex < newContent.length) {
      ;[newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]]
      updateBlogPost({ ...blogPost, content: newContent })

      // Update selection to follow the moved component
      setSelectedComponent(newIndex)
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
      setSaveStatus("JSON copied to clipboard!")
      setTimeout(() => setSaveStatus(""), 3000)
    } catch (err) {
      console.error("Failed to copy:", err)
      setSaveStatus("Failed to copy to clipboard")
      setTimeout(() => setSaveStatus(""), 3000)
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

    setSaveStatus("JSON downloaded successfully!")
    setTimeout(() => setSaveStatus(""), 3000)
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
          setSaveStatus("JSON loaded successfully!")
          setTimeout(() => setSaveStatus(""), 3000)
        } catch (error) {
          setJsonError("Invalid JSON file")
          setSaveStatus("Failed to load JSON: Invalid format")
          setTimeout(() => setSaveStatus(""), 3000)
        }
      }
      reader.readAsText(file)
    }
  }

  // Handle title change and auto-generate slug if empty
  const handleTitleChange = (title) => {
    const updatedPost = { ...blogPost, title }

    // Auto-generate slug if it's empty or unchanged from previous auto-generation
    if (!blogPost.slug || blogPost.slug === generateSlug(blogPost.title)) {
      updatedPost.slug = generateSlug(title)
    }

    updateBlogPost(updatedPost)
  }

  // Update SEO fields
  const updateSeoField = (field, value) => {
    const updatedPost = {
      ...blogPost,
      seo: {
        ...blogPost.seo,
        [field]: value,
      },
    }
    updateBlogPost(updatedPost)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="flex items-center gap-2">
              <Link href="/admin/blog">
                <ArrowLeft className="h-4 w-4" />
                Back to Posts
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>
              <p className="text-sm text-gray-600">Create and edit blog posts with live preview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {saveStatus && (
              <div className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-md border border-green-200 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                {saveStatus}
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              {isPreviewMode ? "Edit Mode" : "Preview Mode"}
            </Button>
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Copy JSON
            </Button>
            <Button variant="outline" size="sm" onClick={downloadJson} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <label className="cursor-pointer">
              <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                <span>
                  <Upload className="h-4 w-4" />
                  Load JSON
                </span>
              </Button>
              <input type="file" accept=".json" onChange={loadJsonFile} className="hidden" />
            </label>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Editor */}
        {!isPreviewMode && (
          <div
            className={`${isSidebarCollapsed ? "w-16" : "w-1/2"} border-r border-gray-200 bg-white transition-all duration-300`}
          >
            {isSidebarCollapsed ? (
              <div className="h-full flex flex-col items-center py-4">
                <Button variant="ghost" size="sm" onClick={() => setIsSidebarCollapsed(false)} className="mb-4">
                  <PanelRight className="h-4 w-4" />
                </Button>
                <div className="flex flex-col gap-2 items-center">
                  <Button
                    variant={activeTab === "content" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("content")}
                    className="w-10 h-10 p-0"
                  >
                    <Layers className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={activeTab === "seo" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("seo")}
                    className="w-10 h-10 p-0"
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={activeTab === "json" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("json")}
                    className="w-10 h-10 p-0"
                  >
                    <Code className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab("settings")}
                    className="w-10 h-10 p-0"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                <div className="border-b border-gray-200 px-4 flex items-center justify-between">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="content" className="flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="seo" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      SEO
                    </TabsTrigger>
                    <TabsTrigger value="json" className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      JSON
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </TabsTrigger>
                  </TabsList>
                  <Button variant="ghost" size="sm" onClick={() => setIsSidebarCollapsed(true)} className="ml-2">
                    <PanelLeft className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex-1 overflow-hidden">
                  <TabsContent value="content" className="h-full m-0 overflow-auto">
                    <div className="p-4 space-y-4">
                      {/* Basic Info */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              value={blogPost.title}
                              onChange={(e) => handleTitleChange(e.target.value)}
                              className="h-9"
                            />
                          </div>
                          <div>
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                              id="slug"
                              value={blogPost.slug}
                              onChange={(e) => updateBlogPost({ ...blogPost, slug: e.target.value })}
                              className="h-9"
                            />
                          </div>
                          <div>
                            <Label htmlFor="excerpt">Excerpt</Label>
                            <Textarea
                              id="excerpt"
                              value={blogPost.excerpt}
                              onChange={(e) => updateBlogPost({ ...blogPost, excerpt: e.target.value })}
                              className="min-h-[60px]"
                              placeholder="Brief summary of the blog post"
                            />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Add Component Section */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Components
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Styled Components */}
                            <div>
                              <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">
                                <Sparkles className="h-3 w-3" />
                                Styled Components
                              </h4>
                              <div className="grid grid-cols-3 gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("heading")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Type className="h-3 w-3" />
                                  Heading
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("paragraph")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <FileText className="h-3 w-3" />
                                  Paragraph
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("list")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <List className="h-3 w-3" />
                                  List
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("orderedList")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <List className="h-3 w-3" />
                                  Ordered List
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("alert")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <AlertCircle className="h-3 w-3" />
                                  Alert
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("warning")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <AlertTriangle className="h-3 w-3" />
                                  Warning
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("image")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <ImageIcon className="h-3 w-3" />
                                  Image
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("link")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <LinkIcon className="h-3 w-3" />
                                  Link
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("button")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Plus className="h-3 w-3" />
                                  Button
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("separator")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <RefreshCw className="h-3 w-3" />
                                  Separator
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("quote")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Quote className="h-3 w-3" />
                                  Quote
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("card")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Layers className="h-3 w-3" />
                                  Card
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("table")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Table className="h-3 w-3" />
                                  Table
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("cta")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Plus className="h-3 w-3" />
                                  CTA
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("faq")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <HelpCircle className="h-3 w-3" />
                                  FAQ
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("timeline")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Clock className="h-3 w-3" />
                                  Timeline
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("checklist")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Clipboard className="h-3 w-3" />
                                  Checklist
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("pricing")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <DollarSign className="h-3 w-3" />
                                  Pricing
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("contact")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Building className="h-3 w-3" />
                                  Contact
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("video")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Play className="h-3 w-3" />
                                  Video
                                </Button>
                              </div>
                            </div>

                            {/* Basic Components */}
                            <div>
                              <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center gap-1">
                                <Code className="h-3 w-3" />
                                Basic Components
                              </h4>
                              <div className="grid grid-cols-3 gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicHeading")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Type className="h-3 w-3" />
                                  Basic Heading
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicParagraph")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <FileText className="h-3 w-3" />
                                  Basic Paragraph
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicList")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <List className="h-3 w-3" />
                                  Basic List
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicOrderedList")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <List className="h-3 w-3" />
                                  Basic Ordered
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicAlert")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <AlertCircle className="h-3 w-3" />
                                  Basic Alert
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicImage")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <ImageIcon className="h-3 w-3" />
                                  Basic Image
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicLink")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <LinkIcon className="h-3 w-3" />
                                  Basic Link
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicButton")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Plus className="h-3 w-3" />
                                  Basic Button
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicSeparator")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <RefreshCw className="h-3 w-3" />
                                  Basic Separator
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicQuote")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Quote className="h-3 w-3" />
                                  Basic Quote
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicCard")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Layers className="h-3 w-3" />
                                  Basic Card
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicTable")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Table className="h-3 w-3" />
                                  Basic Table
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicCode")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Code className="h-3 w-3" />
                                  Basic Code
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicVideo")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Play className="h-3 w-3" />
                                  Basic Video
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicAccordion")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <HelpCircle className="h-3 w-3" />
                                  Basic Accordion
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicTimeline")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <Clock className="h-3 w-3" />
                                  Basic Timeline
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicForm")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <FormInput className="h-3 w-3" />
                                  Basic Form
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicTabs")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <NotebookTabsIcon className="h-3 w-3" />
                                  Basic Tabs
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addComponent("basicGrid")}
                                  className="flex items-center gap-1 text-xs"
                                >
                                  <LayoutGrid className="h-3 w-3" />
                                  Basic Grid
                                </Button>
                              </div>
                            </div>
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
                            {blogPost.content.length === 0 && (
                              <div className="text-center p-4 border border-dashed border-gray-300 rounded-md">
                                <p className="text-gray-500 text-sm">No components added yet</p>
                                <p className="text-gray-400 text-xs mt-1">Use the buttons above to add content</p>
                              </div>
                            )}

                            {blogPost.content.map((component, index) => (
                              <div
                                key={`${component.id || index}`}
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
                  </TabsContent>

                  <TabsContent value="seo" className="h-full m-0 overflow-auto">
                    <div className="p-4 space-y-4">
                      <SeoEditor blogPost={blogPost} updateSeoField={updateSeoField} updateBlogPost={updateBlogPost} />
                    </div>
                  </TabsContent>

                  <TabsContent value="json" className="h-full m-0">
                    <div className="h-full flex flex-col">
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
                  </TabsContent>

                  <TabsContent value="settings" className="h-full m-0 overflow-auto">
                    <div className="p-4 space-y-4">
                      <MetadataEditor blogPost={blogPost} onChange={updateBlogPost} />
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            )}
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

  // Handle basic components
  if (component.type?.startsWith("basic")) {
    const baseType = component.type.replace("basic", "").toLowerCase()

    switch (baseType) {
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
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((level) => (
                    <SelectItem key={level} value={level.toString()}>
                      H{level}
                    </SelectItem>
                  ))}
                </SelectContent>
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

      case "code":
        return (
          <div className="space-y-2">
            <div>
              <Label className="text-xs">Code Content</Label>
              <Textarea
                value={component.content || ""}
                onChange={(e) => updateField("content", e.target.value)}
                className="text-xs min-h-[80px] font-mono"
                placeholder="console.log('Hello World');"
              />
            </div>
            <div>
              <Label className="text-xs">Language</Label>
              <Input
                value={component.language || ""}
                onChange={(e) => updateField("language", e.target.value)}
                className="h-7 text-xs"
                placeholder="javascript"
              />
            </div>
            {commonFields}
          </div>
        )

      case "form":
        return (
          <div className="space-y-2">
            <div>
              <Label className="text-xs">Form Fields</Label>
              <div className="space-y-2 mt-2">
                {component.fields?.map((field, idx) => (
                  <div key={idx} className="border p-2 rounded text-xs">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <Input
                        value={field.name || ""}
                        onChange={(e) => {
                          const newFields = [...component.fields]
                          newFields[idx] = { ...newFields[idx], name: e.target.value }
                          updateField("fields", newFields)
                        }}
                        className="h-6 text-xs"
                        placeholder="Field name"
                      />
                      <Input
                        value={field.label || ""}
                        onChange={(e) => {
                          const newFields = [...component.fields]
                          newFields[idx] = { ...newFields[idx], label: e.target.value }
                          updateField("fields", newFields)
                        }}
                        className="h-6 text-xs"
                        placeholder="Field label"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={field.type || ""}
                        onChange={(e) => {
                          const newFields = [...component.fields]
                          newFields[idx] = { ...newFields[idx], type: e.target.value }
                          updateField("fields", newFields)
                        }}
                        className="h-6 text-xs"
                        placeholder="Field type"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newFields = component.fields.filter((_, i) => i !== idx)
                          updateField("fields", newFields)
                        }}
                        className="h-6 w-6 p-0 text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newFields = [
                      ...(component.fields || []),
                      {
                        name: "",
                        label: "",
                        type: "text",
                        placeholder: "",
                        required: false,
                      },
                    ]
                    updateField("fields", newFields)
                  }}
                  className="w-full text-xs mt-1"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Field
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-xs">Submit Button Text</Label>
              <Input
                value={component.submitText || ""}
                onChange={(e) => updateField("submitText", e.target.value)}
                className="h-7 text-xs"
                placeholder="Submit"
              />
            </div>
            {commonFields}
          </div>
        )

      case "tabs":
        return (
          <div className="space-y-2">
            <div>
              <Label className="text-xs">Tabs</Label>
              <div className="space-y-2 mt-2">
                {component.tabs?.map((tab, idx) => (
                  <div key={idx} className="border p-2 rounded text-xs">
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={tab.title || ""}
                        onChange={(e) => {
                          const newTabs = [...component.tabs]
                          newTabs[idx] = { ...newTabs[idx], title: e.target.value }
                          updateField("tabs", newTabs)
                        }}
                        className="h-6 text-xs"
                        placeholder="Tab title"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newTabs = component.tabs.filter((_, i) => i !== idx)
                          updateField("tabs", newTabs)
                        }}
                        className="h-6 w-6 p-0 text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <Textarea
                      value={tab.content || ""}
                      onChange={(e) => {
                        const newTabs = [...component.tabs]
                        newTabs[idx] = { ...newTabs[idx], content: e.target.value }
                        updateField("tabs", newTabs)
                      }}
                      className="text-xs min-h-[40px]"
                      placeholder="Tab content"
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newTabs = [...(component.tabs || []), { title: "", content: "" }]
                    updateField("tabs", newTabs)
                  }}
                  className="w-full text-xs mt-1"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Tab
                </Button>
              </div>
            </div>
            {commonFields}
          </div>
        )

      case "accordion":
        return (
          <div className="space-y-2">
            <div>
              <Label className="text-xs">Accordion Items</Label>
              <div className="space-y-2 mt-2">
                {component.items?.map((item, idx) => (
                  <div key={idx} className="border p-2 rounded text-xs">
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={item.question || item.title || ""}
                        onChange={(e) => {
                          const newItems = [...component.items]
                          newItems[idx] = { ...newItems[idx], question: e.target.value, title: e.target.value }
                          updateField("items", newItems)
                        }}
                        className="h-6 text-xs"
                        placeholder="Question/Title"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newItems = component.items.filter((_, i) => i !== idx)
                          updateField("items", newItems)
                        }}
                        className="h-6 w-6 p-0 text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <Textarea
                      value={item.answer || item.content || ""}
                      onChange={(e) => {
                        const newItems = [...component.items]
                        newItems[idx] = { ...newItems[idx], answer: e.target.value, content: e.target.value }
                        updateField("items", newItems)
                      }}
                      className="text-xs min-h-[40px]"
                      placeholder="Answer/Content"
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newItems = [...(component.items || []), { question: "", answer: "" }]
                    updateField("items", newItems)
                  }}
                  className="w-full text-xs mt-1"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Item
                </Button>
              </div>
            </div>
            {commonFields}
          </div>
        )

      default:
        // For other basic components, fall through to the main switch
        break
    }
  }

  // Handle regular components (existing code continues...)
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
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    H{level}
                  </SelectItem>
                ))}
              </SelectContent>
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

    case "list":
    case "orderedList":
      return (
        <div className="space-y-2">
          <div>
            <Label className="text-xs">List Items</Label>
            <div className="space-y-2 mt-2">
              {component.items?.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input
                    value={item.content || ""}
                    onChange={(e) => {
                      const newItems = [...component.items]
                      newItems[idx] = { ...newItems[idx], content: e.target.value }
                      updateField("items", newItems)
                    }}
                    className="h-7 text-xs"
                    placeholder={`Item ${idx + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newItems = component.items.filter((_, i) => i !== idx)
                      updateField("items", newItems)
                    }}
                    className="h-7 w-7 p-0 text-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newItems = [...(component.items || []), { content: "", children: [] }]
                  updateField("items", newItems)
                }}
                className="w-full text-xs mt-1"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Item
              </Button>
            </div>
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
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="destructive">Destructive</SelectItem>
                <SelectItem value="outline">Outline</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="ghost">Ghost</SelectItem>
                <SelectItem value="link">Link</SelectItem>
              </SelectContent>
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
              <SelectTrigger className="h-7 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="destructive">Destructive</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
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

    case "link":
      return (
        <div className="space-y-2">
          <div>
            <Label className="text-xs">Link Text</Label>
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
          <div className="flex items-center space-x-2">
            <Switch
              id="external-link"
              checked={component.isExternal || false}
              onCheckedChange={(checked) => updateField("isExternal", checked)}
            />
            <Label htmlFor="external-link" className="text-xs">
              External Link
            </Label>
          </div>
          {commonFields}
        </div>
      )

    case "quote":
      return (
        <div className="space-y-2">
          <div>
            <Label className="text-xs">Quote Content</Label>
            <Textarea
              value={component.content || ""}
              onChange={(e) => updateField("content", e.target.value)}
              className="text-xs min-h-[60px]"
            />
          </div>
          <div>
            <Label className="text-xs">Author</Label>
            <Input
              value={component.author || ""}
              onChange={(e) => updateField("author", e.target.value)}
              className="h-7 text-xs"
            />
          </div>
          {commonFields}
        </div>
      )

    case "card":
      return (
        <div className="space-y-2">
          <div>
            <Label className="text-xs">Card Title</Label>
            <Input
              value={component.title || ""}
              onChange={(e) => updateField("title", e.target.value)}
              className="h-7 text-xs"
            />
          </div>
          <div>
            <Label className="text-xs">Card Content</Label>
            <Textarea
              value={component.content || ""}
              onChange={(e) => updateField("content", e.target.value)}
              className="text-xs min-h-[60px]"
            />
          </div>
          <div>
            <Label className="text-xs">Background Color</Label>
            <Input
              value={component.className?.includes("bg-") ? component.className : ""}
              onChange={(e) => updateField("className", e.target.value)}
              className="h-7 text-xs"
              placeholder="bg-blue-50"
            />
            <p className="text-xs text-gray-500 mt-1">Example: bg-blue-50, bg-green-50, etc.</p>
          </div>
          {commonFields}
        </div>
      )

    case "table":
      return (
        <div className="space-y-2">
          <div>
            <Label className="text-xs">Headers</Label>
            <div className="flex gap-2 mt-1">
              {component.headers?.map((header, idx) => (
                <Input
                  key={idx}
                  value={header || ""}
                  onChange={(e) => {
                    const newHeaders = [...component.headers]
                    newHeaders[idx] = e.target.value
                    updateField("headers", newHeaders)
                  }}
                  className="h-7 text-xs"
                  placeholder={`Header ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs">Rows</Label>
            <div className="space-y-2 mt-1">
              {component.rows?.map((row, rowIdx) => (
                <div key={rowIdx} className="flex gap-2 items-center">
                  {row.map((cell, cellIdx) => (
                    <Input
                      key={cellIdx}
                      value={cell || ""}
                      onChange={(e) => {
                        const newRows = [...component.rows]
                        newRows[rowIdx][cellIdx] = e.target.value
                        updateField("rows", newRows)
                      }}
                      className="h-7 text-xs"
                      placeholder={`Row ${rowIdx + 1}, Cell ${cellIdx + 1}`}
                    />
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newRows = component.rows.filter((_, i) => i !== rowIdx)
                      updateField("rows", newRows)
                    }}
                    className="h-7 w-7 p-0 text-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newRow = Array(component.headers?.length || 3).fill("")
                  const newRows = [...(component.rows || []), newRow]
                  updateField("rows", newRows)
                }}
                className="w-full text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Row
              </Button>
            </div>
          </div>
          {commonFields}
        </div>
      )

    case "cta":
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
            <Label className="text-xs">Description</Label>
            <Textarea
              value={component.description || ""}
              onChange={(e) => updateField("description", e.target.value)}
              className="text-xs min-h-[60px]"
            />
          </div>
          <div>
            <Label className="text-xs">Button Text</Label>
            <Input
              value={component.buttonText || ""}
              onChange={(e) => updateField("buttonText", e.target.value)}
              className="h-7 text-xs"
            />
          </div>
          <div>
            <Label className="text-xs">Button URL</Label>
            <Input
              value={component.buttonHref || ""}
              onChange={(e) => updateField("buttonHref", e.target.value)}
              className="h-7 text-xs"
              placeholder="https://example.com"
            />
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

// SEO Editor Component
function SeoEditor({ blogPost, updateSeoField, updateBlogPost }) {
  const updateFocusKeywords = (keywordsString) => {
    const keywords = keywordsString
      .split(",")
      .map((kw) => kw.trim())
      .filter((kw) => kw)
    updateSeoField("focusKeywords", keywords)
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-xs">Meta Title</Label>
            <Input
              value={blogPost.seo?.metaTitle || blogPost.title || ""}
              onChange={(e) => updateSeoField("metaTitle", e.target.value)}
              className="h-8 text-xs"
              placeholder="SEO-optimized title (55-60 characters)"
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-500">
                {(blogPost.seo?.metaTitle || blogPost.title || "").length} characters
              </p>
              <p
                className={`text-xs ${(blogPost.seo?.metaTitle || blogPost.title || "").length > 60 ? "text-red-500" : "text-gray-500"}`}
              >
                Recommended: 55-60 characters
              </p>
            </div>
          </div>

          <div>
            <Label className="text-xs">Meta Description</Label>
            <Textarea
              value={blogPost.seo?.metaDescription || blogPost.excerpt || ""}
              onChange={(e) => updateSeoField("metaDescription", e.target.value)}
              className="text-xs min-h-[80px]"
              placeholder="SEO-optimized description (150-160 characters)"
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-500">
                {(blogPost.seo?.metaDescription || blogPost.excerpt || "").length} characters
              </p>
              <p
                className={`text-xs ${(blogPost.seo?.metaDescription || blogPost.excerpt || "").length > 160 ? "text-red-500" : "text-gray-500"}`}
              >
                Recommended: 150-160 characters
              </p>
            </div>
          </div>

          <div>
            <Label className="text-xs">Focus Keywords (comma-separated)</Label>
            <Input
              value={blogPost.seo?.focusKeywords?.join(", ") || blogPost.tags?.join(", ") || ""}
              onChange={(e) => updateFocusKeywords(e.target.value)}
              className="h-8 text-xs"
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-gray-500 mt-1">These keywords will be used to optimize your content</p>
          </div>

          <div>
            <Label className="text-xs">Canonical URL</Label>
            <Input
              value={blogPost.seo?.canonicalUrl || ""}
              onChange={(e) => updateSeoField("canonicalUrl", e.target.value)}
              className="h-8 text-xs"
              placeholder="https://indiahelpdesk.ca/blsindia-canada/your-post-slug"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty to use the default URL</p>
          </div>

          <div>
            <Label className="text-xs">Open Graph Image URL</Label>
            <Input
              value={blogPost.seo?.ogImage || blogPost.featuredImage || ""}
              onChange={(e) => updateSeoField("ogImage", e.target.value)}
              className="h-8 text-xs"
              placeholder="/og-images/your-image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">Recommended size: 1200x630 pixels</p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="no-index"
              checked={blogPost.seo?.noIndex || false}
              onCheckedChange={(checked) => updateSeoField("noIndex", checked)}
            />
            <Label htmlFor="no-index" className="text-xs">
              No Index (hide from search engines)
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">SEO Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <SeoPreview
            title={blogPost.seo?.metaTitle || blogPost.title || "Blog Post Title"}
            description={blogPost.seo?.metaDescription || blogPost.excerpt || "Blog post description goes here."}
            url={`https://indiahelpdesk.ca/blsindia-canada/${blogPost.slug || "post-slug"}`}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">SEO Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <SeoAnalysis blogPost={blogPost} />
        </CardContent>
      </Card>
    </>
  )
}

// SEO Analysis Component
function SeoAnalysis({ blogPost }) {
  const checks = [
    {
      name: "Title Length",
      status:
        (blogPost.seo?.metaTitle || blogPost.title || "").length >= 30 &&
        (blogPost.seo?.metaTitle || blogPost.title || "").length <= 60,
      message: "Title should be 30-60 characters",
    },
    {
      name: "Meta Description",
      status:
        (blogPost.seo?.metaDescription || blogPost.excerpt || "").length >= 120 &&
        (blogPost.seo?.metaDescription || blogPost.excerpt || "").length <= 160,
      message: "Meta description should be 120-160 characters",
    },
    {
      name: "Focus Keywords",
      status: (blogPost.seo?.focusKeywords || blogPost.tags || []).length > 0,
      message: "At least one focus keyword is recommended",
    },
    {
      name: "Featured Image",
      status: !!(blogPost.featuredImage || blogPost.seo?.ogImage),
      message: "Featured image helps with social sharing",
    },
    {
      name: "Content Length",
      status: blogPost.content.length >= 3,
      message: "At least 3 content components recommended",
    },
    {
      name: "Headings Structure",
      status: blogPost.content.some((c) => c.type === "heading"),
      message: "Use headings to structure your content",
    },
  ]

  const passedChecks = checks.filter((check) => check.status).length
  const totalChecks = checks.length
  const score = Math.round((passedChecks / totalChecks) * 100)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">SEO Score</span>
        <Badge variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"}>{score}%</Badge>
      </div>

      <div className="space-y-2">
        {checks.map((check, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <span className={check.status ? "text-green-600" : "text-red-600"}>
              {check.status ? "✓" : "✗"} {check.name}
            </span>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500 mt-2">
        <p>Improve your SEO score by addressing the failed checks above.</p>
      </div>
    </div>
  )
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
            <Label className="text-xs">Featured Image URL</Label>
            <Input
              value={blogPost.featuredImage || ""}
              onChange={(e) => updateField("featuredImage", e.target.value)}
              className="h-8 text-xs"
              placeholder="/placeholder.svg?height=400&width=600"
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
