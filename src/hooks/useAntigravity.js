import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function useFloat(ref, options = {}) {
    const { y = 8, duration = 3, ease = 'sine.inOut' } = options

    useGSAP(() => {
        if (!ref.current) return
        gsap.to(ref.current, {
            y,
            duration,
            yoyo: true,
            repeat: -1,
            ease,
        })
    }, { scope: ref })
}

export function useMagnetic(ref, options = {}) {
    const { strength = 0.3, snapEase = 'power2.out' } = options

    const onMouseMove = useCallback((e) => {
        if (!ref.current) return
        const { clientX, clientY } = e
        const { left, top, width, height } = ref.current.getBoundingClientRect()
        const x = (clientX - left - width / 2) * strength
        const y = (clientY - top - height / 2) * strength

        gsap.to(ref.current, {
            x, y,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
        })
    }, [ref, strength])

    const onMouseLeave = useCallback(() => {
        if (!ref.current) return
        gsap.to(ref.current, {
            x: 0, y: 0,
            duration: 0.5,
            ease: snapEase,
            overwrite: 'auto'
        })
    }, [ref, snapEase])

    return { onMouseMove, onMouseLeave }
}
