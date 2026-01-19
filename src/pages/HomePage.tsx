import { useEffect, useState } from "react";
import { usePageMetadata } from "../hooks/usePageMetadata";
import { usePageContent } from "../hooks/usePageContent";
import { HeroVisual } from "../components/HeroVisual";
import { LaptopMockup } from "../components/LaptopMockup";
import { DesktopMockup } from "../components/DesktopMockup";
import { TrustedOperations } from "../components/TrustedOperations";
import { ImageBlock } from "../components/ImageBlock";
import { trackCTAClick } from "../utils/analytics";
import { getAllImages } from "../services/imageService";
import type { HeroSection, MetricSection, ImageSection, MockupSection, ValuePropSection, ServiceSection, TestimonialSection, TrustBadgeSection, TimelineItemSection, CTASection } from "../types/content";

export function HomePage() {
  usePageMetadata({
    title: "Orca – Freight Audit & Analytics AI | Reduce Shipping Costs",
    description:
      "Reduce freight costs by 3-8% with Orca's AI-powered freight audit and payment platform. Catch overcharges, surface patterns, and optimize your supply chain spend."
  });

  const { getSection } = usePageContent({
    pageId: "homepage"
  });

  const hero = getSection<HeroSection>("hero", { title: "", description: "", ctaPrimary: "", ctaSecondary: "", badge: "" });
  const metrics = getSection<MetricSection[]>("metrics", []);
  const valueProps = getSection<ValuePropSection[]>("valueProps", []);
  const services = getSection<ServiceSection[]>("services", []);
  const testimonials = getSection<TestimonialSection[]>("testimonials", []);
  const trustBadges = getSection<TrustBadgeSection[]>("trustBadges", []);
  const certifications = getSection<TrustBadgeSection[]>("certifications", []);
  const timeline = getSection<TimelineItemSection[]>("timeline", []);
  const finalCTA = getSection<CTASection>("finalCTA", { title: "", description: "", ctaPrimary: "", ctaPrimaryLink: "", ctaSecondary: "", ctaSecondaryLink: "", note: "" });
  const anniversaryBanner = getSection<{ text: string }>("anniversaryBanner", { text: "" });
  const images = getSection<ImageSection[]>("images", []);
  const mockups = getSection<MockupSection[]>("mockups", []);
  const heroImage = getSection<ImageSection>("heroImage", {});
  const trustedOperations = getSection<{
    image?: ImageSection;
    trustStatements?: string[];
    metrics?: MetricSection[];
  }>("trustedOperations", {});

  // Prefer a stable, repo-hosted hero image (no admin panel required).
  // Put the file at: public/images/home-hero.png
  const FIXED_HERO_IMAGE_URL = "/images/home-hero.png";
  const [fixedHeroOk, setFixedHeroOk] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const img = new Image();
    img.onload = () => setFixedHeroOk(true);
    img.onerror = () => setFixedHeroOk(false);
    img.src = FIXED_HERO_IMAGE_URL;
  }, []);

  // If heroImage is still a placeholder, prefer the fixed hero image.
  // If the fixed file isn't present yet, fall back to the newest uploaded image (localStorage).
  const uploadedImages =
    typeof window !== "undefined" ? getAllImages() : [];
  const newestUploaded =
    uploadedImages
      .slice()
      .sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      )[0] || null;

  const isPlaceholderHero =
    !heroImage?.imageUrl ||
    heroImage.imageUrl.startsWith("/images/placeholders/");

  const resolvedHeroImage: ImageSection = !isPlaceholderHero
    ? heroImage
    : fixedHeroOk !== false
      ? {
          imageUrl: FIXED_HERO_IMAGE_URL,
          alt: "Freight and logistics team collaborating at a port",
          layout: "contained"
        }
      : newestUploaded
        ? {
            imageUrl: newestUploaded.url,
            alt: newestUploaded.alt || "Hero image",
            layout: "contained"
          }
        : heroImage;

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* 10-year anniversary banner */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-cyan-200 shadow-orca-glow-cyan">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-orca-glow-cyan" />
          {anniversaryBanner.text}
        </div>
      </div>

      {/* Hero section */}
      <section className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-depth-3 sm:p-8" style={{ zIndex: 1 }}>
        {hero.badge && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-cyan-200">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-orca-glow-cyan" />
            {hero.badge}
        </div>
        )}
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-center">
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl md:text-4xl">
              {hero.title}
            </h1>
            <p className="text-sm text-slate-300 md:text-base">
              {hero.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {hero.ctaPrimary && (
              <a
                href="/contact"
                onClick={() => trackCTAClick("Book a demo", "homepage_hero")}
                className="rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-xs font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple"
              >
                  {hero.ctaPrimary}
              </a>
              )}
              {hero.ctaSecondary && (
              <a
                href="/product"
                className="rounded-full border border-slate-700 bg-slate-900/40 px-4 py-2 text-xs font-medium text-slate-200 hover:border-slate-500 hover:text-slate-50"
              >
                  {hero.ctaSecondary}
              </a>
              )}
            </div>
          </div>
          <div className="relative">
            {resolvedHeroImage?.imageUrl ? (
              <ImageBlock
                imageUrl={resolvedHeroImage.imageUrl}
                alt={resolvedHeroImage.alt || "Professional diverse businessmen and freight people"}
                layout="contained"
                overlay={false}
                className="rounded-panel"
              />
            ) : (
              <HeroVisual />
            )}
          </div>
        </div>
      </section>

      {/* Metrics row */}
      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-tile border border-slate-800/70 bg-slate-950/60 p-4 shadow-orca-panel"
          >
            <div className="text-[11px] uppercase tracking-wide text-slate-400">
              {metric.label}
            </div>
            <div className="mt-1 text-xl font-semibold text-slate-50">
              {metric.value}
            </div>
            <div className="mt-1 text-[12px] text-slate-400">{metric.hint}</div>
          </div>
        ))}
      </section>

      {/* Why audit your freight? value props */}
      {valueProps && valueProps.length > 0 && (
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
              {getSection<{ whyAuditTitle?: string }>("whyAuditTitle", { whyAuditTitle: "Why audit your freight?" }).whyAuditTitle || "Why audit your freight?"}
            </h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              {getSection<{ whyAuditSubtitle?: string }>("whyAuditSubtitle", { whyAuditSubtitle: "Accurate freight audit with enhanced AI data-driven analytics from 10+ years of award-winning experts" }).whyAuditSubtitle || "Accurate freight audit with enhanced AI data-driven analytics from 10+ years of award-winning experts"}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-5 shadow-orca-panel transition hover:border-slate-700/50"
              >
                <div className="mb-3 flex items-center gap-3">
                  {prop.icon && <span className="text-2xl text-cyan-400">{prop.icon}</span>}
                  <h3 className="text-base font-semibold text-slate-50">
                    {prop.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-300">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trusted Operations section */}
      {trustedOperations && (trustedOperations.image?.imageUrl || trustedOperations.trustStatements?.length || trustedOperations.metrics?.length) && (
        <TrustedOperations
          title={(trustedOperations as { title?: string }).title || "Trusted by Top Retail Enterprises"}
          image={trustedOperations.image}
          trustStatements={trustedOperations.trustStatements}
          metrics={trustedOperations.metrics}
        />
      )}

      {/* How we help your enterprise - services overview */}
      {services && services.length > 0 && (
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
              How we help your enterprise
            </h2>
            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              End-to-end freight audit and analytics, from invoice ingestion to actionable insights
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <a
                key={idx}
                href={service.link || "#"}
                className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-5 shadow-orca-panel transition hover:border-cyan-500/30 hover:shadow-orca-glow-cyan"
              >
                <h3 className="mb-2 text-lg font-semibold text-slate-50">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-300">
                  {service.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Product preview - keeping as component for now, can be migrated later */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
            Insights that matter
          </h2>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            A unified platform for freight audit, payment, and analytics—all in one place
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-50">
                Dashboard overview
              </h3>
              <span className="rounded-full bg-cyan-500/20 px-2 py-1 text-[10px] text-cyan-200">
                Live view
              </span>
            </div>
            <div className="mb-4 h-32 rounded-tile bg-gradient-to-br from-slate-950/80 to-slate-900/60 p-4">
              <div className="flex h-full items-end gap-2">
                {[65, 80, 72, 90, 85, 95, 88].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-cyan-400/60 to-purple-500/60"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-3 rounded-tile bg-slate-950/60 p-4">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Total spend (MTD)</span>
                <span className="font-semibold text-slate-50">$2.4M</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Exceptions flagged</span>
                <span className="font-semibold text-cyan-300">47</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Potential savings</span>
                <span className="font-semibold text-purple-300">$218k</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Real-time visibility into freight spend, exceptions, and savings opportunities.
            </p>
          </div>
          <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-50">
                Exceptions center
              </h3>
              <span className="rounded-full bg-purple-500/20 px-2 py-1 text-[10px] text-purple-200">
                AI-powered
              </span>
            </div>
            <div className="mb-4 flex items-center gap-2 rounded-tile bg-slate-950/60 p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20">
                <span className="text-xl">⚠</span>
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-slate-200">AI Detection Active</div>
                <div className="text-[10px] text-slate-400">Scanning invoices in real-time</div>
              </div>
              <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
            </div>
            <div className="space-y-2 rounded-tile bg-slate-950/60 p-4">
              <div className="rounded-tile bg-slate-900/60 px-3 py-2 text-xs text-slate-200">
                <div className="flex items-center justify-between">
                  <span>Fuel surcharge variance</span>
                  <span className="text-cyan-300">+12%</span>
                </div>
                <div className="mt-1 text-[11px] text-slate-400">
                  23 invoices • Chicago → Dallas
                </div>
              </div>
              <div className="rounded-tile bg-slate-900/60 px-3 py-2 text-xs text-slate-200">
                <div className="flex items-center justify-between">
                  <span>Duplicate billing detected</span>
                  <span className="text-purple-300">3 matches</span>
                </div>
                <div className="mt-1 text-[11px] text-slate-400">
                  Same shipment, multiple invoices
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              AI flags anomalies and exceptions automatically, so you focus on resolution.
            </p>
          </div>
        </div>
        <div className="text-center">
          <a
            href="/product"
            className="inline-flex items-center gap-2 rounded-button border border-cyan-500/50 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-6 py-3 text-base font-semibold text-slate-50 transition hover:border-cyan-400 hover:shadow-orca-glow-cyan"
          >
            Explore all platform features →
          </a>
        </div>
      </section>

      {/* AI section - Updated per feedback */}
      <section className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel sm:p-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
              Freight insights through AI and machine learning
            </h2>
            <ul className="space-y-3 text-sm text-slate-300 sm:text-base">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-cyan-400">•</span>
                <span>Detects anomalies, surfaces patterns, and provides recommendations to action</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-purple-400">•</span>
                <span>Identify duplicate billing, unexpected surcharges, and lane variances</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-cyan-400">•</span>
                <span>Empower carrier renegotiations and mode optimization opportunities with enhanced data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-purple-400">•</span>
                <span>Instant insights through natural language exploration</span>
              </li>
            </ul>
            <div className="pt-4">
              <a
                href="/ai"
                className="inline-flex items-center gap-2 rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-4 text-base font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple"
              >
                AI & Data
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust signals & certifications */}
      {(trustBadges.length > 0 || testimonials.length > 0 || certifications.length > 0) && (
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
            Trusted by leading enterprises
          </h2>
        </div>
        <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel">
            {trustBadges.length > 0 && (
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
                {trustBadges.map((badge, idx) => (
              <div
                    key={idx}
                className="flex items-center justify-center rounded-tile border border-slate-800/70 bg-slate-950/60 p-4 text-xs text-slate-400"
              >
                    {badge.label}
              </div>
            ))}
          </div>
            )}
            {testimonials.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="rounded-tile border border-slate-800/70 bg-slate-950/60 p-4"
              >
                <p className="mb-3 text-xs italic text-slate-300 sm:text-sm">
                  "{testimonial.quote}"
                </p>
                <div className="text-[11px] text-slate-400">
                  <div className="font-medium text-slate-300">
                    {testimonial.author}
                  </div>
                  <div>{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
            )}
        </div>
          {certifications.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              {certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {cert.badge && (
            <span className="rounded-full bg-green-500/20 px-2 py-1 text-[10px] text-green-300">
                      {cert.badge}
            </span>
                  )}
                  <span>{cert.label}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Image Sections */}
      {images && images.length > 0 && (
        <section className="space-y-6">
          {images.map((image, index) => (
            <div key={index} className="space-y-2">
              {image.imageUrl && (
                <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 overflow-hidden shadow-orca-panel">
                  <img
                    src={image.imageUrl}
                    alt={image.alt || ""}
                    className="w-full object-cover"
                  />
                  {image.caption && (
                    <div className="p-4 text-center text-sm text-slate-400">
                      {image.caption}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Mockup Sections */}
      {mockups && mockups.length > 0 && (
        <section className="space-y-12">
          {mockups.map((mockup, index) => (
            <div key={index} className="space-y-4">
              {mockup.title && (
                <h2 className="text-center text-2xl font-semibold text-slate-50 sm:text-3xl">
                  {mockup.title}
                </h2>
              )}
              {mockup.description && (
                <p className="mx-auto max-w-2xl text-center text-sm text-slate-300 sm:text-base">
                  {mockup.description}
                </p>
              )}
              {mockup.type === "laptop" ? (
                <LaptopMockup imageUrl={mockup.imageUrl} alt={mockup.alt || mockup.title || "Laptop mockup"} />
              ) : (
                <DesktopMockup imageUrl={mockup.imageUrl} alt={mockup.alt || mockup.title || "Desktop mockup"} />
              )}
            </div>
          ))}
        </section>
      )}

      {/* 10-year milestones */}
      {timeline && timeline.length > 0 && (
        <section className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-slate-50 sm:text-2xl">
              A decade of freight audit innovation
            </h2>
            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              From manual audit processes to AI-powered analytics—here's how we've evolved.
            </p>
          </div>
          <div className="glass-panel rounded-panel border border-slate-800/70 bg-orca-panel/80 p-6 shadow-orca-panel">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12">
              {timeline.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <div className="text-2xl font-bold text-cyan-400 sm:text-3xl">
                    {milestone.year}
                  </div>
                  <div className="text-xs text-slate-300 sm:text-sm">
                    {milestone.title}
          </div>
                  {index < timeline.length - 1 && (
                    <div className="hidden h-0.5 w-12 bg-gradient-to-r from-cyan-400/50 to-purple-500/50 md:block" />
                  )}
          </div>
              ))}
          </div>
        </div>
      </section>
      )}

      {/* Final CTA band */}
      {finalCTA && finalCTA.title && (
        <section className="glass-panel rounded-panel border border-cyan-400/30 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-8 shadow-orca-glow-cyan sm:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-slate-50 sm:text-3xl">
              {finalCTA.title}
            </h2>
            {finalCTA.description && (
              <p className="mt-4 text-sm text-slate-300 sm:text-base">
                {finalCTA.description}
              </p>
            )}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {finalCTA.ctaPrimary && (
                <a
                  href={finalCTA.ctaPrimaryLink || "/contact"}
                  onClick={() => trackCTAClick("Book a demo", "final_cta_band")}
                  className="rounded-button bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-orca-glow-cyan transition hover:shadow-orca-glow-purple"
                >
                  {finalCTA.ctaPrimary}
                </a>
              )}
              {finalCTA.ctaSecondary && (
                <a
                  href={finalCTA.ctaSecondaryLink || "/results"}
                  className="rounded-full border border-slate-700 bg-slate-900/40 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-slate-50"
                >
                  {finalCTA.ctaSecondary}
                </a>
              )}
            </div>
            {finalCTA.note && (
              <p className="mt-6 text-xs text-slate-400">
                {finalCTA.note}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}


