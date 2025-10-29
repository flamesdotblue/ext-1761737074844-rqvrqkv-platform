import React, { useMemo, useState } from 'react';
import { Download, Copy, Settings } from 'lucide-react';

export default function Configurator() {
  const [sources, setSources] = useState({ youtube: true, tiktok: true, x: false });
  const [clipLen, setClipLen] = useState(35);
  const [dailyClips, setDailyClips] = useState(6);
  const [schedule, setSchedule] = useState('0 */4 * * *');
  const [storage, setStorage] = useState('s3');

  const workflow = useMemo(() => {
    const enabledSources = Object.entries(sources).filter(([_, v]) => v).map(([k]) => k);
    return {
      name: 'ClipStream Agent – Auto Clip Popular Content',
      active: false,
      nodes: [
        {
          id: 'cron', type: 'n8n-nodes-base.cron', name: 'Schedule', position: [200, 200],
          parameters: { triggerTimes: { item: [{ mode: 'custom', cronExpression: schedule }] } }
        },
        {
          id: 'fetchSources', type: 'n8n-nodes-base.httpRequest', name: 'Fetch Trending', position: [480, 200],
          parameters: {
            options: { responseFormat: 'json' },
            url: 'https://api.your-source-aggregator.example/trending',
            queryParametersUi: { parameter: [
              { name: 'platforms', value: enabledSources.join(',') },
              { name: 'limit', value: String(dailyClips) },
            ]}
          }
        },
        {
          id: 'transcribe', type: 'n8n-nodes-base.httpRequest', name: 'Transcribe', position: [760, 200],
          parameters: {
            url: 'https://transcribe.example/whisper',
            options: { responseFormat: 'json' }
          }
        },
        {
          id: 'score', type: 'n8n-nodes-base.openAi', name: 'Score Highlights', position: [1040, 200],
          parameters: {
            operation: 'chat',
            model: 'gpt-4o-mini',
            systemMessage: 'Extract 10 high-retention moments with timestamps and hooks. Return JSON array with start,end,hook,topic,score.',
            input: '={{$json.transcript}}'
          }
        },
        {
          id: 'clip', type: 'n8n-nodes-base.httpRequest', name: 'Clip & Caption', position: [1320, 200],
          parameters: {
            url: 'https://render.example/ffmpeg-clip',
            options: { responseFormat: 'file' },
            queryParametersUi: { parameter: [
              { name: 'length', value: String(clipLen) },
              { name: 'format', value: '9:16' }
            ]}
          }
        },
        {
          id: 'store', type: 'n8n-nodes-base.' + (storage === 's3' ? 's3' : 'googleDrive'), name: 'Store Asset', position: [1600, 200],
          parameters: storage === 's3'
            ? { operation: 'upload', bucketName: 'clips', propertyName: 'data' }
            : { operation: 'upload', binaryPropertyName: 'data', parents: [] }
        },
        {
          id: 'publish', type: 'n8n-nodes-base.httpRequest', name: 'Publish', position: [1880, 200],
          parameters: { url: 'https://publish.example/social', options: { responseFormat: 'json' } }
        }
      ],
      connections: {
        'Schedule': { main: [[{ node: 'Fetch Trending', type: 'main', index: 0 }]] },
        'Fetch Trending': { main: [[{ node: 'Transcribe', type: 'main', index: 0 }]] },
        'Transcribe': { main: [[{ node: 'Score Highlights', type: 'main', index: 0 }]] },
        'Score Highlights': { main: [[{ node: 'Clip & Caption', type: 'main', index: 0 }]] },
        'Clip & Caption': { main: [[{ node: 'Store Asset', type: 'main', index: 0 }]] },
        'Store Asset': { main: [[{ node: 'Publish', type: 'main', index: 0 }]] }
      },
      meta: {
        platforms: enabledSources,
        clipSeconds: clipLen,
        perRun: dailyClips,
        storage
      }
    };
  }, [sources, clipLen, dailyClips, schedule, storage]);

  const jsonString = useMemo(() => JSON.stringify(workflow, null, 2), [workflow]);

  const copyJSON = async () => {
    try { await navigator.clipboard.writeText(jsonString); } catch {}
  };

  const downloadJSON = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clipstream-agent-n8n-workflow.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="builder" className="py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-start justify-between gap-8 flex-col lg:flex-row">
          <div className="w-full lg:w-5/12 space-y-6">
            <div className="flex items-center gap-2 text-white/80">
              <Settings className="h-5 w-5" />
              <h2 className="text-2xl md:text-3xl font-semibold">Build your n8n workflow</h2>
            </div>
            <p className="text-white/70">Configure sources, clip length, schedule, and storage. Export the JSON and import directly into n8n.</p>

            <div className="space-y-4">
              <fieldset className="p-4 rounded-lg bg-white/5 border border-white/10">
                <legend className="px-2 text-sm text-white/70">Sources</legend>
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { key: 'youtube', label: 'YouTube' },
                    { key: 'tiktok', label: 'TikTok' },
                    { key: 'x', label: 'X / Twitter' },
                  ].map(opt => (
                    <label key={opt.key} className={`px-3 py-1.5 rounded-md border cursor-pointer select-none ${sources[opt.key] ? 'bg-white text-neutral-900 border-transparent' : 'bg-transparent border-white/20 text-white/80'}`}> 
                      <input
                        type="checkbox"
                        checked={sources[opt.key]}
                        onChange={(e) => setSources(s => ({ ...s, [opt.key]: e.target.checked }))}
                        className="hidden"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="p-4 rounded-lg bg-white/5 border border-white/10 block">
                  <span className="text-sm text-white/70">Clip length (seconds)</span>
                  <input type="number" min={10} max={120} value={clipLen}
                         onChange={(e) => setClipLen(Number(e.target.value))}
                         className="mt-2 w-full bg-transparent border border-white/20 rounded-md px-3 py-2 focus:outline-none focus:border-white/40" />
                </label>
                <label className="p-4 rounded-lg bg-white/5 border border-white/10 block">
                  <span className="text-sm text-white/70">Clips per run</span>
                  <input type="number" min={1} max={20} value={dailyClips}
                         onChange={(e) => setDailyClips(Number(e.target.value))}
                         className="mt-2 w-full bg-transparent border border-white/20 rounded-md px-3 py-2 focus:outline-none focus:border-white/40" />
                </label>
              </div>

              <label className="p-4 rounded-lg bg-white/5 border border-white/10 block">
                <span className="text-sm text-white/70">Cron schedule</span>
                <input type="text" value={schedule}
                       onChange={(e) => setSchedule(e.target.value)}
                       className="mt-2 w-full bg-transparent border border-white/20 rounded-md px-3 py-2 focus:outline-none focus:border-white/40" />
                <div className="text-xs text-white/50 mt-1">Example: 0 */4 * * * runs every 4 hours</div>
              </label>

              <label className="p-4 rounded-lg bg-white/5 border border-white/10 block">
                <span className="text-sm text-white/70">Storage</span>
                <select value={storage} onChange={(e) => setStorage(e.target.value)}
                        className="mt-2 w-full bg-transparent border border-white/20 rounded-md px-3 py-2 focus:outline-none focus:border-white/40">
                  <option value="s3" className="bg-neutral-900">Amazon S3</option>
                  <option value="gdrive" className="bg-neutral-900">Google Drive</option>
                </select>
              </label>

              <div className="flex items-center gap-3 pt-2">
                <button onClick={copyJSON} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-neutral-900 hover:bg-white/90">
                  <Copy className="h-4 w-4" /> Copy JSON
                </button>
                <button onClick={downloadJSON} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/10 border border-white/15 hover:bg-white/15">
                  <Download className="h-4 w-4" /> Download
                </button>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-7/12">
            <div className="rounded-xl border border-white/10 bg-neutral-900/60 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-sm text-white/70">n8n Workflow JSON</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/50">import via: Workflows → Import from file</span>
                </div>
              </div>
              <pre className="p-4 overflow-auto text-xs leading-relaxed"><code>{jsonString}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
