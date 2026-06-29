import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useParams } from 'react-router';
import { MapPin, Tag, Calendar, ArrowRight, Building2, X } from 'lucide-react';
import { useProjects, WPProject } from '@/app/hooks/useWordPress';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay }} viewport={{ once: true }} className={className}>
      {children}
    </motion.div>
  );
}

const filters = ['All', 'Commercial Buildings', 'Residential Buildings', 'Infrastructure', 'Remodeling', 'CNC Projects', 'Container Projects'];

function ProjectCard({ project, onClick }: { project: WPProject; onClick: () => void }) {
  const img = project._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
      onClick={onClick}
    >
      <div className="h-56 overflow-hidden bg-gray-100">
        {img && <img src={img} alt={project.title.rendered} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold bg-[#EEE9F9] text-[#5B3E99] px-2.5 py-1 rounded-full flex items-center gap-1">
            <Tag size={10} /> {project.acf?.category || 'General'}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${project.acf?.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {project.acf?.status || 'Ongoing'}
          </span>
        </div>
        <h3 className="font-['Poppins'] font-bold text-[#2D2D2D] group-hover:text-[#5B3E99] transition-colors mb-2">{project.title.rendered}</h3>
        <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-3">
          <MapPin size={11} /> {project.acf?.location || 'Nigeria'}
        </p>
        <p className="text-sm text-gray-500 line-clamp-2">{project.excerpt.rendered.replace(/<[^>]+>/g, '')}</p>
        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#5B3E99]">
          View Details <ArrowRight size={12} />
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: WPProject; onClose: () => void }) {
  const img = project._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {img && <img src={img} alt={project.title.rendered} className="w-full h-72 object-cover" />}
        <div className="p-8">
          <div className="flex items-start justify-between mb-5">
            <h2 className="text-2xl font-['Poppins'] font-black text-[#2D2D2D]">{project.title.rendered}</h2>
            <button onClick={onClose} className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0 ml-4">
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { label: 'Client', value: project.acf?.client },
              { label: 'Location', value: project.acf?.location },
              { label: 'Status', value: project.acf?.status },
              { label: 'Category', value: project.acf?.category },
            ].filter(f => f.value).map(f => (
              <div key={f.label} className="bg-[#F8FAFC] rounded-xl p-4">
                <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">{f.label}</div>
                <div className="text-sm font-semibold text-[#2D2D2D]">{f.value}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed">{project.excerpt.rendered.replace(/<[^>]+>/g, '')}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { projects, loading } = useProjects();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<WPProject | null>(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.acf?.category === activeFilter);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 sm:h-96 flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?w=1920&h=700&fit=crop&auto=format" alt="Projects" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0D3A]/90 to-[#5B3E99]/70" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest text-[#6FC7F1] mb-3">Portfolio</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-['Poppins'] font-black">Our Projects</motion.h1>
        </div>
      </section>

      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-10">
            <div className="flex flex-wrap gap-2 justify-center">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 ${
                    activeFilter === f
                      ? 'bg-[#5B3E99] text-white shadow-lg shadow-purple-200'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-[#5B3E99] hover:text-[#5B3E99]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </FadeIn>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-80" />
              ))}
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map(project => (
                  <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <Building2 size={48} className="mx-auto mb-4 opacity-30" />
              <p className="font-['Poppins'] font-semibold">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <FadeIn>
          <h2 className="text-3xl font-['Poppins'] font-black text-[#2D2D2D] mb-4">Have a Project in Mind?</h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">Let us bring your vision to life with the same engineering precision we bring to every project.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#5B3E99] text-white font-['Poppins'] font-bold px-9 py-4 rounded-xl hover:bg-[#4a3080] transition-colors shadow-lg shadow-purple-200">
            Start a Project <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
