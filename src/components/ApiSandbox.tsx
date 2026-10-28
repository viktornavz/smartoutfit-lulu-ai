import React, { useState } from 'react';
import { Terminal, Play, CheckCircle2, Copy, Check, Clock, Server } from 'lucide-react';

interface EndpointConfig {
  method: 'POST' | 'GET';
  path: string;
  name: string;
  description: string;
  sampleRequest: object;
  sampleResponse: object;
  latencyMs: number;
}

export const ApiSandbox: React.FC = () => {
  const endpoints: EndpointConfig[] = [
    {
      method: 'POST',
      path: '/api/v1/cv/detect-garment',
      name: 'Computer Vision Tagging & Background Cutout',
      description: 'Executes SAM segmentation, CIELAB color clustering, and Gemini Multimodal attribute extraction.',
      latencyMs: 340,
      sampleRequest: {
        imageUrl: 'https://cdn.lulu-ai.com/uploads/garment_raw_9021.webp',
        autoEnhanceLighting: true,
        confidenceThreshold: 0.85,
        extractColorPalette: true,
      },
      sampleResponse: {
        status: 'success',
        data: {
          category: 'outerwear',
          subCategory: 'Heritage Wool Blazer',
          dominantColor: {
            name: 'Charcoal Houndstooth',
            hex: '#4A4238',
            rgb: [74, 66, 56],
            cielab: [28.4, 1.2, 7.8],
          },
          secondaryPalette: ['#D6C7B2', '#222222'],
          silhouette: 'Structured Double-Breasted',
          detectedMaterial: 'Tweed Wool Blend (96% confidence)',
          formalityRating: 4, // 1 to 5
          seasonality: ['fall', 'winter', 'spring'],
          warmthRating: 4,
          vectorEmbeddingDim: 512,
          studioCutoutUrl: 'https://cdn.lulu-ai.com/processed/cutout_9021.webp',
        },
        executionTimingMs: {
          segmentation: 140,
          colorClustering: 45,
          geminiVisionTagging: 155,
        },
      },
    },
    {
      method: 'POST',
      path: '/api/v1/matchmaker/generate-outfit',
      name: 'AI Matchmaker Core (Closet + Partner Retail)',
      description: 'Calculates color wheel harmony, cosine similarity with store catalog, and weather thermal comfort.',
      latencyMs: 180,
      sampleRequest: {
        userId: 'usr_7f9b2a11-e402-4b2a',
        targetOccasion: 'office',
        weatherContext: {
          city: 'New York, NY',
          tempF: 62,
          condition: 'Brisk & Overcast',
          rainProb: 0.15,
        },
        includePartnerStores: ['Amazon Fashion', 'Nordstrom', 'ASOS'],
        maxPartnerItems: 2,
        maxPartnerBudget: 120.0,
      },
      sampleResponse: {
        status: 'success',
        outfit: {
          id: 'outfit_gen_40192',
          title: 'Effortless Modern Executive',
          colorHarmony: {
            harmonyType: 'Complementary-Neutral',
            wheelAngleDeltaDeg: 176,
            paletteScore: 0.96,
          },
          styleCoherenceScore: 0.94,
          weatherComfortScore: 0.98,
          closetSelection: [
            { id: 'w-1', name: 'Oversized Ivory Cable-Knit Sweater', category: 'tops' },
            { id: 'w-2', name: 'High-Waist Tailored Black Pleated Trousers', category: 'bottoms' },
            { id: 'w-7', name: 'Minimalist Camel Wool Trench Coat', category: 'outerwear' },
          ],
          partnerStoreAdditions: [
            {
              id: 's-101',
              title: 'Cashmere-Blend Ribbed Scarf in Olive Drab',
              store: 'Nordstrom',
              price: 49.5,
              affiliateUrl: 'https://www.nordstrom.com/s/scarf?aff=lulu_ai&subid=outfit_gen_40192',
            },
            {
              id: 's-102',
              title: 'Top-Handle Structured Leather Crossbody Bag',
              store: 'Amazon Fashion',
              price: 59.9,
              affiliateUrl: 'https://amazon.com/dp/B08XYZ?tag=smartoutfit-lulu-20',
            },
          ],
          totalRetailPrice: 109.4,
          stylistAiNotes: 'The olive ribbed texture harmonizes with the camel wool trench while anchoring the black trousers.',
        },
      },
    },
    {
      method: 'POST',
      path: '/api/v1/store/sync-prices',
      name: 'Retail Catalog Delta Price & Stock Synchronizer',
      description: 'Delta-polls Amazon PA-API v5 and partner feeds for real-time prices and availability.',
      latencyMs: 95,
      sampleRequest: {
        skus: ['AMZ-B08XYZ1234', 'NDS-892103', 'ASO-2034821'],
        forceFreshScrape: false,
      },
      sampleResponse: {
        status: 'success',
        syncedCount: 3,
        items: [
          { sku: 'AMZ-B08XYZ1234', currentPrice: 59.9, originalPrice: 69.9, inStock: true, cachedTtlSeconds: 1800 },
          { sku: 'NDS-892103', currentPrice: 49.5, originalPrice: 78.0, inStock: true, cachedTtlSeconds: 1800 },
          { sku: 'ASO-2034821', currentPrice: 24.0, originalPrice: 28.0, inStock: true, cachedTtlSeconds: 1800 },
        ],
      },
    },
    {
      method: 'POST',
      path: '/api/v1/affiliate/track-click',
      name: 'Affiliate Attribution & Universal Deep Link Router',
      description: 'Generates subID tokens, logs clickstream analytics, and generates deep link URIs.',
      latencyMs: 42,
      sampleRequest: {
        userId: 'usr_7f9b2a11',
        outfitId: 'outfit_gen_40192',
        storeItemId: 's-102',
        partnerStore: 'Amazon Fashion',
      },
      sampleResponse: {
        status: 'success',
        attributionToken: 'subid_7f9b2a11_outfit_gen_40192_1761623891',
        directDeepLinkUri: 'com.amazon.mobile.shopping.web://amazon.com/dp/B08XYZ?tag=smartoutfit-lulu-20&subId=...',
        webFallbackUrl: 'https://amazon.com/dp/B08XYZ?tag=smartoutfit-lulu-20&subId=...',
        expectedCommissionRate: '10.0%',
        cookieDurationDays: 1, // Amazon 24-hr cart cookie
      },
    },
  ];

  const [selectedEndpoint, setSelectedEndpoint] = useState<number>(1);
  const [isExecuting, setIsExecuting] = useState(false);
  const [responseOutput, setResponseOutput] = useState<any>(endpoints[1].sampleResponse);
  const [copied, setCopied] = useState(false);

  const currentEp = endpoints[selectedEndpoint];

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setResponseOutput(currentEp.sampleResponse);
      setIsExecuting(false);
    }, currentEp.latencyMs);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(responseOutput, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 glow-rose">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <Terminal className="w-4 h-4" /> Developer & Architect API Workbench
          </div>
          <h3 className="text-xl font-bold text-white mt-1">LULU AI REST API Contract Tester</h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <Server className="w-3.5 h-3.5 text-emerald-400" />
          <span>v1.0.0-PROD • Fast Latency SLA &lt;200ms</span>
        </div>
      </div>

      {/* Endpoint Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
        {endpoints.map((ep, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedEndpoint(idx);
              setResponseOutput(ep.sampleResponse);
            }}
            className={`text-left p-3 rounded-xl border text-xs transition-all ${
              selectedEndpoint === idx
                ? 'border-rose-500 bg-rose-950/20 text-white font-medium shadow-md'
                : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-mono font-bold text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                {ep.method}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">{ep.latencyMs}ms</span>
            </div>
            <div className="font-semibold truncate text-white">{ep.name}</div>
            <div className="text-[10px] font-mono text-slate-500 truncate mt-0.5">{ep.path}</div>
          </button>
        ))}
      </div>

      {/* Request and Response Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Request Pane */}
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2 font-mono">
                <span className="font-bold text-emerald-400">{currentEp.method}</span>
                <span className="text-slate-300">{currentEp.path}</span>
              </div>
              <span className="text-[11px] text-slate-400">Request Body (JSON)</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">{currentEp.description}</p>
            <pre className="text-xs font-mono text-slate-300 bg-slate-900/80 p-3 rounded-lg overflow-x-auto max-h-[320px] scrollbar-none border border-slate-800/70">
              {JSON.stringify(currentEp.sampleRequest, null, 2)}
            </pre>
          </div>

          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className="mt-4 w-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-rose-950"
          >
            <Play className={`w-3.5 h-3.5 ${isExecuting ? 'animate-spin' : ''}`} />
            <span>{isExecuting ? 'Executing API Call...' : 'Send Live Request'}</span>
          </button>
        </div>

        {/* Response Pane */}
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-emerald-400 font-bold">200 OK</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 flex items-center gap-1 font-sans text-[11px]">
                  <Clock className="w-3 h-3 text-slate-500" /> {currentEp.latencyMs} ms
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-xs font-mono text-emerald-300/90 bg-slate-900/80 p-3 rounded-lg overflow-x-auto max-h-[380px] scrollbar-none border border-slate-800/70">
              {JSON.stringify(responseOutput, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
