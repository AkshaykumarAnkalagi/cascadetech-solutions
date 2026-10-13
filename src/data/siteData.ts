export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  benefits: string[];
  deliverables: string[];
  techStack: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  metrics: { label: string; value: string }[];
  keyFeatures: string[];
  techStack: string[];
  link?: string;
  status: "Live Product" | "Active Enterprise" | "In Pipeline";
  featured: boolean;
  accentColor: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const SITE_INFO = {
  name: "CascadeTech Solutions",
  tagline: "Delivering Intelligent and Scalable Digital Solutions",
  shortBio:
    "We architect, engineer, and deploy high-performance web platforms, custom enterprise software, and applied AI systems built to scale with ambitious businesses.",
  email: "cascadetechnologiessolutions@gmail.com",
  phone: "+91 836 295 4488",
  address: "Vidya-Nagar, Hubballi, Karnataka, India – 580021",
  coordinates: {
    city: "Hubballi",
    state: "Karnataka",
    country: "India",
    pin: "580021",
  },
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
  },
};

export const STATS: StatItem[] = [
  {
    id: "years",
    value: "5+",
    label: "Years of Innovation",
    description: "Pioneering intelligent software & modern web architectures",
  },
  {
    id: "projects",
    value: "45+",
    label: "Projects Delivered",
    description: "Enterprise software, custom web apps, and digital engines",
  },
  {
    id: "products",
    value: "2",
    label: "Live Flagship Products",
    description: "Startopia & TextYourBoss.ai deployed globally",
  },
  {
    id: "satisfaction",
    value: "99.4%",
    label: "Client-Focused Retention",
    description: "Long-term engineering partnerships driven by tangible ROI",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "startopia",
    slug: "startopia",
    title: "Startopia",
    category: "Startup Ecosystem Platform",
    tagline: "A Comprehensive Global Ecosystem for Founders and Builders",
    shortDescription:
      "A multi-faceted operating platform uniting founders, verified investors, accelerators, and ecosystem mentors in one collaborative digital environment.",
    fullDescription:
      "Startopia was architected from the ground up to solve the friction in the founder journey. From intelligent investor matchmaking and algorithmic pitch deck breakdown to milestone tracking and cap table visibility, Startopia provides early-stage and growth-stage ventures with the digital runway required to survive and thrive.",
    metrics: [
      { label: "Founders Onboarded", value: "2,400+" },
      { label: "Dealflow Acceleration", value: "3.8x" },
      { label: "Active Investor Connects", value: "350+" },
    ],
    keyFeatures: [
      "AI-driven investor-matching engine based on sector, check size, and mandate",
      "Dynamic data-room and real-time pitch deck analytics with viewer heatmaps",
      "Interactive milestone execution dashboard with founder sprint checklists",
      "Curated resource library with institutional-grade legal & fundraising templates",
    ],
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind CSS",
      "Prisma ORM",
      "Redis",
      "AWS S3",
    ],
    link: "https://startopia.example.com",
    status: "Live Product",
    featured: true,
    accentColor: "#00F2FE",
  },
  {
    id: "textyourboss",
    slug: "textyourboss-ai",
    title: "TextYourBoss.ai",
    category: "AI Communication & Workflow Engine",
    tagline: "AI-Powered Professional Communication & Workflow Precision",
    shortDescription:
      "An enterprise-ready AI communication co-pilot that synthesizes corporate correspondence, calibrates emotional tone, and turns messy updates into decisive executive briefs.",
    fullDescription:
      "Modern workplaces lose thousands of hours to ambiguous messaging, anxiety-inducing upward communication, and disjointed async handoffs. TextYourBoss.ai bridges this divide with contextual prompt modeling, role-tuned tone filters, real-time message refactoring, and automated action-item extraction directly integrated into professional communication pipelines.",
    metrics: [
      { label: "Messages Refined", value: "180k+" },
      { label: "Drafting Time Saved", value: "72%" },
      { label: "Executive Clarity Score", value: "96/100" },
    ],
    keyFeatures: [
      "Context-aware tone calibration (Diplomatic, Urgent, Executive Brief, Constructive Pushback)",
      "Automated extraction of action items, deadlines, and risk flags",
      "Slack and Microsoft Teams bi-directional workflow integration",
      "Enterprise data privacy isolation with zero training retention models",
    ],
    techStack: [
      "Next.js 15",
      "OpenAI API",
      "LangChain",
      "FastAPI",
      "TypeScript",
      "Tailwind CSS",
      "Vector Embeddings",
      "Vercel Edge",
    ],
    link: "https://textyourboss.ai",
    status: "Live Product",
    featured: true,
    accentColor: "#38BDF8",
  },
];

