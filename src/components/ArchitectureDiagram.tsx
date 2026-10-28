import React, { useState } from 'react';
import { Smartphone, Server, Database, Sparkles, ShoppingBag, CloudSun, ArrowRight, ShieldCheck, Cpu, Layers } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('matchmaking');

  const nodes = [
    {
      id: 'client',
      category: 'Frontend Client Layer',
      icon: Smartphone,
      title: 'Mobile App & Web Companion',
      badge: 'React Native / Expo + React 19',
      color: 'border-blue-500/40 bg-blue-950/20 text-blue-400',
      description: 'Native camera hardware interface, offline SQLite storage, APNs/FCM push listeners, universal deep-linking for affiliate checkout.',
      details: [
        'Camera API with real-time bounding box guidance',
        'WatermelonDB / SQLite local offline sync',
        'Universal Deep Links for Amazon / Nordstrom apps',
        'Tailwind CSS mobile design system',
      ],
    },
    {
      id: 'gateway',
      category: 'Edge & Ingress',
      icon: ShieldCheck,
      title: 'API Gateway & Edge Router',
      badge: 'Cloudflare Workers / Kong',
      color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-400',
      description: 'TLS termination, JWT authentication, rate limiting (free vs pro tier), geo-IP resolution for instant localized weather.',
      details: [
        'JWT & Firebase / OAuth 2.0 Auth',
        'Rate limiting: 100 req/min free, 500 req/min Pro',
        'Edge Geo-IP header injection for weather coords',
        'WebP image compression at edge',
      ],
    },
    {
      id: 'cv_engine',
      category: 'Computer Vision Worker Pool',
      icon: Cpu,
      title: 'CV Garment Segmentation & Tagging',
      badge: 'SAM + PyTorch + Gemini 2.5 Flash',
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-400',
      description: 'Removes photo backgrounds, extracts RGB/CIELAB color centroids, identifies silhouette/neckline, and generates semantic style tags.',
      details: [
        'RMBG-v1.4 / Segment Anything background removal',
        'K-Means clustering in CIELAB color space for hex & harmony',
        'Gemini 2.5 Flash Multimodal for fabric & occasion tagging',
        'Async Celery / Redis queue worker pool',
      ],
    },
    {
      id: 'matchmaking',
      category: 'AI Matchmaking Core',
      icon: Sparkles,
      title: 'Styling & Color Matchmaker Engine',
      badge: 'Python FastAPI + Vector Math',
      color: 'border-rose-500/40 bg-rose-950/20 text-rose-400',
      description: 'Blends user wardrobe with store catalog via color theory wheel math, style embeddings, weather constraints, and wear recency.',
      details: [
        'Color wheel harmony algorithms (complementary, analogous, monochrome)',
        'pgvector 512-dim style cosine similarity ranking',
        'Weather thermal comfort constraints (warmth score 1-5)',
        'Novelty booster prioritizing unworn closet items',
      ],
    },
    {
      id: 'database',
      category: 'Data & Persistence Layer',
      icon: Database,
      title: 'PostgreSQL + pgvector + Redis',
      badge: 'Cloud SQL / Supabase + Redis 7',
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-400',
      description: 'ACID transactional data for wardrobes & saved looks, pgvector for semantic fashion search, Redis for sub-millisecond price cache.',
      details: [
        'PostgreSQL tables: users, wardrobe, store_catalog, saved_outfits',
        'pgvector HNSW index for sub-10ms similarity queries',
        'Redis 7 for session cache and store price TTL',
        'GCS / AWS S3 object store for studio-cutout images',
      ],
    },
    {
      id: 'store_sync',
      category: 'E-Commerce & External APIs',
      icon: ShoppingBag,
      title: 'Store Sync & Affiliate Router',
      badge: 'Amazon PA-API v5 + Rakuten + OpenWeather',
      color: 'border-amber-500/40 bg-amber-950/20 text-amber-400',
      description: 'Delta-sync scrapers and official retail partner APIs for live prices, stock levels, and subID affiliate click attribution.',
      details: [
        'Amazon Product Advertising API v5 integration',
        'ASOS, Nordstrom, and Rakuten affiliate data feeds',
        'Dynamic subID token injection for commission attribution',
        'OpenWeatherMap API v3 3-hour forecast integration',
      ],
    },
  ];

  const selectedNode = nodes.find((n) => n.id === activeNode) || nodes[3];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 glow-violet">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-4 h-4" /> Interactive System Architecture
          </div>
          <h3 className="text-xl font-bold text-white mt-1">SmartOutfit LULU AI Microservices Blueprint</h3>
        </div>
        <div className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
          Click any component node to inspect technical internals
        </div>
      </div>

      {/* Grid of Architecture Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {nodes.map((node) => {
          const Icon = node.icon;
          const isSelected = activeNode === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? `${node.color} ring-2 ring-rose-500/50 shadow-lg scale-[1.02]`
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 text-slate-300'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-12 h-12 bg-rose-500/10 rounded-bl-full pointer-events-none" />
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {node.category}
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60">
                  {node.badge.split('+')[0]}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-400'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{node.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{node.badge}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Node Deep-Dive Panel */}
      <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
            {React.createElement(selectedNode.icon, { className: 'w-5 h-5' })}
          </div>
          <div>
            <div className="text-xs font-mono text-rose-400 uppercase tracking-wider">{selectedNode.category}</div>
            <h4 className="text-lg font-bold text-white">{selectedNode.title}</h4>
          </div>
          <span className="ml-auto text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {selectedNode.badge}
          </span>
        </div>
        
        <p className="text-sm text-slate-300 mb-4">{selectedNode.description}</p>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Key Architectural Responsibilities & Contracts:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedNode.details.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                <ArrowRight className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
