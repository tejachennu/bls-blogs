import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WhatsAppOverlay } from "@/components/whatsapp-overlay"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "IndiaConsularBlog - BLS India Canada Services Guide | IndiaHelpDesk",
  description:
    "Your trusted guide for BLS India Canada services. Expert assistance for PCC, passport renewal, OCI card, and Indian visa applications. IndiaHelpDesk for all Indian consular services in Canada.",
  keywords: [
    "BLS India Canada",
    "blsindia-canada",
    "blsindia canada",
    "IndiaHelpDesk",
    "indiahelpdesk",
    "Police Clearance Certificate",
    "PCC Canada",
    "Indian Passport Renewal",
    "OCI Card Canada",
    "Indian Visa Canada",
    "Indian Consular Services",
    "BLS International Canada",
    "Indian Immigration Canada",
  ],
  authors: [{ name: "IndiaHelpDesk Team" }],
  creator: "IndiaHelpDesk",
  publisher: "IndiaConsularBlog",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://indiahelpdesk.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "IndiaConsularBlog - BLS India Canada Services Guide",
    description:
      "Your trusted guide for BLS India Canada services. Expert assistance for PCC, passport renewal, OCI card, and Indian visa applications.",
    url: "/",
    siteName: "IndiaConsularBlog",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IndiaConsularBlog - BLS India Canada Services",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IndiaConsularBlog - BLS India Canada Services Guide",
    description:
      "Your trusted guide for BLS India Canada services. Expert assistance for Indian consular services in Canada.",
    images: ["/twitter-image.jpg"],
    creator: "@indiaconsularblog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || "https://indiahelpdesk.ca"} />
        <meta name="geo.region" content="CA" />
        <meta name="geo.placename" content="Canada" />
        <meta name="geo.position" content="56.1304;-106.3468" />
        <meta name="ICBM" content="56.1304, -106.3468" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <WhatsAppOverlay />
        </ThemeProvider>
      </body>
    </html>
  )
}
