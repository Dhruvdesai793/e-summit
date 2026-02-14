import React, { useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
    { q: 'Who can participate in E-Summit?', a: 'E-Summit is open to all college students across India. Some events have specific team size requirements—check individual event pages for details.' },
    { q: 'Is there a registration fee?', a: 'Early bird registration is free! Regular passes are priced affordably. Premium passes with exclusive perks are also available.' },
    { q: 'What do I need to bring?', a: 'Just your ID, creativity, and competitive spirit. Laptops may be required for certain events. All materials and refreshments are provided.' },
    { q: 'Where is E-Summit held?', a: 'E-Summit 2026 will be held at the main campus auditorium and adjacent seminar halls. Detailed venue maps will be shared before the event.' },
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

    const toggleFaq = useCallback((i) => setOpenFaq(prev => prev === i ? null : i), [])

    useGSAP(() => {
        window.scrollTo(0, 0)

        gsap.from(heroRef.current.querySelectorAll('.contact-hero-anim'), {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        })

        gsap.from(formRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        })

        gsap.from(faqRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: faqRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        })
    }, { scope: containerRef })

    return (
        <div ref={containerRef} className="min-h-screen text-white relative overflow-hidden bg-mountain">

            <div className="fixed inset-0 pointer-events-none -z-10">
                <div
                    className="absolute top-[20%] left-[10%] w-[300px] h-[250px] rounded-full opacity-10"
                    style={{ background: 'radial-gradient(ellipse, rgba(76, 201, 240, 0.2) 0%, transparent 70%)' }}
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24">

                <div ref={heroRef} className="mb-20">
                    <div className="contact-hero-anim inline-block px-4 py-1.5 rounded-full border border-accent-primary/20 bg-accent-primary/5 text-accent-primary font-body text-xs tracking-[0.2em] uppercase mb-8">
                        Get In Touch
                    </div>
                    <h1 className="contact-hero-anim text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[-0.04em] leading-[0.95] text-gradient-white mb-6">
                        Let's<br />Connect
                    </h1>
                    <p className="contact-hero-anim text-lg md:text-xl text-text-secondary font-body leading-relaxed max-w-2xl">
                        Have questions? Want to sponsor? Or just want to say hello? We'd love to hear from you.
                    </p>
                </div>

                <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-24">
                    <div className="lg:col-span-3 glass rounded-2xl p-8 md:p-10">
                        <h2 className="text-xl font-display font-bold text-white mb-8">Send us a message</h2>
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-body tracking-[0.12em] text-text-muted uppercase mb-2">Name</label>
                                    <input type="text" placeholder="Your name" className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-3 text-white font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-primary/30 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-body tracking-[0.12em] text-text-muted uppercase mb-2">Email</label>
                                    <input type="email" placeholder="your@email.com" className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-3 text-white font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-primary/30 transition-colors" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-body tracking-[0.12em] text-text-muted uppercase mb-2">Subject</label>
                                <input type="text" placeholder="What's this about?" className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-3 text-white font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-primary/30 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs font-body tracking-[0.12em] text-text-muted uppercase mb-2">Message</label>
                                <textarea rows={5} placeholder="Tell us more..." className="w-full bg-white/4 border border-white/8 rounded-lg px-4 py-3 text-white font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-primary/30 transition-colors resize-none" />
                            </div>
                            <button type="submit" className="px-8 py-3 rounded-full border border-accent-primary/25 bg-accent-primary/8 text-accent-primary font-display font-semibold text-sm tracking-[0.12em] uppercase hover:bg-accent-primary/15 transition-colors duration-300 cursor-pointer">
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-2 space-y-5">
                        <div className="glass rounded-2xl p-8">
                            <h3 className="text-lg font-display font-bold text-white mb-5">Connect With Us</h3>
                            <div className="space-y-4">
                                {socials.map((s, i) => (
                                    <a key={i} href={s.href} className="flex items-center justify-between group">
                                        <div>
                                            <div className="text-sm font-body font-medium text-white group-hover:text-accent-primary transition-colors">{s.name}</div>
                                            <div className="text-xs font-body text-text-muted">{s.handle}</div>
                                        </div>
                                        <span className="text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 transition-all text-sm">→</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="glass-warm rounded-2xl p-8">
                            <h3 className="text-lg font-display font-bold text-accent-primary mb-2">Sponsorship?</h3>
                            <p className="text-sm font-body text-text-secondary leading-relaxed">
                                Interested in partnering with E-Summit 2026? We offer tiered sponsorship packages with premium visibility.
                            </p>
                            <p className="text-sm font-body text-accent-primary mt-3">sponsors@esummit.in</p>
                        </div>
                    </div>
                </div>

                <div ref={faqRef}>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-10 flex items-center">
                        <span className="w-10 h-[1px] bg-accent-primary mr-4" />
                        Frequently Asked
                    </h2>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className="glass rounded-xl overflow-hidden">
                                <button onClick={() => toggleFaq(i)} className="w-full flex items-center justify-between p-6 text-left cursor-pointer">
                                    <span className="text-base font-display font-medium text-white pr-4">{faq.q}</span>
                                    <span className={`text-accent-primary text-lg transition-transform duration-300 shrink-0 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                                </button>
                                <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: openFaq === i ? '200px' : '0px', opacity: openFaq === i ? 1 : 0 }}>
                                    <p className="px-6 pb-6 text-sm font-body text-text-secondary leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-24 text-center">
                    <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-accent-primary/15 to-transparent mx-auto mb-3" />
                    <p className="text-xs font-body tracking-[0.2em] text-text-muted uppercase">We reply within 24 hours</p>
                </div>
            </div>
        </div>
    )
}
