import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Globe, Shield, Award, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function BlogFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-blue-600 rounded-md flex items-center justify-center">
                <Globe className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="text-base font-bold text-white">IndiaConsular</span>
                <span className="text-base font-bold text-blue-400">Blog</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed">
              Your trusted source for accurate information and expert guidance on Indian consular services for Indians
              living in Canada.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-blue-800 transition-colors">
                <Facebook className="h-3 w-3 text-blue-400" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-blue-800 transition-colors">
                <Twitter className="h-3 w-3 text-blue-400" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-blue-800 transition-colors">
                <Instagram className="h-3 w-3 text-blue-400" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md hover:bg-blue-800 transition-colors">
                <Youtube className="h-3 w-3 text-blue-400" />
                <span className="sr-only">YouTube</span>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="space-y-1 pt-2">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-green-400" />
                <span className="text-xs">Verified Information</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="h-3 w-3 text-amber-400" />
                <span className="text-xs">Expert Guidance</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-white">Quick Links</h3>
            <ul className="space-y-2 text-xs">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "All Services", href: "/services" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
                { name: "FAQ", href: "/faq" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms of Service", href: "/terms" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-blue-400 transition-colors flex items-center gap-1">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-white">Our Services</h3>
            <ul className="space-y-2 text-xs">
              {[
                { name: "Police Clearance Certificate", badge: "Popular" },
                { name: "Passport Services", badge: null },
                { name: "OCI Card Application", badge: "New" },
                { name: "Visa Services", badge: null },
                { name: "Document Attestation", badge: null },
                { name: "Emergency Services", badge: "24/7" },
              ].map((service) => (
                <li key={service.name}>
                  <Link href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    {service.name}
                    {service.badge && (
                      <span className="bg-blue-600 text-white text-[10px] px-1 py-0 rounded">{service.badge}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-white">Stay Connected</h3>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-1 text-xs">
                <Phone className="h-3 w-3 text-blue-400" />
                <span>+1-800-123-4567</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Mail className="h-3 w-3 text-blue-400" />
                <span>info@indiaconsular.ca</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <MapPin className="h-3 w-3 text-blue-400" />
                <span>Toronto, Vancouver, Calgary</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Clock className="h-3 w-3 text-blue-400" />
                <span>Mon-Fri: 9AM-6PM EST</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-white">Newsletter</h4>
              <p className="text-[10px]">Get weekly updates on immigration news and tips.</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 text-xs h-7"
                />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-7 text-xs">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-xs text-gray-400">
              © 2025 IndiaConsularBlog. All rights reserved. | Trusted by 10,000+ Indians in Canada
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">
                Terms
              </Link>
              <Link href="/sitemap" className="hover:text-blue-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
