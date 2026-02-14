import React, { createContext, useContext, useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'

const PageTransitionContext = createContext(null)

export function PageTransitionProvider({ children }) {
    const navigate = useNavigate()
    const location = useLocation()

    const layer1Ref = useRef(null)
    const layer2Ref = useRef(null)
    const textRef = useRef(null)

    const [isAnimating, setIsAnimating] = useState(false)
    const [label, setLabel] = useState('E-SUMMIT')

    useEffect(() => {
        gsap.set([layer1Ref.current, layer2Ref.current], { yPercent: 100 })
        gsap.set(textRef.current, { opacity: 0, y: 20 })
    }, [])

    const getRouteLabel = (path) => {
        if (path === '/home') return 'EVENTS'
        if (path.startsWith('/events')) return 'ARENA'
        if (path === '/about') return 'ABOUT'
        if (path === '/contact') return 'CONTACT'
        return 'E-SUMMIT'
    }

    const triggerTransition = (to) => {
        if (location.pathname === to || isAnimating) return
        setIsAnimating(true)
        setLabel(getRouteLabel(to))

        const tl = gsap.timeline({
            defaults: { ease: 'power4.inOut' },
            onComplete: () => {
                gsap.set([layer1Ref.current, layer2Ref.current], { yPercent: 100 })
                gsap.set(textRef.current, { opacity: 0, y: 20 })
                setIsAnimating(false)
            }
        })

        tl.to(layer1Ref.current, { yPercent: 0, duration: 0.6 })
            .to(layer2Ref.current, { yPercent: 0, duration: 0.7 }, '-=0.4')
            .to(textRef.current, { opacity: 1, y: 0, duration: 0.3 }, '-=0.2')
            .add(() => navigate(to))
            .to(textRef.current, { opacity: 0, y: -20, duration: 0.25 })
            .to([layer2Ref.current, layer1Ref.current], {
                yPercent: -100,
                duration: 0.7,
                stagger: 0.05,
                delay: 0.05
            })
    }

    return (
        <PageTransitionContext.Provider value={{ triggerTransition }}>
            {children}

            <div className="fixed inset-0 z-[300] pointer-events-none overflow-hidden">
                <div ref={layer1Ref} className="absolute inset-0 bg-base" />
                <div ref={layer2Ref} className="absolute inset-0 bg-surface" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <h2
                        ref={textRef}
                        className="text-2xl md:text-4xl font-display font-bold tracking-[0.3em] text-gold uppercase text-glow"
                    >
                        {label}
                    </h2>
                </div>
            </div>
        </PageTransitionContext.Provider>
    )
}

export function useTransitionNavigate() {
    return useContext(PageTransitionContext)?.triggerTransition
}

export function TransitionLink({ to, children, className, onClick }) {
    const triggerTransition = useContext(PageTransitionContext)?.triggerTransition

    const handleClick = (e) => {
        e.preventDefault()
        onClick?.(e)
        triggerTransition?.(to)
    }

    return (
        <a href={to} onClick={handleClick} className={className}>
            {children}
        </a>
    )
}
