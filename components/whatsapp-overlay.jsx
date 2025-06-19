"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Phone, Mail, Clock, Users, Import } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function WhatsAppOverlay() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show the WhatsApp button after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const whatsappNumber = "+1-416-491-9700" // BLS India Canada Toronto number
  const whatsappMessage = encodeURIComponent(
    "Hi! I need assistance with Indian consular services through BLS India Canada. Can you help me?",
  )
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=%2B12892012094&text=Hi+India+Visa+and+Consular+Services%2C+I+would+like+to+inquire+about+courier+services.&type=phone_number&app_absent=0`

  if (!isVisible) return null

  return (
    <>
      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-24 w-24 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <Image src="/icons8-whatsapp-144.png" height={64} width={64} className="h-16 w-16 text-white " />
        </Button>
      </div>

      {/* WhatsApp Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]">
          <Card className="shadow-2xl border-0 overflow-hidden">
            {/* Header */}
            <CardHeader className="bg-green-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Image src="/icons8-whatsapp-144.png" height={20} width={20} className="h-5 w-5 text-white " />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium">IndiaHelpDesk Support</CardTitle>
                    <p className="text-xs text-green-100">BLS India Canada Assistance</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="p-4 space-y-4">
              {/* Welcome Message */}
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-700 mb-2">
                  👋 <strong>Welcome to IndiaHelpDesk!</strong>
                </p>
                <p className="text-xs text-gray-600">
                  We're here to help you with all your Indian consular services through BLS India Canada. How can we
                  assist you today?
                </p>
              </div>

              {/* Services */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Our Services:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1 text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>PCC Applications</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Passport Renewal</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>OCI Card Services</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Visa Applications</span>
                  </div>
                </div>
              </div>

              {/* Contact Options */}
              <div className="space-y-2">
                <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white" size="sm">
                    <Image src="/icons8-whatsapp-144.png" height={16} width={16} className="h-4 w-4 mr-2 text-white " />
                    Chat on WhatsApp
                  </Button>
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <Link href="tel:+12892012094">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      <Phone className="h-3 w-3 mr-1" />
                      Call Us
                    </Button>
                  </Link>
                  <Link href="mailto:info@blsindia-canada.ca">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Business Hours</span>
                </div>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>Monday - Friday: 9:00 AM - 6:00 PM EST</div>
                  <div>Saturday: 10:00 AM - 2:00 PM EST</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-green-500" />
                  <span>5000+ Clients Served</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
