import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Configurator from './components/Configurator';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="fixed top-0 inset-x-0 z-20 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-500 via-blue-500 to-orange-400" />
            <span className="font-semibold tracking-tight">ClipStream Agent</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#builder" className="hover:text-white">Workflow Builder</a>
            <a href="https://n8n.io" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/10">n8n</a>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        <Hero />
        <Features />
        <HowItWorks />
        <Configurator />
      </main>

      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-10 text-sm text-white/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} ClipStream Agent. Built for automated content clipping with n8n.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
