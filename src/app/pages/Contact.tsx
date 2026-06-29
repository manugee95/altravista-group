import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, Instagram, CheckCircle } from 'lucide-react';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay }} viewport={{ once: true }} className={className}>
      {children}
    </motion.div>
  );
}

type FormState = { name: string; email: string; phone: string; company: string; service: string; message: string };

const services = [
  'Engineering Design & Consultancy',
  'Construction Services',
  'CNC Router Services',
  'CNC Plasma Cutting',
  'CNC Fibre Laser Cutting',
  'Facade Installation',
  'Building Remodeling',
  'Abrasive Products Supply',
  'Other / General Inquiry',
];

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 sm:h-96 flex items-center justify-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1707823942892-3316eeb091a0?w=1920&h=700&fit=crop&auto=format" alt="Contact" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0D3A]/90 to-[#5B3E99]/70" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-widest text-[#6FC7F1] mb-3">Get in Touch</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-['Poppins'] font-black">Contact Us</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-white/70 mt-3">We'd love to hear about your project. Let's talk.</motion.p>
        </div>
      </section>

      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-14">

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <FadeIn>
                <h2 className="text-2xl font-['Poppins'] font-black text-[#2D2D2D] mb-8">Get in Touch</h2>

                {[
                  {
                    icon: MapPin,
                    title: 'Office Address',
                    lines: ['27 Abusatu Street,', 'Off Abeokuta Expressway,', 'Lagos State, Nigeria.'],
                  },
                  {
                    icon: Phone,
                    title: 'Phone Numbers',
                    lines: ['08038285358', '08052935355', '08035369891'],
                    isPhone: true,
                  },
                  {
                    icon: Mail,
                    title: 'Email Address',
                    lines: ['altravistagroup@gmail.com'],
                    isEmail: true,
                  },
                  {
                    icon: Clock,
                    title: 'Business Hours',
                    lines: ['Monday – Friday: 8:00 AM – 6:00 PM', 'Saturday: 9:00 AM – 2:00 PM', 'Sunday: Closed'],
                  },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4 bg-white rounded-2xl p-6 border border-gray-100">
                      <div className="w-12 h-12 bg-[#EEE9F9] rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-[#5B3E99]" />
                      </div>
                      <div>
                        <h4 className="font-['Poppins'] font-bold text-[#2D2D2D] text-sm mb-2">{item.title}</h4>
                        {item.lines.map((line, li) => {
                          if (item.isPhone) return (
                            <a key={li} href={`tel:${line}`} className="block text-sm text-gray-600 hover:text-[#5B3E99] transition-colors">{line}</a>
                          );
                          if (item.isEmail) return (
                            <a key={li} href={`mailto:${line}`} className="block text-sm text-gray-600 hover:text-[#5B3E99] transition-colors">{line}</a>
                          );
                          return <p key={li} className="text-sm text-gray-600">{line}</p>;
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Social */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <h4 className="font-['Poppins'] font-bold text-[#2D2D2D] text-sm mb-4">Follow Us</h4>
                  <a href="https://instagram.com/altravistagroup" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#5B3E99] transition-colors">
                    <Instagram size={18} className="text-[#5B3E99]" />
                    @altravistagroup
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <FadeIn delay={0.1}>
                <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-100 shadow-sm">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                        <CheckCircle size={32} className="text-green-600" />
                      </div>
                      <h3 className="text-xl font-['Poppins'] font-black text-[#2D2D2D] mb-3">Message Sent!</h3>
                      <p className="text-gray-500 max-w-sm mx-auto">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                      <button
                        onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' }); }}
                        className="mt-6 text-sm text-[#5B3E99] font-semibold hover:underline"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-['Poppins'] font-black text-[#2D2D2D] mb-2">Request a Consultation</h3>
                      <p className="text-sm text-gray-500 mb-8">Fill in the form below and our team will respond within one business day.</p>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5">Full Name *</label>
                            <input name="name" value={form.name} onChange={handleChange} required
                              placeholder="Chukwuemeka Okafor"
                              className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B3E99] transition-colors" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5">Email Address *</label>
                            <input name="email" type="email" value={form.email} onChange={handleChange} required
                              placeholder="you@company.com"
                              className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B3E99] transition-colors" />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5">Phone Number</label>
                            <input name="phone" value={form.phone} onChange={handleChange}
                              placeholder="08012345678"
                              className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B3E99] transition-colors" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5">Company / Organization</label>
                            <input name="company" value={form.company} onChange={handleChange}
                              placeholder="Your Company Ltd"
                              className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B3E99] transition-colors" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5">Service of Interest</label>
                          <select name="service" value={form.service} onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B3E99] transition-colors text-gray-700">
                            <option value="">Select a service...</option>
                            {services.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#2D2D2D] mb-1.5">Project Details *</label>
                          <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                            placeholder="Describe your project, requirements, timeline, and any other relevant details..."
                            className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#5B3E99] transition-colors resize-none" />
                        </div>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full bg-[#5B3E99] hover:bg-[#4a3080] disabled:opacity-60 text-white font-['Poppins'] font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-200"
                        >
                          {submitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send size={16} /> Send Message
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.0!2d3.3249!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzEnMjcuOCJOIDPCsDE5JzI5LjYiRQ!5e0!3m2!1sen!2sng!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Altravista Group Office Location"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
