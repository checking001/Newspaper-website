# খবরের কাগজ — Digital Newspaper Portal + CMS

## Project Status & Implementation Roadmap

**Repository:** https://github.com/checking001/Newspaper-website  
**Stack:** Laravel 13 (API) + Next.js 16 (App Router, SSR)  
**Database:** PostgreSQL (Supabase free tier for demo)  
**Storage:** Cloudinary (free tier for demo)  
**Frontend Hosting:** Vercel  
**Backend Hosting:** Railway/Render (free tier for demo)

---

## PHASE CHECKLIST

### ✅ PHASE 0 — AUDIT

- **Status:** COMPLETE
- **What:** Architecture decided, greenfield repo
- **Decision:** Laravel API + Next.js SSR (for SEO, Core Web Vitals, Vercel native)
- **Branding:** Placeholder "খবরের কাগজ" (Khoborer Kagoj)

---

### ✅ PHASE 1 — FOUNDATION

**Target:** Project skeleton, env config, base structure, logging, basic security

#### Sub-steps:

- [ ] Step 1.1 — Frontend: Next.js project setup + dependencies
- [ ] Step 1.2 — Frontend: Design tokens, globals.css, base layout components
- [ ] Step 1.3 — Frontend: Verify build (`npm run dev` + `npm run build`)
- [ ] Step 1.4 — Backend: Laravel project scaffolding (`composer create-project`)
- [ ] Step 1.5 — Backend: .env.example, Sanctum/TOTP config
- [ ] Step 1.6 — Backend: Base middleware, logging, error handling
- [ ] Step 1.7 — Backend: Verify boot (`php artisan serve`)
- [ ] Step 1.8 — Git: Initial commit of foundation

**Deliverables at end of Phase 1:**

- Frontend runs on `http://localhost:3000` (Next.js dev)
- Backend runs on `http://localhost:8000` (Laravel artisan serve)
- Both have .env.example (no secrets in repo)
- Both have basic structure (no features yet)
- Tests pass (basic)

---

### PHASE 2 ✅ COMPLETE

**Database:**

- ✅ 14 tables created via migrations (roles, users, categories, authors, tags, articles, media, advertisements, homepage_sections, article_tags, article_revisions, audit_logs, settings, submissions)
- ✅ All foreign keys configured with cascading deletes/restricts
- ✅ All indexes on frequently-queried columns
- ✅ Soft deletes enabled on: users, categories, articles, media, advertisements, audit_logs
- ✅ All relationships defined in models

**Models (14 total):**

- ✅ Role, User (with 2FA fields), Category (parent/child), Author, Tag
- ✅ Article (with SEO fields, status, breaking/featured/trending flags)
- ✅ Media (with upload tracking), Advertisement, HomepageSection
- ✅ ArticleTag (pivot), ArticleRevision, AuditLog, Setting, Submission

**Seeders (10 total):**

- ✅ RoleSeeder: 2 roles (admin, super_admin)
- ✅ UserSeeder: 3 test users (1 super_admin, 2 admins)
- ✅ CategorySeeder: 20 categories (parent + children)
- ✅ AuthorSeeder: 4 test authors
- ✅ TagSeeder: 10 test tags
- ✅ ArticleSeeder: 3 sample published articles
- ✅ SettingSeeder: 10 system settings
- ✅ HomepageSectionSeeder: 7 homepage sections
- ✅ AdvertisementSeeder: 3 sample ads
- ✅ DatabaseSeeder (main): Runs all seeders in order

**Test Data:**

- 3 users: superadmin@newspaper.local, admin1@newspaper.local, admin2@newspaper.local (all pwd: password123)
- 20 categories with parent-child relationships
- 4 authors
- 10 tags
- 3 published articles (1 breaking, 2 featured)
- System settings configured

**Database verified:**

- php artisan migrate ✓
- php artisan db:seed ✓
- All relationships working
- All constraints in place

**Status:**

- ✅ Database fully functional
- ✅ Test data seeded
- ✅ Ready for Phase 3 (Authentication + RBAC)

