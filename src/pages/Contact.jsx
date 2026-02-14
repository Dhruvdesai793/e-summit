import React, { useLayoutEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
    {
        q: 'Who can participate in E-Summit?',
        a: 'E-Summit is open to all college students across India. Some events have specific team size requirements—check individual event pages for details.'
    },
    {
        q: 'Is there a registration fee?',
        a: 'Early bird registration is free! Regular passes are priced affordably. Premium passes with exclusive perks are also available.'
    },
    {
        q: 'What do I need to bring?',
        a: 'Just your ID, creativity, and competitive spirit. Laptops may be required for certain events. All materials and refreshments are provided.'
    },
    {
        q: 'Where is E-Summit held?',
        a: 'E-Summit 2026 will be held at the main campus auditorium and adjacent seminar halls. Detailed venue maps will be shared before the event.'
    },
]

const socials = [
    { name: 'Instagram', handle: '@esummit2026', href: '#' },
    { name: 'LinkedIn', handle: 'E-Summit Official', href: '#' },
    { name: 'Twitter / X', handle: '@esummit_', href: '#' },
    { name: 'Email', handle: 'hello@esummit.in', href: '#' },
]

export default function Contact() {
    const containerRef = useRef(null)
    const heroRef = useRef(null)
    const formRef = useRef(null)
    const faqRef = useRef(null)
    const [openFaq, setOpenFaq] = useState(null)

    const toggleFaq = useCallback((i) => {
        setOpenFaq(prev => prev === i ? null : i)
    }, [])

    useLayoutEffect(() => {
        window.scrollTo(0, 0)

        const ctx = gsap.context(() => {
            gsap.from(heroRef.current.querySelectorAll('.contact-hero-anim'), {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power4.out'
            })

            gsap.from(formRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: formRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            })

            gsap.from(faqRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: faqRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="min-h-screen bg-base text-cream relative overflow-hidden">

            {/* Ambient */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[160px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[10%] w-[35%] h-[35%] bg-surface-light blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24">

                {/* Hero */}
                <div ref={heroRef} className="mb-20">
                    <div className="contact-hero-anim inline-block px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold font-body text-xs tracking-[0.2em] uppercase mb-8">
                        Get In Touch
                    </div>
                    <h1 className="contact-hero-anim text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[-0.04em] leading-[0.95] text-gradient-white mb-6">
                        Let's<br />Connect
                    </h1>
                    <p className="contact-hero-anim text-lg md:text-xl text-cream-muted font-body leading-relaxed max-w-2xl">
                        Have questions? Want to sponsor? Or just want to say hello? We'd love to hear from you.
                    </p>
                </div>

                {/* Main: Form + Info */}
                <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-28">

                    {/* Contact Form */}
                    <div className="lg:col-span-3 glass rounded-2xl p-8 md:p-10">
                        <h2 className="text-xl font-display font-bold text-cream mb-8">
                            Send us a message
                        </h2>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-body tracking-[0.15em] text-cream-muted uppercase mb-2">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream font-body text-sm placeholder:text-cream-muted/40 focus:outline-none focus:border-gold/40 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-body tracking-[0.15em] text-cream-muted uppercase mb-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream font-body text-sm placeholder:text-cream-muted/40 focus:outline-none focus:border-gold/40 transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-body tracking-[0.15em] text-cream-muted uppercase mb-2">Subject</label>
                                <input
                                    type="text"
                                    placeholder="What's this about?"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream font-body text-sm placeholder:text-cream-muted/40 focus:outline-none focus:border-gold/40 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-body tracking-[0.15em] text-cream-muted uppercase mb-2">Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="Tell us more..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-cream font-body text-sm placeholder:text-cream-muted/40 focus:outline-none focus:border-gold/40 transition-colors resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-8 py-3 rounded-full border border-gold/40 bg-gold/10 text-gold font-display font-semibold text-sm tracking-[0.15em] uppercase hover:bg-gold/20 transition-colors duration-300 cursor-pointer"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Info Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass rounded-2xl p-8">
                            <h3 className="text-lg font-display font-bold text-cream mb-6">Connect With Us</h3>
                            <div className="space-y-5">
                                {socials.map((s, i) => (
                                    <a
                                        key={i}
                                        href={s.href}
                                        className="flex items-center justify-between group"
                                    >
                                        <div>
                                            <div className="text-sm font-body font-medium text-cream group-hover:text-gold transition-colors">
                                                {s.name}
                                            </div>
                                            <div className="text-xs font-body text-cream-muted/60">
                                                {s.handle}
                                            </div>
                                        </div>
                                        <svg className="w-4 h-4 text-cream-muted/40 group-hover:text-gold group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="glass-gold rounded-2xl p-8">
                            <h3 className="text-lg font-display font-bold text-gold mb-2">Sponsorship?</h3>
                            <p className="text-sm font-body text-cream-muted/70 leading-relaxed">
                                Interested in partnering with E-Summit 2026? We offer tiered sponsorship packages with premium visibility.
                            </p>
                            <p className="text-sm font-body text-gold mt-3">
                                sponsors@esummit.in
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div ref={faqRef}>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-cream mb-10 flex items-center">
                        <span className="w-10 h-[1px] bg-gold mr-4" />
                        Frequently Asked
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="glass rounded-xl overflow-hidden transition-all duration-300"
                            >
                                <button
                                    onClick={() => toggleFaq(i)}
                                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                                >
                                    <span className="text-base font-display font-medium text-cream pr-4">
                                        {faq.q}
                                    </span>
                                    <span className={`text-gold text-xl transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>
                                        +
                                    </span>
                                </button>
                                <div
                                    className="overflow-hidden transition-all duration-300"
                                    style={{
                                        maxHeight: openFaq === i ? '200px' : '0px',
                                        opacity: openFaq === i ? 1 : 0
                                    }}
                                >
                                    <p className="px-6 pb-6 text-sm font-body text-cream-muted/70 leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-28 text-center">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold/30 to-transparent mx-auto mb-4" />
                    <p className="text-xs font-body tracking-[0.3em] text-cream-muted/40 uppercase">
                        We reply within 24 hours
                    </p>
                </div>
            </div>
        </div>
    )
}
