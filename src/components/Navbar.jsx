import React, { useState, useLayoutEffect, useRef, useEffect, useMemo, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { TransitionLink } from './PageTransition'
import gsap from 'gsap'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const navRef = useRef(null)
    const linksRef = useRef([])
    const logoRef = useRef(null)
    const location = useLocation()

    const navLinks = useMemo(() => [
        { name: 'Events', path: '/home' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ], [])

    // Entry animation
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(navRef.current, {
                yPercent: -100,
                autoAlpha: 0,
                duration: 1,
                ease: 'expo.out',
                delay: 0.3
            })
        })
        return () => ctx.revert()
    }, [])

    // Scroll-based glass effect
    useEffect(() => {
        let ticking = false
        const handleScroll = () => {
            if (ticking) return
            ticking = true
            requestAnimationFrame(() => {
                const isScrolled = window.scrollY > 30
                if (navRef.current) {
                    navRef.current.style.backgroundColor = isScrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent'
                    navRef.current.style.backdropFilter = isScrolled ? 'blur(20px)' : 'blur(0px)'
                    navRef.current.style.borderBottomColor = isScrolled ? 'rgba(212, 168, 83, 0.1)' : 'transparent'
                }
                ticking = false
            })
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Mobile menu body scroll lock
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    // Mobile link stagger animation
    useEffect(() => {
        if (isOpen && linksRef.current.length) {
            gsap.from(linksRef.current.filter(Boolean), {
                y: 40,
                autoAlpha: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                delay: 0.1
            })
        }
    }, [isOpen])

    const toggleMenu = useCallback(() => setIsOpen(prev => !prev), [])

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 flex items-center justify-between transition-colors duration-300 border-b border-transparent"
                style={{ height: '80px' }}
            >
                {/* Logo */}
                <TransitionLink to="/" className="relative group">
                    <div
                        ref={logoRef}
                        className="text-xl md:text-2xl font-display font-bold tracking-[-0.03em] text-gold transition-all duration-300 group-hover:text-gold-light"
                    >
                        E-SUMMIT
                        <span className="block h-[1px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                    </div>
                </TransitionLink>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link, i) => {
                        const isActive = location.pathname === link.path
                        return (
                            <TransitionLink
                                key={i}
                                to={link.path}
                                className="relative px-5 py-2 group"
                            >
                                <span className={`text-[11px] font-body font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${isActive ? 'text-gold' : 'text-cream-muted hover:text-cream'
                                    }`}>
                                    {link.name}
                                </span>
                                {isActive && (
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
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
                    <div className={`h-[1px] w-6 bg-cream transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                    <div className={`h-[1px] w-6 bg-cream transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
                    <div className={`h-[1px] w-6 bg-cream transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
                </button>
            </nav>

            {/* Mobile Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-base/98 z-[45] flex flex-col items-center justify-center gap-10">
                    {navLinks.map((link, i) => (
                        <TransitionLink
                            key={i}
                            to={link.path}
                            ref={(el) => (linksRef.current[i] = el)}
                            onClick={() => setIsOpen(false)}
                            className={`text-4xl font-display font-bold tracking-tight transition-colors duration-300 ${location.pathname === link.path ? 'text-gold' : 'text-cream/30 hover:text-cream'
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