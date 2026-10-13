# CascadeTech Solutions — Digital Flagship

> **"Delivering Intelligent and Scalable Digital Solutions"**  
> Headquartered in Vidya-Nagar, Hubballi, Karnataka, India – 580021  
> Inquiries: [cascadetechnologiessolutions@gmail.com](mailto:cascadetechnologiessolutions@gmail.com)

A high-performance, production-ready website engineered for **CascadeTech Solutions**, featuring custom web applications, applied AI architectures, and live flagship products (**Startopia** and **TextYourBoss.ai**).

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components & React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing throughout)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom electric cyan `#00F2FE` palette & premium near-black dark theme)
- **Motion & Interactions**: [Framer Motion](https://www.framer-motion.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Headless CMS**: [Sanity.io](https://www.sanity.io/) with embedded Studio at `/studio`
- **Email & Contact**: [Resend](https://resend.com/) API route with built-in development simulation mode
- **Deployment**: Optimized for one-click deployment on [Vercel](https://vercel.com/)

---

## 📂 Project Architecture

```
CASCADE WEBSITE UPDATE 1/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts          # Resend contact email handler with validation
│   │   ├── about/
│   │   │   └── page.tsx              # Purpose, mission, vision, values & guarantees (NO leadership section)
│   │   ├── services/
│   │   │   └── page.tsx              # Detailed 7 services & 3 engagement models
│   │   ├── work/
│   │   │   └── page.tsx              # Case studies (Startopia & TextYourBoss.ai) + Innovation Pipeline
│   │   ├── contact/
│   │   │   └── page.tsx              # Working contact form, address, FAQs
│   │   ├── studio/[[...tool]]/
│   │   │   └── page.tsx              # Embedded Sanity Studio at /studio
│   │   ├── globals.css               # Cyan glows, scrollbars, background grid
│   │   ├── layout.tsx                # Root layout with metadata, JSON-LD, Navbar, Footer
│   │   └── page.tsx                  # Complete 8-section Homepage
│   ├── components/
│   │   ├── Navbar.tsx                # Sticky header with active links & mobile menu
│   │   ├── Footer.tsx                # Professional footer with Hubballi address & email
│   │   ├── HeroSection.tsx           # Eyebrow, headline, 2 CTAs, TechVisual, trust badges
│   │   ├── TechVisual.tsx            # Animated cybernetic core with floating technical badges
│   │   ├── StatsBar.tsx              # 5+ Years, 45+ Projects, 2 Live Products, 99.4%
│   │   ├── SelectedWork.tsx          # Featured Startopia & TextYourBoss.ai cards
│   │   ├── ServicesOverview.tsx      # 6 core service cards with hover highlights
│   │   ├── ProcessSection.tsx        # 4-step framework: Discovery -> Architecture -> Sprint -> Scale
│   │   └── ContactSection.tsx        # Working contact form with live/simulated state
│   ├── data/
│   │   └── siteData.ts               # Production data, case studies, services, FAQs, fallbacks
│   ├── sanity/
│   │   ├── env.ts                    # Sanity environment helpers
│   │   ├── client.ts                 # Sanity client with resilient local fallback
│   │   ├── sanity.config.ts          # Studio configuration
│   │   └── schemas/
│   │       ├── index.ts              # Schema registry
│   │       ├── homePage.ts           # Hero & section copy schemas
│   │       ├── service.ts            # Service schema
│   │       ├── project.ts            # Case study / product schema
│   │       ├── stat.ts               # Credibility metrics schema
│   │       ├── siteSettings.ts       # Global settings, contact info, navigation
│   │       └── seo.ts                # SEO metadata schema
│   └── lib/
│       └── utils.ts                  # Tailwind clsx + twMerge utility
├── .env.local.example                # Environment variable reference
├── next.config.ts                    # Next.js config
├── tailwind.config.ts                # Custom colors & animations
├── tsconfig.json                     # TypeScript compiler options
└── package.json
```

---

## 🛠️ Local Development Quickstart

### 1. Clone & Install Dependencies

```bash
# Install packages
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory (or copy from `.env.local.example`):

```bash
cp .env.local.example .env.local
```

Fill in the parameters:

```env
# 1. Sanity.io (Optional for initial development — fallback data is automatically active)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-01

# 2. Resend API Key for live email forwarding from the contact form
RESEND_API_KEY=re_your_api_key_here
CONTACT_RECEIVER_EMAIL=cascadetechnologiessolutions@gmail.com
RESEND_FROM_EMAIL=CascadeTech Solutions <onboarding@resend.dev>

# 3. Base Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note on Contact Form**: If `RESEND_API_KEY` is not provided, the contact form operates in **Simulation Mode** — it validates the input, logs the payload to the console, and returns a successful response to the user with a helpful notification. Once your Resend key is added, emails are delivered immediately!

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Sanity.io CMS Integration Guide

The project includes an **embedded Sanity Studio** available directly at:
```
http://localhost:3000/studio
```

### How to Connect Your Own Sanity Project:
1. Log in or sign up at [sanity.io](https://www.sanity.io/).
2. Create a new project:
   ```bash
   npx sanity init
   ```
3. Copy your `Project ID` and `Dataset` (typically `production`).
4. Paste them into `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
5. In your Sanity Project settings (`https://www.sanity.io/manage`), add `http://localhost:3000` (and your production Vercel domain) under **API -> CORS Origins** with credentials enabled.
6. Visit `/studio` to create and update:
   - Homepage copy & hero headline
   - Services & deliverables
   - Case studies (Startopia & TextYourBoss.ai)
   - Site settings, address & contact information
   - Stats & metrics

---

## ☁️ Deploying to Vercel

This repository is pre-configured for zero-configuration deployment on [Vercel](https://vercel.com/):

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"New Project"**.
3. Import your repository.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `RESEND_API_KEY`
   - `CONTACT_RECEIVER_EMAIL`
   - `RESEND_FROM_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` (your custom production URL)
5. Click **Deploy**. Vercel will build and launch the site globally on edge CDN.

---

## 🏢 Business Identity

- **Legal Brand**: CascadeTech Solutions
- **Registered Address**: Vidya-Nagar, Hubballi, Karnataka, India – 580021
- **Official Inquiries**: `cascadetechnologiessolutions@gmail.com`
- **Core Positioning**: *"Delivering Intelligent and Scalable Digital Solutions"*
