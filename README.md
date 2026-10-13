# CascadeTech Solutions — Digital Flagship & Multilingual Platform

> **"Delivering Intelligent and Scalable Digital Solutions"**  
> Headquartered in Vidya-Nagar, Hubballi, Karnataka, India – 580021  
> Inquiries: [cascadetechnologiessolutions@gmail.com](mailto:cascadetechnologiessolutions@gmail.com)

A high-performance, full-stack production-ready multilingual web application engineered for **CascadeTech Solutions**, featuring custom web applications, applied AI architectures, live flagship products (**Startopia** and **TextYourBoss.ai**), and native multi-language support across 9 languages.

---

## 🌐 Supported Languages (Real Multi-Language i18n)

Built with **`next-intl`** and Next.js 15 App Router dynamic locale routing (`/[locale]/...`):

| Code | Language | Native Script | Route Example |
| :--- | :--- | :--- | :--- |
| **`en`** | English *(Default)* | English | `/en` |
| **`kn`** | Kannada *(Hubballi / Karnataka)* | ಕನ್ನಡ | `/kn` |
| **`hi`** | Hindi | हिन्दी | `/hi` |
| **`te`** | Telugu | తెలుగు | `/te` |
| **`ta`** | Tamil | தமிழ் | `/ta` |
| **`ml`** | Malayalam | മലയാളം | `/ml` |
| **`mr`** | Marathi | मराठी | `/mr` |
| **`bn`** | Bengali | বাংলা | `/bn` |
| **`gu`** | Gujarati | ગુજરાતી | `/gu` |

