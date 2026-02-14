import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { TransitionLink } from './PageTransition'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const navRef = useRef(null)
    const pillRef = useRef(null)
    const linksRef = useRef([])
    const location = useLocation()

    // Bug Fix: hide navbar on landing page
    const isLanding = location.pathname === '/'

    const navLinks = useMemo(() => [
        { name: 'Events', path: '/home' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ], [])

    // Slide in from top
    useGSAP(() => {
        if (isLanding) return
        gsap.from(navRef.current, {
            y: -40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.3
        })
    }, { scope: navRef, dependencies: [isLanding] })

    // Scroll effect — rAF
    useEffect(() => {
        if (isLanding) return
        let ticking = false
        const handleScroll = () => {
            if (ticking) return
            ticking = true
            requestAnimationFrame(() => {
                setScrolled(window.scrollY > 30)
                ticking = false
            })
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isLanding])

    // Body scroll lock
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    // Mobile stagger
    useEffect(() => {
        if (isOpen && linksRef.current.length) {
            gsap.from(linksRef.current.filter(Boolean), {
                y: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power3.out',
                delay: 0.1
            })
        }
    }, [isOpen])

    const toggleMenu = useCallback(() => setIsOpen(prev => !prev), [])

    // Don't render on landing page
    if (isLanding) return null

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 flex items-center justify-center will-animate"
                style={{ height: '76px' }}
            >
                <div
                    ref={pillRef}
                    className="flex items-center justify-between w-full max-w-5xl px-6 py-3 rounded-full transition-all duration-300"
                    style={{
                        background: scrolled ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.04)',
                        backdropFilter: scrolled ? 'blur(24px)' : 'blur(8px)',
                        border: `1px solid ${scrolled ? 'rgba(244, 162, 97, 0.15)' : 'rgba(255, 255, 255, 0.06)'}`,
                    }}
                >
                    {/* Logo */}
                    <TransitionLink to="/" className="relative group">
                        <span className="text-lg md:text-xl font-display font-bold tracking-[-0.02em] text-white group-hover:text-accent-primary transition-colors duration-300">
                            E-SUMMIT
                        </span>
                    </TransitionLink>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link, i) => {
                            const isActive = location.pathname === link.path
                            return (
                                <TransitionLink
                                    key={i}
                                    to={link.path}
                                    className="relative px-4 py-2"
                                >
                                    <span className={`text-[11px] font-body font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${isActive ? 'text-accent-primary' : 'text-text-muted hover:text-white'
                                        }`}>
                                        {link.name}
                                    </span>
                                    {isActive && (
                                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-primary" />
                                    )}
                                </TransitionLink>
                            )
                        })}
                    </div>

                    {/* Hamburger */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden flex flex-col gap-[5px] p-2 z-50 cursor-pointer"
                        aria-label="Toggle Menu"
                    >
                        <div className={`h-[1px] w-5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                        <div className={`h-[1px] w-5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
                        <div className={`h-[1px] w-5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[45] flex flex-col items-center justify-center gap-10"
                    style={{ background: 'linear-gradient(180deg, #1e2a38 0%, #0f172a 100%)' }}
                >
                    {navLinks.map((link, i) => (
                        <TransitionLink
                            key={i}
                            to={link.path}
                            ref={(el) => (linksRef.current[i] = el)}
                            onClick={() => setIsOpen(false)}
                            className={`text-4xl font-display font-bold tracking-tight transition-colors duration-300 ${location.pathname === link.path ? 'text-accent-primary' : 'text-white/20 hover:text-white'
                                }`}
                        >
                            {link.name}
                        </TransitionLink>
                    ))}
                </div>
            )}
        </>
    )
}