/**
 * Type definitions for content management
 */

// Structured section types for different page sections
export interface HeroSection {
  title: string;
  subtitle?: string;
  description: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  badge?: string;
}

export interface MetricSection {
  label: string;
  value: string;
  hint?: string;
}

export interface TextSection {
  title?: string;
  heading?: string;
  description?: string;
  paragraphs?: string[];
}

export interface ItemSection {
  title?: string;
  items: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

export interface ImageSection {
  imageUrl?: string;
  alt?: string;
  caption?: string;
  layout?: "full-width" | "contained" | "side-by-side";
}

export interface MockupSection {
  type: "laptop" | "desktop";
  imageUrl?: string;
  alt?: string;
  title?: string;
  description?: string;
}

export interface ValuePropSection {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceSection {
  title: string;
  description: string;
  link?: string;
}

export interface ModuleSection {
  title: string;
  description: string;
  features: string[];
  icon?: string;
}

export interface RoleSection {
  title: string;
  description: string;
  benefits: string[];
  metric: string;
  icon?: string;
}

export interface ModeSection {
  title: string;
  description: string;
  benefits: string[];
  example: string;
}

export interface CaseStudySection {
  title: string;
  problem: string;
  approach: string;
  results: string[];
  quote: string;
  author: string;
}

export interface TimelineItemSection {
  year: string;
  title: string;
  description: string;
}

export interface ValueSection {
  title: string;
  description: string;
}

export interface TestimonialSection {
  quote: string;
  author: string;
  company: string;
}

export interface TrustBadgeSection {
  label: string;
  badge?: string;
  description?: string;
}

export interface CTASection {
  title: string;
  description: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryLink?: string;
  note?: string;
}

export interface ContactInfoSection {
  email?: string;
  supportEmail?: string;
  phone?: string;
  address?: string;
}

export interface FormFieldSection {
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

// Union type for all possible section types
export type PageSection = 
  | HeroSection 
  | MetricSection 
  | TextSection 
  | ItemSection 
  | ImageSection 
  | MockupSection
  | ValuePropSection
  | ServiceSection
  | ModuleSection
  | RoleSection
  | ModeSection
  | CaseStudySection
  | TimelineItemSection
  | ValueSection
  | TestimonialSection
  | TrustBadgeSection
  | CTASection
  | ContactInfoSection
  | FormFieldSection
  | Record<string, any>;

// Page-specific content structures
export interface HomePageContent {
  hero?: HeroSection;
  metrics?: MetricSection[];
  valueProps?: ValuePropSection[];
  services?: ServiceSection[];
  testimonials?: TestimonialSection[];
  trustBadges?: TrustBadgeSection[];
  timeline?: TimelineItemSection[];
  finalCTA?: CTASection;
  images?: ImageSection[];
  mockups?: MockupSection[];
  anniversaryBanner?: { text: string };
  heroImage?: ImageSection;
  trustedOperations?: {
    image?: ImageSection;
    trustStatements?: string[];
    metrics?: MetricSection[];
  };
}

export interface SolutionsPageContent {
  hero?: { title: string; description: string };
  roles?: RoleSection[];
  modes?: ModeSection[];
  finalCTA?: CTASection;
  roleImages?: ImageSection[];
  modeImages?: ImageSection[];
}

export interface ProductPageContent {
  hero?: { title: string; description: string };
  modules?: ModuleSection[];
  integrations?: { title: string; description: string; items: string[] };
  outcomes?: string[];
  finalCTA?: CTASection;
  integrationImage?: ImageSection;
  moduleImages?: ImageSection[];
}

export interface AiPageContent {
  hero?: { badge?: string; title: string; description: string };
  capabilities?: Array<{ title: string; description: string; examples: string[]; icon?: string }>;
  dataFoundation?: { title: string; description: string }[];
  trustSecurity?: Array<{ title: string; description: string }>;
  finalCTA?: CTASection;
  heroBackgroundImage?: ImageSection;
  architectureImage?: ImageSection;
}

export interface ResultsPageContent {
  hero?: { title: string; description: string };
  caseStudies?: CaseStudySection[];
  aggregateMetrics?: MetricSection[];
  finalCTA?: CTASection;
  caseStudyImages?: ImageSection[];
  trustCollage?: ImageSection;
}

export interface AboutPageContent {
  hero?: { title: string; description: string };
  story?: string[];
  timeline?: TimelineItemSection[];
  values?: ValueSection[];
  responsibility?: { title: string; paragraphs: string[] };
  finalCTA?: CTASection;
  teamImages?: ImageSection[];
  timelineImage?: ImageSection;
}

export interface ContactPageContent {
  hero?: { title: string; description: string };
  formFields?: FormFieldSection[];
  whatHappensNext?: string[];
  contactInfo?: ContactInfoSection;
  testimonial?: TestimonialSection;
}

export interface ResourcesPageContent {
  heroImage?: ImageSection;
}

export interface PageContent {
  pageId: string;
  sections: HomePageContent | SolutionsPageContent | ProductPageContent | AiPageContent | ResultsPageContent | AboutPageContent | ContactPageContent | ResourcesPageContent | Record<string, any>;
  lastModified: string;
  modifiedBy: string;
}

export interface ArticleContent {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  category: "external" | "ai-generated";
  tags: string[];
  imageUrl?: string;
  featured: boolean;
  published: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface SEOConfig {
  pageId: string;
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  schema?: Record<string, any>;
}

export interface GlobalSEO {
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultImage: string;
  twitterHandle?: string;
  googleAnalyticsId?: string;
  googleSearchConsole?: string;
  robotsTxt?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  role?: string;
  freightModes?: string[];
  approximateSpend?: string;
  message: string;
  submittedAt: string;
  status: "new" | "read" | "responded" | "archived";
  notes?: string;
}
