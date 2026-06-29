import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Home from '@/app/pages/Home';
import About from '@/app/pages/About';
import Subsidiaries from '@/app/pages/Subsidiaries';
import Services from '@/app/pages/Services';
import Projects from '@/app/pages/Projects';
import Blog from '@/app/pages/Blog';
import Leadership from '@/app/pages/Leadership';
import Contact from '@/app/pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/subsidiaries" element={<Subsidiaries />} />
          <Route path="/subsidiaries/:slug" element={<Subsidiaries />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