export const PIPELINE_PROJECTS = [
  {
    title: "EduPulse AI",
    category: "Educational Technology",
    description:
      "Adaptive learning diagnostics combining personalized knowledge trees with automated real-time tutor interventions for higher-ed curricula.",
    status: "Private Beta",
    badge: "EdTech Innovation",
  },
  {
    title: "LoyaltyGrid 360",
    category: "Customer Retention & FinTech",
    description:
      "Omnichannel micro-incentive engine linking physical retail points-of-sale with dynamic digital reward tokens and behavioural analytics.",
    status: "Architecture Phase",
    badge: "Loyalty Systems",
  },
  {
    title: "SynapseDoc Hub",
    category: "Enterprise AI Knowledge Base",
    description:
      "Autonomous enterprise search and ingestion pipeline providing zero-hallucination document synthesis across complex regulatory files.",
    status: "Q2 2026 Target",
    badge: "Applied AI",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "website-development",
    slug: "website-development",
    title: "Custom Website Development",
    shortDescription:
      "Ultra-fast, responsive web experiences built with modern jamstack and serverless frameworks engineered for conversions and SEO supremacy.",
    fullDescription:
      "We build robust, lightning-fast digital flagships tailored to your exact brand positioning. Moving beyond off-the-shelf templates, our custom websites leverage Next.js App Router, clean component hierarchies, server-side caching, and frictionless micro-interactions to turn visitors into committed clients.",
    iconName: "Globe",
    benefits: [
      "Sub-second page load times with 95+ Google Lighthouse scores",
      "Deep search engine optimization and semantic schema architecture",
      "Flawless responsive rendering across desktop, tablet, and mobile displays",
      "Effortless headless CMS content workflows for non-technical team members",
    ],
    deliverables: [
      "Custom Next.js / React Web Applications",
      "Headless CMS Integration (Sanity, Strapi)",
      "Core Web Vitals Performance Optimization",
      "Full Technical SEO & Open Graph Infrastructure",
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Sanity.io", "Vercel"],
  },
  {
    id: "ui-ux-design",
    slug: "ui-ux-design",
    title: "Web Design & UI/UX",
    shortDescription:
      "Human-centered design systems, high-fidelity prototypes, and tactile micro-interactions that elevate brand authority and drive product adoption.",
    fullDescription:
      "Design is not merely visual ornament; it is the strategic friction-reducer between your customer and your value proposition. We craft comprehensive digital product design systems, user journeys, wireframes, and interactive interfaces that convey high-end polish while maximizing user intuition and engagement.",
    iconName: "Palette",
    benefits: [
      "Distinctive, premium visual language tailored to your sector",
      "Scalable Figma design tokens and reusable design systems",
      "Frictionless user flow mapping with validated accessibility (WCAG AA)",
      "High-fidelity interactive prototypes ready for rapid stakeholder signoff",
    ],
    deliverables: [
      "Full Product Design Systems & UI Kits",
      "UX Journey Audits & User Flow Wireframing",
      "Interactive Figma Prototypes & Motion Specs",
      "Responsive Layout Guides & Component Libraries",
    ],
    techStack: ["Figma", "Design Systems", "Prototyping", "Framer Motion", "Design Tokens"],
  },
  {
    id: "custom-software-development",
    slug: "custom-software-development",
    title: "Custom Software Development",
    shortDescription:
      "Tailor-made cloud architectures, high-concurrency backend services, and scalable web apps built to conquer complex operational bottlenecks.",
    fullDescription:
      "When off-the-shelf SaaS limits your competitive advantage, CascadeTech engineers purpose-built internal tools, portals, SaaS platforms, and distributed APIs. We design resilient databases, secure authentication mechanisms, and maintainable software patterns that endure rapid enterprise scaling.",
    iconName: "Cpu",
    benefits: [
      "Architecture specifically modeled around your proprietary business logic",
      "High availability and automated horizontal auto-scaling infrastructure",
      "Enterprise security protocols, role-based access, and data isolation",
      "Clean modular codebases accompanied by comprehensive automated test coverage",
    ],
    deliverables: [
      "Full-Stack SaaS Applications & Portals",
      "RESTful and GraphQL API Microservices",
      "Database Schema Design & Migration Architectures",
      "Third-Party Software & ERP Integrations",
    ],
    techStack: ["Node.js", "TypeScript", "PostgreSQL", "Prisma", "Docker", "AWS / GCP"],
  },
  {
    id: "ai-chatbot-development",
    slug: "ai-chatbot-development",
    title: "AI & Chatbot Development",
    shortDescription:
      "Custom LLM integrations, retrieval-augmented generation (RAG) pipelines, and intelligent conversational agents that automate complex workflows.",
    fullDescription:
      "Harness the paradigm shift of artificial intelligence with tangible, high-ROI implementations. We build context-aware AI copilots, intelligent customer service bots, and predictive automation pipelines powered by state-of-the-art foundation models and proprietary knowledge bases.",
    iconName: "Bot",
    benefits: [
      "24/7 intelligent customer triage and contextual ticket resolution",
      "Private RAG architectures preventing data leakage and hallucinations",
      "Seamless connection with CRM, internal documents, and messaging platforms",
      "Measurable reduction in operational overhead and response latency",
    ],
    deliverables: [
      "Contextual Enterprise AI Chatbots (Web, Slack, WhatsApp)",
      "RAG Systems with Vector Databases (Pinecone, pgvector)",
      "Custom Prompt Engineering & Agentic Function Calling",
      "Autonomous Workflow & Document Ingestion Pipelines",
    ],
    techStack: ["OpenAI API", "Anthropic Claude", "LangChain", "Vector DBs", "FastAPI", "Python"],
  },
  {
    id: "digital-transformation",
    slug: "digital-transformation",
    title: "Digital Transformation",
    shortDescription:
      "Modernizing legacy legacy stacks, eliminating analog operational drag, and orchestrating unified cloud workflows for modern enterprises.",
    fullDescription:
      "Traditional processes introduce hidden friction, data silos, and operational vulnerability. We consult and execute on full-spectrum digital transformation: migrating brittle legacy monolithic systems to modular cloud primitives, digitizing paper-based operations, and training your teams for sustained velocity.",
    iconName: "RefreshCw",
    benefits: [
      "Elimination of manual spreadsheets and repetitive administrative chores",
      "Unified single-source-of-truth data visibility across business units",
      "Reduced infrastructure overhead and enhanced business continuity",
      "Agile operating frameworks enabling faster time-to-market for new features",
    ],
    deliverables: [
      "Legacy Codebase & Cloud Infrastructure Audits",
      "Cloud Migration & Microservices Refactoring",
      "Cross-Department Workflow Automation (Zapier, n8n, Custom APIs)",
      "Continuous Integration & Continuous Deployment (CI/CD) Pipelines",
    ],
    techStack: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "Serverless"],
  },
  {
    id: "loyalty-programs",
    slug: "loyalty-programs",
    title: "Loyalty Program Solutions",
    shortDescription:
      "Gamified customer retention architectures, rewards ledger engines, and omnichannel incentive systems that boost customer lifetime value.",
    fullDescription:
      "Customer acquisition is expensive; sustained retention is where category leaders build long-term profitability. We engineer custom loyalty platforms featuring tiered reward logic, real-time points ledgers, referral flywheels, and automated promotional triggers that keep users coming back.",
    iconName: "Sparkles",
    benefits: [
      "Tangible increase in repeat purchase rates and average order values",
      "Tamper-proof real-time ledger accounting for points and vouchers",
      "Personalized reward recommendations driven by purchase history",
      "Frictionless redemption across both digital storefronts and physical POS",
    ],
    deliverables: [
      "Custom Loyalty Engines & Member Dashboards",
      "Points, Tiering & Gamification Rule Calculators",
      "E-commerce & POS Integration Webhooks",
      "Customer Retention Analytics & Churn Predictors",
    ],
    techStack: ["Next.js", "Redis", "Stripe API", "PostgreSQL", "Webhooks"],
  },
  {
    id: "educational-technology",
    slug: "educational-technology",
    title: "Educational Technology",
    shortDescription:
      "Next-generation learning management platforms, interactive courseware engines, and student assessment portals built for modern pedagogy.",
    fullDescription:
      "Education requires specialized technology that sustains student attention, automates grading overhead, and delivers granular learning metrics to educators. We develop custom LMS platforms, virtual classroom portals, interactive quiz engines, and curriculum tracking systems.",
    iconName: "GraduationCap",
    benefits: [
      "Engaging multimedia course player with resume-anywhere sync",
      "Automated evaluation mechanisms with real-time feedback loops",
      "Institutional compliance, gradebook exports, and role hierarchies",
      "High-scale concurrent live exam delivery without server degradation",
    ],
    deliverables: [
      "Custom LMS (Learning Management Systems)",
      "Interactive Assessment & Proctoring Frameworks",
      "Student & Instructor Portals with Real-Time Analytics",
      "SCORM / xAPI Compliant Integrations",
    ],
    techStack: ["Next.js 15", "WebSockets", "AWS MediaConvert", "PostgreSQL", "Tailwind CSS"],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery & Mapping",
    description:
      "We dissect your operational goals, user pain points, and technical constraints. Through structured scoping sessions, we create an unambiguous product blueprint, technical feasibility matrix, and delivery timeline.",
    deliverables: [
      "Technical Requirements Document (TRD)",
      "User Journey & Architecture Map",
      "Milestone Roadmap & Resource Allocation",
    ],
  },
  {
    step: "02",
    title: "Architecture & Design",
    description:
      "Before writing code, we engineer the system schema, select the optimal tech stack, and design high-fidelity interactive interfaces. You test the tactile prototype and approve the data model before development commences.",
    deliverables: [
      "Interactive Figma Prototype & Design System",
      "Relational Database Schema & API Contracts",
      "Security & Infrastructure Architecture Plan",
    ],
  },
  {
    step: "03",
    title: "Build in Sprints",
    description:
      "Engineering proceeds in transparent 2-week bi-weekly sprints. You receive live staging preview links, sprint demos, and real-time git transparency, ensuring zero surprises and rapid feedback cycles.",
    deliverables: [
      "Working Staging Deployments per Sprint",
      "Rigorous Code Reviews & Unit/Integration Tests",
      "Bi-Weekly Progress Demos & Backlog Tuning",
    ],
  },
  {
    step: "04",
    title: "Launch & Scale",
    description:
      "We execute zero-downtime production deployments, configure cloud monitoring, conduct load testing, and provide ongoing telemetry. Your platform launches bulletproof and ready for exponential user traffic.",
    deliverables: [
      "Production Deployment on High-Availability Cloud",
      "Automated Monitoring, Alerting & Error Logging",
      "Full Codebase Handover & Documentation",
    ],
  },
];

