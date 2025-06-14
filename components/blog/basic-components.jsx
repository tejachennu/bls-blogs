import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Basic Heading Components (h1-h6)
export function BasicHeading({ level, content, anchor, className }) {
  const id = anchor || content.toLowerCase().replace(/\s+/g, "-")

  switch (level) {
    case 1:
      return (
        <h1 id={id} className={cn("text-3xl font-bold mt-6 mb-4", className)}>
          {content}
        </h1>
      )
    case 2:
      return (
        <h2 id={id} className={cn("text-2xl font-bold mt-5 mb-3", className)}>
          {content}
        </h2>
      )
    case 3:
      return (
        <h3 id={id} className={cn("text-xl font-bold mt-4 mb-2", className)}>
          {content}
        </h3>
      )
    case 4:
      return (
        <h4 id={id} className={cn("text-lg font-bold mt-4 mb-2", className)}>
          {content}
        </h4>
      )
    case 5:
      return (
        <h5 id={id} className={cn("text-base font-bold mt-3 mb-2", className)}>
          {content}
        </h5>
      )
    case 6:
      return (
        <h6 id={id} className={cn("text-sm font-bold mt-3 mb-2", className)}>
          {content}
        </h6>
      )
    default:
      return (
        <h2 id={id} className={cn("text-2xl font-bold mt-5 mb-3", className)}>
          {content}
        </h2>
      )
  }
}

// Basic Paragraph
export function BasicParagraph({ content, className }) {
  return <p className={cn("my-3 text-base", className)}>{content}</p>
}

// Basic List Item
export function BasicListItem({ content, children }) {
  if (!children || children.length === 0) {
    return <li className="my-1">{content}</li>
  }

  return (
    <li className="my-2">
      {content}
      <ul className="ml-6 list-disc">
        {children.map((item, index) => (
          <BasicListItem key={index} {...item} />
        ))}
      </ul>
    </li>
  )
}

