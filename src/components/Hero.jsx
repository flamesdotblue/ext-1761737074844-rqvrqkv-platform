import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[70vh] w-full">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/10 via-neutral-950/30 to-neutral-950" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="max-w-3xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur">
            <Rocket className="h-4 w-4 text-white/90" />
            <span className="text-xs tracking-wide uppercase text-white/80">AI Voice Agent Aura • n8n powered</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
            Auto-clip popular content with an n8n agent
          </h1>
          <p className="text-white/80 text-lg md:text-xl">
            Discover trending moments across YouTube, TikTok, and X. Auto-generate short clips, captions, and publish on schedule — fully automated with n8n.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <a href="#builder" className="px-5 py-3 rounded-md bg-white text-neutral-950 font-medium hover:bg-white/90 transition">Build your workflow</a>
            <a href="#how" className="px-5 py-3 rounded-md bg-white/10 border border-white/15 hover:bg-white/15 transition">See how it works</a>
          </div>
        </div>
      </div>
    </section>
  );
}
