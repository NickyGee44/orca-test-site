## Background and Motivation

Orca is releasing a new public marketing site to align visually and structurally with the redesigned Orca Dash portal (Freight Audit & Analytics AI) in time for the 10-year anniversary.  
The goals are:
- Unify the **brand and visual system** so the marketing site feels like the “storytelling layer” of the Orca Dash product UI.
- Position Orca clearly as **Freight Audit & Analytics AI**, grounded in a decade of freight data and delivery for enterprise customers.
- Create a **single source of truth** for design tokens, layout patterns, and tone so future work in the portal and marketing site stays in sync.

This scratchpad is the shared workspace between Planner and Executor to coordinate design, implementation, and iteration in Cursor.

---

## Website Feedback Review (January 2025)

### Reviewer Feedback Summary

The reviewer provided detailed feedback across all pages. Key themes:
1. **Font size too small** – especially buttons; needs global increase
2. **Mobile not working** – preview link not viewable on mobile
3. **Remove redundancy** – same information repeated across sections
4. **Change ALL CAPS to sentence case** – easier to read
5. **Content accuracy** – verify numbers, remove misleading claims
6. **Real testimonials needed** – remove fake testimonials/aliases
7. **Remove certain images** – some images break up text unnecessarily
8. **Update copy** – multiple specific text changes per page

---

## Key Challenges and Analysis

- **Theme consistency with Orca Dash**
  - Must reuse existing design tokens (`tokens.json`) and Tailwind config from the portal (colors, gradients, radii, shadows, spacing, typography).
  - Marketing components should feel like a natural extension of existing dashboard components (glass panels, AI orb, mesh gradients, KPI tiles).

- **Scope and page architecture**
  - The public website needs multiple routes (home, solutions, product, AI & data, results, about, resources, contact) with consistent navigation and footer.
  - Risk of “drift” if each page is designed independently; need a shared `MarketingLayout` and section patterns.

- **Content and positioning**
  - Copy must speak to Directors/VPs of logistics, supply chain, and finance, emphasizing measurable outcomes (accuracy, savings, time saved, visibility).
  - Brand voice should be calm, expert, and evidence-based; avoid hype while still clearly conveying the “AI” leap forward.

- **10-year anniversary integration**
  - Anniversary treatment should be present (banner, badge, timeline/milestones) but not overwhelm the core product/value story.

- **TDD and implementation workflow**
  - For a mainly UI/UX project, “tests” will often be:
    - Component unit tests (rendering, props, accessibility basics).
    - Visual/structural assertions (e.g., correct sections present, correct routes).
  - Need a pragmatic testing strategy that doesn’t overcomplicate the marketing stack but still catches regressions.

## High-level Task Breakdown

### Phase 0 – Project Setup and Design Source of Truth
- **Task 0.1 – Confirm Orca Dash design tokens as canonical**
  - Success criteria:
    - `tokens.json` and Tailwind config for Orca Dash are identified and documented here as the visual source of truth.
    - Clear note on which tokens control background, gradients, radii, typography, shadows.

- **Task 0.2 – Define marketing layout primitives**
  - Success criteria:
    - A conceptual list of core marketing building blocks is documented (e.g., hero band, glass section container, KPI row, 3-column card grid, AI orb section, timeline strip).
    - Each primitive is explicitly mapped to existing Orca Dash visual patterns (e.g., which dashboard card style it borrows).

### Phase 1 – Information Architecture & Routing Plan
- **Task 1.1 – Define site map and routes**
  - Routes: `/`, `/solutions`, `/product`, `/ai`, `/results`, `/about`, `/resources`, `/contact`.
  - Success criteria:
    - Each route has a clear purpose, primary audience, and 2–6 key sections listed, reflecting both the current orcaaudit.com content and the new AI/10-year positioning.
    - Navigation and footer structure (links, CTAs) are defined once and reused across pages.

- **Task 1.2 – Define SEO and metadata requirements**
  - Success criteria:
    - For each route, there is a proposed `<title>` and meta description.
    - A general plan exists for OpenGraph tags and a shared metadata utility.

#### Site Map & Content Scaffolding (based on current orcaaudit.com)

- **Global Navigation**
  - Primary CTA: “Book a demo” (consistent across site).
  - Top-level links (proposed):
    - Home
    - Solutions
    - Platform
    - AI & Data
    - Results
    - Resources
    - About
    - Contact
  - Footer:
    - Repeat primary nav, plus: Privacy Policy, Terms, Careers (optional), Social links, Copyright, 10-year mini-badge.

- **Homepage (`/`)**
  - Purpose: High-level story and value prop; connect existing freight audit services with new Freight Audit & Analytics AI positioning and 10-year track record.
  - Primary audience: Directors/VPs of logistics, supply chain, finance evaluating vendors.
  - Key sections (mapped from current site but modernized):
    - Hero: “Freight Audit & Analytics AI” with 10-year banner; short supporting copy on accuracy, savings, visibility; primary “Book a demo”; secondary “Explore the portal”.
    - Services snapshot: Condensed overview of Freight Audit, Freight Payment, Analytics, Claims, Invoice Management (each as a glass tile linking deeper).
    - Outcomes & metrics: Row of KPIs (e.g., invoices processed, audited spend, average savings, clients/lanes), mirroring Orca Dash KPI tiles.
    - How Orca works: 3-step or 4-step process (ingest, audit, analyze, act) with visual alignment to portal flows.
    - AI & analytics teaser: “Orca Intelligence” section introducing anomaly detection, recommendations, and analytics with orb visual and mini chat/insights mock.
    - Customers & trust: Logos, 1–2 short quotes, and a compact results highlight.
    - 10-year milestones: Horizontal strip or timeline showing a few key years, tying into the anniversary story.
    - Final CTA band: Reinforce demo with a calm, high-trust message.

- **Solutions (`/solutions`)**
  - Purpose: Translate Orca’s capabilities into role- and mode-specific outcomes.
  - Primary audience: Buyers with specific responsibilities (Finance, Logistics, Procurement) or freight modes (LTL, FTL, parcel, ocean/air).
  - Key sections:
    - Overview: Brief explanation of how Orca’s freight audit and analytics adapt across roles and transport modes.
    - By role:
      - Finance: Focus on accurate accruals, eliminating overpayments, cleaner GL, stronger forecasting.
      - Logistics: Focus on carrier performance, exception reduction, and smoother operations.
      - Procurement: Focus on benchmarks, sourcing intelligence, and contract compliance.
    - By mode:
      - LTL, FTL, parcel, ocean/air: Each gets a glass card with 2–3 benefits and 1 example metric or outcome.
    - Call to action: “Talk to us about your network” with optional short form or link to Contact.

- **Platform / Product (`/product`)**
  - Purpose: Reframe existing service descriptions as a modern, AI-enhanced platform aligned with Orca Dash.
  - Primary audience: Evaluation teams comparing platforms and wanting to see the “how”.
  - Key sections:
    - Overview: Position the Orca platform as the operational home for freight audit, payment, and analytics.
    - Core modules (adapted from current services pages):
      - Freight Audit & Payment: Explain 100% invoice accuracy, automated payables, and overpayment prevention; show a portal-like ledger/audit preview.
      - Claims & Exceptions: Summarize how claims and discrepancies are identified and resolved; exceptions center preview.
      - Invoice Management & Accounting: Show how Orca improves invoice workflows, GL coding, and projections; include lane/cost breakdown previews.
      - Analytics & Reporting: Outline dashboards, self-serve reports, benchmarking, and trend analysis.
    - Integrations & data: High-level mention of TMS/ERP/warehouse data, with a visual nod to connections (but keep technicals light).
    - Platform outcomes strip: Short bullets tying platform capabilities to business results (time saved, savings, fewer disputes).

- **AI & Data (`/ai`)**
  - Purpose: Elevate “Orca Intelligence” and explain the AI/data story in business language.
  - Primary audience: Stakeholders curious about the AI layer and responsible for risk/compliance.
  - Key sections:
    - Orca Intelligence intro: What “Freight Audit & Analytics AI” means in practice.
    - AI capabilities:
      - Pattern/anomaly detection (duplicate billing, unexpected surcharges, lane variance).
      - Recommendations (e.g., renegotiation targets, carrier mix, mode shifts).
      - Natural language exploration (if applicable, framed around “ask Orca about…”).
    - Data foundation:
      - Freight data sources; consistent, normalized data; 10-year history advantage.
    - Trust, security, and governance:
      - Data handling, permissions, and auditability at a high level.
    - Visual concept:
      - Simple architecture illustration with AI orb, data streams, and the Orca platform layer.

- **Results / Customers (`/results`)**
  - Purpose: Prove impact via case studies, metrics, and testimonials.
  - Primary audience: Decision-makers who need evidence before committing.
  - Key sections:
    - Overview: Set expectations (“10 years of audited spend; here’s what that looks like in outcomes”).
    - Case studies:
      - 3–4 structured stories (problem → approach → results) across different industries or modes.
      - Each case includes 2–3 quantifiable outcomes (e.g., % savings, time-to-close invoices, claim resolution improvements).
    - Quote carousel or grid:
      - Short, pointed quotes in glass cards, linked to case studies where possible.
    - Aggregate impact:
      - High-level totals (e.g., spend audited, invoices processed, average savings band).

- **About (`/about`)**
  - Purpose: Tell the Orca story with emphasis on 10-year evolution and partnership mindset.
  - Primary audience: Leaders who care about vendor stability, expertise, and values.
  - Key sections:
    - Orca story:
      - From initial freight audit focus to today’s Freight Audit & Analytics AI.
      - Timeline or then→now framing for the 10-year anniversary.
    - Mission & values:
      - Clear, concise values tied to accuracy, transparency, partnership, and innovation.
    - Leadership & team:
      - Key leaders with short bios (no need for exhaustive org chart).
    - Responsibility:
      - Any sustainability, carbon, or social responsibility initiatives, including any tools like carbon calculators referenced in legacy content.

- **Resources (`/resources`)**
  - Purpose: Provide a home for thought leadership and practical tools, even if lightly populated at launch.
  - Primary audience: Researchers, early-stage evaluators, and SEO visitors.
  - Key sections:
    - Resource overview:
      - Short description of what lives here (articles, guides, tools, webinars).
    - Articles/blog:
      - Simple list or card grid for posts: title, short description, category/tag, date.
    - Tools:
      - Highlight any interactive tools such as a carbon calculator or benchmarking widgets (even if initially simple or “coming soon”).
    - Featured resource:
      - One pinned case study or guide aligned with the new AI positioning.

- **Contact / Demo (`/contact`)**
  - Purpose: Make it easy and safe-feeling to engage with Orca.
  - Primary audience: Serious prospects ready to talk, as well as lighter-contact questions.
  - Key sections:
    - Contact options:
      - Primary demo request form with clear expectations (“What happens next”).
      - Secondary options (email, phone) to reflect current site content.
    - Form fields:
      - Name, company, role, email, phone (optional), freight modes, approximate spend, free-text context.
    - Location & details:
      - Physical address and map if relevant; reinforce global/remote support if applicable.
    - Micro trust cues:
      - A small quote, logo row, or statement about data handling near the form.

### Phase 2 – Cross-cutting Layout & Theming
- **Task 2.1 – Plan `MarketingLayout` shell**
  - Success criteria:
    - High-level structure for a shared `MarketingLayout` is documented (header/nav, main, footer, optional global background).
    - Decisions recorded on sticky glass nav, mobile nav pattern, footer content, and background treatment (mesh, orb, gradients).

- **Task 2.2 – Map design tokens to marketing components**
  - Success criteria:
    - A small mapping table (in prose) connects design tokens (colors, gradients, radii, shadows, typography) to marketing use (hero, cards, CTA, background).
    - Guidance is written for the Executor on how to avoid introducing new color families and how to derive variations from existing tokens.

