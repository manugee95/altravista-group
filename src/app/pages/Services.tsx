import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle, Wrench, HardHat, Cog, Layers, Package } from 'lucide-react';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay }} viewport={{ once: true }} className={className}>
      {children}
    </motion.div>
  );
}

const categories = [
  {
    icon: Wrench,
    title: 'Engineering Services',
    color: '#5B3E99',
    img: 'https://images.unsplash.com/photo-1661332618936-402f260b4339?w=700&h=400&fit=crop&auto=format',
    services: [
      { name: 'Engineering Design & Consultancy', desc: 'Comprehensive structural analysis, architectural design, and engineering consultancy for projects of all sizes.', benefits: ['Detailed CAD & BIM documentation', 'Regulatory compliance assurance', 'Cost-optimized design solutions'] },
      { name: 'Project Management', desc: 'End-to-end project management from inception to handover, ensuring on-time and on-budget delivery.', benefits: ['Dedicated project managers', 'Milestone-based reporting', 'Risk management frameworks'] },
      { name: 'Procurement Services', desc: 'Strategic sourcing and procurement of construction materials, equipment, and industrial supplies.', benefits: ['Verified supplier network', 'Quality assurance checks', 'Competitive pricing'] },
    ],
  },
  {
    icon: HardHat,
    title: 'Construction Services',
    color: '#3B82F6',
    img: 'https://images.unsplash.com/photo-1637019916030-9f851c2eca13?w=700&h=400&fit=crop&auto=format',
    services: [
      { name: 'Commercial Construction', desc: 'Full-cycle construction of offices, retail centers, hotels, and industrial facilities to international standards.', benefits: ['Experienced site engineers', 'Quality materials sourcing', 'Strict HSE compliance'] },
      { name: 'Residential Construction', desc: 'Premium residential building from luxury estates to mid-range apartments, built with precision and care.', benefits: ['Custom design execution', 'Transparent cost reporting', 'Client-centered approach'] },
      { name: 'Infrastructure Projects', desc: 'Civil infrastructure works including roads, drainage systems, and public facility construction.', benefits: ['Government tender experience', 'Large-scale project capability', 'Community-sensitive delivery'] },
    ],
  },
  {
    icon: Cog,
    title: 'CNC Manufacturing Services',
    color: '#6FC7F1',
    img: 'https://images.unsplash.com/photo-1740209475472-aa7d280f7452?w=700&h=400&fit=crop&auto=format',
    services: [
      { name: 'CNC Router Services', desc: 'High-speed CNC router cutting for wood, acrylic, aluminum, and composite materials with exceptional finish.', benefits: ['Complex geometry capability', 'Fast turnaround times', 'CAD file to finished part'] },
      { name: 'CNC Plasma Cutting', desc: 'Precision plasma cutting of mild steel, stainless steel, and aluminum up to 25mm thickness.', benefits: ['High-volume capacity', 'Tight tolerances', 'Clean cut quality'] },
      { name: 'CNC Fibre Laser Cutting', desc: 'Ultra-precision fibre laser cutting delivering superior edge quality for intricate industrial components.', benefits: ['Micron-level accuracy', 'Minimal material wastage', 'Wide material compatibility'] },
    ],
  },
  {
    icon: Layers,
    title: 'Facade Services',
    color: '#F59E0B',
    img: 'https://images.unsplash.com/photo-1583338850703-bc602b103674?w=700&h=400&fit=crop&auto=format',
    services: [
      { name: 'Facade Installation', desc: 'Professional installation of curtain wall, ACP cladding, glass systems, and architectural facade elements.', benefits: ['European-grade materials', 'Weathertight guarantees', 'Skilled installation crews'] },
      { name: 'Building Remodeling', desc: 'Complete interior and exterior remodeling services that breathe new life into existing properties.', benefits: ['Design consultation included', 'Minimal business disruption', 'Value-enhancing outcomes'] },
    ],
  },
  {
    icon: Package,
    title: 'Industrial Products',
    color: '#10B981',
    img: 'https://images.unsplash.com/photo-1666618090858-fbcee636bd3e?w=700&h=400&fit=crop&auto=format',
    services: [
      { name: 'Abrasive Products Supply', desc: 'Wide range of cutting discs, grinding wheels, and abrasive accessories for industrial use across all sectors.', benefits: ['ISO-compliant products', 'Bulk supply capability', 'Technical support available'] },
    ],
  },
];

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 sm:h-96 flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1666634157070-6fd830fb5672?w=1920&h=700&fit=crop&auto=format" alt="Services" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0D3A]/90 to-[#5B3E99]/70" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest text-[#6FC7F1] mb-3">What We Offer</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-['Poppins'] font-black">Our Services</motion.h1>
        </div>
      </section>

      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#5B3E99] bg-[#EEE9F9] px-4 py-2 rounded-full mb-5">Comprehensive Solutions</span>
            <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black text-[#2D2D2D]">End-to-End <span className="text-[#5B3E99]">Industrial Services</span></h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">From engineering concept to construction delivery, precision manufacturing to architectural finishing — we have the expertise to handle your complete project lifecycle.</p>
          </FadeIn>

          <div className="space-y-20">
            {categories.map((cat, ci) => {
              const Icon = cat.icon;
              return (
                <div key={cat.title}>
                  <FadeIn>
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: cat.color + '18' }}>
                        <Icon size={22} style={{ color: cat.color }} />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-['Poppins'] font-black text-[#2D2D2D]">{cat.title}</h2>
                        <div className="h-0.5 w-16 mt-1 rounded-full" style={{ backgroundColor: cat.color }} />
                      </div>
                    </div>
                  </FadeIn>

                  <div className="grid lg:grid-cols-3 gap-6">
                    {cat.services.map((svc, i) => (
                      <FadeIn key={svc.name} delay={i * 0.1}>
                        <div className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-shadow h-full flex flex-col">
                          <h3 className="font-['Poppins'] font-bold text-[#2D2D2D] mb-3">{svc.name}</h3>
                          <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">{svc.desc}</p>
                          <div className="space-y-2">
                            {svc.benefits.map(b => (
                              <div key={b} className="flex items-start gap-2">
                                <CheckCircle size={14} style={{ color: cat.color }} className="flex-shrink-0 mt-0.5" />
                                <span className="text-xs text-gray-600">{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#5B3E99] bg-[#EEE9F9] px-4 py-2 rounded-full mb-5">How We Work</span>
            <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black text-[#2D2D2D]">Our <span className="text-[#5B3E99]">Process</span></h2>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Consultation', desc: 'We meet to understand your project requirements, timeline, and budget constraints.' },
              { step: '02', title: 'Design & Planning', desc: 'Our engineers develop detailed plans, specifications, and cost estimates.' },
              { step: '03', title: 'Execution', desc: 'Expert teams execute your project with strict quality and HSE standards.' },
              { step: '04', title: 'Handover', desc: 'Complete project delivery with documentation and post-project support.' },
            ].map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.1}>
                <div className="text-center p-7 bg-[#F8FAFC] rounded-2xl border border-gray-100">
                  <div className="text-4xl font-['Poppins'] font-black text-[#5B3E99]/20 mb-4">{p.step}</div>
                  <h3 className="font-['Poppins'] font-bold text-[#2D2D2D] mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-500">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1A0D3A] to-[#5B3E99] text-white text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black mb-4">Ready to Start Your Project?</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">Contact us today and let our expert team develop a tailored solution for your engineering and construction needs.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#5B3E99] font-['Poppins'] font-bold px-9 py-4 rounded-xl hover:bg-[#6FC7F1] hover:text-white transition-all shadow-xl">
            Request a Quote <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
