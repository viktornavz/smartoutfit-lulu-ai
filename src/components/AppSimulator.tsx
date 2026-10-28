import React, { useState } from 'react';
import { 
  Camera, Sparkles, ShoppingBag, Bookmark, Search, CloudSun, 
  ExternalLink, Check, RefreshCw, SlidersHorizontal, Plus, 
  Calendar, Heart, ShieldCheck, Tag, Zap, AlertCircle, ArrowUpRight
} from 'lucide-react';
import { WardrobeItem, StorePartnerItem, Occasion, FashionStyle } from '../types/prd';
import { initialWardrobeItems } from '../data/mockWardrobe';
import { mockStoreCatalog } from '../data/mockStoreCatalog';

export const AppSimulator: React.FC = () => {
  // Mobile App State
  const [activeTab, setActiveTab] = useState<'matchmaker' | 'closet' | 'store' | 'lookbook'>('matchmaker');
  const [closetItems, setClosetItems] = useState<WardrobeItem[]>(initialWardrobeItems);
  const [selectedClosetCategory, setSelectedClosetCategory] = useState<string>('all');
  
  // Scanning / CV State
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [scannedGarment, setScannedGarment] = useState<WardrobeItem | null>(null);

  // Matchmaking State
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion>('office');
  const [weatherCondition, setWeatherCondition] = useState<'mild' | 'rainy' | 'cold' | 'warm'>('mild');
  const [isGeneratingMatch, setIsGeneratingMatch] = useState(false);
  const [matchResult, setMatchResult] = useState<{
    id: string;
    title: string;
    harmony: string;
    score: number;
    explanation: string;
    closet: WardrobeItem[];
    store: StorePartnerItem[];
    totalShopCost: number;
  }>({
    id: 'outfit-preview-1',
    title: 'Effortless Modern Executive',
    harmony: 'Complementary Neutral',
    score: 96,
    explanation: 'Pairs your high-waist black trousers and ivory sweater with an Olive Cashmere scarf from Nordstrom to create sophisticated earthy depth for crisp 62°F weather.',
    closet: [initialWardrobeItems[0], initialWardrobeItems[1], initialWardrobeItems[6]],
    store: [mockStoreCatalog[0], mockStoreCatalog[1]],
    totalShopCost: 109.40,
  });

  // Store & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [budgetMax, setBudgetMax] = useState<number>(100);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [affiliateModalItem, setAffiliateModalItem] = useState<StorePartnerItem | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Lookbook / Saved Outfits State
  const [savedOutfits, setSavedOutfits] = useState<any[]>([
    {
      id: 'saved-1',
      title: 'Effortless Modern Executive',
      occasion: 'office',
      scheduledDate: '2026-10-28 (Tomorrow)',
      itemsCount: 4,
      score: 96,
    },
    {
      id: 'saved-2',
      title: 'Rainy Day Weekend Coffee',
      occasion: 'casual',
      scheduledDate: '2026-11-01 (Saturday)',
      itemsCount: 3,
      score: 92,
    },
  ]);
  const [saveSuccessNotification, setSaveSuccessNotification] = useState<string | null>(null);

  // Daily Morning Notification Banner State
  const [showNotificationBanner, setShowNotificationBanner] = useState(true);

  // Simulate Computer Vision Garment Scanner
  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanStep('Detecting bounding box & removing background (SAM Model)...');
    
    setTimeout(() => {
      setScanStep('Clustering pixels in CIELAB color space (#2E4F4F Dark Forest)...');
    }, 900);

    setTimeout(() => {
      setScanStep('Gemini 2.5 Multimodal: Extracting fabric, silhouette & neckline...');
    }, 1800);

    setTimeout(() => {
      const newItem: WardrobeItem = {
        id: `w-${Date.now()}`,
        name: 'Ribbed Emerald Knit Midi Dress',
        category: 'dresses',
        subCategory: 'Midi Dress',
        primaryColor: 'Emerald Green',
        primaryColorHex: '#1B4D3E',
        style: ['business_casual', 'cocktail', 'minimalist'],
        season: ['fall', 'winter', 'spring'],
        warmthRating: 3,
        imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
        dateAdded: 'Just now (Auto-scanned)',
        timesWorn: 0,
        detectedAttributes: {
          pattern: 'Fine Ribbed Knit',
          material: 'Viscose Blend',
          neckline: 'Sweetheart',
          fit: 'fitted',
          confidenceScore: 0.99,
        },
      };
      setScannedGarment(newItem);
      setClosetItems((prev) => [newItem, ...prev]);
      setIsScanning(false);
      setScanStep('');
    }, 2800);
  };

  // Simulate AI Matchmaker Execution
  const handleGenerateOutfit = () => {
    setIsGeneratingMatch(true);
    setTimeout(() => {
      let harmony = 'Complementary Accent';
      let title = 'Autumn Boardroom Minimal';
      let explanation = 'Harmonizes your tailored black trousers with an oversized ivory knit, accented by cognac leather accessories and a warm gold chain.';
      let closetSelection = [closetItems[0], closetItems[1], closetItems[5]];
      let storeSelection = [mockStoreCatalog[1], mockStoreCatalog[2]];

      if (weatherCondition === 'rainy') {
        title = 'Chic Rainy Commuter';
        harmony = 'Monochrome Functional';
        explanation = 'Pairs your raw selvedge denim and Chelsea boots with Amazon Essentials waterproof trench mac to keep you dry without sacrificing tailored style.';
        closetSelection = [closetItems[3], closetItems[5]];
        storeSelection = [mockStoreCatalog[3]];
      } else if (selectedOccasion === 'date_night' || selectedOccasion === 'cocktail_party') {
        title = 'Sophisticated Evening Soirée';
        harmony = 'Monochromatic Noir & Gold';
        explanation = 'Elevates your champagne mulberry silk blouse with pointed slingback heels and a gold collar necklace for effortless night-time radiance.';
        closetSelection = [closetItems[4], closetItems[1]];
        storeSelection = [mockStoreCatalog[6], mockStoreCatalog[2]];
      } else if (weatherCondition === 'cold') {
        title = 'Cozy Layered Winter Wool';
        harmony = 'Analogous Earth Warmth';
        explanation = 'Layers your Camel trench over the chunky ivory knit, wrapped with a cashmere-blend olive scarf to withstand brisk 42°F winds.';
        closetSelection = [closetItems[0], closetItems[6], closetItems[1]];
        storeSelection = [mockStoreCatalog[0]];
      }

      const totalCost = storeSelection.reduce((acc, curr) => acc + curr.price, 0);

      setMatchResult({
        id: `outfit-${Date.now()}`,
        title,
        harmony,
        score: Math.floor(Math.random() * 6) + 93,
        explanation,
        closet: closetSelection.filter(Boolean),
        store: storeSelection,
        totalShopCost: Number(totalCost.toFixed(2)),
      });
      setIsGeneratingMatch(false);
    }, 700);
  };

  // Save Outfit to Lookbook
  const handleSaveLook = () => {
    const newLook = {
      id: `saved-${Date.now()}`,
      title: matchResult.title,
      occasion: selectedOccasion,
      scheduledDate: '2026-10-30 (Friday)',
      itemsCount: matchResult.closet.length + matchResult.store.length,
      score: matchResult.score,
    };
    setSavedOutfits((prev) => [newLook, ...prev]);
    setSaveSuccessNotification(`Look "${matchResult.title}" saved to your Lookbook!`);
    setTimeout(() => setSaveSuccessNotification(null), 3000);
  };

  // Simulate Affiliate Link Tracking & Redirection
  const handleAffiliateClick = (item: StorePartnerItem) => {
    setAffiliateModalItem(item);
  };

  const executeRedirect = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      setIsRedirecting(false);
      setAffiliateModalItem(null);
      // Informative alert/toast inside prototype
      setSaveSuccessNotification(`Redirected to ${affiliateModalItem?.storeName}! Affiliate tracking token attached: tag=smartoutfit-lulu-20`);
      setTimeout(() => setSaveSuccessNotification(null), 4000);
    }, 1200);
  };

  // Filter store items
  const filteredStoreItems = mockStoreCatalog.filter((item) => {
    if (selectedStore !== 'all' && item.storeName !== selectedStore) return false;
    if (item.price > budgetMax) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col items-center justify-center py-4">
      {/* Simulation Context Header */}
      <div className="w-full max-w-4xl mb-4 bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white">Live LULU AI Smartphone Client Simulator</span>
          <span className="bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded text-[10px] font-mono">React Native Runtime</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span>Testing all 8 PRD Features interactively</span>
        </div>
      </div>

      {/* Smartphone Device Shell */}
      <div className="relative w-full max-w-[420px] rounded-[48px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl border-4 border-slate-700/80">
        {/* Hardware Notch / Dynamic Island */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 mr-2" />
          <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
        </div>

        {/* Mobile Screen Container */}
        <div className="relative w-full h-[740px] bg-slate-950 rounded-[40px] overflow-hidden flex flex-col text-slate-100 border border-slate-800">
          
          {/* Top Status Bar */}
          <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-medium text-slate-400 shrink-0 z-20">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>

          {/* Daily Suggestions & Weather Briefing Banner (Feature 8) */}
          {showNotificationBanner && (
            <div className="mx-3 mt-1 mb-2 p-2.5 rounded-xl bg-gradient-to-r from-rose-950/70 via-purple-950/70 to-slate-900 border border-rose-500/30 flex items-start justify-between gap-2 text-xs shadow-md shrink-0">
              <div className="flex items-start gap-2">
                <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 shrink-0 mt-0.5">
                  <CloudSun className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-semibold text-rose-200">
                    <span>LULU Morning Stylist</span>
                    <span className="text-[10px] text-slate-400 font-mono">62°F NYC</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">
                    "Crisp autumn morning. Pair your Ivory Knit & Black Trousers with an Olive Cashmere scarf on sale."
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNotificationBanner(false)}
                className="text-slate-400 hover:text-white text-xs px-1"
                title="Dismiss"
              >
                ✕
              </button>
            </div>
          )}

          {/* Global Toast for Look Saved or Affiliate Redirection */}
          {saveSuccessNotification && (
            <div className="mx-3 mb-2 p-2 rounded-lg bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-bounce">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="line-clamp-1">{saveSuccessNotification}</span>
            </div>
          )}

          {/* Screen Content Body */}
          <div className="flex-1 overflow-y-auto px-4 pb-20 pt-1">
            
            {/* TAB 1: AI MATCHMAKER CORE (Feature 4, 8) */}
            {activeTab === 'matchmaker' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-5 h-5 text-rose-400" /> LULU Matchmaker
                    </h2>
                    <p className="text-[11px] text-slate-400">Harmonizing closet + partner stores</p>
                  </div>
                  <button
                    onClick={handleGenerateOutfit}
                    disabled={isGeneratingMatch}
                    className="flex items-center gap-1 text-xs bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-semibold px-3 py-1.5 rounded-full transition-all shadow-md shadow-rose-900/40"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingMatch ? 'animate-spin' : ''}`} />
                    <span>{isGeneratingMatch ? 'Styling...' : 'Re-Match'}</span>
                  </button>
                </div>

                {/* Matchmaking Controls: Weather & Occasion */}
                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <CloudSun className="w-3.5 h-3.5 text-amber-400" /> Weather Context:
                    </span>
                    <div className="flex gap-1">
                      {(['mild', 'rainy', 'cold', 'warm'] as const).map((w) => (
                        <button
                          key={w}
                          onClick={() => setWeatherCondition(w)}
                          className={`text-[10px] px-2 py-0.5 rounded capitalize ${
                            weatherCondition === w
                              ? 'bg-rose-500 text-white font-medium'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-purple-400" /> Target Occasion:
                    </span>
                    <select
                      value={selectedOccasion}
                      onChange={(e) => setSelectedOccasion(e.target.value as Occasion)}
                      className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded px-2 py-1 focus:outline-none"
                    >
                      <option value="office">Office / Business</option>
                      <option value="casual">Everyday Casual</option>
                      <option value="date_night">Date Night</option>
                      <option value="cocktail_party">Cocktail Party</option>
                    </select>
                  </div>
                </div>

                {/* Recommended Outfit Card */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-4 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {matchResult.harmony} • {matchResult.score}% Match Score
                    </span>
                    <button
                      onClick={handleSaveLook}
                      className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                      title="Save Look"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{matchResult.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{matchResult.explanation}</p>

                  {/* Section: Your Closet Pieces */}
                  <div className="mb-3">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>From Your Closet ({matchResult.closet.length})</span>
                      <span className="text-emerald-400 text-[10px]">Zero extra cost</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {matchResult.closet.map((item) => (
                        <div key={item.id} className="group relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900/60">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-20 object-cover" />
                          <div className="p-1.5">
                            <p className="text-[10px] font-medium text-slate-200 truncate">{item.name}</p>
                            <span className="inline-block w-2.5 h-2.5 rounded-full border border-slate-700 mt-0.5" style={{ backgroundColor: item.primaryColorHex }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section: Recommended Store Pieces (Affiliates) */}
                  <div>
                    <div className="text-[11px] font-semibold text-rose-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <ShoppingBag className="w-3 h-3 text-rose-400" /> Partner Store Match ({matchResult.store.length})
                      </span>
                      <span className="text-slate-400 text-[10px]">Total: ${matchResult.totalShopCost}</span>
                    </div>

                    <div className="space-y-2">
                      {matchResult.store.map((storeItem) => (
                        <div
                          key={storeItem.id}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/40 transition-colors"
                        >
                          <img src={storeItem.imageUrl} alt={storeItem.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono text-slate-400">{storeItem.brand}</span>
                              <span className="text-xs font-bold text-rose-400">${storeItem.price.toFixed(2)}</span>
                            </div>
                            <p className="text-xs font-medium text-white truncate">{storeItem.title}</p>
                            <p className="text-[10px] text-slate-400 line-clamp-1">{storeItem.matchReason}</p>
                          </div>
                          <button
                            onClick={() => handleAffiliateClick(storeItem)}
                            className="bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white p-2 rounded-lg transition-all shrink-0"
                            title="View Affiliate Checkout"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save to Calendar Button */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={handleSaveLook}
                      className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium py-2 rounded-xl transition-all"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-rose-400" />
                      <span>Save Outfit to Calendar & Lookbook</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: VIRTUAL CLOSET & SCANNER (Feature 2, 3) */}
            {activeTab === 'closet' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
                      <Camera className="w-5 h-5 text-purple-400" /> Virtual Closet
                    </h2>
                    <p className="text-[11px] text-slate-400">{closetItems.length} items digitized</p>
                  </div>
                  <button
                    onClick={handleSimulateScan}
                    disabled={isScanning}
                    className="flex items-center gap-1 text-xs bg-purple-600 hover:bg-purple-500 text-white font-semibold px-3 py-1.5 rounded-full transition-all shadow-md shadow-purple-900/30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Scan Item</span>
                  </button>
                </div>

                {/* Computer Vision Scanner Active Progress Banner */}
                {isScanning && (
                  <div className="p-3 rounded-xl bg-purple-950/70 border border-purple-500/50 space-y-2 animate-pulse">
                    <div className="flex items-center gap-2 text-xs font-semibold text-purple-200">
                      <Zap className="w-4 h-4 text-purple-400 animate-spin" />
                      <span>CV Pipeline Processing...</span>
                    </div>
                    <p className="text-xs text-purple-300 font-mono">{scanStep}</p>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-400 h-full w-3/4 animate-[pulse_1s_infinite]" />
                    </div>
                  </div>
                )}

                {/* Newly Scanned Feedback */}
                {scannedGarment && !isScanning && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs text-emerald-200 font-medium">CV Identified: {scannedGarment.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">99% confidence</span>
                  </div>
                )}

                {/* Category Pills */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                  {['all', 'tops', 'bottoms', 'outerwear', 'shoes', 'dresses'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedClosetCategory(cat)}
                      className={`px-3 py-1 rounded-full capitalize shrink-0 text-xs font-medium transition-colors ${
                        selectedClosetCategory === cat
                          ? 'bg-purple-500 text-white shadow-sm'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Garments Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  {closetItems
                    .filter((item) => selectedClosetCategory === 'all' || item.category === selectedClosetCategory)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden group hover:border-slate-700 transition-all"
                      >
                        <div className="relative h-28 w-full bg-slate-950">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                          <div className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-300">
                            Worn {item.timesWorn}x
                          </div>
                        </div>
                        <div className="p-2">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span
                              className="w-2 h-2 rounded-full shrink-0 border border-slate-700"
                              style={{ backgroundColor: item.primaryColorHex }}
                            />
                            <span className="text-[10px] text-slate-400 truncate">{item.primaryColor}</span>
                          </div>
                          <h4 className="text-xs font-medium text-white truncate">{item.name}</h4>
                          <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                            <span className="capitalize">{item.subCategory}</span>
                            <span className="text-purple-400">CV 98%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB 3: PARTNER STORE & ADVANCED SEARCH (Feature 1, 5, 7) */}
            {activeTab === 'store' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
                      <ShoppingBag className="w-5 h-5 text-amber-400" /> Partner Store Hub
                    </h2>
                    <p className="text-[11px] text-slate-400">Live prices & direct affiliate links</p>
                  </div>
                </div>

                {/* Search Bar & Direct URL Scraper Simulator */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search partner catalog or paste product URL..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Filter Controls (Feature 5) */}
                <div className="bg-slate-900/60 border border-slate-800 p-2.5 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-300">
                    <span className="flex items-center gap-1">
                      <SlidersHorizontal className="w-3 h-3 text-amber-400" /> Max Budget:
                    </span>
                    <span className="font-mono text-amber-400 font-bold">${budgetMax}</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="150"
                    step="5"
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(Number(e.target.value))}
                    className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                  />

                  <div className="flex gap-1.5 overflow-x-auto scrollbar-none pt-1">
                    {['all', 'Amazon Fashion', 'Nordstrom', 'ASOS', 'Zara'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setSelectedStore(st)}
                        className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${
                          selectedStore === st
                            ? 'bg-amber-500 text-black font-semibold'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Store Items List */}
                <div className="space-y-2">
                  {filteredStoreItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 flex items-center gap-3 hover:border-slate-700 transition-colors"
                    >
                      <img src={item.imageUrl} alt={item.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-amber-400">{item.storeName}</span>
                          <span className="text-xs font-bold text-white">${item.price.toFixed(2)}</span>
                        </div>
                        <h4 className="text-xs font-medium text-slate-100 truncate mt-0.5">{item.title}</h4>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                          <span className="text-emerald-400 font-mono">In Stock</span>
                          <span>•</span>
                          <span className="truncate">{item.stockLastSynced.split('(')[0]}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleAffiliateClick(item)}
                        className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold px-2.5 py-1.5 rounded-lg shrink-0 flex items-center gap-1 transition-all"
                      >
                        <span>Buy</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: LOOKBOOK & CALENDAR (Feature 6) */}
            {activeTab === 'lookbook' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
                      <Bookmark className="w-5 h-5 text-rose-400" /> Lookbook & Planner
                    </h2>
                    <p className="text-[11px] text-slate-400">{savedOutfits.length} saved curated outfits</p>
                  </div>
                </div>

                {/* Calendar Schedule Card */}
                <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-rose-400" /> Weekly Wear Schedule
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Current Week</span>
                  </div>

                  <div className="space-y-2 mt-2">
                    {savedOutfits.map((look) => (
                      <div
                        key={look.id}
                        className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">{look.title}</span>
                            <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300">
                              {look.occasion}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">Scheduled: {look.scheduledDate}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono text-emerald-400 font-bold">{look.score}%</span>
                          <span className="block text-[9px] text-slate-500">{look.itemsCount} pieces</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Navigation Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-4 flex items-center justify-around z-20">
            <button
              onClick={() => setActiveTab('matchmaker')}
              className={`flex flex-col items-center gap-1 text-[10px] transition-colors ${
                activeTab === 'matchmaker' ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span>Match</span>
            </button>

            <button
              onClick={() => setActiveTab('closet')}
              className={`flex flex-col items-center gap-1 text-[10px] transition-colors ${
                activeTab === 'closet' ? 'text-purple-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Camera className="w-5 h-5" />
              <span>Closet</span>
            </button>

            <button
              onClick={() => setActiveTab('store')}
              className={`flex flex-col items-center gap-1 text-[10px] transition-colors ${
                activeTab === 'store' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Store</span>
            </button>

            <button
              onClick={() => setActiveTab('lookbook')}
              className={`flex flex-col items-center gap-1 text-[10px] transition-colors ${
                activeTab === 'lookbook' ? 'text-rose-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bookmark className="w-5 h-5" />
              <span>Looks</span>
            </button>
          </div>

        </div>
      </div>

      {/* Affiliate Modal Dialog (Feature 7) */}
      {affiliateModalItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-white">Partner Store Direct Link</span>
              </div>
              <button
                onClick={() => setAffiliateModalItem(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex gap-3">
              <img src={affiliateModalItem.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase">{affiliateModalItem.storeName}</span>
                <h4 className="text-xs font-bold text-white line-clamp-1">{affiliateModalItem.title}</h4>
                <div className="text-sm font-bold text-emerald-400 mt-1">${affiliateModalItem.price.toFixed(2)}</div>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Affiliate Tag:</span>
                <span className="font-mono text-rose-300">smartoutfit-lulu-20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Commission:</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  ${(affiliateModalItem.price * affiliateModalItem.affiliateCommissionRate).toFixed(2)} ({(affiliateModalItem.affiliateCommissionRate * 100)}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Universal Deep Link:</span>
                <span className="font-mono text-slate-400 truncate">retailer-app://product/sku</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setAffiliateModalItem(null)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs py-2 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={executeRedirect}
                disabled={isRedirecting}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5"
              >
                {isRedirecting ? (
                  <span>Opening App...</span>
                ) : (
                  <>
                    <span>Proceed to Store</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
