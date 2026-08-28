import { useState, useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MapPin, Phone, Clock, Instagram, Star, Zap, Shield, Heart, Mail, User, MessageCircle, Menu, X, ChevronDown, CheckCircle } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Componente que revela seus filhos com uma animação suave (fade + slide)
// assim que entram na tela — dá movimento à página sem depender de nada externo.
const Reveal = ({ children, className = "", delay = 0, as: Tag = "div" }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

// Componente de WhatsApp flutuante
const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5511939369778?text=Olá! Gostaria de agendar uma consulta no Tattoo até os Ossos"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 pulse-animation"
      data-testid="whatsapp-button"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
};

// Header/Navigation
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black/95 backdrop-blur-sm text-white py-4 fixed top-0 w-full z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo/tattoo-ate-os-ossos.png"
              alt="Tattoo até os Ossos"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold text-raiox-500">TAO</h1>
              <p className="text-xs text-gray-400">Tattoo até os Ossos</p>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#sobre" className="hover:text-raiox-500 transition-colors">Sobre</a>
            <a href="#servicos" className="hover:text-raiox-500 transition-colors">Serviços</a>
            <a href="#portfolio" className="hover:text-raiox-500 transition-colors">Portfolio</a>
            <a href="#contato" className="hover:text-raiox-500 transition-colors">Contato</a>
            <a
              href="https://wa.me/5511939369778"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-raiox-600 hover:bg-raiox-700 px-4 py-2 rounded-lg transition-colors"
            >
              Agendar
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-button"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-4">
              <a href="#sobre" className="hover:text-raiox-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Sobre</a>
              <a href="#servicos" className="hover:text-raiox-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Serviços</a>
              <a href="#portfolio" className="hover:text-raiox-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
              <a href="#contato" className="hover:text-raiox-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Contato</a>
              <a
                href="https://wa.me/5511939369778"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-raiox-600 hover:bg-raiox-700 px-4 py-2 rounded-lg transition-colors text-center"
              >
                Agendar
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

