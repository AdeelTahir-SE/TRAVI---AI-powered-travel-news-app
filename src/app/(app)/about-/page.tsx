import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import CategoryHeroCloudSection from '@/components/categoryHeroCloudSection'

// ─── SEO ─────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
    title: 'About Us | Travi',
    description: 'Learn about Travi — the AI-powered travel platform bringing you the best hotels, destination guides, and travel stories from around the world.',
    openGraph: {
        title: 'About Us | Travi',
        description: 'Learn about Travi — the AI-powered travel platform bringing you the best hotels, destination guides, and travel stories from around the world.',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/about-`,
        siteName: 'Travi',
        images: [{ url: '/logos/navbar-text.svg', width: 1200, height: 630, alt: 'Travi' }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Us | Travi',
        description: 'Learn about Travi — the AI-powered travel platform.',
        images: ['/logos/navbar-text.svg'],
    },
    alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about-` },
    robots: { index: true, follow: true },
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function AboutHero() {
    return (
        <div className="flex flex-col items-center justify-center relative w-full">
            <section className="flex flex-col items-center justify-center w-full">
                <Image
                    src="/background-images/hero-section.jpg"
                    width={1400}
                    height={700}
                    className="w-auto object-cover h-[560px] sm:h-[680px] min-w-full"
                    alt="About Travi"
                    priority
                />
                {/* Blue gradient top */}
                <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(35,132,200,1)_0%,rgba(35,132,200,0.85)_13.27%,rgba(35,132,200,0)_50%)]" />
                {/* Dark bottom fade so text pops */}
                <div className="absolute inset-0 z-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0)_60%)]" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 text-center px-[20px] md:px-[40px] lg:px-[100px] gap-6">
                    {/* Breadcrumb pill */}
                    <div className="py-[10px] px-[24px] rounded-[600px] bg-[rgba(132,140,151,0.55)]">
                        <p className="font-inter font-semibold text-[18px] leading-[28px] tracking-[-0.02em]">
                            Home &gt; About Us
                        </p>
                    </div>

                    <div className="relative flex flex-col items-center justify-center gap-3">
                        <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(35,132,200,0.25)_0%,rgba(35,132,200,0)_70%)]" />
                        <h1 className="font-manrope font-extrabold text-[52px] lg:text-[96px] leading-[100%] tracking-[-0.03em] z-10">
                            About Travi
                        </h1>
                        <p className="font-inter font-normal text-[18px] lg:text-[22px] leading-[32px] tracking-[-0.02em] max-w-2xl z-10">
                            Your AI-powered companion for discovering the world&apos;s finest hotels, destinations, and travel stories.
                        </p>
                    </div>
                </div>
            </section>
            <CategoryHeroCloudSection />
        </div>
    )
}

