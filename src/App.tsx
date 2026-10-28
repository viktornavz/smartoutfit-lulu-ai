import React, { useState } from 'react';
import { 
  Sparkles, FileText, Smartphone, Terminal, Download, 
  ExternalLink, Layers, ShieldCheck, Heart, ShoppingBag, 
  ChevronRight, Compass, CheckCircle2, ArrowRight
} from 'lucide-react';
import { PRDViewer } from './components/PRDViewer';
import { AppSimulator } from './components/AppSimulator';
import { ApiSandbox } from './components/ApiSandbox';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'prd' | 'simulator' | 'api'>('prd');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-purple-950 border-b border-rose-500/20 px-4 py-2 text-center text-xs text-rose-200 flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
        <span className="font-semibold">Official Engineering Blueprint & Functional Prototype:</span>
        <span className="text-slate-300">SmartOutfit LULU AI • Ready for Stakeholder Review</span>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Brand & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-900/40">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white font-serif-fashion">
                  SmartOutfit <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400">LULU AI</span>
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  v1.0 PRD
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                AI Personal Styling, Virtual Wardrobe & Partner Affiliate Commerce
              </p>
            </div>
          </div>

          {/* Primary View Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs sm:text-sm">
            <button
              onClick={() => setCurrentView('prd')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                currentView === 'prd'
                  ? 'bg-rose-500 text-white font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>PRD & Specs</span>
            </button>

            <button
              onClick={() => setCurrentView('simulator')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                currentView === 'simulator'
                  ? 'bg-rose-500 text-white font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>App Simulator</span>
            </button>

            <button
              onClick={() => setCurrentView('api')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                currentView === 'api'
                  ? 'bg-rose-500 text-white font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>API Sandbox</span>
            </button>
          </div>

          {/* Action Button: Export PRD */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-2 rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-rose-400" />
              <span>Export PRD (.MD)</span>
            </button>
          </div>

        </div>
      </header>

      {/* Hero Stats Ribbon */}
      <section className="bg-slate-900/40 border-b border-slate-800/60 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6 text-slate-300">
            <div>
              <span className="text-slate-500 mr-1.5">Architecture:</span>
              <strong className="text-rose-300 font-mono">Microservices + PyTorch + pgvector</strong>
            </div>
            <div className="hidden sm:block">
              <span className="text-slate-500 mr-1.5">Core Features:</span>
              <strong className="text-white font-mono">8 Modules Specified</strong>
            </div>
            <div className="hidden md:block">
              <span className="text-slate-500 mr-1.5">Blended Commission:</span>
              <strong className="text-emerald-400 font-mono">6% - 12% Affiliate Share</strong>
            </div>
          </div>
          <div className="flex items-center gap-2 text-rose-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px]">System Status: Ready for Sprint Planning</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        {currentView === 'prd' && <PRDViewer />}
        {currentView === 'simulator' && <AppSimulator />}
        {currentView === 'api' && <ApiSandbox />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
              L
            </div>
            <span>SmartOutfit LULU AI • Product Owner & Lead Solutions Architect Specification</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>React Native + Python FastAPI + pgvector</span>
            <span>•</span>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="text-rose-400 hover:underline cursor-pointer"
            >
              Download Full PRD
            </button>
          </div>
        </div>
      </footer>

      {/* Export Modal */}
      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
    </div>
  );
}
