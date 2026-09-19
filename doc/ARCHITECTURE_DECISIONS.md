# Architecture Decisions — খবরের কাগজ (Newspaper Portal)

**Decision Date:** Phase 0 — Audit Complete  
**Status:** APPROVED FOR IMPLEMENTATION

---

## STACK SELECTION

### Frontend: Next.js 16 (NOT Plain React SPA)

**Why Next.js instead of plain React?**

1. **SEO (Non-negotiable requirement)**

   - Server-Side Rendering (SSR) for NewsArticle schema
   - Dynamic metadata per article (OG, Twitter, canonical)
   - Sitemap generation at build time
   - RSS feed generation
   - Static site export where needed
   - Plain React SPA cannot do this — Google crawls JavaScript, but it's slower and incomplete

2. **Core Web Vitals (Project requirement)**

   - LCP (Largest Contentful Paint): Next.js Image component handles this automatically
   - CLS (Cumulative Layout Shift): Server-side hydration prevents layout thrashing
   - INP (Interaction to Next Paint): Server rendering reduces JS blocking
   - A plain React app would fail CWV targets without heavy optimization work

3. **Vercel Native Deployment**

   - Next.js is built by Vercel team
   - One `git push` = automatic deploy, zero config
   - Matches requirement: "deployable using free/low-cost infrastructure"
   - Next.js on Vercel free tier = 100GB bandwidth/month (sufficient for demo)

4. **Performance at Scale**
   - Automatic code splitting
   - Image optimization (WebP, AVIF, responsive)
   - Built-in caching strategies
   - Incremental Static Regeneration (ISR) for "latest news" without rebuilds
   - A plain React SPA + external server = manual optimization = delays

**Decision:** Next.js 16 with App Router (modern, not Pages Router)

---

### Backend: Laravel 13 API (REST, NOT GraphQL)

**Why Laravel?**

1. **Developer Productivity** — project brief says "comfortable with Laravel"
2. **Ecosystem** — Sanctum (auth), Eloquent (ORM), Migrations, Seeders, Policies, all first-class
3. **Security defaults** — password hashing, CSRF, SQL injection protection built-in
4. **Queue/Scheduler** — critical for scheduled publishing + audit logging + email + background jobs
5. **Testing** — built-in Pest/PHPUnit, factories, seeders make testing fast

**Why REST not GraphQL?**

- GraphQL adds complexity (setup, caching, authorization, N+1 queries require vigilance)
- REST is simpler for this phase, sufficient for Vercel + Next.js
- Easy to evolve to GraphQL later if needed (GraphQL layer on top of REST)
- No over-engineering

**Decision:** Laravel 13, REST API, Sanctum for SPA auth

---

### Database: PostgreSQL

**Why PostgreSQL?**

1. **Relational** — news, categories, tags, authors, media, users, permissions = highly relational
2. **Free tier** — Supabase (free tier PostgreSQL) = "free infrastructure"
3. **Production-grade** — can scale from free tier → managed Postgres (AWS RDS, DigitalOcean, Heroku) without data migration
4. **Features** — JSONB for metadata, full-text search, triggers for audit logs
5. **Affordable** — $15/month managed Postgres after free tier

**Decision:** PostgreSQL (Supabase free tier for demo, managed Postgres for production)

---

### Auth: Sanctum (SPA Mode) + TOTP 2FA

**Why Sanctum SPA mode?**

- SPA stateless auth = cookies (not tokens in localStorage, which is XSS-prone)
- Sanctum handles CSRF automatically
- Session-based (matches browser security model)
- No JWT complexity
- Super Admin required to use 2FA (TOTP with authenticator app)

**Why TOTP (Time-based OTP)?**

- Industry standard
- Works offline
- Recovery codes for backup
- No dependency on SMS (which can be SIM-swapped)

**Decision:** Sanctum SPA + HttpOnly cookies + TOTP for Super Admin

---

### Storage: Abstracted (Cloudinary for demo, S3 for production)

**Why abstraction?**