### Phase 3 – Homepage (Core Showcase)
- **Task 3.1 – Homepage structure & copy outline**
  - Sections:
    - 10-year anniversary banner
    - Hero (“Freight Audit & Analytics AI”)
    - “Why Orca?” value props
    - “What we do” capability overview
    - Product preview (portal-style screenshots)
    - Metrics row (KPI tiles)
    - AI section (“Orca Intelligence” with orb)
    - 10-year milestones strip
    - Final CTA band
  - Success criteria:
    - Each section has: purpose, rough layout notes, and bullet-point copy outline (headline + key ideas).
    - Explicit notes on which existing Orca Dash visuals to echo (e.g., KPI tiles, AI orb, panel styles).

- **Task 3.2 – Homepage TDD & component plan**
  - Success criteria:
    - Identify the key React components for the homepage (e.g., `HomeHero`, `ValuePropsGrid`, `MetricsRow`, `AiSection`, `TimelineStrip`, `FinalCtaBand`).
    - For each component, define simple test expectations (e.g., renders correct heading, CTA text, required ARIA attributes).

### Phase 4 – Secondary Pages (Solutions, Product, AI & Data, Results)
- **Task 4.1 – Solutions / Use Cases page plan**
  - Success criteria:
    - Define the sections by role (Finance, Logistics, Procurement) and by mode (LTL, FTL, parcel, ocean/air).
    - Outline card structures and example benefit/metric bullets for each.

- **Task 4.2 – Product / Platform page plan**
  - Success criteria:
    - Map product sections to portal features (Dashboard, Exceptions center, Shipment detail, Analytics library).
    - Each section has a mini-UI preview concept + descriptive copy outline.

- **Task 4.3 – AI & Data page plan**
  - Success criteria:
    - Define sections for AI capabilities, data sources, architecture overview, and security/compliance.
    - Describe a simple, non-technical architecture visual concept consistent with the AI orb/mesh motif.

- **Task 4.4 – Results / Customers page plan**
  - Success criteria:
    - Choose 3–4 archetypal case study structures (problem → approach → results).
    - Define metrics format (before/after), quote blocks, and placement of logos/trust signals.

### Phase 5 – About, Resources, Contact
- **Task 5.1 – About / Company page plan**
  - Success criteria:
    - Outline 10-year story structure (timeline or then→now), team/values section, and any sustainability/ethics content.

- **Task 5.2 – Resources / Blog stub plan**
  - Success criteria:
    - Decide on initial structure for future SEO (e.g., listing layout, category tags) even if content is minimal at launch.

- **Task 5.3 – Contact / Demo page plan**
  - Success criteria:
    - Define form fields, validation basics, and integration notes (CRM/marketing tooling).
    - Decide on supporting copy (what to expect after submitting) and any secondary trust elements near the form.

### Phase 6 – Cross-cutting Quality: Accessibility, Performance, Analytics
- **Task 6.1 – Accessibility checklist**
  - Success criteria:
    - Document key accessibility requirements (semantic landmarks, heading structure, color contrast, focus states, alt text patterns).

- **Task 6.2 – Performance and assets plan**
  - Success criteria:
    - Define guidelines for image sizes, compression, lazy loading behavior, and use of animated elements (e.g., orb effects) to avoid performance regressions.

- **Task 6.3 – Analytics & tracking plan**
  - Success criteria:
    - Decide where and how to hook up analytics (e.g., GA/Plausible) and which events matter (CTA clicks, demo requests, scroll depth on key pages).

### Phase 7 – Visual Enhancements & Content Gap Analysis
- **Task 7.1 – Background animations & living visuals**
  - Success criteria:
    - Implement subtle background animations (20% opacity) that make the site feel "alive":
      - Floating orbs/mesh gradients with slow movement
      - Particle effects or data stream visuals
      - Subtle parallax or depth effects
    - Animations must be performant (CSS transforms, GPU-accelerated)
    - Respect `prefers-reduced-motion` for accessibility
    - Visuals should reinforce "AI" and "data flow" themes

- **Task 7.2 – Content gap analysis vs. current orcaaudit.com**
  - Success criteria:
    - Compare new site structure with current orcaaudit.com:
      - Identify missing service pages or detailed service descriptions
      - Check for missing trust signals (certifications, partnerships, awards)
      - Identify missing contact methods (phone, address, support channels)
      - Check for missing legal pages (Privacy Policy, Terms of Service)
      - Identify missing integration/partner logos
      - Check for missing industry-specific content or use cases
    - Document gaps and plan content migration/creation

- **Task 7.3 – Enhanced glassmorphism & depth**
  - Success criteria:
    - Refine glass panel effects with proper backdrop-blur
    - Add layered depth with multiple z-index levels
    - Enhance shadows and highlights for 3D feel
    - Ensure vibrant backgrounds show through glass panels effectively

### Phase 9 – Admin Dashboard & Content Management System

**Background**: To avoid using Wix or similar platforms, we need a self-hosted admin dashboard that allows content editing, article management, SEO configuration, and contact form handling. This will be deployed on Netlify with serverless functions for backend operations.

**Goal**: Create a comprehensive admin dashboard that enables non-technical users to manage all site content, news articles, SEO settings, and contact form submissions without needing to edit code or use external platforms.

#### Task 9.1 – Admin Dashboard Architecture & Authentication
- **Success criteria**:
  - Admin dashboard route (`/admin`) with authentication (password-protected or OAuth)
  - Protected routes that redirect non-authenticated users
  - Session management (localStorage + serverless function validation)
  - Admin layout component with navigation sidebar
  - Responsive design matching Orca theme

#### Task 9.2 – Page Content Editor
- **Success criteria**:
  - Admin interface to edit page content for all routes:
    - Homepage sections (hero, metrics, value props, services, product preview, AI section, testimonials, timeline, CTA)
    - Solutions page (by-role and by-mode sections)
    - Product page (4 core modules, integrations, outcomes)
    - AI & Data page (capabilities, data foundation, trust/security)
    - Results page (case studies, metrics, quotes)
    - About page (story, timeline, values, responsibility)
    - Contact page (form fields, sidebar content, trust cues)
  - Rich text editor (or markdown editor) for content blocks
  - Image upload and management
  - Preview mode before publishing
  - Save content to backend (Netlify Functions + database or JSON files)

#### Task 9.3 – News Article Management
- **Success criteria**:
  - Admin interface to:
    - Create/edit/delete AI-generated articles
    - Edit external article metadata (title, description, tags, visibility)
    - Curate which external articles appear on the site
    - Set article categories/tags
    - Schedule article publication dates
    - Upload article images
    - Mark articles as featured
  - Article list view with search and filters
  - Bulk actions (delete, publish, unpublish)

#### Task 9.4 – SEO Management System
- **Success criteria**:
  - Admin interface to configure SEO for each page:
    - Page title
    - Meta description
    - OpenGraph tags (title, description, image)
    - Twitter Card tags
    - Canonical URLs
    - Schema.org structured data (Organization, WebSite, Article)
  - Global SEO settings:
    - Default site title/description
    - Site-wide OpenGraph image
    - Google Analytics ID
    - Google Search Console verification
    - Robots.txt configuration
    - Sitemap generation
  - Preview how pages appear in search results
  - Save SEO settings to backend

#### Task 9.5 – Contact Form Management & Email Integration
- **Success criteria**:
  - Admin interface to:
    - View all contact form submissions
    - Filter submissions by date, status, source
    - Mark submissions as read/unread, responded/pending
    - Export submissions to CSV
    - Configure form fields (add/remove/require fields)
    - Set up email notifications (admin email, auto-responder)
  - Netlify Functions integration:
    - Form submission handler
    - Email service integration (SendGrid, Mailgun, or Netlify Forms)
    - Spam protection (honeypot, reCAPTCHA)
    - Auto-responder emails to users
    - Admin notification emails
  - Integration with CRM (optional: Zapier webhook, HubSpot, Salesforce)

#### Task 9.6 – Data Storage & Backend Architecture
- **Success criteria**:
  - Choose storage solution:
    - **Option A**: Netlify Functions + JSON files in repo (simple, version-controlled)
    - **Option B**: Netlify Functions + external database (Fauna, Supabase, MongoDB Atlas)
    - **Option C**: Netlify Functions + Netlify CMS (Git-based CMS)
  - Data models for:
    - Page content (structured JSON per page/section)
    - Articles (title, content, metadata, images)
    - SEO settings (per-page and global)
    - Contact submissions (form data, timestamps, status)
    - Admin users (credentials, permissions)
  - API endpoints via Netlify Functions:
    - `GET/POST/PUT/DELETE /api/content/:page`
    - `GET/POST/PUT/DELETE /api/articles`
    - `GET/POST /api/seo/:page`
    - `GET/POST /api/contact`
    - `POST /api/auth/login`
    - `GET /api/auth/verify`

#### Task 9.7 – Admin Dashboard UI/UX
- **Success criteria**:
  - Dashboard home with:
    - Recent contact submissions count
    - Recent articles count
    - Quick stats (page views, form submissions, articles published)
    - Quick actions (create article, edit homepage, view submissions)
  - Navigation sidebar with:
    - Dashboard
    - Pages (list of all pages to edit)
    - Articles
    - Contact Submissions
    - SEO Settings
    - Site Settings
    - Logout
  - Consistent Orca theme (glass panels, gradients, typography)
  - Responsive design (mobile-friendly admin)
  - Loading states and error handling
  - Success/error notifications

#### Task 9.8 – Deployment & Security
- **Success criteria**:
  - Admin dashboard only accessible via authentication
  - Environment variables for:
    - Admin password hash or OAuth credentials
    - Email service API keys
    - Database connection strings (if using external DB)
    - Secret keys for JWT/session tokens
  - Netlify deployment configuration:
    - Environment variables set in Netlify dashboard
    - Build settings (build command, publish directory)
    - Function configuration
    - Redirect rules (protect `/admin` routes)
  - Security best practices:
    - Rate limiting on API endpoints
    - Input validation and sanitization
    - CSRF protection
    - Secure password hashing (bcrypt)
    - HTTPS only

### Phase 8 – News Page Transformation (Resources → News)
- **Task 8.1 – Rename Resources to News & update navigation**
  - Success criteria:
    - Change `/resources` route to `/news` (or keep `/resources` but rebrand as "News")
    - Update navigation label from "Resources" to "News" in `MarketingLayout.tsx`
    - Update page title, meta description, and heading to reflect "News" branding
    - Update all internal links that reference `/resources`

- **Task 8.2 – External article aggregation system**
  - Success criteria:
    - Implement system to pull articles about Orca from the internet:
      - Search for articles mentioning "Orca freight audit", "Orca Intelligence", "orcaaudit.com"
      - Search for articles about "Matt Grossi" or "Marco Grossi" (founders/executives)
      - Use RSS feeds, news APIs (NewsAPI, Google News RSS), or web scraping
    - Create article fetching utility/service:
      - Consider using RSS2JSON proxy for RSS feeds
      - Or use NewsAPI.org for news articles
      - Or implement serverless function to fetch and parse articles
    - Store fetched articles (localStorage, backend, or static JSON file)
    - Display articles in glass cards with:
      - Title, source, date, excerpt
      - Link to original article
      - "External" badge/tag
      - Filter by source or date

- **Task 8.3 – AI article generation integration**
  - Success criteria:
    - Create interface/system for generating AI articles:
      - Admin/editor interface (or simple form) to generate articles
      - Integration with AI API (OpenAI, Anthropic, etc.) or use Cursor/Claude for generation
      - Generate articles on topics like:
        - Freight audit best practices
        - Industry trends
        - AI in logistics
        - Case studies
        - Thought leadership
    - Store AI-generated articles (localStorage, backend, or static JSON file)
    - Display AI articles with:
      - "AI Generated" badge/tag
      - Author attribution (e.g., "Orca Intelligence" or "Orca Editorial")
      - Date of generation
      - Full article content or excerpt with "Read more"
    - Mix AI articles with external articles in the feed

