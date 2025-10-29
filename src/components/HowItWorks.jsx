import React from 'react';

const steps = [
  {
    title: 'Ingest',
    desc: 'Use n8n HTTP Request + App nodes (YouTube, Twitter/X, TikTok via RapidAPI) to fetch video links and transcripts. Store raw data in a queue (Redis/SQS).'
  },
  {
    title: 'Detect highlights',
    desc: 'Transcripts → LLM Scorer to extract hooks and timestamps. Rank by engagement metrics and novelty using a scoring prompt.'
  },
  {
    title: 'Clip & caption',
    desc: 'FFmpeg + OpenAI/Whisper for diarization and captions. Wrap with a brand template and resize to 9:16. Export MP4 + SRT.'
  },
  {
    title: 'Publish & monitor',
    desc: 'Upload via platform APIs, schedule, and auto-comment with the hook. Log runs to n8n, alert on failures, and archive to S3/Drive.'
  }
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold">How it works</h2>
          <p className="text-white/70 mt-3">This reference architecture uses n8n as the orchestrator so you can swap components with your own infrastructure.</p>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-6 counter-reset step">
          {steps.map((s, i) => (
            <li key={i} className="relative p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-white text-neutral-900 flex items-center justify-center font-semibold">{i + 1}</div>
              <h3 className="font-medium text-lg">{s.title}</h3>
              <p className="mt-2 text-white/70 text-sm leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
