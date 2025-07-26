import { motion } from 'framer-motion'
import { useParallax } from '../hooks/useIntersectionObserver'

const ParallaxSection = ({ 
  children, 
  speed = 0.5, 
  className = '',
  backgroundImage,
  overlay = true,
  overlayOpacity = 0.6,
  ...props 
}) => {
  const [parallaxRef, parallaxOffset] = useParallax(speed)

  return (
    <section className={`relative overflow-hidden ${className}`} {...props}>
      {/* Parallax Background */}
      {backgroundImage && (
        <div
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: `translateY(${parallaxOffset}px)`,
            height: '120%', // Extend height to prevent gaps during parallax
            top: '-10%'
          }}
        />
      )}

      {/* Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}

export default ParallaxSection