- Free tier = Cloudinary (image + video transformation, free CDN)
- Production = S3 or S3-compatible (Backblaze B2, Wasabi, DigitalOcean Spaces)
- **ZERO hardcoding of provider in Laravel**
- Use Laravel's Filesystem abstraction
- Switch via `.env` only

**Storage config per environment:**
.env.example

FILESYSTEM_DISK=cloudinary # or "s3" in production
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
S3_BUCKET=...

**Decision:** Laravel Filesystem abstraction, Cloudinary free for demo

---

### Deployment Architecture

┌─────────────────┐
│ Next.js App │
│ (Vercel) │
│ SSR, SEO, CWV │
└────────┬────────┘
│ HTTPS API calls
▼
┌─────────────────────────────┐
│ Laravel REST API │
│ (Railway/Render free tier) │
│ Sanctum + TOTP 2FA │
└────────┬────────────────────┘
│ SQL
▼
┌─────────────────┐
│ PostgreSQL │
│ (Supabase) │
└────────┬────────┘
│ Backup
└──────→ S3 Backups

     ▼ File uploads

┌──────────────────┐
│ Cloudinary │
│ (Images + CDN) │
└──────────────────┘

**Deployment steps (Phase 10):**

1. Frontend: `git push` → Vercel auto-deploys
2. Backend: Docker/manual to Railway/Render + environment variables
3. Database: Create Supabase instance, paste connection string in .env
4. Storage: Cloudinary account, add API keys to .env
5. End-to-end test

---

### Database Timezone: Asia/Dhaka (NOT hardcoded)

**Why?**

- Newspaper is Bangladesh-based
- All timestamps stored as UTC in DB
- All display formatted in Asia/Dhaka
- Config: `config/app.php` has `'timezone' => env('APP_TIMEZONE', 'Asia/Dhaka')`
- Can be overridden via .env

**Decision:** Default Asia/Dhaka, configurable via .env

---

### Branding: Placeholder "খবরের কাগজ"

**Why placeholder?**

- Owner hasn't provided final logo, colors, typography
- Every user-facing string (logo, site name) lives in ONE place (constant/config)
- When owner provides branding:
  - Change `config/app.php` constant
  - Change Tailwind config colors
  - Upload logo to storage
  - CSS variables updated
  - **NO code rewrites needed**

**Branding locations:**
backend/config/app.php:
'name' => env('APP_NAME', 'খবরের কাগজ'),

frontend/lib/constants.ts:
export const SITE_NAME = 'খবরের কাগজ';

frontend/tailwind.config.ts:
colors: {
brand: '#???', // To be decided
}

**Decision:** Placeholder now, one-line changes later

---

## DATABASE SCHEMA OVERVIEW (Phase 2 detailed)

**Core entities:**
users (id, name, email, password, role_id, is_active, ...)
roles (id, name: Admin, Super Admin)
permissions (id, name, guard_name)
role_permission (role_id, permission_id)

categories (id, name, slug, parent_id, is_active, display_order, ...)
articles (id, title, slug, content, category_id, author_id, status, published_at, is_breaking, is_featured, is_trending, ...)
article_tags (article_id, tag_id)
tags (id, name, slug)
authors (id, name, slug, bio, profile_image, designation, ...)

media (id, filename, original_filename, mime_type, size, disk, url, alt_text, caption, credit, uploaded_by, ...)
article_media (article_id, media_id, position)

advertisements (id, name, advertiser, image_url, destination_url, html_code, placement, start_date, end_date, status, priority, ...)
homepage_sections (id, title, category_id, article_count, is_enabled, display_order, layout_type, featured_article_id, ...)

article_revisions (id, article_id, content, changed_by, changed_at, revision_number, ...)
audit_logs (id, user_id, action, entity_type, entity_id, old_values, new_values, ip_address, user_agent, created_at, ...)

settings (id, key, value) — for system config
submissions (id, name, email, phone, title, description, location, photo, video, document, status, created_at)
redirects (id, from_slug, to_slug, permanent, created_at)

---

## SECURITY DECISIONS (Defense-in-Depth)

