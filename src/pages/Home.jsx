import React, { useRef } from 'react'
import EventCard from '../components/EventCard'
import { events } from '../data/events'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
    const containerRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const gridRef = useRef(null)
    const cardsRef = useRef([])
    const marqueeRef = useRef(null)

    useGSAP(() => {
        // Hero entrance
        const tl = gsap.timeline()
        tl.from(titleRef.current, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        })
            .from(subtitleRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.3')
            .from(marqueeRef.current, {
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.2')

        // Card stagger on scroll
        gsap.from(cardsRef.current.filter(Boolean), {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        })
    }, { scope: containerRef })

    const marqueeEvents = [...events, ...events]

    return (
        <div ref={containerRef} className="min-h-screen text-white overflow-hidden relative bg-mountain">

            {/* Subtle warm glow */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div
                    className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-15"
                    style={{ background: 'radial-gradient(ellipse, rgba(244, 162, 97, 0.25) 0%, transparent 70%)' }}
                />
            </div>

            <div className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto">

                {/* Hero */}
                <div className="text-center mb-20 space-y-5">
                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[-0.04em] leading-[0.95] text-gradient-white will-animate"
                    >
                        CHOOSE YOUR <br className="hidden md:block" /> BATTLEFIELD
                    </h1>

                    <p
                        ref={subtitleRef}
                        className="text-sm md:text-base text-text-muted font-body tracking-[0.2em] uppercase"
                    >
                        6 Arenas · One Summit · Infinite Possibilities
                    </p>
                </div>

                {/* Marquee */}
                <div ref={marqueeRef} className="relative overflow-hidden py-5 mb-20 border-y border-white/6">
                    <div className="flex animate-marquee whitespace-nowrap">
                        {marqueeEvents.map((e, i) => (
                            <span key={i} className="mx-8 text-sm font-display font-medium text-text-muted/50 uppercase tracking-[0.15em]">
                                {e.title}
                                <span className="mx-8 text-accent-primary/30">·</span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {events.map((event, index) => (
                        <div key={event.id} ref={(el) => (cardsRef.current[index] = el)} className="will-animate">
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-28 text-center space-y-3">
                    <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-accent-primary/15 to-transparent mx-auto" />
                    <p className="text-xs font-body tracking-[0.2em] text-text-muted uppercase">
                        E-Summit 2026
                    </p>
                </div>
            </div>
        </div>
    )
}
