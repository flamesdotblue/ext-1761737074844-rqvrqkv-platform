import React from 'react';
import { Scissors, Bot, Globe, Settings } from 'lucide-react';

const items = [
  {
    icon: Globe,
    title: 'Source trending content',
    desc: 'Track creators, hashtags, and keywords on YouTube, TikTok, and X. Pull transcripts and metadata for candidate segments.'
  },
  {
    icon: Bot,
    title: 'Detect highlight moments',
    desc: 'Use AI to score moments by virality and novelty. Extract timestamps and hook lines from transcripts.'
  },
  {
    icon: Scissors,
    title: 'Clip and caption automatically',
    desc: 'Auto-generate vertical clips, burned-in captions, and motion templates with brand-safe styles.'
  },
  {
    icon: Settings,
    title: 'Ship on autopilot',
    desc: 'Publish to Shorts/Reels/TikTok, schedule posts, and archive assets to S3/Drive — all orchestrated by n8n.'
  }
];

export default function Features() {
  return (
    <section id="features" className="relative py-20">
      <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden>
        <div className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold">Everything you need to auto-clip</h2>
          <p className="text-white/70 mt-3">Composable with n8n nodes. Swap models, storages, and publishers without code changes.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <div key={i} className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
              <it.icon className="h-6 w-6 text-white/80" />
              <h3 className="mt-4 font-medium text-lg">{it.title}</h3>
              <p className="mt-2 text-white/70 text-sm leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