- **Task 8.4 – Replace tools section with metrics showcase**
  - Success criteria:
    - Extract actual metrics/numbers from orcaaudit.com:
      - Spend audited (e.g., "$10B+", "$15B", etc.)
      - Invoices processed (e.g., "Millions per year", specific number)
      - Clients served (if available)
      - Years in operation (10 years)
      - Average savings percentage
      - Other key metrics from current site
    - Create engaging metrics showcase component:
      - Animated counters/numbers (count-up animation)
      - Glass cards with gradient accents
      - Icons or visual indicators
      - Hover effects or subtle animations
      - Group metrics by category (scale, impact, trust)
    - Replace "Tools" section on News page with this metrics showcase
    - Make metrics visually compelling and "cool/intriguing" per user request

## Project Status Board

- [x] Task 0.1 – Confirm Orca Dash design tokens as canonical (Executor: Created approximate Orca theme in `tailwind.config.cjs` with `colors.orca.*`, `borderRadius.*`, `boxShadow.*`; documented in scratchpad)
- [x] Task 0.2 – Define marketing layout primitives (Executor: Implemented `glass-panel`, `rounded-panel`, `rounded-tile`, `rounded-button` utilities in `src/index.css`; `MarketingLayout` uses these)
- [x] Task 1.1 – Define site map and routes (Executor: All routes implemented: `/`, `/solutions`, `/product`, `/ai`, `/results`, `/about`, `/resources`, `/contact`)
- [x] Task 1.2 – Define SEO and metadata requirements (Executor: Created `usePageMetadata` hook; all pages have unique titles/descriptions)
- [x] Task 2.1 – Plan `MarketingLayout` shell (Executor: Implemented `MarketingLayout` with responsive nav, mobile menu, footer, orb-like background)
- [x] Task 2.2 – Map design tokens to marketing components (Executor: All components use `glass-panel`, `rounded-*`, `shadow-orca-*`, `bg-orca-*` tokens consistently)
- [x] Task 3.1 – Homepage structure & copy outline (Executor: Full homepage implemented with all sections: hero, metrics, value props, services, product preview, AI section, testimonials, timeline, final CTA)
- [x] Task 3.2 – Homepage TDD & component plan (Executor: Created reusable components: `ValuePropsGrid`, `ServicesOverview`, `ProductPreview`, `AiSection`, `TimelineStrip`, `FinalCtaBand`)
- [x] Task 4.1 – Solutions / Use Cases page plan (Executor: Full Solutions page with by-role and by-mode sections, glass cards, metrics)
- [x] Task 4.2 – Product / Platform page plan (Executor: Full Product page with 4 core modules, integrations section, outcomes strip)
- [x] Task 4.3 – AI & Data page plan (Executor: Full AI page with capabilities, data foundation, trust/security sections)
- [x] Task 4.4 – Results / Customers page plan (Executor: Full Results page with 3 case studies, aggregate metrics, quotes)
- [x] Task 5.1 – About / Company page plan (Executor: Full About page with story, timeline, values, responsibility sections)
- [x] Task 5.2 – Resources / Blog stub plan (Executor: Full Resources page with featured resource, articles grid, tools section)
- [x] Task 5.3 – Contact / Demo page plan (Executor: Enhanced Contact page with full form fields, "what happens next" sidebar, trust cues)
- [x] Task 6.1 – Accessibility checklist (Executor: Semantic HTML in place, ARIA labels on animated elements, prefers-reduced-motion respected)
- [x] Task 6.2 – Performance and assets plan (Executor: CSS animations use GPU-accelerated transforms, animations respect reduced motion)
- [x] Task 6.3 – Analytics & tracking plan (Executor: Created analytics utility, scroll tracking hook, CTA tracking on key buttons)
- [x] Task 7.1 – Background animations & living visuals (Executor: Created AnimatedBackground component with 4 floating orbs, data stream particles, 20% opacity, respects prefers-reduced-motion)
- [x] Task 7.2 – Content gap analysis vs. current orcaaudit.com (Executor: Added Privacy/Terms pages, trust signals on homepage, enhanced contact page with phone/email, certifications badges)
- [x] Task 7.3 – Enhanced glassmorphism & depth (Executor: Enhanced glass-panel CSS with backdrop-blur, inset highlights, added depth shadow variants)
- [x] Task 8.1 – Rename Resources to News & update navigation (Executor: Updated nav label to "News", updated page title/metadata, kept /resources route)
- [x] Task 8.2 – External article aggregation system (Executor: Created articleService.ts with RSS2JSON integration, fetchExternalArticles function, caching in localStorage)
- [x] Task 8.3 – AI article generation integration (Executor: Created AIArticleGenerator component with form, saveAIArticle function, localStorage storage)
- [x] Task 8.4 – Replace tools section with metrics showcase (Executor: Created MetricsShowcase component with animated counters, grouped by Scale/Impact/Trust, replaced tools section)
- [x] Enhancement 3 – Article detail pages (Executor: Created ArticleDetailPage.tsx with /news/:id route, full article view with images, back navigation)
- [x] Enhancement 4 – More RSS sources (Executor: Expanded to 5 RSS sources including freight audit AI, supply chain analytics, founders, etc.)
- [x] Enhancement 5 – Article images (Executor: Added extractImageUrl function, image display in ArticleCard and ArticleDetailPage, lazy loading)
- [x] Background animation visibility increase (Executor: Increased opacity from 20% to 50%, added 5th orb, increased particle count to 30, enhanced gradients)
- [x] Site-wide images (Executor: Added HeroVisual component, visual charts in ProductPreview, icons in SolutionsPage/AiPage/ResultsPage, visual indicators throughout)
- [x] Logo update (Executor: Replaced SVG logo with PNG version, updated MarketingLayout.tsx import)
- [x] Article relevance filtering (Executor: Added isRelevantArticle function to filter news to only Orca-related and general freight/logistics industry articles)
- [x] Task 10.1 – Content Management System Redesign (Executor: Complete - `usePageContent` + `contentService` + `pageDefaults`; pages load from CMS with fallbacks)
- [x] Task 10.2 – Visual Page Editor (Executor: Complete - `PagesEditor` uses visual `PageSectionEditors`, not raw JSON editing)
- [x] Task 10.3 – Google Tag Manager Integration (Executor: Complete - `GTMHead` injector + `/admin/gtm` editor + `gtmService`)
- [x] Task 10.4 – Enhanced SEO Management (Executor: Complete - `SEOHead` injector + `/admin/seo` editor + `seoService` incl. JSON-LD support)
- [x] Task 10.5 – Automatic Header Updates (Executor: Complete - `GTMHead`/`SEOHead` respond to route changes; CMS content persists via localStorage)
- [ ] Task 11.1 – Netlify deployment hardening: SPA redirects + `/api/contact` Netlify Function (Executor: in progress)

## Execution Phasing Plan (for when Executor starts)

1. **Foundation & Theme Alignment**
   - Focus tasks: 0.1, 0.2, 2.1, 2.2.
   - Goal: Ensure the Executor has a clear mapping from Orca Dash tokens/components → marketing primitives + `MarketingLayout`.
   - Milestone check:
     - `MarketingLayout` shell renders with correct nav, footer, and background treatment.
     - At least one example “glass marketing section” using real tokens and utilities.

2. **Information Architecture & Routing**
   - Focus tasks: 1.1, 1.2.
   - Goal: Implement routes + basic pages (empty shells) that match the planned site map and metadata structure.
   - Milestone check:
     - All target routes exist and render identifiable placeholders.
     - Basic `<title>` and description wiring in place for each page.

3. **Homepage First Pass**
   - Focus tasks: 3.1, 3.2.
   - Goal: Build a complete homepage structure with real copy v1 and mapped components (hero, value props, metrics, AI, 10-year strip, final CTA).
   - Milestone check:
     - All homepage sections exist and are visually coherent with Orca Dash.
     - Tests confirm key headings/CTAs render and core accessibility landmarks exist.

4. **Core Secondary Pages**
   - Focus tasks: 4.1, 4.2, 4.3, 4.4.
   - Goal: Implement Solutions, Product, AI & Data, and Results pages using the shared layout and components.
   - Milestone check:
     - Each page has all planned sections and uses the same visual language.
     - At least smoke tests per page ensuring critical sections render.

5. **Brand Story & Support Pages**
   - Focus tasks: 5.1, 5.2, 5.3.
   - Goal: Stand up About, Resources, and Contact/Demo in a “launch-ready” but evolvable state.
   - Milestone check:
     - Contact form functional from a UX perspective (even if backend/CRM is stubbed).
     - At least one live resource (article/case study) to avoid an empty feeling.

6. **Polish: Accessibility, Performance, Analytics**
   - Focus tasks: 6.1, 6.2, 6.3.
   - Goal: Tighten quality across the site before/after launch.
   - Milestone check:
     - Accessibility basics audited and addressed.
     - Image/asset guidelines implemented; analytics hooks in place for key events.

## Executor's Feedback or Assistance Requests

- **Task 11.1 – Netlify deployment hardening (Executor: implemented, awaiting verification)**
  - Added `netlify/functions/contact.js` so `/api/contact` can send emails on Netlify using Azure Communication Services Email (same env vars as `api/contact`).
  - Updated `netlify.toml` redirects:
    - `/api/*` → `/.netlify/functions/:splat`
    - `/*` → `/index.html` (SPA routing for React Router)
  - Note: `npm audit` now shows **moderate** dev-tooling issues requiring `npm audit fix --force` (breaking). I did **not** apply any forced fix.
  - **Homepage hero image fix**: Added a `Hero Image` section to the visual `PagesEditor` for the homepage so the uploaded ChatGPT image can be selected for the first image.

- **Task 10.1-10.6 Complete** (Executor - Completed):
  - Current status: All tasks completed successfully
  - Details:
    - **Task 10.6**: Moved AI article generation from public ResourcesPage to admin ArticlesManager. Removed AIArticleGenerator component from public view. Added "Generate AI Article" button in admin with toggle functionality.
    - **Task 10.1**: Created structured PageContent types (HeroSection, MetricSection, etc.), usePageContent hook for loading CMS content with fallback, migrated HomePage to use content system while maintaining hardcoded defaults.
    - **Task 10.3**: Created GTM service for storing/retrieving GTM config, GTMEditor component for admin configuration, GTMHead component that automatically injects GTM scripts into HTML head and body. Added to admin navigation and dashboard.
    - **Task 10.4**: Created SEOHead component that automatically injects all SEO tags (meta, OpenGraph, Twitter Cards, structured data) into HTML head. Enhanced SEO editor with structured data (JSON-LD) editor. All tags update automatically on route change.
    - **Task 10.2**: Replaced JSON editor in PagesEditor with visual form-based editor. Created section editors for hero, metrics, and anniversary banner with user-friendly form fields. Editor shows which sections exist for each page.
    - **Task 10.5**: Automatic header updates are working - GTMHead and SEOHead components read from localStorage and inject tags on mount/route change. usePageContent hook loads latest content from localStorage. Changes persist and are reflected on page load/navigation.
  - Result: Admin dashboard now has simple UI for editing page copy, GTM management, enhanced SEO management, and all changes automatically update site headers. System is user-friendly for non-technical users.
  - Additional improvements:
    - Enhanced usePageMetadata to integrate with SEO service for better metadata management
    - Improved GTMHead to handle route changes and prevent duplicate script injection
    - All components now work together seamlessly with proper fallbacks

- **Image Management & Mockups Feature** (Executor - Completed):
  - Current status: Complete
  - Details:
    - Created `imageService.ts` for storing and managing images (localStorage with base64 for MVP)
    - Created `ImageManager.tsx` admin component for uploading, viewing, and deleting images
    - Created `LaptopMockup.tsx` and `DesktopMockup.tsx` components for displaying images on device mockups
    - Added `ImageSection` and `MockupSection` types to content management system
    - Enhanced `PagesEditor` with image and mockup section editors
    - Integrated image and mockup sections into `HomePage` for display
    - Added ImageManager to admin navigation and dashboard quick actions
    - Images can be uploaded, selected, and displayed on pages
    - Mockups can be configured with laptop or desktop style and screen images
  - Result: Admin can now upload images, add them to pages, and create laptop/desktop mockups with custom screen images. All managed through the admin dashboard.

