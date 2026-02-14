import React, { useRef } from 'react'
import { TransitionLink } from './PageTransition'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function EventCard({ event }) {
    const cardRef = useRef(null)
    const imageRef = useRef(null)

    const { contextSafe } = useGSAP({ scope: cardRef })

    const onHover = contextSafe(() => {
        gsap.to(cardRef.current, {
            y: -6,
            scale: 1.01,
            duration: 0.4,
            ease: 'power3.out'
        })
        gsap.to(imageRef.current, { scale: 1.05, duration: 0.5, ease: 'power3.out' })
    })

    const onLeave = contextSafe(() => {
        gsap.to(cardRef.current, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power3.out'
        })
        gsap.to(imageRef.current, { scale: 1, duration: 0.5, ease: 'power3.out' })
    })

    return (
        <TransitionLink to={`/events/${event.slug}`}>
            <div
                ref={cardRef}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
                className="relative overflow-hidden rounded-2xl cursor-pointer h-[420px] bg-surface border border-white/6 will-animate group"
            >
                {/* Image */}
                <div className="h-full w-full overflow-hidden">
                    <img
                        ref={imageRef}
                        src={event.image || '/images/crisis.svg'}
                        alt={event.title}
                        className="w-full h-full object-cover will-animate"
                        loading="lazy"
                    />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent opacity-90" />

                {/* Content */}
                <div className="absolute bottom-0 p-8 w-full">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-tight">
                        {event.title}
                    </h3>
                    <div className="h-[1px] w-10 bg-accent-primary/60 mb-3" />
                    <p className="text-xs font-body tracking-[0.15em] text-accent-primary uppercase font-medium">
                        {event.tagline}
                    </p>

                    <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-400 flex items-center text-text-muted text-xs font-body tracking-[0.12em] uppercase">
                        <span>Explore</span>
                        <span className="ml-2">→</span>
                    </div>
                </div>
            </div>
        </TransitionLink>
    )
}
