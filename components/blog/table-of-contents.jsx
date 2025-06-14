"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { List, ChevronDown, ChevronUp } from "lucide-react"

export function TableOfContents({ content }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState("")

  const headings = content.filter((component) => component.type === "heading" && component.level <= 3)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -35% 0%" },
    )

    headings.forEach((heading) => {
      const id = heading.anchor || heading.content.toLowerCase().replace(/\s+/g, "-")
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <Card className="mb-6 border border-blue-100 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <List className="h-4 w-4 text-blue-500" />
            Table of Contents
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden h-7 w-7 p-0 text-blue-600 hover:bg-blue-100"
          >
            {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className={`pt-0 px-4 pb-3 ${isOpen ? "block" : "hidden"} md:block`}>
        <nav>
          <ul className="space-y-1">
            {headings.map((heading, index) => {
              const id = heading.anchor || heading.content.toLowerCase().replace(/\s+/g, "-")
              const isActive = activeId === id

              return (
                <li key={index} className={`pl-${(heading.level - 1) * 3}`}>
                  <a
                    href={`#${id}`}
                    className={`block py-1 px-2 rounded text-xs transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-800/50 ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 font-medium bg-blue-100 dark:bg-blue-800/50"
                        : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    {heading.content}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </CardContent>
    </Card>
  )
}