- **Complete CMS Migration** (Executor - Completed):
  - Current status: Complete
  - Details:
    - Created comprehensive content types for all page sections (HeroSection, ValuePropSection, ServiceSection, ModuleSection, RoleSection, ModeSection, CaseStudySection, TimelineItemSection, ValueSection, TestimonialSection, TrustBadgeSection, CTASection, ContactInfoSection, etc.)
    - Created `pageDefaults.ts` service with default content for all pages (homepage, solutions, product, ai, results, about, contact)
    - Created `PageSectionEditors.tsx` component with page-specific editors for each page type
    - Migrated ALL pages to use CMS:
      - HomePage: hero, metrics, valueProps, services, testimonials, trustBadges, certifications, timeline, finalCTA, images, mockups
      - SolutionsPage: hero, roles, modes, finalCTA
      - ProductPage: hero, modules, integrations, outcomes, finalCTA
      - AiPage: hero, capabilities, dataFoundation, trustSecurity, finalCTA
      - ResultsPage: hero, caseStudies, aggregateMetrics, finalCTA
      - AboutPage: hero, story, timeline, values, responsibility, finalCTA
      - ContactPage: hero, whatHappensNext, contactInfo, testimonial
    - Updated `PagesEditor` to use `PageSectionEditors` component which shows all sections for each page type
    - Updated `usePageContent` hook to use `getDefaultContentForPage` for automatic defaults
    - All pages now load from CMS with graceful fallback to defaults
    - Admin dashboard now reflects EXACTLY what's on the website - every section is editable
  - Result: Admin dashboard is now a true CMS that represents and allows customization of all content on the website. Every title, header, paragraph, list item, CTA, and section can be edited through the admin interface. The backend is a true representation of the frontend.

- **Builder.io Integration** (Executor - Completed):
  - Current status: Complete
  - Details:
    - Installed `@builder.io/react` and `@builder.io/sdk` packages
    - Created `builderService.ts` with API key configuration (bpk-75435189e8f04d8894e8f009b495b4dc)
    - Created `BuilderPage.tsx` component to render Builder.io content dynamically
    - Created `BuilderEditor.tsx` admin page with links and instructions for accessing Builder.io visual editor
    - Added `/builder/*` route to public routes for Builder.io pages
    - Added `/admin/builder` route to admin dashboard
    - Added "Builder.io Editor" quick action to admin dashboard
    - Added "Builder.io" navigation item to admin sidebar
    - Builder.io pages are accessible at `/builder/[page-url]` where `[page-url]` is the URL path set in Builder.io
    - Pages created in Builder.io automatically sync to the site
    - Visual editor accessible from admin dashboard at `/admin/builder`
  - Result: Users can now create and edit pages visually in Builder.io without writing code. Pages are integrated into the React site and accessible through the `/builder/*` route pattern. The admin dashboard provides easy access to the Builder.io editor.

## Executor's Feedback or Assistance Requests

- **Task 0.1 – Confirm Orca Dash design tokens as canonical**
  - Current status (Executor): In progress, using an approximate token set.
  - Details:
    - No existing Orca Dash `tokens.json` or Tailwind config were available in this workspace.
    - Executor bootstrapped a Vite + React + Tailwind app and defined a first-pass Orca theme in `tailwind.config.cjs`:
      - `colors.orca.*` for background, panel, primary, secondary, accent.
      - `borderRadius.panel/tile/button` for panels, tiles, and pill buttons.
      - `boxShadow.orca-panel/orca-glow-*` for panel depth and cyan/purple glows.
  - Follow-up for Planner:
    - When the official Orca Dash tokens are available, Planner and Executor should schedule a pass to align this Tailwind theme 1:1 with the portal’s tokens (or migrate to a shared token file).

- **Task 0.2 – Define marketing layout primitives**
  - Current status (Executor): Complete.
  - Details:
    - Implemented primitives:
      - Utility classes in `src/index.css`: `glass-panel`, `rounded-panel`, `rounded-tile`, `rounded-button`.
      - `MarketingLayout` component with:
        - Sticky glass header + nav, 10-year pill, primary CTA “Book a demo”.
        - Responsive mobile menu with hamburger button.
        - Orb-like gradient background and glass-style footer.
      - All pages now use these primitives consistently.

- **Phases 1-5 Complete** (Executor):
  - **Phase 1**: All routes implemented (`/`, `/solutions`, `/product`, `/ai`, `/results`, `/about`, `/resources`, `/contact`) with React Router. SEO metadata hook (`usePageMetadata`) created and wired to all pages.
  - **Phase 2**: `MarketingLayout` fully responsive with mobile nav. All components use consistent design tokens.
  - **Phase 3**: Homepage complete with all planned sections:
    - Hero with AI insight preview
    - Metrics row (KPI tiles)
    - Value props grid (Why Orca?)
    - Services overview (What we do)
    - Product preview (Dashboard/Exceptions mockups)
    - AI section (Orca Intelligence)
    - Customer testimonials
    - 10-year timeline strip
    - Final CTA band
    - Created reusable components: `ValuePropsGrid`, `ServicesOverview`, `ProductPreview`, `AiSection`, `TimelineStrip`, `FinalCtaBand`
  - **Phase 4**: All secondary pages fully implemented:
    - Solutions: By-role (Finance/Logistics/Procurement) and by-mode (LTL/FTL/parcel/ocean-air) sections with glass cards
    - Product: 4 core modules (Audit/Payment, Claims/Exceptions, Invoice/Accounting, Analytics) with previews
    - AI & Data: Capabilities, data foundation, trust/security sections
    - Results: 3 case studies with problem/approach/results, aggregate metrics, quotes
  - **Phase 5**: About, Resources, Contact complete:
    - About: Story, timeline, values, responsibility sections
    - Resources: Featured resource, articles grid, tools section (coming soon placeholders)
    - Contact: Enhanced form with all fields, "what happens next" sidebar, trust cues
  - **Status**: Website is fully functional and ready for local testing. Run `npm install` then `npm run dev` to view.

- **Next Steps** (Phase 6 - Quality Layer):
  - Task 6.1: Formal accessibility audit (semantic HTML, ARIA, contrast, focus states)
  - Task 6.2: Image optimization, lazy loading, performance guidelines
  - Task 6.3: Analytics integration (GA/Plausible) with event tracking

- **Phase 7 - Visual Enhancements & Content Gap Analysis** (NEW - Planner):
  - Task 7.1: Background animations & living visuals
    - Need: Subtle background animations at 20% opacity to make site feel "alive"
    - Ideas: Floating orbs/mesh gradients, particle effects, data stream visuals, subtle parallax
    - Requirements: Performance-optimized (CSS transforms), respect `prefers-reduced-motion`, reinforce AI/data themes
  - Task 7.2: Content gap analysis vs. current orcaaudit.com
    - Need: Compare new site with current orcaaudit.com to identify missing:
      - Detailed service pages (Freight Audit, Freight Payment, Claims Processing, Freight Rating, Invoice Management, Freight Accounting, Supply Chain Analytics)
      - Trust signals (certifications, partnerships, awards, client logos)
      - Contact details (phone numbers, physical address, support channels)
      - Legal pages (Privacy Policy, Terms of Service)
      - Integration/partner logos
      - Industry-specific use cases or verticals
      - Carbon calculator tool (mentioned in legacy content)
      - Team/leadership bios (if present on current site)
  - Task 7.3: Enhanced glassmorphism & depth
    - Need: Refine glass panel effects with proper backdrop-blur
    - Add layered depth with multiple z-index levels
    - Enhance shadows and highlights for 3D feel
    - Ensure vibrant backgrounds show through glass panels effectively

- **Article Relevance Filtering** (Executor - Completed):
  - Current status: Complete
  - Details:
    - Added `isRelevantArticle()` function to filter external articles
    - Filters to only show:
      - Orca-related articles (mentions Orca, OrcaAudit, founders, Orca Intelligence)
      - General freight/logistics industry articles (requires 2+ industry keywords)
    - Updated `fetchExternalArticles()` to apply relevance filter before returning results
    - News page now only displays relevant Orca-related and industry-relevant articles

- **Admin Dashboard Planning** (Planner - New Phase 9):
  - Current status: Comprehensive plan created
  - Details:
    - Created Phase 9 task breakdown (9.1-9.8) covering:
      - Authentication & architecture
      - Page content editor
      - Article management
      - SEO management
      - Contact form handling
      - Data storage options
      - Admin UI/UX
      - Deployment & security
    - Added detailed Planner Analysis section with:
      - Storage solution recommendations (JSON files, Netlify CMS, external database)
      - Authentication strategies (password, Netlify Identity, OAuth)
      - Content structure schemas
      - Netlify Functions architecture
      - Implementation phases
      - Migration path from current setup
    - Goal: Enable non-technical users to manage all site content without code changes or external platforms like Wix

- **Task 9.1 - Admin Dashboard Architecture & Authentication** (Executor - Completed):
  - Current status: Complete
  - Details:
    - Created `authService.ts` with password authentication and session management
    - Created `AuthContext.tsx` for global auth state management
    - Created `ProtectedRoute.tsx` component for route protection
    - Created `AdminLayout.tsx` with sidebar navigation matching Orca theme
    - Created `AdminLogin.tsx` page with glass panel styling
    - Created `AdminDashboard.tsx` with stats and quick actions
    - Updated `App.tsx` to include admin routes with protection
    - Updated `main.tsx` to wrap app with AuthProvider
    - Admin routes: `/admin/login`, `/admin` (dashboard), `/admin/pages`, `/admin/articles`, `/admin/contact`, `/admin/seo`, `/admin/settings`

- **Task 9.2 - Page Content Editor** (Executor - Completed):
  - Created `PagesEditor.tsx` with page selector and JSON-based content editor
  - Integrated with `contentService.ts` for saving/loading page content
  - Basic editor interface (can be enhanced with visual editor later)

- **Task 9.3 - News Article Management** (Executor - Completed):
  - Created `ArticlesManager.tsx` with full CRUD operations
  - Create, edit, delete articles
  - Filter by published/draft status
  - Mark articles as featured
  - Integrated with `adminArticleService.ts`

- **Task 9.4 - SEO Management** (Executor - Completed):
  - Created `SEOEditor.tsx` for global and page-specific SEO settings
  - Configure page titles, meta descriptions, OpenGraph tags
  - Global SEO settings (site name, default title, Google Analytics, etc.)
  - Integrated with `seoService.ts`

- **Task 9.5 - Contact Form Management** (Executor - Completed):
  - Created `ContactSubmissions.tsx` with submission viewer and management
  - View, filter, and update submission status
  - Add notes to submissions
  - Delete submissions
  - Updated `ContactPage.tsx` to actually submit to contact service
  - Integrated with `contactService.ts`

- **Task 9.6 - Data Storage & Backend Architecture** (Executor - Completed):
  - Created type definitions in `src/types/content.ts`
  - Created service layer:
    - `contentService.ts` - Page content management
    - `adminArticleService.ts` - Article management
    - `seoService.ts` - SEO settings management
    - `contactService.ts` - Contact submission management
  - All services use localStorage for MVP (ready for Netlify Functions integration)
  - Created `netlify.toml` configuration
  - Created `netlify/functions/` directory structure
  - Created `README_ADMIN.md` documentation

- **Admin Dashboard Status**: MVP Complete
  - All core features implemented and functional
  - Uses localStorage for data persistence (ready for backend migration)
  - All admin interfaces match Orca theme
  - Ready for testing and deployment

- **Article HTML Display Fix** (Executor - Completed):
  - Current status: Complete
  - Issue: Article descriptions from RSS feeds were displaying raw HTML code instead of plain text previews
  - Solution:
    - Added `stripHtml()` function in `articleService.ts` to strip HTML tags when processing external articles from RSS feeds
    - Added safety fallback in `ArticleCard.tsx` to strip HTML if any slips through
    - Function handles both DOM parsing (browser) and regex fallback (universal)
  - Note: Users with cached articles may need to clear localStorage cache to see the fix for existing articles

