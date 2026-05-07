# 🏔️ Himalayan Serenity Website — Complete Setup Guide

## Project Overview
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Design:** Dark luxury theme, Playfair Display serif + DM Sans

---

## STEP 1: Install Prerequisites

Make sure you have these installed on your computer:

### 1a. Install Node.js
- Go to: https://nodejs.org
- Download **LTS version** (18 or above)
- Install it (click Next → Next → Finish)

### 1b. Verify Installation
Open your terminal (Command Prompt / PowerShell) and run:
```
node --version
npm --version
```
You should see version numbers like `v18.x.x` and `9.x.x`

### 1c. Install VS Code (if not installed)
- Go to: https://code.visualstudio.com
- Download and install

### 1d. Install Claude Code (optional but recommended!)
```
npm install -g @anthropic-ai/claude-code
```

---

## STEP 2: Create the Project Folder

### Option A — Using the provided source files
1. Copy the `himalayan-serenity` folder to your Desktop
2. Open VS Code
3. Go to **File → Open Folder**
4. Select the `himalayan-serenity` folder
5. Click **Open**

### Option B — Create from scratch with Vite
Open terminal in VS Code (`Ctrl + `` ` ``) and run:
```bash
npm create vite@latest himalayan-serenity -- --template react
cd himalayan-serenity
```

---

## STEP 3: Install Dependencies

In the VS Code terminal, run:

```bash
npm install
```

Then install Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Install other dependencies:
```bash
npm install react-router-dom lucide-react
```

---

## STEP 4: Configure Tailwind

Replace the content of `tailwind.config.js` with the provided file.
Replace `src/index.css` with the provided file.

---

## STEP 5: Copy All Source Files

Make sure these files are in place:

```
himalayan-serenity/
├── index.html                          ✅
├── vite.config.js                      ✅
├── tailwind.config.js                  ✅
├── postcss.config.js                   ✅
├── package.json                        ✅
├── public/
│   └── favicon.svg                     ✅
└── src/
    ├── main.jsx                        ✅
    ├── App.jsx                         ✅
    ├── index.css                       ✅
    ├── components/
    │   ├── Navbar.jsx                  ✅
    │   ├── Hero.jsx                    ✅
    │   ├── WhyChooseUs.jsx             ✅
    │   ├── Packages.jsx                ✅
    │   ├── SpiritualSection.jsx        ✅
    │   ├── Transformation.jsx          ✅
    │   ├── CTASection.jsx              ✅
    │   └── Footer.jsx                  ✅
    └── pages/
        ├── Home.jsx                    ✅
        ├── About.jsx                   ✅
        ├── Expeditions.jsx             ✅
        ├── Packages.jsx                ✅
        ├── FAQ.jsx                     ✅
        └── Contact.jsx                 ✅
```

---

## STEP 6: Run the Development Server

```bash
npm run dev
```

You'll see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Open your browser and go to: **http://localhost:5173**

🎉 Your website is live!

---

## STEP 7: Using Claude Code (AI-Powered Editing)

Claude Code lets you describe changes in plain English and it edits your code automatically!

### Start Claude Code:
```bash
claude
```

### Example prompts you can use:
- `"Change the hero background to a video instead of an image"`
- `"Add a testimonials section after the packages section"`
- `"Make the navbar background more transparent"`
- `"Add smooth fade animations to the feature cards"`
- `"Change the orange accent color to #d4820a"`
- `"Add a WhatsApp floating button on all pages"`

---

## STEP 8: Customize the Content

### Change Colors
Edit `tailwind.config.js` → `theme.extend.colors`:
```js
brand: {
  orange: '#e07b2a',  // ← Change this to your preferred color
  dark: '#0d0d0d',    // ← Main background
}
```

### Change Hero Image
Edit `src/components/Hero.jsx`:
```jsx
backgroundImage: `url('YOUR_IMAGE_URL_HERE')`
```

Use free images from:
- https://unsplash.com (search "himalayan mountains")
- https://pexels.com

### Change Business Info
Edit `src/components/Footer.jsx`:
- Email, phone, address

### Add Your Logo
Replace `public/favicon.svg` with your logo file.

---

## STEP 9: Build for Production

When ready to deploy:
```bash
npm run build
```

This creates a `dist/` folder with optimized files.

---

## STEP 10: Deploy Your Website

### Free Hosting Options:

**Vercel (Recommended — 1 minute deployment):**
1. Go to https://vercel.com
2. Sign up with GitHub
3. Push your project to GitHub
4. Import repo → Deploy → Done!

**Netlify:**
1. Go to https://netlify.com
2. Drag your `dist/` folder → Done!

**GitHub Pages:**
```bash
npm install -D gh-pages
npm run build
npx gh-pages -d dist
```

---

## VS Code Extensions to Install

Open VS Code → Extensions (`Ctrl+Shift+X`) → Search and install:

| Extension | Purpose |
|-----------|---------|
| ES7+ React Snippets | React component shortcuts |
| Tailwind CSS IntelliSense | Tailwind autocomplete |
| Prettier | Code formatting |
| Auto Rename Tag | Rename HTML tags |
| GitLens | Git integration |

---

## Pages in Your Website

| URL | Page | Status |
|-----|------|--------|
| `/` | Home | ✅ Complete |
| `/packages` | All Packages | ✅ Complete |
| `/expeditions` | Expeditions | ✅ Complete |
| `/about` | About / Culture | ✅ Complete |
| `/faq` | FAQ + AI Chat | ✅ Complete |
| `/contact` | Contact / Book | ✅ Complete |

---

## Common Issues & Fixes

**Problem:** `npm install` fails
**Fix:** Run `npm install --legacy-peer-deps`

**Problem:** Page shows blank white screen
**Fix:** Check browser console (F12) for errors

**Problem:** Tailwind styles not working
**Fix:** Make sure `tailwind.config.js` content array includes `"./src/**/*.{js,ts,jsx,tsx}"`

**Problem:** Fonts not loading
**Fix:** Check internet connection (fonts load from Google Fonts CDN)

---

## Need Help?

Use Claude Code to fix any issues:
```bash
claude "Fix the error: [paste error here]"
```

Or ask me (Claude) directly in this chat! 🙏

---

*Built with ❤️ — Himalayan Serenity Website v1.0*
