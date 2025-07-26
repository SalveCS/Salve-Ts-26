# 🌱 SALVE - Comunicação Sustentável

> Site de última geração para a SALVE, empresa de comunicação comprometida com o futuro sustentável.

## 🚀 Tecnologias Utilizadas

- **React 19** - Framework principal
- **Vite** - Build tool otimizado
- **Framer Motion** - Animações avançadas
- **Tailwind CSS** - Styling utilitário
- **Shadcn/UI** - Componentes base
- **PWA** - Progressive Web App

## ✨ Funcionalidades Modernas

### 🎨 **UX/UI Avançado**
- Micro-interações elaboradas
- Animações de scroll e parallax
- Lazy loading inteligente
- Loading states modernos
- Design responsivo mobile-first

### 📱 **PWA (Progressive Web App)**
- Instalação nativa
- Funcionalidades offline
- Service worker otimizado
- Cache strategies avançadas

### 🔍 **SEO Otimizado**
- Meta tags completas
- Structured data (JSON-LD)
- Open Graph e Twitter Cards
- Performance otimizada

### 📊 **Analytics Integrado**
- Google Analytics 4
- Event tracking personalizado
- Performance monitoring
- Error tracking automático

## 🛠️ Instalação e Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🌐 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente se necessário
3. Deploy automático a cada push

### Outras Plataformas
O projeto é compatível com qualquer plataforma que suporte sites estáticos:
- Netlify
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 📝 Configurações Importantes

### Google Analytics
Para ativar o Google Analytics, descomente e configure o measurement ID em `src/App.jsx`:

```javascript
// Linha 42 em App.jsx
initAllTracking('G-SEU-MEASUREMENT-ID')
```

### PWA
O manifest e service worker estão configurados. Para personalizar:
- `public/manifest.json` - Configurações do PWA
- `public/sw.js` - Service worker

## 🎯 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes base (Shadcn/UI)
│   ├── LazyImage.jsx   # Componente de lazy loading
│   ├── ScrollReveal.jsx # Animações de scroll
│   └── ...
├── hooks/              # Hooks personalizados
├── utils/              # Utilitários
├── assets/             # Imagens e recursos
└── App.jsx            # Componente principal
```

## 🔧 Personalização

### Cores e Tema
As cores estão definidas em `src/App.css` usando CSS custom properties:

```css
:root {
  --primary: 34 197 94; /* green-500 */
  --secondary: 241 245 249; /* slate-100 */
  /* ... */
}
```

### Animações
Personalize as animações em:
- `src/components/ScrollReveal.jsx`
- `src/components/ParallaxSection.jsx`
- `src/App.css` (keyframes)

## 📊 Performance

O site foi otimizado para máxima performance:
- ✅ Lazy loading de imagens
- ✅ Code splitting automático
- ✅ Preload de recursos críticos
- ✅ Compressão de assets
- ✅ Cache strategies otimizadas

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

**SALVE Comunicação Sustentável**
- 📧 Email: salvempresa@gmail.com
- 📱 WhatsApp: +55 11 97975-7763
- 📸 Instagram: [@salve_cs](https://www.instagram.com/salve_cs/)

---

Desenvolvido com 💚 para um futuro mais sustentável.