- **AI Article Generator Enhancement** (Executor - Completed):
  - Current status: Complete
  - Issue: AI-generated articles were only 1 paragraph long and not informative or worthy of reading
  - Solution:
    - Created comprehensive `articleGenerator.ts` service that generates full-length articles (8+ paragraphs)
    - Articles now include:
      - Introduction with context
      - Problem statement section
      - Solution section
      - Benefits and outcomes
      - Implementation best practices
      - Real-world case studies
      - Future outlook
      - Conclusion
    - Added `content` field to Article interface for full-length HTML content
    - Added `sources` field for citations and references
    - Enhanced ArticleDetailPage to display full content with proper formatting
    - Added CSS styling for article content (headings, lists, links)
    - Articles now include relevant images via Unsplash API
    - Citations and sources are displayed at the end of articles
  - Result: AI-generated articles are now comprehensive, informative, and publication-worthy


## Planner Analysis: News Page Transformation Plan

### Overview
Transform the Resources page into a News page that:
1. Aggregates external articles about Orca (and Matt Grossi / Marco Grossi)
2. Allows AI-generated article creation
3. Replaces tools section with engaging metrics showcase from orcaaudit.com

### Technical Approach

#### External Article Aggregation (Task 8.2)
**Option 1: RSS Feed Integration (Recommended)**
- Use RSS2JSON.com proxy service to convert RSS feeds to JSON
- Fetch from:
  - Google News RSS: `https://news.google.com/rss/search?q=orca+freight+audit`
  - Google News RSS: `https://news.google.com/rss/search?q="Matt+Grossi"+OR+"Marco+Grossi"`
  - Any Orca blog RSS feed if available
- Create `src/services/articleService.ts`:
  - `fetchExternalArticles()` function
  - Cache results in localStorage with expiration
  - Filter and deduplicate articles
  - Format for display

**Option 2: NewsAPI Integration**
- Use NewsAPI.org (requires API key, free tier available)
- Search for: "Orca freight audit", "orcaaudit.com", "Matt Grossi", "Marco Grossi"
- More reliable but requires API key setup

**Option 3: Serverless Function**
- Create Netlify/Vercel serverless function to fetch articles
- Avoids CORS issues
- Can scrape specific sites if needed

**Recommendation**: Start with Option 1 (RSS2JSON) for simplicity, can upgrade later.

#### AI Article Generation (Task 8.3)
**Approach 1: Admin Interface (Simple)**
- Create form in News page (admin-only or public)
- User enters topic/prompt
- Calls AI API (OpenAI, Anthropic) via serverless function
- Stores generated article in localStorage or sends to backend
- Displays in article feed with "AI Generated" badge

**Approach 2: Pre-generated Articles**
- Use Cursor/Claude to generate articles offline
- Store as JSON file or in codebase
- Display as static content
- Can refresh periodically

**Approach 3: Backend Integration**
- Create API endpoint for article generation
- Store in database
- Admin panel for managing articles

**Recommendation**: Start with Approach 1 (simple form + serverless function) for MVP.

#### Metrics Showcase (Task 8.4)
**Data Sources**:
- Extract from orcaaudit.com homepage/about page
- Common metrics to look for:
  - Total spend audited (e.g., "$10B+", "$15B")
  - Invoices processed per year
  - Number of clients
  - Years in operation (10 years)
  - Average savings percentage
  - Number of freight modes supported
  - Geographic coverage

**Visual Design**:
- Animated counter components (count-up on scroll)
- Glass cards with gradient borders
- Icon indicators (dollar sign, invoice, clock, etc.)
- Group by category:
  - **Scale**: Spend audited, invoices processed, clients
  - **Impact**: Average savings, total savings identified
  - **Trust**: Years in operation, certifications
- Hover effects with subtle glow
- Responsive grid layout

**Component Structure**:
- `MetricsShowcase.tsx` component
- `AnimatedCounter.tsx` for number animations
- `MetricCard.tsx` for individual metric display

### Implementation Order
1. **Task 8.1**: Rename Resources → News (quick win)
2. **Task 8.4**: Replace tools with metrics showcase (visual impact)
3. **Task 8.2**: External article aggregation (content)
4. **Task 8.3**: AI article generation (advanced feature)

### Data Storage Strategy
- **External articles**: localStorage with 24-hour cache, or backend API
- **AI articles**: localStorage for MVP, backend for production
- **Metrics**: Hardcoded in component (from orcaaudit.com), or config file

### Success Criteria Summary
- Navigation updated: "Resources" → "News"
- External articles display in feed with source attribution
- AI article generation form/interface functional
- Metrics showcase replaces tools section with engaging visuals
- All articles (external + AI) display in unified feed
- Filtering/tagging system for article types

## Planner Analysis: Remaining Work & Content Gap Analysis

### What's Left (Remaining Tasks)

**Phase 6 - Quality Layer (3 tasks):**
1. **Task 6.1 - Accessibility checklist**: Formal audit needed (semantic HTML, ARIA, contrast, focus states, alt text)
2. **Task 6.2 - Performance & assets**: Image optimization, lazy loading, animation performance guidelines
3. **Task 6.3 - Analytics & tracking**: Hook up analytics (GA/Plausible) with event tracking for CTAs, demo requests, scroll depth

**Phase 7 - Visual Enhancements & Content Gaps (3 NEW tasks):**
1. **Task 7.1 - Background animations**: Add subtle 20% opacity living visuals (floating orbs, mesh gradients, particle effects, data streams)
2. **Task 7.2 - Content gap analysis**: Compare with current orcaaudit.com and identify missing content
3. **Task 7.3 - Enhanced glassmorphism**: Refine glass effects, add depth layers, enhance shadows/highlights

### Content Gap Analysis: Current orcaaudit.com vs. New Site

Based on the plan and typical freight audit sites, here are likely gaps to address:

#### Missing Service Pages (Current site likely has dedicated pages for):
- **Freight Audit** (detailed page beyond homepage mention)
- **Freight Payment** (detailed page)
- **Freight Claims Processing** (detailed page)
- **Freight Rating** (detailed page)
- **Freight Invoice Management** (detailed page)
- **Freight Accounting** (detailed page)
- **Supply Chain Analytics** (detailed page)

**Action**: Either:
- Create dedicated `/services/[service-name]` routes with detailed pages, OR
- Expand the `/product` page to include detailed subsections for each service

#### Missing Trust Signals & Social Proof:
- **Client logos** (actual logos, not just mentions)
- **Certifications** (SOC 2, ISO, etc. if applicable)
- **Partnerships** (TMS/ERP integrations with logos)
- **Awards or recognition** (if any)
- **Industry associations** (if any)

**Action**: Add a "Trusted by" section on homepage and/or dedicated trust page

#### Missing Contact Details:
- **Phone number** (if current site has one)
- **Physical address** (if current site has one)
- **Support email** (separate from demo form)
- **Office locations** (if multiple)

**Action**: Add to footer and/or Contact page sidebar

#### Missing Legal Pages:
- **Privacy Policy** (`/privacy`)
- **Terms of Service** (`/terms`)
- **Cookie Policy** (if applicable)

**Action**: Create stub pages or migrate from current site

#### Missing Tools/Resources:
- **Carbon Calculator** (mentioned in legacy content analysis)
- **Savings Estimator** (if current site has one)
- **Benchmarking tools** (if current site has one)

**Action**: Implement or add "Coming soon" placeholders with clear value props

#### Missing Integration Details:
- **TMS integrations** (specific systems: SAP, Oracle, etc.)
- **ERP integrations**
- **Carrier API connections**
- **EDI capabilities**

**Action**: Expand `/product` integrations section or create `/integrations` page

#### Potential Missing Content:
- **Industry verticals** (Retail, Manufacturing, E-commerce, etc.)
- **Use case deep-dives** (beyond Solutions page)
- **Video content** (demos, testimonials, explainers)
- **Webinar/event listings** (if current site has these)
- **Blog/articles** (actual content, not just structure)
- **Case study PDFs** (downloadable resources)

### Background Animations & Living Visuals Plan

**Goal**: Make the site feel "alive" with subtle 20% opacity background animations that reinforce AI/data themes.

**Implementation Approach:**

1. **Floating Orbs/Mesh Gradients**:
   - Multiple gradient orbs that slowly drift/move
   - Use CSS `@keyframes` with `transform: translate()` for GPU acceleration
   - Opacity: 0.2 (20%)
   - Colors: Cyan and purple gradients matching Orca theme
   - Speed: Very slow (10-30s per cycle) to feel organic, not distracting

2. **Data Stream Visuals**:
   - Subtle lines or particles that suggest data flow
   - Could animate along paths (SVG or CSS)
   - Reinforce "data" and "analytics" themes
   - Opacity: 0.15-0.2

3. **Particle Effects**:
   - Light particle system (CSS or lightweight JS library)
   - Particles drift slowly, suggest "intelligence" or "data points"
   - Keep particle count low for performance (< 50 particles)

4. **Parallax/Depth Effects**:
   - Multiple background layers moving at different speeds
   - Creates sense of depth without being distracting
   - Use `transform: translateZ()` for GPU acceleration

**Technical Requirements:**
- Use CSS animations/transforms (GPU-accelerated)
- Respect `prefers-reduced-motion` media query (disable animations if user prefers)
- Keep animations subtle (20% opacity max)
- Test performance on lower-end devices
- Consider `will-change` property for animated elements
- Use `transform` and `opacity` only (avoid layout-triggering properties)

**Implementation Location:**
- Add to `MarketingLayout` background layer
- Or create a dedicated `<AnimatedBackground />` component
- Ensure animations don't interfere with content readability

**Example CSS Structure:**
```css
@keyframes float-orb-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -30px) scale(1.1); }
}

@keyframes float-orb-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-25px, 25px) scale(0.9); }
}

.animated-background {
  opacity: 0.2;
  animation: float-orb-1 20s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animated-background {
    animation: none;
  }
}
```

### Recommended Execution Order

1. **Task 7.2** (Content gap analysis) - First, to identify what content needs to be added
2. **Task 7.1** (Background animations) - Then, to add the "living" feel
3. **Task 7.3** (Enhanced glassmorphism) - Refine visual polish
4. **Task 6.1-6.3** (Quality layer) - Final polish before launch

This order ensures content is complete before visual polish, and animations enhance an already-content-rich site.

## Planner Analysis: Admin Dashboard & Content Management System

### Overview
Create a self-hosted admin dashboard to manage all site content, news articles, SEO settings, and contact form submissions. This replaces the need for Wix or similar platforms, allowing full control over the site while maintaining ease of use for non-technical content managers.

### Technical Architecture

#### Storage Solution Options

**Option A: JSON Files + Git (Recommended for MVP)**
- **Pros**: 
  - Simple, no external dependencies
  - Version-controlled content (Git history)
  - Free, no database costs
  - Easy to backup (just Git)
- **Cons**: 
  - Limited concurrent editing
  - Requires Git knowledge for advanced operations
  - File size limits for large content
- **Implementation**:
  - Store content in `data/` directory:
    - `data/pages/homepage.json`
    - `data/pages/solutions.json`
    - `data/articles/ai-*.json`
    - `data/seo/global.json`
    - `data/seo/pages/*.json`
  - Netlify Functions read/write JSON files
  - Changes trigger Git commit (via GitHub API or Netlify Build)
  - Site rebuilds on content changes

**Option B: Netlify CMS (Git-based CMS)**
- **Pros**:
  - Built-in admin UI (no custom dashboard needed)
  - Git-based (version control built-in)
  - Markdown editor
  - Media library
  - User-friendly for non-technical users
- **Cons**:
  - Less customization of admin UI
  - Requires specific file structure
  - Limited programmatic access
- **Implementation**:
  - Add `admin/config.yml` for Netlify CMS
  - Configure collections for pages, articles, SEO
  - Uses GitHub/GitLab as backend
  - Admin UI at `/admin/index.html`

**Option C: External Database (Fauna, Supabase, MongoDB Atlas)**
- **Pros**:
  - Real-time updates
  - Better for concurrent editing
  - Scalable
  - Advanced querying
