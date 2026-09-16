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
