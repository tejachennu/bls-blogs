import { Globe, Search } from "lucide-react"

export function SeoPreview({ title, description, url }) {
  const truncatedTitle = title.length > 60 ? title.substring(0, 57) + "..." : title
  const truncatedDescription = description.length > 160 ? description.substring(0, 157) + "..." : description
  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "")

  return (
    <div className="space-y-4">
      {/* Google Search Preview */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Search className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">Google Search Preview</span>
        </div>
        <div className="border border-gray-200 rounded-md p-3 bg-white">
          <div className="space-y-1">
            <div className="text-xs text-green-700">{displayUrl}</div>
            <div className="text-blue-600 text-sm hover:underline cursor-pointer">{truncatedTitle}</div>
            <div className="text-gray-600 text-xs leading-relaxed">{truncatedDescription}</div>
          </div>
        </div>
      </div>

      {/* Social Media Preview */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Globe className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium">Social Media Preview</span>
        </div>
        <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
          <div className="h-32 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-xs">Featured Image</span>
          </div>
          <div className="p-3">
            <div className="text-sm font-medium text-gray-900 mb-1">{truncatedTitle}</div>
            <div className="text-xs text-gray-600 mb-2">{truncatedDescription}</div>
            <div className="text-xs text-gray-500 uppercase">{displayUrl}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
