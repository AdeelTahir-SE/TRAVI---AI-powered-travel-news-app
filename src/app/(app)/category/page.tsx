import type { Metadata } from "next"
import { Suspense } from "react"
import BookStaySection from "@/components/bookStaySection"
import CategoryCardsSection from "@/components/categoryCardsSection"
import CategoryHeroSection from "@/components/categoryHeroSection"
import ShalimarWithAboveSection from "@/components/shalimarWithAboveCloudSection"

export const metadata: Metadata = {
  title: "Travel Categories | Travi",
  description: "Explore travel categories and discover destinations, activities, and experiences around the world with Travi's comprehensive travel guides.",
  openGraph: {
    title: "Travel Categories | Travi",
    description: "Explore travel categories and discover destinations, activities, and experiences around the world with Travi's comprehensive travel guides.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/category`,
    siteName: "Travi",
    images: [{ url: "/logos/navbar-text.svg", width: 1200, height: 630, alt: "Travi - Travel Categories" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Categories | Travi",
    description: "Explore travel categories and discover destinations, activities, and experiences around the world with Travi's comprehensive travel guides.",
    images: ["/logos/navbar-text.svg"],
  },
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/category` },
  robots: { index: true, follow: true },
}

export default function Category() {
  return (
    <div className="flex flex-col items-center justify-center">
      <CategoryHeroSection />
      {/* Suspense required because CategoryCardsSection uses useSearchParams() */}
      <Suspense fallback={
        <div className="w-full flex items-center justify-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0D7FF2] border-t-transparent" />
        </div>
      }>
        <CategoryCardsSection />
      </Suspense>
      <BookStaySection />
      <ShalimarWithAboveSection />
    </div>
  )
}