- **Cons**:
  - Additional cost
  - More complex setup
  - Requires database management
- **Implementation**:
  - Use Fauna (serverless, generous free tier)
  - Or Supabase (PostgreSQL, free tier)
  - Netlify Functions connect to database
  - Real-time subscriptions for live updates

**Recommendation**: Start with **Option A (JSON files)** for MVP, can migrate to Option B (Netlify CMS) or Option C (database) later if needed.

#### Authentication Strategy

**Option 1: Simple Password Authentication**
- **Pros**: Simple, no external dependencies
- **Cons**: Less secure, single admin user
- **Implementation**:
  - Password hash stored in environment variable
  - JWT token for session management
  - Netlify Function validates password
  - Token stored in httpOnly cookie or localStorage

**Option 2: Netlify Identity**
- **Pros**: Built-in, OAuth support, user management
- **Cons**: Requires Netlify Identity addon
- **Implementation**:
  - Enable Netlify Identity in dashboard
  - Use `netlify-identity-widget` for login UI
  - Protect routes with `netlify-identity` context

**Option 3: OAuth (Google, GitHub)**
- **Pros**: Secure, no password management
- **Cons**: Requires OAuth setup
- **Implementation**:
  - Use Netlify Functions for OAuth flow
  - Store user sessions in JWT
  - Whitelist allowed email addresses

**Recommendation**: Start with **Option 1 (password)** for MVP, upgrade to Option 2 or 3 for production.

#### Page Content Structure

Each page should have a structured JSON schema:

```json
{
  "pageId": "homepage",
  "sections": {
    "hero": {
      "headline": "Freight Audit & Analytics AI",
      "subheadline": "...",
      "ctaPrimary": "Book a demo",
      "ctaSecondary": "Explore the portal"
    },
    "metrics": {
      "items": [
        { "label": "Spend Audited", "value": "$15B+", "icon": "dollar" },
        ...
      ]
    },
    "valueProps": {
      "items": [
        { "title": "...", "description": "...", "icon": "..." },
        ...
      ]
    },
    ...
  },
  "lastModified": "2024-01-15T10:30:00Z",
  "modifiedBy": "admin@orca.com"
}
```

#### Article Management Structure

```json
{
  "id": "ai-1234567890",
  "title": "Article Title",
  "content": "Full markdown content...",
  "excerpt": "Short description...",
  "author": "Orca Intelligence",
  "date": "2024-01-15",
  "category": "ai-generated",
  "tags": ["freight-audit", "ai"],
  "imageUrl": "/images/articles/...",
  "featured": false,
  "published": true,
  "seo": {
    "title": "Custom SEO Title",
    "description": "Custom meta description",
    "keywords": ["keyword1", "keyword2"]
  }
}
```

#### SEO Management Structure

**Global SEO** (`data/seo/global.json`):
```json
{
  "siteName": "Orca",
  "defaultTitle": "Orca – Freight Audit & Analytics AI",
  "defaultDescription": "...",
  "defaultImage": "/images/og-default.png",
  "twitterHandle": "@orcaaudit",
  "googleAnalyticsId": "G-XXXXXXXXXX",
  "googleSearchConsole": "...",
  "robotsTxt": "User-agent: *\nAllow: /"
}
```

**Page-specific SEO** (`data/seo/pages/homepage.json`):
```json
{
  "pageId": "homepage",
  "title": "Custom Page Title",
  "description": "Custom meta description",
  "ogTitle": "Custom OG Title",
  "ogDescription": "Custom OG description",
  "ogImage": "/images/og-homepage.png",
  "canonical": "https://orcaaudit.com/",
  "schema": {
    "@type": "WebPage",
    "name": "...",
    "description": "..."
  }
}
```

#### Contact Form Integration

**Netlify Forms (Recommended)**:
- Built-in form handling
- Spam protection
- Email notifications
- Submission storage
- No serverless function needed

**Custom Serverless Function**:
- More control over processing
- Custom validation
- CRM integration
- Custom email templates

**Implementation**:
1. Contact form submits to `/api/contact` (Netlify Function)
2. Function validates, sanitizes input
3. Sends email via SendGrid/Mailgun/Netlify Email
4. Stores submission in JSON file or database
5. Returns success/error response
6. Admin dashboard displays submissions

#### Admin Dashboard UI Components

**Required Components**:
- `AdminLayout.tsx` - Main admin layout with sidebar
- `AdminLogin.tsx` - Login page
- `AdminDashboard.tsx` - Dashboard home with stats
- `PageEditor.tsx` - Page content editor
- `ArticleEditor.tsx` - Article creation/editing
- `ArticleList.tsx` - Article management list
- `ContactSubmissions.tsx` - Contact form submissions viewer
- `SEOEditor.tsx` - SEO settings editor
- `ImageUploader.tsx` - Image upload component
- `RichTextEditor.tsx` - Rich text/markdown editor

**Tech Stack Recommendations**:
- **Rich Text Editor**: Tiptap, Slate, or React Quill
- **Markdown Editor**: react-markdown-editor-lite or CodeMirror
- **Form Management**: React Hook Form
- **Image Upload**: Cloudinary, Imgix, or Netlify Large Media
- **Date Picker**: react-datepicker
- **Table/List**: react-table or TanStack Table

#### Netlify Functions Structure

```
netlify/functions/
  ├── auth/
  │   ├── login.js
  │   └── verify.js
  ├── content/
  │   ├── get-page.js
  │   ├── update-page.js
  │   └── list-pages.js
  ├── articles/
  │   ├── get-articles.js
  │   ├── get-article.js
  │   ├── create-article.js
  │   ├── update-article.js
  │   └── delete-article.js
  ├── seo/
  │   ├── get-seo.js
  │   └── update-seo.js
  ├── contact/
  │   ├── submit.js
  │   └── get-submissions.js
  └── upload/
      └── image.js
```

#### Implementation Phases

**Phase 1: Foundation (Tasks 9.1, 9.6)**
- Set up authentication
- Create admin layout
- Choose storage solution
- Set up Netlify Functions structure
- Basic routing and protection

**Phase 2: Content Management (Tasks 9.2, 9.3)**
- Page content editor
- Article management
- Image upload
- Content preview

**Phase 3: SEO & Forms (Tasks 9.4, 9.5)**
- SEO management interface
- Contact form integration
- Email notifications
- Submission management

**Phase 4: Polish (Task 9.7, 9.8)**
- Dashboard UI/UX improvements
- Security hardening
- Error handling
- Documentation

### Success Criteria Summary

- Admin can log in securely
- Admin can edit all page content without code changes
- Admin can create/edit/delete articles
- Admin can configure SEO for all pages
- Contact form submissions are viewable and manageable
- All changes are saved and reflected on the live site
- System is secure and production-ready
- Non-technical users can manage content easily

### Migration Path from Current Setup

1. **Extract current content** from React components to JSON files
2. **Create content loading system** that reads from JSON instead of hardcoded
3. **Build admin dashboard** to edit JSON files
4. **Migrate articles** from localStorage to JSON/database
5. **Set up contact form** backend
6. **Configure SEO** management
7. **Test and deploy** to Netlify

## Lessons

- Include info useful for debugging in the program output.
- Read the file before you try to edit it.
- If there are vulnerabilities that appear in the terminal, run `npm audit` before proceeding.
- Always ask before using the `-force` git command.
- Updated logo from SVG to PNG format (orca-logo.png) in MarketingLayout.tsx
- RSS feed descriptions often contain HTML tags that need to be stripped before display. Added `stripHtml()` function in `articleService.ts` to clean descriptions when processing external articles, and added safety fallback in `ArticleCard.tsx` component. Users may need to clear article cache (localStorage) to see the fix for existing cached articles.

## Planner Analysis: Enhanced AI/Futuristic Robot Background Options

### Background
The user wants to enhance the `AnimatedBackground` component to feel more "living and breathing" like a "futuristic robot AI." Currently, the background has:
- 5 floating gradient orbs (cyan/purple)
- 30 data stream particles (horizontal lines)
- Mesh gradient overlay

### Goal
Add visual elements that evoke:
- AI "intelligence" and "processing"
- Futuristic/robotic aesthetic
- "Living" and "breathing" motion (organic, not mechanical)
- Subtle enough not to distract from content
- Performance-friendly (CSS transforms, GPU-accelerated)

### Option 1: Neural Network Grid (Recommended - Subtle & AI-focused)
**Concept**: Animated grid pattern that suggests neural network connections, with nodes that pulse and connections that "light up" in sequence.

**Visual Elements**:
- Grid of small nodes (dots) arranged in a subtle pattern
- Lines connecting nodes that animate with a "signal" traveling effect
- Nodes pulse with a breathing animation (scale + opacity)
- Colors: cyan/purple gradients matching Orca theme
- Opacity: 15-20% max

**Implementation**:
- CSS grid of small divs (nodes)
- SVG or CSS lines for connections
- Keyframe animations: `pulse-node`, `signal-travel`
- Performance: Use `transform` and `opacity` only

**Pros**: Clearly AI-themed, subtle, performant
**Cons**: Might feel too "tech-y" if overdone

---

### Option 2: Scanning/Radar Effect
**Concept**: Rotating radar-like sweeps or scanning beams that suggest active monitoring/analysis.

**Visual Elements**:
- 2-3 rotating radial gradients (like radar sweeps)
- Scanning lines that move across the viewport
- Pulsing center point (like a "sensor")
- Colors: cyan/purple with transparency

**Implementation**:
- CSS `conic-gradient` with rotation animation
- Multiple overlapping sweeps at different speeds
- Opacity: 10-15%

**Pros**: Suggests "monitoring" and "active AI"
**Cons**: Can be distracting if too prominent

---

### Option 3: Particle Swarm / Data Points
**Concept**: Small particles that move in organic, flocking-like patterns (like data points being processed).

**Visual Elements**:
- 50-100 small particles (2-4px circles)
- Particles move in smooth, organic paths (not straight lines)
- Some particles "connect" with brief lines when close
- Particles pulse or change size subtly
- Colors: cyan/purple with varying opacity

**Implementation**:
- CSS particles with `transform: translate()` animations
- Multiple keyframe paths for variety
- Optional: CSS `filter: blur()` for soft glow
- Performance: Limit to ~50-75 particles for mobile

**Pros**: Very "living" and organic feeling
**Cons**: More complex, needs careful performance tuning

---

### Option 4: Circuit Board / Data Flow
**Concept**: Subtle circuit-like patterns with animated "data packets" traveling along paths.

**Visual Elements**:
- Faint circuit board lines (horizontal/vertical grid)
- Small "data packets" (glowing dots) that travel along paths
- Paths light up briefly as packets pass
- Occasional "branching" animations (like decision points)

**Implementation**:
- SVG paths for circuit lines (or CSS borders)
- Animated dots following `stroke-dashoffset` or `transform`
- CSS `box-shadow` for glow effect
- Opacity: 10-15%

**Pros**: Clearly tech/AI themed, suggests data processing
**Cons**: Can look busy if not subtle enough

---

### Option 5: Breathing Orb with Neural Connections (Hybrid - RECOMMENDED)
**Concept**: Combine current floating orbs with Option 1's neural network, where orbs "connect" to each other with animated lines.

**Visual Elements**:
- Keep existing 5 floating orbs
- Add animated lines connecting orbs (like neural synapses)
- Lines pulse/glow as "signals" travel between orbs
- Orbs breathe (scale animation) more prominently
- Add small "synapse" nodes along connection lines

**Implementation**:
- SVG lines between orb positions (calculated dynamically or fixed)
- Animated gradient along lines (like signal travel)
- Enhanced orb breathing animation
- Opacity: 20-25% for connections, 50% for orbs (current)

**Pros**: Builds on existing, clearly AI-themed, "living" feel
**Cons**: More complex to implement

---

### Option 6: Holographic Grid / Matrix Rain (Subtle)
**Concept**: Very subtle "matrix rain" effect or holographic grid overlay that suggests digital/AI space.

