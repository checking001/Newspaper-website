# DEPLOYMENT CHECKLIST

## Pre-Deployment

### Backend

- [ ] All `.env` variables set correctly
- [ ] `APP_DEBUG=false` in production
- [ ] Database migrations run: `php artisan migrate --force`
- [ ] Cache cleared: `php artisan cache:clear`
- [ ] Config cached: `php artisan config:cache`
- [ ] Routes cached: `php artisan route:cache`
- [ ] Views cached: `php artisan view:cache`
- [ ] Permissions set correctly (storage, bootstrap/cache)
- [ ] Database backups configured
- [ ] Error logging configured (e.g., Sentry)
- [ ] Mail service configured (e.g., Mailtrap)

### Frontend

- [ ] All `.env.production` variables set
- [ ] `NODE_ENV=production`
- [ ] API_URL points to production backend
- [ ] Build succeeds: `npm run build`
- [ ] No console errors/warnings
- [ ] Performance optimized (images, fonts, code-splitting)
- [ ] SEO metadata correct
- [ ] Social media metadata correct

### Security

- [ ] HTTPS/SSL certificate installed
- [ ] CORS origins whitelist updated
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] CSRF tokens validated
- [ ] Input validation active
- [ ] SQL injection prevention verified
- [ ] XSS prevention active
- [ ] Secrets in environment variables (not hardcoded)
- [ ] API keys rotated
- [ ] Backup encryption configured

### Infrastructure

- [ ] Production database set up
- [ ] Redis cache configured (optional)
- [ ] File storage configured (S3, Cloudinary, etc.)
- [ ] Email service configured
- [ ] CDN configured (optional)
- [ ] DNS configured correctly
- [ ] SSL certificate installed
- [ ] Firewall rules configured
- [ ] IP whitelisting (if needed)
- [ ] DDoS protection enabled (optional)

---

## Deployment Process

### 1. Database Deployment

```bash
# Backup current database
mysqldump -u user -p database > backup-$(date +%Y%m%d).sql

# Run migrations
php artisan migrate --force

# Seed (if needed)
php artisan db:seed --force
```

### 2. Backend Deployment

```bash
# Pull latest code
git pull origin main

# Install dependencies
composer install --no-dev --optimize-autoloader

# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Cache for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Restart queue (if using)
php artisan queue:restart
```

### 3. Frontend Deployment

```bash
# Pull latest code
git pull origin main

# Install dependencies
npm ci

# Build
npm run build

# Deploy to Vercel/hosting
vercel deploy --prod
```

### 4. Post-Deployment

- [ ] Test homepage loads
- [ ] Test article pages load
- [ ] Test search functionality
- [ ] Test admin login
- [ ] Test create article
- [ ] Check sitemap.xml is accessible
- [ ] Check RSS feed is accessible
- [ ] Check robots.txt is correct
- [ ] Monitor error logs
- [ ] Monitor performance metrics
- [ ] Verify SSL certificate is valid
- [ ] Test on mobile devices

---

## Monitoring

### Uptime Monitoring

- [ ] Configure uptime monitoring (e.g., UptimeRobot)
- [ ] Set up alerts for downtime
- [ ] Monitor API response times

### Error Tracking

- [ ] Configure Sentry for backend
- [ ] Configure Sentry for frontend
- [ ] Set up email alerts for critical errors

### Performance Monitoring

- [ ] Google Core Web Vitals
- [ ] Page load times
- [ ] Database query performance
- [ ] API response times

### Security Monitoring

- [ ] Monitor for suspicious login attempts
- [ ] Monitor for SQL injection attempts
- [ ] Monitor for XSS attempts
- [ ] Check SSL certificate expiration
- [ ] Monitor rate limiting effectiveness

---

## Rollback Plan

If something goes wrong:

### Backend Rollback

```bash
# Revert to previous commit
git revert HEAD

# Rollback database (if needed)
php artisan migrate:rollback --force

# Restart services
systemctl restart php-fpm
systemctl restart nginx
```

### Frontend Rollback

```bash
# Revert to previous deployment
vercel rollback

# Or redeploy from git
git revert HEAD
npm run build
vercel deploy --prod
```

---

## Post-Launch

### SEO

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify SSL certificate in GSC
- [ ] Monitor search console for errors
- [ ] Monitor Core Web Vitals

### Analytics

- [ ] Set up Google Analytics 4
- [ ] Set up conversion tracking
- [ ] Monitor user behavior
- [ ] Track traffic sources

### Maintenance

- [ ] Schedule regular backups
- [ ] Schedule security updates
- [ ] Schedule database optimization
- [ ] Monitor disk space
- [ ] Monitor memory usage
- [ ] Review error logs weekly

---

## Infrastructure Providers

### Backend Hosting Options

- **Railway** (Simple, free tier)
- **Render** (Free tier available)
- **DigitalOcean App Platform**
- **AWS Elastic Beanstalk**
- **Heroku** (Paid only now)
- **Linode** (Affordable VPS)

### Frontend Hosting Options

- **Vercel** (Recommended, free tier)
- **Netlify** (Alternative, free tier)
- **Firebase Hosting**
- **AWS CloudFront + S3**
- **Cloudflare Pages**

### Database Options

- **Supabase** (PostgreSQL, free tier)
- **PlanetScale** (MySQL, free tier)
- **Render** (PostgreSQL, free tier)
- **AWS RDS**
- **DigitalOcean Managed DB**

### File Storage Options

- **Cloudinary** (Images, free tier)
- **AWS S3**
- **DigitalOcean Spaces**
- **Google Cloud Storage**

---

## Environment Variables Template

### Backend (.env)

APP_NAME="খবরের কাগজ"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.khoborer-kagoj.com
APP_KEY=base64:xxxxx

DB_CONNECTION=pgsql
DB_HOST=db.host
DB_PORT=5432
DB_DATABASE=newspaper
DB_USERNAME=username
DB_PASSWORD=password

CACHE_DRIVER=redis
REDIS_HOST=redis.host
REDIS_PASSWORD=password

MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=username
MAIL_PASSWORD=password

CORS_ALLOWED_ORIGINS=https://www.khoborer-kagoj.com,https://khoborer-kagoj.com

SANCTUM_STATEFUL_DOMAINS=www.khoborer-kagoj.com,khoborer-kagoj.com

### Frontend (.env.production)

NEXT_PUBLIC_API_URL=https://api.khoborer-kagoj.com/api
NEXT_PUBLIC_SITE_URL=https://www.khoborer-kagoj.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
