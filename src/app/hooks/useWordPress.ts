import { useState, useEffect } from 'react';

const WP_BASE = (import.meta as any).env?.VITE_WP_API_URL || 'https://altravistagroup.com/wp-json/wp/v2';

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  featured_media: number;
  _embedded?: { 'wp:featuredmedia'?: Array<{ source_url: string }> };
  categories: number[];
  tags: number[];
}

export interface WPProject {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  acf?: {
    client?: string;
    location?: string;
    completion_date?: string;
    status?: string;
    category?: string;
  };
  _embedded?: { 'wp:featuredmedia'?: Array<{ source_url: string }> };
}

export interface WPTeamMember {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    position?: string;
    bio?: string;
    linkedin?: string;
    twitter?: string;
    image?: string;
  };
}

export interface WPTestimonial {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  acf?: {
    client_name?: string;
    company?: string;
    rating?: number;
  };
}

const mockPosts: WPPost[] = [
  {
    id: 1,
    slug: 'engineering-excellence-in-lagos',
    title: { rendered: 'Engineering Excellence: How Altravista is Reshaping Lagos Infrastructure' },
    excerpt: { rendered: 'A look at our recent landmark projects transforming the commercial landscape of Lagos State.' },
    content: { rendered: '' },
    date: '2025-04-15',
    featured_media: 0,
    categories: [1],
    tags: [],
    _embedded: { 'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1637019916030-9f851c2eca13?w=800&h=500&fit=crop&auto=format' }] },
  },
  {
    id: 2,
    slug: 'cnc-precision-manufacturing',
    title: { rendered: 'The Future of Precision: Our CNC Laser Services Division' },
    excerpt: { rendered: 'Discover how our CNC division delivers micron-level accuracy for industrial and commercial clients across Nigeria.' },
    content: { rendered: '' },
    date: '2025-03-28',
    featured_media: 0,
    categories: [2],
    tags: [],
    _embedded: { 'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1740209475472-aa7d280f7452?w=800&h=500&fit=crop&auto=format' }] },
  },
  {
    id: 3,
    slug: 'facade-systems-innovation',
    title: { rendered: 'Everything Facade: Redefining Building Aesthetics in West Africa' },
    excerpt: { rendered: 'Our facade division combines European-standard materials with local expertise for stunning architectural transformations.' },
    content: { rendered: '' },
    date: '2025-03-10',
    featured_media: 0,
    categories: [3],
    tags: [],
    _embedded: { 'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1583338850703-bc602b103674?w=800&h=500&fit=crop&auto=format' }] },
  },
];

const mockProjects: WPProject[] = [
  { id: 1, slug: 'jendol-superstores', title: { rendered: 'Jendol Superstores' }, excerpt: { rendered: 'Commercial retail development featuring modern facade systems and structural engineering.' }, content: { rendered: '' }, acf: { client: 'Jendol Group', location: 'Lagos, Nigeria', status: 'Completed', category: 'Commercial Buildings' }, _embedded: { 'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1637393932938-b9c209e67d5c?w=800&h=600&fit=crop&auto=format' }] } },
  { id: 2, slug: 'apartment-project', title: { rendered: 'Luxury Apartment Complex' }, excerpt: { rendered: 'High-rise residential development with premium finishes and architectural facade installation.' }, content: { rendered: '' }, acf: { client: 'Private Developer', location: 'Victoria Island, Lagos', status: 'Completed', category: 'Residential Buildings' }, _embedded: { 'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?w=800&h=600&fit=crop&auto=format' }] } },
  { id: 3, slug: 'cubana-project', title: { rendered: 'Cubana Entertainment Complex' }, excerpt: { rendered: 'Entertainment and hospitality venue with specialized structural and facade engineering.' }, content: { rendered: '' }, acf: { client: 'Cubana Group', location: 'Abuja, Nigeria', status: 'Completed', category: 'Commercial Buildings' }, _embedded: { 'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1661332628354-3ec604f4411d?w=800&h=600&fit=crop&auto=format' }] } },
  { id: 4, slug: 'studio-24', title: { rendered: 'Studio 24 Creative Hub' }, excerpt: { rendered: 'Modern creative and media studio with CNC-fabricated interior features and facade remodel.' }, content: { rendered: '' }, acf: { client: 'Studio 24 Ltd', location: 'Lagos, Nigeria', status: 'Completed', category: 'Remodeling' }, _embedded: { 'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1707823942892-3316eeb091a0?w=800&h=600&fit=crop&auto=format' }] } },
  { id: 5, slug: 'container-projects', title: { rendered: 'Container Architecture Series' }, excerpt: { rendered: 'Innovative repurposed shipping container structures for commercial and hospitality use.' }, content: { rendered: '' }, acf: { client: 'Various Clients', location: 'Lagos, Nigeria', status: 'Ongoing', category: 'Container Projects' }, _embedded: { 'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1637019916030-9f851c2eca13?w=800&h=600&fit=crop&auto=format' }] } },
  { id: 6, slug: 'infrastructure-bridge', title: { rendered: 'State Infrastructure Project' }, excerpt: { rendered: 'Civil engineering and infrastructure development for state government residential scheme.' }, content: { rendered: '' }, acf: { client: 'Lagos State Government', location: 'Ikorodu, Lagos', status: 'Completed', category: 'Infrastructure' }, _embedded: { 'wp:featuredmedia': [{ source_url: 'https://images.unsplash.com/photo-1661332618936-402f260b4339?w=800&h=600&fit=crop&auto=format' }] } },
];

