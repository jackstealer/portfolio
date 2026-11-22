import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import SectionHeading from './SectionHeading';

// Set REACT_APP_CONTACT_API at build time to point the form at a deployed endpoint.
const CONTACT_API = process.env.REACT_APP_CONTACT_API || '/api/contact';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/jackstealer' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/atul-raj-gautam-04b170238/' },
  { name: 'X / Twitter', url: 'https://x.com/jackstealer690' },
];

const details = [
  { label: 'Email', value: 'jackstealer690@gmail.com', href: 'mailto:jackstealer690@gmail.com' },
  { label: 'Phone', value: '+91 9258298892', href: 'tel:+919258298892' },
  { label: 'Location', value: 'India' },
];

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const fields: { name: keyof FormData; label: string; type?: string; placeholder: string }[] = [
  { name: 'name', label: 'Name', placeholder: 'Your name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'your.email@example.com' },
  { name: 'subject', label: 'Subject', placeholder: "What's this about?" },
];

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors focus:border-white/40';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto grid max-w-[1150px] gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow="Get in touch" title="Contact" />
          <p className="mt-10 max-w-md text-2xl font-light leading-snug text-gray-300">
            Have a project in mind? <span className="font-semibold text-white">Let's build something</span>{' '}
            <span className="italic">intelligent</span> together.
          </p>

          <dl className="mt-12">
            {details.map((d) => (
              <div key={d.label} className="grid grid-cols-[6rem_1fr] border-t border-white/[0.07] py-4 text-[15px]">
                <dt className="text-xs uppercase tracking-[0.2em] text-muted">{d.label}</dt>
                <dd className="text-gray-200">
                  {d.href ? (
                    <a href={d.href} className="transition-colors hover:text-white">
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-gray-300 transition-colors hover:text-white"
              >
                {link.name} <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>

          <p className="mt-10 inline-flex items-center gap-3 text-sm text-gray-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for freelance projects and full-time roles
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-5 self-start rounded-[20px] border border-white/[0.06] bg-panel p-7 lg:p-10"
        >
          {fields.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted">
                {f.label}
              </label>
              <input
                id={f.name}
                name={f.name}
                type={f.type || 'text'}
                value={formData[f.name]}
                onChange={handleChange}
                required
                placeholder={f.placeholder}
                className={inputClass}
              />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Tell me about your project..."
              className={`${inputClass} resize-none`}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white font-medium text-ink transition hover:bg-gray-200 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                Sending...
              </>
            ) : (
              <>
                Send message <ArrowUpRightIcon className="h-4 w-4" />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
