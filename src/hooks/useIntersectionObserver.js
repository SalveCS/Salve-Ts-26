import { useState, useEffect, useRef } from 'react'

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [hasIntersected, options])

  return [elementRef, isIntersecting, hasIntersected]
}

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / docHeight
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', updateScrollProgress)
    updateScrollProgress()

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return scrollProgress
}

export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0)
  const elementRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return
      
      const rect = elementRef.current.getBoundingClientRect()
      const scrolled = window.scrollY
      const rate = scrolled * -speed
      
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setOffset(rate)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return [elementRef, offset]
}

