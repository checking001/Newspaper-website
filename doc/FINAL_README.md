# 📰 খবরের কাগজ — Digital Newspaper Portal

A production-grade, full-stack digital newspaper platform built with **Laravel 13** (backend) and **Next.js 14** (frontend).

**Live Demo:** https://github.com/checking001/Newspaper-website  
**Status:** ✅ Complete and Production-Ready

---

## 🎯 Overview

**খবরের কাগজ** (Khoborer Kagoj) is a comprehensive digital newspaper system featuring:

- **Admin CMS** — Manage articles, categories, authors, tags, media
- **Public Website** — Homepage, latest news, search, archive, author pages
- **SEO Optimized** — Sitemap, RSS feed, JSON-LD schemas, meta tags
- **Security Hardened** — HTTPS, CORS, rate limiting, input validation, XSS/SQL injection prevention
- **Responsive Design** — Mobile, tablet, desktop
- **Scalable Architecture** — REST API, database migrations, environment-based config

---

## 🏗️ Architecture

Frontend (Vercel) Backend (Railway/Render) Database (PostgreSQL)
├── Next.js 14 ├── Laravel 13 API └── 14 Tables
├── React 18+ ├── REST Endpoints └── Migrations
├── TypeScript ├── Authentication (Sanctum)
├── Tailwind CSS ├── Authorization (Policies)
└── 20+ Pages └── File Storage

---

## 📋 Features

### Admin Panel

- ✅ Comprehensive dashboard with stats
- ✅ Article CRUD (create, read, update, delete, publish)
- ✅ Category hierarchical management
- ✅ Author profiles
- ✅ Tag management
- ✅ Media upload & management
- ✅ Advertisement manager
- ✅ Homepage dynamic sections
- ✅ User management (Super Admin only)
- ✅ Audit logging

### Public Website

- ✅ Dynamic homepage (API-driven sections)
- ✅ Latest news with pagination
- ✅ Full-text search
- ✅ Category pages with hierarchy
- ✅ Article detail pages with related articles
- ✅ Archive (year/month filtering)
- ✅ Author profile pages
- ✅ Tag pages
- ✅ Info pages (about, contact, privacy, terms)
- ✅ RSS feed
- ✅ Sitemap
- ✅ Responsive design

### SEO

- ✅ Open Graph tags (Facebook sharing)
- ✅ Twitter Card tags
- ✅ JSON-LD schemas (NewsArticle, Organization)
- ✅ Sitemap.xml
- ✅ RSS feed
- ✅ robots.txt
- ✅ Canonical URLs
- ✅ Dynamic metadata per page

### Security

- ✅ HTTPS/SSL ready
- ✅ CORS hardening
- ✅ Rate limiting (login & API)
- ✅ CSRF protection
- ✅ Input validation & sanitization
- ✅ SQL injection prevention
- ✅ XSS prevention
- ✅ Security headers (CSP, HSTS, etc.)
- ✅ Bcrypt password hashing
- ✅ Sanctum SPA authentication
- ✅ TOTP 2FA for Super Admin
- ✅ Authorization policies
- ✅ Audit logging

---

## 🚀 Quick Start

### Prerequisites

- PHP 8.3+
- Node.js 18+
- Composer
- npm or yarn
- PostgreSQL (production)

### Backend Setup

```bash
cd newspaper-website/backend

# Install dependencies
composer install

# Generate app key
php artisan key:generate

# Setup database (SQLite for dev)
php artisan migrate
php artisan db:seed

# Run server
php artisan serve
# Runs on http://localhost:8000
```

### Frontend Setup

```bash
cd newspaper-website/frontend

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Run development server
npm run dev
# Opens http://localhost:3000
```

### Test Login

- **Email:** superadmin@newspaper.local
- **Password:** password123
- **URL:** http://localhost:3000/admin/login

---

## 📚 Documentation

- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** — 60+ pre-deployment items
- **[SECURITY_HARDENING_GUIDE.md](./SECURITY_HARDENING_GUIDE.md)** — Comprehensive security guide
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** — Directory layout & file purposes
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** — All endpoints & formats
- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** — Local setup & standards
- **[ARCHITECTURE_DECISIONS.md](./ARCHITECTURE_DECISIONS.md)** — Design decisions
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** — Phase-by-phase completion

---

## 🗄️ Database

**14 Tables:**

- roles, users, categories, authors, tags
- articles, media, advertisements, homepage_sections
- article_tags (pivot), article_revisions
- audit_logs, settings, submissions

**Features:**

- ✅ Migrations with rollback support
- ✅ Relationships (HasMany, BelongsTo, BelongsToMany)
- ✅ Soft deletes on sensitive tables
- ✅ Indexes on frequently-queried columns
- ✅ User tracking (created_by, updated_by, deleted_by)

---

## 🔐 Security Highlights

### Input Validation

- Sanitize HTML entities
- Remove null bytes
- Check for SQL injection patterns
- Check for XSS payloads
- Validate email & URL formats

### Rate Limiting

- Login: 5 attempts/minute
- API: 60 requests/minute
- User-based tracking

### Authentication

- Sanctum SPA tokens
- Bcrypt password hashing (12 rounds)
- TOTP 2FA support
- Secure session cookies (HTTPOnly, Secure, SameSite)

### Authorization

- Eloquent policies (Admin/Super Admin)
- Ownership checks on articles
- Role-based access control

### Headers

- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy
- HSTS (production)

---

## 📊 Tech Stack

### Backend

- **Framework:** Laravel 13
- **Language:** PHP 8.3
- **Database:** SQLite (dev) / PostgreSQL (prod)
- **Auth:** Laravel Sanctum + TOTP
- **ORM:** Eloquent

### Frontend

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Runtime:** Node.js
- **Package Manager:** npm

### DevOps

- **Version Control:** Git/GitHub
- **Frontend Hosting:** Vercel (recommended)
- **Backend Hosting:** Railway or Render (recommended)
- **Database:** Supabase or managed PostgreSQL
- **Storage:** Cloudinary or AWS S3
- **Email:** Mailtrap or SendGrid

---

## 📈 Performance

**Frontend:**

- Lazy loading images
- Code splitting
- SEO optimized
- Core Web Vitals compliant
- Mobile responsive

**Backend:**

- Indexed database queries
- Eloquent query optimization
- Caching ready (Redis)
- Pagination (20 items/page)
- Gzip compression

---

## 🧪 Testing

Recommended testing tools:

- **Backend:** PHPUnit, Pest
- **Frontend:** Jest, React Testing Library
- **Security:** OWASP ZAP, Burp Suite Community
- **Performance:** k6, Apache JMeter
- **API:** Postman, Insomnia

---

## 📞 Support & Contribution

- **Issues:** GitHub Issues
- **Pull Requests:** Welcome!
- **Documentation:** See DEVELOPMENT_GUIDE.md

---

## 📄 License

MIT License — See LICENSE file

---

## ✅ Completion Status

**All 7 Phases Complete:**

- ✅ Phase 0: Audit
- ✅ Phase 1: Foundation
- ✅ Phase 2: Database
- ✅ Phase 3: Authentication
- ✅ Phase 4: CMS Admin
- ✅ Phase 5: Public Website
- ✅ Phase 6: SEO
- ✅ Phase 7: Security

**Production Status:** ✅ READY

---

Made by MD FAYSAL AHMED BHUIYAN with ❤️ in Bangladesh 🇧🇩