### 1. Authentication

- ✅ Argon2id password hashing (Laravel default)
- ✅ Sanctum SPA mode (HttpOnly, Secure, SameSite cookies)
- ✅ Login rate-limiting (5 attempts per 15 minutes)
- ✅ TOTP 2FA required for Super Admin
- ✅ Session invalidation on 2FA enable/disable
- ✅ Password reset link valid for 60 minutes only

### 2. Authorization (Server-side enforcement)

- ✅ Laravel Policies enforce ALL permission checks
- ✅ Admin cannot edit another Admin's article (IDOR protection)
- ✅ Admin cannot delete another Admin's content
- ✅ Admin cannot escalate to Super Admin
- ✅ Admin cannot view other Admins' private data
- ✅ Super Admin can do everything

### 3. XSS Protection

- ✅ HTML from rich-text editor sanitized (allowed tags only: p, h1-h3, strong, em, ul, li, a, blockquote, img, br, table)
- ✅ HTML from advertisements sanitized
- ✅ Output escaped by default in Blade/React
- ✅ CSP header prevents inline scripts

### 4. CSRF Protection

- ✅ Laravel CSRF middleware (all POST/PUT/DELETE requests)
- ✅ SPA mode: XSRF-TOKEN cookie automatically handled

### 5. SQL Injection

- ✅ Eloquent parameterized queries only
- ✅ No raw SQL
- ✅ Query builder for complex queries

### 6. File Upload Security

- ✅ MIME validation (not just extension)
- ✅ Extension whitelist: jpg, jpeg, png, webp, gif, pdf, mp4
- ✅ File size limits: images ≤10MB, videos ≤100MB, pdfs ≤20MB
- ✅ Filename sanitization (no path traversal, no spaces, UUID rename)
- ✅ Uploaded files NOT executable (served via storage disk, not from web root)
- ✅ Image dimensions checked (no decompression bombs)

### 7. API Security

- ✅ Authentication required on all admin API endpoints
- ✅ Authorization checked via policies
- ✅ Rate limiting (API: 60 requests/min per IP)
- ✅ Pagination enforced (max 100 items/request)
- ✅ No sensitive fields exposed (no password hashes, 2FA secrets, tokens)

### 8. Security Headers (Production)

Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Content-Security-Policy: [built per-route, no hardcoded]

### 9. Secrets Management

- ✅ `.env` in `.gitignore`
- ✅ `.env.example` in repo (no real secrets)
- ✅ All secrets loaded from .env at runtime
- ✅ Logging never includes passwords, tokens, API keys

### 10. Audit Logging

- ✅ Every Admin action logged: login, logout, news create/edit/delete, publish, unpublish, restore, user changes, settings changes, etc.
- ✅ Audit log includes: user, action, entity_type, entity_id, old_values, new_values, ip_address, user_agent, timestamp
- ✅ Super Admin can view audit log (cannot be deleted by normal Admin)
- ✅ Sensitive fields masked (no plain passwords in logs)

---

## PERFORMANCE DECISIONS (Phase 8 detailed)

### 1. Database Optimization

- ✅ Eager loading (no N+1 queries)
- ✅ Indexes on: articles(status, published_at), categories(slug), tags(slug), authors(slug), users(email), article_tags(article_id), audit_logs(user_id), etc.
- ✅ Pagination (20-50 items per page)
- ✅ Soft deletes (articles, users) with scope `whereNull('deleted_at')`

### 2. Caching Strategy

- ✅ Cache homepage sections (5 min TTL)
- ✅ Cache category pages (10 min TTL)
- ✅ Cache "most read" hourly (event-driven via queue)
- ✅ Cache navigation (on-demand invalidation)
- ✅ Cache invalidation on: article publish, category edit, settings change, etc.
- ✅ Cache driver: Redis (if available), fallback to file-based

### 3. Image Optimization

- ✅ Next.js Image component (automatic WebP/AVIF)
- ✅ Responsive sizes (srcset)
- ✅ Lazy loading by default
- ✅ Cloudinary transforms on the fly (resize, quality, format)
- ✅ No full-size images served to thumbnails

