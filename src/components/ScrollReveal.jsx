import { motion } from 'framer-motion'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  distance = 60,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
  ...props 
}) => {
  const [ref, isIntersecting, hasIntersected] = useIntersectionObserver({
    threshold,
    rootMargin: '50px'
  })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance }
      case 'down':
        return { opacity: 0, y: -distance }
      case 'left':
        return { opacity: 0, x: distance }
      case 'right':
        return { opacity: 0, x: -distance }
      case 'scale':
        return { opacity: 0, scale: 0.8 }
      case 'fade':
        return { opacity: 0 }
      default:
        return { opacity: 0, y: distance }
    }
  }

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 }
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 }
      case 'scale':
        return { opacity: 1, scale: 1 }
      case 'fade':
        return { opacity: 1 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  const shouldAnimate = triggerOnce ? hasIntersected : isIntersecting

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={shouldAnimate ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal

