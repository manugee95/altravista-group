import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight, Building2, Cog, Package, Layers,
  Award, Shield, Lightbulb, Users, CheckCircle,
  ChevronLeft, ChevronRight, Star, Clock, MapPin, Tag
} from 'lucide-react';
import { usePosts, useTestimonials } from '@/app/hooks/useWordPress';

const HERO_BG = 'https://images.unsplash.com/photo-1637019916030-9f851c2eca13?w=1920&h=1080&fit=crop&auto=format';
const ABOUT_IMG = 'https://images.unsplash.com/photo-1661332628354-3ec604f4411d?w=900&h=700&fit=crop&auto=format';

const subsidiaryCards = [
  {
    icon: Building2,
    name: 'Altravista Resources',
    tagline: 'Civil Engineering & Construction',
    desc: 'Full-service civil engineering consulting and construction management for commercial, residential, and infrastructure projects across Nigeria.',
    href: '/subsidiaries/altravista-resources',
    color: '#5B3E99',
  },
  {
    icon: Cog,
    name: 'Altravista CNC Laser',
    tagline: 'Precision CNC Manufacturing',
    desc: 'State-of-the-art CNC Router, Plasma Cutting, and Fibre Laser Cutting services for industrial and commercial fabrication needs.',
    href: '/subsidiaries/cnc-laser',
    color: '#3B82F6',
  },
  {
    icon: Package,
    name: 'Altravista Abrasive Products',
    tagline: 'Industrial Abrasive Solutions',
    desc: 'Manufacturer and supplier of high-quality cutting discs, grinding wheels, and industrial abrasive products meeting international standards.',
    href: '/subsidiaries/abrasive-products',
    color: '#10B981',
  },
  {
    icon: Layers,
    name: 'Everything Facade',
    tagline: 'Architectural Facade Systems',
    desc: 'Comprehensive building remodeling, facade installation, and architectural facelift solutions that transform commercial and residential properties.',
    href: '/subsidiaries/everything-facade',
    color: '#F59E0B',
  },
];

const services = [
  'Engineering Design & Consultancy',
  'Construction Services',
  'Procurement Services',
  'Project Management',
  'CNC Router Services',
  'CNC Plasma Cutting',
  'CNC Fibre Laser Cutting',
  'Facade Installation',
  'Building Remodeling',
  'Industrial Abrasive Products',
];

const projects = [
  { title: 'Jendol Superstores', cat: 'Commercial', loc: 'Lagos', status: 'Completed', img: 'https://images.unsplash.com/photo-1637393932938-b9c209e67d5c?w=600&h=400&fit=crop&auto=format', tall: true },
  { title: 'Luxury Apartment Complex', cat: 'Residential', loc: 'Victoria Island', status: 'Completed', img: 'https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?w=600&h=350&fit=crop&auto=format', tall: false },
  { title: 'Cubana Entertainment', cat: 'Commercial', loc: 'Abuja', status: 'Completed', img: 'https://images.unsplash.com/photo-1661332628354-3ec604f4411d?w=600&h=350&fit=crop&auto=format', tall: false },
  { title: 'Studio 24 Creative Hub', cat: 'Remodeling', loc: 'Lagos', status: 'Completed', img: 'https://images.unsplash.com/photo-1707823942892-3316eeb091a0?w=600&h=400&fit=crop&auto=format', tall: true },
  { title: 'Container Architecture', cat: 'Innovation', loc: 'Lagos', status: 'Ongoing', img: 'https://images.unsplash.com/photo-1637019916030-9f851c2eca13?w=600&h=350&fit=crop&auto=format', tall: false },
];

