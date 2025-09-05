# dashMate - Web Deployment Guide

## Deployment Options Overview

dashMate can be deployed to several platforms. We'll cover the most popular options with detailed steps for each.

## 🚀 Option 1: Vercel (Recommended - Easiest)

Vercel is the company behind Next.js and offers the smoothest deployment experience.

### Prerequisites
- GitHub account
- Vercel account (free) - [Sign up](https://vercel.com/signup)

### Step-by-Step Deployment

#### 1. Prepare Your Repository

```bash
# Ensure your code is committed
git add .
git commit -m "Prepare for deployment"

# Push to GitHub
git push origin main
```

#### 2. Deploy with Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure your project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (or `dashmate` if in subdirectory)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)

#### 3. Add Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_OPENAI_API_KEY=your_key_here
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

#### 4. Deploy

Click "Deploy" and wait 2-3 minutes. Your app will be live at:
- `https://your-project-name.vercel.app`

### Custom Domain (Optional)

1. Go to Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## 🌊 Option 2: Netlify

### Step-by-Step Deployment

#### 1. Prepare Build Configuration

Create `netlify.toml` in root directory:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NEXT_PUBLIC_APP_URL = "https://your-app.netlify.app"
```

#### 2. Deploy to Netlify

**Option A: Git-based deployment**
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub and select repository
5. Configure build settings (auto-detected from netlify.toml)
6. Add environment variables
7. Click "Deploy site"

**Option B: Direct deployment**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=.next
```

## 🔷 Option 3: Azure Static Web Apps

### Prerequisites
- Azure account - [Free trial](https://azure.microsoft.com/free/)
- Azure CLI installed

### Step-by-Step Deployment

```bash
# Install Azure Static Web Apps CLI
npm install -g @azure/static-web-apps-cli

# Build your app
npm run build

# Deploy
swa deploy ./out --env production
```

### Configuration

Create `staticwebapp.config.json`:

```json
{
  "build": {
    "appLocation": "/",
    "apiLocation": "",
    "outputLocation": ".next"
  },
  "platform": {
    "apiRuntime": "node:18"
  }
}
```

## 🚢 Option 4: Docker Deployment (Self-Hosted)

### Create Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Deploy

```bash
# Build Docker image
docker build -t dashmate .

# Run locally
docker run -p 3000:3000 --env-file .env.local dashmate

# Push to Docker Hub
docker tag dashmate yourusername/dashmate
docker push yourusername/dashmate
```

### Deploy to Cloud Providers

**Google Cloud Run:**
```bash
gcloud run deploy dashmate --image yourusername/dashmate --platform managed
```

**AWS ECS:**
```bash
aws ecs create-service --service-name dashmate --task-definition dashmate-task
```

**DigitalOcean App Platform:**
1. Push to GitHub
2. Create new app in DigitalOcean
3. Select GitHub repo
4. Configure as Docker deployment

## 🌐 Option 5: Traditional VPS (Ubuntu/Debian)

### Server Setup

```bash
# SSH into your server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt-get install nginx

# Clone your repository
git clone your-repo-url
cd dashmate

# Install dependencies
npm install

# Build the app
npm run build

# Start with PM2
pm2 start npm --name "dashmate" -- start
pm2 save
pm2 startup
```

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/dashmate
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/dashmate /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL with Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 📋 Pre-Deployment Checklist

### 1. Environment Variables

Ensure all production environment variables are set:

```env
# Required for full functionality
NEXT_PUBLIC_OPENAI_API_KEY=sk-...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_APP_URL=https://your-production-url.com

# Optional
NEXT_PUBLIC_SENTRY_DSN=https://... (for error tracking)
NEXT_PUBLIC_ANALYTICS_ID=G-... (for Google Analytics)
```

### 2. Database Setup

If using Supabase:
1. Create production project
2. Run schema migration
3. Set up Row Level Security policies
4. Configure authentication

### 3. Performance Optimization

```bash
# Run production build locally to test
npm run build
npm run start

# Check bundle size
npm run analyze
```

### 4. Security Considerations

- [ ] Environment variables are properly secured
- [ ] API keys have appropriate restrictions
- [ ] CORS is configured correctly
- [ ] Rate limiting is implemented
- [ ] Content Security Policy headers are set

## 🔍 Post-Deployment Verification

### 1. Test Core Features

- [ ] Voice recording works
- [ ] Tasks save and persist
- [ ] All modal windows open correctly
- [ ] Color customization applies
- [ ] Local storage functions properly

### 2. Monitor Performance

Set up monitoring with:
- **Vercel Analytics** (built-in with Vercel)
- **Sentry** for error tracking
- **Google Analytics** for user insights

### 3. Set Up Backups

If using Supabase:
```bash
# Enable automatic backups in Supabase dashboard
# Settings → Backups → Enable Point-in-Time Recovery
```

## 🚨 Troubleshooting Common Deployment Issues

### Build Failures

```bash
# Clear cache and retry
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Environment Variable Issues

- Ensure all `NEXT_PUBLIC_` variables are prefixed correctly
- Restart/redeploy after adding new environment variables
- Check for typos in variable names

### Memory Issues

For Vercel/Netlify, add to `next.config.js`:
```javascript
module.exports = {
  experimental: {
    workerThreads: false,
    cpus: 1
  }
}
```

### CORS Errors

Add to API routes or middleware:
```javascript
headers: {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL,
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
}
```

## 📊 Estimated Costs

| Platform | Free Tier | Paid Plans |
|----------|-----------|------------|
| **Vercel** | Generous free tier | $20/month Pro |
| **Netlify** | 100GB bandwidth/month | $19/month Pro |
| **Azure** | $200 credit | Pay as you go |
| **DigitalOcean** | - | $5/month droplet |
| **AWS** | 12 months free tier | ~$10-50/month |
| **Supabase** | 500MB database | $25/month Pro |

## 🎯 Recommended Deployment Path

For most users, we recommend:

1. **Start with Vercel** (easiest, great free tier)
2. **Use Supabase** free tier for database
3. **Add custom domain** when ready ($20/year)
4. **Upgrade to paid plans** as you scale

## Support Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Community Discord](your-discord-link)

## Next Steps

1. Choose your deployment platform
2. Set up environment variables
3. Deploy using the guide above
4. Test all features in production
5. Set up monitoring and analytics
6. Share your dashMate URL! 🎉