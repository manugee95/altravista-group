import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useParams } from 'react-router';
import { Clock, Search, ArrowRight, Tag, ChevronRight } from 'lucide-react';
import { usePosts, WPPost } from '@/app/hooks/useWordPress';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay }} viewport={{ once: true }} className={className}>
      {children}
    </motion.div>
  );
}

const categories = ['All', 'Engineering', 'Manufacturing', 'Facade Systems', 'Company News'];

function PostCard({ post }: { post: WPPost }) {
  const img = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  return (
    <Link to={`/blog/${post.slug}`} className="group block bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="h-52 overflow-hidden bg-gray-100">
        {img && <img src={img} alt={post.title.rendered} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
          <Clock size={12} />
          {new Date(post.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
        </div>
        <h3 className="font-['Poppins'] font-bold text-[#2D2D2D] group-hover:text-[#5B3E99] transition-colors mb-2 leading-snug text-lg">
          {post.title.rendered}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#5B3E99]">
          Read Article <ArrowRight size={13} />
        </div>
      </div>
    </Link>
  );
}

function SinglePost({ slug }: { slug: string }) {
  const { posts } = usePosts();
  const post = posts.find(p => p.slug === slug);
  const img = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

  if (!post) return (
    <div className="pt-32 text-center py-20">
      <div className="text-gray-400">Loading article...</div>
    </div>
  );

  return (
    <div>
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        {img && <img src={img} alt={post.title.rendered} className="absolute inset-0 w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D3A] via-[#1A0D3A]/60 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-12 text-white w-full">
          <div className="flex items-center gap-2 text-xs text-[#6FC7F1] mb-3">
            <Clock size={12} />
            {new Date(post.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
          </div>
          <h1 className="text-2xl sm:text-4xl font-['Poppins'] font-black leading-tight">{post.title.rendered}</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-10">
            <Link to="/blog" className="hover:text-[#5B3E99] transition-colors">Blog</Link>
            <ChevronRight size={14} />
            <span className="text-[#2D2D2D]">{post.title.rendered}</span>
          </div>
          <div
            className="prose prose-lg max-w-none prose-headings:font-['Poppins'] prose-headings:text-[#2D2D2D] prose-a:text-[#5B3E99]"
            dangerouslySetInnerHTML={{ __html: post.content.rendered || `<p>${post.excerpt.rendered.replace(/<[^>]+>/g, '')}</p>` }}
          />
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link to="/blog" className="inline-flex items-center gap-2 text-[#5B3E99] font-semibold hover:gap-3 transition-all">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Blog() {
  const { slug } = useParams<{ slug?: string }>();
  const { posts, loading } = usePosts();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  if (slug) return <SinglePost slug={slug} />;

  const filtered = posts.filter(p => {
    const matchSearch = !search || p.title.rendered.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 sm:h-80 flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1637019916030-9f851c2eca13?w=1920&h=600&fit=crop&auto=format" alt="Blog" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0D3A]/90 to-[#5B3E99]/70" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest text-[#6FC7F1] mb-3">Knowledge Hub</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-['Poppins'] font-black">Blog & News</motion.h1>
        </div>
      </section>

      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search + Filters */}
          <FadeIn className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B3E99] transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm font-semibold px-4 py-2.5 rounded-xl transition-all ${
                    activeCategory === cat
                      ? 'bg-[#5B3E99] text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-[#5B3E99] hover:text-[#5B3E99]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-80" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No articles found matching your search.</div>
          ) : (
            <>
              {/* Featured Post */}
              {filtered[0] && (
                <FadeIn className="mb-10">
                  <Link to={`/blog/${filtered[0].slug}`} className="group grid lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="h-72 lg:h-auto overflow-hidden bg-gray-100">
                      {filtered[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                        <img
                          src={filtered[0]._embedded['wp:featuredmedia'][0].source_url}
                          alt={filtered[0].title.rendered}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-10 flex flex-col justify-center">
                      <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#5B3E99] bg-[#EEE9F9] px-3 py-1.5 rounded-full mb-4">Featured</span>
                      <h2 className="text-2xl font-['Poppins'] font-black text-[#2D2D2D] group-hover:text-[#5B3E99] transition-colors mb-3">{filtered[0].title.rendered}</h2>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: filtered[0].excerpt.rendered }} />
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-400 flex items-center gap-1.5"><Clock size={12} />
                          {new Date(filtered[0].date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="text-sm font-semibold text-[#5B3E99] flex items-center gap-1.5">Read Article <ArrowRight size={13} /></span>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.slice(1).map((post, i) => (
                  <FadeIn key={post.id} delay={i * 0.1}>
                    <PostCard post={post} />
                  </FadeIn>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
