import { useState, useEffect } from "react";
import { Service } from "./types";
import { SERVICES, STATS, WHY_CHOOSE_US, FOUNDERS } from "./data";
import { LucideIcon } from "./components/LucideIcon";
import { ServiceModal } from "./components/ServiceModal";
import { SolarEstimator } from "./components/SolarEstimator";
import { ProcessSection } from "./components/ProcessSection";
import { TestimonialCarousel } from "./components/TestimonialCarousel";
import { QuoteForm } from "./components/QuoteForm";
import { MaterialRequestForm } from "./components/MaterialRequestForm";
import { motion } from "motion/react";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive global bindings
  const [activeServiceModal, setActiveServiceModal] = useState<Service | null>(null);
  const [selectedQuoteService, setSelectedQuoteService] = useState<string>("");
  const [passedSolarEstimate, setPassedSolarEstimate] = useState<string>("");
  const [activeProjectImage, setActiveProjectImage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Quick navigation handlers
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handler to link service selection in details modal instantly to quote form below
  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setSelectedQuoteService(serviceTitle);
    scrollToSection("quote-section");
  };

  // Handler to link estimate calculations immediately to contact form
  const handleApplySolarEstimate = (estimateLog: string) => {
    setPassedSolarEstimate(estimateLog);
    setSelectedQuoteService("House & Industrial Solar Setup");
    scrollToSection("quote-section");
  };

  return (
    <div className="min-h-screen flex flex-col text-neutral-800 dot-matrix-bg">
      
      {/* ================= STICKY HEADER & NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-neutral-200 py-3"
            : "bg-white/80 backdrop-blur-sm border-b border-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo design */}
          <button
            onClick={() => scrollToSection("hero-section")}
            className="flex items-center gap-3.5 text-left group cursor-pointer"
          >
            {/* Custom brand logo image */}
            <div className="w-10 h-10 bg-white border border-neutral-200 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-all duration-300">
              <img
                src="https://imgur.com/jFoLUBM.png"
                alt="ANIOBA Logo"
                className="h-full w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="pl-1">
              <div className="font-extrabold text-sm sm:text-base tracking-widest text-[#0A0A0A] flex items-center gap-1.5 leading-none font-display uppercase">
                ANIOBA
                <span className="inline-block w-2.5 h-2.5 bg-[#F59E0B] rotate-45" />
              </div>
              <span className="text-[8px] sm:text-[9.5px] font-bold text-neutral-500 uppercase tracking-widest font-mono block mt-1">
                Multipurpose Global Ltd
              </span>
            </div>
          </button>

          {/* Desktop Nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { label: "Home", target: "hero-section" },
              { label: "About", target: "about-section" },
              { label: "Services", target: "services-section" },
              { label: "Solar Showcase", target: "solar-section" },
              { label: "Projects", target: "completed-projects-section" },
              { label: "Our Blueprint", target: "process-section" },
              { label: "Reviews", target: "testimonials-section" },
              { label: "Materials Desk", target: "materials-request-section" },
            ].map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToSection(link.target)}
                className="px-3.5 py-2 text-xs font-bold font-mono text-neutral-600 hover:text-[#F59E0B] rounded-none hover:bg-neutral-50 transition-all duration-200 cursor-pointer uppercase tracking-wider"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA / Quick contact */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/2349032791481"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-neutral-100 hover:bg-[#F59E0B]/15 hover:text-[#F59E0B] text-neutral-600 rounded-none border border-neutral-200 transition-colors duration-200"
              title="WhatsApp Operations"
            >
              <LucideIcon name="MessageCircle" size={18} />
            </a>
            <button
              onClick={() => scrollToSection("quote-section")}
              className="px-5 py-2.5 bg-[#0A0A0A] text-white hover:bg-[#F59E0B] hover:text-[#0A0A0A] text-xs font-mono font-bold uppercase tracking-widest rounded-none border border-neutral-800 shadow-sm transition-all duration-300 cursor-pointer"
            >
              <span>Request Quote</span>
            </button>
          </div>

          {/* Mobile responsive buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => scrollToSection("quote-section")}
              className="px-3 py-2 bg-[#0A0A0A] text-white hover:bg-[#F59E0B] hover:text-black text-[10px] font-mono font-extrabold uppercase tracking-widest rounded-none border border-neutral-800 shadow-sm transition-colors cursor-pointer"
            >
              <span>Quote</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-neutral-150 hover:bg-neutral-250 text-neutral-805 rounded-none border border-neutral-300 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <LucideIcon name={mobileMenuOpen ? "X" : "Menu"} size={18} />
            </button>
          </div>

        </div>

        {/* Mobile menu panel dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-neutral-300 shadow-xl overflow-hidden py-4 px-4 space-y-2 animate-fadeIn">
            {[
              { label: "Home", target: "hero-section" },
              { label: "About Anioba", target: "about-section" },
              { label: "Our Services", target: "services-section" },
              { label: "Solar grid dynamic", target: "solar-section" },
              { label: "Projects", target: "completed-projects-section" },
              { label: "Timeline process", target: "process-section" },
              { label: "Client reviews", target: "testimonials-section" },
              { label: "Materials Request Portal", target: "materials-request-section" },
            ].map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToSection(link.target)}
                className="w-full text-left px-4 py-3 text-xs font-extrabold font-mono text-neutral-700 hover:bg-neutral-50 hover:text-[#F59E0B] uppercase tracking-wider rounded-none transition-all duration-150 cursor-pointer block"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 flex items-center gap-2 border-t border-neutral-100">
              <a
                href="https://wa.me/2349032791481"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-100 hover:bg-[#F59E0B]/10 hover:text-[#F59E0B] text-neutral-800 rounded-none border border-neutral-300 text-xs font-bold font-mono uppercase tracking-wider w-1/2"
              >
                <LucideIcon name="MessageCircle" size={14} />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => scrollToSection("quote-section")}
                className="flex items-center justify-center gap-1.5 px-4 py-3 bg-[#0A0A0A] hover:bg-[#F59E0B] text-white hover:text-black rounded-none border border-neutral-800 text-xs font-bold font-mono uppercase tracking-wider w-1/2 cursor-pointer"
              >
                <span>Request Quote</span>
                <LucideIcon name="ArrowRight" size={12} />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ================= HERO SECTION ================= */}
      <header
        id="hero-section"
        className="pt-28 pb-16 sm:py-32 lg:pt-36 lg:pb-32 bg-[#F6F6F6] overflow-hidden relative border-b border-neutral-200"
      >
        {/* Subtle dot-matrix background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0a0a0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-300 text-[10px] font-bold text-neutral-900 font-mono uppercase tracking-widest">
                <span className="flex h-2 w-2 bg-[#F59E0B] rotate-45" />
                Engineering Authority since 2014
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0A0A0A] font-display leading-[1.05] uppercase">
                Powering Your Vision. <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A0A0A] via-[#F59E0B] to-[#F59E0B]/80">
                  Building Your Future.
                </span>
              </h1>

              {/* Subheadline paragraph */}
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl font-sans">
                ANIOBA Multipurpose Global Ltd delivers reliable electrical, solar, construction, and contracting solutions for homes, industries, and commercial projects across structural frameworks.
              </p>

              {/* Badges / Micro bullet proofs */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: "ShieldCheck", text: "REGISTERED & CERTIFIED" },
                  { icon: "Award", text: "RELIABLE SOLUTIONS" },
                  { icon: "CheckCircle2", text: "QUALITY ASSURED" },
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-2 p-3 bg-white border border-neutral-200 border-l-2 border-l-[#F59E0B] rounded-none"
                  >
                    <span className="text-[#F59E0B] shrink-0 mt-0.5">
                      <LucideIcon name={badge.icon} size={13} />
                    </span>
                    <span className="text-[9.5px] font-extrabold text-neutral-700 tracking-wider font-mono text-center sm:text-left leading-tight">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => scrollToSection("quote-section")}
                  className="px-7 py-3.5 bg-[#0A0A0A] hover:bg-[#F59E0B] text-white hover:text-black font-bold font-mono text-xs uppercase tracking-widest rounded-none shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Spec Quote</span>
                  <LucideIcon name="ArrowRight" size={14} />
                </button>
                <button
                  onClick={() => scrollToSection("services-section")}
                  className="px-7 py-3.5 bg-white hover:bg-neutral-100 text-neutral-805 border border-neutral-300 font-bold font-mono text-xs uppercase tracking-widest rounded-none transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Our Service Sectors</span>
                </button>
              </div>

            </div>

            {/* Hero Right Media Design */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Custom modern designer frame offset */}
                <div className="absolute -inset-2 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-none z-0 rotate-1 pointer-events-none" />
                
                {/* Main Hero Photo Card */}
                <div className="rounded-none border border-neutral-300 overflow-hidden shadow-xl relative bg-white aspect-[4/3] sm:aspect-[4/3] z-10">
                  <img
                    src="https://imgur.com/zQicnQF.png"
                    alt="Electrical Engineer doing solar maintenance"
                    className="w-full h-full object-cover opacity-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Floating Widget 1: Live performance counter */}
                <div className="absolute -bottom-4 -left-4 bg-white p-3.5 rounded-none border border-neutral-300 shadow-xl flex items-center gap-3 z-20 animate-bounce" style={{ animationDuration: "6s" }}>
                  <div className="h-9 w-9 bg-neutral-50 border border-neutral-200 text-[#F59E0B] rotate-45 flex items-center justify-center shrink-0">
                    <div className="-rotate-45">
                      <LucideIcon name="Activity" size={16} />
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase font-bold tracking-widest font-mono text-neutral-400">
                      Live Project Efficiency
                    </div>
                    <div className="text-xs font-extrabold font-mono text-neutral-800">
                      98.4% Solar Yield
                    </div>
                  </div>
                </div>

                {/* Floating Widget 2: solid warranty */}
                <div className="absolute -top-4 -right-4 bg-[#0A0A0A] text-white p-3.5 rounded-none border border-neutral-850 shadow-xl flex items-center gap-3 z-20">
                  <div className="h-9 w-9 bg-[#F59E0B] text-black rotate-45 flex items-center justify-center shrink-0">
                    <div className="-rotate-45">
                      <LucideIcon name="Award" size={16} className="text-black" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[8.5px] uppercase font-bold tracking-widest font-mono text-neutral-400">
                      Product Sourcing
                    </div>
                    <div className="text-xs font-bold text-[#F59E0B] uppercase font-mono">
                      12+ Yr Warranty
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ================= ABOUT US ================= */}
      <section
        id="about-section"
        className="py-16 sm:py-24 bg-white border-y border-neutral-200 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Media (Overlay/Two-image Layout) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md">
                
                {/* Sharp background border layouts */}
                <div className="absolute -bottom-4 -left-4 w-2/3 h-2/3 border border-neutral-350 -z-10" />
                <div className="absolute -top-4 -right-4 w-2/3 h-2/3 border border-[#F59E0B]/55 -z-10" />

                {/* Photo 1: Civil engineering site progress */}
                <div className="rounded-none overflow-hidden shadow-lg border border-neutral-350 aspect-square w-4/5 bg-neutral-100">
                  <img
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80"
                    alt="Contracting project supervisor with safety helmet"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Photo 2: Wiring assembly installation */}
                <div className="absolute bottom-[-15px] right-0 rounded-none overflow-hidden shadow-xl border-4 border-white aspect-video w-3/5 bg-neutral-150">
                  <img
                    src="https://imgur.com/hSkz64y.png"
                    alt="Modern house high voltage cables and testing"
                    className="w-full h-full object-cover h-full"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* EST. stamp */}
                <div className="absolute -top-3 left-6 px-3 py-1.5 bg-[#0A0A0A] text-[#F59E0B] border border-neutral-800 rounded-none shadow-md font-mono text-[10px] font-bold uppercase tracking-widest">
                  EST. 2014
                </div>

              </div>
            </div>

            {/* Right text details */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold text-[#F59E0B] uppercase tracking-widest font-mono">
                  Corporate Statement
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#0A0A0A] tracking-tight uppercase">
                  Your Partner in Power & Construction Excellence
                </h2>
              </div>

              <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-sans font-medium border-l-4 border-[#F59E0B] pl-4 italic">
                Anioba Multipurpose Global Ltd is built on the belief that structures should outlast their creators. Whether we are engineering power systems for schools, constructing barracks for those who protect the nation, or designing modern spaces, we bring an uncompromising standard of excellence. We are bigger, legally stronger, and fully equipped to bring your vision to life.
              </p>

              {/* Three key commitments */}
              <div className="space-y-4 pt-2">
                {[
                  {
                    title: "End-to-End Civil & Energy Sourcing",
                    desc: "We own the complete process — from mapping initial AutoCAD sketches to supplying original heavy fixtures and pouring high-test cement foundations.",
                  },
                  {
                    title: "Exceptional Safety Certifications",
                    desc: "Electrical installations carry extreme risks. Our personnel operate under rigorous isolation standards, insulation testing protocols, and building safety codes.",
                  },
                  {
                    title: "Transparent & Accountable Operations",
                    desc: "No hidden fees or shifting schedule estimates. We run realistic feasibility studies, providing clear itemized invoices so you know exactly where every Naira goes.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-none bg-neutral-50/70 border border-neutral-200 hover:bg-white hover:border-neutral-350 transition-all duration-150">
                    <div className="h-6 w-6 rounded-none bg-[#0A0A0A] text-[#F59E0B] border border-neutral-805 rotate-45 flex items-center justify-center shrink-0 text-[10px] font-extrabold font-mono">
                      <div className="-rotate-45">
                        0{idx + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-neutral-900 font-mono uppercase tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Button link to scroll to contact */}
              <div className="pt-2">
                <button
                  onClick={() => scrollToSection("quote-section")}
                  className="px-6 py-3.5 bg-[#0A0A0A] text-white hover:bg-[#F59E0B] hover:text-black text-xs font-mono font-bold uppercase tracking-widest rounded-none shadow-md transition-all duration-300 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Connect With Our Engineers</span>
                  <LucideIcon name="ArrowRight" size={14} />
                </button>
              </div>

            </div>

          </div>

          {/* ================= MISSION & VISION ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 pt-16 border-t border-neutral-200" id="mission-vision">
            
            {/* Mission Card */}
            <div className="p-6 sm:p-8 bg-neutral-50 border-l-4 border-[#F59E0B] border-y border-r border-neutral-250 relative group overflow-hidden" id="mission-statement">
              <div className="absolute top-0 right-0 w-24 h-24 bg-neutral-100/50 rounded-none rotate-45 translate-x-12 -translate-y-12 -z-10 transition-transform group-hover:scale-110 duration-300" />
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#0A0A0A] text-[#F59E0B] rounded-none rotate-45 flex items-center justify-center shrink-0">
                  <div className="-rotate-45">
                    <LucideIcon name="Award" size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold font-display text-neutral-900 uppercase tracking-tight">
                    Our Mission
                  </h3>
                  <p className="text-xs font-semibold text-[#F59E0B] uppercase font-mono tracking-wider mt-1">
                    Engineered for Absolute Integrity
                  </p>
                  <p className="text-sm text-neutral-600 mt-3 leading-relaxed font-sans">
                    To supply premium materials, design bulletproof solar networks, and deliver elite site contracting with absolute transparency, safety code audits, and certified craftsmanship that stands the test of generations.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="p-6 sm:p-8 bg-neutral-50 border-l-4 border-[#0A0A0A] border-y border-r border-neutral-250 relative group overflow-hidden" id="vision-statement">
              <div className="absolute top-0 right-0 w-24 h-24 bg-neutral-100/50 rounded-none rotate-45 translate-x-12 -translate-y-12 -z-10 transition-transform group-hover:scale-110 duration-300" />
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neutral-200 text-[#0A0A0A] border border-neutral-300 rounded-none rotate-45 flex items-center justify-center shrink-0">
                  <div className="-rotate-45">
                    <LucideIcon name="Compass" size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold font-display text-neutral-900 uppercase tracking-tight">
                    Our Vision
                  </h3>
                  <p className="text-xs font-semibold text-neutral-500 uppercase font-mono tracking-wider mt-1">
                    Pioneering Next-Gen Power
                  </p>
                  <p className="text-sm text-neutral-600 mt-3 leading-relaxed font-sans">
                    To be recognized as Nigeria's most trusted multipurpose engineering partner, setting ultimate benchmarks in renewable energy deployment, architectural drafting, and safe real-estate development.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ================= GROUP FOUNDERS DEVELOPMENT ================= */}
          <div className="mt-20 pt-16 border-t border-neutral-200" id="founders-showcase">
            <div className="max-w-3xl space-y-2 mb-12">
              <span className="text-[10px] font-extrabold text-[#F59E0B] uppercase tracking-widest font-mono">
                Leadership Directory
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold font-display text-[#0A0A0A] tracking-tight uppercase">
                The Founders & Executive Directors
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans">
                Our firm is steered by industry-hardened professionals committed to uncompromising structural guidelines, logistics operations, and certified electrical compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FOUNDERS.map((founder) => (
                <div 
                  key={founder.id}
                  className="bg-neutral-50 border border-neutral-200 hover:border-neutral-400 rounded-none p-5 relative group transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                  id={`founder-${founder.id}`}
                >
                  <div>
                    {/* Founder Photo layout with absolute precision corners */}
                    <div className="relative aspect-square w-full bg-neutral-250 overflow-hidden mb-5 border border-neutral-300/85">
                      {/* Blueprint angle grid overlay styling */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-neutral-900 text-white font-mono text-[8px] font-bold tracking-widest uppercase z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                        DIRECTOR PROFILE_0{founder.id}
                      </div>
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 flex flex-col justify-end h-20">
                        <p className="text-[9px] font-mono font-bold tracking-widest text-[#F59E0B] uppercase">
                          ANIOBA BOARD MEMBERS
                        </p>
                      </div>
                    </div>

                    {/* Bio details */}
                    <h4 className="text-base font-extrabold font-display text-neutral-900 uppercase tracking-tight">
                      {founder.name}
                    </h4>
                    <p className="text-[10px] font-extrabold text-[#F59E0B] uppercase font-mono tracking-wider mt-1">
                      {founder.designation}
                    </p>
                    <p className="text-xs text-neutral-600 mt-3 leading-relaxed font-sans">
                      {founder.bio}
                    </p>
                  </div>

                  {/* Corporate signet seal icon or label */}
                  <div className="mt-5 pt-4 border-t border-dashed border-neutral-200 flex items-center justify-between text-neutral-400 font-mono text-[9px]">
                    <span className="font-bold">STATUS: ACTIVE // EXECUTIVE</span>
                    <LucideIcon name="ShieldCheck" size={12} className="text-[#F59E0B]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= SERVICES GRID SECTION ================= */}
      <section
        id="services-section"
        className="py-16 sm:py-24 bg-neutral-50/50 relative border-b border-neutral-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Heading */}
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
            <span className="text-[10px] font-extrabold text-[#F59E0B] uppercase tracking-widest font-mono">
              Professional Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-neutral-900 tracking-tight uppercase">
              Elite Technical & Contracting Services
            </h2>
            <p className="text-xs sm:text-sm text-neutral-550 max-w-2xl mx-auto font-sans leading-relaxed">
              We bring disciplined on-site craftsmanship, certified electrical expertise, and cost-controlled engineering to every site. Click any card to explore deep technical specifications.
            </p>
          </div>

          {/* Symmetrical responsive Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                onClick={() => setActiveServiceModal(service)}
                className="bg-white rounded-none border border-neutral-300 overflow-hidden shadow-sm hover:shadow-lg hover:border-neutral-500 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Photo Banner with tag */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
                    
                    {/* Icon wrapper badge */}
                    <div className="absolute bottom-4 left-4 p-2.5 bg-[#F59E0B] text-black rotate-45 shadow-lg flex items-center justify-center">
                      <div className="-rotate-45">
                        <LucideIcon name={service.iconName} size={15} />
                      </div>
                    </div>
                  </div>

                  {/* Core Card Info */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-base font-extrabold font-mono uppercase tracking-wide text-neutral-900 group-hover:text-[#F59E0B] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Specs button */}
                <div className="px-6 pb-6 pt-2 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[9.5px] font-extrabold text-neutral-400 uppercase font-mono tracking-widest">
                    Full Execution Standards
                  </span>
                  <span className="text-[#F59E0B] group-hover:translate-x-1 transition-transform duration-250 flex items-center gap-1 text-[10px] font-bold font-mono uppercase tracking-widest">
                    <span>Specs</span>
                    <LucideIcon name="ChevronRight" size={12} className="stroke-[2.5]" />
                  </span>
                </div>

              </div>
            ))}

            {/* Custom Call Action card */}
            <div className="bg-[#0A0A0A] text-white rounded-none p-6 border border-neutral-850 flex flex-col justify-between relative overflow-hidden group shadow-lg">
              <div className="space-y-4 relative z-10">
                <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-none w-fit hover:border-[#F59E0B] transition-colors rotate-45 flex items-center justify-center mb-4">
                  <div className="-rotate-45">
                    <LucideIcon name="Sliders" size={18} className="text-[#F59E0B]" />
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold font-mono uppercase tracking-wide leading-tight">
                  Need an unlisted customized engineering layout?
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  We formulate custom steel framing setups, solar hybrid batteries, deep earth grounding calculations, and specific grid panels.
                </p>
              </div>

              <div className="pt-6 relative z-10">
                <button
                  onClick={() => scrollToSection("quote-section")}
                  className="px-5 py-3 bg-[#F59E0B] text-black text-xs font-bold font-mono uppercase tracking-widest rounded-none hover:bg-white hover:text-black shadow-md flex items-center gap-1.5 transition-colors cursor-pointer w-full text-center justify-center"
                >
                  <span>Build Custom Spec Request</span>
                  <LucideIcon name="ArrowRight" size={12} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SOLAR SHOWCASE & ESTIMATOR ================= */}
      <section
        id="solar-section"
        className="py-16 sm:py-24 bg-[#0F0F0F] text-white relative overflow-hidden border-b border-neutral-900"
      >
        {/* Subtle engineering grid background */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            {/* Title / Description Left */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-extrabold text-[#F59E0B] uppercase tracking-widest font-mono">
                Clean Renewable Grid
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight uppercase">
                Anioba High-Yield Smart Solar Solutions
              </h2>
              <p className="text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed font-sans">
                Empower your estate, farm, or production line with absolute utility grid immunity. We specialize in robust hybrid rooftop setups, lithium battery microgrids, and intelligent real-time energy tracking systems.
              </p>
            </div>

            {/* Quick trust metrics Right */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-none hover:border-neutral-700 transition-colors duration-200">
                <div className="text-[#F59E0B] w-8 h-8 rotate-45 border border-neutral-800 bg-neutral-900/50 flex items-center justify-center mb-3">
                  <div className="-rotate-45">
                    <LucideIcon name="Sun" size={16} />
                  </div>
                </div>
                <h4 className="text-sm font-extrabold font-mono uppercase tracking-wide text-white">Zero Bill Shock</h4>
                <p className="text-[11px] text-neutral-400 mt-1 leading-normal font-sans">
                  Lock down fuel inflation costs with 25-yr panel lifecycle yields.
                </p>
              </div>
              <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-none hover:border-neutral-700 transition-colors duration-200">
                <div className="text-[#F59E0B] w-8 h-8 rotate-45 border border-neutral-800 bg-neutral-900/50 flex items-center justify-center mb-3">
                  <div className="-rotate-45">
                    <LucideIcon name="Activity" size={16} />
                  </div>
                </div>
                <h4 className="text-sm font-extrabold font-mono uppercase tracking-wide text-white">Grid Outage Shield</h4>
                <p className="text-[11px] text-neutral-400 mt-1 leading-normal font-sans">
                  Automatic load transfer transfers power seamlessly under 15ms.
                </p>
              </div>
            </div>

          </div>

          {/* Interactive Calculator widget */}
          <SolarEstimator onEstimatorSubmit={handleApplySolarEstimate} />

          {/* Dynamic Statistics counters block */}
          <div className="mt-16 pt-12 border-t border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {STATS.map((stat) => (
              <div
                key={stat.id}
                className="text-center md:text-left space-y-1.5 p-5 bg-neutral-950/40 border border-neutral-850 rounded-none hover:border-[#F59E0B]/55 transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl font-extrabold font-display text-[#F59E0B] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] font-extrabold text-white uppercase tracking-widest font-mono">
                  {stat.label}
                </div>
                <div className="text-[11px] text-neutral-400 leading-normal font-sans">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= STRATEGIC PROJECTS PORTFOLIO ================= */}
      <section
        id="completed-projects-section"
        className="py-16 sm:py-24 bg-neutral-900 text-white relative overflow-hidden border-b border-neutral-950"
      >
        {/* Fine grid overlay for building blueprint feel */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Centered Heading */}
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
            <span className="text-[10px] font-extrabold text-[#F59E0B] uppercase tracking-widest font-mono">
              Operational Proof &amp; Live Sites
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight uppercase">
              Our Strategic Projects Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-2xl mx-auto">
              Inspect physical blueprints, actual construction elevations, and active/completed operations under strict military-standards and structural compliance.
            </p>
          </div>

          <div className="space-y-12 sm:space-y-16">
            
            {/* Featured Showcase Layout (Project 1 - Completed) */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-none p-6 sm:p-8 lg:p-10 relative group">
              
              {/* Top decorative header detail */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-850 pb-6 mb-8 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#F59E0B] animate-pulse" />
                  <span className="font-bold uppercase tracking-wider text-[#F59E0B]">
                    PROJECT ID: ANIOBA_134BTN_LGS
                  </span>
                </div>
                <div className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold bg-neutral-900/60 px-2 py-0.5 border border-neutral-850">
                  STATUS: 100% COMPLETE &amp; HANDED OVER
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Project Details */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="text-[9px] font-extrabold text-[#F59E0B] uppercase tracking-wider font-mono">
                      MILITARY INFRASTRUCTURE SCHEME
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight uppercase mt-1 leading-tight">
                      Semi-Detached Non-Commissioned Officers' Housing
                    </h3>
                    <div className="flex items-center gap-2 mt-3 text-[#F59E0B]">
                      <LucideIcon name="MapPin" size={14} />
                      <span className="text-xs font-medium font-sans text-neutral-300">
                        134 Battalion, Odogunyan, Ikorodu, Lagos State
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    We successfully executed the turnkey masonry, structural steel layout, electrical distribution arrays, and finishings for this military housing unit. Built from premium-grade sourced materials to withstand intense institutional operational loads, the project completed full structural wind-bearing, foundation density, and final electrical safety audits with 100% compliance.
                  </p>

                  {/* Key specs grid */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-dashed border-neutral-800">
                    <div className="p-3 bg-neutral-900/50 border border-neutral-850">
                      <p className="text-[9px] font-mono font-bold text-neutral-500 uppercase">
                        Operational Area
                      </p>
                      <p className="text-xs font-bold font-mono text-white mt-0.5">
                        134 Battalion HQ Block
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-900/50 border border-neutral-850">
                      <p className="text-[9px] font-mono font-bold text-neutral-500 uppercase">
                        Execution Period
                      </p>
                      <p className="text-xs font-bold font-mono text-white mt-0.5">
                        120 Days (Handover On-Time)
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-900/50 border border-neutral-850">
                      <p className="text-[9px] font-mono font-bold text-neutral-500 uppercase">
                        Auditor Rating
                      </p>
                      <p className="text-xs font-bold font-mono text-[#F59E0B] mt-0.5">
                        GRADE-A Compliance
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-900/50 border border-neutral-850">
                      <p className="text-[9px] font-mono font-bold text-neutral-500 uppercase">
                        Masonry Strength
                      </p>
                      <p className="text-xs font-bold font-mono text-white mt-0.5">
                        C30/37 Concrete Density
                      </p>
                    </div>
                  </div>

                  {/* Trust guarantee seal */}
                  <div className="flex items-center gap-3.5 p-3.5 bg-neutral-900 border-l-2 border-[#F59E0B] border-y border-r border-neutral-850">
                    <LucideIcon name="ShieldCheck" size={18} className="text-[#F59E0B]" />
                    <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                      Designed and audited under direct supervision of our Planning and Operations Directorate.
                    </p>
                  </div>
                </div>

                {/* Right Column: Photos Layout */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Image 1 Card */}
                  <div 
                    className="bg-neutral-900 border border-neutral-800 p-3 hover:border-neutral-550 group/img transition-all duration-300 relative cursor-pointer"
                    onClick={() => setActiveProjectImage("https://imgur.com/KfSz51J.png")}
                    id="project-image-h1"
                  >
                    <p className="text-[9px] font-mono font-bold text-neutral-500 mb-2 flex justify-between items-center bg-neutral-950 p-1.5 border border-neutral-850">
                      <span>ELEVATION ANGLE_01 // COMPLETED BLOCK</span>
                      <span className="text-[#F59E0B]">ZOOM IMAGE</span>
                    </p>
                    <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden">
                      <img 
                        src="https://imgur.com/KfSz51J.png" 
                        alt="134 Battalion Odogunyan Project Angle 1" 
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover/img:bg-transparent transition-colors pointer-events-none" />
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-sans text-neutral-400">
                      <span className="font-mono text-[9px] text-[#F59E0B]">NCO BLOCK FRONTAGE</span>
                      <LucideIcon name="Eye" size={12} className="text-neutral-500 group-hover/img:text-[#F59E0B] transition-colors" />
                    </div>
                  </div>

                  {/* Image 2 Card */}
                  <div 
                    className="bg-neutral-900 border border-neutral-800 p-3 hover:border-neutral-550 group/img transition-all duration-300 relative cursor-pointer"
                    onClick={() => setActiveProjectImage("https://imgur.com/Ln3CDdV.png")}
                    id="project-image-h2"
                  >
                    <p className="text-[9px] font-mono font-bold text-neutral-500 mb-2 flex justify-between items-center bg-neutral-950 p-1.5 border border-neutral-850">
                      <span>ELEVATION ANGLE_02 // COMPLETED BLOCK</span>
                      <span className="text-[#F59E0B]">ZOOM IMAGE</span>
                    </p>
                    <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden">
                      <img 
                        src="https://imgur.com/Ln3CDdV.png" 
                        alt="134 Battalion Odogunyan Project Angle 2" 
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover/img:bg-transparent transition-colors pointer-events-none" />
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-sans text-neutral-400">
                      <span className="font-mono text-[9px] text-[#F59E0B]">NCO BLOCK COMPLEMENTARY</span>
                      <LucideIcon name="Eye" size={12} className="text-neutral-500 group-hover/img:text-[#F59E0B] transition-colors" />
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Featured Showcase Layout (Project 2 - Ongoing) */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-none p-6 sm:p-8 lg:p-10 relative group">
              
              {/* Top decorative header detail */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-850 pb-6 mb-8 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse animate-duration-1000" />
                  <span className="font-bold uppercase tracking-wider text-sky-400">
                    PROJECT ID: ANIOBA_30SLD_ABJ
                  </span>
                </div>
                <div className="text-sky-400 uppercase tracking-widest text-[10px] font-bold bg-neutral-900/60 px-2 py-0.5 border border-neutral-850 animate-pulse">
                  STATUS: ONGOING OPERATIONS // ACTIVE SITE
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Project Details */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="text-[9px] font-extrabold text-[#F59E0B] uppercase tracking-wider font-mono">
                      MILITARY ACCOMMODATION PALETTE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white tracking-tight uppercase mt-1 leading-tight">
                      30 Soldiers Hostel Development
                    </h3>
                    <div className="flex items-center gap-2 mt-3 text-sky-400">
                      <LucideIcon name="MapPin" size={14} />
                      <span className="text-xs font-medium font-sans text-neutral-300">
                        Tunga Maji Extension Anagada, Abuja (FCT)
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    We are actively building this 30-capacity Soldiers Hostel under tight structural guidelines. The scope entails the implementation of robust concrete blockwork, advanced foundation layouts, critical subgrade preparation, reinforcing tie-beams, and modern mechanical, electrical, and plumbing engineering interfaces suitable for housing personnel.
                  </p>

                  {/* Key specs grid */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-dashed border-neutral-800">
                    <div className="p-3 bg-neutral-900/50 border border-neutral-850">
                      <p className="text-[9px] font-mono font-bold text-neutral-500 uppercase">
                        Structure Type
                      </p>
                      <p className="text-xs font-bold font-mono text-white mt-0.5">
                        Multi-Bed Hostelry
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-900/50 border border-neutral-850">
                      <p className="text-[9px] font-mono font-bold text-neutral-500 uppercase">
                        Active Stage
                      </p>
                      <p className="text-xs font-bold font-mono text-white mt-0.5">
                        Framing &amp; Lintel Block
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-900/50 border border-neutral-850">
                      <p className="text-[9px] font-mono font-bold text-neutral-500 uppercase">
                        Material Quality
                      </p>
                      <p className="text-xs font-bold font-mono text-sky-400 mt-0.5">
                        High Density Cast
                      </p>
                    </div>
                    <div className="p-3 bg-neutral-900/50 border border-neutral-850">
                      <p className="text-[9px] font-mono font-bold text-neutral-500 uppercase">
                        Target Duration
                      </p>
                      <p className="text-xs font-bold font-mono text-white mt-0.5">
                        On-Schedule Delivery
                      </p>
                    </div>
                  </div>

                  {/* Trust guarantee seal */}
                  <div className="flex items-center gap-3.5 p-3.5 bg-neutral-900 border-l-2 border-sky-400 border-y border-r border-neutral-850">
                    <LucideIcon name="ShieldCheck" size={18} className="text-sky-400" />
                    <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                      Rigid oversight provided by Mr. Ismail Ayoyinka Adebayo (Planning &amp; Technical Director).
                    </p>
                  </div>
                </div>

                {/* Right Column: Single Photo Layout */}
                <div className="lg:col-span-7">
                  
                  {/* Image Card */}
                  <div 
                    className="bg-neutral-900 border border-neutral-800 p-3 hover:border-sky-400 group/img transition-all duration-300 relative cursor-pointer"
                    onClick={() => setActiveProjectImage("https://imgur.com/weoOJtA.png")}
                    id="project-image-has1"
                  >
                    <p className="text-[9px] font-mono font-bold text-neutral-500 mb-2 flex justify-between items-center bg-neutral-950 p-1.5 border border-neutral-850">
                      <span>ELEVATION ANGLE_01 // ACTIVE CONSTRUCT</span>
                      <span className="text-sky-400">ZOOM IMAGE</span>
                    </p>
                    <div className="relative aspect-[16/10] bg-neutral-950 overflow-hidden">
                      <img 
                        src="https://imgur.com/weoOJtA.png" 
                        alt="30 Soldiers Hostel Project at Tunga Maji Extension Anagada" 
                        className="w-full h-full object-cover group-hover/img:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover/img:bg-transparent transition-colors pointer-events-none" />
                      
                      {/* Active green scan marker */}
                      <div className="absolute bottom-3 left-3 bg-neutral-950/90 border border-neutral-800 text-[9px] font-mono uppercase px-2 py-1 text-white flex items-center gap-2">
                        <span className="h-1.5 w-1.5 bg-sky-400 rounded-full animate-ping" />
                        <span>TUNGA MAJI FIELD STATION</span>
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-[11px] font-sans text-neutral-400">
                      <span className="font-mono text-[9px] text-sky-400">HOSTEL STRUCTURE FOUNDATION &amp; WORKFORCE ASSEMBLY</span>
                      <LucideIcon name="Eye" size={12} className="text-neutral-500 group-hover/img:text-sky-400 transition-colors" />
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section
        id="why-choose-us-section"
        className="py-16 sm:py-24 bg-white relative border-b border-neutral-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Heading */}
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
            <span className="text-[10px] font-extrabold text-[#F59E0B] uppercase tracking-widest font-mono">
              Our Value Standard
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-neutral-900 tracking-tight uppercase">
              Built on Regulatory Compliance & Trust
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-sans max-w-2xl mx-auto">
              Anioba brings standard-certified performance and material safety, eliminating low-capacity shortcuts.
            </p>
          </div>

          {/* 6-element Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-white border border-neutral-200 rounded-none shadow-sm hover:shadow-md hover:border-neutral-400 transition-all duration-200 space-y-3"
              >
                <div className="p-2.5 bg-neutral-50 border border-neutral-250 text-[#F59E0B] text-[#F59E0B] rotate-45 w-9 h-9 flex items-center justify-center mb-4">
                  <div className="-rotate-45">
                    <LucideIcon name={item.iconName} size={15} />
                  </div>
                </div>
                <h3 className="text-sm font-extrabold font-mono uppercase tracking-wide text-neutral-900 pt-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= PROJECT PROCESS FLOW ================= */}
      <section
        id="process-section"
        className="py-16 sm:py-24 bg-neutral-50/50 border-t border-b border-neutral-200 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Heading */}
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
            <span className="text-[10px] font-extrabold text-[#F59E0B] uppercase tracking-widest font-mono">
              Engineering Pipeline
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-neutral-900 tracking-tight uppercase">
              Standard 5-Step Project Blueprint
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed">
              From initial mapping meetings to structural handover diagnostics, we keep work clean, timely, and secure. Click any stage below.
            </p>
          </div>

          {/* Interactive timeline module */}
          <ProcessSection />

        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section
        id="testimonials-section"
        className="py-16 sm:py-24 bg-white relative border-b border-neutral-200"
      >
        {/* Subtle background overlay */}
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-neutral-50/20 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Heading */}
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-[10px] font-extrabold text-[#F59E0B] uppercase tracking-widest font-mono">
              Client Reports
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-neutral-900 tracking-tight uppercase">
              Trusted by Corporate & Business Owners
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed">
              Read how developers, architects, and warehouse operations specialists evaluate our performance.
            </p>
          </div>

          {/* Testimonial slider */}
          <TestimonialCarousel />

        </div>
      </section>

      {/* ================= REQUEST MATERIALS SECTION ================= */}
      <MaterialRequestForm />

      {/* ================= CONTACT & ALLOCATION FORM ================= */}
      <section
        id="quote-section"
        className="py-16 sm:py-24 bg-neutral-50/60 relative border-t border-neutral-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side details */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold text-[#F59E0B] uppercase tracking-widest font-mono">
                  Get in Touch
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-neutral-900 tracking-tight leading-tight uppercase">
                  Secure Site Consultation
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans">
                  Our scheduling staff processes project scopes instantly. Connect with our corporate office directly via standard channels, or submit the digital quote system.
                </p>
              </div>

              {/* Direct Info list details */}
              <div className="space-y-4 pt-2">
                
                {/* Cell 1: Telephone */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-none border border-neutral-200 shadow-sm hover:border-neutral-350 transition-colors">
                  <div className="p-2.5 bg-neutral-50 border border-neutral-250 text-[#F59E0B] rotate-45 w-9 h-9 flex items-center justify-center shrink-0 mt-1">
                    <div className="-rotate-45">
                      <LucideIcon name="Phone" size={14} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[9.5px] font-extrabold text-neutral-400 uppercase tracking-widest font-mono">
                      Operations Support Mobile
                    </h4>
                    <a
                      href="tel:+2349032791481"
                      className="text-sm sm:text-base font-bold text-neutral-800 hover:text-[#F59E0B] mt-1 block transition-colors"
                    >
                      +234 (0) 903 279 1481
                    </a>
                    <p className="text-[11px] text-neutral-405 mt-0.5 font-sans">
                      Mon - Sat, 8:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

                {/* Cell 2: Corporate Email */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-none border border-neutral-200 shadow-sm hover:border-neutral-350 transition-colors">
                  <div className="p-2.5 bg-neutral-50 border border-neutral-250 text-[#F59E0B] rotate-45 w-9 h-9 flex items-center justify-center shrink-0 mt-1">
                    <div className="-rotate-45">
                      <LucideIcon name="Mail" size={14} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[9.5px] font-extrabold text-neutral-400 uppercase tracking-widest font-mono">
                      Corporate Contracting Mail
                    </h4>
                    <a
                      href="mailto:aniobagloballtd@zohomail.com"
                      className="text-sm sm:text-base font-bold text-neutral-800 hover:text-[#F59E0B] mt-1 block transition-colors"
                    >
                      aniobagloballtd@zohomail.com
                    </a>
                    <p className="text-[11px] text-neutral-405 mt-0.5 font-sans">
                      Typical proposal draft reply within 4 hours.
                    </p>
                  </div>
                </div>

                {/* Cell 3: Physical Office Address */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-none border border-neutral-200 shadow-sm hover:border-neutral-350 transition-colors">
                  <div className="p-2.5 bg-neutral-50 border border-neutral-250 text-[#F59E0B] rotate-45 w-9 h-9 flex items-center justify-center shrink-0 mt-1">
                    <div className="-rotate-45">
                      <LucideIcon name="MapPin" size={14} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[9.5px] font-extrabold text-neutral-400 uppercase tracking-widest font-mono">
                      Corporate Headquarters
                    </h4>
                    <p className="text-sm font-semibold text-neutral-800 mt-1 leading-normal font-sans">
                      5, ifelodun street off sunville school, Ikorodu, Lagos state
                    </p>
                    <p className="text-[11px] text-neutral-405 mt-0.5 font-sans">
                      Fully registered commercial business unit.
                    </p>
                  </div>
                </div>

              </div>

              {/* Fast WhatsApp Connect Button */}
              <div className="p-5 bg-neutral-900 text-white rounded-none border border-neutral-800 flex items-center justify-between gap-4 animate-pulse-slow">
                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-[#F59E0B] font-mono uppercase tracking-wide flex items-center gap-1.5">
                    <LucideIcon name="MessageCircle" size={14} className="text-[#F59E0B] shrink-0" />
                    <span>Real-time Chat Link</span>
                  </h4>
                  <p className="text-[11px] text-neutral-400 leading-normal max-w-[240px] font-sans">
                    Need immediate emergency electrical repairs or fast cable delivery quotes? Chat right away with our engineers.
                  </p>
                </div>
                <a
                  href="https://wa.me/2349032791481?text=Hello%20ANIOBA%20Multipurpose%20Global%20Ltd!%20I%20have%20an%20urgent%20project%20inquiry%20and%2520would%252520like%252520to%252520discuss."
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 bg-[#F59E0B] hover:bg-white text-black hover:text-black rounded-none text-xs font-mono font-extrabold uppercase tracking-widest transition-colors shrink-0 shadow-md"
                >
                  <span>Chat offline</span>
                  <LucideIcon name="ExternalLink" size={11} />
                </a>
              </div>

            </div>

            {/* Right side form block */}
            <div className="lg:col-span-7">
              <QuoteForm
                initialServiceSelection={selectedQuoteService}
                solarCalculatorEstimate={passedSolarEstimate}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#0A0A0A] text-neutral-400 py-12 sm:py-16 border-t border-neutral-800 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            
            {/* Corporate Summary Card */}
            <div className="space-y-4">
              <button
                onClick={() => scrollToSection("hero-section")}
                className="flex items-center gap-4 text-left group cursor-pointer text-white font-mono"
              >
                <div className="w-8 h-8 bg-white border border-neutral-805 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://imgur.com/jFoLUBM.png"
                    alt="ANIOBA Logo"
                    className="h-full w-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="font-extrabold text-xs tracking-wider flex items-center gap-1 leading-none uppercase">
                    ANIOBA
                    <span className="inline-block w-1.5 h-1.5 bg-[#F59E0B]" />
                  </div>
                  <span className="text-[9px] font-extrabold text-neutral-500 uppercase tracking-widest font-mono block mt-1">
                    Multipurpose Global Ltd
                  </span>
                </div>
              </button>

              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Licensed power grid developers, solar engineers, and high-performance civil contractors committed to rigorous material standards and absolute customer transparency.
              </p>

              {/* Social items links */}
              <div className="flex gap-2 pt-2">
                {["Facebook", "LinkedIn", "Instagram"].map((social) => (
                  <button
                    key={social}
                    className="px-2.5 py-1.5 bg-neutral-900 hover:bg-[#F59E0B] hover:text-black rounded-none text-[10px] font-extrabold font-mono uppercase text-neutral-450 border border-neutral-800 transition-colors cursor-pointer"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick sectors */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-white font-mono">
                Project Sectors
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400 font-sans">
                {[
                  "Industrial Wiring",
                  "Estate Solar Grids",
                  "Commercial Consultation",
                  "Heavy Switchgears",
                  "Residential Finishes",
                ].map((item) => (
                  <li key={item} className="hover:text-[#F59E0B] transition-colors">
                    <button onClick={() => scrollToSection("services-section")} className="cursor-pointer text-left text-neutral-400 hover:text-[#F59E0B] font-sans">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation links */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-white font-mono">
                Corporate Navigation
              </h4>
              <ul className="space-y-2.5 text-xs text-neutral-400 font-sans">
                {[
                  { label: "Partner Portal", target: "hero-section" },
                  { label: "About Achievements", target: "about-section" },
                  { label: "All services", target: "services-section" },
                  { label: "PV Yield Calculator", target: "solar-section" },
                  { label: "Execution timelines", target: "process-section" },
                  { label: "Request Materials Desk", target: "materials-request-section" },
                  { label: "Contact / Booking desk", target: "quote-section" },
                ].map((item) => (
                  <li key={item.label} className="hover:text-[#F59E0B] transition-colors">
                    <button onClick={() => scrollToSection(item.target)} className="cursor-pointer text-left text-neutral-404 hover:text-[#F59E0B] font-sans">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Office address contact indicators */}
            <div className="space-y-4 font-sans">
              <h4 className="text-[10px] uppercase tracking-widest font-extrabold text-white font-mono font-mono">
                Operations Registry
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                RC Number: 9585507 <br />
                Licensed Grid Contractor <br />
                National Construction Council Member
              </p>
              <div className="p-3 bg-neutral-900 border border-neutral-850 rounded-none space-y-1 font-sans">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider block">
                  Help Desk Email
                </span>
                <span className="text-xs font-extrabold text-white block font-mono">
                  aniobagloballtd@zohomail.com
                </span>
              </div>
            </div>

          </div>

          {/* Copyright signature */}
          <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-550 font-sans">
            <div>
              <p>&copy; {new Date().getFullYear()} ANIOBA Multipurpose Global Ltd. All Technical Rights Reserved.</p>
              <p className="text-[11px] text-neutral-500 mt-1">
                Designed &amp; Developed by <span className="text-[#F59E0B] font-mono">Quotients Digital Horizon Ltd</span>
              </p>
            </div>
            <div className="flex gap-4 font-mono text-[9px] uppercase tracking-widest">
              <a href="#about-section" className="hover:text-[#F59E0B] transition-colors font-mono">Privacy Policy</a>
              <span>/</span>
              <a href="#services-section" className="hover:text-[#F59E0B] transition-colors font-mono">Technical Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MODAL DETAIL OVERLAY ================= */}
      <ServiceModal
        service={activeServiceModal}
        onClose={() => setActiveServiceModal(null)}
        onSelectServiceForQuote={handleSelectServiceForQuote}
      />

      {/* ================= LIGHTBOX DYNAMIC INTERACTIVE GALLERY ================= */}
      {activeProjectImage && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fadeIn cursor-pointer"
          onClick={() => setActiveProjectImage(null)}
          id="project-lightbox-overlay"
        >
          <div className="absolute top-4 right-4 z-[10000] flex items-center gap-3">
            <span className="px-2.5 py-1 bg-neutral-900/80 border border-neutral-700 text-white font-mono text-[10px] uppercase font-bold tracking-widest hidden sm:inline-block">
              134 Battalion NCO Housing Project
            </span>
            <button 
              className="p-2.5 bg-[#F59E0B] hover:bg-white text-black transition-colors border border-transparent rounded-none cursor-pointer"
              onClick={() => setActiveProjectImage(null)}
              aria-label="Close lightbox"
            >
              <LucideIcon name="X" size={18} className="stroke-[2.5]" />
            </button>
          </div>
          
          <div 
            className="relative max-w-5xl w-full h-full max-h-[85vh] flex items-center justify-center cursor-default bg-neutral-950 p-1 sm:p-2 border border-neutral-850"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner styling elements */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#F59E0B]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#F59E0B]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#F59E0B]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#F59E0B]" />

            <img
              src={activeProjectImage}
              alt="Project High Resolution Expand View"
              className="max-w-full max-h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

    </div>
  );
}