const mockTeam: WPTeamMember[] = [
  { id: 1, slug: 'ceo', title: { rendered: 'ENGR. OBASAN, OLUKAYODE ADEKOYA, (MNSE)' }, content: { rendered: '' }, acf: { position: 'MANAGING DIRECTOR', bio: 'Experienced Field Civil/ Structural Engineer with over seventeen (17) years as a Field and Design Engineer in Building Construction, Civil Engineering Infrastructure, Property Development and Renovations. He has worked with Mova Realty Ltd, a consortium dedicated to construction of major commercial property development for banks and other clients. Fidelity bank, Airport Road; Zenith bank, Idumota; Diamond bank, Ikeja are few of many building works in which he was part of the team.', linkedin: '#', twitter: '#' } },
  { id: 2, slug: 'coo', title: { rendered: 'OLAJIDE BELLO (B.SC, M.SC.)' }, content: { rendered: '' }, acf: { position: 'PROJECT DIRECTOR', bio: 'He brings over a decade of professional experience in technical, project management, and commercial roles in the construction and engineering consulting industries.', linkedin: '#', twitter: '#' } },
  { id: 3, slug: 'cto', title: { rendered: 'BUILDER, CHIKERE YETUNDE DEBORAH' }, content: { rendered: '' }, acf: { position: 'PROJECT DIRECTOR', bio: ' Experienced Builder with over 20 years of professional practices in the construction industry. She holds Higher National diploma (HND) in Building technology, 1997.', linkedin: '#', twitter: '#' } },
  // { id: 4, slug: 'director-facades', title: { rendered: 'FASHINA, HAMMED OLAKUNLE, (M.SC.)' }, content: { rendered: '' }, acf: { position: 'LEAD CONSTRUCTION SUPERVISOR', bio: 'seasoned builder with masters in Building construction. He served as a site supervisor with Altravista from 2023, and quickly rose to the position of lead construction supervisor on various sites.', linkedin: '#', twitter: '#' } },
  { id: 5, slug: 'director-cnc', title: { rendered: 'FASHINA, HAMMED OLAKUNLE, (M.SC.)' }, content: { rendered: '' }, acf: { position: 'LEAD CONSTRUCTION SUPERVISOR', bio: 'Certified Business Administration Executive. She has served in various capacity of the company at various stages of the company’s growth process', linkedin: '#', twitter: '#' } },
  { id: 6, slug: 'director-finance', title: { rendered: 'TITILAYO, KAYODE-OBASAN, (M.SC.)' }, content: { rendered: '' }, acf: { position: 'ADMIN EXECUTIVE', bio: 'Seasoned builder with masters in Building construction. He served as a site supervisor with Altravista from 2023, and quickly rose to the position of lead construction supervisor on various sites.', linkedin: '#', twitter: '#' } },
];

const mockTestimonials: WPTestimonial[] = [
  { id: 1, title: { rendered: 'Excellent Engineering Partner' }, content: { rendered: 'Altravista Resources delivered our Jendol Superstores project on time and within budget. Their engineering precision and attention to detail is world-class.' }, acf: { client_name: 'Alhaji Jendol Muhammed', company: 'Jendol Group', rating: 5 } },
  { id: 2, title: { rendered: 'Outstanding CNC Services' }, content: { rendered: 'The CNC Laser Services team provided incredible precision fabrication for our industrial facility. The quality of their cutting work is unmatched in Lagos.' }, acf: { client_name: 'Mr. Taiwo Adeleke', company: 'Adeleke Industries Ltd', rating: 5 } },
  { id: 3, title: { rendered: 'Transformed Our Building' }, content: { rendered: "Everything Facade completely transformed our commercial property. The architectural facelift exceeded our expectations and has significantly improved our property's market value." }, acf: { client_name: 'Dr. Ngozi Okonkwo', company: 'Okonkwo Properties', rating: 5 } },
  { id: 4, title: { rendered: 'Professional and Reliable' }, content: { rendered: 'We have partnered with Altravista Group on multiple projects and they consistently deliver quality work. Their team is professional, reliable, and innovative.' }, acf: { client_name: 'Engr. Emeka Chukwu', company: 'Lagos State Ministry of Works', rating: 5 } },
];

async function wpFetch<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${WP_BASE}${endpoint}?_embed&per_page=20`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error('API unavailable');
    return await res.json();
  } catch {
    return fallback;
  }
}

export function usePosts() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    wpFetch<WPPost[]>('/posts', mockPosts).then(data => { setPosts(data); setLoading(false); });
  }, []);
  return { posts, loading };
}

export function useProjects() {
  const [projects, setProjects] = useState<WPProject[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    wpFetch<WPProject[]>('/projects', mockProjects).then(data => { setProjects(data); setLoading(false); });
  }, []);
  return { projects, loading };
}

export function useTeam() {
  const [team, setTeam] = useState<WPTeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    wpFetch<WPTeamMember[]>('/team', mockTeam).then(data => { setTeam(data); setLoading(false); });
  }, []);
  return { team, loading };
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<WPTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    wpFetch<WPTestimonial[]>('/testimonials', mockTestimonials).then(data => { setTestimonials(data); setLoading(false); });
  }, []);
  return { testimonials, loading };
}
