import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTransitionNavigate } from './PageTransition'

export default function LandingAnimation() {
    const navigate = useTransitionNavigate()
    const containerRef = useRef(null)
    const titleRef = useRef(null)
    const taglineRef = useRef(null)
    const infoRef = useRef(null)
    const btnRef = useRef(null)
    const mountainRef = useRef(null)
    const glowRef = useRef(null)

    useGSAP(() => {
        const tl = gsap.timeline()

        // Initial states
        gsap.set(containerRef.current, { opacity: 0 })
        gsap.set(titleRef.current, { y: 40, opacity: 0 })
        gsap.set(taglineRef.current, { y: 20, opacity: 0 })
        gsap.set(infoRef.current, { y: 15, opacity: 0 })
        gsap.set(btnRef.current, { y: 15, opacity: 0 })
        gsap.set(mountainRef.current, { opacity: 0, y: 30 })
        gsap.set(glowRef.current, { scale: 0.8, opacity: 0 })

        // Step 1 — Background + glow fade (0.5s)
        tl.to(containerRef.current, {
            opacity: 1, duration: 0.5, ease: 'power3.out'
        })
            .to(glowRef.current, {
                scale: 1, opacity: 1, duration: 0.6, ease: 'power3.out'
            }, '-=0.3')

            // Step 2 — Mountain silhouette rises (0.5s)
            .to(mountainRef.current, {
                y: 0, opacity: 1, duration: 0.5, ease: 'power3.out'
            }, '-=0.3')

            // Step 3 — Title reveal (0.5s)
            .to(titleRef.current, {
                y: 0, opacity: 1, duration: 0.5, ease: 'power3.out'
            }, '-=0.2')

            // Step 4 — Tagline (0.35s)
            .to(taglineRef.current, {
                y: 0, opacity: 1, duration: 0.35, ease: 'power3.out'
            }, '-=0.1')

            // Step 5 — Info row (0.3s)
            .to(infoRef.current, {
                y: 0, opacity: 1, duration: 0.3, ease: 'power3.out'
            }, '-=0.05')

            // Step 6 — CTA (0.3s)
            .to(btnRef.current, {
                y: 0, opacity: 1, duration: 0.3, ease: 'power3.out'
            }, '-=0.05')

    }, { scope: containerRef })

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden flex items-center justify-center will-animate"
            style={{
                background: 'linear-gradient(180deg, rgba(246,189,96,0.12) 0%, #1e2a38 30%, #0f172a 100%)'
            }}
        >
            {/* Golden-hour radial glow — the sunset through the boardroom window */}
            <div ref={glowRef} className="absolute inset-0 pointer-events-none will-animate">
                <div
                    className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(244, 162, 97, 0.2) 0%, rgba(246,189,96,0.08) 40%, transparent 70%)' }}
                />
                <div
                    className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[400px] h-[250px] rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(255, 220, 140, 0.15) 0%, transparent 70%)' }}
                />
            </div>

            {/* Mountain Silhouette — layered SVG at bottom */}
            <div ref={mountainRef} className="absolute bottom-0 left-0 w-full pointer-events-none will-animate">
                <svg viewBox="0 0 1440 320" className="w-full" preserveAspectRatio="none" style={{ height: '200px' }}>
                    {/* Back range — lighter */}
                    <path
                        d="M0,280 L120,220 L240,260 L360,180 L480,240 L600,140 L720,200 L840,120 L960,190 L1080,150 L1200,210 L1320,170 L1440,230 L1440,320 L0,320 Z"
                        fill="rgba(30, 42, 56, 0.6)"
                    />
                    {/* Mid range */}
                    <path
                        d="M0,300 L160,250 L320,280 L480,200 L640,260 L800,170 L960,230 L1120,190 L1280,250 L1440,220 L1440,320 L0,320 Z"
                        fill="rgba(20, 30, 45, 0.8)"
                    />
                    {/* Front range — darkest */}
                    <path
                        d="M0,310 L200,275 L400,295 L600,255 L800,290 L1000,260 L1200,285 L1440,270 L1440,320 L0,320 Z"
                        fill="#0f172a"
                    />
                    {/* Summit flag — tiny detail on the tallest peak */}
                    <line x1="840" y1="120" x2="840" y2="100" stroke="rgba(244, 162, 97, 0.6)" strokeWidth="1.5" />
                    <polygon points="840,100 855,107 840,112" fill="rgba(244, 162, 97, 0.5)" />
                </svg>
            </div>

            {/* Content */}
            <div className="z-10 flex flex-col items-center text-center px-6 -mt-8">

                <h1
                    ref={titleRef}
                    className="text-7xl md:text-9xl lg:text-[10rem] font-display font-bold tracking-[-0.05em] leading-[0.85] text-white will-animate"
                    style={{ textShadow: '0 0 80px rgba(244, 162, 97, 0.15)' }}
                >
                    E-SUMMIT
                </h1>

                <p
                    ref={taglineRef}
                    className="mt-5 text-accent-primary tracking-[0.35em] text-xs md:text-sm uppercase font-body font-medium will-animate"
                >
                    Where Vision Meets Victory
                </p>

                {/* Date | Venue | Time — inspired by the poster */}
                <div
                    ref={infoRef}
                    className="mt-6 flex items-center gap-4 text-text-muted font-body text-xs md:text-sm tracking-[0.15em] uppercase will-animate"
                >
                    <span className="text-text-secondary">Feb 2026</span>
                    <span className="text-accent-primary/40">|</span>
                    <span className="text-text-secondary">Nirma University</span>
                    <span className="text-accent-primary/40">|</span>
                    <span className="text-text-secondary">3 Days</span>
                </div>

                <button
                    ref={btnRef}
                    onClick={() => navigate('/home')}
                    className="mt-10 px-8 py-3.5 rounded-full font-display font-semibold text-sm tracking-[0.15em] uppercase cursor-pointer border border-accent-primary/30 bg-accent-primary/8 text-accent-primary hover:bg-accent-primary/15 hover:border-accent-primary/50 transition-all duration-300 will-animate"
                >
                    Enter Summit →
                </button>

                {/* e-cell branding — from the poster */}
                <p className="mt-16 text-[10px] tracking-[0.2em] text-text-muted/40 uppercase font-body">
                    e-cell · Nirma University
                </p>
            </div>
        </div>
    )
}