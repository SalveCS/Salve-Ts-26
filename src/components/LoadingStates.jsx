import { useState } from 'react'
import { motion } from 'framer-motion'

// Generic skeleton loader
export const Skeleton = ({ className = '', width = '100%', height = '1rem', ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{ width, height }}
      {...props}
    />
  )
}

// Card skeleton
export const CardSkeleton = ({ className = '' }) => {
  return (
    <div className={`p-6 rounded-2xl bg-white shadow-lg ${className}`}>
      <div className="flex flex-col items-center text-center">
        <Skeleton className="w-20 h-20 rounded-2xl mb-6" />
        <Skeleton className="w-32 h-6 mb-4" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-3/4 h-4 mb-2" />
        <Skeleton className="w-1/2 h-4" />
      </div>
    </div>
  )
}

// Image skeleton
export const ImageSkeleton = ({ className = '', aspectRatio = 'aspect-video' }) => {
  return (
    <div className={`${aspectRatio} ${className} relative overflow-hidden bg-gray-200 rounded-2xl`}>
      <div className="absolute inset-0 shimmer"></div>
    </div>
  )
}

// Text skeleton
export const TextSkeleton = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-4"
          width={index === lines - 1 ? '75%' : '100%'}
        />
      ))}
    </div>
  )
}

// Hero section skeleton
export const HeroSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-4xl mx-auto px-4">
        <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
        <Skeleton className="h-8 w-1/2 mx-auto mb-8" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-12 w-48" />
        </div>
      </div>
    </div>
  )
}

// Section skeleton
export const SectionSkeleton = ({ hasImage = false, imagePosition = 'left' }) => {
  return (
    <div className="section-padding bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Skeleton className="h-6 w-32 mx-auto mb-4" />
          <Skeleton className="h-12 w-2/3 mx-auto mb-6" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </div>

        {/* Content */}
        {hasImage ? (
          <div className={`grid md:grid-cols-2 gap-12 items-center ${
            imagePosition === 'right' ? 'md:grid-flow-col-dense' : ''
          }`}>
            <div className={imagePosition === 'right' ? 'md:col-start-2' : ''}>
              <ImageSkeleton className="h-80" />
            </div>
            <div className="space-y-6">
              <TextSkeleton lines={4} />
              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-28" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Loading spinner
export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="loading-spinner w-full h-full"></div>
    </div>
  )
}

// Page loading overlay
export const PageLoader = ({ isLoading, children }) => {
  if (!isLoading) return children

  return (
    <div className="min-h-screen bg-background">
      <HeroSkeleton />
      <SectionSkeleton hasImage={true} />
      <SectionSkeleton />
      <SectionSkeleton hasImage={true} imagePosition="right" />
    </div>
  )
}

// Button loading state
export const LoadingButton = ({ 
  isLoading, 
  children, 
  loadingText = 'Carregando...', 
  className = '',
  ...props 
}) => {
  return (
    <button
      className={`relative ${className} ${isLoading ? 'cursor-not-allowed opacity-75' : ''}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" className="mr-2" />
          {loadingText}
        </div>
      )}
      <div className={isLoading ? 'invisible' : 'visible'}>
        {children}
      </div>
    </button>
  )
}

// Fade in animation wrapper
export const FadeInLoader = ({ isLoading, children, fallback = null }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 0.3 }}
    >
      {isLoading ? fallback : children}
    </motion.div>
  )
}

// Progressive image loader
export const ProgressiveImage = ({ 
  src, 
  placeholder, 
  alt, 
  className = '',
  onLoad,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
  }

  return (
    <div className={`relative overflow-hidden ${className}`} {...props}>
      {/* Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <LoadingSpinner size="md" />
        </div>
      )}

      {/* Actual image */}
      <motion.img
        src={hasError ? placeholder : src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.1
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
    </div>
  )
}