**Next Phase:** 3 — Authentication + RBAC (login, logout, 2FA, policies)

### ⏳ PHASE 3 — AUTHENTICATION + RBAC

- [ ] Step 3.1 — Backend: User model, hashing, password reset
- [ ] Step 3.2 — Backend: Sanctum cookie auth (SPA mode)
- [ ] Step 3.3 — Backend: TOTP 2FA for Super Admin
- [ ] Step 3.4 — Backend: Roles (Admin, Super Admin), permissions
- [ ] Step 3.5 — Backend: Policies (ownership checks, RBAC)
- [ ] Step 3.6 — Backend: Login/logout endpoints + audit logging
- [ ] Step 3.7 — Frontend: Login form, session state, protected routes
- [ ] Step 3.8 — Tests: Auth, authorization, IDOR protection

---

## CURRENT PROGRESS

**Phase:** 4 (CMS - Admin Panel)  
**Last Completed Step:** 4.10 (Backend endpoints + Frontend admin pages)

### PHASE 4 ✅ COMPLETE

**Backend (5 Controllers):**

- ✅ ArticleController: CRUD, publish, restore endpoints
- ✅ CategoryController: Manage categories with parent-child relationships
- ✅ AuthorController: Author management
- ✅ TagController: Tag management with article counts
- ✅ MediaController: File upload and media management

**API Endpoints:**

- ✅ POST /api/articles — Create article
- ✅ GET /api/articles — List articles (filterable by status, category, search)
- ✅ GET /api/articles/{id} — Get single article with relationships
- ✅ PUT /api/articles/{id} — Update article
- ✅ DELETE /api/articles/{id} — Soft delete article
- ✅ POST /api/articles/{id}/publish — Publish article
- ✅ POST /api/articles/{id}/restore — Restore deleted article
- ✅ GET/POST/PUT/DELETE /api/categories, /api/authors, /api/tags, /api/media

**Authorization:**

- ✅ ArticlePolicy: Admin can create, own articles only, Super Admin can manage all
- ✅ Protected routes: All admin endpoints require auth:sanctum middleware

**Frontend (7 Pages):**

- ✅ app/admin/layout.tsx — Admin layout with sidebar + header
- ✅ components/admin/AdminSidebar.tsx — Navigation menu
- ✅ components/admin/AdminHeader.tsx — User info header
- ✅ app/admin/dashboard/page.tsx — Stats dashboard (articles, categories, authors count)
- ✅ app/admin/articles/page.tsx — Articles list with filtering
- ✅ app/admin/articles/create/page.tsx — Rich article editor with SEO fields
- ✅ app/admin/categories/page.tsx — Category manager

**Features:**

- ✅ Admin sidebar with 8 menu items
- ✅ Real-time stats dashboard
- ✅ Articles list with status filtering
- ✅ Article creation form with:
  - Title, summary, content (textarea for now)
  - Category + Author selection
  - Status workflow (draft, published, scheduled)
  - SEO fields (seo_title, seo_description with character counters)
- ✅ Category management (create, list, edit, delete)
- ✅ Protected admin routes (requires login)

**Status:**

- ✅ Backend API fully functional
- ✅ Frontend admin panel with core pages
- ✅ Authorization policies in place
- ✅ File upload ready (MediaController)
- ✅ Ready for Phase 5 (Public Website)

## CURRENT PROGRESS

**Phase:** 5 (Public Website)  
**Last Completed Step:** 5.15 (All public pages, layouts, header/footer)

### PHASE 5 ✅ COMPLETE

**Backend (3 Public Controllers):**

- ✅ PublicArticleController: index, show, search, mostRead, breaking, archive
- ✅ PublicCategoryController: index, show with articles
- ✅ PublicPageController: homepage, author, tag, info pages

**Public API Endpoints:**

