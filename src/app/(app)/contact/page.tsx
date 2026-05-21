import type { Metadata } from 'next'
import ContactPageClient from '../../../components/contactPageClient'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Travi for travel questions, editorial enquiries, hotel partnerships, and support. Send us a message and our team will respond quickly.',
  keywords: [
    'contact Travi',
    'travel support',
    'hotel enquiry',
    'editorial contact',
    'Dubai travel help',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us',
    description:
      'Reach Travi for travel questions, editorial enquiries, hotel partnerships, and support.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us',
    description:
      'Reach Travi for travel questions, editorial enquiries, hotel partnerships, and support.',
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
