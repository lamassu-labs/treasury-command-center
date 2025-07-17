# Treasury Command Center Documentation Deployment Guide

## 🚀 **Deployment to nuru.network/treasury-monitoring/docs/**

### **Architecture Overview**

The documentation website is built using **Docusaurus** with a **dual-source approach**:
- **GitHub** remains the source of truth for all documentation
- **Docusaurus website** provides enhanced user experience with search, navigation, and interactive elements
- **Automatic deployment** via GitHub Actions when docs are updated

### **Deployment Options**

## **Option 1: GitHub Actions Automated Deployment** ⭐

**Setup Steps:**

1. **Configure GitHub Repository Secrets**:
   ```bash
   # Add these secrets to your GitHub repository settings
   FTP_USER=your-ftp-username
   FTP_PASS=your-ftp-password
   FTP_HOST=nuru.network
   DEPLOY_PATH=/public_html/treasury-monitoring/docs/
   ```

2. **GitHub Actions Workflow**:
   - File: `.github/workflows/deploy-docs.yml`
   - Triggers: Push to main branch (docs/ or website/ changes)
   - Builds: Docusaurus site automatically
   - Deploys: To nuru.network/treasury-monitoring/docs/

3. **Deployment Process**:
   ```bash
   # Automatic on git push
   git add .
   git commit -m "Update documentation"
   git push origin main
   # → GitHub Actions automatically deploys to nuru.network
   ```

## **Option 2: Manual Deployment**

**Local Build & Deploy:**

```bash
# 1. Build the website
cd website
npm install
npm run build

# 2. Deploy via FTP/SFTP
# Upload website/build/* to nuru.network/treasury-monitoring/docs/

# 3. Or use rsync (if SSH access available)
rsync -avz --delete website/build/ user@nuru.network:/var/www/nuru.network/treasury-monitoring/docs/
```

## **Option 3: Hosting Provider Integration**

### **Vercel Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from website directory
cd website
vercel --prod
# Then configure custom domain: nuru.network/treasury-monitoring/docs/
```

### **Netlify Deployment**
```bash
# Build and deploy
cd website
npm run build
# Upload build/ folder to Netlify
# Configure redirects for /treasury-monitoring/docs/ path
```

## **Configuration Files**

### **Static Files Added**:
- `website/static/CNAME` - Domain configuration
- `website/static/.htaccess` - Apache server configuration
- `website/static/robots.txt` - SEO and crawler configuration

### **Docusaurus Configuration**:
- **URL**: `https://nuru.network`
- **Base URL**: `/treasury-monitoring/docs/`
- **GitHub Integration**: Edit links point to GitHub repository
- **Mobile Optimized**: Responsive design with 90%+ mobile experience

## **Domain & SSL Setup**

### **DNS Configuration**:
```bash
# Add CNAME record
nuru.network → your-hosting-provider

# Or A record
nuru.network → server-ip-address
```

### **SSL Certificate**:
- **Let's Encrypt** (recommended for automated renewal)
- **Cloudflare** (for CDN + SSL)
- **Manual certificate** upload to hosting provider

## **Performance Optimization**

### **CDN Setup**:
```bash
# Static assets optimization
- Images: WebP format, compressed
- CSS/JS: Minified and cached
- Fonts: Preloaded and cached (1 year)
- HTML: Cached (1 hour)
```

### **Caching Strategy**:
- **Static assets**: 1 month cache
- **HTML pages**: 1 hour cache
- **API responses**: No cache
- **Images**: 1 month cache with compression

## **Monitoring & Analytics**

### **Built-in Analytics**:
```javascript
// Add to docusaurus.config.ts
gtag: {
  trackingID: 'G-XXXXXXXXXX',
  anonymizeIP: true,
},
```

### **Performance Monitoring**:
- **Core Web Vitals** tracking
- **Page load times** monitoring
- **Mobile experience** optimization
- **Search functionality** usage tracking

## **Security Configuration**

### **Headers Added**:
```bash
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### **Content Security Policy**:
```bash
# Add to .htaccess or server config
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

## **Testing Deployment**

### **Local Testing**:
```bash
# Test production build locally
cd website
npm run build
npm run serve
# → Visit http://localhost:3000/treasury-monitoring/docs/
```

### **Deployment Verification**:
1. **✅ Homepage loads** with Treasury Command Center branding
2. **✅ Navigation works** across all 4 layers
3. **✅ Persona selector** functions correctly
4. **✅ Search functionality** operational
5. **✅ Mobile responsive** design verified
6. **✅ GitHub edit links** work properly

## **Troubleshooting**

### **Common Issues**:

**404 Errors**:
```bash
# Check baseUrl in docusaurus.config.ts
baseUrl: '/treasury-monitoring/docs/',

# Verify server path matches
/var/www/nuru.network/treasury-monitoring/docs/
```

**Build Failures**:
```bash
# Check excluded files in docusaurus.config.ts
exclude: ['**/ANALYTICS_*.md', '**/LAYER*_*.md']

# Verify Node.js version
node --version  # Should be 18+
```

**Styling Issues**:
```bash
# Check CSS variables in custom.css
--ifm-color-primary: #7C3AED;

# Verify Treasury Command Center theme
```

## **Maintenance**

### **Regular Updates**:
- **Monthly**: Check for Docusaurus updates
- **Weekly**: Review GitHub Actions deployment logs
- **Daily**: Monitor site performance and uptime

### **Content Updates**:
- **GitHub**: Edit markdown files normally
- **Automatic**: Website rebuilds on push to main
- **Manual**: Run deployment workflow if needed

## **Support**

### **Documentation Issues**:
- **GitHub Issues**: Report problems with documentation
- **GitHub Discussions**: Ask questions about deployment
- **Direct Support**: Contact development team

### **Deployment Support**:
- **GitHub Actions logs**: Check deployment status
- **Server logs**: Monitor hosting provider logs
- **Performance monitoring**: Use built-in analytics

---

## **Quick Deployment Summary**

1. **Setup**: Configure GitHub secrets for your hosting provider
2. **Deploy**: Push changes to main branch
3. **Verify**: Check https://nuru.network/treasury-monitoring/docs/
4. **Monitor**: Use GitHub Actions logs and analytics

The documentation website is now ready for professional deployment with automatic updates, performance optimization, and mobile-first design!