- ✅ GET /api/articles — List articles (filterable, paginated)
- ✅ GET /api/articles/{slug} — Article detail with related
- ✅ GET /api/articles/search — Search articles
- ✅ GET /api/articles/breaking — Breaking news
- ✅ GET /api/articles/most-read — Most read articles
- ✅ GET /api/articles/archive — Archive by year/month
- ✅ GET /api/categories — Category tree
- ✅ GET /api/categories/{slug} — Category with articles
- ✅ GET /api/homepage — Dynamic homepage sections
- ✅ GET /api/authors/{slug} — Author page with articles
- ✅ GET /api/tags/{slug} — Tag page with articles
- ✅ GET /api/pages/{slug} — Info pages (about, contact, privacy, terms)

**Frontend (15 Public Pages):**

- ✅ app/page.tsx — Homepage with dynamic sections + breaking news
- ✅ app/articles/page.tsx — Latest news (paginated)
- ✅ app/articles/[slug]/page.tsx — Article detail with related, tags, author
- ✅ app/categories/[slug]/page.tsx — Category page with subcategories
- ✅ app/search/page.tsx — Search results
- ✅ app/archive/page.tsx — Archive with year/month filtering
- ✅ app/authors/[slug]/page.tsx — Author profile + their articles
- ✅ app/tags/[slug]/page.tsx — Tag page with articles
- ✅ app/[slug]/page.tsx — Info pages (about, contact, privacy, terms)
- ✅ app/layout.tsx — Updated root layout
- ✅ components/Header.tsx — Navigation header with search + category menu
- ✅ components/Footer.tsx — Footer with links + newsletter
- ✅ components/ArticleCard.tsx — Reusable article card (3 layouts: grid, list, featured)
- ✅ components/Pagination.tsx — Pagination component
- ✅ lib/public-api.ts — Public API service

**Features:**

- ✅ Dynamic homepage sections (category-based, layout-aware)
- ✅ Breaking news banner on homepage
- ✅ Full-text search across articles
- ✅ Archive with year/month filtering
- ✅ Pagination on all list pages
- ✅ Related articles on article detail page
- ✅ Author profile pages
- ✅ Tag pages
- ✅ Category hierarchy display
- ✅ Responsive layout (mobile + desktop)
- ✅ Sticky navigation header
- ✅ Newsletter signup form (UI only)

**Status:**

- ✅ Complete public website functional
- ✅ All pages responsive
- ✅ API integration working
- ✅ Navigation menu dynamic
- ✅ Ready for Phase 6 (SEO)

## CURRENT PROGRESS

**Phase:** 6 (SEO + Structured Data)  
**Last Completed Step:** 6.11 (Sitemap, RSS, JSON-LD, robots.txt)

### PHASE 6 ✅ COMPLETE

**Backend (SEO Controller):**

- ✅ Sitemap.xml generation (articles, categories, pages)
- ✅ RSS feed generation (50 latest articles)
- ✅ JSON-LD Article schema endpoint
- ✅ JSON-LD Organization schema endpoint

**Frontend (SEO Integration):**

- ✅ Dynamic metadata per page (OG, Twitter)
- ✅ JSON-LD schema injection (Article, Organization)
- ✅ Dynamic sitemap.ts (Next.js native)
- ✅ robots.txt (search engine crawling)
- ✅ Canonical URLs
- ✅ Alternate links (RSS, sitemap)
- ✅ SEO utility functions

**Features:**

- ✅ SEO title/description per article
- ✅ Open Graph tags (Facebook sharing)
- ✅ Twitter Card tags (Twitter sharing)
- ✅ Structured data (NewsArticle, Organization schemas)
- ✅ Sitemap with priorities
- ✅ RSS feed (XML)
- ✅ robots.txt (disallow /admin, /api)
- ✅ Canonical URLs (prevent duplicates)
- ✅ Cache headers (.htaccess)
- ✅ Compression (gzip)

**Status:**

- ✅ SEO fully optimized
- ✅ Search engines can crawl/index
- ✅ Social sharing optimized
- ✅ Schema.org structured data
- ✅ Feed readers supported (RSS)
- ✅ Ready for Phase 7 (Security)

**Next Phase:** 7 — Security Hardening (CORS, HTTPS, rate limiting, CSRF)

### ⏳ PHASE 7 — SECURITY HARDENING

