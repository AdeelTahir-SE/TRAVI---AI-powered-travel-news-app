'use client'

import Image from 'next/image'
import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import CategoryHeroCloudSection from '@/components/categoryHeroCloudSection'
import { supabase } from '@/utils/supabase'

function ContactHero() {
  return (
    <div className="flex flex-col items-center justify-center relative w-full">
      <section className="flex flex-col items-center justify-center w-full">
        <Image
          src="/background-images/category-hero-section.jpg"
          width={1400}
          height={600}
          className="w-auto object-cover h-[500px] sm:h-[600px] min-w-full"
          alt="Contact Travi"
          priority
        />

        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(35,132,200,1)_0%,rgba(35,132,200,0.85)_13.27%,rgba(35,132,200,0)_50%)]" />

        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-white z-10 text-center px-5 md:px-10 lg:px-[100px] gap-6">
          <div className="py-3 px-6 rounded-[600px] bg-[rgba(132,140,151,0.55)]">
            <p className="font-inter font-semibold text-[18px] leading-7 tracking-[-0.02em]">
              Home &gt; Contact Us
            </p>
          </div>

          <div className="relative flex flex-col items-center justify-center">
            <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(35,132,200,0.3)_0%,rgba(35,132,200,0.3)_40%,rgba(35,132,200,0.1)_65%,rgba(35,132,200,0)_100%)]" />
            <h1 className="font-manrope font-extrabold text-[52px] lg:text-[90px] leading-[100%] tracking-[-0.03em] z-10">
              Get In Touch
            </h1>
            <p className="font-inter font-normal text-[18px] lg:text-[22px] leading-8 tracking-[-0.02em] text-center z-10 max-w-2xl mt-2">
              Have a question about travel, a hotel, or an article? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <CategoryHeroCloudSection />
    </div>
  )
}

function InfoCard({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 bg-white rounded-[25px] shadow-[9px_9px_75px_0px_#00000029] px-8 py-10 w-full text-center hover:shadow-xl transition-shadow duration-300">
      <div className="w-[70px] h-[70px] rounded-full bg-[#F8A900]/10 border-2 border-[#F8A900]/30 flex items-center justify-center text-[#F8A900]">
        {icon}
      </div>
      <p className="font-inter font-medium text-[14px] leading-5 tracking-[0.08em] uppercase text-gray-400">{label}</p>
      <p className="font-manrope font-extrabold text-[20px] lg:text-[22px] leading-7 tracking-[-0.03em] text-[#112259]">{value}</p>
    </div>
  )

  if (href) return <a href={href} className="flex-1 min-w-[260px] max-w-[360px]">{content}</a>
  return <div className="flex-1 min-w-[260px] max-w-[360px]">{content}</div>
}

function ContactInfo() {
  return (
    <section className="flex flex-col items-center justify-center px-5 py-15 lg:py-20 lg:px-[140px] gap-12">
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <h2 className="flex items-center justify-center gap-3 flex-wrap">
          <span className="heading-2">Contact</span>
          <span className="stylish-yellow-text">Info</span>
        </h2>
        <p className="sub-heading max-w-2xl text-[#1B1B1B]">
          Reach out through any of these channels and we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className="flex flex-row items-stretch justify-center flex-wrap gap-6 w-full">
        <InfoCard
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
          label="Email Us"
          value="hello@travi.com"
          href="mailto:hello@travi.com"
        />
        <InfoCard
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          }
          label="Call Us"
          value="+971 4 000 0000"
          href="tel:+97140000000"
        />
        <InfoCard
          icon={
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          label="Visit Us"
          value="Downtown Dubai, UAE"
        />
      </div>
    </section>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (status !== 'idle') {
      setStatus('idle')
      setFeedback('')
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const name = form.name.trim()
    const email = form.email.trim().toLowerCase()
    const message = form.message.trim()

    if (!name || !email || !message) {
      setStatus('error')
      setFeedback('Please fill in your name, email, and message.')
      return
    }

    setStatus('sending')
    setFeedback('')

    const { error } = await supabase.from('contact_message').insert([
      {
        full_name: name,
        email,
        subject: form.subject.trim() || 'general',
        message,
      },
    ])

    if (error) {
      console.error('Error saving contact message:', error)
      setStatus('error')
      setFeedback('We could not send your message right now. Please try again.')
      return
    }

    setStatus('sent')
    setFeedback('')
  }

  const inputClass = 'w-full font-inter text-[18px] leading-[28px] tracking-[-0.02em] bg-white border border-gray-200 rounded-[14px] px-5 py-4 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F8A900] focus:border-transparent transition-all duration-200'

  return (
    <section className="px-5 pb-20 lg:pb-[100px] lg:px-[140px]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[30px] shadow-[9px_9px_75px_0px_#00000029] p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#2384C8]/5 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#F8A900]/5 pointer-events-none" />

          <div className="relative flex flex-col items-start gap-2 mb-10">
            <h2 className="flex items-center gap-3 flex-wrap">
              <span className="heading-2 text-[40px] lg:text-[60px]">Send a</span>
              <span className="stylish-yellow-text text-[60px] lg:text-[80px]">Message</span>
            </h2>
            <p className="font-inter font-normal text-[16px] lg:text-[20px] leading-7 tracking-[-0.02em] text-gray-500">
              Fill out the form below and we&apos;ll respond within 24 hours.
            </p>
          </div>

          {status === 'sent' ? (
            <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-[#F8A900]/10 border-2 border-[#F8A900] flex items-center justify-center">
                <svg className="w-10 h-10 text-[#F8A900]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-manrope font-extrabold text-[28px] text-[#112259]">Message Sent!</h3>
              <p className="font-inter text-[18px] text-gray-500 max-w-md">
                Thanks for reaching out, {form.name.split(' ')[0]}. We&apos;ll get back to you at <span className="text-[#2384C8] font-medium">{form.email}</span> soon.
              </p>
              <button
                onClick={() => { setStatus('idle'); setFeedback(''); setForm({ name: '', email: '', subject: '', message: '' }) }}
                className="yellow-button cursor-pointer mt-2"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-inter font-semibold text-[14px] text-[#112259] tracking-[-0.01em]">Full Name <span className="text-[#F8A900]">*</span></label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-inter font-semibold text-[14px] text-[#112259] tracking-[-0.01em]">Email Address <span className="text-[#F8A900]">*</span></label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-inter font-semibold text-[14px] text-[#112259] tracking-[-0.01em]">Subject</label>
                <select name="subject" value={form.subject} onChange={handleChange} className={inputClass + ' appearance-none cursor-pointer'}>
                  <option value="">Select a topic…</option>
                  <option value="hotel">Hotel Enquiry</option>
                  <option value="article">Article / Editorial</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-inter font-semibold text-[14px] text-[#112259] tracking-[-0.01em]">Message <span className="text-[#F8A900]">*</span></label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you…"
                  rows={6}
                  required
                  className={inputClass + ' resize-none'}
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                <p className="font-inter text-[13px] text-gray-400">
                  Fields marked <span className="text-[#F8A900] font-semibold">*</span> are required
                </p>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="pl-4 cursor-pointer yellow-button flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending…
                    </>
                  ) : 'Send Message'}
                </button>
              </div>

              {feedback ? (
                <p className={status === 'error' ? 'text-sm text-red-600 font-inter' : 'text-sm text-gray-500 font-inter'}>
                  {feedback}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default function ContactPageClient() {
  return (
    <div className="flex flex-col items-center justify-center overflow-x-hidden w-full">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
    </div>
  )
}