### 4. Frontend Bundle Optimization

- ✅ Code splitting (route-based, component-based)
- ✅ Tree-shaking (unused code removed)
- ✅ CSS purging (Tailwind removes unused styles)
- ✅ No unnecessary dependencies
- ✅ Fonts: system fonts or self-hosted (no Google Fonts waterfall requests)

### 5. Database Query Optimization

- ✅ Eager load relationships: `Article::with('category', 'author', 'tags')->get()`
- ✅ Avoid loops: `foreach($articles) { $article->category }` ❌ → use eager load ✅
- ✅ Pagination on large result sets
- ✅ Indexes on WHERE/JOIN columns

---

## TESTING STRATEGY (Phase 9 detailed)

### Backend (Laravel)

- ✅ Unit tests: Models, Policies, Helpers (>80% coverage)
- ✅ Feature tests: API endpoints, auth, authorization, IDOR, file uploads
- ✅ Database tests: Migrations, relationships, seeders
- ✅ Security tests: CSRF, XSS, SQL injection, rate limiting

### Frontend (Next.js)

- ✅ Component tests: Critical paths (login, article page, admin dashboard)
- ✅ E2E tests: User journeys (read article, login, publish news)
- ✅ Visual tests: Responsive design (mobile, tablet, desktop)
- ✅ Performance tests: LCP, CLS, INP

### Build Verification

- ✅ `npm run build` (Next.js production build)
- ✅ `npm run lint` (ESLint)
- ✅ `composer test` (Laravel tests)
- ✅ `php artisan lint:fix` (PHP formatting)

---

## DEPLOYMENT CHECKLIST (Phase 10, 11)

### Demo Deployment (Free tier)

- [ ] Frontend: Vercel free tier
- [ ] Backend: Railway/Render free tier
- [ ] Database: Supabase free tier (PostgreSQL)
- [ ] Storage: Cloudinary free tier
- [ ] Email: Mailtrap (free) for demo
- [ ] DNS: domain.com → Vercel nameservers
- [ ] HTTPS: automatic (Vercel + Let's Encrypt)
- [ ] End-to-end: All features working live

### Production Migration (Owner pays for services)

- [ ] Frontend: Vercel paid tier (or self-hosted)
- [ ] Backend: Managed server (DigitalOcean, Linode, AWS EC2)
- [ ] Database: AWS RDS / DigitalOcean Postgres / Render Postgres
- [ ] Storage: AWS S3 / Wasabi / DigitalOcean Spaces
- [ ] CDN: Cloudflare / AWS CloudFront
- [ ] Email: SendGrid / AWS SES
- [ ] Monitoring: Sentry / New Relic
- [ ] Backups: Automated daily, 30-day retention

**No code changes required** — everything configurable via .env

---

## WHAT'S EXPLICITLY NOT INCLUDED (Phase 1)

- ❌ Comments system (can add Phase 12)
- ❌ Newsletter signup (can add Phase 12)
- ❌ Push notifications (can add Phase 12)
- ❌ Mobile app (can add later)
- ❌ Multi-language (architecture supports, can add Phase 12)
- ❌ Subscription/paywall (can add Phase 12)
- ❌ Advanced analytics (can add Phase 12)
- ❌ Dark mode (owner will provide colors)
- ❌ Email notifications (can add Phase 12)

**These are intentionally deferred to Phase 12+** — focus on core product first.

---

## ARCHITECTURE VALIDATED ✅

- Scalable: 100,000+ articles, 1M+ monthly views, hundreds of admins
- Secure: Defense-in-depth, server-side authorization, audit logs
- SEO-ready: Server-side rendering, structured data, sitemaps, RSS
- Performance: Core Web Vitals optimized, caching, image optimization
- Maintainable: Clean code, separation of concerns, testable
- Free-to-paid migration: No rewrite needed

**Decision:** Approved. Proceed to Phase 1.

---

**Next:** Phase 1 Step 1.1 — Frontend Setup
