// Google Analytics utilities for SALVE website

// Initialize Google Analytics
export const initGA = (measurementId) => {
  // Load gtag script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href
  })
}

// Track page views
export const trackPageView = (path, title) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
      page_title: title
    })
  }
}

// Track events
export const trackEvent = (action, category = 'engagement', label = '', value = 0) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    })
  }
}

// Track custom events for SALVE website
export const trackContactClick = (method) => {
  trackEvent('contact_click', 'contact', method)
}

export const trackServiceView = (serviceName) => {
  trackEvent('service_view', 'services', serviceName)
}

export const trackScrollDepth = (percentage) => {
  trackEvent('scroll_depth', 'engagement', `${percentage}%`, percentage)
}

export const trackButtonClick = (buttonName, location) => {
  trackEvent('button_click', 'interaction', `${buttonName}_${location}`)
}

export const trackSectionView = (sectionName) => {
  trackEvent('section_view', 'navigation', sectionName)
}

export const trackPWAInstall = () => {
  trackEvent('pwa_install', 'app', 'install_prompt_accepted')
}

export const trackPWAPromptShown = () => {
  trackEvent('pwa_prompt_shown', 'app', 'install_prompt_displayed')
}

// Enhanced ecommerce tracking (for future use)
export const trackFormSubmission = (formName, success = true) => {
  trackEvent('form_submission', 'forms', formName, success ? 1 : 0)
}

// User engagement tracking
export const trackTimeOnPage = () => {
  const startTime = Date.now()
  
  const handleBeforeUnload = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    trackEvent('time_on_page', 'engagement', window.location.pathname, timeSpent)
  }

  window.addEventListener('beforeunload', handleBeforeUnload)
  
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
  }
}

// Track scroll depth automatically
export const initScrollTracking = () => {
  let maxScroll = 0
  const milestones = [25, 50, 75, 90, 100]
  const tracked = new Set()

  const handleScroll = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = Math.round((scrollTop / docHeight) * 100)
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent
      
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone)
          trackScrollDepth(milestone)
        }
      })
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}

// Performance tracking
export const trackPerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0]
        
        if (perfData) {
          // Track page load time
          const loadTime = Math.round(perfData.loadEventEnd - perfData.fetchStart)
          trackEvent('page_load_time', 'performance', 'load_time', loadTime)
          
          // Track DOM content loaded time
          const domTime = Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart)
          trackEvent('dom_content_loaded', 'performance', 'dom_time', domTime)
          
          // Track first contentful paint (if available)
          const paintEntries = performance.getEntriesByType('paint')
          const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint')
          if (fcp) {
            trackEvent('first_contentful_paint', 'performance', 'fcp_time', Math.round(fcp.startTime))
          }
        }
      }, 0)
    })
  }
}

// Error tracking
export const trackError = (error, errorInfo = '') => {
  trackEvent('javascript_error', 'errors', error.message || 'Unknown error', 0)
  
  // Log to console for debugging
  console.error('Tracked error:', error, errorInfo)
}

// Initialize all tracking
export const initAllTracking = (measurementId) => {
  if (!measurementId) {
    console.warn('Google Analytics measurement ID not provided')
    return
  }

  initGA(measurementId)
  initScrollTracking()
  trackPerformance()
  trackTimeOnPage()
  
  // Track initial page view
  trackPageView(window.location.pathname, document.title)
}

