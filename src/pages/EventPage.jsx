import React, { useLayoutEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { events } from '../data/events'
import { TransitionLink } from '../components/PageTransition'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function EventPage() {
    const { slug } = useParams()
    const event = events.find(e => e.slug === slug)
    const containerRef = useRef(null)

    const heroRef = useRef(null)
    const contentRef = useRef(null)
    const timelineRef = useRef(null)
    const progressBarRef = useRef(null)

    const aboutRef = useRef(null)
    const rulesRef = useRef(null)
    const roundsRef = useRef(null)
    const registerRef = useRef(null)

    const [activeSection, setActiveSection] = useState('about')

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
        if (!event) return

        const ctx = gsap.context(() => {
            gsap.from(heroRef.current.querySelectorAll('.hero-anim'), {
                y: 80,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power4.out',
                delay: 0.2
            })

            gsap.set(progressBarRef.current, { transformOrigin: 'top center' })
            gsap.to(progressBarRef.current, {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: 'top center',
                    end: 'bottom bottom',
                    scrub: true
                }
            })

            const sections = [
                { ref: aboutRef, id: 'about' },
                { ref: rulesRef, id: 'rules' },
                { ref: roundsRef, id: 'rounds' },
                { ref: registerRef, id: 'register' }
            ]

            sections.forEach(({ ref, id }) => {
                gsap.from(ref.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                        onEnter: () => setActiveSection(id),
                        onEnterBack: () => setActiveSection(id)
                    }
                })
            })

        }, containerRef)

        return () => ctx.revert()
    }, [event])

    if (!event) return (
        <div className="min-h-screen flex items-center justify-center bg-base text-cream font-display text-xl">
            Event Not Found
        </div>
    )

    const navItems = [
        { id: 'about', label: 'Mission' },
        { id: 'rules', label: 'Rules' },
        { id: 'rounds', label: 'Timeline' },
        { id: 'register', label: 'Register' },
    ]

    return (
        <div ref={containerRef} className="min-h-screen bg-base text-cream relative overflow-hidden">

            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/4 blur-[160px] rounded-full" />
                <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-surface-light blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-32 relative z-10 flex flex-col lg:flex-row gap-16">

                {/* Sticky Side Navigation */}
                <div className="hidden lg:block w-48 shrink-0 relative">
                    <div className="sticky top-32 space-y-8">
                        <TransitionLink to="/home" className="inline-flex items-center text-cream-muted hover:text-gold transition-colors mb-8 group text-sm font-body">
                            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">&larr;</span> Back
                        </TransitionLink>

                        <div className="space-y-4 border-l border-white/10 pl-6 relative">
                            <div
                                className="absolute left-[-1px] w-[2px] bg-gold transition-all duration-300 ease-out"
                                style={{
                                    height: '24px',
                                    top: `${navItems.findIndex(n => n.id === activeSection) * 44}px`
                                }}
                            />

                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        const el = document.getElementById(item.id)
                                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                    }}
                                    className={`block text-left font-body text-xs tracking-[0.2em] uppercase transition-colors duration-300 h-6 cursor-pointer ${activeSection === item.id ? 'text-gold font-semibold' : 'text-cream-muted/50 hover:text-cream'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-28" ref={contentRef}>

                    {/* Hero */}
                    <div ref={heroRef} className="text-center lg:text-left">
                        <div className="hero-anim inline-block px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold font-body text-xs tracking-[0.2em] mb-6 uppercase">
                            Featured Event
                        </div>
                        <h1 className="hero-anim text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none mb-6 text-gradient-white">
                            {event.title}
                        </h1>
                        <p className="hero-anim text-xl md:text-2xl text-cream-muted font-body tracking-wide">
                            {event.tagline}
                        </p>
                    </div>

                    {/* About Section */}
                    <div id="about" ref={aboutRef}>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-cream mb-8 flex items-center">
                            <span className="w-10 h-[1px] bg-gold mr-4" /> Mission Brief
                        </h2>
                        <p className="text-base md:text-lg text-cream-muted/70 font-body leading-[1.8]">
                            {event.description}
                        </p>
                    </div>

                    {/* Rules */}
                    <div id="rules" ref={rulesRef}>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-cream mb-8 flex items-center">
                            <span className="w-10 h-[1px] bg-gold mr-4" /> Protocols
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {event.rules.map((rule, i) => (
                                <div key={i} className="glass p-6 rounded-xl hover:glass-gold transition-all duration-300">
                                    <div className="text-gold font-display text-3xl opacity-20 mb-2">0{i + 1}</div>
                                    <p className="text-cream-muted/80 font-body text-sm">{rule}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rounds Timeline */}
                    <div id="rounds" ref={roundsRef}>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-cream mb-12 flex items-center">
                            <span className="w-10 h-[1px] bg-gold mr-4" /> Battle Timeline
                        </h2>

                        <div className="relative pl-8 md:pl-16 space-y-10 border-l border-white/10" ref={timelineRef}>
                            <div
                                ref={progressBarRef}
                                className="absolute left-[-1px] top-0 w-[2px] bg-gold h-full origin-top scale-y-0"
                            />

                            {event.rounds.map((round, i) => (
                                <div key={i} className="relative group">
                                    <div className="absolute left-[-39px] md:left-[-71px] top-0 w-4 h-4 rounded-full border-2 border-gold bg-base group-hover:bg-gold transition-colors duration-300 glow-gold" />

                                    <div className="glass p-8 rounded-2xl group-hover:glass-gold transition-all duration-300">
                                        <h3 className="text-xl font-display font-bold text-cream mb-2">{round.name}</h3>
                                        <p className="text-cream-muted/60 font-body text-sm">{round.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Register CTA */}
                    <div id="register" ref={registerRef} className="pt-10 text-center">
                        <div className="glass-gold p-12 rounded-3xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gold/5 blur-[80px] group-hover:bg-gold/10 transition-colors duration-500 pointer-events-none" />

                            <h2 className="relative text-3xl md:text-5xl font-display font-bold text-cream mb-8">
                                Ready to Conquer?
                            </h2>

                            <button className="relative px-10 py-4 bg-gold hover:bg-gold-light text-base font-display font-bold text-sm tracking-[0.15em] uppercase rounded-full glow-gold-strong hover:scale-105 transition-all duration-300 cursor-pointer">
                                Join the Summit
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
