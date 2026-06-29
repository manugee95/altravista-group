import { motion } from 'motion/react';
import { Link, useParams } from 'react-router';
import { Building2, Cog, Package, Layers, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay }} viewport={{ once: true }} className={className}>
      {children}
    </motion.div>
  );
}

const subsidiariesData = {
  'altravista-resources': {
    name: 'Altravista Resources',
    tagline: 'Civil Engineering & Construction',
    icon: Building2,
    color: '#5B3E99',
    hero: 'https://images.unsplash.com/photo-1637019916030-9f851c2eca13?w=1920&h=700&fit=crop&auto=format',
    about: 'Altravista Resources Ltd is the flagship civil engineering and construction arm of the Altravista Group. We provide comprehensive engineering consultancy, project management, and construction services to private, corporate, and government clients across Nigeria.',
    services: [
      'Engineering Design & Structural Analysis',
      'Construction Project Management',
      'Procurement & Supply Chain Management',
      'Civil Works & Infrastructure',
      'Building Construction (Commercial & Residential)',
      'Site Supervision & Quality Control',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1637393932938-b9c209e67d5c?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1661332628354-3ec604f4411d?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?w=600&h=400&fit=crop&auto=format',
    ],
  },
  'cnc-laser': {
    name: 'Altravista CNC Laser Services',
    tagline: 'Precision CNC Manufacturing',
    icon: Cog,
    color: '#3B82F6',
    hero: 'https://images.unsplash.com/photo-1740209475472-aa7d280f7452?w=1920&h=700&fit=crop&auto=format',
    about: 'Altravista CNC Laser Services is a precision manufacturing company offering state-of-the-art CNC Router, Plasma Cutting, and Fibre Laser Cutting services. We serve industrial, commercial, and creative clients who demand micron-level accuracy in metal and non-metal fabrication.',
    services: [
      'CNC Router Cutting & Engraving',
      'CNC Plasma Cutting (mild steel, stainless, aluminum)',
      'CNC Fibre Laser Cutting (high-precision)',
      'Custom Metal Fabrication',
      'Structural Steel Components',
      'Decorative & Architectural Metalwork',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1740209475472-aa7d280f7452?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1711418235334-8895331a6cf9?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1666634157070-6fd830fb5672?w=600&h=400&fit=crop&auto=format',
    ],
  },
  'abrasive-products': {
    name: 'Altravista Abrasive Products',
    tagline: 'Industrial Abrasive Solutions',
    icon: Package,
    color: '#10B981',
    hero: 'https://images.unsplash.com/photo-1666618090858-fbcee636bd3e?w=1920&h=700&fit=crop&auto=format',
    about: 'Altravista Abrasive Products is a manufacturer and supplier of high-quality cutting discs, grinding wheels, and industrial abrasive products. Our products meet international safety and performance standards, serving industries across Nigeria and West Africa.',
    services: [
      'Cutting Discs (metal & masonry)',
      'Grinding Wheels',
      'Flap Discs',
      'Abrasive Belts & Sheets',
      'Wire Brushes & Accessories',
      'Custom Abrasive Solutions',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1666618090858-fbcee636bd3e?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1666634157070-6fd830fb5672?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1593106410288-caf65eca7c9d?w=600&h=400&fit=crop&auto=format',
    ],
  },
  'everything-facade': {
    name: 'Everything Facade',
    tagline: 'Architectural Facade Systems',
    icon: Layers,
    color: '#F59E0B',
    hero: 'https://images.unsplash.com/photo-1583338850703-bc602b103674?w=1920&h=700&fit=crop&auto=format',
    about: 'Everything Facade is the architectural transformation arm of Altravista Group. We specialize in building remodeling, facade installation, and comprehensive architectural facelift solutions that dramatically enhance the aesthetic and functional value of commercial and residential properties.',
    services: [
      'Facade Design & Engineering',
      'Curtain Wall Installation',
      'Aluminum Composite Panel (ACP) Systems',
      'Glass Curtain Wall & Shopfronts',
      'Building Remodeling & Renovation',
      'Architectural Facelift Solutions',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1583338850703-bc602b103674?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1637393932938-b9c209e67d5c?w=600&h=400&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1707823942892-3316eeb091a0?w=600&h=400&fit=crop&auto=format',
    ],
  },
};