export const ABOUT_CONTENT = {
  headline: "Architecting Digital Breakthroughs with Uncompromising Precision",
  purpose:
    "At CascadeTech Solutions, our purpose is simple: to liberate ambitious businesses from technical limitations through intelligent, scalable digital architecture. In an era where technological change accelerates daily, companies need a partner capable of moving beyond buzzwords to engineer software that delivers quantifiable competitive advantages.",
  mission:
    "To design, build, and deploy mission-critical software, intelligent AI systems, and modern digital platforms that empower forward-thinking organizations to outpace market demands with speed and resilience.",
  vision:
    "To stand as the foremost engineering partner for transformative digital products globally, recognized for engineering excellence, technical integrity, and our ability to translate complex technology into elegant user experiences.",
  values: [
    {
      title: "Engineering Excellence Over Shortcuts",
      description:
        "We reject brittle hacks and disposable code. We architect systems with long-term maintainability, rigorous typing, high performance, and robust security from day one.",
    },
    {
      title: "Intelligent Pragmatism",
      description:
        "We deploy AI and modern technologies where they create genuine leverage, not for vanity. Every architectural decision is grounded in business ROI and user value.",
    },
    {
      title: "Absolute Transparency",
      description:
        "No black boxes. Our clients have total visibility into sprint progress, technical choices, architecture decisions, and code repositories at all times.",
    },
    {
      title: "Obsessive Craft & Craftsmanship",
      description:
        "From micro-interactions and sub-millisecond database queries to cohesive typography, we believe that world-class software is defined by meticulous attention to detail.",
    },
    {
      title: "Partnership, Not Just Agency",
      description:
        "We treat your product as our own. We challenge assumptions, offer proactive architectural recommendations, and stay invested in your post-launch trajectory.",
    },
  ],
  standFor: [
    "Zero bloat: lightweight, hyper-fast applications that load in under a second.",
    "True ownership: you own 100% of your source code, infrastructure, and IP.",
    "Built for the future: cloud-native architectures that effortlessly scale with traffic spikes.",
    "Reliable Indian engineering excellence: global standards delivered from Karnataka's tech hub.",
  ],
};