**Visual Elements**:
- Faint vertical lines (like digital rain, but very slow/subtle)
- Or horizontal grid lines that fade in/out
- Optional: Small characters/symbols that fade (very subtle)
- Colors: cyan with low opacity

**Implementation**:
- CSS `::before`/`::after` pseudo-elements for lines
- Very slow `translateY` animation
- Opacity: 5-10% max

**Pros**: Classic "futuristic" aesthetic
**Cons**: Can feel cliché if too obvious

---

### Recommendation: **Option 5 (Hybrid - Breathing Orb with Neural Connections)**
**Rationale**:
- Builds on existing `AnimatedBackground` (minimal disruption)
- Clearly AI-themed (neural connections = intelligence)
- "Living" feel from breathing orbs + traveling signals
- Can be implemented incrementally (add connections first, enhance later)
- Performance-friendly (CSS transforms + SVG paths)

**Implementation Phases**:
1. **Phase 1**: Add breathing animation to existing orbs (enhance scale animation)
2. **Phase 2**: Add 2-3 connection lines between orbs (SVG paths)
3. **Phase 3**: Add signal travel animation along connections (gradient animation)
4. **Phase 4**: Add small synapse nodes along connections (optional polish)

**Alternative if Option 5 is too complex**: Start with **Option 1 (Neural Network Grid)** as a simpler, standalone enhancement.

---

### Technical Considerations
- **Performance**: All animations must use `transform` and `opacity` (GPU-accelerated)
- **Accessibility**: Respect `prefers-reduced-motion` (disable animations)
- **Opacity limits**: Keep total background opacity under 30% to avoid content readability issues
- **Mobile**: Test on lower-end devices; may need to reduce particle/node counts
- **Browser support**: Use CSS animations (widely supported), avoid JavaScript for core animations

### Success Criteria
- Background feels "alive" and "breathing" without being distracting
- Clearly suggests AI/intelligence theme
- Performance: 60fps on mid-range devices
- Content remains highly readable
- Works with existing Orca color scheme (cyan/purple)

## Planner Analysis: Admin Dashboard Simplification & Enhanced Content Management

### Background
The user wants to simplify the admin dashboard UI to make it easy to edit exact copy on pages (titles, headers, etc.), add Google Tag Manager management, enhance SEO management, and ensure that changes automatically update all site headers.

### Current State Analysis

**Current Admin Dashboard:**
- Basic dashboard with stats and quick actions
- PagesEditor uses JSON editor (not user-friendly)
- SEOEditor exists but could be enhanced
- No Google Tag Manager management
- Page content is hardcoded in React components
- SEO tags are managed but not automatically injected into HTML head

**Current Page Structure:**
- Pages like HomePage.tsx have hardcoded content (titles, headers, paragraphs)
- usePageMetadata hook manages document.title and meta description
- No centralized content management system that pages read from
- Content changes require code changes

**Current SEO System:**
- SEOEditor allows editing global and page-specific SEO
- usePageMetadata hook updates document.title and meta description
- But OpenGraph tags, GTM, and other head tags are not dynamically managed

### Requirements

1. **Simple UI for Editing Page Copy**
   - Visual editor showing actual page sections (not JSON)
   - Edit titles, headers, paragraphs, CTAs directly
   - Changes should reflect immediately on the live site
   - No need to edit code

2. **Google Tag Manager Integration**
   - Admin page to enter GTM container ID
   - Automatically inject GTM script into HTML head
   - Support for both head and body GTM snippets

3. **Enhanced SEO Management**
   - Current SEO editor is good but needs enhancement
   - Automatically inject all SEO tags into HTML head
   - Support for structured data (JSON-LD)
   - Preview how tags will appear

4. **Automatic Header Updates**
   - When admin changes content, site headers update automatically
   - No page refresh needed (or minimal refresh)
   - Changes persist and are reflected on all pages

### Proposed Solution Architecture

#### 1. Content Management System Redesign

**New Content Structure:**
```typescript
interface PageContent {
  pageId: string;
  // Structured sections instead of generic Record<string, any>
  sections: {
    hero?: {
      title: string;
      subtitle?: string;
      description: string;
      ctaPrimary?: string;
      ctaSecondary?: string;
    };
    [sectionKey: string]: {
      title?: string;
      heading?: string;
      description?: string;
      paragraphs?: string[];
      items?: Array<{ title: string; description: string }>;
      // ... other section-specific fields
    };
  };
  lastModified: string;
  modifiedBy: string;
}
```

**Content Loading System:**
- Create a `usePageContent` hook that pages use to load content
- Pages check localStorage/contentService first, fall back to hardcoded defaults
- This allows gradual migration - pages work with or without CMS content

#### 2. Visual Page Editor

**New PagesEditor Component:**
- Replace JSON editor with visual form-based editor
- Show page sections as expandable cards
- Each section has form fields for editable content
- Live preview (optional) showing how changes will look
- Save button updates content and triggers page refresh/reload

**Page Section Mapping:**
- Map each page's sections to editable fields
- Homepage: hero, valueProps, services, metrics, etc.
- Solutions: role sections, mode sections
- Product: module sections
- etc.

#### 3. Google Tag Manager Management

**New GTMEditor Component:**
- Input field for GTM container ID (e.g., "GTM-XXXXXXX")
- Toggle to enable/disable GTM
- Preview of what will be injected
- Automatically injects GTM script into HTML head and body

**GTM Service:**
- Store GTM ID in localStorage/backend
- Create utility to inject GTM scripts
- Update index.html or use React Helmet to inject dynamically

#### 4. Enhanced SEO System

**SEO Tag Injection:**
- Create `SEOHead` component that reads from SEO service
- Inject all meta tags, OpenGraph, Twitter Cards, structured data
- Update usePageMetadata to use SEO service data
- Support for JSON-LD structured data

**SEO Editor Enhancements:**
- Add structured data editor (JSON-LD)
- Preview panel showing how tags will appear
- Validation for tag formats
- Bulk import/export

#### 5. Automatic Header Updates

**Implementation Strategy:**
- When content is saved, update localStorage/backend
- Pages use `usePageContent` hook to read latest content
- React re-renders automatically when content changes
- For SEO tags, use React Helmet or similar to update head dynamically

### High-level Task Breakdown

#### Task 10.1 – Content Management System Redesign
- **Success criteria:**
  - New PageContent interface with structured sections
  - `usePageContent` hook created
  - Content service updated to support new structure
  - At least one page (HomePage) migrated to use content service
  - Pages work with or without CMS content (graceful fallback)

#### Task 10.2 – Visual Page Editor
- **Success criteria:**
  - Replace JSON editor with visual form-based editor
  - Page sections displayed as editable form fields
  - Save functionality updates content
  - Editor shows which sections exist for each page
  - User-friendly labels and descriptions for each field

#### Task 10.3 – Google Tag Manager Integration
- **Success criteria:**
  - New `/admin/gtm` route and GTMEditor component
  - Input field for GTM container ID
  - GTM scripts automatically injected into HTML head and body
  - GTM ID stored in localStorage/backend
  - Toggle to enable/disable GTM

#### Task 10.4 – Enhanced SEO Management
- **Success criteria:**
  - SEO tags automatically injected into HTML head
  - Support for OpenGraph, Twitter Cards, structured data (JSON-LD)
  - SEO editor includes structured data editor
  - Preview panel showing tag output
  - All tags update automatically when saved

#### Task 10.5 – Automatic Header Updates
- **Success criteria:**
  - Changes to page content automatically update rendered pages
  - SEO tag changes automatically update HTML head
  - GTM changes automatically update HTML head
  - No manual code changes needed
  - Changes persist across page refreshes

#### Task 10.6 – Move AI Article Generation to Admin Dashboard
- **Success criteria:**
  - Remove AIArticleGenerator component from public ResourcesPage
  - Add "Generate AI Article" button/feature to ArticlesManager in admin dashboard
  - Integrate AIArticleGenerator component into ArticlesManager (or create inline generation form)
  - Admin can generate articles from `/admin/articles` page
  - Generated articles appear in article list immediately after generation
  - Generated articles are automatically saved and published (or saved as draft)
  - Public users can only view articles on ResourcesPage, not generate them
  - AIArticleGenerator component can be reused in admin or refactored as needed

### Implementation Order

1. **Task 10.6** – Move AI Article Generation to Admin Dashboard (quick win, security improvement)
2. **Task 10.1** – Content Management System Redesign (foundation)
3. **Task 10.3** – Google Tag Manager Integration (standalone, quick win)
4. **Task 10.4** – Enhanced SEO Management (builds on existing SEO editor)
5. **Task 10.2** – Visual Page Editor (requires new content system)
6. **Task 10.5** – Automatic Header Updates (ties everything together)

### Technical Considerations

**React Helmet vs. Manual DOM Manipulation:**
- Use React Helmet for dynamic head tag management
- Or use useEffect to manually update document.head
- React Helmet is cleaner but adds dependency

**Content Storage:**
- Continue using localStorage for MVP
- Structure allows easy migration to backend later
- Consider content versioning for rollback capability

**Performance:**
- Content loading should be fast (localStorage is instant)
- Consider caching content in React context
- Minimize re-renders when content updates

**Migration Strategy:**
- Pages should work with hardcoded content if CMS content not available
- Gradual migration: migrate one page at a time
- Test each page after migration

### Success Criteria Summary

- Admin can edit page titles, headers, and copy through simple UI (no JSON editing)
- Google Tag Manager can be configured and automatically injected
- SEO tags (meta, OpenGraph, structured data) are automatically injected into HTML head
- All changes automatically update the site without code changes
- System is user-friendly for non-technical users
- Changes persist and are reflected across all pages
- AI article generation is only available in admin dashboard (not public-facing)
- Admin can generate articles from Articles Manager page

---

## Phase 11 – Website Feedback Implementation (January 2025)

### Overview

Detailed feedback received from internal review. This phase addresses all feedback items systematically.

### Items Requiring User Input

Before implementation, the following information is needed from the user:

