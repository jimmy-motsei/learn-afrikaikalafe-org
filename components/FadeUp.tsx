'use client'

// ============================================================
// components/FadeUp.tsx
// Afrika Ikalafe — Scroll-triggered fade-up wrapper
// Uses IntersectionObserver — zero external dependencies
// ============================================================

import { useEffect, useRef, ReactNode } from 'react'

interface FadeUpProps {
  children:   ReactNode
  delay?:     number    // ms — for staggered groups
  className?: string
}

export function FadeUp({ children, delay = 0, className = '' }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion at the JS level too
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      el.classList.add('fade-up--visible')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('fade-up--visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`fade-up ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
