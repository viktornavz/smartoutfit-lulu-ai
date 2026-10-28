export interface PRDSection {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  content: string;
}

export const prdDocument = {
  header: {
    codeName: 'SmartOutfit LULU AI',
    version: '1.0.0-PROD-SPEC',
    status: 'APPROVED FOR ARCHITECTURE REVIEW',
    author: 'Principal Product Owner & Lead Solutions Architect',
    targetPlatform: 'iOS, Android (React Native / Expo), Web Companion (React 19)',
    lastUpdated: 'October 2026',
  },
  
  executiveSummary: {
    vision: 'Empower everyday consumers to dress with supreme confidence and personal style by seamlessly bridging the clothes they already own with curated, complementary items from trusted online retail partners.',
    problemStatement: 'The average person wears only 20% of their wardrobe regularly, suffering from decision fatigue every morning ("closet full of clothes, nothing to wear"). Meanwhile, online apparel shopping suffers from high return rates (30%+) because shoppers cannot visualize how new purchases will pair with their existing clothes, weather conditions, or daily schedules.',
    solution: 'SmartOutfit LULU AI provides an intelligent closet operating system. Through computer vision, users digitize their wardrobe in seconds. The AI Matchmaking Engine combines closet inventory with real-time store catalogs (Amazon Fashion, Nordstrom, ASOS), local weather feeds, and color harmony algorithms to generate complete head-to-toe outfits, bridging closet optimization with high-conversion affiliate commerce.',
    targetPersonas: [
      {
        name: 'Elena Vance (29, Urban Professional)',
        pain: 'Needs fast, chic business-casual outfits daily, hates wasting mornings deciding what to wear, buys clothes impulsively that do not match what she owns.',
        valueProp: 'Daily morning push briefings matching office dress codes and weather forecasts, showing 1 piece she owns paired with 1 smart accessory on sale.',
      },
      {
        name: 'Marcus Chen (34, Smart-Casual Tech Lead)',
        pain: 'Wants to dress better without spending hours browsing fashion sites or hiring an expensive personal stylist.',
        valueProp: 'Effortless automated styling recommendations that build capsule wardrobes and find matching sneakers/jackets on Amazon with 1-click checkout.',
      },
      {
        name: 'Sofia Gomez (22, Eco-Conscious Fashion Enthusiast)',
        pain: 'Wants to maximize circularity and re-wear existing garments, only purchasing deliberate missing pieces that unlock 5+ new outfits.',
        valueProp: 'Visual wardrobe audit, wear-frequency tracker, and "Missing Piece Finder" that proves a single $40 partner piece unlocks 6 unique outfits.',
      },
    ],
    kpis: [
      { metric: 'D1 / D7 / D30 Retention', target: '65% / 42% / 28%', description: 'Driven by morning outfit suggestion push notifications.' },
      { metric: 'Affiliate Conversion Rate (e-Comm)', target: '3.8% – 5.2%', description: '2.5x industry standard due to hyper-personalized wardrobe pairing.' },
      { metric: 'Wardrobe Digitization Rate', target: '18+ items in 7 days', description: 'Gamified closet scanner with background CV tagger.' },
      { metric: 'Average Order Value (AOV)', target: '$64.50', description: 'Targeting mid-tier accessible fashion and accessories.' },
    ],
  },

  architecture: {
    overview: 'Cloud-native, event-driven microservices architecture hosted across Google Cloud Platform / AWS with high-throughput edge gateways, asynchronous GPU/serverless computer vision inference, and vector embeddings for semantic fashion search.',
    layers: [
      {
        layer: 'Client Layer (Frontend)',
        tech: 'React Native / Expo (iOS & Android) with Web Companion (React 19 + Tailwind CSS + Motion)',
        details: 'Native camera hardware interface for continuous burst garment scanning; offline-first SQLite / WatermelonDB local cache; push notification handler (APNs & FCM); deep-linking module for affiliate store redirection.',
      },
      {
        layer: 'API Gateway & Edge',
        tech: 'Kong / Cloudflare Workers + Node.js Express Gateway',
        details: 'JWT Authentication, rate limiting (100 req/min for free tier), gzip compression, edge geolocation resolution for localized weather lookup, TLS 1.3 encryption.',
      },
      {
        layer: 'Application Microservices',
        tech: 'Node.js (TypeScript) & Python (FastAPI)',
        details: 'Wardrobe Service (CRUD & tag management), Matchmaking Engine (Python FastAPI for vector math & styling heuristics), Store Sync Worker (RabbitMQ / Redis Queue scraper & PA-API poller), Notification Engine (Cron & Celery).',
      },
      {
        layer: 'AI & Computer Vision Worker Pool',
        tech: 'PyTorch / ONNX Runtime + Gemini 2.5 Flash Multimodal Vision API',
        details: 'Garment segmentation (SAM / Mask R-CNN) for automatic background removal, ResNet-50 / CLIP visual feature extraction, dominant palette K-Means clustering in CIELAB color space, Gemini Multimodal for nuanced style/occasion tagging.',
      },
      {
        layer: 'Persistence & Data Layer',
        tech: 'PostgreSQL (Cloud SQL / Supabase) + pgvector + Redis Cache + Cloud Storage (S3 / GCS)',
        details: 'Relational storage for users, wardrobe metadata, affiliate commissions; pgvector for 512-dimension fashion style embeddings; Redis 7 for sub-millisecond price cache and rate limiting; CDN-backed object store for compressed garment imagery.',
      },
      {
        layer: 'External APIs & Retail Feeds',
        tech: 'Amazon Product Advertising API (PA-API v5), Rakuten Advertising, Impact.com, ASOS Affiliate Feed, OpenWeatherMap API v3',
        details: 'Structured affiliate feeds with automated subID click-token injection, stock availability pollers, and meteorological forecast lookups.',
      },
    ],
    databaseSchema: [
      {
        table: 'users',
        description: 'Core user profiles, style preferences, and geolocation settings.',
        columns: ['id UUID PK', 'email VARCHAR', 'style_preferences TEXT[]', 'preferred_brands TEXT[]', 'budget_tier VARCHAR', 'home_city VARCHAR', 'lat FLOAT', 'lon FLOAT', 'subscription_status VARCHAR', 'created_at TIMESTAMP'],
      },
      {
        table: 'wardrobe_items',
        description: 'Physical clothing digitized by users with CV extracted attributes.',
        columns: ['id UUID PK', 'user_id UUID FK', 'category VARCHAR', 'subcategory VARCHAR', 'primary_color VARCHAR', 'color_hex VARCHAR(7)', 'style_tags TEXT[]', 'season_tags TEXT[]', 'warmth_rating INT', 'image_url TEXT', 'times_worn INT', 'last_worn_at DATE', 'embedding vector(512)'],
      },
      {
        table: 'store_catalog_items',
        description: 'Partner retail items synchronized with prices, affiliate links, and stock.',
        columns: ['id UUID PK', 'partner_name VARCHAR', 'sku VARCHAR', 'title TEXT', 'brand VARCHAR', 'category VARCHAR', 'price NUMERIC(10,2)', 'currency VARCHAR(3)', 'affiliate_url TEXT', 'commission_rate NUMERIC(4,2)', 'in_stock BOOLEAN', 'last_synced_at TIMESTAMP', 'embedding vector(512)'],
      },
      {
        table: 'saved_outfits',
        description: 'Combinations of wardrobe and store items curated by AI or user.',
        columns: ['id UUID PK', 'user_id UUID FK', 'title VARCHAR', 'occasion VARCHAR', 'color_harmony VARCHAR', 'match_score INT', 'scheduled_date DATE', 'closet_item_ids UUID[]', 'store_item_ids UUID[]', 'created_at TIMESTAMP'],
      },
      {
        table: 'affiliate_conversions',
        description: 'Click-through tracking and attribution logs for partner monetization.',
        columns: ['id UUID PK', 'user_id UUID FK', 'outfit_id UUID FK', 'store_item_id UUID FK', 'sub_id VARCHAR', 'clicked_at TIMESTAMP', 'converted_at TIMESTAMP', 'order_amount NUMERIC(10,2)', 'commission_earned NUMERIC(10,2)'],
      },
    ],
  },

  featuresBreakdown: [
    {
      num: 1,
      title: 'Search Engine & Web Scraping / Store APIs',
      userAction: 'The user enters search queries (e.g., "cropped beige trench coat", "chunky leather loafers") or pastes a direct product URL from Amazon, ASOS, or Zara into the search bar.',
      techProcessing: 'The backend routes the request through a dual-channel search orchestrator: (1) Amazon PA-API v5 / Retail Partner APIs for authorized inventory with structured SKU, pricing, and stock status. (2) For un-partnered direct URLs, a headless Playwright scraper with stealth proxies extracts OpenGraph tags, schema.org Microdata, high-res photos, and real-time prices. Background workers run delta-sync cron jobs every 30 minutes to update prices and prune out-of-stock items.',
      apiEndpoints: 'POST /api/v1/store/search (query, category, budget_max, brands) | POST /api/v1/store/parse-url (url)',
      edgeCases: 'Bot detection (Cloudflare/Akamai on store sites) mitigated via rotating residential proxy pool and official affiliate product API fallbacks; out-of-stock items flagged with "Similar items in stock" badge.',
    },
    {
      num: 2,
      title: 'Closet Scanner (Virtual Wardrobe)',
      userAction: 'The user takes a quick photo of their clothes (hanging on a hook, laid flat on a bed, or worn) or imports from their camera roll. They can tap to assign categories (Tops, Pants, Outerwear, Shoes, Bags) or let auto-categorization handle it.',
      techProcessing: 'Client-side photo capture applies real-time edge detection and perspective warping to square the garment. The image is uploaded via pre-signed S3/GCS URL. An image optimization pipeline compresses the photo to WebP (800x800) and triggers the Computer Vision tagging pipeline asynchronously via Redis pub/sub queue.',
      apiEndpoints: 'POST /api/v1/wardrobe/upload-url | POST /api/v1/wardrobe/items | GET /api/v1/wardrobe/items?category={category}',
      edgeCases: 'Poor indoor lighting handled by auto-exposure gamma correction filter; multi-garment photos prompt the user with interactive crop boxes to segment each piece individually.',
    },
    {
      num: 3,
      title: 'Computer Vision (Clothing Recognition)',
      userAction: 'User watches as the uploaded photo is automatically analyzed: the messy background vanishes, revealing a clean studio-style cutout, while tags for garment type, primary/secondary colors, fabric pattern, and style pop up with 98% accuracy.',
      techProcessing: 'A multi-stage vision pipeline executes: (1) Background Removal via Segment Anything Model (SAM) or RMBG-v1.4 to isolate the garment. (2) Object Classification via a fine-tuned Vision Transformer (ViT) to classify category and neckline/silhouette. (3) Color Extractor converts pixels to CIELAB space and runs K-Means clustering to identify the dominant hex code and color family. (4) Gemini Multimodal Vision API generates semantic stylistic attributes (e.g. "Parisian chic", "distressed vintage").',
      apiEndpoints: 'POST /api/v1/cv/detect-attributes (multipart image or image_url)',
      edgeCases: 'Patterned garments (stripes/florals) extract both base and accent colors; user can tap any color swatch to override with a manual color picker in 1 click.',
    },
    {
      num: 4,
      title: 'AI Matchmaking Engine (Matchmaking Core)',
      userAction: 'User requests an outfit by selecting an occasion (e.g., "Creative Office", "Weekend Brunch", "Date Night") or tapping "Surprise Me". The app shows a cohesive 4-to-5 piece look combining 2-3 items from their closet with 1-2 complementary store pieces.',
      techProcessing: 'The Matchmaking Core implements a 4-dimensional scoring heuristic: (1) Color Theory Matrix: evaluates color harmony angles on the 360° color wheel (Monochromatic = 0°, Complementary = 180° ± 15°, Analogous = 30°–60°, Neutral Anchor). (2) Style Coherence Score: checks cosine similarity of style vector embeddings (e.g., street-style sneakers do not match a formal black-tie tuxedo unless streetwear-formal hybrid is toggled). (3) Weather Heuristic: fetches temperature and rain probability; filters out low-warmth items on cold days. (4) Wardrobe Recency Weight: boosts unworn closet items to prevent outfit repetition.',
      apiEndpoints: 'POST /api/v1/matchmaker/generate (user_id, occasion, weather_override, max_store_price)',
      edgeCases: 'User owns 0 cold-weather clothes: engine flags "Wardrobe Gap Detected" and suggests 2 essential warm base layers from partner stores within the user\'s budget.',
    },
    {
      num: 5,
      title: 'Advanced Search Filters',
      userAction: 'User refines outfit recommendations and store catalog browsing by toggling sliders: Budget ($0–$250), Favorite Brands (Everlane, Zara, Levi\'s), Color Palettes (Pastel, Earth Tones, Monochrome), and Seasons (Autumn/Winter).',
      techProcessing: 'Elasticsearch / PostgreSQL pgvector multi-faceted filter query. The database engine executes compound Boolean filters on normalized attributes (`price <= budget_max AND brand = ANY(brands) AND season && season_filters`). Dynamic facet counters update in real time without reloading the page, with query response latencies < 45ms cached in Redis.',
      apiEndpoints: 'GET /api/v1/catalog/filter?brands=...&min_price=...&max_price=...&palette=earth_tones',
      edgeCases: 'Zero search results: automatic soft-relaxation drops the least restrictive filter (e.g. expands budget by 10% or adds complementary colors) with an informative toast message.',
    },
    {
      num: 6,
      title: 'Saving and Managing Looks',
      userAction: 'User saves favorite generated outfits to custom collections (e.g. "Fall Office Looks", "Paris Vacation", "Gym & Errands") or schedules an outfit onto their Weekly Wear Calendar for upcoming dates.',
      techProcessing: 'Saved outfits are serialized into the `saved_outfits` table with pointers to closet items and store SKUs. The Calendar scheduler writes events to the local calendar or syncs with the app\'s internal timeline. When the scheduled day arrives, the app prompts: "Did you wear this today?", updating the `times_worn` counter and `last_worn_date` to feed the wear-analytics cycle.',
      apiEndpoints: 'POST /api/v1/outfits/save | GET /api/v1/outfits/collections | POST /api/v1/calendar/schedule',
      edgeCases: 'A partner store item in a saved outfit goes out of stock: the look remains saved, but the app displays a "Store item out of stock – Find similar" button that queries 3 instant alternatives.',
    },
    {
      num: 7,
      title: 'Shopping Module (Affiliates & Monetization)',
      userAction: 'When the user loves a store item recommended in their outfit, they tap "Buy on Amazon ($59)" or "Add to Wishlist". They are seamlessly redirected to the retailer\'s app or checkout page with one tap.',
      techProcessing: 'The click triggers an affiliate attribution service: (1) Formats the URL with subID tracking (`tag=smartoutfit-lulu-20&subId={user_id}_{outfit_id}`). (2) Universal Deep Link (Branch.io or Adjust) opens the retailer\'s native app (Amazon or ASOS app) directly to the product page. (3) Postback webhooks from affiliate networks (Amazon Associates, Rakuten, Impact) ingest conversion reports, attributing 5%–12% commission to the user\'s session for unit economics analysis.',
      apiEndpoints: 'POST /api/v1/affiliate/redirect-link (item_id, outfit_id) | POST /api/v1/affiliate/webhook-conversion',
      edgeCases: 'User does not have partner app installed: fallback redirects smoothly via system Safari/Chrome browser retaining affiliate cookie tracking.',
    },
    {
      num: 8,
      title: 'Daily Suggestions System',
      userAction: 'Every morning at 7:00 AM (customizable), the user receives a pleasant push notification: "Good morning! It\'s 58°F and breezy in NYC. Here is your effortless Monday Office look." Tapping it opens the Daily Look card ready to wear.',
      techProcessing: 'A distributed Cron scheduler (Celery / Cloud Tasks) wakes up at 5:30 AM local time per timezone. It queries OpenWeatherMap API for the user\'s coordinates, evaluates the user\'s calendar events (e.g. "Meeting with VP" implies formal), runs the Matchmaking Engine to select a fresh outfit using items not worn in the last 7 days, and delivers an APNs/FCM rich notification with an image thumbnail of the assembled outfit.',
      apiEndpoints: 'GET /api/v1/daily/suggestion | PUT /api/v1/user/notification-preferences',
      edgeCases: 'Sudden rainstorm detected 1 hour before departure: weather delta listener triggers an updated alert: "Rain alert: We swapped your suede flats for Chelsea boots & trench coat."',
    },
  ],

  monetization: {
    overview: 'A diversified, non-intrusive revenue model that aligns user happiness with commercial success: users never pay to explore their own clothes, but partner retailers pay commissions when LULU AI drives high-intent, low-return purchases.',
    revenueStreams: [
      {
        stream: '1. Retail Affiliate Commissions (Primary Engine)',
        share: '55% of projected gross revenue',
        details: 'Earn 6% to 12% on completed apparel & accessory sales through Amazon Associates, Rakuten Advertising, ASOS, and ShopStyle Collective. Outfits convert at 3.8%–5.2% (vs 1.8% cold browsing) because the item solves a specific wardrobe gap.',
        economics: 'Average Order Value: $65. At 9% blended commission = $5.85 net revenue per checkout. With 100k active users purchasing 1.2 partner items/month = ~$702,000/year.',
      },
      {
        stream: '2. LULU Stylist Pro Subscription (Freemium Upsell)',
        share: '30% of projected gross revenue',
        details: 'Free Tier includes up to 40 closet items, 3 daily outfit recommendations, and standard filters. LULU Stylist Pro ($7.99/mo or $69.99/yr) unlocks unlimited wardrobe digitization, travel packing capsule generator, virtual color season analysis, priority AI matchmaking, and exclusive partner discount codes (15-20% off).',
        economics: 'Targeting 4.5% conversion of free to paid users. 100k MAU = 4,500 Pro subscribers @ $7.99/mo = $431,460/year recurring revenue with zero marginal inventory cost.',
      },
      {
        stream: '3. Sponsored "Brand Capsule" Placements (B2B Retail Media)',
        share: '10% of projected gross revenue',
        details: 'Partner fashion brands pay for non-spammy contextual placement in outfit suggestions (e.g., Levi\'s sponsors denim capsule recommendations for users whose style preference includes "Classic Denim"). Brands bid on high-relevance fashion tags.',
        economics: 'Native CPC of $0.45 – $0.85 per outfit interaction or $5,000 – $15,000 per curated seasonal brand drop.',
      },
      {
        stream: '4. Anonymized Wardrobe Trend Intelligence (B2B Data)',
        share: '5% of projected gross revenue',
        details: 'Aggregated, anonymized fashion data reports for fashion manufacturers and retailers: "What colors and silhouettes are users actively pairing with trench coats this Autumn?", helping retailers reduce unsold inventory.',
        economics: 'Quarterly enterprise trend reports priced at $12,000 – $25,000/year per retail brand partner.',
      },
    ],
    projections: {
      year1: { users: '50,000 MAU', arr: '$480,000', margin: '74%' },
      year2: { users: '250,000 MAU', arr: '$2,850,000', margin: '79%' },
      year3: { users: '1,000,000 MAU', arr: '$12,400,000', margin: '82%' },
    },
  },
};
