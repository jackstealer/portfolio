import React from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';

const Footer: React.FC = () => (
  <footer className="border-t border-white/[0.07] px-6 py-10 lg:px-11">
    <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
      <div>
        <p className="text-[15px] font-extrabold tracking-[0.08em] text-white">ATUL RAJ GAUTAM</p>
        <p className="mt-1 text-sm text-gray-500">
          © {new Date().getFullYear()} Atul Raj Gautam. Building the future, one line of code at a time.
        </p>
      </div>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="inline-flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-white"
      >
        Back to top
        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15">
          <ArrowUpIcon className="h-4 w-4" />
        </span>
      </button>
    </div>
  </footer>
);

export default Footer;
