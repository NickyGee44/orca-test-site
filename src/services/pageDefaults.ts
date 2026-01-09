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
          { label: "Spend audited", value: "$10B+", hint: "Across modes and regions" },
          { label: "Invoices processed / year", value: "Millions", hint: "High-volume enterprise freight" },
          { label: "Typical savings band", value: "3–8%", hint: "From overcharges and leakage" }
        ],
        valueProps: [
          {
            title: "Accuracy",
            description: "100% invoice accuracy through automated audit rules and AI-powered exception detection.",
            icon: "✓"
          },
          {
            title: "Savings",
            description: "Identify overcharges, duplicate billing, and contract violations—typically 3–8% of freight spend.",
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
        services: [
          {
            title: "Freight Audit",
            description: "Automated invoice validation against contracts, rates, and historical patterns.",
            link: "/product"
          },
          {
            title: "Freight Payment",
            description: "Streamlined payables workflow with automated approvals and exception handling.",
            link: "/product"
          },
          {
            title: "Analytics & Reporting",
            description: "Self-serve dashboards, benchmarking, and trend analysis across your network.",
            link: "/ai"
          },
          {
            title: "Claims & Exceptions",
            description: "AI-flagged discrepancies with resolution workflows and carrier communication.",
            link: "/product"
          },
          {
            title: "Invoice Management",
            description: "Centralized invoice processing, GL coding, and accrual management.",
            link: "/product"
          }
        ],
        testimonials: [
          {
            quote: "Orca identified $2.3M in overcharges in our first quarter. The AI-powered exception detection is game-changing.",
            author: "VP of Logistics",
            company: "Fortune 500 Retailer"
          },
          {
            quote: "We've reduced invoice processing time by 60% and eliminated manual audit work. Orca's analytics help us make better carrier decisions.",
            author: "Director of Supply Chain",
            company: "Global Manufacturer"
          }
        ],
        trustBadges: [
          { label: "Fortune 500" },
          { label: "Enterprise" },
          { label: "Global" },
          { label: "Retail" },
          { label: "Manufacturing" },
          { label: "E-commerce" }
        ],
        certifications: [
          { label: "SOC 2", badge: "Compliant" },
          { label: "ISO", badge: "Certified" },
          { label: "Secure", badge: "Enterprise-grade security" }
        ],
        timeline: [
          { year: "2014", title: "Founded", description: "Orca launched with a mission to make freight audit accurate, automated, and accessible." },
          { year: "2017", title: "$1B audited", description: "Reached our first billion in audited freight spend, proving the value of systematic audit." },
          { year: "2020", title: "AI engine launched", description: "Introduced Orca Intelligence, bringing machine learning to freight audit and analytics." },
          { year: "2024", title: "$10B+ audited", description: "Celebrating 10 years and $10B+ in audited spend, now powered by next-generation AI." }
        ],
        finalCTA: {
          title: "Ready to transform your freight audit process?",
          description: "Join leading enterprises who trust Orca to audit millions of invoices and surface actionable insights—all powered by AI and a decade of freight data.",
          ctaPrimary: "Book a demo",
          ctaSecondary: "See customer results",
          ctaPrimaryLink: "/contact",
          ctaSecondaryLink: "/results",
          note: "No credit card required • Free analysis of your freight spend • Enterprise-ready security"
        },
        anniversaryBanner: {
          text: "Celebrating 10 years of freight audit innovation"
        },
        heroImage: {
          imageUrl: "/images/home-hero.png",
          alt: "Freight and logistics team collaborating at a port",
          layout: "contained"
        },
        trustedOperations: {
          image: {
            imageUrl: "/images/placeholders/home-business-logistics.jpg",
            alt: "Logistics and finance teams collaborating on freight operations",
            layout: "contained"
          },
          trustStatements: [
            "Enterprise-grade security and compliance",
            "Bank-level payment controls and audit trails",
            "10 years of proven freight audit expertise"
          ],
          metrics: [
            { label: "Invoices processed", value: "Millions", hint: "Annually" },
            { label: "Global coverage", value: "185+", hint: "Countries" }
          ]
        }
      };

    case "solutions":
      return {
        hero: {
          title: "Solutions for every team and freight mode",
          description: "Orca adapts to your organization's needs—whether you're in finance, logistics, or procurement, and whether you ship LTL, FTL, parcel, or ocean/air."
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
            description: "Audit LTL invoices for accurate class, weight, and accessorial charges.",
            benefits: ["Class verification", "Weight audits", "Accessorial validation"],
            example: "Typical savings: 4–7% of LTL spend"
          },
          {
            title: "FTL (Full-Truckload)",
            description: "Validate FTL rates against contracts and detect fuel surcharge variance.",
            benefits: ["Rate validation", "Fuel surcharge audits", "Route optimization"],
            example: "Typical savings: 3–6% of FTL spend"
          },
          {
            title: "Parcel",
            description: "Catch dimensional weight errors, zone misclassifications, and surcharge overcharges.",
            benefits: ["DIM weight audits", "Zone validation", "Surcharge detection"],
            example: "Typical savings: 5–10% of parcel spend"
          },
          {
            title: "Ocean & Air",
            description: "Audit international freight for accurate rates, surcharges, and documentation fees.",
            benefits: ["Rate compliance", "Surcharge validation", "Documentation audits"],
            example: "Typical savings: 2–5% of international spend"
          }
        ],
        modeImages: [
          {
            imageUrl: "/images/placeholders/solutions-truck.jpg",
            alt: "Freight transportation modes",
            layout: "contained"
          }
        ],
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
        modules: [
          {
            title: "Freight Audit & Payment",
            description: "100% invoice accuracy through automated audit rules and AI-powered exception detection. Streamlined payables workflow with automated approvals.",
            features: ["Automated invoice validation", "Contract and rate compliance", "Exception flagging", "Automated payment workflows"],
            preview: "Ledger view with audit status, exceptions, and payment queue"
          },
          {
            title: "Claims & Exceptions",
            description: "AI-flagged discrepancies with resolution workflows and carrier communication. Track exceptions from detection to resolution.",
            features: ["AI-powered exception detection", "Resolution workflows", "Carrier communication", "Audit trails"],
            preview: "Exceptions center with flagged invoices, status, and actions"
          },
          {
            title: "Invoice Management & Accounting",
            description: "Centralized invoice processing, GL coding, and accrual management. Improve invoice workflows and projections.",
            features: ["Centralized invoice processing", "Automated GL coding", "Accrual management", "Lane/cost breakdowns"],
            preview: "Invoice dashboard with GL codes, accruals, and cost analysis"
          },
          {
            title: "Analytics & Reporting",
            description: "Self-serve dashboards, benchmarking, and trend analysis. Real-time visibility into freight spend and performance.",
            features: ["Real-time dashboards", "Self-serve reports", "Benchmarking", "Trend analysis"],
            preview: "Analytics library with customizable reports and benchmarks"
          }
        ],
        integrations: {
          title: "Integrations & data",
          description: "Orca integrates with your existing systems—TMS, ERP, warehouse management—to ingest freight data seamlessly and keep your audit always-on.",
          items: ["TMS", "ERP", "WMS", "Carrier APIs", "EDI"]
        },
        outcomes: [
          "60% reduction in invoice processing time",
          "3–8% savings from overcharge detection",
          "95% fewer disputes with automated audit trails"
        ],
        finalCTA: {
          title: "Request a platform demo",
          ctaPrimary: "Request a platform demo",
          ctaPrimaryLink: "/contact"
        },
        integrationImage: {
          imageUrl: "/images/placeholders/product-integrations.jpg",
          alt: "System integrations",
          layout: "contained"
        }
      };

    case "ai":
      return {
        hero: {
          badge: "Orca Intelligence",
          title: "AI that learns your freight patterns",
          description: "Orca Intelligence uses machine learning to detect anomalies, surface patterns, and recommend actions—all grounded in 10 years of freight audit data."
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
        dataFoundation: [
          {
            title: "10-year history advantage",
            description: "Orca has audited $10B+ in freight spend across millions of invoices, creating a rich dataset that powers our AI models. This historical context helps us identify patterns and anomalies that would be invisible to rule-based systems alone."
          },
          {
            title: "Consistent, normalized data",
            description: "All freight data—from invoices to carrier contracts to shipment details—is normalized and structured consistently. This enables accurate pattern detection, benchmarking, and trend analysis across your entire network."
          }
        ],
        trustSecurity: [
          {
            title: "Data handling",
            description: "Enterprise-grade encryption, secure data storage, and SOC 2 compliance."
          },
          {
            title: "Permissions",
            description: "Role-based access control so teams see only the data they need."
          },
          {
            title: "Auditability",
            description: "Complete audit trails for all AI decisions and recommendations."
          }
        ],
        finalCTA: {
          title: "Ready to see Orca Intelligence in action?",
          description: "See how AI-powered freight audit can transform your operations.",
          ctaPrimary: "Book a demo",
          ctaPrimaryLink: "/contact"
        },
        heroBackgroundImage: {
          imageUrl: "/images/placeholders/ai-datacenter.jpg",
          alt: "Data infrastructure",
          layout: "full-width"
        },
        architectureImage: {
          imageUrl: "/images/placeholders/ai-architecture.jpg",
          alt: "AI architecture",
          layout: "contained"
        }
      };

    case "results":
      return {
        hero: {
          title: "Results that speak for themselves",
          description: "10 years of audited spend. Here's what that looks like in outcomes for our customers."
        },
        caseStudies: [
          {
            title: "Fortune 500 Retailer",
            problem: "Manual freight audit process couldn't scale with growing volume. Overcharges going undetected.",
            approach: "Implemented Orca's automated audit platform with AI-powered exception detection across LTL and parcel networks.",
            results: [
              "$2.3M in overcharges identified in first quarter",
              "60% reduction in invoice processing time",
              "95% reduction in manual audit work"
            ],
            quote: "Orca identified $2.3M in overcharges in our first quarter. The AI-powered exception detection is game-changing.",
            author: "VP of Logistics"
          },
          {
            title: "Global Manufacturer",
            problem: "Lack of visibility into freight spend and carrier performance. No systematic way to catch billing errors.",
            approach: "Deployed Orca for end-to-end freight audit, payment, and analytics across FTL and ocean freight.",
            results: [
              "4.2% average savings on audited spend",
              "Real-time visibility into freight costs",
              "Improved carrier performance tracking"
            ],
            quote: "We've reduced invoice processing time by 60% and eliminated manual audit work. Orca's analytics help us make better carrier decisions.",
            author: "Director of Supply Chain"
          },
          {
            title: "E-commerce Distributor",
            problem: "High parcel spend with frequent dimensional weight and zone misclassifications. No audit process in place.",
            approach: "Integrated Orca's parcel audit capabilities with existing shipping systems for real-time validation.",
            results: [
              "7.5% savings on parcel spend",
              "Automated dimensional weight audits",
              "Zone misclassification detection"
            ],
            quote: "Orca caught thousands in overcharges we never would have found. The ROI was immediate.",
            author: "Head of Operations"
          }
        ],
        aggregateMetrics: [
          { label: "Spend audited", value: "$10B+", hint: "Across all modes and regions" },
          { label: "Invoices processed", value: "Millions", hint: "Per year, high-volume enterprise freight" },
          { label: "Average savings", value: "3–8%", hint: "Typical range from overcharge detection" }
        ],
        finalCTA: {
          title: "See how Orca can help your organization",
          ctaPrimary: "See how Orca can help your organization",
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
            imageUrl: "/images/placeholders/results-ecommerce.jpg",
            alt: "E-commerce fulfillment",
            layout: "contained"
          }
        ]
      };

    case "about":
      return {
        hero: {
          title: "About Orca",
          description: "Ten years of freight audit expertise, now enhanced with AI-powered analytics and automation."
        },
        story: [
          "Orca was founded in 2014 with a simple mission: make freight audit accurate, automated, and accessible. At the time, most shippers relied on manual processes or outsourced audit services that were slow, expensive, and inconsistent.",
          "Over the next decade, we built a platform that automated freight audit at scale—processing millions of invoices and auditing billions in freight spend. We learned the patterns, the exceptions, and the opportunities hidden in freight data.",
          "Today, Orca is Freight Audit & Analytics AI. We combine a decade of freight audit expertise with next-generation AI to help shippers catch overcharges, surface patterns, and make confident decisions. The mission remains the same: accuracy, transparency, and partnership in every audit."
        ],
        timeline: [
          { year: "2014", title: "Founded", description: "Orca launched with a mission to make freight audit accurate, automated, and accessible." },
          { year: "2017", title: "$1B audited", description: "Reached our first billion in audited freight spend, proving the value of systematic audit." },
          { year: "2020", title: "AI engine launched", description: "Introduced Orca Intelligence, bringing machine learning to freight audit and analytics." },
          { year: "2024", title: "$10B+ audited", description: "Celebrating 10 years and $10B+ in audited spend, now powered by next-generation AI." }
        ],
        values: [
          {
            title: "Accuracy",
            description: "We believe freight audit should be 100% accurate. Every invoice matters, every overcharge counts."
          },
          {
            title: "Transparency",
            description: "Clear audit trails, explainable AI decisions, and full visibility into your freight spend."
          },
          {
            title: "Partnership",
            description: "We work alongside your team, not as a vendor but as a partner in optimizing your freight operations."
          },
          {
            title: "Innovation",
            description: "From manual audit to AI-powered analytics—we're always evolving to deliver more value."
          }
        ],
        responsibility: {
          title: "Responsibility",
          paragraphs: [
            "Orca is committed to responsible data handling, security, and sustainability. We help shippers optimize their freight networks, which can reduce emissions and improve efficiency across supply chains.",
            "Our platform includes tools to help you understand the environmental impact of your freight decisions, including carbon footprint analysis and mode optimization recommendations."
          ]
        },
        finalCTA: {
          title: "Partner with Orca",
          ctaPrimary: "Partner with Orca",
          ctaPrimaryLink: "/contact"
        },
        teamImages: [
          {
            imageUrl: "/images/placeholders/about-team.jpg",
            alt: "Orca team",
            layout: "contained"
          }
        ],
        timelineImage: {
          imageUrl: "/images/placeholders/about-timeline.jpg",
          alt: "Orca timeline",
          layout: "full-width"
        }
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
