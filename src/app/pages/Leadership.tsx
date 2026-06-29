import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Linkedin, Twitter, ArrowRight, User } from 'lucide-react';
import { useTeam } from '@/app/hooks/useWordPress';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay }} viewport={{ once: true }} className={className}>
      {children}
    </motion.div>
  );
}

const teamPhotos = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format',
];

export default function Leadership() {
  const { team, loading } = useTeam();

  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 sm:h-96 flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1661332628354-3ec604f4411d?w=1920&h=700&fit=crop&auto=format" alt="Leadership" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0D3A]/90 to-[#5B3E99]/70" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest text-[#6FC7F1] mb-3">Our People</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-['Poppins'] font-black">Leadership Team</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-white/70 mt-3 max-w-xl mx-auto">Experienced professionals driving engineering excellence across Nigeria and West Africa.</motion.p>
        </div>
      </section>

      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#5B3E99] bg-[#EEE9F9] px-4 py-2 rounded-full mb-5">Executive Team</span>
            <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black text-[#2D2D2D]">
              The People Behind <span className="text-[#5B3E99]">Altravista</span>
            </h2>
          </FadeIn>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-96" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, i) => (
                <FadeIn key={member.id} delay={i * 0.08}>
                  <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Photo */}
                    <div className="h-72 bg-gray-100 overflow-hidden relative">
                      <img
                        src={member.acf?.image || teamPhotos[i % teamPhotos.length]}
                        alt={member.title.rendered}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#5B3E99]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {member.acf?.linkedin && (
                          <a href={member.acf.linkedin} className="w-9 h-9 bg-white/90 rounded-lg flex items-center justify-center hover:bg-[#5B3E99] hover:text-white transition-colors">
                            <Linkedin size={15} />
                          </a>
                        )}
                        {member.acf?.twitter && (
                          <a href={member.acf.twitter} className="w-9 h-9 bg-white/90 rounded-lg flex items-center justify-center hover:bg-[#5B3E99] hover:text-white transition-colors">
                            <Twitter size={15} />
                          </a>
                        )}
                      </div> */}
                    </div>

                    {/* Info */}
                    <div className="p-7">
                      <h3 className="font-['Poppins'] font-bold text-[#2D2D2D] text-lg mb-1">{member.title.rendered}</h3>
                      <p className="text-sm font-semibold text-[#5B3E99] mb-4">{member.acf?.position}</p>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{member.acf?.bio}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Culture */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#5B3E99] to-[#3B82F6] rounded-3xl p-10 sm:p-16 text-white text-center">
            <FadeIn>
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#C4B0F0] bg-white/10 px-4 py-2 rounded-full mb-5">Work With Us</span>
              <h2 className="text-3xl sm:text-4xl font-['Poppins'] font-black mb-4">Join the Altravista Team</h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                We are always looking for talented engineers, project managers, and industry professionals to join our growing team. If you share our values of excellence, integrity, and innovation, we want to hear from you.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-[#5B3E99] font-['Poppins'] font-bold px-9 py-4 rounded-xl hover:bg-[#6FC7F1] hover:text-white transition-all shadow-xl">
                Get in Touch <ArrowRight size={16} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
