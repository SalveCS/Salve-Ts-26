import './App.css'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Leaf, Users, Target, Mail, Phone, Instagram, ChevronDown, Menu, X } from 'lucide-react'
import LazyImage from './components/LazyImage'
import ScrollReveal from './components/ScrollReveal'
import ParallaxSection from './components/ParallaxSection'
import PWAInstallPrompt from './components/PWAInstallPrompt'
import { useScrollProgress, useParallax } from './hooks/useIntersectionObserver'
import { useServiceWorker } from './hooks/usePWA'
import { preloadImages, addResourceHints } from './utils/performance'
import { initAllTracking, trackButtonClick, trackContactClick, trackSectionView } from './utils/analytics'

// Import images
import logoSalveBranco from './assets/images/logo_salve_branco.png'
import heroImage from './assets/images/hero_dark_leaves.jpg'
import sustainabilityImage1 from './assets/images/s_170525.png'
import sustainabilityImage2 from './assets/images/s_240525.png'
import sustainabilityImage3 from './assets/images/s_290525.png'
import carbonoLogo from './assets/images/carbono_neutro_logo_f.png'
import florestaSustentavel from './assets/Ima_S6.jpg'
import teamImage from './assets/images/team-communication.jpg'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const scrollProgress = useScrollProgress()
  const [parallaxRef, parallaxOffset] = useParallax(0.5)
  const { isRegistered } = useServiceWorker()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    
    // Add resource hints for performance
    addResourceHints()
    
    // Initialize analytics (replace with actual GA measurement ID)
    // initAllTracking('G-XXXXXXXXXX')
    
    // Preload critical images
    const criticalImages = [
      logoSalveBranco,
      heroImage,
      teamImage
    ]
    
    preloadImages(criticalImages).catch(console.error)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollProgress }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress }}
        transition={{ duration: 0.1 }}
      />
      
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-background/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={logoSalveBranco} 
                alt="SALVE" 
                className="h-8 md:h-10 w-auto"
              />
            </motion.div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-2">
              {[
                { name: 'Início', id: 'inicio' },
                { name: 'Sobre', id: 'sobre' },
                { name: 'Serviços', id: 'services' },
                { name: 'Sustentabilidade', id: 'sustentabilidade' },
                { name: 'Carbono Zero', id: 'carbono-zero' },
                { name: 'Contato', id: 'contact' }
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={`#${item.id}`}
                  className="nav-link text-foreground hover:text-primary transition-colors duration-300 font-medium relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(item.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav
              className="md:hidden mt-4 pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {[
                { name: 'Início', id: 'inicio' },
                { name: 'Sobre', id: 'sobre' },
                { name: 'Serviços', id: 'services' },
                { name: 'Sustentabilidade', id: 'sustentabilidade' },
                { name: 'Carbono Zero', id: 'carbono-zero' },
                { name: 'Contato', id: 'contact' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  className="block py-2 text-foreground hover:text-primary transition-colors duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    const element = document.getElementById(item.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  {item.name}
                </a>
              ))}
            </motion.nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          ref={parallaxRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: `translateY(${parallaxOffset}px)`
          }}
        ></div>
        
        {/* Dark Overlay for Better Contrast */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-primary/20"></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1
            className="hero-title text-white mb-6 text-center drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Comunicação que <br />
            <span className="text-gradient bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent drop-shadow-lg">transforma</span>
          </motion.h1>     
          <motion.p
            className="text-xl md:text-2xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A união entre qualidade e inovação
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="btn-premium magnetic text-white font-semibold px-8 py-3 min-w-[180px] relative overflow-hidden"
                onClick={() => {
                  trackButtonClick('nossos_servicos', 'hero')
                  const element = document.getElementById('services');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Nossos Serviços
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-primary font-semibold px-8 py-3 min-w-[180px] transition-all duration-300"
                onClick={() => {
                  trackButtonClick('fale_conosco', 'hero')
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Fale Conosco
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="sobre" className="section-padding bg-background">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary">Quem Somos</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Onde propósito <span className="text-gradient">encontra ação</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Somos uma empresa de comunicação comprometida com o futuro. 
                Todo trabalho que realizamos para nossos clientes é revertido em compensação de carbono, 
                plantando árvores e contribuindo para um futuro mais verde.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left" delay={0.4}>
              <LazyImage
                src={teamImage}
                alt="Equipe SALVE"
                className="rounded-2xl shadow-2xl hover-lift image-hover h-80"
              />
            </ScrollReveal>

            <div className="space-y-6">
              <ScrollReveal direction="right" delay={0.6}>
                <p className="text-lg text-muted-foreground">
                  Nosso propósito é utilizar a comunicação e o marketing de forma consciente e responsável, 
                  promovendo um mundo mais equilibrado, onde as pessoas e o planeta possam prosperar juntos.
                </p>
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={0.8}>
                <p className="text-lg text-muted-foreground">
                  Desenvolvemos soluções de comunicação e marketing que sejam conscientes, criativas e inovadoras, 
                  visando o bem-estar das pessoas e do planeta. Com mais de 20 anos de experiência no mercado.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={1.0}>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary">Comunicação Sustentável</Badge>
                  <Badge variant="secondary">Compensação de Carbono</Badge>
                  <Badge variant="secondary">Responsabilidade Social</Badge>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-secondary/20 text-secondary-foreground">Nossos Serviços</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                O que <span className="text-gradient">oferecemos</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="w-12 h-12 text-primary" />,
                title: "Marketing Consciente",
                description: "Estratégias de marketing que respeitam o meio ambiente e promovem práticas responsáveis."
              },
              {
                icon: <Users className="w-12 h-12 text-primary" />,
                title: "Comunicação Corporativa",
                description: "Desenvolvemos a comunicação interna e externa da sua empresa com foco em responsabilidade social."
              },
              {
                icon: <Target className="w-12 h-12 text-primary" />,
                title: "Branding Verde",
                description: "Construção de marca com valores ambientais e sociais que conectam com o público consciente."
              }
            ].map((service, index) => (
              <ScrollReveal 
                key={index}
                direction="up" 
                delay={0.4 + (index * 0.2)}
              >
                <motion.div
                  className="premium-card card-hover p-8 rounded-3xl"
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="text-center">
                    <motion.div 
                      className="icon-container w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                      whileHover={{ 
                        rotate: 360,
                        transition: { duration: 0.6 }
                      }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustentabilidade" className="section-padding bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="mb-4 bg-primary/10 text-primary">Sustentabilidade</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  A beleza da <span className="text-gradient">natureza</span>
                </h2>
              </motion.div>
              
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">
                Todo trabalho que realizamos para nossos clientes é revertido em compensação de carbono. 
                Cada projeto gera o plantio de árvores, contribuindo para a neutralização das emissões 
                e para um futuro mais verde.
              </motion.p>
              
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground">
                Investimos em projetos de reflorestamento, proteção de florestas existentes e apoio 
                a iniciativas de energia limpa, alcançando assim a neutralização de carbono.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <LazyImage
                src={sustainabilityImage1}
                alt="Práticas Sustentáveis"
                className="rounded-2xl shadow-2xl hover-lift image-hover h-80"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Carbono Zero Section */}
      <ParallaxSection 
        id="carbono-zero" 
        className="section-padding"
        backgroundImage={sustainabilityImage2}
        overlay={true}
        overlayOpacity={0.8}
        speed={0.3}
      >
        <div className="container mx-auto max-w-6xl text-white">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-100/20 text-green-100 border-green-100/30">Carbono Zero</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Nosso compromisso com o <span className="text-gradient">planeta</span>
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Cada projeto que desenvolvemos contribui para um futuro mais consciente. 
                Nosso trabalho gera impacto positivo real no meio ambiente.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left" delay={0.4}>
              <LazyImage
                src={florestaSustentavel}
                alt="Floresta Sustentável"
                className="w-full h-80 rounded-lg shadow-lg"
              />
            </ScrollReveal>

            <div className="space-y-8">
              <ScrollReveal direction="right" delay={0.6}>
                <div className="text-center">
                  <motion.div
                    className="text-6xl md:text-8xl font-bold text-green-400 mb-4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    + de 400
                  </motion.div>
                  <p className="text-2xl font-semibold text-gray-200">
                    Árvores plantadas
                  </p>
                  <p className="text-lg text-gray-300 mt-2">
                    como resultado do nosso trabalho
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.8}>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                  <div className="flex items-center mb-6">
                    <img
                      src={carbonoLogo}
                      alt="Carbono Zero Logo"
                      className="h-16 w-auto mr-4"
                    />
                    <h3 className="text-xl font-bold text-white">Certificação Carbono Zero</h3>
                  </div>
                  <p className="text-gray-200">
                    Nossos projetos de comunicação são desenvolvidos com práticas conscientes, 
                    contribuindo para a neutralização de carbono e o plantio de árvores nativas.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-secondary/20 text-secondary-foreground">Contato</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Vamos <span className="text-gradient">conversar</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Pronto para transformar sua comunicação? Entre em contato conosco.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Mail className="w-8 h-8 text-primary" />,
                title: "Email",
                content: "",
                link: "mailto:salvempresa@gmail.com"
              },
              {
                icon: <Phone className="w-8 h-8 text-primary" />,
                title: "WhatsApp",
                content: "",
                link: "https://api.whatsapp.com/send/?phone=5511979757763&text=Olá! Gostaria de mais informações sobre os serviços da SALVE.&type=phone_number&app_absent=0"
              },
              {
                icon: <Instagram className="w-8 h-8 text-primary" />,
                title: "Instagram",
                content: "",
                link: "https://www.instagram.com/salve_cs/"
              }
            ].map((contact, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <a
                  href={contact.link}
                  target={contact.title === "Email" ? "_self" : "_blank"}
                  rel={contact.title !== "Email" ? "noopener noreferrer" : undefined}
                  className="contact-card block p-8 rounded-3xl premium-shadow group"
                  onClick={() => trackContactClick(contact.title.toLowerCase())}
                >
                  <div className="text-center">
                    <div className="icon-container w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {contact.icon}
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* Footer */}
      <footer className="bg-green-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <img 
              src={logoSalveBranco} 
              alt="SALVE" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-lg opacity-90 mb-6">Comunicação Sustentável</p>
            <p className="opacity-75">
              © 2025 SALVE. Todos os direitos reservados.
            </p>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4">
              <a href="/termos-de-uso.html" target="_blank" rel="noopener noreferrer" className="text-white opacity-75 hover:opacity-100 transition-opacity duration-300">Termos de Uso</a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

export default App

