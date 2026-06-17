import { TerminalResume } from "../types/terminal";

// Single source of truth for the terminal resume content. Mirrors
// Vincent_Vitale_Resume.docx; edit here only.
export const terminalResume: TerminalResume = {
  name: "Vincent Vitale",
  role: "Full-Stack Software Engineer",
  location: "Temecula, CA",
  email: "Vincent.Vitale87@gmail.com",
  phone: "760-421-2936",
  links: {
    linkedin: "https://linkedin.com/in/vincent-vitale-v",
    github: "https://github.com/vince760",
    site: "https://vincent-vitale.com"
  },
  summary:
    "Full-stack software engineer with 6+ years of experience building production web applications, REST APIs, background-processing systems, and automation platforms with ASP.NET Core, React/Next.js, SQL Server, AWS, and Azure. Designs reliable, message-driven backends and ships dealer- and customer-facing features end to end, from data model to UI. Recently completed an M.S. in Data Science (AI/ML focus), adding applied skills in Python analytics, feature engineering, model evaluation, and ML-backed decision-support systems. U.S. Marine Corps veteran with proven ownership, reliability, and leadership under pressure.",
  experience: [
    {
      org: "DealerVision.com",
      title: "Software Engineer",
      time: "Aug 2025 – Present",
      sub: "Multi-tenant digital showroom & vehicle-merchandising platform serving 600+ dealer websites",
      points: [
        "Architected a Hangfire-based media scheduling platform, approved through Meta's Facebook App Review, that automates image and video publishing across 600+ dealer websites, including page authorization, secure token vaulting, automatic long-lived token refresh, and recurring posting cadences with retry/backoff.",
        "Built ASP.NET Core APIs and Razor features end to end, including view models, DTOs, FluentValidation, Tag Helpers, partial views, and anti-forgery-protected forms, for production dealer-facing workflows.",
        "Built a cross-platform React Native field-service app with custom WebView integrations and native camera capture, on-device SQLite storage, and a background enqueuing system that uploads large media files to AWS S3 in resumable chunks.",
        "Created a Playwright-based web crawler that audits dealer websites for required scripts and components, producing actionable compliance reports at scale.",
        "Designed and optimized SQL Server schemas with EF Core, including primary/foreign-key relationships, filtered and covering indexes, stored procedures, and views, to enforce data integrity and tune real-world query performance.",
        "Built and published an internal AWS Secrets Manager NuGet package to standardize secure configuration loading across .NET applications."
      ]
    },
    {
      org: "OLI Systems",
      title: "Software Engineer",
      time: "Mar 2022 – Jul 2025",
      sub: "Process-modeling solutions for water-chemistry-based industrial applications",
      points: [
        "Engineered a message-driven backend architecture using Hangfire, RabbitMQ, PostgreSQL, and Salesforce integrations to support reliable asynchronous processing and chemical-process automation.",
        "Built and maintained C# and Node.js REST APIs using Entity Framework, Express.js, and reusable service patterns, improving system maintainability and performance.",
        "Delivered C# Azure Function Apps for third-party vendor integrations, improving ingestion reliability and downstream processing.",
        "Built a Svelte admin dashboard for role- and permission-based access control, assigning roles and permissions to client accounts and individual users, with Salesforce as the system of record.",
        "Built Svelte and React interfaces to visualize chemical modeling results, network-usage statistics, and operational metrics.",
        "Automated CI/CD pipelines and managed Kubernetes workloads on AWS using kubectl, with deployment monitoring and production troubleshooting."
      ]
    },
    {
      org: "Outlayr, Inc.",
      title: "Software Developer",
      time: "Dec 2020 – Jan 2022",
      sub: "Commerce platform spanning the payment lifecycle for consumers, merchants, and providers",
      points: [
        "Built React, ASP.NET, Node.js, and SQL Server features for payment-lifecycle and merchant-onboarding workflows, deployed to Azure.",
        "Developed a custom drag-and-drop React UI using open-source component libraries to improve product configuration workflows.",
        "Engineered a web crawler with Selenium, Hangfire, C#, and ASP.NET to automate state-level data collection on a scheduled monthly job, storing results in SQL Server.",
        "Authored end-to-end and component UI tests with Cypress and secured API endpoints with restriction policies; integrated DocuSign PowerForms and built CSV bulk-upload tooling for products, variants, and images."
      ]
    },
    {
      org: "Source 1 Inventory & ForceTracker",
      title: "Full-Stack Developer (Contract)",
      time: "Mar 2020 – Dec 2020",
      sub: "Two short-term full-stack contract engagements (Temecula & Irvine, CA)",
      points: [
        "Built ASP.NET Web API services, SQL Server schemas, and stored procedures, integrating Shopify OAuth via ShopifySharp for vendor and inventory workflows.",
        "Implemented claims-based authentication and authorization in .NET with BCrypt password hashing, and delivered pixel-perfect, responsive React UIs from design mockups using Bootstrap, Formik, and Moment.js."
      ]
    }
  ],
  project: {
    name: "FinSight AI",
    context: "Graduate Capstone · 2026",
    stack: "Next.js, TypeScript, FastAPI, Python, scikit-learn, XGBoost, SHAP, Supabase",
    points: [
      "Built a full-stack financial decision-support application connecting user financial inputs to machine-learning workflows for forecasting, risk prediction, and plain-language guidance.",
      "Developed a Python/FastAPI model service on the Federal Reserve Survey of Consumer Finances dataset, engineering household-finance features, comparing classifiers, and returning calibrated risk scores with ranked SHAP explainability drivers."
    ]
  },
  skills: [
    { label: "languages", items: ["C#", "JavaScript", "TypeScript", "Python", "SQL (T-SQL)"] },
    {
      label: "frontend",
      items: [
        "React",
        "Next.js",
        "Svelte",
        "Razor Pages",
        "Redux",
        "HTML5",
        "CSS3",
        "Bootstrap",
        "Tailwind CSS"
      ]
    },
    { label: "mobile", items: ["React Native", "Expo", "WebView", "native modules", "SQLite"] },
    {
      label: "backend",
      items: [
        "ASP.NET Core",
        ".NET Worker Services",
        "Node.js",
        "Express.js",
        "FastAPI",
        "REST APIs",
        "EF Core",
        "Hangfire",
        "RabbitMQ"
      ]
    },
    {
      label: "databases",
      items: ["SQL Server (SSMS)", "PostgreSQL", "Redis", "Supabase", "MongoDB"]
    },
    {
      label: "cloud",
      items: [
        "AWS (S3, Secrets Manager)",
        "Azure",
        "Azure DevOps",
        "Docker",
        "Kubernetes (kubectl)",
        "CI/CD"
      ]
    },
    {
      label: "integrations",
      items: [
        "Salesforce",
        "OAuth 2.0",
        "claims-based auth",
        "BCrypt",
        "token management",
        "Facebook Graph API",
        "Shopify API"
      ]
    },
    { label: "testing", items: ["Playwright", "Cypress", "Selenium", "Postman", "Git"] },
    {
      label: "ai / ml",
      items: [
        "pandas",
        "scikit-learn",
        "XGBoost",
        "SHAP",
        "classification",
        "regression",
        "forecasting",
        "model evaluation",
        "feature engineering",
        "Jupyter Notebook"
      ]
    }
  ],
  education: [
    {
      deg: "M.S. in Data Science",
      focus: "Artificial Intelligence / Machine Learning focus",
      school: "National University, San Diego, CA",
      time: "May 2026"
    },
    {
      deg: "B.S. in Criminal Justice Administration",
      focus: "",
      school: "University of Phoenix, Murrieta, CA",
      time: "Sep 2015"
    }
  ],
  background:
    "U.S. Marine Corps veteran (2004–2013), Operations Chief / Theater Battle Management Core Systems Operator. Led and trained 250+ Marines, logged 50,000+ combat mission hours, and cut aircraft incident-response time from 13 to 6 minutes across 186 successful missions. Held Secret clearance. Former business owner with staff, payroll, and financial-operations experience."
};
