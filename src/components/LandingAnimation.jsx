import React, { useLayoutEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { useTransitionNavigate } from './PageTransition'

export default function LandingAnimation() {
    const navigate = useTransitionNavigate()
    const containerRef = useRef(null)
    const lineRef = useRef(null)
    const wordmarkRef = useRef(null)
    const taglineRef = useRef(null)
    const btnRef = useRef(null)
    const btnGlowRef = useRef(null)
    const particlesRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()

            gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center center' })
            gsap.set(wordmarkRef.current, { autoAlpha: 0, y: 30, filter: 'blur(12px)' })
            gsap.set(taglineRef.current, { autoAlpha: 0, y: 20 })
            gsap.set(btnRef.current, { autoAlpha: 0, y: 20 })
            gsap.set('.landing-particle', { autoAlpha: 0, scale: 0 })

            // Phase 1: The Line
            tl.to(lineRef.current, {
                scaleX: 1,
                duration: 1.2,
                ease: 'power3.inOut'
            })

                // Phase 2: Line fades, particles burst, wordmark appears
                .to(lineRef.current, {
                    autoAlpha: 0,
                    scaleX: 1.5,
                    duration: 0.6,
                    ease: 'power2.in'
                })
                .to('.landing-particle', {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: { amount: 0.4, from: 'random' },
                    ease: 'back.out(2)'
                }, '-=0.3')
                .to(wordmarkRef.current, {
                    autoAlpha: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1.2,
                    ease: 'expo.out'
                }, '-=0.5')

                // Phase 3: Tagline typewriter + button
                .to(taglineRef.current, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.3')
                .to(btnRef.current, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out'
                }, '-=0.3')

            // Continuous particle drift
            gsap.to('.landing-particle', {
                y: 'random(-30, 30)',
                x: 'random(-20, 20)',
                duration: 'random(4, 8)',
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                stagger: { amount: 3, from: 'random' }
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    const handleStart = useCallback(() => {
        navigate('/home')
    }, [navigate])

    const handleBtnMove = useCallback((e) => {
        if (!btnRef.current || !btnGlowRef.current) return
        const { clientX, clientY } = e
        const { left, top, width, height } = btnRef.current.getBoundingClientRect()
        const x = (clientX - left - width / 2) * 0.25
        const y = (clientY - top - height / 2) * 0.25

        gsap.to(btnRef.current, { x, y, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
        gsap.to(btnGlowRef.current, { x: x * 1.5, y: y * 1.5, opacity: 0.5, duration: 0.3, overwrite: 'auto' })
    }, [])

    const handleBtnLeave = useCallback(() => {
        if (!btnRef.current || !btnGlowRef.current) return
        gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' })
        gsap.to(btnGlowRef.current, { opacity: 0, duration: 0.5, overwrite: 'auto' })
    }, [])

    const particles = Array.from({ length: 14 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.5 + 0.2
    }))

    return (
        <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-base z-40">

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />

            {/* Floating particles */}
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-10">
                {particles.map(p => (
                    <div
                        key={p.id}
                        className="landing-particle absolute rounded-full bg-gold"
                        style={{
                            width: p.size + 'px',
                            height: p.size + 'px',
                            top: p.top + '%',
                            left: p.left + '%',
                            opacity: p.opacity
                        }}
                    />
                ))}
            </div>

            {/* The Golden Line */}
            <div
                ref={lineRef}
                className="absolute top-1/2 left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent"
            />

            {/* Content */}
            <div className="z-50 flex flex-col items-center text-center px-6">

                {/* Logo */}
                <div ref={wordmarkRef} className="mb-6 opacity-0">
                    <div className="relative flex items-center justify-center mb-8">
                        <div className="absolute w-28 h-28 md:w-36 md:h-36 bg-gold/10 rounded-full blur-[40px] animate-pulse-glow" />
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full glass-gold flex items-center justify-center glow-gold">
                            <img src="/logo/logo.png" alt="E-Summit" className="w-[65%] h-[65%] object-contain" />
                        </div>
                    </div>

                    <h1 className="text-7xl md:text-9xl font-display font-bold tracking-[-0.04em] leading-none text-gradient-gold text-glow">
                        E-SUMMIT
                    </h1>
                </div>

                {/* Tagline */}
                <p
                    ref={taglineRef}
                    className="text-lg md:text-xl text-cream-muted font-body tracking-[0.3em] uppercase opacity-0 mb-12"
                >
                    Where Vision Meets Victory
                </p>

                {/* CTA Button */}
                <div className="relative group" onMouseMove={handleBtnMove} onMouseLeave={handleBtnLeave}>
                    <div ref={btnGlowRef} className="absolute -inset-4 bg-gold/30 rounded-full blur-2xl opacity-0 pointer-events-none transition-opacity" />
                    <button
                        ref={btnRef}
                        onClick={handleStart}
                        className="relative px-10 py-4 rounded-full font-display font-semibold text-sm tracking-[0.2em] uppercase cursor-pointer opacity-0 overflow-hidden border border-gold/40 bg-gold/10 text-gold-light hover:bg-gold/20 transition-colors duration-300"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Enter Summit
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-base to-transparent pointer-events-none z-30" />
        </div>
    )
}