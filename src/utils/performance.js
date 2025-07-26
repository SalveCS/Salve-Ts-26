// Performance utilities for the SALVE website

// Preload critical resources
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Preload multiple images
export const preloadImages = (sources) => {
  return Promise.all(sources.map(preloadImage))
}

// Debounce function for scroll events
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Check if device supports WebP
export const supportsWebP = () => {
  return new Promise((resolve) => {
    const webP = new Image()
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2)
    }
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  })
}

// Get optimal image format
export const getOptimalImageSrc = async (src) => {
  const isWebPSupported = await supportsWebP()
  if (isWebPSupported && src.includes('.jpg')) {
    return src.replace('.jpg', '.webp')
  }
  if (isWebPSupported && src.includes('.png')) {
    return src.replace('.png', '.webp')
  }
  return src
}

// Lazy load component with intersection observer
export const createLazyLoader = (threshold = 0.1, rootMargin = '50px') => {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        const src = img.dataset.src
        if (src) {
          img.src = src
          img.classList.remove('lazy')
          img.classList.add('loaded')
        }
      }
    })
  }, {
    threshold,
    rootMargin
  })
}

// Performance monitoring
export const measurePerformance = (name, fn) => {
  return async (...args) => {
    const start = performance.now()
    const result = await fn(...args)
    const end = performance.now()
    console.log(`${name} took ${end - start} milliseconds`)
    return result
  }
}

// Critical resource hints
export const addResourceHints = () => {
  const head = document.head

  // DNS prefetch for external domains
  const dnsPrefetch = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ]

  dnsPrefetch.forEach(domain => {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = domain
    head.appendChild(link)
  })

  // Preconnect to critical origins
  const preconnect = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ]

  preconnect.forEach(origin => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = origin
    link.crossOrigin = 'anonymous'
    head.appendChild(link)
  })
}

// Image optimization
export const optimizeImage = (src, width, height, quality = 80) => {
  // This would typically integrate with an image optimization service
  // For now, we'll return the original src
  return src
}

// Viewport-based loading
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Memory usage monitoring
export const getMemoryUsage = () => {
  if ('memory' in performance) {
    return {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit
    }
  }
  return null
}