const allSubsidiaries = Object.entries(subsidiariesData).map(([slug, data]) => ({ slug, ...data }));

function SubsidiaryDetail({ slug }: { slug: string }) {
  const data = subsidiariesData[slug as keyof typeof subsidiariesData];
  if (!data) return <div className="pt-32 text-center text-gray-500">Company not found.</div>;
  const Icon = data.icon;
  return (
    <div>
      {/* Hero */}
      <section className="relative h-80 sm:h-[420px] flex items-center justify-center overflow-hidden">
        <img src={data.hero} alt={data.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${data.color}E6, ${data.color}99)` }} />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon size={30} className="text-white" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-['Poppins'] font-black mb-2">{data.name}</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/80 text-sm uppercase tracking-widest">{data.tagline}</motion.p>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-start">
          <FadeIn>
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-5" style={{ color: data.color, backgroundColor: data.color + '18' }}>About This Company</span>
            <h2 className="text-3xl font-['Poppins'] font-black text-[#2D2D2D] mb-5">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{data.about}</p>
            <h3 className="font-['Poppins'] font-bold text-[#2D2D2D] mb-5">Services Offered</h3>
            <div className="grid grid-cols-1 gap-3">
              {data.services.map(s => (
                <div key={s} className="flex items-center gap-3 bg-[#F8FAFC] rounded-xl p-3.5 border border-gray-100">
                  <CheckCircle size={16} style={{ color: data.color }} className="flex-shrink-0" />
                  <span className="text-sm text-[#2D2D2D] font-medium">{s}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h3 className="font-['Poppins'] font-bold text-[#2D2D2D] mb-5">Gallery</h3>
            <div className="grid grid-cols-2 gap-4">
              {data.gallery.map((img, i) => (
                <div key={i} className={`overflow-hidden rounded-xl ${i === 0 ? 'col-span-2 h-56' : 'h-44'}`}>
                  <img src={img} alt={`${data.name} project ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[#F8FAFC] rounded-2xl p-7 border border-gray-100">
              <h4 className="font-['Poppins'] font-bold text-[#2D2D2D] mb-4">Get in Touch</h4>
              <div className="space-y-3">
                <a href="tel:08038285358" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#5B3E99] transition-colors">
                  <Phone size={15} style={{ color: data.color }} /> 08038285358 / 08052935355
                </a>
                <a href="mailto:altravistagroup@gmail.com" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#5B3E99] transition-colors">
                  <Mail size={15} style={{ color: data.color }} /> altravistagroup@gmail.com
                </a>
              </div>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors" style={{ backgroundColor: data.color }}>
                Request a Quote <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

export default function Subsidiaries() {
  const { slug } = useParams<{ slug?: string }>();

  if (slug) return <SubsidiaryDetail slug={slug} />;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 sm:h-96 flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1637393932938-b9c209e67d5c?w=1920&h=700&fit=crop&auto=format" alt="Our Companies" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0D3A]/90 to-[#5B3E99]/70" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest text-[#6FC7F1] mb-3">The Group</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-['Poppins'] font-black">Our Companies</motion.h1>
        </div>
      </section>

      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black text-[#2D2D2D]">
              Specialized Companies, <span className="text-[#5B3E99]">Unified Vision</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Each subsidiary operates as an independent entity with dedicated expertise, supported by the resources and integrity of the Altravista Group.</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {allSubsidiaries.map((sub, i) => {
              const Icon = sub.icon;
              return (
                <FadeIn key={sub.slug} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 group">
                    <div className="h-52 overflow-hidden bg-gray-100">
                      <img src={sub.gallery[0]} alt={sub.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: sub.color + '18' }}>
                          <Icon size={22} style={{ color: sub.color }} />
                        </div>
                        <div>
                          <h3 className="font-['Poppins'] font-bold text-[#2D2D2D]">{sub.name}</h3>
                          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: sub.color }}>{sub.tagline}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3">{sub.about}</p>
                      <Link
                        to={`/subsidiaries/${sub.slug}`}
                        className="inline-flex items-center gap-2 font-['Poppins'] font-semibold text-sm text-white px-6 py-3 rounded-xl transition-all"
                        style={{ backgroundColor: sub.color }}
                      >
                        Learn More <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
