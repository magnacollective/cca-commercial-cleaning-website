"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { 
  Menu, 
  X, 
  ArrowRight, 
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Mail, 
  MapPin, 
  Phone, 
  MessageCircle,
  Shield, 
  Award, 
  Building, 
  Sparkles,
  CheckCircle,
  Clock,
  Factory,
  Play,
  Zap,
  FileCheck,
  Sun,
  Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

// Before/After Slider Component
const BeforeAfterSlider = ({ beforeImage, afterImage, beforeLabel = "Before", afterLabel = "After" }: {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', () => setIsDragging(false));
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', () => setIsDragging(false));
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', () => setIsDragging(false));
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', () => setIsDragging(false));
      };
    }
  }, [isDragging, handleMouseMove, handleTouchMove]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl cursor-ew-resize select-none"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      <img src={beforeImage} alt={beforeLabel} className="absolute inset-0 w-full h-full object-cover" />
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={afterImage} 
          alt={afterLabel} 
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${containerRef.current?.offsetWidth}px` }}
        />
      </div>
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
          <ChevronLeft className="w-4 h-4 absolute -left-0.5" />
          <ChevronRight className="w-4 h-4 absolute -right-0.5" />
        </div>
      </div>
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
        {afterLabel}
      </div>
    </div>
  );
};

// FAQ Accordion Component
const FAQAccordion = ({ items }: { items: Array<{ question: string; answer: string }> }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="border rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <span className="font-medium">{item.question}</span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 pb-4"
              >
                <p className="text-muted-foreground">{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

// Process Timeline Component
const ProcessTimeline = ({ steps }: { steps: Array<{ title: string; description: string; icon: React.ReactNode }> }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary to-transparent" />
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: index * 0.2, duration: 0.5 }}
          className="relative flex items-start mb-12 last:mb-0"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.2, duration: 0.3, type: "spring" }}
            className="absolute left-0 w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white shadow-lg"
          >
            {step.icon}
          </motion.div>
          <div className="ml-24">
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced Service Card with 3D Hover Effect
const ServiceCard3D = ({ service }: { service: { icon: React.ReactNode; title: string; description: string; features?: string[] } }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.1s"
      }}
    >
      <div className="relative overflow-hidden rounded-3xl border p-8 shadow-xl bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-block"
        >
          {service.icon}
        </motion.div>
        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
        <p className="text-muted-foreground mb-4">{service.description}</p>
        {service.features && (
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-sm"
              >
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

function EnhancedCleaningWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const services = [
    {
      icon: <Building className="h-12 w-12 text-primary" />,
      title: "Complete Ceiling/Wall Restoration",
      description: "Transform your facility with our comprehensive restoration services",
      features: ["Acoustic Surfaces", "Vinyl & Cloth Covered", "Open Beam & Metal", "Concrete & Sheetrock", "FRP Surfaces"]
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Kitchen Compliance Services",
      description: "Ensure your kitchen meets all regulatory standards",
      features: ["USDA Code Compliance", "AZ Fire Code Standards", "Stainless Steel Restoration", "Wall Restoration"]
    },
    {
      icon: <Sparkles className="h-12 w-12 text-primary" />,
      title: "High Dusting Services",
      description: "Specialized equipment for hard-to-reach areas",
      features: ["Light Fixtures", "Vent Caps", "Rafters & Beams", "Windowsills", "Extended Dust Removal"]
    },
    {
      icon: <Factory className="h-12 w-12 text-primary" />,
      title: "Industrial Facilities",
      description: "Complete industrial and manufacturing plant cleaning",
      features: ["Manufacturing Plants", "Factory Cleaning", "Interior Services", "Exterior Services"]
    }
  ];

  const processSteps = [
    {
      title: "Free Consultation",
      description: "We assess your facility and understand your specific cleaning needs",
      icon: <Phone className="w-6 h-6" />
    },
    {
      title: "Custom Proposal",
      description: "Receive a detailed, competitive proposal tailored to your requirements",
      icon: <FileCheck className="w-6 h-6" />
    },
    {
      title: "Test Clean",
      description: "Experience our quality with a complimentary test cleaning demonstration",
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: "Service Delivery",
      description: "Our skilled professionals deliver exceptional results using specialized equipment",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Quality Assurance",
      description: "Regular inspections and feedback ensure consistent excellence",
      icon: <Award className="w-6 h-6" />
    }
  ];

  const faqItems = [
    {
      question: "How often should commercial ceilings be professionally cleaned?",
      answer: "We recommend professional ceiling cleaning every 12-18 months for most facilities. However, kitchens and industrial spaces may require more frequent cleaning to maintain compliance and appearance standards."
    },
    {
      question: "Do you offer emergency cleaning services?",
      answer: "Yes! Our experienced staff is available 24/7 for emergency cleaning situations. We understand that unexpected issues can arise, and we're here to help minimize disruption to your business."
    },
    {
      question: "What makes your ceiling restoration different from regular cleaning?",
      answer: "Our ceiling restoration service goes beyond basic cleaning. We restore surfaces to their original white shine using specialized equipment and techniques, addressing acoustic tiles, vinyl, metal, and other materials while ensuring compliance with fire codes and USDA standards where applicable."
    },
    {
      question: "How long does a typical commercial cleaning service take?",
      answer: "Service duration varies based on facility size and specific needs. We work efficiently to minimize disruption, often performing services during off-hours. We'll provide a detailed timeline during your free consultation."
    },
    {
      question: "Are your cleaning products safe for food service environments?",
      answer: "Absolutely. We use USDA-approved, food-safe cleaning products in all kitchen and food service areas. Our team is trained in proper protocols to ensure your facility maintains compliance with all health department requirements."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Contact Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="group relative bg-gradient-to-r from-primary to-primary/80 text-white p-4 rounded-full shadow-2xl"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-12 right-0 bg-black text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Get Free Estimate
          </span>
        </motion.button>
      </motion.div>

      {/* Enhanced Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 w-full border-b backdrop-blur-md ${
          scrollY > 50 ? "bg-background/95 shadow-lg" : "bg-background/60"
        }`}
      >
        <div className="container flex h-20 items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="h-14 w-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">CCA</h1>
              <p className="text-xs text-muted-foreground">Commercial Cleaning</p>
            </div>
          </motion.div>

          <nav className="hidden md:flex gap-8">
            {["Services", "Process", "Industries", "About", "FAQ", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-sm font-medium transition-colors hover:text-primary group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-muted"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            <Button className="hidden md:flex rounded-full bg-gradient-to-r from-primary to-primary/80">
              Get Free Quote
            </Button>
            <button className="flex md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      <main className="flex-1">
        {/* Enhanced Hero Section with Parallax */}
        <section className="relative w-full h-screen overflow-hidden">
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background z-10" />
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-person-cleaning-a-window-43377-large.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <div className="relative z-20 h-full flex items-center justify-center">
            <div className="container px-4 md:px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-white"
                >
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">Arizona&apos;s #1 Commercial Cleaning Service</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-5xl md:text-7xl font-bold text-white"
                >
                  Restoring Excellence,
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    One Surface at a Time
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="max-w-2xl mx-auto text-xl text-white/90"
                >
                  From ceiling restoration to industrial facility cleaning, we deliver exceptional results
                  that exceed expectations
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90 group">
                    Get Free Estimate
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white hover:text-black">
                    Watch Our Process
                    <Play className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { number: 500, suffix: "+", label: "Happy Clients" },
                { number: 15, suffix: "+", label: "Years Experience" },
                { number: 10000, suffix: "+", label: "Projects Completed" },
                { number: 98, suffix: "%", label: "Client Satisfaction" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Enhanced Services Section */}
        <section id="services" className="w-full py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Services
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Comprehensive Cleaning Solutions
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                Specialized services designed to restore and maintain your facility at the highest standards
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ServiceCard3D service={service} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Before/After Section */}
        <section className="w-full py-24 bg-muted/20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                See The Difference
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Dramatic Transformations
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                Experience the remarkable difference our ceiling restoration services can make
              </p>
            </motion.div>

            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800"
              afterImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
              beforeLabel="Before Restoration"
              afterLabel="After Restoration"
            />
          </div>
        </section>

        {/* Process Timeline */}
        <section id="process" className="w-full py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Process
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                How We Work
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                A systematic approach to delivering exceptional cleaning services
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <ProcessTimeline steps={processSteps} />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-24 bg-muted/20">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                FAQ
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                Get answers to common questions about our commercial cleaning services
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <FAQAccordion items={faqItems} />
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="w-full py-24 bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="container px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold">
                Ready to Transform Your Facility?
              </h2>
              <p className="max-w-2xl mx-auto text-xl opacity-90">
                Get your free estimate today and discover why Arizona&apos;s leading businesses trust CCA
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
                  Get Free Estimate
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-white text-white hover:bg-white hover:text-primary">
                  <Phone className="mr-2 w-5 h-5" />
                  (480) 555-0123
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {[
                  { icon: <CheckCircle className="w-8 h-8" />, text: "Free Test Clean" },
                  { icon: <Clock className="w-8 h-8" />, text: "24/7 Emergency Service" },
                  { icon: <Award className="w-8 h-8" />, text: "100% Satisfaction Guarantee" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-center gap-3"
                  >
                    {item.icon}
                    <span className="text-lg font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="w-full border-t bg-background">
        <div className="container px-4 py-12 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">CCA</h3>
                  <p className="text-xs text-muted-foreground">Commercial Cleaning</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Arizona&apos;s premier commercial cleaning service, delivering exceptional results since 2009.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Ceiling Restoration</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Kitchen Compliance</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">High Dusting</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Industrial Cleaning</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Industries</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Manufacturing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Restaurants</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Medical Facilities</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Auto Dealerships</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (480) 555-0123
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@ccacleaning.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Phoenix, AZ
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Commercial Cleaning Associates. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default EnhancedCleaningWebsite;