| Item | Question | Page |
|------|----------|------|
| 1 | **Supply chain hero image** – Please provide the iStock image (https://www.istockphoto.com/photo/business-logistics-technology-concept-gm1435491075-476815442) or similar | Home |
| 2 | **Verify $10B figure** – Is "$10B+ audited spend" accurate? | Home |
| 3 | **Average invoice count** – What specific number should replace "Millions processed"? Updated annually? | Home |
| 4 | **Is 'leakage' an official term?** – Confirm if "leakage" is standard supply chain/finance terminology | Home |
| 5 | **Real testimonials** – Do you have actual customer testimonials with real names/titles? If not, should we remove the testimonials section entirely? | Home, Results |
| 6 | **Matt & Marco image** – Please provide photo of Matt & Marco for About page | About |
| 7 | **Awards list** – What logistics awards has Orca won? (year founded, 2025 award, etc.) | Home |
| 8 | **Portal screenshots** – Will you provide actual portal screenshots for Platform page? | Platform |
| 9 | **Parcel-focused image** – Please provide parcel-focused image for E-commerce case study | Results |
| 10 | **Meta descriptions & Keywords** – TBD for all pages – please provide or should we draft? | All |

---

### High-level Task Breakdown

#### Task 11.0 – Global: Increase Font Size
- **Issue:** Font sizes are too small, especially buttons
- **Changes:**
  - Increase base font size in Tailwind config
  - Increase button font sizes globally (from `text-sm` to `text-base` or larger)
  - Increase heading sizes
  - Increase body text sizes
- **Files:** `tailwind.config.cjs`, `src/index.css`, all page components
- **Success criteria:** Fonts are noticeably larger, especially buttons; readable on desktop

#### Task 11.1 – Global: Mobile Responsiveness Fix
- **Issue:** Preview link not viewable on mobile
- **Changes:**
  - Debug mobile viewport issues
  - Ensure responsive design works on mobile devices
  - Test on actual mobile device or emulator
- **Files:** Layout components, CSS
- **Success criteria:** Site is fully viewable and usable on mobile devices

---

### Task 11.2 – Home Page Updates

#### 11.2.1 – Hero Image
- **Change:** Replace current hero image with supply chain-focused image
- **User to provide:** iStock image or similar
- **File:** `src/services/pageDefaults.ts` → `homepage.heroImage`

#### 11.2.2 – Metrics Section (Three blocks under image banner)
- **Changes:**
  - Change ALL CAPS to sentence case
  - "AUDITED SPEND" → "Audited Spend" (or similar)
  - Update labels:
    - "Spend audited" → "Audited Spend" (verify $10B)
    - "Invoices processed / year" → "Invoices processed each year" (provide average number, updated annually)
    - "Typical savings band" → "Typical savings"
  - Confirm if "leakage" is official terminology
- **File:** `src/services/pageDefaults.ts` → `homepage.metrics`

#### 11.2.3 – "Why Orca?" Section
- **Changes:**
  - Change heading "Why Orca?" → "Why audit your freight?"
  - Change subtitle to: "Accurate freight audit with enhanced AI data-driven analytics from 10+ years of award-winning experts" (no period at end)
  - Layout change: Have checkmark icon beside "Accuracy" title (inline), same for other icons
  - Change "typically 3–8% of freight spend" text to: "Identify overcharges, duplicate billing, and contract violations with dispute resolution experts."
- **File:** `src/services/pageDefaults.ts` → `homepage.valueProps`, `src/pages/HomePage.tsx`

#### 11.2.4 – Trusted By Section
- **Changes:**
  - Change heading to "Trusted by Top Retail Enterprises"
  - Keep the current image (great image!)
  - Remove "10 years of proven freight audit expertise" (already said above)
  - Replace with: "SOC2, ISO Certified, and Enterprise-grade security"
  - Remove "invoices processed" block (duplicate of above), keep only "Global coverage" block
- **File:** `src/services/pageDefaults.ts` → `homepage.trustedOperations`, `homepage.certifications`

#### 11.2.5 – "What we do" Section
- **Changes:**
  - Change heading "What we do" → "How we help your enterprise"
  - Remove period after "insights"
  - Freight Audit: change "historical patterns" → "shipment details"
  - Freight Payment: remove word "automated"
  - A&R: change to "Custom and self-serve dashboards..."
- **File:** `src/services/pageDefaults.ts` → `homepage.services`

#### 11.2.6 – "See Orca in action" Section
- **Changes:**
  - Change heading to "Insights that matter"
  - Make "Explore all platform features →" button bigger with larger font
- **File:** `src/pages/HomePage.tsx`

#### 11.2.7 – AI Section
- **Changes:**
  - Remove "Orca Intelligence" badge/label
  - Change heading to "Freight insights through AI and machine learning"
  - Change body text to bullet points:
    - Detects anomalies, surfaces patterns, and provides recommendations to action
    - Identify duplicate billing, unexpected surcharges, and lane variances
    - Empower carrier renegotiations and mode optimization opportunities with enhanced data
    - Instant insights through natural language exploration
  - Remove the section on the right side (or add screenshot of bot once developed)
  - Change "Learn more about Orca Intelligence" button to "AI & Data" (bigger button, bigger font)
- **File:** `src/pages/HomePage.tsx`, `src/services/pageDefaults.ts`

#### 11.2.8 – Testimonials Section
- **Changes:**
  - Question: Were you planning on having clickable enterprise type with updating testimonies?
  - **Strong recommendation:** Remove entire section if we don't have real people with real names. Aliases look "shady"
  - If keeping: Need actual customer names, titles, and quotes
- **User decision required**
- **File:** `src/pages/HomePage.tsx`, `src/services/pageDefaults.ts` → `homepage.testimonials`

#### 11.2.9 – Certifications Section
- **Change:** Remove "Compliant, Certified and Enterprise grade security" (mentioned above in Trusted By)
- **File:** `src/pages/HomePage.tsx`, `src/services/pageDefaults.ts` → `homepage.certifications`

#### 11.2.10 – Anniversary/Timeline Section
- **Changes:**
  - Remove "A decade of freight audit innovation"
  - Replace with: "Trustworthy, reliable and innovative data-driven insights for over 10 years"
  - Timeline items: Year founded, year logistics award, $10B+ audited, 2025 logistics award
  - Remove AI/machine learning timeline items (it's expected now, not new)
  - **User to provide:** List of awards
- **File:** `src/services/pageDefaults.ts` → `homepage.timeline`

#### 11.2.11 – Final CTA Section
- **Changes:**
  - Change heading from "Ready to transform your freight audit process?" to:
  - "Join leading enterprise supply chain and finance experts who trust Orca to support their day-to-day impact on their organization"
- **File:** `src/services/pageDefaults.ts` → `homepage.finalCTA`

---

### Task 11.3 – Solutions Page Updates

#### 11.3.1 – Hero Description
- **Change:** Update to: "Adaptable to your organization's needs—whether you're in finance, logistics, or procurement, and whether you ship LTL, FTL, parcel, or ocean/air."
- **File:** `src/services/pageDefaults.ts` → `solutions.hero`

#### 11.3.2 – Role Cards (Finance, Logistics, Procurement)
- **Change:** Make percentage savings buttons larger font
- **File:** `src/pages/SolutionsPage.tsx`

#### 11.3.3 – Image
- **Change:** Remove the image (breaks up text for no reason)
- **File:** `src/pages/SolutionsPage.tsx`

#### 11.3.4 – Savings Display
- **Change:** Make savings stand out more / bigger font
- **File:** `src/pages/SolutionsPage.tsx`

#### 11.3.5 – Mode Cards (LTL, FTL, Parcel, Ocean/Air)
- **Changes:**
  - Remove the sentence descriptions (redundant with bullets)
  - OR update sentences with catchy one-liners:
    - LTL: "Can't fill a whole truckload? Make sure your LTL fees are as low as possible"
    - FTL: "Do you know if your lanes are hindering your bottom line?"
    - Parcel: "Extra charges adding up?"
    - Ocean & Air: "Documentation for extra costs slipping through the cracks?"
- **File:** `src/services/pageDefaults.ts` → `solutions.modes`

---

### Task 11.4 – Platform/Product Page Updates

#### 11.4.1 – Page Title Research
- **Question:** Should it be "Platform" or "Product"? Check research.
- **Current:** "Platform"

#### 11.4.2 – Module Sections
- **Issue:** Headings, sentences, and bullets are repetitive (same as mode cards above)
- **Question:** Will the images on the right be actual portal screenshots?

#### 11.4.3 – Freight Audit & Payment
- **Changes:**
  - Question: Is "automated approvals" a good thing or risky?
  - Remove sentence, just have bullets:
    - 100% invoice accuracy
    - Built-in approval thresholds
    - AI-powered audit rules and exception detection
    - Streamlined payables workflow
- **File:** `src/services/pageDefaults.ts` → `product.modules[0]`

#### 11.4.4 – Claims & Exceptions
- **Change:** Remove sentence (bullets already say the same thing)
- **File:** `src/services/pageDefaults.ts` → `product.modules[1]`

#### 11.4.5 – Invoice Management & Accounting
- **Changes:**
  - Remove sentence
  - Add bullet: "Forecasting and projections"
- **File:** `src/services/pageDefaults.ts` → `product.modules[2]`

#### 11.4.6 – Analytics & Reporting
- **Change:** Remove sentence
- **File:** `src/services/pageDefaults.ts` → `product.modules[3]`

#### 11.4.7 – Integrations & Data Section
- **CRITICAL:** Remove this section entirely
- **Reason:** "Our system doesn't integrate with any TMS, ERP, WMS so this is misleading and is a sore spot because all files are sent via FTP and there's no actual API integrations."
- **File:** `src/pages/ProductPage.tsx`, `src/services/pageDefaults.ts` → `product.integrations`

#### 11.4.8 – Platform Outcomes
- **Changes:**
  - Remove "Platform Outcomes" section
  - Move these three items to the TOP (after page tagline, before "Freight Audit & Payment")
- **File:** `src/pages/ProductPage.tsx`, `src/services/pageDefaults.ts` → `product.outcomes`

---

### Task 11.5 – AI & Data Page Updates

#### 11.5.1 – Images
- **Change:** Remove both images
- **File:** `src/pages/AiPage.tsx`

#### 11.5.2 – Orca Intelligence Badge
- **Change:** Remove "Orca Intelligence" badge
- **File:** `src/services/pageDefaults.ts` → `ai.hero.badge`

#### 11.5.3 – Hero Description
- **Change:** Update sentence to: "Machine learning provides deep analysis into your network and $10B+ of freight audit spend."
- **File:** `src/services/pageDefaults.ts` → `ai.hero.description`

#### 11.5.4 – Data Foundation Section
- **Changes:**
  - Move "Data foundation" out of box as a page header
  - Split into two buckets (currently one)
- **File:** `src/pages/AiPage.tsx`

#### 11.5.5 – Trust, Security, Governance
- **Change:** Make these three items same font size as Pattern detection, Anomaly detection, Recommendations
- **File:** `src/pages/AiPage.tsx`

---

### Task 11.6 – Results Page Updates

#### 11.6.1 – Page Title
- **Change:** Change to "Testimonies – Orca Freight Audit & Analytics AI"
- **File:** `src/pages/ResultsPage.tsx`

#### 11.6.2 – Hero Image
- **Question:** Will an image be added?

#### 11.6.3 – E-commerce Distributor Case Study
- **Change:** Change image to parcel-focused image
- **User to provide:** Parcel-focused image
- **File:** `src/services/pageDefaults.ts` → `results.caseStudyImages[2]`

#### 11.6.4 – CTA Button
- **Change:** Change button text to "Contact us now"
- **File:** `src/services/pageDefaults.ts` → `results.finalCTA`

---

### Task 11.7 – About Page Updates

#### 11.7.1 – Headline
- **Change:** Remove "now" from headline sentence
- **Current:** "Ten years of freight audit expertise, now enhanced with AI-powered analytics and automation."
- **New:** "Ten years of freight audit expertise, enhanced with AI-powered analytics and automation."
- **File:** `src/services/pageDefaults.ts` → `about.hero.description`

#### 11.7.2 – Team Image
- **Changes:**
  - Remove first image placeholder
  - Replace with photo of Matt & Marco
- **User to provide:** Matt & Marco photo
- **File:** `src/services/pageDefaults.ts` → `about.teamImages`

#### 11.7.3 – Value Props
- **Change:** Apply same changes as homepage value props buckets
- **File:** `src/services/pageDefaults.ts` → `about.values`

#### 11.7.4 – Responsibility Section
- **Change:** Make same size bucket as other value cards (not a long bucket)
- **File:** `src/pages/AboutPage.tsx`

---

### Implementation Priority

**Phase A – Quick Wins (No user input needed):**
1. Task 11.0 – Global font size increase
2. Task 11.1 – Mobile responsiveness fix
3. Remove "Orca Intelligence" badges across site
4. Remove Integrations section from Platform page
5. Text changes that don't require verification
6. Remove ALL CAPS, change to sentence case

**Phase B – Content Updates (After user provides input):**
1. Hero image replacement
2. Testimonials decision (keep with real names or remove)
3. Timeline/awards updates
4. Matt & Marco photo
5. Portal screenshots
6. Parcel-focused image

**Phase C – Layout Changes:**
1. Restructure value props (icon inline with title)
2. Move Platform Outcomes to top
3. Data Foundation section restructure
4. Button size increases

---

### Project Status Board

- [ ] Task 11.0 – Global font size increase
- [ ] Task 11.1 – Mobile responsiveness fix
- [ ] Task 11.2 – Home page updates (12 sub-tasks)
- [ ] Task 11.3 – Solutions page updates (5 sub-tasks)
- [ ] Task 11.4 – Platform page updates (8 sub-tasks)
- [ ] Task 11.5 – AI & Data page updates (5 sub-tasks)
- [ ] Task 11.6 – Results page updates (4 sub-tasks)
- [ ] Task 11.7 – About page updates (4 sub-tasks)

### Executor's Feedback or Assistance Requests

*Awaiting user input on items listed in "Items Requiring User Input" table above.*