export const FAQS = [
  {
    question: "How long does a typical project take to design and launch?",
    answer:
      "Timelines depend on scope. A custom high-performance website or marketing flagship typically takes 3 to 5 weeks. Complex web applications, SaaS platforms, or custom AI integrations generally take 6 to 12 weeks delivered in structured 2-week agile sprints with continuous staging builds.",
  },
  {
    question: "Do you build custom solutions or use pre-made templates?",
    answer:
      "We engineer custom digital solutions from scratch. Every line of code, database schema, and design token is crafted specifically for your brand positioning and business logic using modern frameworks like Next.js 15, TypeScript, and Tailwind CSS.",
  },
  {
    question: "What is your approach to AI and chatbot development?",
    answer:
      "We focus on practical, applied AI systems. Rather than generic wrappers, we build Retrieval-Augmented Generation (RAG) architectures with custom vector embeddings, private data segregation, and context-calibrated agents that integrate directly into your company's workflows.",
  },
  {
    question: "Who owns the code and intellectual property after completion?",
    answer:
      "You do. You retain 100% ownership of all source code, Figma design files, database architectures, and intellectual property upon project handover.",
  },
  {
    question: "Can we manage our website content without calling developers?",
    answer:
      "Absolutely. We integrate modern headless CMS platforms like Sanity.io, empowering your marketing and operational teams to edit text, update case studies, publish blogs, and modify media through a clean, intuitive dashboard.",
  },
];
