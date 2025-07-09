"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ArrowRight, 
  ChevronRight, 
  Mail, 
  MapPin, 
  Phone, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Shield, 
  Users, 
  Award, 
  Building, 
  Utensils, 
  GraduationCap, 
  Car, 
  Church, 
  Heart,
  Sparkles,
  Star,
  CheckCircle,
  Clock,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className = "",
}: {
  testimonials: Array<{
    quote: string;
    name: string;
    designation: string;
    src: string;
  }>;
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);
  const [rotationValues, setRotationValues] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    // Generate consistent rotation values after mount
    const rotations = testimonials.map(() => Math.floor(Math.random() * 21) - 10);
    setRotationValues(rotations);
    setIsMounted(true);
  }, [testimonials.length]);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className={`max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20 ${className}`}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            {!isMounted ? (
              // Static version for SSR
              <div className="absolute inset-0 origin-bottom">
                <img
                  src={testimonials[active]?.src}
                  alt={testimonials[active]?.name}
                  className="h-full w-full rounded-3xl object-cover object-center"
                />
              </div>
            ) : (
              // Animated version for client
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: rotationValues[index] || 0,
                    }}
                    animate={{
                      opacity: index === active ? 1 : 0.7,
                      scale: index === active ? 1 : 0.95,
                      z: index === active ? 0 : -100,
                      rotate: index === active ? 0 : (rotationValues[index] || 0),
                      zIndex: index === active ? 999 : testimonials.length + 2 - index,
                      y: index === active ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: rotationValues[index] || 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      className="h-full w-full rounded-3xl object-cover object-center"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-foreground">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-lg text-muted-foreground mt-8">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
            >
              <ChevronRight className="h-5 w-5 text-foreground group-hover/button:rotate-12 transition-transform duration-300 rotate-180" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
            >
              <ChevronRight className="h-5 w-5 text-foreground group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function BoutiqueCleaningWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const testimonials = [
    {
      quote: "Commercial Cleaning Associates has transformed our restaurant's cleanliness standards. Their attention to detail is unmatched, and our customers consistently comment on how pristine our establishment looks.",
      name: "Bill Michael",
      designation: "Restaurant Owner, Phoenix",
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      quote: "As a medical facility, we require the highest standards of cleanliness. Commercial Cleaning Associates exceeds our expectations every single time with their specialized medical cleaning protocols.",
      name: "Dr. Sarah Johnson",
      designation: "Medical Director, Scottsdale",
      src: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      quote: "Our auto dealership has never looked better. The team understands the unique needs of our showroom and service areas, delivering exceptional results that help us maintain our premium brand image.",
      name: "Michael Rodriguez",
      designation: "General Manager, Tempe Motors",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      quote: "The level of professionalism and quality from Commercial Cleaning Associates is outstanding. They treat our resort with the care and attention it deserves, ensuring our guests always experience perfection.",
      name: "Jennifer Davis",
      designation: "Resort Manager, Sedona",
      src: "https://www.baincapitalprivateequity.com/sites/default/files/team/SQ%20pref%200K6A7364.jpg"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
          scrollY > 50 ? "shadow-md" : ""
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-12 w-auto"
              >
                <img
                  src="/cca-logo.png"
                  alt="CCA Commercial Cleaning Associates"
                  className="h-12 w-auto object-contain"
                />
              </motion.div>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#services" className="text-sm font-medium transition-colors hover:text-primary">
              Services
            </a>
            <a href="#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </a>
            <a href="#industries" className="text-sm font-medium transition-colors hover:text-primary">
              Industries
            </a>
            <a href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Testimonials
            </a>
            <a href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Button size="sm" className="rounded-full">
              Get Proposal
            </Button>
          </div>
          <button className="flex md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background md:hidden"
        >
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-auto">
                  <img
                    src="/cca-logo.png"
                    alt="CCA Commercial Cleaning Associates"
                    className="h-12 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
            <button onClick={toggleMenu}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <motion.nav
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="container grid gap-3 pb-8 pt-6"
          >
            {["Services", "About", "Industries", "Testimonials", "Contact"].map((item, index) => (
              <motion.div key={index} variants={itemFadeIn}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="flex items-center justify-between rounded-full px-4 py-3 text-lg font-medium hover:bg-accent"
                  onClick={toggleMenu}
                >
                  {item}
                  <ChevronRight className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
            <motion.div variants={itemFadeIn} className="pt-4">
              <Button className="w-full rounded-full">Get Proposal</Button>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm"
                  >
                    <Award className="mr-2 h-4 w-4" />
                    Arizona's Premier Cleaning Service
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  >
                    Commercial Cleaning Services for Clients Who{" "}
                    <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      Expect More
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="max-w-[600px] text-muted-foreground md:text-xl"
                  >
                    Delivering exceptional commercial cleaning services to Arizona's most discerning establishments. 
                    Where quality meets reliability.
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="flex flex-col gap-2 sm:flex-row"
                >
                  <Button size="lg" className="rounded-full group">
                    Request Free Proposal
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full">
                    Call (480) 555-0123
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center"
              >
                <div className="relative h-[350px] w-full md:h-[450px] lg:h-[500px] xl:h-[550px] overflow-hidden rounded-3xl">
                  <img
                    src="/cleaningimage1.jpg"
                    alt="Professional cleaning team"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="w-full py-12 md:py-16 lg:py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-full bg-muted px-3 py-1 text-sm"
                >
                  Our Values
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  What Sets Us Apart
                </motion.h2>
              </div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3"
            >
              {[
                {
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  title: "Accountability",
                  description: "We take full responsibility for our work and stand behind every service we provide with unwavering commitment to excellence."
                },
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "Accessibility",
                  description: "Available when you need us most, with flexible scheduling and responsive communication to meet your unique requirements."
                },
                {
                  icon: <Award className="h-10 w-10 text-primary" />,
                  title: "Service Excellence",
                  description: "Delivering superior results through meticulous attention to detail and industry-leading cleaning standards."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-3xl border p-6 shadow-sm transition-all hover:shadow-md bg-background/80"
                >
                  <div className="space-y-2">
                    <div className="mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* About Us Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm">About Us</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Elevating Standards in Commercial Cleaning
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  For over a decade, Commercial Cleaning Associates has been Arizona's trusted partner for premium 
                  commercial cleaning. We understand that your business environment reflects your brand, and we're 
                  committed to ensuring it always makes the right impression.
                </p>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Our team of trained professionals uses state-of-the-art equipment and eco-friendly products to 
                  deliver results that exceed expectations. From nightly janitorial services to specialized deep 
                  cleaning, we tailor our approach to meet the unique needs of each client.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button size="lg" className="rounded-full">
                    Learn More About Us
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full">
                    View Certifications
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center"
              >
                <div className="relative h-[350px] w-full md:h-[450px] lg:h-[500px] overflow-hidden rounded-3xl">
                  <img
                    src="/cleaningimage2.jpeg"
                    alt="Professional cleaning equipment"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-full bg-muted px-3 py-1 text-sm"
                >
                  Our Services
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  Comprehensive Cleaning Solutions
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed"
                >
                  From routine maintenance to specialized cleaning, we offer a full range of services 
                  tailored to your business needs
                </motion.p>
              </div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  icon: <Clock className="h-10 w-10 text-primary" />,
                  title: "Nightly Janitorial Services",
                  description: "Comprehensive daily cleaning to maintain your facility's professional appearance and hygiene standards."
                },
                {
                  icon: <Sparkles className="h-10 w-10 text-primary" />,
                  title: "Deep Cleaning Services",
                  description: "Intensive cleaning for carpets, upholstery, and hard-to-reach areas to restore your space to pristine condition."
                },
                {
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  title: "Sanitization & Disinfection",
                  description: "Advanced sanitization protocols using hospital-grade disinfectants to ensure a safe, healthy environment."
                },
                {
                  icon: <Building className="h-10 w-10 text-primary" />,
                  title: "Floor Care & Maintenance",
                  description: "Professional floor cleaning, waxing, and maintenance for all surface types including hardwood, tile, and carpet."
                },
                {
                  icon: <Target className="h-10 w-10 text-primary" />,
                  title: "Window Cleaning",
                  description: "Crystal-clear windows inside and out, enhancing your building's appearance and natural light."
                },
                {
                  icon: <CheckCircle className="h-10 w-10 text-primary" />,
                  title: "Specialty Services",
                  description: "Customized cleaning solutions for unique requirements including post-construction cleanup and event preparation."
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-3xl border p-6 shadow-sm transition-all hover:shadow-md bg-background/80"
                >
                  <div className="space-y-2">
                    <div className="mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Industries Section */}
        <section id="industries" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-full bg-muted px-3 py-1 text-sm"
                >
                  Industries We Serve
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  Specialized Expertise Across Industries
                </motion.h2>
              </div>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  icon: <Utensils className="h-10 w-10 text-primary" />,
                  title: "Restaurants & Food Service",
                  description: "Health department compliant cleaning with specialized kitchen and dining area expertise."
                },
                {
                  icon: <Heart className="h-10 w-10 text-primary" />,
                  title: "Medical Facilities",
                  description: "Hospital-grade cleaning protocols ensuring the highest standards of hygiene and safety."
                },
                {
                  icon: <Car className="h-10 w-10 text-primary" />,
                  title: "Auto Dealerships",
                  description: "Showroom-quality cleaning that maintains your vehicles' and facility's premium appearance."
                },
                {
                  icon: <Building className="h-10 w-10 text-primary" />,
                  title: "Resorts & Hospitality",
                  description: "Luxury-level cleaning services that enhance guest experiences and maintain brand standards."
                },
                {
                  icon: <Church className="h-10 w-10 text-primary" />,
                  title: "Religious Institutions",
                  description: "Respectful, thorough cleaning services that honor the sacred nature of your space."
                },
                {
                  icon: <GraduationCap className="h-10 w-10 text-primary" />,
                  title: "Schools & Educational",
                  description: "Safe, healthy learning environments with child-friendly cleaning products and protocols."
                }
              ].map((industry, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-3xl border p-6 shadow-sm transition-all hover:shadow-md bg-background/80"
                >
                  <div className="space-y-2">
                    <div className="mb-4">{industry.icon}</div>
                    <h3 className="text-xl font-bold">{industry.title}</h3>
                    <p className="text-muted-foreground">{industry.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block rounded-full bg-muted px-3 py-1 text-sm"
                >
                  Client Testimonials
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                >
                  What Our Clients Say
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed"
                >
                  Don't just take our word for it - hear from Arizona's premier establishments
                </motion.p>
              </div>
            </div>
            <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm">Get In Touch</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Request Your Free Proposal
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Ready to experience the Commercial Cleaning Associates difference? Contact us today for a customized 
                proposal tailored to your facility's unique needs.
              </p>
              <div className="mt-8 space-y-4">
                <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                  <div className="rounded-full bg-muted p-2">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Service Area</h3>
                    <p className="text-sm text-muted-foreground">
                      Phoenix, Scottsdale, Tempe, Mesa, Chandler & surrounding areas
                    </p>
                  </div>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                  <div className="rounded-full bg-muted p-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email Us</h3>
                    <p className="text-sm text-muted-foreground">info@boutiquecleaningaz.com</p>
                  </div>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="flex items-start gap-3">
                  <div className="rounded-full bg-muted p-2">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Call Us</h3>
                    <p className="text-sm text-muted-foreground">(480) 555-0123</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border bg-background p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold">Request Proposal</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Fill out the form below and we'll provide a customized quote within 24 hours.
              </p>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">
                      First name
                    </label>
                    <Input id="first-name" placeholder="Enter your first name" className="rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">
                      Last name
                    </label>
                    <Input id="last-name" placeholder="Enter your last name" className="rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Company/Business Name
                  </label>
                  <Input id="company" placeholder="Enter your business name" className="rounded-full" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email" className="rounded-full" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input id="phone" type="tel" placeholder="Enter your phone number" className="rounded-full" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="facility-type" className="text-sm font-medium">
                    Facility Type
                  </label>
                  <Input id="facility-type" placeholder="e.g., Restaurant, Medical Office, etc." className="rounded-full" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Additional Details
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your cleaning needs, facility size, frequency, etc." 
                    className="min-h-[120px] rounded-2xl" 
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" className="w-full rounded-full">
                    Request Free Proposal
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-muted/20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="container grid gap-8 px-4 py-10 md:px-6 lg:grid-cols-4"
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-12 w-auto"
              >
                <img
                  src="/cca-logo.png"
                  alt="CCA Commercial Cleaning Associates"
                  className="h-12 w-auto object-contain"
                />
              </motion.div>
            </div>
            <p className="text-sm text-muted-foreground">
              Arizona's premier commercial cleaning service, delivering exceptional results for clients who expect more.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
                { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
              ].map((social, index) => (
                <motion.div key={index} whileHover={{ y: -5, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Services</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Nightly Janitorial
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Deep Cleaning
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Sanitization
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Floor Care
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Window Cleaning
              </a>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Industries</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Restaurants
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Medical Facilities
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Auto Dealerships
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Resorts
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Schools
              </a>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Info</h3>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <strong>Phone:</strong> (480) 555-0123
              </p>
              <p className="text-muted-foreground">
                <strong>Email:</strong> info@boutiquecleaningaz.com
              </p>
              <p className="text-muted-foreground">
                <strong>Service Area:</strong> Greater Phoenix Area
              </p>
              <p className="text-muted-foreground">
                <strong>Hours:</strong> 24/7 Emergency Service
              </p>
            </div>
          </div>
        </motion.div>
        <div className="border-t">
          <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Commercial Cleaning Associates. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Insurance & Bonding
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default BoutiqueCleaningWebsite; 