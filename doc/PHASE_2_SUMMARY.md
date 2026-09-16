# PHASE 2 — DATABASE — Summary

**Date:** September 16, 2026  
**Status:** ✅ COMPLETE

## What Was Built

### 14 Database Tables

1. **roles** — Admin, Super Admin roles
2. **users** — Users with role_id, 2FA fields, soft delete
3. **categories** — News categories with parent-child relationships
4. **authors** — Article authors/reporters
5. **tags** — News tags for categorization
6. **articles** — Main articles table with SEO fields, status workflow, breaking/featured/trending flags
7. **media** — Media files with upload tracking
8. **advertisements** — Ads management with placements, device targeting
9. **homepage_sections** — Dynamic homepage section configuration
10. **article_tags** — Pivot table for article-tag relationships
11. **article_revisions** — Article revision history
12. **audit_logs** — Action audit trail
13. **settings** — System configuration key-value store
14. **submissions** — Public news submissions

### 14 Eloquent Models

All models with:

- Proper relationships (HasMany, BelongsTo, BelongsToMany)
- Fillable attributes
- Casts for type safety
- Soft delete support where applicable

### 10 Database Seeders

Populate:

- 2 roles (admin, super_admin)
- 3 test users with passwords
- 20 categories (news categories with parent-child)
- 4 test authors
- 10 test tags
- 3 sample published articles
- 10 system settings
- 7 homepage section configurations
- 3 sample advertisements

### Test Credentials

**Super Admin:**

- Email: superadmin@newspaper.local
- Password: password123
- Role: super_admin

**Admin 1:**

- Email: admin1@newspaper.local
- Password: password123
- Role: admin

**Admin 2:**

- Email: admin2@newspaper.local
- Password: password123
- Role: admin

## Architecture Decisions

### Status Field on Articles

draft → pending → published
→ scheduled → published
→ archived
→ trash (soft delete)

### Soft Deletes

Enabled on: users, categories, articles, media, advertisements, audit_logs

- `deleted_at` timestamp
- `deleted_by` user_id on articles

### Indexes

Added to:

- articles: (slug, status, published_at, category_id, author_id, is_breaking, is_featured, is_trending)
- categories: (slug, parent_id, is_active)
- authors: (slug, is_active)
- tags: (slug)
- users: (email, role_id)
- media: (mime_type, uploaded_by)
- audit_logs: (user_id, action, entity_type, created_at)

### Foreign Keys

- articles.category_id → categories.id (restrict delete)
- articles.author_id → authors.id (restrict delete)
- users.role_id → roles.id (restrict delete)
- article_tags: cascade delete
- article_revisions: cascade delete
- audit_logs: null on delete

## Commands Run

```bash
php artisan migrate          # Created all 14 tables
php artisan db:seed          # Seeded all data
```

## Verification

```bash
User::count()              # 3
Article::count()           # 3
Category::count()          # 20
Tag::count()               # 10
Role::count()              # 2
Author::count()            # 4
HomepageSection::count()   # 7
Advertisement::count()     # 3
Setting::count()           # 10
```

## Next: Phase 3

Authentication + RBAC will implement:

- Login/logout endpoints
- Sanctum SPA auth
- TOTP 2FA for Super Admin
- Authorization policies
- Ownership checks (Admin can't edit other's articles)
- Audit logging on auth events
