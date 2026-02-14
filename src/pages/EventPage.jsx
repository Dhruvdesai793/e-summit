import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { events } from '../data/events'
import { TransitionLink } from '../components/PageTransition'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function EventPage() {
    const { slug } = useParams()
    const event = events.find(e => e.slug === slug)
    const containerRef = useRef(null)
    const heroRef = useRef(null)
    const contentRef = useRef(null)
    const progressBarRef = useRef(null)
    const aboutRef = useRef(null)
    const rulesRef = useRef(null)
    const roundsRef = useRef(null)
    const registerRef = useRef(null)
    const [activeSection, setActiveSection] = useState('about')

    useGSAP(() => {
        window.scrollTo(0, 0)
        if (!event) return

        gsap.from(heroRef.current.querySelectorAll('.hero-anim'), {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.15
        })

        gsap.set(progressBarRef.current, { transformOrigin: 'top center', scaleY: 0 })
        gsap.to(progressBarRef.current, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: contentRef.current, start: 'top center', end: 'bottom bottom', scrub: true }
        })

        const sections = [
            { ref: aboutRef, id: 'about' },
            { ref: rulesRef, id: 'rules' },
            { ref: roundsRef, id: 'rounds' },
            { ref: registerRef, id: 'register' }
        ]
        sections.forEach(({ ref, id }) => {
            gsap.from(ref.current, {
                y: 40,
                opacity: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    onEnter: () => setActiveSection(id),
                    onEnterBack: () => setActiveSection(id)
                }
            })
        })
    }, { scope: containerRef, dependencies: [event] })

    if (!event) return (
        <div className="min-h-screen flex items-center justify-center bg-void text-white font-display text-xl">
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
        <div ref={containerRef} className="min-h-screen text-white relative overflow-hidden bg-mountain">

            <div className="fixed inset-0 pointer-events-none -z-10">
                <div
                    className="absolute top-[15%] left-[15%] w-[300px] h-[200px] rounded-full opacity-10"
                    style={{ background: 'radial-gradient(ellipse, rgba(244, 162, 97, 0.2) 0%, transparent 70%)' }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-32 relative z-10 flex flex-col lg:flex-row gap-16">

                <div className="hidden lg:block w-48 shrink-0 relative">
                    <div className="sticky top-32 space-y-8">
                        <TransitionLink to="/home" className="inline-flex items-center text-text-muted hover:text-accent-primary transition-colors mb-8 group text-sm font-body">
                            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> Back
                        </TransitionLink>

                        <div className="space-y-4 border-l border-white/8 pl-6 relative">
                            <div
                                className="absolute left-[-1px] w-[2px] bg-accent-primary transition-all duration-300 ease-out"
                                style={{ height: '24px', top: `${navItems.findIndex(n => n.id === activeSection) * 44}px` }}
                            />
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        const el = document.getElementById(item.id)
                                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                    }}
                                    className={`block text-left font-body text-xs tracking-[0.15em] uppercase transition-colors duration-300 h-6 cursor-pointer ${activeSection === item.id ? 'text-accent-primary font-semibold' : 'text-text-muted hover:text-white'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex-1 space-y-24" ref={contentRef}>

                    <div ref={heroRef} className="text-center lg:text-left">
                        <div className="hero-anim inline-block px-4 py-1.5 rounded-full border border-accent-primary/20 bg-accent-primary/5 text-accent-primary font-body text-xs tracking-[0.2em] mb-6 uppercase">
                            Featured Event
                        </div>
                        <h1 className="hero-anim text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-none mb-6 tracking-[-0.04em] text-gradient-white">
                            {event.title}
                        </h1>
                        <p className="hero-anim text-xl md:text-2xl text-text-secondary font-body">
                            {event.tagline}
                        </p>
                    </div>

                    <div id="about" ref={aboutRef}>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8 flex items-center">
                            <span className="w-10 h-[1px] bg-accent-primary mr-4" /> Mission Brief
                        </h2>
                        <p className="text-base md:text-lg text-text-secondary font-body leading-[1.8]">{event.description}</p>
                    </div>

                    <div id="rules" ref={rulesRef}>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8 flex items-center">
                            <span className="w-10 h-[1px] bg-accent-primary mr-4" /> Protocols
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {event.rules.map((rule, i) => (
                                <div key={i} className="glass p-6 rounded-xl hover:border-accent-primary/15 transition-colors duration-300">
                                    <div className="text-accent-secondary font-display text-3xl opacity-25 mb-2">0{i + 1}</div>
                                    <p className="text-text-secondary font-body text-sm">{rule}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div id="rounds" ref={roundsRef}>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-12 flex items-center">
                            <span className="w-10 h-[1px] bg-accent-primary mr-4" /> Battle Timeline
                        </h2>
                        <div className="relative pl-8 md:pl-16 space-y-8 border-l border-white/8">
                            <div ref={progressBarRef} className="absolute left-[-1px] top-0 w-[2px] bg-accent-primary h-full" />
                            {event.rounds.map((round, i) => (
                                <div key={i} className="relative group">
                                    <div className="absolute left-[-39px] md:left-[-71px] top-0 w-3.5 h-3.5 rounded-full border-2 border-accent-primary bg-void group-hover:bg-accent-primary transition-colors duration-300" />
                                    <div className="glass p-7 rounded-2xl group-hover:border-accent-primary/15 transition-colors duration-300">
                                        <h3 className="text-lg font-display font-bold text-white mb-2">{round.name}</h3>
                                        <p className="text-text-muted font-body text-sm">{round.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div id="register" ref={registerRef} className="pt-8 text-center">
                        <div className="glass-warm p-10 md:p-12 rounded-3xl">
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">
                                Ready to Conquer?
                            </h2>
                            <button className="px-10 py-4 rounded-full bg-accent-primary hover:bg-accent-secondary text-void font-display font-bold text-sm tracking-[0.12em] uppercase hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                                Join the Summit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
