"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  ExternalLink,
  Download,
  FileText,
  Quote,
  ArrowRight,
  Lightbulb,
  Star,
  User,
  Mail,
  Phone,
  Award,
  Target,
  Zap,
  ListChecks,
  CheckCheck,
  FileCheck,
  CircleCheck,
  CircleDot,
  Clock,
  MapPin,
  DollarSign,
  Play,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Clipboard,
  Building,
} from "lucide-react"
import { useState } from "react"

export function DynamicHeading({ level, content, anchor, className }) {
  const id = anchor || content.toLowerCase().replace(/\s+/g, "-")
  const baseClasses = "font-bold tracking-tight text-gray-900 dark:text-gray-100"

  switch (level) {
    case 1:
      return (
        <h1 id={id} className={cn(baseClasses, "text-3xl lg:text-4xl mb-6", className)}>
          {content}
        </h1>
      )
    case 2:
      return (
        <h2
          id={id}
          className={cn(
            baseClasses,
            "text-2xl lg:text-3xl mb-4 mt-10 first:mt-0 border-b border-gray-200 pb-2",
            className,
          )}
        >
          <span className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            {content}
          </span>
        </h2>
      )
    case 3:
      return (
        <h3 id={id} className={cn(baseClasses, "text-xl lg:text-2xl mb-3 mt-8 flex items-center gap-2", className)}>
          <Zap className="h-4 w-4 text-amber-500" />
          {content}
        </h3>
      )
    case 4:
      return (
        <h4 id={id} className={cn(baseClasses, "text-lg mb-2 mt-6 flex items-center gap-2", className)}>
          <ArrowRight className="h-4 w-4 text-green-500" />
          {content}
        </h4>
      )
    case 5:
      return (
        <h5 id={id} className={cn(baseClasses, "text-base mb-2 mt-4 flex items-center gap-2", className)}>
          <CircleDot className="h-3 w-3 text-purple-500" />
          {content}
        </h5>
      )
    case 6:
      return (
        <h6 id={id} className={cn(baseClasses, "text-sm mb-2 mt-4 text-gray-700 dark:text-gray-300", className)}>
          {content}
        </h6>
      )
    default:
      return (
        <h2 id={id} className={cn(baseClasses, "text-2xl mb-4 mt-8", className)}>
          {content}
        </h2>
      )
  }
}

export function DynamicParagraph({ content, className }) {
  return (
    <p
      className={cn(
        "leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-sm",
        "[&:not(:first-child)]:mt-4",
        className,
      )}
    >
      {content}
    </p>
  )
}

export function DynamicListItem({ content, children }) {
  if (!children || children.length === 0) {
    return (
      <li className="mb-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex items-start gap-2">
        <CircleCheck className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
        <span>{content}</span>
      </li>
    )
  }

  return (
    <li className="mb-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
      <div className="flex items-start gap-2">
        <CheckCheck className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
        <span>{content}</span>
      </div>
      <ul className="ml-6 mt-2 space-y-2">
        {children.map((item, index) => (
          <DynamicListItem key={index} {...item} />
        ))}
      </ul>
    </li>
  )
}

