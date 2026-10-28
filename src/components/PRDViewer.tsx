import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, DollarSign, Database, Server, Smartphone, 
  Sparkles, Layers, Cpu, ArrowRight, ShieldCheck, ChevronRight, 
  Search, Sliders, Calendar, ShoppingCart, Bell, Tag, Eye, Copy, Check
} from 'lucide-react';
import { prdDocument } from '../data/prdContent';
import { ArchitectureDiagram } from './ArchitectureDiagram';

export const PRDViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'exec' | 'arch' | 'features' | 'monetization'>('exec');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Unit economics interactive calculator state
  const [monthlyActiveUsers, setMonthlyActiveUsers] = useState<number>(100000);
  const [proConversionRate, setProConversionRate] = useState<number>(4.5);
  const [affiliateOrdersPerUser, setAffiliateOrdersPerUser] = useState<number>(1.2);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(65);

  const calculateAnnualRevenue = () => {
    // 1. Pro Subscriptions ($7.99/mo)
    const proUsers = monthlyActiveUsers * (proConversionRate / 100);
    const annualProRevenue = proUsers * 7.99 * 12;

    // 2. Affiliate revenue (9% blended commission on AOV)
    const annualOrders = monthlyActiveUsers * affiliateOrdersPerUser * 12;
    const annualAffiliateRevenue = annualOrders * averageOrderValue * 0.09;

    // 3. Brand Sponsorships & Trend data estimate (~15% of total)
    const baseRevenue = annualProRevenue + annualAffiliateRevenue;
    const sponsorships = baseRevenue * 0.15;

    const total = baseRevenue + sponsorships;
    return {
      total: Math.round(total),
      pro: Math.round(annualProRevenue),
      affiliate: Math.round(annualAffiliateRevenue),
      sponsorships: Math.round(sponsorships),
    };
  };

  const revenue = calculateAnnualRevenue();

  const handleCopySection = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const featureIcons = [
    Search,
    Smartphone,
    Cpu,
    Sparkles,
    Sliders,
    Calendar,
    ShoppingCart,
    Bell,
  ];

  return (
    <div className="space-y-8">
      {/* Sub-Navigation for PRD Sections */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        {[
          { id: 'exec', label: '1. Executive Summary', icon: FileText },
          { id: 'arch', label: '2. Software Architecture', icon: Layers },
          { id: 'features', label: '3. 8 Features Breakdown', icon: Sparkles },
          { id: 'monetization', label: '4. Monetization Model', icon: DollarSign },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                isActive
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-900/40 font-semibold'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: EXECUTIVE SUMMARY */}
      {activeTab === 'exec' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 border border-slate-800 rounded-2xl p-6 glow-rose">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-widest font-semibold">
                PRD Section 1 • Executive Brief
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                Code Name: {prdDocument.header.codeName}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-serif-fashion tracking-wide">
              SmartOutfit LULU AI: Vision & Executive Summary
            </h2>
            <p className="text-slate-300 text-base leading-relaxed max-w-4xl">
              {prdDocument.executiveSummary.vision}
            </p>
          </div>

          {/* Problem vs Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> The Problem
              </div>
              <h3 className="text-lg font-bold text-white mb-3">The Wardrobe Paradox & High E-Commerce Returns</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {prdDocument.executiveSummary.problemStatement}
              </p>
            </div>

            <div className="bg-slate-900/50 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> The LULU AI Solution
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Intelligent Wardrobe Matching & Bridge Commerce</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {prdDocument.executiveSummary.solution}
              </p>
            </div>
          </div>

          {/* Target Personas */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-rose-400" /> Target User Personas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {prdDocument.executiveSummary.targetPersonas.map((persona, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-white text-sm mb-1 text-rose-200">{persona.name}</h4>
                    <div className="text-xs text-slate-400 mb-3">
                      <strong className="text-slate-300">Core Pain:</strong> {persona.pain}
                    </div>
                  </div>
                  <div className="text-xs text-emerald-300 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/30">
                    <strong>LULU Solution:</strong> {persona.valueProp}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Success Metrics (KPIs) */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">North Star & Key Performance Indicators (KPIs)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {prdDocument.executiveSummary.kpis.map((kpi, idx) => (
                <div key={idx} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold font-mono text-rose-400">{kpi.target}</div>
                  <div className="text-xs font-semibold text-white mt-1 mb-0.5">{kpi.metric}</div>
                  <div className="text-[11px] text-slate-400">{kpi.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ARCHITECTURE */}
      {activeTab === 'arch' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Interactive Microservices Architecture Blueprint */}
          <ArchitectureDiagram />

          {/* Architecture Layer Breakdown */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-rose-400" /> Architectural Layers & Technology Selections
            </h3>

            <div className="space-y-3">
              {prdDocument.architecture.layers.map((layer, idx) => (
                <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-bold text-white">{layer.layer}</span>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-rose-300 border border-slate-700">
                      {layer.tech}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{layer.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Database Entity Relationship (ERD) & DDL Schemas */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" /> Relational Database Schema & Vector Storage
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">PostgreSQL with pgvector for fashion style embeddings</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prdDocument.architecture.databaseSchema.map((schema, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase">TABLE: {schema.table}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-3 font-sans">{schema.description}</p>
                  <div className="space-y-1">
                    {schema.columns.map((col, cIdx) => (
                      <div key={cIdx} className="text-[11px] text-slate-300 flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                        <span>{col}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: 8 FEATURES BREAKDOWN */}
      {activeTab === 'features' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-rose-400 uppercase tracking-widest font-semibold">
                PRD Section 3 • Functional Specs
              </span>
              <span className="text-xs text-slate-400 font-mono">User Actions vs Behind-the-Scenes AI</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Detailed Breakdown of the 8 Core Application Features
            </h2>
            <p className="text-sm text-slate-300">
              Each module specifies the frontend user journey, backend processing, computer vision / algorithms, API contracts, and edge-case handling.
            </p>
          </div>

          <div className="space-y-6">
            {prdDocument.featuresBreakdown.map((feat, idx) => {
              const Icon = featureIcons[idx] || Sparkles;
              return (
                <div
                  key={feat.num}
                  id={`feature-${feat.num}`}
                  className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-base font-mono">
                        {feat.num}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                          Feature Module {feat.num}
                        </span>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Icon className="w-4 h-4 text-rose-400" />
                          {feat.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* User Action */}
                    <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
                        <Smartphone className="w-3.5 h-3.5" /> What the User Does (Client Journey)
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">{feat.userAction}</p>
                    </div>

                    {/* Tech / AI Action */}
                    <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
                        <Cpu className="w-3.5 h-3.5" /> What Technology & AI Does Behind the Scenes
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">{feat.techProcessing}</p>
                    </div>
                  </div>

                  {/* API Endpoints & Edge Cases */}
                  <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="font-mono text-emerald-400 font-semibold text-[11px] shrink-0">
                        API Endpoints:
                      </span>
                      <code className="text-slate-300 font-mono text-[11px] break-all">{feat.apiEndpoints}</code>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                      <span className="font-mono text-amber-400 font-semibold text-[11px] shrink-0">
                        Edge Cases & Resilience:
                      </span>
                      <span className="text-slate-400 text-xs">{feat.edgeCases}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 4: MONETIZATION MODEL */}
      {activeTab === 'monetization' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-slate-800 rounded-2xl p-6 glow-rose">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold">
                PRD Section 4 • Business & Revenue Architecture
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
                High-Margin Fashion Tech
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Multi-Tiered Monetization Model for SmartOutfit LULU AI
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {prdDocument.monetization.overview}
            </p>
          </div>

          {/* Revenue Streams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prdDocument.monetization.revenueStreams.map((stream, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white text-base">{stream.stream}</h3>
                    <span className="text-xs font-mono text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded">
                      {stream.share}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{stream.details}</p>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs text-emerald-300 font-mono">
                  <div className="text-[10px] text-slate-500 uppercase font-sans font-semibold mb-0.5">
                    Unit Economics:
                  </div>
                  {stream.economics}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Unit Economics & Annual Recurring Revenue (ARR) Simulator */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" /> Interactive Financial Model & ARR Calculator
                </h3>
                <p className="text-xs text-slate-400">Tweak user scale and conversion metrics to project unit economics</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Projected Annual Gross:</span>
                <div className="text-2xl font-bold text-emerald-400 font-mono">
                  ${revenue.total.toLocaleString()} / yr
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Slider 1: MAU */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300">Monthly Active Users:</span>
                  <span className="font-mono text-rose-400 font-bold">{monthlyActiveUsers.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="10000"
                  value={monthlyActiveUsers}
                  onChange={(e) => setMonthlyActiveUsers(Number(e.target.value))}
                  className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2: Pro Conversion */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300">Pro Sub Conversion:</span>
                  <span className="font-mono text-purple-400 font-bold">{proConversionRate}%</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.5"
                  value={proConversionRate}
                  onChange={(e) => setProConversionRate(Number(e.target.value))}
                  className="w-full accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 3: Affiliate Orders */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300">Affiliate Buys / User / Mo:</span>
                  <span className="font-mono text-amber-400 font-bold">{affiliateOrdersPerUser}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={affiliateOrdersPerUser}
                  onChange={(e) => setAffiliateOrdersPerUser(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 4: AOV */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-300">Average Order Value:</span>
                  <span className="font-mono text-emerald-400 font-bold">${averageOrderValue}</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="150"
                  step="5"
                  value={averageOrderValue}
                  onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Breakdown Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Affiliate Commissions (9% blended):</span>
                <div className="text-xl font-bold font-mono text-amber-400 mt-1">
                  ${revenue.affiliate.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500">From Amazon, Nordstrom, ASOS</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">LULU Stylist Pro ($7.99/mo):</span>
                <div className="text-xl font-bold font-mono text-purple-400 mt-1">
                  ${revenue.pro.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500">
                  {((monthlyActiveUsers * proConversionRate) / 100).toLocaleString()} paying subscribers
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Retail Media & Trend Data:</span>
                <div className="text-xl font-bold font-mono text-blue-400 mt-1">
                  ${revenue.sponsorships.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500">Sponsored capsule drops</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
