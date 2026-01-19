/**
 * Default content for each page type
 * These defaults are used when no CMS content exists, ensuring pages always have content
 */

import type { PageContent } from "../types/content";

export function getDefaultContentForPage(pageId: string): PageContent["sections"] {
  switch (pageId) {
    case "homepage":
      return {
        hero: {
          title: "Turn a decade of freight data into always-on audit and insight.",
          description: "Orca connects freight audit, payment, and analytics into a single AI-assisted platform—so you catch overcharges, surface patterns, and make confident decisions in days, not months.",
          ctaPrimary: "Book a demo",
          ctaSecondary: "Explore the platform",
          badge: "Freight Audit & Analytics AI"
        },
        metrics: [
          { label: "Audited spend", value: "Billions+", hint: "Across modes and regions" },
          { label: "Invoices processed each year", value: "Millions", hint: "High-volume enterprise freight" },
          { label: "Typical savings", value: "3–8%", hint: "From overcharges and leakage" }
        ],
        whyAuditTitle: "Why audit your freight?",
        whyAuditSubtitle: "Accurate freight audit with enhanced AI data-driven analytics from 10+ years of award-winning experts",
        valueProps: [
          {
            title: "Accuracy",
            description: "100% invoice accuracy through automated audit rules and AI-powered exception detection.",
            icon: "✓"
          },
          {
            title: "Savings",
            description: "Identify overcharges, duplicate billing, and contract violations with dispute resolution experts.",
            icon: "$"
          },
          {
            title: "Visibility",
            description: "Real-time dashboards, lane-level analytics, and benchmarking against industry norms.",
            icon: "📊"
          },
          {
            title: "Compliance",
            description: "Automated GL coding, accrual management, and audit trails for finance and procurement teams.",
            icon: "🔒"
          }
        ],
        servicesTitle: "How we help your enterprise",
        services: [
          {
            title: "Freight Audit",
            description: "Automated invoice validation against contracts, rates, and shipment details",
            link: "/product"
          },
          {
            title: "Freight Payment",
            description: "Streamlined payables workflow with approvals and exception handling",
            link: "/product"
          },
          {
            title: "Analytics & Reporting",
            description: "Custom and self-serve dashboards, benchmarking, and trend analysis across your network",
            link: "/ai"
          },
          {
            title: "Claims & Exceptions",
            description: "AI-flagged discrepancies with resolution workflows and carrier communication",
            link: "/product"
          },
          {
            title: "Invoice Management",
            description: "Centralized invoice processing, GL coding, and accrual management",
            link: "/product"
          }
        ],
        // Testimonials removed - no real customer names available
        testimonials: [],
        trustBadges: [
          { label: "Fortune 500" },
          { label: "Enterprise" },
          { label: "Global" },
          { label: "Retail" },
          { label: "Manufacturing" },
          { label: "E-commerce" }
        ],
        // Certifications consolidated into trustedOperations
        certifications: [],
        timeline: [
          { year: "2016", title: "Founded", description: "Orca launched with a mission to make freight audit accurate, automated, and accessible." },
          { year: "2024", title: "Business of the Year", description: "Winner of London Chamber of Commerce Business of the Year – Medium category." },
          { year: "2024", title: "Billions+ audited", description: "Reached billions in audited freight spend across enterprise shippers worldwide." }
        ],
        finalCTA: {
          title: "Join leading enterprise supply chain and finance experts who trust Orca to support their day-to-day impact on their organization",
          description: "",
          ctaPrimary: "Book a demo",
          ctaSecondary: "See customer results",
          ctaPrimaryLink: "/contact",
          ctaSecondaryLink: "/results",
          note: "No credit card required • Free analysis of your freight spend • Enterprise-ready security"
        },
        anniversaryBanner: {
          text: "Trustworthy, reliable and innovative data-driven insights for over 10 years"
        },
        heroImage: {
          imageUrl: "/images/home-hero2.png",
          alt: "Supply chain and logistics technology concept",
          layout: "contained"
        },
        trustedOperations: {
          title: "Trusted by Top Retail Enterprises",
          image: {
            imageUrl: "/images/placeholders/home-business-logistics.jpg",
            alt: "Logistics and finance teams collaborating on freight operations",
            layout: "contained"
          },
          trustStatements: [
            "SOC2 and ISO Certified",
            "Enterprise-grade security",
            "Bank-level payment controls and audit trails"
          ],
          metrics: [
            { label: "Global coverage", value: "185+", hint: "Countries" }
          ]
        },
        aiSection: {
          title: "Freight insights through AI and machine learning",
          bullets: [
            "Detects anomalies, surfaces patterns, and provides recommendations to action",
            "Identify duplicate billing, unexpected surcharges, and lane variances",
            "Empower carrier renegotiations and mode optimization opportunities with enhanced data",
            "Instant insights through natural language exploration"
          ],
          ctaText: "AI & Data",
          ctaLink: "/ai"
        },
        insightsTitle: "Insights that matter"
      };

    case "solutions":
      return {
        hero: {
          title: "Solutions for every team and freight mode",
          description: "Adaptable to your organization's needs—whether you're in finance, logistics, or procurement, and whether you ship LTL, FTL, parcel, or ocean/air."
        },
        roles: [
          {
            title: "Finance",
            description: "Accurate accruals, eliminate overpayments, cleaner GL, stronger forecasting.",
            benefits: ["100% invoice accuracy", "Automated GL coding", "Real-time accrual management", "Audit-ready reporting"],
            metric: "Reduce freight payables errors by 95%",
            icon: "💰"
          },
          {
            title: "Logistics",
            description: "Carrier performance, exception reduction, smoother operations.",
            benefits: ["Exception management", "Carrier performance tracking", "Lane-level insights", "Operational efficiency"],
            metric: "Cut exception processing time by 60%",
            icon: "🚚"
          },
          {
            title: "Procurement",
            description: "Benchmarks, sourcing intelligence, contract compliance.",
            benefits: ["Contract compliance monitoring", "Benchmarking vs market", "Renegotiation intelligence", "Carrier mix optimization"],
            metric: "Identify 3–8% savings opportunities",
            icon: "📊"
          }
        ],
        modes: [
          {
            title: "LTL (Less-Than-Truckload)",
            description: "Can't fill a whole truckload? Make sure your LTL fees are as low as possible.",
            benefits: ["Class verification", "Weight audits", "Accessorial validation"],
            example: "Typical savings: 4–7%"
          },
          {
            title: "FTL (Full-Truckload)",
            description: "Do you know if your lanes are hindering your bottom line?",
            benefits: ["Rate validation", "Fuel surcharge audits", "Route optimization"],
            example: "Typical savings: 3–6%"
          },
          {
            title: "Parcel",
            description: "Extra charges adding up?",
            benefits: ["DIM weight audits", "Zone validation", "Surcharge detection"],
            example: "Typical savings: 5–10%"
          },
          {
            title: "Ocean & Air",
            description: "Documentation for extra costs slipping through the cracks?",
            benefits: ["Rate compliance", "Surcharge validation", "Documentation audits"],
            example: "Typical savings: 2–5%"
          }
        ],
        // Image removed per feedback - breaks up text unnecessarily
        modeImages: [],
        finalCTA: {
          title: "Talk to us about your network",
          description: "Every freight network is unique. Let's discuss how Orca can support your specific needs.",
          ctaPrimary: "Get started",
          ctaPrimaryLink: "/contact"
        }
      };

    case "product":
      return {
        hero: {
          title: "The Orca Platform",
          description: "A unified platform for freight audit, payment, and analytics—all in one place, powered by AI and a decade of freight data."
        },
        // Outcomes moved to top per feedback
        outcomes: [
          "60% reduction in invoice processing time",
          "3–8% savings from overcharge detection",
          "95% fewer disputes with automated audit trails"
        ],
        modules: [
          {
            title: "Freight Audit & Payment",
            description: "We validate every invoice so you never overpay",
            features: ["100% invoice accuracy", "Built-in approval thresholds", "AI-powered audit rules and exception detection", "Streamlined payables workflow"],
            icon: "✓"
          },
          {
            title: "Claims & Exceptions",
            description: "We catch discrepancies and resolve them for you",
            features: ["AI-powered exception detection", "Resolution workflows", "Carrier communication", "Audit trails"],
            icon: "⚡"
          },
          {
            title: "Invoice Management & Accounting",
            description: "We simplify your freight accounting workflow",
            features: ["Centralized invoice processing", "Automated GL coding", "Accrual management", "Forecasting and projections"],
            icon: "📋"
          },
          {
            title: "Analytics & Reporting",
            description: "We surface insights so you can act with confidence",
            features: ["Real-time dashboards", "Self-serve reports", "Benchmarking", "Trend analysis"],
            icon: "📊"
          }
        ],
        // Integrations section REMOVED per feedback - no actual API integrations exist
        integrations: null,
        finalCTA: {
          title: "Request a platform demo",
          ctaPrimary: "Request a platform demo",
          ctaPrimaryLink: "/contact"
        },
        integrationImage: null
      };

    case "ai":
      return {
        hero: {
          // Badge removed per feedback - no "Orca Intelligence" branding
          badge: "",
          title: "AI that learns your freight patterns",
          description: "Machine learning provides deep analysis into your network and billions of freight audit spend."
        },
        capabilities: [
          {
            title: "Pattern detection",
            description: "Identify duplicate billing, unexpected surcharges, and lane variance automatically.",
            examples: ["Duplicate invoice detection", "Fuel surcharge variance alerts", "Lane cost anomaly detection"],
            icon: "🔍"
          },
          {
            title: "Anomaly detection",
            description: "Flag invoices that deviate from historical patterns or contract terms.",
            examples: ["Unexpected accessorial charges", "Rate violations", "Weight/class discrepancies"],
            icon: "⚡"
          },
          {
            title: "Recommendations",
            description: "Surface renegotiation targets, carrier mix shifts, and mode optimization opportunities.",
            examples: ["Carrier contract renegotiation targets", "Mode shift opportunities", "Carrier performance insights"],
            icon: "💡"
          }
        ],
        // Data foundation moved out of box as page header, split into two buckets
        dataFoundationTitle: "Data foundation",
        dataFoundation: [
          {
            title: "10+ year history advantage",
            description: "Orca has audited billions in freight spend across millions of invoices, creating a rich dataset that powers our AI models. This historical context helps us identify patterns and anomalies that would be invisible to rule-based systems alone."
          },
          {
            title: "Consistent, normalized data",
            description: "All freight data—from invoices to carrier contracts to shipment details—is normalized and structured consistently. This enables accurate pattern detection, benchmarking, and trend analysis across your entire network."
          }
        ],
        // Trust, security, governance - same font size as capabilities per feedback
        trustSecurity: [
          {
            title: "Trust",
            description: "Enterprise-grade encryption, secure data storage, and SOC 2 compliance.",
            icon: "🔒"
          },
          {
            title: "Security",
            description: "Role-based access control so teams see only the data they need.",
            icon: "🛡️"
          },
          {
            title: "Governance",
            description: "Complete audit trails for all AI decisions and recommendations.",
            icon: "📋"
          }
        ],
        finalCTA: {
          title: "Ready to see AI-powered freight audit in action?",
          description: "See how AI-powered freight audit can transform your operations.",
          ctaPrimary: "Book a demo",
          ctaPrimaryLink: "/contact"
        },
        // Images removed per feedback
        heroBackgroundImage: null,
        architectureImage: null
      };

    case "results":
      return {
        hero: {
          title: "Results that speak for themselves",
          description: "Years of audited spend. Here's what that looks like in outcomes for our customers."
        },
        // Case studies with vague customer descriptions (no specific client names)
        caseStudies: [
          {
            title: "Fortune 500 Retailer",
            problem: "Manual freight audit process couldn't scale with growing volume. Overcharges going undetected.",
            approach: "Implemented Orca's automated audit platform with AI-powered exception detection across LTL and parcel networks.",
            results: [
              "Millions in overcharges identified in first year",
              "60% reduction in invoice processing time",
              "95% reduction in manual audit work"
            ],
            // Quote removed - no real customer names
            quote: "",
            author: ""
          },
          {
            title: "Global Manufacturer",
            problem: "Lack of visibility into freight spend and carrier performance. No systematic way to catch billing errors.",
            approach: "Deployed Orca for end-to-end freight audit, payment, and analytics across FTL and ocean freight.",
            results: [
              "Significant savings on audited spend",
              "Real-time visibility into freight costs",
              "Improved carrier performance tracking"
            ],
            quote: "",
            author: ""
          },
          {
            title: "E-commerce Distributor",
            problem: "High parcel spend with frequent dimensional weight and zone misclassifications. No audit process in place.",
            approach: "Integrated Orca's parcel audit capabilities with existing shipping systems for real-time validation.",
            results: [
              "Substantial savings on parcel spend",
              "Automated dimensional weight audits",
              "Zone misclassification detection"
            ],
            quote: "",
            author: ""
          }
        ],
        aggregateMetrics: [
          { label: "Spend audited", value: "Billions+", hint: "Across all modes and regions" },
          { label: "Invoices processed", value: "Millions", hint: "Per year, high-volume enterprise freight" },
          { label: "Average savings", value: "3–8%", hint: "Typical range from overcharge detection" }
        ],
        finalCTA: {
          title: "See how Orca can help your organization",
          ctaPrimary: "Contact us now",
          ctaPrimaryLink: "/contact"
        },
        caseStudyImages: [
          {
            imageUrl: "/images/placeholders/results-fulfillment.jpg",
            alt: "Retail distribution",
            layout: "contained"
          },
          {
            imageUrl: "/images/placeholders/results-manufacturing.jpg",
            alt: "Manufacturing operations",
            layout: "contained"
          },
          {
            imageUrl: "/images/parcel.png",
            alt: "E-commerce parcel fulfillment",
            layout: "contained"
          }
        ]
      };

    case "about":
      return {
        hero: {
          title: "About Orca",
          // Removed "now" per feedback
          description: "Ten years of freight audit expertise, enhanced with AI-powered analytics and automation."
        },
        story: [
          "Orca was founded in 2016 with a simple mission: make freight audit accurate, automated, and accessible. At the time, most shippers relied on manual processes or outsourced audit services that were slow, expensive, and inconsistent.",
          "Over the years, we built a platform that automated freight audit at scale—processing millions of invoices and auditing billions in freight spend. We learned the patterns, the exceptions, and the opportunities hidden in freight data.",
          "Today, Orca is Freight Audit & Analytics AI. We combine years of freight audit expertise with next-generation AI to help shippers catch overcharges, surface patterns, and make confident decisions. The mission remains the same: accuracy, transparency, and partnership in every audit."
        ],
        timeline: [
          { year: "2016", title: "Founded", description: "Orca launched with a mission to make freight audit accurate, automated, and accessible." },
          { year: "2024", title: "Business of the Year", description: "Winner of London Chamber of Commerce Business of the Year – Medium category." },
          { year: "2024", title: "Billions+ audited", description: "Reached billions in audited freight spend across enterprise shippers worldwide." }
        ],
        // Values - same layout as homepage valueProps per feedback
        values: [
          {
            title: "Accuracy",
            description: "We believe freight audit should be 100% accurate. Every invoice matters, every overcharge counts.",
            icon: "✓"
          },
          {
            title: "Transparency",
            description: "Clear audit trails, explainable AI decisions, and full visibility into your freight spend.",
            icon: "📊"
          },
          {
            title: "Partnership",
            description: "We work alongside your team, not as a vendor but as a partner in optimizing your freight operations.",
            icon: "🤝"
          },
          {
            title: "Innovation",
            description: "From manual audit to AI-powered analytics—we're always evolving to deliver more value.",
            icon: "💡"
          },
          // Responsibility moved to same size as other values per feedback
          {
            title: "Responsibility",
            description: "Committed to responsible data handling, security, and sustainability. We help optimize freight networks to reduce emissions and improve efficiency.",
            icon: "🌱"
          }
        ],
        // Responsibility section removed - now part of values grid
        responsibility: null,
        finalCTA: {
          title: "Partner with Orca",
          ctaPrimary: "Partner with Orca",
          ctaPrimaryLink: "/contact"
        },
        teamImages: [
          {
            imageUrl: "/images/mattmarco.png",
            alt: "Matt & Marco - Orca Leadership",
            layout: "contained"
          }
        ],
        timelineImage: null
      };

    case "contact":
      return {
        hero: {
          title: "Book a demo",
          description: "Tell us a bit about your network and goals. We'll follow up with a focused walkthrough of Orca tailored to your freight profile."
        },
        whatHappensNext: [
          "We'll review your freight profile",
          "Schedule a 30-minute demo tailored to your needs",
          "Discuss how Orca can help your organization"
        ],
        contactInfo: {
          email: "info@orcaaudit.com",
          supportEmail: "support@orcaaudit.com",
          phone: "+1 (800) 555-1234"
        },
        testimonial: {
          quote: "Orca identified $2.3M in overcharges in our first quarter. The AI-powered exception detection is game-changing.",
          author: "VP of Logistics",
          company: "Fortune 500 Retailer"
        }
      };

    case "resources":
      return {
        heroImage: {
          imageUrl: "/images/placeholders/news-hero.jpg",
          alt: "News & Insights",
          layout: "full-width"
        }
      };

    default:
      return {};
  }
}
