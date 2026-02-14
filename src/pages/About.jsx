import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
    { value: '500+', label: 'Participants' },
    { value: '6', label: 'Events' },
    { value: '3', label: 'Days' },
    { value: '₹2L+', label: 'Prize Pool' },
]

const team = [
    { name: 'Arjun Patel', role: 'President', initials: 'AP' },
    { name: 'Riya Sharma', role: 'Vice President', initials: 'RS' },
    { name: 'Karan Mehta', role: 'Tech Lead', initials: 'KM' },
    { name: 'Priya Desai', role: 'Creative Director', initials: 'PD' },
    { name: 'Vikram Singh', role: 'Events Head', initials: 'VS' },
    { name: 'Ananya Iyer', role: 'Marketing Lead', initials: 'AI' },
]

export default function About() {
    const containerRef = useRef(null)
    const heroRef = useRef(null)
    const missionRef = useRef(null)
    const statsRef = useRef(null)
    const teamRef = useRef(null)

    useLayoutEffect(() => {
        window.scrollTo(0, 0)

        const ctx = gsap.context(() => {
            // Hero
            gsap.from(heroRef.current.querySelectorAll('.about-hero-anim'), {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power4.out'
            })

            // Mission
            gsap.from(missionRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: missionRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            })

            // Stats
            gsap.from(statsRef.current.querySelectorAll('.stat-item'), {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            })

            // Team cards
            gsap.from(teamRef.current.querySelectorAll('.team-card'), {
                y: 50,
                opacity: 0,
                scale: 0.95,
                duration: 0.8,
                stagger: 0.08,
                scrollTrigger: {
                    trigger: teamRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="min-h-screen bg-base text-cream relative overflow-hidden">

            {/* Ambient */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-gold/6 blur-[180px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[35%] h-[35%] bg-surface-light blur-[140px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24">

                {/* Hero */}
                <div ref={heroRef} className="mb-24">
                    <div className="about-hero-anim inline-block px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold font-body text-xs tracking-[0.2em] uppercase mb-8">
                        About Us
                    </div>
                    <h1 className="about-hero-anim text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-[-0.04em] leading-[0.95] text-gradient-white mb-6">
                        The Summit<br />Experience
                    </h1>
                    <p className="about-hero-anim text-lg md:text-xl text-cream-muted font-body leading-relaxed max-w-2xl">
                        E-Summit is the flagship entrepreneurship event that brings together the brightest minds, fiercest competitors, and most innovative thinkers under one roof.
                    </p>
                </div>

                {/* Mission */}
                <div ref={missionRef} className="mb-28 glass rounded-2xl p-10 md:p-14">
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-cream mb-6 flex items-center">
                        <span className="w-10 h-[1px] bg-gold mr-4" />
                        Our Mission
                    </h2>
                    <p className="text-base md:text-lg text-cream-muted/80 font-body leading-[1.8]">
                        We believe entrepreneurship is not just about starting companies — it's a mindset. E-Summit exists to ignite that spark in every student. Through high-stakes competitions, expert-led sessions, and immersive experiences, we create an environment where ideas transform into action. Our mission is to bridge the gap between academic knowledge and real-world business acumen, empowering the next generation of leaders, innovators, and disruptors.
                    </p>
                </div>

                {/* Stats */}
                <div ref={statsRef} className="mb-28">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <div key={i} className="stat-item text-center p-8 glass rounded-xl">
                                <div className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-xs font-body tracking-[0.2em] text-cream-muted uppercase">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team */}
                <div ref={teamRef}>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-cream mb-10 flex items-center">
                        <span className="w-10 h-[1px] bg-gold mr-4" />
                        The Core Team
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {team.map((member, i) => (
                            <div key={i} className="team-card glass rounded-xl p-8 group hover:glass-gold transition-all duration-500">
                                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 group-hover:glow-gold transition-shadow duration-500">
                                    <span className="text-lg font-display font-bold text-gold">
                                        {member.initials}
                                    </span>
                                </div>
                                <h3 className="text-lg font-display font-semibold text-cream mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-xs font-body tracking-[0.15em] text-cream-muted uppercase">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-28 text-center">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold/30 to-transparent mx-auto mb-4" />
                    <p className="text-xs font-body tracking-[0.3em] text-cream-muted/40 uppercase">
                        Built with passion · E-Summit 2026
                    </p>
                </div>
            </div>
        </div>
    )
}
