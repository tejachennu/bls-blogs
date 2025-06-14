"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Printer,
  Copy,
  Check,
  ChevronRight,
  ChevronLeft,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  User,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Printable Document
export function PrintableDocument({ title, content, children, className }) {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    setIsPrinting(true)
    window.print()
    setTimeout(() => setIsPrinting(false), 500)
  }

  return (
    <div className={cn("my-6", className)}>
      <Card>
        <CardHeader className="bg-gray-50 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} disabled={isPrinting}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {content && <p className="mb-4">{content}</p>}
          <div className="print:block">
            {children?.map((child, index) => (
              <div key={index} className="mb-4">
                {child.content}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Step-by-Step Guide
export function StepByStepGuide({ steps, className }) {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className={cn("my-6", className)}>
      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Step {currentStep + 1} of {steps.length}
            </CardTitle>
            <div className="text-sm text-blue-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </div>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-3">{steps[currentStep].title}</h3>
          <div className="mb-6">{steps[currentStep].content}</div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Comparison Table
export function ComparisonTable({ title, features, items, className }) {
  return (
    <div className={cn("my-6", className)}>
      {title && <h3 className="text-xl font-bold mb-3">{title}</h3>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-3 border bg-gray-50"></th>
              {items.map((item, index) => (
                <th key={index} className="p-3 border bg-gray-50 text-center">
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index}>
                <td className="p-3 border font-medium">{feature.name}</td>
                {items.map((item, itemIndex) => (
                  <td key={itemIndex} className="p-3 border text-center">
                    {typeof item.features[index] === "boolean" ? (
                      item.features[index] ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )
                    ) : (
                      item.features[index]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Rating Component
export function RatingComponent({ title, rating, totalRatings, className }) {
  return (
    <div className={cn("my-6 p-4 border rounded-lg", className)}>
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn("h-5 w-5", star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")}
            />
          ))}
        </div>
        <div className="text-sm text-gray-600">
          {rating} out of 5 ({totalRatings} ratings)
        </div>
      </div>

      {/* Rating bars */}
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center gap-2">
            <div className="text-sm w-6">{star}</div>
            <Progress value={Math.random() * 100} className="h-2 flex-1" />
          </div>
        ))}
      </div>
    </div>
  )
}

// Comments Section
export function CommentsSection({ comments = [], className }) {
  const [newComment, setNewComment] = useState("")
  const [localComments, setLocalComments] = useState(comments)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment = {
      id: Date.now().toString(),
      author: "Guest User",
      date: new Date().toISOString(),
      content: newComment,
      likes: 0,
      replies: [],
    }

    setLocalComments([comment, ...localComments])
    setNewComment("")
  }

  return (
    <div className={cn("my-6", className)}>
      <h3 className="text-xl font-bold mb-4">Comments ({localComments.length})</h3>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-2 flex justify-end">
              <Button type="submit" disabled={!newComment.trim()}>
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-6">
        {localComments.map((comment) => (
          <div key={comment.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 mb-3">{comment.content}</p>
                <div className="flex items-center gap-4 text-sm">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                    <ThumbsDown className="h-4 w-4" />
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                    <MessageSquare className="h-4 w-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Multi-Language Content
export function MultiLanguageContent({ content, languages = ["English", "French"], className }) {
  const [activeLanguage, setActiveLanguage] = useState(languages[0])

  return (
    <div className={cn("my-6", className)}>
      <Tabs defaultValue={activeLanguage} onValueChange={setActiveLanguage}>
        <TabsList className="mb-4">
          {languages.map((lang) => (
            <TabsTrigger key={lang} value={lang}>
              {lang}
            </TabsTrigger>
          ))}
        </TabsList>

        {languages.map((lang) => (
          <TabsContent key={lang} value={lang}>
            <div className="prose max-w-none">{content[lang]}</div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

// Application Status Tracker
export function ApplicationStatusTracker({
  applicationId,
  currentStatus,
  statuses = ["Submitted", "Under Review", "Processing", "Decision Made", "Completed"],
  className,
}) {
  const currentIndex = statuses.findIndex((status) => status === currentStatus)

  return (
    <div className={cn("my-6", className)}>
      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Application Status</CardTitle>
            <div className="text-sm font-medium">ID: {applicationId}</div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative">
            <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0"></div>
            <div
              className="absolute top-4 left-0 h-1 bg-blue-600 z-10 transition-all duration-500"
              style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}
            ></div>

            <div className="flex justify-between relative z-20">
              {statuses.map((status, index) => {
                const isActive = index <= currentIndex

                return (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center mb-2",
                        isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500",
                      )}
                    >
                      {index + 1}
                    </div>
                    <div className="text-xs text-center max-w-[80px]">{status}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-1">Current Status: {currentStatus}</h4>
            <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Social Share Buttons
export function SocialShareButtons({ url, title, className }) {
  const [copied, setCopied] = useState(false)

  const shareUrl = encodeURIComponent(url || window.location.href)
  const shareTitle = encodeURIComponent(title || document.title)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url || window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("my-6", className)}>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
            Facebook
          </Link>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <Link
            href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
            Twitter
          </Link>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <Link
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
            </svg>
            LinkedIn
          </Link>
        </Button>

        <Button variant="outline" size="sm" asChild>
          <Link href={`mailto:?subject=${shareTitle}&body=${shareUrl}`}>
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Email
          </Link>
        </Button>

        <Button variant="outline" size="sm" onClick={copyToClipboard}>
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

// Before/After Image Comparison
export function BeforeAfterComparison({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}) {
  const [position, setPosition] = useState(50)

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPosition(newPosition)
  }

  return (
    <div className={cn("my-6", className)}>
      <div
        className="relative h-[400px] overflow-hidden cursor-col-resize"
        onMouseMove={handleMove}
        onTouchMove={(e) => {
          const touch = e.touches[0]
          const rect = e.currentTarget.getBoundingClientRect()
          const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width))
          const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100))
          setPosition(newPosition)
        }}
      >
        {/* Before Image (Full width) */}
        <div className="absolute inset-0">
          <Image
            src={beforeImage || "/placeholder.svg?height=400&width=800"}
            alt={beforeLabel}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 text-sm rounded">{beforeLabel}</div>
        </div>

        {/* After Image (Partial width based on position) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <Image
            src={afterImage || "/placeholder.svg?height=400&width=800"}
            alt={afterLabel}
            fill
            className="object-cover"
            style={{ width: "100vw" }}
          />
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 text-sm rounded">{afterLabel}</div>
        </div>

        {/* Divider */}
        <div className="absolute inset-y-0 w-1 bg-white cursor-col-resize" style={{ left: `${position}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
            <ChevronLeft className="h-4 w-4 text-gray-600" />
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Export all advanced components
export function AdvancedComponent({ component }) {
  switch (component.type) {
    case "printableDocument":
      return <PrintableDocument {...component} />
    case "stepByStepGuide":
      return <StepByStepGuide {...component} />
    case "comparisonTable":
      return <ComparisonTable {...component} />
    case "rating":
      return <RatingComponent {...component} />
    case "commentsSection":
      return <CommentsSection {...component} />
    case "multiLanguageContent":
      return <MultiLanguageContent {...component} />
    case "applicationStatusTracker":
      return <ApplicationStatusTracker {...component} />
    case "socialShareButtons":
      return <SocialShareButtons {...component} />
    case "beforeAfterComparison":
      return <BeforeAfterComparison {...component} />
    default:
      return <div>Component type not supported</div>
  }
}