// Hero Section - estilo "dashboard raio-x": tipografia gigante + painel flutuante
const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden pt-24">
      {/* fundo: grade de pontos + brilhos difusos, estilo painel de dados */}
      <div className="absolute inset-0 raiox-grid-bg opacity-60"></div>
      <div className="raiox-glow w-[36rem] h-[36rem] bg-raiox-500/20 -top-40 -left-40"></div>
      <div className="raiox-glow w-[30rem] h-[30rem] bg-raiox-600/20 bottom-0 right-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black"></div>

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-0 flex items-center min-h-screen">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center w-full max-w-7xl mx-auto">

          {/* Coluna de texto */}
          <Reveal as="div" className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 mb-8">
              <img
                src="/images/logo/tattoo-ate-os-ossos.png"
                alt="Tattoo até os Ossos Logo"
                className="w-14 h-14 rounded-full bg-white/10 p-2"
                data-testid="hero-logo"
              />
              <span className="raiox-chip">
                <span className="raiox-chip-dot"></span>
                Estúdio ativo · São Paulo
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tight" data-testid="hero-title">
              TATTOO
              <span className="block text-raiox-400">ATÉ OS</span>
              <span className="block">OSSOS</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Estúdio referência em <span className="text-raiox-400 font-semibold">realismo, fechamentos e blackwork</span> em São Paulo
            </p>

            <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto lg:mx-0">
              Mais de 15 anos criando arte exclusiva na pele, com técnica, segurança e estilo.
              <span className="text-raiox-400 block mt-3 font-semibold">Venha viver sua experiência até os ossos. 💀🔥</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-12">
              <a
                href="https://wa.me/5511926355407?text=Olá! Gostaria de agendar uma consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-raiox-500 hover:bg-raiox-400 text-black px-9 py-5 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_-10px_rgba(57,255,106,0.6)]"
                data-testid="hero-whatsapp-button"
              >
                <Phone className="inline-block mr-3" size={22} />
                AGENDAR CONSULTA
              </a>
              <a
                href="#portfolio"
                className="border-2 border-raiox-500/60 text-raiox-400 hover:bg-raiox-500 hover:text-black px-9 py-5 rounded-lg font-bold text-lg transition-all duration-300"
                data-testid="hero-portfolio-button"
              >
                VER PORTFOLIO
              </a>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-gray-400">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                <MapPin size={18} className="text-raiox-400" />
                <span className="font-medium text-sm">Vila Prudente - Vila Zelina</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                <Shield size={18} className="text-raiox-400" />
                <span className="font-medium text-sm">100% Esterilizado</span>
              </div>
            </div>
          </Reveal>

          {/* Painel flutuante estilo dashboard/raio-x */}
          <Reveal as="div" delay={200} className="hidden lg:block">
            <div className="raiox-panel raiox-float rounded-2xl p-8 max-w-sm ml-auto">
              <div className="raiox-scanline"></div>
              <div className="flex items-center justify-between mb-8 relative">
                <span className="raiox-chip">
                  <span className="raiox-chip-dot"></span>
                  Diagnóstico do estúdio
                </span>
                <Zap className="text-raiox-400" size={18} />
              </div>

              <div className="flex items-center gap-6 mb-8 relative">
                <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90 flex-shrink-0">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="45" fill="none" stroke="#39FF6A" strokeWidth="8" strokeLinecap="round"
                    className="raiox-gauge-fg"
                    style={{ '--gauge-offset': 8 }}
                  />
                </svg>
                <div>
                  <div className="text-4xl font-black text-white">100%</div>
                  <div className="text-gray-400 text-sm font-medium">Satisfação dos clientes</div>
                </div>
              </div>

              <div className="raiox-hairline mb-6"></div>

              <div className="space-y-4 relative">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Tatuagens realizadas</span>
                  <span className="text-white font-bold">1500+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Anos de estúdio</span>
                  <span className="text-white font-bold">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Avaliação Google</span>
                  <span className="text-white font-bold flex items-center gap-1">
                    4.9 <Star size={14} className="text-raiox-400 fill-raiox-400" />
                  </span>
                </div>
              </div>
            </div>

            {/* card secundário, flutua com atraso/velocidade diferente */}
            <div className="raiox-panel raiox-float-slow rounded-xl px-6 py-4 max-w-[220px] mt-6 ml-auto -translate-x-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-raiox-500/15 border border-raiox-500/40 flex items-center justify-center">
                  <Shield size={16} className="text-raiox-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Materiais 100%</div>
                  <div className="text-gray-500 text-xs">Esterilizados</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// Componente Modal para Zoom de Imagens
const ImageModal = ({ src, alt, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl max-h-full">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-raiox-400 transition-colors"
          data-testid="modal-close-button"
        >
          <X size={32} />
        </button>
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
          <p className="font-semibold">{alt}</p>
        </div>
      </div>
    </div>
  );
};

