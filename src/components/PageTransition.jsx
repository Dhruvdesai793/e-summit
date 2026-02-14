import React, {
    createContext,
    useContext,
    useRef,
    useState,
    useEffect,
    forwardRef
} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'

const PageTransitionContext = createContext(null)

export function PageTransitionProvider({ children }) {
    const navigate = useNavigate()
    const location = useLocation()

    const overlayRef = useRef(null)
    const textRef = useRef(null)
    const tlRef = useRef(null)

    const [isAnimating, setIsAnimating] = useState(false)
    const [label, setLabel] = useState('')

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(overlayRef.current, {
                y: '100%',
                visibility: 'hidden'
            })

            gsap.set(textRef.current, {
                opacity: 0,
                y: 20
            })
        })

        return () => ctx.revert()
    }, [])

    const triggerTransition = (to) => {
        if (!to || location.pathname === to || isAnimating) return

        setIsAnimating(true)

        const routeLabel =
            to === '/'
                ? 'HOME'
                : to.replace('/', '').replace(/-/g, ' ').toUpperCase()

        setLabel(routeLabel)

        if (tlRef.current) tlRef.current.kill()

        tlRef.current = gsap.timeline({
            defaults: { ease: 'power4.inOut' },
            onComplete: () => {
                gsap.set(overlayRef.current, {
                    y: '100%',
                    visibility: 'hidden'
                })

                gsap.set(textRef.current, {
                    opacity: 0,
                    y: 20
                })

                setIsAnimating(false)
            }
        })

        tlRef.current
            .set(overlayRef.current, { visibility: 'visible' })

            .to(overlayRef.current, {
                y: '0%',
                duration: 0.7
            })

            .to(
                textRef.current,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4
                },
                '-=0.45'
            )

            .add(() => {
                window.scrollTo(0, 0)
                navigate(to)
            })

            .to(textRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.3
            })

            .to(overlayRef.current, {
                y: '-100%',
                duration: 0.7
            })
    }

    return (
        <PageTransitionContext.Provider value={{ triggerTransition }}>
            {children}

            <div className="fixed inset-0 z-[300] pointer-events-none overflow-hidden">
                <div
                    ref={overlayRef}
                    className="absolute inset-0 will-change-transform"
                    style={{
                        background:
                            'linear-gradient(0deg, #0a0f1c 0%, #1b263b 40%, #c44536 75%, #f4a261 100%)',
                        pointerEvents: isAnimating ? 'all' : 'none'
                    }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <h2
                        ref={textRef}
                        className="text-3xl md:text-5xl font-display font-bold tracking-[0.25em] text-accent-primary uppercase"
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

export const TransitionLink = forwardRef(function TransitionLink(
    { to, children, className, onClick },
    ref
) {
    const triggerTransition =
        useContext(PageTransitionContext)?.triggerTransition

    const handleClick = (e) => {
        e.preventDefault()
        onClick?.(e)
        triggerTransition?.(to)
    }

    return (
        <a ref={ref} href={to} onClick={handleClick} className={className}>
            {children}
        </a>
    )
})