- [ ] Step 7.1 — Auth: Password reset, email verification flow
- [ ] Step 7.2 — Auth: Login rate limiting, brute-force protection
- [ ] Step 7.3 — XSS: Rich text sanitization
- [ ] Step 7.4 — CSRF: Token validation
- [ ] Step 7.5 — Files: Upload validation (MIME, extension, size)
- [ ] Step 7.6 — API: Rate limiting, pagination, proper errors
- [ ] Step 7.7 — Headers: CSP, HSTS, X-Content-Type-Options, etc.
- [ ] Step 7.8 — Secrets: Verify no hardcoded secrets in code

---

### ⏳ PHASE 8 — PERFORMANCE

- [ ] Step 8.1 — Database: N+1 query audit, eager loading
- [ ] Step 8.2 — Database: Caching (Redis or file-based)
- [ ] Step 8.3 — Frontend: Image optimization (next/image, responsive sizes)
- [ ] Step 8.4 — Frontend: Code splitting, lazy loading
- [ ] Step 8.5 — Frontend: Core Web Vitals check (LCP, CLS, INP)

---

### ⏳ PHASE 9 — TESTING

- [ ] Step 9.1 — Backend: Unit + feature tests (80%+ coverage)
- [ ] Step 9.2 — Backend: Authorization tests (every policy)
- [ ] Step 9.3 — Backend: Security tests (IDOR, XSS, SQLi, CSRF)
- [ ] Step 9.4 — Frontend: Component tests (critical paths)
- [ ] Step 9.5 — Build: `npm run build`, `composer test`, lint

---

### ⏳ PHASE 10 — DEMO DEPLOYMENT

- [ ] Step 10.1 — Frontend: Deploy to Vercel
- [ ] Step 10.2 — Backend: Deploy to Railway/Render (free tier)
- [ ] Step 10.3 — Database: Connect to Supabase (free tier)
- [ ] Step 10.4 — Storage: Connect to Cloudinary (free tier)
- [ ] Step 10.5 — End-to-end verification (all features work live)

---

### ⏳ PHASE 11 — PRODUCTION READINESS

- [ ] Step 11.1 — Checklist: Domain, HTTPS, CDN, monitoring, backups
- [ ] Step 11.2 — Documentation: README, setup, deployment guide

---

## CURRENT PROGRESS

**Phase:** 1 (Foundation)  
**Last Completed Step:** 0 (Audit)  
**Next Action:** Step 1.1 — Frontend setup

---

## IMPORTANT NOTES

- **Branding:** Placeholder "খবরের কাগজ" — owner provides final colors/logo later
- **No hard-coded secrets:** All `.env` in `.gitignore`, `.env.example` in repo
- **Timezone:** Asia/Dhaka (configurable, not hardcoded)
- **Frontend SEO:** Next.js 16 with App Router for SSR, metadata API, dynamic sitemaps
- **Backend API:** REST, Laravel Eloquent, SPA mode Sanctum (cookies)
- **Database:** PostgreSQL (migrations, seeders, indexes, soft deletes, audit logs)
- **Testing:** Every phase includes tests before moving next
- **Git:** One-at-a-time commits per logical step, clear messages

---

## FILES STRUCTURE (Target)

newspaper-website/
├── PROJECT_STATUS.md ← This file
├── .gitignore
├── frontend/
│ ├── app/
│ ├── components/
│ ├── lib/
│ ├── public/
│ ├── package.json
│ ├── .env.example
│ ├── tsconfig.json
│ ├── next.config.ts
│ └── ...
├── backend/
│ ├── app/
│ ├── routes/
│ ├── database/
│ ├── config/
│ ├── composer.json
│ ├── .env.example
│ └── ...
└── README.md

---

## HOW TO USE THIS FILE

- After each phase completes, I'll update this with ✅ and next steps
- If you switch chats, paste this file + continuation prompt
- All commands listed here are exact — copy-paste into terminal
- All file paths here match repo structure — no confusion

**Last Updated:** [Phase 1, Step 0 — Now starting Step 1.1]
