import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import altraLogo from "@/imports/altra-logo.png";

const subsidiaries = [
  {
    name: "Altravista Resources",
    href: "/subsidiaries/altravista-resources",
    desc: "Civil Engineering & Construction",
  },
  {
    name: "Altravista CNC Laser",
    href: "/subsidiaries/cnc-laser",
    desc: "Precision CNC Manufacturing",
  },
  {
    name: "Altravista Abrasive Products",
    href: "/subsidiaries/abrasive-products",
    desc: "Industrial Abrasive Solutions",
  },
  {
    name: "Everything Facade",
    href: "/subsidiaries/everything-facade",
    desc: "Facade & Architectural Systems",
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  // { label: "Companies", href: "/subsidiaries", hasDropdown: true },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  // { label: "Blog", href: "/blog" },
  { label: "Team", href: "/leadership" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const isHeroPage = [
    "/",
    "/about",
    "/subsidiaries",
    "/services",
    "/projects",
    "/blog",
    "/leadership",
    "/contact",
  ].includes(location.pathname);
  const transparent = isHeroPage && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent ? "bg-transparent" : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src={altraLogo}
              alt="Altravista Group Logo"
              className="h-12 w-auto object-contain"
            />
            <div
              className={`hidden sm:block transition-colors duration-300 "text-[#2D2D2D]"}`}
            >
              <div className="font-['Poppins'] font-bold text-base leading-tight">
                ALTRAVISTA
              </div>
              <div className="font-['Poppins'] text-xs font-bold font-medium tracking-widest text-[#6FC7F1]">
                GROUP
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {/* <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded transition-colors duration-200 ${
                      transparent
                        ? "text-white hover:text-[#6FC7F1]"
                        : "text-[#2D2D2D] hover:text-[#5B3E99]"
                    }`}
                  > */}
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded transition-colors duration-200 text-[#2D2D2D] hover:text-[#5B3E99]">
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 mt-1"
                      >
                        {subsidiaries.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            className="flex flex-col px-4 py-3 hover:bg-[#EEE9F9] group transition-colors"
                          >
                            <span className="text-sm font-semibold text-[#2D2D2D] group-hover:text-[#5B3E99] font-['Poppins']">
                              {sub.name}
                            </span>
                            <span className="text-xs text-gray-500 mt-0.5">
                              {sub.desc}
                            </span>
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <Link
                            to="/subsidiaries"
                            className="flex px-4 py-2 text-sm font-medium text-[#5B3E99] hover:bg-[#EEE9F9] transition-colors"
                          >
                            View All Companies →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // <NavLink
                //   key={link.label}
                //   to={link.href}
                //   className={({ isActive }) =>
                //     `px-3 py-2 text-sm font-medium rounded transition-colors duration-200 ${
                //       isActive
                //         ? 'text-[#5B3E99]'
                //         : transparent
                //         ? 'text-white hover:text-[#6FC7F1]'
                //         : 'text-[#2D2D2D] hover:text-[#5B3E99]'
                //     }`
                //   }
                // >
                //   {link.label}
                // </NavLink>
                <NavLink
                  key={link.label}
                  to={link.href}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded transition-colors duration-200 ${
                      isActive
                        ? "text-[#5B3E99]"
                        : "text-[#2D2D2D] hover:text-[#5B3E99]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* <a
              href="tel:08038285358"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                transparent
                  ? "text-white/80 hover:text-white"
                  : "text-gray-600 hover:text-[#5B3E99]"
              }`}
            >
              <Phone size={14} />
              <span>08038285358</span>
            </a> */}
            <Link
              to="/contact"
              className="bg-[#5B3E99] hover:bg-[#4a3080] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-200"
            >
              Request Consultation
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors text-[#2D2D2D]`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  className={({ isActive }) =>
                    `px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#EEE9F9] text-[#5B3E99]"
                        : "text-[#2D2D2D] hover:bg-gray-50 hover:text-[#5B3E99]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {/* <div className="pt-3 border-t border-gray-100 mt-2">
                {subsidiaries.map((sub) => (
                  <Link
                    key={sub.href}
                    to={sub.href}
                    className="flex flex-col px-4 py-2.5 hover:bg-[#EEE9F9] rounded-lg"
                  >
                    <span className="text-sm font-medium text-[#5B3E99]">
                      {sub.name}
                    </span>
                    <span className="text-xs text-gray-500">{sub.desc}</span>
                  </Link>
                ))}
              </div> */}
              <Link
                to="/contact"
                className="mt-3 bg-[#5B3E99] text-white text-sm font-semibold px-5 py-3 rounded-lg text-center"
              >
                Request Consultation
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
