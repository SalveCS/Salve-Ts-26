import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { X, Download, Smartphone } from 'lucide-react'
import { usePWA } from '../hooks/usePWA'

const PWAInstallPrompt = () => {
  const { isInstallable, installApp } = usePWA()
  const [isVisible, setIsVisible] = useState(true)
  const [isInstalling, setIsInstalling] = useState(false)

  const handleInstall = async () => {
    setIsInstalling(true)
    const success = await installApp()
    setIsInstalling(false)
    
    if (success) {
      setIsVisible(false)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    // Store dismissal in localStorage to avoid showing again for a while
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString())
  }

  // Check if user has dismissed the prompt recently
  const dismissedTime = localStorage.getItem('pwa-prompt-dismissed')
  const shouldShow = !dismissedTime || (Date.now() - parseInt(dismissedTime)) > 7 * 24 * 60 * 60 * 1000 // 7 days

  if (!isInstallable || !isVisible || !shouldShow) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-50"></div>
          
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={16} className="text-gray-500" />
          </button>

          {/* Content */}
          <div className="relative">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-3">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Instalar SALVE</h3>
                <p className="text-sm text-gray-600">Acesso rápido e offline</p>
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-4">
              Instale nosso app para ter acesso rápido e funcionalidades offline.
            </p>

            <div className="flex gap-2">
              <Button
                onClick={handleInstall}
                disabled={isInstalling}
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
                size="sm"
              >
                {isInstalling ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Download size={16} className="mr-2" />
                )}
                {isInstalling ? 'Instalando...' : 'Instalar'}
              </Button>
              
              <Button
                onClick={handleDismiss}
                variant="outline"
                size="sm"
                className="px-4"
              >
                Agora não
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PWAInstallPrompt

