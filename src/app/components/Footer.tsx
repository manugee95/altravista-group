import { Link } from 'react-router';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import altraLogo from '@/imports/altra-logo.png';

const subsidiaryLinks = [
  { label: 'Altravista Resources', href: '/subsidiaries/altravista-resources' },
  { label: 'Altravista CNC Laser', href: '/subsidiaries/cnc-laser' },
  { label: 'Altravista Abrasive Products', href: '/subsidiaries/abrasive-products' },
  { label: 'Everything Facade', href: '/subsidiaries/everything-facade' },
];

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Projects Portfolio', href: '/projects' },
  { label: 'Leadership Team', href: '/leadership' },
  // { label: 'Blog & News', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
];

const serviceLinks = [
  'Engineering Design & Consultancy',
  'Construction Services',
  'CNC Router Services',
  'CNC Fibre Laser Cutting',
  'Facade Installation',
  'Building Remodeling',
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="bg-[#1A0D3A] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src={altraLogo} alt="Altravista Group" className="h-12 w-auto object-contain brightness-0 invert" />
              <div>
                <div className="font-['Poppins'] font-bold text-base">ALTRAVISTA</div>
                <div className="font-['Poppins'] text-xs tracking-widest text-[#6FC7F1]">GROUP</div>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              A diversified engineering, manufacturing, and construction group delivering world-class solutions across Nigeria and West Africa.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: 'https://instagram.com/altravistagroup', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-[#5B3E99] rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Poppins'] font-bold text-sm uppercase tracking-widest text-[#6FC7F1] mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-300 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Companies */}
          <div>
            <h4 className="font-['Poppins'] font-bold text-sm uppercase tracking-widest text-[#6FC7F1] mb-5">Our Companies</h4>
            <ul className="space-y-2.5">
              {subsidiaryLinks.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-300 hover:text-white inline-flex items-center gap-1.5 transition-colors duration-200 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-['Poppins'] font-bold text-sm uppercase tracking-widest text-[#6FC7F1] mb-4 mt-8">Key Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map(s => (
                <li key={s} className="text-sm text-gray-400">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-['Poppins'] font-bold text-sm uppercase tracking-widest text-[#6FC7F1] mb-5">Contact Us</h4>
            <ul className="space-y-4 mb-7">
              <li className="flex gap-3">
                <MapPin size={16} className="text-[#6FC7F1] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">27 Abusatu Street, Off Abeokuta Expressway, Lagos State, Nigeria.</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-[#6FC7F1] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300 space-y-1">
                  <a href="tel:08038285358" className="block hover:text-white transition-colors">08038285358</a>
                  <a href="tel:08052935355" className="block hover:text-white transition-colors">08052935355</a>
                  <a href="tel:08035369891" className="block hover:text-white transition-colors">08035369891</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-[#6FC7F1] flex-shrink-0 mt-0.5" />
                <a href="mailto:altravistagroup@gmail.com" className="text-sm text-gray-300 hover:text-white transition-colors">
                  altravistagroup@gmail.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <h5 className="font-['Poppins'] font-semibold text-sm mb-3">Stay Updated</h5>
              {subscribed ? (
                <p className="text-sm text-[#6FC7F1]">Thank you for subscribing!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#6FC7F1] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#5B3E99] hover:bg-[#4a3080] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Altravista Group. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