// ─── Mission ──────────────────────────────────────────────────────────────────
function MissionSection() {
    return (
        <section className="flex flex-col lg:flex-row items-center justify-center px-[20px] py-[60px] lg:py-[100px] lg:px-[140px] gap-[50px] lg:gap-[80px]">
            {/* Text */}
            <div className="flex flex-col items-start justify-center gap-6 flex-1 max-w-xl">
                <h2 className="flex flex-col items-start gap-0">
                    <span className="heading-2 leading-[100%]">Our</span>
                    <span className="stylish-yellow-text">Mission</span>
                </h2>
                <p className="font-inter font-normal text-[16px] lg:text-[20px] leading-[28px] lg:leading-[34px] tracking-[-0.02em] text-[#1B1B1B]">
                    Travi was founded with one simple belief — travel should be effortless, inspiring, and accessible to everyone. We combine the power of AI with curated human expertise to bring you real-time news, luxury hotel showcases, and destination guides you can actually trust.
                </p>
                <p className="font-inter font-normal text-[16px] lg:text-[20px] leading-[28px] lg:leading-[34px] tracking-[-0.02em] text-[#475467]">
                    Whether you&apos;re planning your first trip to Dubai or looking for hidden gems across the globe, Travi is your starting point — and your trusted companion every step of the way.
                </p>
                <Link href="/contact" className="yellow-button flex items-center justify-center">
                    Get In Touch
                </Link>
            </div>

            {/* Image */}
            <div className="flex-1 max-w-xl w-full">
                <div className="relative rounded-[30px] overflow-hidden shadow-[9px_9px_75px_0px_#00000029]">
                    <Image
                        src="/background-images/explore-activities.jpg"
                        width={600}
                        height={480}
                        alt="Travi team exploring"
                        className="w-full h-[350px] sm:h-[420px] object-cover"
                    />
                    {/* Yellow accent bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#F8A900]" />
                </div>
            </div>
        </section>
    )
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function StatsSection() {
    const stats = [
        { value: '50+', label: 'Hotels Featured' },
        { value: '200+', label: 'Travel Articles' },
        { value: '30+', label: 'Destinations' },
        { value: '10K+', label: 'Monthly Readers' },
    ]

    return (
        <section className="px-[20px] py-[60px] lg:py-[80px] lg:px-[140px] w-full  bg-gradient-to-b from-[#F0F7FF] to-white">
            <div className="flex flex-col items-center justify-center gap-12">
                <h2 className="flex items-center justify-center gap-3 flex-wrap text-center">
                    <span className="heading-2">Travi by the</span>
                    <span className="stylish-yellow-text">Numbers</span>
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl">
                    {stats.map(s => (
                        <div
                            key={s.label}
                            className="flex flex-col items-center justify-center gap-3 bg-white rounded-[25px] shadow-[9px_9px_75px_0px_#00000029] py-10 px-6 text-center"
                        >
                            <p className="font-manrope font-extrabold text-[48px] lg:text-[60px] leading-[100%] tracking-[-0.03em] text-[#112259]">
                                {s.value}
                            </p>
                            <p className="font-inter font-medium text-[14px] lg:text-[16px] leading-[22px] tracking-[-0.01em] text-[#475467] uppercase">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// ─── Values ───────────────────────────────────────────────────────────────────
function ValuesSection() {
    const values = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            title: 'AI-Powered',
            desc: 'Our editorial engine generates fresh, structured travel content daily — keeping you ahead of every trend.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Global Coverage',
            desc: 'From Dubai to Bali, Paris to New York — Travi covers the destinations that matter most to modern travellers.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
            title: 'Curated Luxury',
            desc: 'Every hotel we feature is hand-selected for exceptional quality, stunning design, and outstanding guest experience.',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: 'Trusted & Honest',
            desc: 'No pay-to-rank, no hidden agendas. Our recommendations are driven by quality, not partnerships.',
        },
    ]

    return (
        <section className="flex flex-col items-center justify-center w-full px-[20px] py-[60px] lg:py-[100px] lg:px-[140px] gap-[50px]">
            <div className="flex flex-col items-center justify-center gap-3 text-center">
                <h2 className="flex items-center justify-center gap-3 flex-wrap">
                    <span className="heading-2">What We</span>
                    <span className="stylish-yellow-text">Stand For</span>
                </h2>
                <p className="sub-heading max-w-2xl text-[#1B1B1B]">
                    These values guide everything we create and every story we tell.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] w-full max-w-5xl">
                {values.map(v => (
                    <div
                        key={v.title}
                        className="flex flex-col gap-4 bg-white rounded-[25px] shadow-[9px_9px_75px_0px_#00000029] p-8 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="w-[64px] h-[64px] rounded-[18px] bg-[#F8A900]/10 border-2 border-[#F8A900]/30 flex items-center justify-center text-[#F8A900]">
                            {v.icon}
                        </div>
                        <h3 className="font-manrope font-extrabold text-[22px] leading-[28px] tracking-[-0.03em] text-[#112259]">
                            {v.title}
                        </h3>
                        <p className="font-inter font-normal text-[16px] lg:text-[18px] leading-[26px] tracking-[-0.02em] text-[#475467]">
                            {v.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

// ─── Team ─────────────────────────────────────────────────────────────────────
function TeamSection() {
    const team = [
        { name: 'Sarah Al-Farsi', role: 'Founder & Editor-in-Chief', initial: 'S' },
        { name: 'Marco Ricci', role: 'Head of Hotel Curation', initial: 'M' },
        { name: 'Aisha Khan', role: 'AI & Technology Lead', initial: 'A' },
        { name: 'James Wright', role: 'Travel Correspondent', initial: 'J' },
    ]

    return (
        <section className="flex flex-col items-center justify-center w-full px-[20px] py-[60px] lg:py-[80px] lg:px-[140px] gap-[50px] bg-gradient-to-b from-white to-[#F0F7FF]">
            <div className="flex flex-col items-center justify-center gap-3 text-center">
                <h2 className="flex items-center justify-center gap-3 flex-wrap">
                    <span className="heading-2">Meet the</span>
                    <span className="stylish-yellow-text">Team</span>
                </h2>
                <p className="sub-heading max-w-2xl text-[#1B1B1B]">
                    A passionate group of travellers, writers, and technologists building the future of travel media.
                </p>
            </div>

            <div className="flex flex-row items-stretch justify-center flex-wrap gap-[24px] w-full max-w-4xl">
                {team.map(member => (
                    <div
                        key={member.name}
                        className="flex flex-col items-center justify-center gap-4 bg-white rounded-[25px] shadow-[9px_9px_75px_0px_#00000029] p-8 min-w-[220px] flex-1 max-w-[280px] text-center hover:shadow-xl transition-shadow duration-300"
                    >
                        {/* Avatar */}
                        <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-[#2384C8] to-[#112259] flex items-center justify-center">
                            <span className="font-manrope font-extrabold text-[32px] text-white">{member.initial}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="font-manrope font-extrabold text-[18px] leading-[24px] tracking-[-0.03em] text-[#112259]">
                                {member.name}
                            </p>
                            <p className="font-inter font-normal text-[14px] leading-[20px] tracking-[-0.01em] text-[#475467]">
                                {member.role}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTASection() {
    return (
        <section className="relative flex flex-col items-center justify-center px-[20px] py-[80px] lg:py-[100px] w-full lg:px-[140px] gap-8 overflow-hidden">
            {/* Background image */}
            <Image
                src="/background-images/book-stay.jpg"
                fill
                className="object-cover z-0"
                alt=""
            />
            {/* Overlay */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(135deg,rgba(17,34,89,0.88)_0%,rgba(35,132,200,0.80)_100%)]" />

            <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center text-white max-w-2xl">
                <h2 className="flex items-center justify-center gap-3 flex-wrap">
                    <span className="heading-2 text-white">Start</span>
                    <span className="stylish-yellow-text">Exploring</span>
                </h2>
                <p className="font-inter font-normal text-[18px] lg:text-[22px] leading-[32px] tracking-[-0.02em]">
                    Dive into our hotel guides, read the latest travel news, or get in touch — we&apos;re always here to help you travel smarter.
                </p>
                <div className="flex flex-row items-center justify-center gap-4 flex-wrap">
                    <Link href="/" className="yellow-button flex items-center justify-center">
                        Explore Hotels
                    </Link>
                    <Link
                        href="/contact"
                        className="flex items-center justify-center font-inter font-semibold text-[15px] md:text-[20px] border-2 border-white text-white rounded-[50px] px-8 py-3 hover:bg-white hover:text-[#112259] transition-all duration-200"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
    return (
        <div className="flex flex-col items-center justify-center overflow-x-hidden w-full">
            <AboutHero />
            <MissionSection />
            <StatsSection />
            <ValuesSection />
            <TeamSection />
            <CTASection />
        </div>
    )
}