const whyUs = [
  { icon: Award, title: 'Quality', desc: 'We adhere to international quality standards across all our divisions, ensuring every project exceeds client expectations.' },
  { icon: Shield, title: 'Integrity', desc: 'Transparent dealings, ethical practices, and honest communication are the foundation of every client relationship we build.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'We continuously invest in cutting-edge technology and engineering solutions to stay ahead of industry developments.' },
  { icon: Users, title: 'Collaboration', desc: 'We work as true partners with our clients, integrating their vision into every decision from concept to completion.' },
  { icon: CheckCircle, title: 'Safety', desc: 'Our HSE framework ensures the safety of workers, clients, and the environment on every project we undertake.' },
];

const stats = [
  { value: 20, suffix: '+', label: 'Projects Delivered' },
  { value: 17, suffix: '+', label: 'Years Combined Experience' },
  { value: 4, suffix: '', label: 'Specialized Companies' },
  { value: 100, suffix: '%', label: 'Commitment to Quality' },
];

function useCountUp(target: number, duration = 2000, shouldStart = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, shouldStart]);
  return count;
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 1800, started);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl lg:text-6xl font-['Poppins'] font-black text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-[#6FC7F1] text-sm font-medium uppercase tracking-widest">{label}</div>
    </div>
  );
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { posts, loading: postsLoading } = usePosts();
  const { testimonials } = useTestimonials();
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [testimonials.length]);

  const prev = () => setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setTestimonialIdx(i => (i + 1) % testimonials.length);

  return (
    <div className="overflow-x-hidden">

      {/* ── SECTION 1: Hero ── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A1060]/90 via-[#5B3E99]/70 to-[#1a0d3a]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0d3a]/60 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase mb-8 text-[#6FC7F1]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6FC7F1] animate-pulse" />
            Engineering Excellence Since 2008
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-['Poppins'] font-black leading-tight mb-6"
          >
            Engineering Excellence.{' '}
            <span className="text-[#6FC7F1]">Manufacturing</span>{' '}
            Innovation.{' '}
            <span className="block mt-1">Building the Future.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Altravista Group delivers world-class engineering, construction, manufacturing, and specialized industrial solutions that meet international standards.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/subsidiaries"
              className="bg-white text-[#5B3E99] font-['Poppins'] font-bold px-8 py-4 rounded-xl hover:bg-[#6FC7F1] hover:text-white transition-all duration-300 shadow-xl hover:shadow-blue-400/30 flex items-center gap-2"
            >
              Explore Our Companies
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white/60 text-white font-['Poppins'] font-semibold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
            >
              Request Consultation
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </div> */}
      </section>

      {/* ── SECTION 2: About ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative">
              <img
                src={ABOUT_IMG}
                alt="Altravista Group construction project"
                className="w-full h-[480px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#5B3E99] text-white rounded-xl p-6 shadow-xl">
                <div className="text-3xl font-['Poppins'] font-black">17+</div>
                <div className="text-xs text-[#C4B0F0] uppercase tracking-widest">Years of Excellence</div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#6FC7F1]/20 rounded-full blur-xl" />
            </div>
          </FadeIn>

          <div>
            <FadeIn delay={0.1}>
              <div className="inline-block text-xs font-bold tracking-widest uppercase text-[#5B3E99] bg-[#EEE9F9] px-4 py-2 rounded-full mb-5">
                About Altravista Group
              </div>
              <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black text-[#2D2D2D] mb-6 leading-tight">
                A Group Built on{' '}
                <span className="text-[#5B3E99]">Engineering Precision</span>{' '}
                & Industrial Excellence
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Altravista Group is a diversified holding company comprising specialized subsidiaries across civil engineering, precision manufacturing, facade systems, and industrial products. Headquartered in Lagos, Nigeria, we serve clients across West Africa with world-class solutions.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our combined team brings over 17 years of industry experience, delivering more than 20 landmark projects for private, corporate, and government clients.
              </p>
            </FadeIn>
            <div className="grid grid-cols-2 gap-5 mb-8">
              {[
                { label: 'Our Mission', text: 'To deliver innovative, safe, and high-quality engineering and industrial solutions that exceed client expectations.' },
                { label: 'Our Vision', text: 'To be the most trusted and diversified engineering group in West Africa, recognized for excellence and integrity.' },
              ].map(item => (
                <FadeIn key={item.label} delay={0.2}>
                  <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-5">
                    <h4 className="font-['Poppins'] font-bold text-[#5B3E99] text-sm mb-2">{item.label}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.3}>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-[#5B3E99] text-white font-['Poppins'] font-semibold px-7 py-3.5 rounded-xl hover:bg-[#4a3080] transition-colors duration-200 shadow-lg shadow-purple-200"
              >
                Learn More About Us <ArrowRight size={16} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Our Companies ── */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <div className="inline-block text-xs font-bold tracking-widest uppercase text-[#5B3E99] bg-[#EEE9F9] px-4 py-2 rounded-full mb-5">
              Our Companies
            </div>
            <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black text-[#2D2D2D]">
              Four Specialized Companies,<br />
              <span className="text-[#5B3E99]">One Powerful Group</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {subsidiaryCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <FadeIn key={card.name} delay={i * 0.1}>
                  <div className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: card.color + '18' }}
                    >
                      <Icon size={26} style={{ color: card.color }} />
                    </div>
                    <h3 className="font-['Poppins'] font-bold text-[#2D2D2D] text-base mb-1">{card.name}</h3>
                    <p className="text-xs font-semibold text-[#5B3E99] mb-3 uppercase tracking-wide">{card.tagline}</p>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">{card.desc}</p>
                    {/* <Link
                      to={card.href}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#5B3E99] group-hover:gap-3 transition-all"
                    >
                      Learn More <ArrowRight size={14} />
                    </Link> */}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Services ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-14 items-start">
            <div className="lg:w-1/3">
              <FadeIn>
                <div className="inline-block text-xs font-bold tracking-widest uppercase text-[#5B3E99] bg-[#EEE9F9] px-4 py-2 rounded-full mb-5">
                  What We Do
                </div>
                <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black text-[#2D2D2D] mb-6">
                  Comprehensive <span className="text-[#5B3E99]">Industrial Services</span>
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                  From engineering design to construction execution, precision manufacturing to facade systems — we deliver end-to-end industrial solutions.
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 border-2 border-[#5B3E99] text-[#5B3E99] font-['Poppins'] font-semibold px-6 py-3 rounded-xl hover:bg-[#5B3E99] hover:text-white transition-all duration-200"
                >
                  All Services <ArrowRight size={16} />
                </Link>
              </FadeIn>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((svc, i) => (
                <FadeIn key={svc} delay={i * 0.05}>
                  <div className="flex items-center gap-3 bg-[#F8FAFC] hover:bg-[#EEE9F9] rounded-xl p-4 transition-colors group cursor-pointer border border-gray-100">
                    <div className="w-8 h-8 bg-[#5B3E99]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={16} className="text-[#5B3E99]" />
                    </div>
                    <span className="text-sm font-medium text-[#2D2D2D] group-hover:text-[#5B3E99] transition-colors">{svc}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Projects ── */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col sm:flex-row justify-between items-end mb-14 gap-5">
            <div>
              <div className="inline-block text-xs font-bold tracking-widest uppercase text-[#5B3E99] bg-[#EEE9F9] px-4 py-2 rounded-full mb-5">
                Portfolio
              </div>
              <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black text-[#2D2D2D]">
                Featured <span className="text-[#5B3E99]">Projects</span>
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-[#5B3E99] font-semibold text-sm border border-[#5B3E99] px-5 py-2.5 rounded-xl hover:bg-[#5B3E99] hover:text-white transition-all"
            >
              View All Projects <ArrowRight size={14} />
            </Link>
          </FadeIn>

          <div className="grid grid-cols-12 gap-4 auto-rows-[220px]">
            {projects.map((p, i) => {
              const colSpan = i === 0 || i === 3 ? 'col-span-12 sm:col-span-5' : 'col-span-12 sm:col-span-7';
              const rowSpan = p.tall ? 'row-span-2' : 'row-span-1';
              return (
                <FadeIn key={p.title} delay={i * 0.1} className={`${colSpan} ${rowSpan}`}>
                  <Link to="/projects" className="relative group block w-full h-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold bg-[#5B3E99] text-white px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Tag size={10} /> {p.cat}
                        </span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-yellow-400 text-black'}`}>
                          {p.status}
                        </span>
                      </div>
                      <h3 className="text-white font-['Poppins'] font-bold text-base mb-1">{p.title}</h3>
                      <p className="text-white/70 text-xs flex items-center gap-1">
                        <MapPin size={10} /> {p.loc}
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Why Choose Us ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <div className="inline-block text-xs font-bold tracking-widest uppercase text-[#5B3E99] bg-[#EEE9F9] px-4 py-2 rounded-full mb-5">
              Why Choose Us
            </div>
            <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black text-[#2D2D2D]">
              Our Core <span className="text-[#5B3E99]">Values</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div className="group text-center p-7 rounded-2xl border border-gray-100 hover:border-[#5B3E99]/30 hover:shadow-lg hover:shadow-purple-100 transition-all duration-300 bg-white hover:bg-[#EEE9F9]/30">
                    <div className="w-14 h-14 bg-[#EEE9F9] group-hover:bg-[#5B3E99] rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                      <Icon size={24} className="text-[#5B3E99] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-['Poppins'] font-bold text-[#2D2D2D] mb-2">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: Stats ── */}
      {/* <section
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2A1060 0%, #5B3E99 50%, #3B82F6 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6FC7F1] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </section> */}

      {/* ── SECTION 8: Testimonials ── */}
      {/* <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <div className="inline-block text-xs font-bold tracking-widest uppercase text-[#5B3E99] bg-[#EEE9F9] px-4 py-2 rounded-full mb-5">
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black text-[#2D2D2D]">
              What Our <span className="text-[#5B3E99]">Clients Say</span>
            </h2>
          </FadeIn>

          {testimonials.length > 0 && (
            <div className="relative">
              <motion.div
                key={testimonialIdx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100 text-center"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                  "{testimonials[testimonialIdx]?.content?.rendered?.replace(/<[^>]+>/g, '') || ''}"
                </p>
                <div>
                  <div className="font-['Poppins'] font-bold text-[#2D2D2D]">
                    {testimonials[testimonialIdx]?.acf?.client_name}
                  </div>
                  <div className="text-sm text-[#5B3E99]">{testimonials[testimonialIdx]?.acf?.company}</div>
                </div>
              </motion.div>

              <div className="flex items-center justify-center gap-4 mt-8">
                <button onClick={prev} className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-[#5B3E99] hover:text-white hover:border-[#5B3E99] flex items-center justify-center transition-all shadow-sm">
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setTestimonialIdx(i)}
                      className={`rounded-full transition-all ${i === testimonialIdx ? 'w-6 h-2.5 bg-[#5B3E99]' : 'w-2.5 h-2.5 bg-gray-300'}`}
                    />
                  ))}
                </div>
                <button onClick={next} className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-[#5B3E99] hover:text-white hover:border-[#5B3E99] flex items-center justify-center transition-all shadow-sm">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section> */}

      {/* ── SECTION 9: Latest News ── */}
      {/* <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col sm:flex-row justify-between items-end mb-14 gap-5">
            <div>
              <div className="inline-block text-xs font-bold tracking-widest uppercase text-[#5B3E99] bg-[#EEE9F9] px-4 py-2 rounded-full mb-5">
                Latest News
              </div>
              <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black text-[#2D2D2D]">
                News & <span className="text-[#5B3E99]">Articles</span>
              </h2>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-[#5B3E99] font-semibold text-sm border border-[#5B3E99] px-5 py-2.5 rounded-xl hover:bg-[#5B3E99] hover:text-white transition-all">
              All Articles <ArrowRight size={14} />
            </Link>
          </FadeIn>

          {postsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-80" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.slice(0, 3).map((post, i) => {
                const img = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                return (
                  <FadeIn key={post.id} delay={i * 0.1}>
                    <Link to={`/blog/${post.slug}`} className="group block bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="h-52 overflow-hidden bg-gray-100">
                        {img && <img src={img} alt={post.title.rendered} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                          <Clock size={12} />
                          {new Date(post.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                        <h3 className="font-['Poppins'] font-bold text-[#2D2D2D] group-hover:text-[#5B3E99] transition-colors mb-2 leading-snug">
                          {post.title.rendered}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#5B3E99]">
                          Read More <ArrowRight size={12} />
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </section> */}

      {/* ── SECTION 10: CTA ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0D3A 0%, #5B3E99 100%)' }}>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-[#6FC7F1]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <FadeIn>
            <h2 className="text-3xl sm:text-5xl font-['Poppins'] font-black mb-6 leading-tight">
              Let's Build Something <span className="text-[#6FC7F1]">Extraordinary</span> Together.
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Partner with Altravista Group for engineering, construction, and manufacturing excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-[#5B3E99] font-['Poppins'] font-bold px-9 py-4 rounded-xl hover:bg-[#6FC7F1] hover:text-white transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
              >
                Contact Us <ArrowRight size={18} />
              </Link>
              {/* <Link
                to="/contact"
                className="border-2 border-white/50 text-white font-['Poppins'] font-semibold px-9 py-4 rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                Request a Quote
              </Link> */}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