// Seção Sobre - Com perfis do Coringa e Jennyfer, estilo painel de dados
const AboutSection = () => {
  return (
    <section id="sobre" className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 raiox-grid-bg opacity-40"></div>
      <div className="raiox-glow w-[28rem] h-[28rem] bg-raiox-600/10 top-0 left-1/2 -translate-x-1/2"></div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal as="div" className="text-center mb-20">
            <span className="raiox-chip mb-6">
              <span className="raiox-chip-dot"></span>
              Equipe
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 mt-6" data-testid="about-title">
              Conheça os Profissionais
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Nosso compromisso é eternizar sua história com arte de alto nível,
              em um espaço seguro e acolhedor
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Perfil do Coringa */}
            <Reveal as="div" className="raiox-card p-10 rounded-2xl">
              <div className="flex items-center mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden mr-6 border-2 border-raiox-500/50 shadow-lg">
                  <img
                    src="/images/logo/coringa.png"
                    alt="Coringa - Tatuador Fundador"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Coringa</h3>
                  <p className="text-raiox-400 font-bold text-lg">Tatuador Fundador</p>
                  <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <Clock size={16} />
                    <span className="font-medium text-sm">15+ anos de experiência</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                O Coringa é especialista em tatuagens autorais que unem emoção e identidade.
                Tatuador fundador do estúdio, conhecido pelo traço firme e pela criatividade ousada.
                Construiu sua trajetória no mundo da tatuagem com a ideia de que cada desenho
                começa mais do que apenas memória - é identidade e expressão de vida.
              </p>

              <div className="mb-8">
                <h4 className="font-bold text-white mb-4 flex items-center gap-2 text-lg">
                  <Zap className="text-raiox-400" size={20} />
                  Especialidades
                </h4>
                <div className="flex flex-wrap gap-3">
                  {['Realismo', 'Blackwork', 'Criação Artística', 'Designs Exclusivos'].map((skill, idx) => (
                    <span key={idx} className="bg-raiox-500/10 text-raiox-400 border border-raiox-500/30 px-4 py-2 rounded-full text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="raiox-hairline mb-6"></div>
              <div className="flex justify-between text-center">
                <div>
                  <div className="text-3xl font-black text-raiox-400">1000+</div>
                  <div className="text-gray-500 font-medium text-sm">Trabalhos</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-raiox-400">100%</div>
                  <div className="text-gray-500 font-medium text-sm">Satisfação</div>
                </div>
              </div>
            </Reveal>

            {/* Perfil da Jennyfer */}
            <Reveal as="div" delay={150} className="raiox-card p-10 rounded-2xl">
              <div className="flex items-center mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden mr-6 border-2 border-raiox-500/50 shadow-lg">
                  <img
                    src="/images/logo/jennyfer-perfil.png"
                    alt="Jennyfer - Body Piercer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Jennyfer</h3>
                  <p className="text-raiox-400 font-bold text-lg">Body Piercer</p>
                  <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <Clock size={16} />
                    <span className="font-medium text-sm">8+ anos de experiência</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Jennyfer é body piercer com formação em saúde, que garante
                estética e cuidado em cada procedimento. Body piercer altamente qualificada,
                traz não apenas técnica impecável, mas também uma formação sólida na área da saúde,
                garantindo segurança e confiança em cada procedimento.
              </p>

              <div className="mb-8">
                <h4 className="font-bold text-white mb-4 flex items-center gap-2 text-lg">
                  <Heart className="text-raiox-400" size={20} />
                  Especialidades
                </h4>
                <div className="flex flex-wrap gap-3">
                  {['Piercing Corporal', 'Técnicas de Saúde', 'Procedimentos Seguros', 'Cuidados Pós-Piercing'].map((skill, idx) => (
                    <span key={idx} className="bg-raiox-500/10 text-raiox-400 border border-raiox-500/30 px-4 py-2 rounded-full text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="raiox-hairline mb-6"></div>
              <div className="flex justify-between text-center">
                <div>
                  <div className="text-3xl font-black text-raiox-400">500+</div>
                  <div className="text-gray-500 font-medium text-sm">Trabalhos</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-raiox-400">100%</div>
                  <div className="text-gray-500 font-medium text-sm">Satisfação</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Estatísticas Gerais - painel dashboard */}
          <Reveal as="div" className="raiox-panel rounded-2xl p-12 md:p-16">
            <div className="raiox-scanline"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative">
              <div>
                <div className="text-5xl font-black text-raiox-400 mb-3">1500+</div>
                <div className="text-gray-400 font-medium text-lg">Tatuagens Realizadas</div>
              </div>
              <div>
                <div className="text-5xl font-black text-raiox-400 mb-3">15</div>
                <div className="text-gray-400 font-medium text-lg">Anos de Estúdio</div>
              </div>
              <div>
                <div className="text-5xl font-black text-raiox-400 mb-3">2</div>
                <div className="text-gray-400 font-medium text-lg">Profissionais</div>
              </div>
              <div>
                <div className="text-5xl font-black text-raiox-400 mb-3">100%</div>
                <div className="text-gray-400 font-medium text-lg">Materiais Esterilizados</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// Seção de Serviços - SEM preços
const ServicesSection = () => {
  const services = [
    {
      title: "Tatuagens Artísticas",
      description: "Realismo, blackwork, fino traço e estilos exclusivos",
      image: "/images/portfolio/tattoo-realismo-01.png",
      highlights: ["Realismo fotográfico", "Blackwork detalhado", "Fino traço delicado", "Designs personalizados"],
      featured: true
    },
    {
      title: "Piercing Profissional", 
      description: "Piercing seguro com materiais de alta qualidade",
      image: "/images/portfolio/piercing-01.png.jpg",
      highlights: ["Materiais cirúrgicos", "Ambiente esterilizado", "Diversos modelos", "Cuidados pós-piercing"]
    },
    {
      title: "Pinturas Digitais",
      description: "Arte digital exclusiva para tatuagens únicas", 
      image: "/images/portfolio/dragao.png",
      highlights: ["Designs únicos", "Alta resolução 4K", "Personalização total", "Arquivo digital incluso"]
    },
    {
      title: "Cover Up",
      description: "Transformação de tatuagens antigas em obras de arte",
      image: "/images/portfolio/reforma-depois.png",
      highlights: ["Análise detalhada", "Novo design criativo", "Cobertura completa", "Resultado garantido"]
    }
  ];
  
  return (
    <section id="servicos" className="relative py-24 bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 raiox-grid-bg opacity-30"></div>
      <div className="relative container mx-auto px-4">
        <Reveal as="div" className="text-center mb-20">
          <span className="raiox-chip mb-6">
            <span className="raiox-chip-dot"></span>
            O que fazemos
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 mt-6" data-testid="services-title">
            Nossos Serviços
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Oferecemos uma gama completa de serviços para transformar sua visão em realidade
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <Reveal key={index} delay={index * 100} className={`raiox-card rounded-2xl overflow-hidden ${service.featured ? 'ring-1 ring-raiox-500/60' : ''}`}>
              <div data-testid={`service-card-${index}`}>
              {service.featured && (
                <div className="bg-raiox-500 text-black text-center py-2 font-black text-xs tracking-widest">
                  DESTAQUE
                </div>
              )}
              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <div className="space-y-3 mb-8">
                  {service.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle size={16} className="text-raiox-400 flex-shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="https://wa.me/5511926355407?text=Olá! Gostaria de solicitar orçamento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-raiox-500 hover:bg-raiox-400 text-black py-3 px-6 rounded-lg font-bold transition-colors duration-300 text-center block"
                >
                  Solicitar Orçamento
                </a>
              </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal as="div" className="raiox-panel rounded-2xl p-10 md:p-14 max-w-6xl mx-auto">
          <div className="raiox-scanline"></div>
          <h3 className="text-3xl font-bold text-white mb-10 text-center relative">Como Funciona</h3>
          <div className="grid md:grid-cols-4 gap-8 text-center relative">
            <div>
              <div className="w-16 h-16 bg-raiox-500/10 border border-raiox-500/40 text-raiox-400 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-2xl">1</div>
              <h4 className="font-bold text-white mb-3 text-lg">Consulta</h4>
              <p className="text-gray-500 text-sm">Conversa inicial sobre sua ideia</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-raiox-500/10 border border-raiox-500/40 text-raiox-400 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-2xl">2</div>
              <h4 className="font-bold text-white mb-3 text-lg">Design</h4>
              <p className="text-gray-500 text-sm">Criação do desenho personalizado</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-raiox-500/10 border border-raiox-500/40 text-raiox-400 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-2xl">3</div>
              <h4 className="font-bold text-white mb-3 text-lg">Aprovação</h4>
              <p className="text-gray-500 text-sm">Ajustes e aprovação final</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-raiox-500/10 border border-raiox-500/40 text-raiox-400 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-2xl">4</div>
              <h4 className="font-bold text-white mb-3 text-lg">Execução</h4>
              <p className="text-gray-500 text-sm">Realização da tatuagem</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// Seção Portfolio com imagens reais E ZOOM
const PortfolioSection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const portfolioImages = [
    { src: "/images/portfolio/tattoo-realismo-01.png", alt: "Tatuagem Realismo 1", category: "Realismo" },
    { src: "/images/portfolio/tiger.png", alt: "Tatuagem Tiger", category: "Realismo" },
    { src: "/images/portfolio/tattoo-coruja-01.png", alt: "Tatuagem Coruja", category: "Realismo" },
    { src: "/images/portfolio/tattoo-costas-01.png", alt: "Tatuagem Costas", category: "Blackwork" },
    { src: "/images/portfolio/tattoo-braco-01.png.png", alt: "Tatuagem Braço", category: "Blackwork" },
    { src: "/images/portfolio/portrait-filha.png", alt: "Portrait", category: "Realismo" },
    { src: "/images/portfolio/portifolio1.png", alt: "Portfolio 1", category: "Diversos" },
    { src: "/images/portfolio/portifolio2.png", alt: "Portfolio 2", category: "Diversos" },
    { src: "/images/portfolio/portfolio3.png", alt: "Portfolio 3", category: "Diversos" },
    { src: "/images/portfolio/portifolio4.png", alt: "Portfolio 4", category: "Diversos" },
    { src: "/images/portfolio/reforma-antes.png", alt: "Cover Up - Antes", category: "Cover Up" },
    { src: "/images/portfolio/reforma-depois.png", alt: "Cover Up - Depois", category: "Cover Up" },
    { src: "/images/portfolio/piercing-01.png.jpg", alt: "Piercing Orelha", category: "Piercing Jennyfer" },
    { src: "/images/portfolio/piercing-02.png.jpg", alt: "Piercing Nariz", category: "Piercing Jennyfer" },
    { src: "/images/portfolio/piercing-03.png.jpg", alt: "Piercing Facial", category: "Piercing Jennyfer" },
    { src: "/images/portfolio/piercing-04.png.jpg", alt: "Piercing Orelha Completa", category: "Piercing Jennyfer" },
    { src: "/images/portfolio/piercing-05.png.jpg", alt: "Piercing Cartilagem", category: "Piercing Jennyfer" },
    { src: "/images/portfolio/piercing-06.png.jpg", alt: "Piercing Helix", category: "Piercing Jennyfer" },
    { src: "/images/portfolio/piercing-07.png.jpg", alt: "Piercing Múltiplo", category: "Piercing Jennyfer" },
    { src: "/images/portfolio/piercing-08.png.jpg", alt: "Piercing Industrial", category: "Piercing Jennyfer" }
  ];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section id="portfolio" className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 raiox-grid-bg opacity-30"></div>
      <div className="relative container mx-auto px-4">
        <Reveal as="div" className="text-center mb-20">
          <span className="raiox-chip mb-6">
            <span className="raiox-chip-dot"></span>
            Trabalhos reais
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 mt-6" data-testid="portfolio-title">
            Portfolio
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Alguns dos nossos trabalhos realizados ao longo desses 15 anos
          </p>
          <p className="text-lg text-raiox-400 mt-4 font-semibold">
            Clique nas imagens para ver em tamanho grande
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {portfolioImages.map((image, index) => (
            <Reveal key={index} delay={(index % 4) * 100} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer">
              <div
                data-testid={`portfolio-item-${index}`}
                onClick={() => openModal(image)}
              >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-sm font-bold bg-raiox-500 px-3 py-1 rounded-full">{image.category}</span>
                  <p className="text-sm mt-2">{image.alt}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              </div>
            </Reveal>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a
            href="https://instagram.com/tattooateosossos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-5 rounded-lg font-bold text-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-xl"
            data-testid="instagram-button"
          >
            <Instagram size={24} />
            Seguir @tattooateosossos
          </a>
        </div>
      </div>
      
      {/* Modal de Zoom */}
      <ImageModal
        src={selectedImage?.src}
        alt={selectedImage?.alt}
        isOpen={!!selectedImage}
        onClose={closeModal}
      />
    </section>
  );
};

// Seção de Contato SIMPLIFICADA - só Instagram e WhatsApp
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `*Tattoo até os Ossos - Nova Consulta*\n\n*Nome:* ${formData.name}\n*Email:* ${formData.email}\n*Telefone:* ${formData.phone}\n*Serviço:* ${formData.service}\n*Mensagem:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/5511939369778?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contato" className="relative py-24 bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 raiox-grid-bg opacity-30"></div>
      <div className="relative container mx-auto px-4">
        <Reveal as="div" className="text-center mb-20">
          <span className="raiox-chip mb-6">
            <span className="raiox-chip-dot"></span>
            Fale com a gente
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 mt-6" data-testid="contact-title">
            Entre em Contato
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Agende sua consulta e transforme sua ideia em arte
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Informações de Contato SIMPLIFICADAS */}
          <Reveal as="div" className="space-y-6">
            <div className="raiox-card p-10 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <MapPin className="text-raiox-400" size={28} />
                Como Chegar
              </h3>
              <div className="space-y-3 text-gray-400 text-lg">
                <p className="font-bold text-xl text-white">Tattoo Até os Ossos</p>
                <p>Rua Monsenhor Pio Ragazinskas, 15 - Sobreloja</p>
                <p>Vila Zelina/Vila Prudente - São Paulo - SP</p>
                <p>CEP: 03141-090</p>
              </div>
              <div className="mt-6 p-4 bg-raiox-500/10 border border-raiox-500/20 rounded-lg">
                <p className="text-raiox-300"><strong>🚇 Transporte Público:</strong> Próximo à estação Vila Prudente do Metrô (Linha Azul)</p>
              </div>
            </div>

            <div className="raiox-card p-10 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Clock className="text-raiox-400" size={28} />
                Horário de Funcionamento
              </h3>
              <div className="space-y-4 text-gray-400 text-lg">
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="font-semibold text-gray-300">Segunda - Sábado:</span>
                  <span>10:00 - 20:00</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="font-semibold text-gray-300">Intervalo de almoço:</span>
                  <span>12:00 - 13:00</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="font-semibold text-gray-300">Domingo:</span>
                  <span className="text-red-400 font-semibold">Fechado</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-raiox-500/10 border border-raiox-500/20 rounded-lg">
                <p className="text-raiox-300"><strong>✅ Atendimento por agendamento via WhatsApp</strong></p>
              </div>
            </div>

            {/* CONTATO DIRETO SIMPLIFICADO - só Instagram e WhatsApp */}
            <div className="raiox-card p-10 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Contato Direto</h3>
              <div className="space-y-4">
                <a href="https://wa.me/5511939369778" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-raiox-500/50 transition-colors">
                  <Phone className="text-raiox-400" size={24} />
                  <div>
                    <p className="font-semibold text-white">(11) 93936-9778</p>
                    <p className="text-sm text-gray-500">WhatsApp Business</p>
                  </div>
                </a>
                <a href="https://instagram.com/tattooateosossos" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-raiox-500/50 transition-colors">
                  <Instagram className="text-raiox-400" size={24} />
                  <div>
                    <p className="font-semibold text-white">@tattooateosossos</p>
                    <p className="text-sm text-gray-500">Instagram</p>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Formulário de Contato */}
          <Reveal as="div" delay={150} className="raiox-panel rounded-2xl p-10 h-fit">
            <div className="raiox-scanline"></div>
            <h3 className="text-3xl font-bold text-white mb-3 relative">Solicite uma Consulta</h3>
            <p className="text-gray-400 mb-8 text-lg relative">Preencha o formulário e entraremos em contato via WhatsApp</p>

            <form onSubmit={handleSubmit} className="space-y-6 relative" data-testid="contact-form">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Digite seu nome completo"
                  className="w-full px-4 py-4 bg-black/40 border border-white/15 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-raiox-500 focus:border-raiox-500 text-lg"
                  data-testid="contact-name-input"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                  className="w-full px-4 py-4 bg-black/40 border border-white/15 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-raiox-500 focus:border-raiox-500 text-lg"
                  data-testid="contact-email-input"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-2">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-4 bg-black/40 border border-white/15 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-raiox-500 focus:border-raiox-500 text-lg"
                  data-testid="contact-phone-input"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-semibold text-gray-300 mb-2">
                  Serviço Desejado *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 bg-black/40 border border-white/15 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-raiox-500 focus:border-raiox-500 text-lg"
                  data-testid="contact-service-select"
                >
                  <option value="">Escolha um serviço</option>
                  <option value="Tatuagem Realismo">Tatuagem - Realismo</option>
                  <option value="Tatuagem Blackwork">Tatuagem - Blackwork</option>
                  <option value="Tatuagem Fino Traço">Tatuagem - Fino Traço</option>
                  <option value="Pinturas Digitais">Pinturas Digitais</option>
                  <option value="Piercing Profissional">Piercing Profissional</option>
                  <option value="Cover Up">Cover Up</option>
                  <option value="Consulta Geral">Consulta Geral</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  Descreva sua ideia
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-4 bg-black/40 border border-white/15 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-raiox-500 focus:border-raiox-500 text-lg"
                  placeholder="Conte-nos sobre sua ideia, estilo desejado, tamanho, localização no corpo..."
                  data-testid="contact-message-textarea"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-raiox-500 hover:bg-raiox-400 text-black py-5 px-6 rounded-lg font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_40px_-10px_rgba(57,255,106,0.6)]"
                data-testid="contact-submit-button"
              >
                <MessageCircle size={24} />
                Enviar via WhatsApp
              </button>

              <p className="text-sm text-gray-500 text-center">
                Ao enviar, você será redirecionado para o WhatsApp com suas informações preenchidas
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// Footer PROFISSIONAL com termos
const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Footer Principal */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/images/logo/tattoo-ate-os-ossos.png"
                  alt="TAO Logo"
                  className="w-16 h-16 rounded-full bg-white/10 p-2"
                />
                <div>
                  <h3 className="text-3xl font-bold text-raiox-500">TAO</h3>
                  <p className="text-gray-400">Tattoo até os Ossos</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md text-lg leading-relaxed">
                Transformamos ideias em arte permanente. Especialistas em tatuagens artísticas, 
                realismo, blackwork e piercing profissional na Vila Zelina, São Paulo.
              </p>
              <p className="text-raiox-400 font-bold text-lg">Arte que marca para sempre</p>
              
              {/* Redes Sociais */}
              <div className="flex gap-4 mt-6">
                <a
                  href="https://instagram.com/tattooateosossos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  data-testid="footer-instagram"
                >
                  <Instagram className="text-white" size={20} />
                </a>
                <a
                  href="https://wa.me/5511939369778"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 p-3 rounded-lg hover:bg-green-600 transition-all duration-300"
                  data-testid="footer-whatsapp"
                >
                  <Phone className="text-white" size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6 text-raiox-500">Serviços</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#servicos" className="hover:text-raiox-400 transition-colors">Tatuagens Artísticas</a></li>
                <li><a href="#servicos" className="hover:text-raiox-400 transition-colors">Realismo</a></li>
                <li><a href="#servicos" className="hover:text-raiox-400 transition-colors">Blackwork</a></li>
                <li><a href="#servicos" className="hover:text-raiox-400 transition-colors">Fino Traço</a></li>
                <li><a href="#servicos" className="hover:text-raiox-400 transition-colors">Pinturas Digitais</a></li>
                <li><a href="#servicos" className="hover:text-raiox-400 transition-colors">Piercing</a></li>
                <li><a href="#servicos" className="hover:text-raiox-400 transition-colors">Cover Up</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6 text-raiox-500">Contato</h4>
              <div className="space-y-3 text-gray-400">
                <p>(11) 93936-9778</p>
                <p>@tattooateosossos</p>
                <p>Rua Monsenhor Pio Ragazinskas, 15</p>
                <p>Vila Zelina - São Paulo - SP</p>
                <p className="text-raiox-400 font-semibold">Seg-Sáb: 10h-20h (almoço 12h-13h)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom com Links Legais */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Tattoo Até os Ossos LTDA. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="/termos.html" className="text-gray-400 hover:text-raiox-400 transition-colors">Termos de Uso</a>
              <a href="/privacidade.html" className="text-gray-400 hover:text-raiox-400 transition-colors">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Componente principal Home
const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

// Componente principal App
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;