// Basic List
export function BasicList({ type, items, className }) {
  if (type === "orderedlist" || type === "basicOrderedList") {
    return (
      <ol className={cn("list-decimal ml-6 my-4", className)}>
        {items?.map((item, index) => (
          <li key={index} className="my-2">
            {item.content}
            {item.children && item.children.length > 0 && (
              <ul className="list-disc ml-6 mt-1">
                {item.children.map((child, childIndex) => (
                  <li key={childIndex} className="my-1 text-sm">
                    {child.content}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    )
  }

  return (
    <ul className={cn("list-disc ml-6 my-4", className)}>
      {items?.map((item, index) => (
        <BasicListItem key={index} {...item} />
      ))}
    </ul>
  )
}

// Basic Alert/Warning
export function BasicAlert({ title, content, variant = "default", className }) {
  const getBorderColor = () => {
    switch (variant) {
      case "destructive":
        return "border-red-500 bg-red-50"
      case "success":
        return "border-green-500 bg-green-50"
      case "info":
        return "border-blue-500 bg-blue-50"
      default:
        return "border-yellow-500 bg-yellow-50"
    }
  }

  return (
    <div className={cn("border-l-4 p-4 my-4", getBorderColor(), className)}>
      {title && <div className="font-bold mb-1">{title}</div>}
      <div>{content}</div>
    </div>
  )
}

// Basic Image
export function BasicImage({ src, alt, width, height, className }) {
  return (
    <figure className={cn("my-4", className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt || "Image"}
        width={width || 800}
        height={height || 450}
        className="w-full h-auto"
      />
      {alt && <figcaption className="text-center text-sm mt-2 text-gray-600">{alt}</figcaption>}
    </figure>
  )
}

// Basic Link
export function BasicLink({ href, content, isExternal, className }) {
  const linkProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <Link href={href} {...linkProps} className={cn("text-blue-600 underline hover:text-blue-800", className)}>
      {content}
    </Link>
  )
}

// Basic Button
export function BasicButton({ content, href, className }) {
  const buttonContent = (
    <button className={cn("px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors", className)}>
      {content}
    </button>
  )

  if (href) {
    return (
      <div className="my-4">
        <Link href={href} target={href.startsWith("http") ? "_blank" : undefined}>
          {buttonContent}
        </Link>
      </div>
    )
  }

  return <div className="my-4">{buttonContent}</div>
}

// Basic Separator
export function BasicSeparator({ className }) {
  return <hr className={cn("my-6 border-t border-gray-300", className)} />
}

// Basic Quote
export function BasicQuote({ content, author, className }) {
  return (
    <blockquote className={cn("border-l-4 border-gray-300 pl-4 my-4 bg-gray-50 p-4 rounded-r", className)}>
      <p className="italic text-gray-700">{content}</p>
      {author && <cite className="block mt-2 text-sm text-gray-600">— {author}</cite>}
    </blockquote>
  )
}

// Basic Card
export function BasicCard({ title, content, children, className }) {
  return (
    <div className={cn("border border-gray-300 rounded p-4 my-4 bg-white shadow-sm", className)}>
      {title && <div className="font-bold mb-2 text-lg">{title}</div>}
      {content && <p className="mb-3 text-gray-700">{content}</p>}
      {children && (
        <div className="space-y-3">
          {children.map((child, index) => (
            <BasicComponent key={index} component={child} />
          ))}
        </div>
      )}
    </div>
  )
}

// Basic Table
export function BasicTable({ headers, rows, className }) {
  return (
    <div className={cn("my-4 overflow-x-auto", className)}>
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100">
            {headers?.map((header, index) => (
              <th key={index} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Basic Code Block
export function BasicCode({ content, language, className }) {
  return (
    <pre className={cn("bg-gray-100 p-4 rounded overflow-x-auto my-4 border", className)}>
      <code className="text-sm font-mono">{content}</code>
    </pre>
  )
}

// Basic Video Embed
export function BasicVideo({ src, title, className }) {
  return (
    <div className={cn("my-4", className)}>
      <iframe
        src={src}
        title={title || "Embedded video"}
        className="w-full aspect-video border rounded"
        allowFullScreen
      />
      {title && <p className="text-center text-sm mt-2 text-gray-600">{title}</p>}
    </div>
  )
}

// Basic Accordion/FAQ
export function BasicAccordion({ items, className }) {
  return (
    <div className={cn("my-4 space-y-2", className)}>
      {items?.map((item, index) => (
        <details key={index} className="border border-gray-300 rounded bg-white">
          <summary className="p-3 cursor-pointer font-medium bg-gray-50 hover:bg-gray-100 transition-colors">
            {item.question || item.title}
          </summary>
          <div className="p-3 border-t border-gray-300 text-gray-700">{item.answer || item.content}</div>
        </details>
      ))}
    </div>
  )
}

// Basic Timeline
export function BasicTimeline({ events, className }) {
  return (
    <div className={cn("my-4", className)}>
      <ol className="relative border-l border-gray-300 ml-4">
        {events?.map((event, index) => (
          <li key={index} className="mb-6 ml-6">
            <div className="absolute -left-3 mt-1.5 h-6 w-6 rounded-full border border-gray-300 bg-white flex items-center justify-center text-sm font-medium">
              {index + 1}
            </div>
            <h3 className="font-medium text-lg">{event.title}</h3>
            <p className="text-sm text-gray-700 mt-1">{event.description}</p>
            {event.duration && <p className="text-sm text-gray-500 mt-1">Duration: {event.duration}</p>}
          </li>
        ))}
      </ol>
    </div>
  )
}

// Basic Form
export function BasicForm({ fields, submitText, className }) {
  return (
    <form className={cn("my-4 space-y-4 p-4 border border-gray-300 rounded bg-white", className)}>
      {fields?.map((field, index) => (
        <div key={index} className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          ) : (
            <input
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          )}
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        {submitText || "Submit"}
      </button>
    </form>
  )
}

// Basic Tabs
export function BasicTabs({ tabs, className }) {
  return (
    <div className={cn("my-4", className)}>
      <div className="flex border-b border-gray-300 bg-gray-50">
        {tabs?.map((tab, index) => (
          <div
            key={index}
            className={cn(
              "px-4 py-2 cursor-pointer transition-colors",
              index === 0
                ? "border-b-2 border-blue-600 font-medium bg-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
            )}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className="p-4 border border-t-0 border-gray-300 bg-white">{tabs?.[0]?.content}</div>
    </div>
  )
}

// Basic Grid
export function BasicGrid({ columns, children, className }) {
  const gridCols = Math.min(columns || 2, 4)
  return (
    <div className={cn(`grid grid-cols-1 md:grid-cols-${gridCols} gap-4 my-4`, className)}>
      {children?.map((child, index) => (
        <div key={index} className="p-3 border border-gray-200 rounded bg-white">
          <BasicComponent component={child} />
        </div>
      ))}
    </div>
  )
}

// Basic Component Router
export function BasicComponent({ component }) {
  if (!component || !component.type) {
    return null
  }

  switch (component.type) {
    case "heading":
      return <BasicHeading {...component} />
    case "paragraph":
      return <BasicParagraph {...component} />
    case "list":
      return <BasicList {...component} />
    case "orderedlist":
      return <BasicList {...component} type="orderedlist" />
    case "alert":
    case "warning":
      return <BasicAlert {...component} />
    case "image":
      return <BasicImage {...component} />
    case "link":
      return <BasicLink {...component} />
    case "button":
      return <BasicButton {...component} />
    case "separator":
      return <BasicSeparator {...component} />
    case "quote":
      return <BasicQuote {...component} />
    case "card":
      return <BasicCard {...component} />
    case "table":
      return <BasicTable {...component} />
    case "code":
      return <BasicCode {...component} />
    case "video":
      return <BasicVideo {...component} />
    case "accordion":
    case "faq":
      return <BasicAccordion {...component} />
    case "timeline":
      return <BasicTimeline {...component} />
    case "form":
      return <BasicForm {...component} />
    case "tabs":
      return <BasicTabs {...component} />
    case "grid":
      return <BasicGrid {...component} />
    default:
      console.warn(`Unknown basic component type: ${component.type}`)
      return (
        <div className="p-4 border border-red-300 bg-red-50 rounded my-4">
          <p className="text-red-600 text-sm">Unknown component type: {component.type}</p>
          <pre className="text-xs mt-2 text-red-500">{JSON.stringify(component, null, 2)}</pre>
        </div>
      )
  }
}
