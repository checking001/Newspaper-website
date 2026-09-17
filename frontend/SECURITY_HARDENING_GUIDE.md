# SECURITY HARDENING GUIDE

## Backend Security

### 1. Environment Variables

```bash
# .env — NEVER commit to git
APP_DEBUG=false  # Always false in production
APP_KEY=xxxxx    # Generated with php artisan key:generate
APP_ENV=production

# Database
DB_PASSWORD=strong-password-here  # Use strong password

# CORS
CORS_ALLOWED_ORIGINS=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_ENABLED=true
RATE_LIMIT_LOGIN=5
RATE_LIMIT_API=60
```

### 2. Security Middleware

- ✅ SecurityHeadersMiddleware (CSP, X-Frame-Options)
- ✅ RateLimitMiddleware (Login, API)
- ✅ InputValidationMiddleware (Sanitization)

### 3. Authentication

- ✅ Bcrypt password hashing (12 rounds)
- ✅ Sanctum SPA authentication
- ✅ TOTP 2FA for Super Admin
- ✅ Secure session cookies (HTTPOnly, SameSite)

### 4. Authorization

- ✅ Eloquent policies (Admin, Super Admin)
- ✅ Ownership checks on articles
- ✅ Role-based access control

### 5. Input Validation

- ✅ Validate all user inputs
- ✅ Sanitize strings (htmlspecialchars)
- ✅ Remove null bytes
- ✅ Prepared statements (Eloquent ORM)
- ✅ Check for SQL injection patterns

### 6. API Security

- ✅ CORS whitelist origins
- ✅ Rate limiting (login, API)
- ✅ CSRF protection
- ✅ No sensitive data in URLs
- ✅ Proper HTTP status codes

---

## Frontend Security

### 1. Environment Variables

```bash
# .env.production
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com

# These are public; never put secrets here
```

### 2. Content Security Policy

- Script-src whitelist (no unsafe-eval)
- Style-src whitelist
- Frame-ancestors deny (no iframes)
- Object-src none

### 3. Input Handling

- ✅ Sanitize user input (sanitizeInput)
- ✅ Escape HTML special characters (escapeHtml)
- ✅ Validate URLs (validateUrl)
- ✅ Validate emails (validateEmail)
- ✅ Check for XSS payloads (hasXssPayload)

### 4. Local Storage

- ✅ Use secure access wrappers
- ✅ Never store sensitive data
- ✅ Clear on logout

### 5. HTTP Headers

- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### 6. HTTPS

- ✅ Always use HTTPS in production
- ✅ Redirect HTTP to HTTPS
- ✅ HSTS header (max-age=31536000)

---

## Database Security

### 1. Backups

```bash
# Daily backups
mysqldump -u user -p database > backup-$(date +%Y%m%d).sql

# Encrypted backups
mysqldump -u user -p database | gzip > backup-$(date +%Y%m%d).sql.gz
```

### 2. Permissions

- Database user with limited privileges
- Read-only user for reports
- Separate user per environment

### 3. Access Control

- Whitelist database access by IP
- Disable remote root login
- Use strong passwords

### 4. Data Protection

- Encrypt sensitive data (passwords, tokens)
- Hash user passwords (Bcrypt)
- Use parameterized queries (Eloquent)

---

## Deployment Security

### 1. HTTPS/SSL

```bash
# Redirect HTTP to HTTPS
# In nginx:
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
}
```

### 2. Firewall

```bash
# Allow only necessary ports
# Port 80 (HTTP) — redirect to 443
# Port 443 (HTTPS) — frontend + API
# Port 22 (SSH) — admin only
# Block everything else
```

### 3. SSH Keys

- Use SSH keys instead of passwords
- Disable root login
- Disable password authentication
- Use strong passphrases

### 4. Server Hardening

- Keep OS updated
- Keep packages updated
- Disable unnecessary services
- Use SELinux or AppArmor
- Monitor system logs

---

## Monitoring & Logging

### 1. Error Tracking

- Sentry for automatic error reporting
- Email alerts for critical errors
- Error logs stored securely

### 2. Access Logs

- Log all API requests
- Log login attempts
- Monitor for suspicious activity
- Retain logs for 90 days

### 3. Audit Logs

- Track all admin actions
- Track data changes
- Track user login/logout
- Immutable audit trail

### 4. Alerts

- Uptime monitoring
- Error rate threshold alerts
- Unusual traffic pattern alerts
- Security incident alerts

---

## Regular Maintenance

### Weekly

- [ ] Review error logs
- [ ] Check uptime reports
- [ ] Monitor performance metrics

### Monthly

- [ ] Review security logs
- [ ] Update dependencies
- [ ] Run security scan
- [ ] Test backups

### Quarterly

- [ ] Security audit
- [ ] Penetration testing (optional)
- [ ] Update SSL certificate (if needed)
- [ ] Review access permissions

### Annually

- [ ] Full security assessment
- [ ] Update security policies
- [ ] Review compliance (GDPR, etc.)

---

## Incident Response

### If Breach Detected

1. Take system offline immediately
2. Preserve logs and evidence
3. Notify relevant parties
4. Investigate root cause
5. Fix vulnerability
6. Restore from clean backup
7. Monitor for further incidents

### If DDoS Attack

1. Enable DDoS protection
2. Block attacking IP ranges
3. Scale infrastructure
4. Notify hosting provider
5. Monitor traffic
6. Document incident

---

## Third-Party Security

### Dependencies

- Use `composer audit` for PHP
- Use `npm audit` for Node.js
- Keep dependencies updated
- Review changelogs before updating

### Supply Chain Security

- Verify package signatures
- Use lockfiles (composer.lock, package-lock.json)
- Review open-source licenses
- Check for known vulnerabilities

---

## Compliance

### GDPR (if applicable)

- [ ] Privacy policy updated
- [ ] Data retention policy set
- [ ] User consent for cookies/tracking
- [ ] Data export functionality
- [ ] Account deletion functionality

### Security Standards

- [ ] CSP header implemented
- [ ] HTTPS enforced
- [ ] HSTS enabled
- [ ] Security headers set
- [ ] Rate limiting active
