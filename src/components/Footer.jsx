import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/60 text-sm">© {new Date().getFullYear()} AutoClip Agent for n8n. Built with React, Tailwind, and Spline.</p>
        <nav className="flex items-center gap-4 text-sm">
          <a href="#how" className="text-white/70 hover:text-white">How it works</a>
          <a href="#configure" className="text-white/70 hover:text-white">Configure</a>
          <a href="#" className="text-white/70 hover:text-white">Docs</a>
        </nav>
      </div>
    </footer>
  );
}