- **Language Switcher**: Elegant dropdown in the sticky navigation bar preserving current page route across all languages.
- **Interactive Hero Tech Visual**: Floating language pills connected to the central `</>` code hub; clicking any language pill switches the entire site language instantly!

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components & React 19)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/) v4
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom electric cyan `#00d4ff` palette & dark theme)
- **Motion & Interactions**: [Framer Motion](https://www.framer-motion.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Headless CMS**: [Sanity.io](https://www.sanity.io/) with multilingual schemas and studio at `/studio`
- **Email & Contact**: Resend REST API integration with development simulation mode
- **Deployment**: Zero-config deployment on [Vercel](https://vercel.com/)

---

## 📂 Project Architecture

```
CASCADE WEBSITE UPDATE 1/
├── messages/                         # JSON translation dictionaries for all 9 languages
│   ├── en.json                       # English (Default)
│   ├── kn.json                       # Kannada (ಕನ್ನಡ)
│   ├── hi.json                       # Hindi (हिन्दी)
│   ├── te.json                       # Telugu (తెలుగు)
│   ├── ta.json                       # Tamil (தமிழ்)
│   ├── ml.json                       # Malayalam (മലയാളം)
│   ├── mr.json                       # Marathi (मराठी)
│   ├── bn.json                       # Bengali (বাংলা)
│   └── gu.json                       # Gujarati (ગુજરાતી)
├── src/
│   ├── app/
│   │   ├── [locale]/                 # Dynamic locale route segment
│   │   │   ├── layout.tsx            # Localized layout with NextIntlClientProvider & SEO
│   │   │   ├── page.tsx              # Localized Homepage (8 sections)
│   │   │   ├── about/page.tsx        # Localized About Page (Mission, Vision, Purpose, Values)
│   │   │   ├── services/page.tsx     # Localized Services Page (7 services + 3 models)
│   │   │   ├── work/page.tsx         # Localized Work Page (Startopia, TextYourBoss.ai + Pipeline)
│   │   │   └── contact/page.tsx      # Localized Contact Page (Working form + FAQs)
│   │   ├── api/contact/route.ts      # Zero-dependency contact email API route
│   │   ├── studio/[[...tool]]/page.tsx# Embedded Sanity Studio & Schema Explorer
│   │   ├── globals.css               # Cyan glows, scrollbars, background grid
│   │   ├── layout.tsx                # Root layout pass-through
│   │   └── page.tsx                  # Root redirect to default locale (/en)
│   ├── components/
│   │   ├── Navbar.tsx                # Sticky header with localized links & language switcher
│   │   ├── LanguageSwitcher.tsx      # Dropdown menu to switch between all 9 languages
│   │   ├── HeroSection.tsx           # Hero with eyebrow, headline, 2 CTAs, TechVisual
│   │   ├── TechVisual.tsx            # Interactive 9-language connected cybernetic node visual
│   │   ├── StatsBar.tsx              # Localized credibility metrics
│   │   ├── SelectedWork.tsx          # Featured Startopia & TextYourBoss.ai cards
│   │   ├── ServicesOverview.tsx      # 6 core service cards with hover highlights
│   │   ├── ProcessSection.tsx        # 4-step framework: Discovery -> Architecture -> Sprint -> Scale
│   │   ├── ContactSection.tsx        # Working contact form with live/simulated state
│   │   └── Footer.tsx                # Professional footer with Hubballi address & email
│   ├── i18n/
│   │   ├── routing.ts                # next-intl routing definition (locales, prefix, metadata)
│   │   └── request.ts                # next-intl server request config
│   ├── middleware.ts                 # Next.js i18n URL routing & locale redirection
│   ├── data/siteData.ts              # Fallback database and case studies
│   └── sanity/
│       ├── schemas/
│       │   ├── localeString.ts       # Multilingual string & text schemas for Sanity CMS
│       │   ├── homePage.ts           # Homepage schema
│       │   ├── service.ts            # Service schema
│       │   ├── project.ts            # Case study / product schema
│       │   ├── stat.ts               # Metrics schema
│       │   ├── siteSettings.ts       # Settings schema
│       │   └── seo.ts                # SEO schema
│       └── client.ts                 # Native fetch query client
├── next.config.ts                    # next-intl plugin integration
├── tailwind.config.ts
└── package.json
```

---

## 🛠️ Local Development Quickstart

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# 1. Sanity.io (Optional for local dev — fallback data is automatically active)
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-03-01

# 2. Resend API Key for real email delivery from the contact form
RESEND_API_KEY=re_your_api_key_here
CONTACT_RECEIVER_EMAIL=cascadetechnologiessolutions@gmail.com
RESEND_FROM_EMAIL=CascadeTech Solutions <onboarding@resend.dev>

# 3. Base Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **Note on Contact Form**: If `RESEND_API_KEY` is not provided, the contact form operates in **Simulation Mode** — it validates the input and returns a successful response with interactive toast feedback. When the key is added, live emails are dispatched directly to `cascadetechnologiessolutions@gmail.com`.

### 3. Run the Development Server

```bash
npm run dev
```

Visit:
- **English**: [http://localhost:3000/en](http://localhost:3000/en)
- **Kannada**: [http://localhost:3000/kn](http://localhost:3000/kn)
- **Hindi**: [http://localhost:3000/hi](http://localhost:3000/hi)
- **Telugu**: [http://localhost:3000/te](http://localhost:3000/te)
- **Tamil**: [http://localhost:3000/ta](http://localhost:3000/ta)
- **Malayalam**: [http://localhost:3000/ml](http://localhost:3000/ml)
- **Marathi**: [http://localhost:3000/mr](http://localhost:3000/mr)
- **Bengali**: [http://localhost:3000/bn](http://localhost:3000/bn)
- **Gujarati**: [http://localhost:3000/gu](http://localhost:3000/gu)
- **CMS Studio**: [http://localhost:3000/studio](http://localhost:3000/studio)

---

## ⚡ Sanity.io Multilingual Schema Guide

The Sanity configuration includes `localeString` and `localeText` object schemas:

```ts
// Example: Add a multilingual field in any Sanity schema
defineField({
  name: "headline",
  title: "Localized Headline",
  type: "localeString", // Contains fields for en, kn, hi, te, ta, ml, mr, bn, gu
})
```

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub.
2. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **"New Project"**.
3. Import your repository.
4. Add environment variables (`RESEND_API_KEY`, `CONTACT_RECEIVER_EMAIL`, `NEXT_PUBLIC_SITE_URL`).
5. Click **Deploy**. Vercel will build and launch the site globally with edge localization.

---

## 🏢 Business Identity

- **Brand**: CascadeTech Solutions
- **Location**: Vidya-Nagar, Hubballi, Karnataka, India – 580021
- **Email**: `cascadetechnologiessolutions@gmail.com`
- **Positioning**: *"Delivering Intelligent and Scalable Digital Solutions"*
- **Live Flagship Products**: Startopia & TextYourBoss.ai
