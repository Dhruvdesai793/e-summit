import React, { useLayoutEffect, useRef } from 'react'
import EventCard from '../components/EventCard'
import { events } from '../data/events'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
    const containerRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const gridRef = useRef(null)
    const cardsRef = useRef([])
    const marqueeRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Hero entrance
            const tl = gsap.timeline()
            tl.from(titleRef.current, {
                y: 60,
                opacity: 0,
                duration: 1.2,
                ease: 'power4.out'
            })
                .from(subtitleRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.5')
                .from(marqueeRef.current, {
                    opacity: 0,
                    duration: 1,
                    ease: 'power2.out'
                }, '-=0.3')

            // Card grid reveal
            gsap.from(cardsRef.current.filter(Boolean), {
                y: 80,
                opacity: 0,
                scale: 0.97,
                duration: 1,
                stagger: 0.1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    const marqueeEvents = [...events, ...events]

    return (
        <div ref={containerRef} className="min-h-screen bg-base text-cream overflow-hidden relative">

            {/* Ambient */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-[-15%] left-[-5%] w-[40%] h-[40%] bg-gold/8 blur-[160px] rounded-full" />
                <div className="absolute bottom-[-15%] right-[-5%] w-[40%] h-[40%] bg-surface-light/80 blur-[160px] rounded-full" />
            </div>

            <div className="relative z-10 pt-32 pb-24 px-6 max-w-7xl mx-auto">

                {/* Hero */}
                <div className="text-center mb-20 space-y-6">
                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-8xl lg:text-9xl font-display font-bold tracking-[-0.04em] leading-[0.95] text-gradient-white"
                    >
                        CHOOSE YOUR <br className="hidden md:block" /> BATTLEFIELD
                    </h1>

                    <p
                        ref={subtitleRef}
                        className="text-base md:text-lg text-cream-muted font-body tracking-[0.25em] uppercase"
                    >
                        6 Arenas · One Summit · Infinite Possibilities
                    </p>
                </div>

                {/* Marquee strip */}
                <div ref={marqueeRef} className="relative overflow-hidden py-6 mb-20 border-y border-white/5">
                    <div className="flex animate-marquee whitespace-nowrap">
                        {marqueeEvents.map((e, i) => (
                            <span key={i} className="mx-8 text-sm md:text-base font-display font-medium text-cream-muted/40 uppercase tracking-[0.2em]">
                                {e.title}
                                <span className="mx-8 text-gold/30">✦</span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Events Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {events.map((event, index) => (
                        <div
                            key={event.id}
                            ref={(el) => (cardsRef.current[index] = el)}
                        >
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>

                {/* Bottom section */}
                <div className="mt-32 text-center space-y-4">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold/30 to-transparent mx-auto" />
                    <p className="text-xs font-body tracking-[0.3em] text-cream-muted/50 uppercase">
                        E-Summit 2026 · Where Vision Meets Victory
                    </p>
                </div>
            </div>
        </div>
    )
}