export function DynamicList({ type, items, className }) {
  const listHeader =
    type === "orderedList" ? (
      <div className="flex items-center gap-2 mb-3 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md">
        <FileCheck className="h-5 w-5 text-blue-500" />
        <span className="font-medium text-sm text-blue-700 dark:text-blue-300">Required Documents</span>
      </div>
    ) : (
      <div className="flex items-center gap-2 mb-3 bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
        <ListChecks className="h-5 w-5 text-green-500" />
        <span className="font-medium text-sm text-green-700 dark:text-green-300">Key Points</span>
      </div>
    )

  if (type === "orderedList") {
    return (
      <div className={cn("my-5", className)}>
        {listHeader}
        <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-md border-l-2 border-blue-300 dark:border-blue-700">
          <ol className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex items-start gap-2"
              >
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-xs font-medium text-blue-700 dark:text-blue-300">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <span>{item.content}</span>
                  {item.children && item.children.length > 0 && (
                    <ul className="ml-1 mt-2 space-y-2">
                      {item.children.map((child, childIndex) => (
                        <li
                          key={childIndex}
                          className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-xs"
                        >
                          <CircleDot className="h-3 w-3 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span>{child.content}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("my-5", className)}>
      {listHeader}
      <div className="bg-green-50/50 dark:bg-green-900/10 p-4 rounded-md border-l-2 border-green-300 dark:border-green-700">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <DynamicListItem key={index} {...item} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export function DynamicAlert({ title, content, variant = "default", className }) {
  const getIcon = () => {
    switch (variant) {
      case "destructive":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
    }
  }

  const getBorderColor = () => {
    switch (variant) {
      case "destructive":
        return "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10"
      case "success":
        return "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10"
      case "info":
        return "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10"
      default:
        return "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10"
    }
  }

  return (
    <Alert variant={variant} className={cn("my-5 border-l-2", getBorderColor(), className)}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          {title && <AlertTitle className="mb-1 font-medium text-sm">{title}</AlertTitle>}
          <AlertDescription className="text-xs leading-relaxed">{content}</AlertDescription>
        </div>
      </div>
    </Alert>
  )
}

export function DynamicImage({ src, alt, width, height, className }) {
  return (
    <figure className={cn("my-6", className)}>
      <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width || 800}
          height={height || 450}
          className="object-cover w-full h-auto"
          loading="lazy"
        />
      </div>
      {alt && (
        <figcaption className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400 italic">{alt}</figcaption>
      )}
    </figure>
  )
}

export function DynamicLink({ href, content, isExternal, className }) {
  const linkProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <Link
      href={href}
      {...linkProps}
      className={cn(
        "inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300",
        "underline underline-offset-2 decoration-1 hover:underline-offset-4 transition-all duration-200",
        "text-sm font-medium",
        className,
      )}
    >
      {content}
      {isExternal && <ExternalLink className="h-3 w-3 ml-1 text-blue-500" />}
    </Link>
  )
}

export function DynamicButton({ content, href, variant = "default", size = "default", className }) {
  const getIcon = () => {
    if (content.toLowerCase().includes("download")) return <Download className="h-3 w-3 mr-2 text-white" />
    if (content.toLowerCase().includes("form")) return <FileText className="h-3 w-3 mr-2 text-white" />
    if (content.toLowerCase().includes("contact")) return <Mail className="h-3 w-3 mr-2 text-white" />
    if (content.toLowerCase().includes("phone")) return <Phone className="h-3 w-3 mr-2 text-white" />
    if (href?.includes("http")) return <ExternalLink className="h-3 w-3 mr-2 text-white" />
    return <ArrowRight className="h-3 w-3 mr-2 text-white" />
  }

  const buttonContent = (
    <Button
      variant={variant}
      size={size}
      className={cn("shadow-sm hover:shadow transition-all duration-300 bg-blue-600 hover:bg-blue-700", className)}
    >
      {getIcon()}
      <span className="text-sm">{content}</span>
    </Button>
  )

  if (href) {
    return (
      <div className="my-5">
        <Link href={href} target={href.startsWith("http") ? "_blank" : undefined}>
          {buttonContent}
        </Link>
      </div>
    )
  }

  return <div className="my-5">{buttonContent}</div>
}

export function DynamicSeparator({ className }) {
  return (
    <div className={cn("my-6 flex items-center", className)}>
      <Separator className="flex-1" />
      <div className="mx-4 p-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
        <Star className="h-3 w-3 text-blue-500" />
      </div>
      <Separator className="flex-1" />
    </div>
  )
}

export function DynamicQuote({ content, author, className }) {
  return (
    <blockquote
      className={cn(
        "my-6 relative bg-blue-50/50 dark:bg-blue-900/10",
        "border-l-2 border-blue-300 dark:border-blue-700 p-4 rounded-r-md",
        className,
      )}
    >
      <Quote className="absolute top-3 left-3 h-6 w-6 text-blue-200 dark:text-blue-800" />
      <div className="ml-8">
        <p className="text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed mb-2">"{content}"</p>
        {author && (
          <cite className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-400 not-italic">
            <User className="h-3 w-3 text-blue-500" />— {author}
          </cite>
        )}
      </div>
    </blockquote>
  )
}

export function DynamicCard({ title, content, children, className }) {
  return (
    <Card className={cn("my-5 shadow-sm border border-gray-200 dark:border-gray-700", className)}>
      {title && (
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700 py-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-4">
        {content && <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{content}</p>}
        {children && (
          <div className="space-y-3">
            {children.map((child, index) => (
              <DynamicComponent key={index} component={child} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function DynamicSection({ children, background, className }) {
  return (
    <section
      className={cn(
        "my-6 p-4 rounded-md border border-gray-200 dark:border-gray-700",
        background || "bg-gray-50 dark:bg-gray-800/50",
        className,
      )}
    >
      <div className="space-y-4">
        {children.map((child, index) => (
          <DynamicComponent key={index} component={child} />
        ))}
      </div>
    </section>
  )
}

export function DynamicGrid({ columns, children, className }) {
  return (
    <div className={cn(`grid grid-cols-1 md:grid-cols-${Math.min(columns, 3)} gap-4 my-6`, className)}>
      {children.map((child, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700"
        >
          <DynamicComponent component={child} />
        </div>
      ))}
    </div>
  )
}

export function DynamicColumn({ children, span, className }) {
  return (
    <div className={cn(span ? `col-span-${span}` : "", className)}>
      <div className="space-y-3">
        {children.map((child, index) => (
          <DynamicComponent key={index} component={child} />
        ))}
      </div>
    </div>
  )
}

export function DynamicCTA({ title, description, buttonText, buttonHref, className }) {
  return (
    <div
      className={cn(
        "my-6 p-6 bg-blue-50 dark:bg-blue-900/20 text-center rounded-md border border-blue-200 dark:border-blue-800",
        className,
      )}
    >
      <div className="flex justify-center mb-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-full">
          <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <h3 className="text-xl font-medium mb-2 text-blue-800 dark:text-blue-300">{title}</h3>
      {description && <p className="text-sm mb-4 text-blue-700 dark:text-blue-400 max-w-md mx-auto">{description}</p>}
      <Link href={buttonHref}>
        <Button size="sm" className="shadow-sm bg-blue-600 hover:bg-blue-700">
          <ArrowRight className="h-3 w-3 mr-2" />
          <span className="text-sm">{buttonText}</span>
        </Button>
      </Link>
    </div>
  )
}

export function DynamicTable({ headers, rows, className }) {
  return (
    <div className={cn("my-6 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700", className)}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30">
              {headers.map((header, index) => (
                <TableHead key={index} className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
              >
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} className="text-xs text-gray-700 dark:text-gray-300">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// NEW COMPONENTS

export function DynamicFAQ({ questions, className }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className={cn("my-6 space-y-3", className)}>
      <div className="flex items-center gap-2 mb-4 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
        <HelpCircle className="h-5 w-5 text-blue-500" />
        <span className="font-medium text-sm text-blue-700 dark:text-blue-300">Frequently Asked Questions</span>
      </div>
      {questions.map((faq, index) => (
        <Card key={index} className="border border-gray-200 dark:border-gray-700">
          <CardHeader
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors py-3"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">{faq.question}</h3>
              {openIndex === index ? (
                <ChevronUp className="h-4 w-4 text-blue-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-500" />
              )}
            </div>
          </CardHeader>
          {openIndex === index && (
            <CardContent className="pt-0 pb-3">
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

export function DynamicTimeline({ events, className }) {
  return (
    <div className={cn("my-6", className)}>
      <div className="flex items-center gap-2 mb-4 bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
        <Clock className="h-5 w-5 text-green-500" />
        <span className="font-medium text-sm text-green-700 dark:text-green-300">Process Timeline</span>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>
        {events.map((event, index) => (
          <div key={index} className="relative flex items-start gap-4 pb-6 last:pb-0">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center border-2 border-blue-300 dark:border-blue-600">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">{index + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">{event.title}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{event.description}</p>
              {event.duration && (
                <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                  <Clock className="h-3 w-3" />
                  <span>{event.duration}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DynamicChecklist({ items, title, className }) {
  const [checkedItems, setCheckedItems] = useState(new Set())

  const toggleItem = (index) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedItems(newChecked)
  }

  const completionPercentage = (checkedItems.size / items.length) * 100

  return (
    <div className={cn("my-6", className)}>
      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-2 mb-3">
          <Clipboard className="h-5 w-5 text-amber-500" />
          <span className="font-medium text-sm text-amber-700 dark:text-amber-300">
            {title || "Document Checklist"}
          </span>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-300 mb-1">
            <span>Progress</span>
            <span>{Math.round(completionPercentage)}% Complete</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 p-2 rounded cursor-pointer transition-colors",
                checkedItems.has(index)
                  ? "bg-green-50 dark:bg-green-900/20"
                  : "hover:bg-amber-100 dark:hover:bg-amber-800/30",
              )}
              onClick={() => toggleItem(index)}
            >
              <div
                className={cn(
                  "flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center mt-0.5",
                  checkedItems.has(index) ? "bg-green-500 border-green-500" : "border-amber-300 dark:border-amber-600",
                )}
              >
                {checkedItems.has(index) && <CheckCircle className="h-3 w-3 text-white" />}
              </div>
              <span
                className={cn(
                  "text-xs leading-relaxed",
                  checkedItems.has(index)
                    ? "text-green-700 dark:text-green-300 line-through"
                    : "text-amber-700 dark:text-amber-300",
                )}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function DynamicPricing({ plans, className }) {
  return (
    <div className={cn("my-6", className)}>
      <div className="flex items-center gap-2 mb-4 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-md">
        <DollarSign className="h-5 w-5 text-purple-500" />
        <span className="font-medium text-sm text-purple-700 dark:text-purple-300">Service Pricing</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan, index) => (
          <Card key={index} className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <CardHeader className="text-center py-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${plan.price}
                {plan.period && <span className="text-sm font-normal text-gray-500">/{plan.period}</span>}
              </div>
            </CardHeader>
            <CardContent className="py-4">
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-xs">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                {plan.buttonText || "Get Started"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function DynamicContactInfo({ contacts, className }) {
  return (
    <div className={cn("my-6", className)}>
      <div className="flex items-center gap-2 mb-4 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-md">
        <Building className="h-5 w-5 text-indigo-500" />
        <span className="font-medium text-sm text-indigo-700 dark:text-indigo-300">Contact Information</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact, index) => (
          <Card key={index} className="border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <h3 className="font-medium text-sm text-gray-900 dark:text-white mb-3">{contact.office}</h3>
              <div className="space-y-2">
                {contact.address && (
                  <div className="flex items-start gap-2 text-xs">
                    <MapPin className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{contact.address}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-2 text-xs">
                    <Phone className="h-3 w-3 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{contact.phone}</span>
                  </div>
                )}
                {contact.email && (
                  <div className="flex items-center gap-2 text-xs">
                    <Mail className="h-3 w-3 text-purple-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{contact.email}</span>
                  </div>
                )}
                {contact.hours && (
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="h-3 w-3 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{contact.hours}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function DynamicVideo({ src, title, thumbnail, className }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className={cn("my-6", className)}>
      <div className="relative bg-gray-900 rounded-md overflow-hidden">
        {!isPlaying ? (
          <div className="relative cursor-pointer group" onClick={() => setIsPlaying(true)}>
            <Image
              src={thumbnail || "/placeholder.svg?height=400&width=600"}
              alt={title || "Video thumbnail"}
              width={600}
              height={400}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-3 group-hover:scale-110 transition-transform">
                <Play className="h-6 w-6 text-gray-900 ml-1" />
              </div>
            </div>
          </div>
        ) : (
          <iframe src={src} title={title} className="w-full aspect-video" allowFullScreen />
        )}
      </div>
      {title && <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white text-center">{title}</p>}
    </div>
  )
}

export function DynamicComponent({ component }) {
  switch (component.type) {
    case "heading":
      return <DynamicHeading {...component} />
    case "paragraph":
      return <DynamicParagraph {...component} />
    case "list":
    case "orderedList":
      return <DynamicList {...component} />
    case "alert":
    case "warning":
      return <DynamicAlert {...component} />
    case "image":
      return <DynamicImage {...component} />
    case "link":
      return <DynamicLink {...component} />
    case "button":
      return <DynamicButton {...component} />
    case "separator":
      return <DynamicSeparator {...component} />
    case "quote":
      return <DynamicQuote {...component} />
    case "card":
      return <DynamicCard {...component} />
    case "section":
    case "container":
      return <DynamicSection {...component} />
    case "grid":
      return <DynamicGrid {...component} />
    case "column":
      return <DynamicColumn {...component} />
    case "cta":
      return <DynamicCTA {...component} />
    case "table":
      return <DynamicTable {...component} />
    case "faq":
      return <DynamicFAQ {...component} />
    case "timeline":
      return <DynamicTimeline {...component} />
    case "checklist":
      return <DynamicChecklist {...component} />
    case "pricing":
      return <DynamicPricing {...component} />
    case "contact":
      return <DynamicContactInfo {...component} />
    case "video":
      return <DynamicVideo {...component} />
    default:
      return null
  }
}
