import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Shield, Award, Lightbulb, Users, Leaf, CheckCircle, ArrowRight } from 'lucide-react';

const HERO_IMG = 'https://images.unsplash.com/photo-1583338850703-bc602b103674?w=1920&h=700&fit=crop&auto=format';
const TEAM_IMG = 'https://images.unsplash.com/photo-1661332628354-3ec604f4411d?w=900&h=600&fit=crop&auto=format';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay }} viewport={{ once: true }} className={className}>
      {children}
    </motion.div>
  );
}

const coreValues = [
  { icon: Award, title: 'Quality', desc: 'International standards in every deliverable. We never compromise on quality regardless of project scale.' },
  { icon: Shield, title: 'Integrity', desc: 'Honest dealings, transparent pricing, and ethical conduct in all business relationships.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Continuous investment in cutting-edge technology and creative engineering solutions.' },
  { icon: Users, title: 'Collaboration', desc: 'True partnership with clients, contractors, and communities from design to delivery.' },
  { icon: CheckCircle, title: 'Safety', desc: 'Zero-compromise HSE framework protecting our people, clients, and the environment.' },
  { icon: Leaf, title: 'Sustainability', desc: 'Responsible engineering that minimizes environmental impact and supports long-term community development.' },
];

const milestones = [
  { year: '2008', event: 'Altravista Resources founded in Lagos, Nigeria' },
  { year: '2012', event: 'Expansion into facade systems with Everything Facade' },
  { year: '2016', event: 'CNC Laser Services division established' },
  { year: '2019', event: 'Altravista Abrasive Products launched' },
  { year: '2021', event: 'Altravista Group holding structure formalized' },
  { year: '2024', event: 'Milestone — 20+ completed projects across Nigeria' },
];

const reasons = [
  'Proven track record with 20+ completed projects',
  'Multi-disciplinary in-house engineering team',
  'International-grade materials and equipment',
  'End-to-end project management capability',
  'ISO-aligned quality management practices',
  'Deep understanding of Nigerian market conditions',
  'Competitive pricing without quality compromise',
  'Dedicated post-project support',
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 sm:h-96 flex items-center justify-center overflow-hidden">
        <img src={HERO_IMG} alt="About Altravista Group" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0D3A]/90 to-[#5B3E99]/70" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-widest text-[#6FC7F1] mb-3">About Us</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-['Poppins'] font-black">About Altravista Group</motion.h1>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <FadeIn>
            <img src={TEAM_IMG} alt="Altravista operations" className="w-full h-[420px] object-cover rounded-2xl shadow-xl" />
          </FadeIn>
          <div>
            <FadeIn delay={0.1}>
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#5B3E99] bg-[#EEE9F9] px-4 py-2 rounded-full mb-5">Company Overview</span>
              <h2 className="text-3xl font-['Poppins'] font-black text-[#2D2D2D] mb-5">Engineering Nigeria's <span className="text-[#5B3E99]">Industrial Future</span></h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Altravista Group is a Lagos-based diversified industrial holding company comprising four specialized subsidiaries: Altravista Resources, Altravista CNC Laser Services, Altravista Abrasive Products, and Everything Facade.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Together, our companies deliver comprehensive solutions spanning civil engineering consultation, construction execution, CNC precision manufacturing, architectural facade systems, and industrial abrasive products — all under one unified group committed to engineering excellence.
              </p>
            </FadeIn>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Vision', text: 'To be the most trusted and diversified engineering group in West Africa, recognized for excellence, innovation, and integrity.' },
                { label: 'Mission', text: 'To deliver innovative, safe, and high-quality engineering and industrial solutions that exceed client expectations and drive economic development.' },
              ].map(item => (
                <FadeIn key={item.label} delay={0.2}>
                  <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-5">
                    <h4 className="font-['Poppins'] font-bold text-[#5B3E99] text-sm mb-2">Our {item.label}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#5B3E99] bg-[#EEE9F9] px-4 py-2 rounded-full mb-5">What Drives Us</span>
            <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black text-[#2D2D2D]">Our Core <span className="text-[#5B3E99]">Values</span></h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((v, i) => {
              const Icon = v.icon;
              return (
                <FadeIn key={v.title} delay={i * 0.08}>
                  <div className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg hover:border-[#5B3E99]/20 transition-all group">
                    <div className="w-12 h-12 bg-[#EEE9F9] group-hover:bg-[#5B3E99] rounded-xl flex items-center justify-center mb-5 transition-colors">
                      <Icon size={22} className="text-[#5B3E99] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-['Poppins'] font-bold text-[#2D2D2D] mb-2">{v.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* HSE */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#5B3E99] to-[#3B82F6] rounded-3xl p-10 sm:p-16 text-white grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#C4B0F0] bg-white/10 px-4 py-2 rounded-full mb-5">Safety First</span>
              <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black mb-6">Health, Safety & <span className="text-[#6FC7F1]">Environment</span></h2>
              <p className="text-white/80 leading-relaxed mb-5">
                Our HSE policy is non-negotiable. Every Altravista Group project site operates under a strict health, safety and environment framework that protects our workers, clients, and the communities we serve.
              </p>
              <p className="text-white/80 leading-relaxed">
                We conduct regular safety audits, maintain comprehensive incident reporting, and invest continuously in team training to uphold our record of zero fatal incidents across all operations.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {['Mandatory PPE on all sites', 'Regular safety briefings', 'Environmental impact assessments', 'Waste management protocols', 'Emergency response planning', 'HSE officer on every project'].map(item => (
                  <div key={item} className="flex items-start gap-2.5 bg-white/10 rounded-xl p-4">
                    <CheckCircle size={16} className="text-[#6FC7F1] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <FadeIn>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#5B3E99] bg-[#EEE9F9] px-4 py-2 rounded-full mb-5">Why Clients Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black text-[#2D2D2D] mb-8">The Altravista <span className="text-[#5B3E99]">Advantage</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reasons.map((r, i) => (
                <FadeIn key={r} delay={i * 0.05}>
                  <div className="flex items-start gap-2.5 bg-white rounded-xl p-3.5 border border-gray-100">
                    <CheckCircle size={15} className="text-[#5B3E99] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#2D2D2D]">{r}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          {/* Timeline */}
          <FadeIn delay={0.1}>
            <h3 className="font-['Poppins'] font-black text-xl text-[#2D2D2D] mb-8">Our Journey</h3>
            <div className="relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#EEE9F9]" />
              {milestones.map((m, i) => (
                <div key={m.year} className="relative mb-7 last:mb-0">
                  <div className="absolute -left-[23px] top-1 w-4 h-4 bg-[#5B3E99] rounded-full border-2 border-white shadow" />
                  <div className="text-xs font-bold text-[#5B3E99] mb-1 uppercase tracking-wider">{m.year}</div>
                  <div className="text-sm text-[#2D2D2D] font-medium">{m.event}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-white">
        <FadeIn>
          <h2 className="text-3xl font-['Poppins'] font-black text-[#2D2D2D] mb-4">Ready to Work With Us?</h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">Let our experienced team handle your next engineering, construction, or manufacturing project.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#5B3E99] text-white font-['Poppins'] font-semibold px-9 py-4 rounded-xl hover:bg-[#4a3080] transition-colors shadow-lg shadow-purple-200">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
