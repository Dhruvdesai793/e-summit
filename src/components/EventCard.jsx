import React, { useRef, useCallback } from 'react'
import { TransitionLink } from './PageTransition'
import gsap from 'gsap'

export default function EventCard({ event }) {
    const cardRef = useRef(null)
    const imageRef = useRef(null)
    const overlayRef = useRef(null)

    const handleMouseEnter = useCallback(() => {
        gsap.to(imageRef.current, { scale: 1.08, duration: 0.6, ease: 'power3.out' })
        gsap.to(cardRef.current, { y: -8, duration: 0.4, ease: 'power3.out' })
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.4 })
    }, [])

    const handleMouseLeave = useCallback(() => {
        gsap.to(imageRef.current, { scale: 1, duration: 0.6, ease: 'power3.out' })
        gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: 'power3.out' })
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.4 })
    }, [])

    return (
        <TransitionLink to={`/events/${event.slug}`}>
            <div
                ref={cardRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative overflow-hidden rounded-2xl group cursor-pointer h-[420px] glass glow-gold"
                style={{ willChange: 'transform' }}
            >
                {/* Image */}
                <div className="h-full w-full overflow-hidden">
                    <img
                        ref={imageRef}
                        src={event.image || '/images/crisis.svg'}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-base via-base/60 to-transparent opacity-90" />

                {/* Hover gold wash */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-gradient-to-t from-gold/10 via-transparent to-transparent opacity-0 transition-opacity"
                />

                {/* Content */}
                <div className="absolute bottom-0 p-8 w-full">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-cream mb-2 leading-tight">
                        {event.title}
                    </h3>
                    <div className="h-[1px] w-10 bg-gold mb-3" />
                    <p className="text-xs font-body tracking-[0.2em] text-gold uppercase font-medium">
                        {event.tagline}
                    </p>

                    {/* Hover CTA */}
                    <div className="mt-5 opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500 flex items-center text-cream-muted text-xs font-body tracking-[0.15em] uppercase">
                        <span>Explore</span>
                        <svg className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </TransitionLink>
    )
}
