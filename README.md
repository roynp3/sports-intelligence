# Sports Intelligence Layer

**A Currents Media Solutions Product**

A sports availability intelligence tool that shows where fans can watch games by market—and where advertisers can reach them.

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via GitHub (Best)

1. **Create a GitHub repo**
   - Go to github.com and create a new repository
   - Name it something like `currents-sports`

2. **Push this code to GitHub**
   ```bash
   cd currents-deploy
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/currents-sports.git
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign up/login with GitHub
   - Click "Add New Project"
   - Import your `currents-sports` repository
   - Vercel auto-detects Vite—just click "Deploy"
   - Your site is live at `currents-sports.vercel.app` within ~60 seconds

4. **Add your custom domain**
   - In Vercel dashboard, go to your project → Settings → Domains
   - Add your domain (e.g., `currentssports.com`)
   - Vercel gives you DNS records to add at your registrar
   - SSL is automatic

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (from project directory)
cd currents-deploy
vercel

# Follow prompts, then add custom domain in dashboard
```

## Alternative: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop the `dist` folder (after running `npm run build`)
3. Or connect your GitHub repo for auto-deploys
4. Add custom domain in Site Settings → Domain Management

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
currents-deploy/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind styles
├── public/
│   └── favicon.svg      # Site icon
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── postcss.config.js    # PostCSS configuration
```

## Data Sources

- **ESPN API**: Live game schedules and broadcast assignments
- **ZIP-to-DMA mapping**: Sample of ~50 markets (expand for production)
- **RSN-to-platform mapping**: Manual compilation of streaming availability

## Expanding Coverage

To add more ZIP codes, edit the `ZIP_TO_DMA` object in `src/App.jsx`:

```javascript
'12345': { dma: 123, name: 'Market Name', teams: ['TEAM1', 'TEAM2'] },
```

## Custom Domain Setup

After deploying to Vercel:

1. Buy domain from Namecheap, Google Domains, Cloudflare, etc.
2. In Vercel: Project → Settings → Domains → Add
3. Add DNS records at your registrar:
   - Type: `A`, Name: `@`, Value: `76.76.21.21`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`
4. Wait 5-30 minutes for propagation
5. SSL certificate is automatic

## License

Prototype for demonstration purposes.
