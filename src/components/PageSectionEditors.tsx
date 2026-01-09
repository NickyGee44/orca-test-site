/**
 * Component that renders the appropriate section editors based on page type
 */

import type { PageContent, HeroSection, MetricSection, ImageSection, MockupSection, ValuePropSection, ServiceSection, ModuleSection, RoleSection, ModeSection, CaseStudySection, TimelineItemSection, ValueSection, TestimonialSection, TrustBadgeSection, CTASection, ContactInfoSection } from "../types/content";
import type { ImageAsset } from "../services/imageService";

interface PageSectionEditorsProps {
  pageId: string;
  content: PageContent;
  availableImages: ImageAsset[];
  updateSection: (sectionKey: string, value: any) => void;
}

export function PageSectionEditors({ pageId, content, availableImages, updateSection }: PageSectionEditorsProps) {
  // Render page-specific editors
  switch (pageId) {
    case "homepage":
      return <HomePageEditor content={content} availableImages={availableImages} updateSection={updateSection} />;
    case "solutions":
      return <SolutionsPageEditor content={content} availableImages={availableImages} updateSection={updateSection} />;
    case "product":
      return <ProductPageEditor content={content} availableImages={availableImages} updateSection={updateSection} />;
    case "ai":
      return <AiPageEditor content={content} availableImages={availableImages} updateSection={updateSection} />;
    case "results":
      return <ResultsPageEditor content={content} availableImages={availableImages} updateSection={updateSection} />;
    case "about":
      return <AboutPageEditor content={content} availableImages={availableImages} updateSection={updateSection} />;
    case "contact":
      return <ContactPageEditor content={content} availableImages={availableImages} updateSection={updateSection} />;
    default:
      return <div className="text-slate-400">No editor available for this page type</div>;
  }
}

// HomePage Editor
function HomePageEditor({ content, availableImages, updateSection }: PageSectionEditorsProps) {
  const sections = content.sections as any;
  
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <SectionEditor title="Hero Section">
        <TextInput label="Title" value={sections.hero?.title || ""} onChange={(v) => updateSection("hero", { ...sections.hero, title: v })} />
        <TextArea label="Description" value={sections.hero?.description || ""} onChange={(v) => updateSection("hero", { ...sections.hero, description: v })} />
        <TextInput label="Primary CTA" value={sections.hero?.ctaPrimary || ""} onChange={(v) => updateSection("hero", { ...sections.hero, ctaPrimary: v })} />
        <TextInput label="Secondary CTA" value={sections.hero?.ctaSecondary || ""} onChange={(v) => updateSection("hero", { ...sections.hero, ctaSecondary: v })} />
        <TextInput label="Badge Text" value={sections.hero?.badge || ""} onChange={(v) => updateSection("hero", { ...sections.hero, badge: v })} />
      </SectionEditor>

      {/* Hero Image */}
      <SectionEditor title="Hero Image">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs text-slate-400">Select Image</label>
              <select
                value={sections.heroImage?.imageUrl || ""}
                onChange={(e) => {
                  const nextUrl = e.target.value;
                  updateSection("heroImage", {
                    ...(sections.heroImage || {}),
                    imageUrl: nextUrl,
                    layout: sections.heroImage?.layout || "contained",
                  });
                }}
                className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              >
                <option value="">(No image) – use default visual</option>
                <option value="/images/placeholders/home-warehouse.jpg">Placeholder: Warehouse</option>
                <option value="/images/placeholders/home-business-logistics.jpg">Placeholder: Business logistics</option>
                {availableImages.map((img) => (
                  <option key={img.id} value={img.url}>
                    Uploaded: {img.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-[11px] text-slate-500">
                Tip: upload your ChatGPT image in{" "}
                <a href="/admin/images" target="_blank" className="text-cyan-400 hover:text-cyan-300">
                  Image Manager
                </a>{" "}
                then select it here.
              </p>
            </div>

            <TextInput
              label="Alt text"
              value={sections.heroImage?.alt || ""}
              onChange={(v) =>
                updateSection("heroImage", { ...(sections.heroImage || {}), alt: v, layout: sections.heroImage?.layout || "contained" })
              }
            />
            <TextInput
              label="Caption (optional)"
              value={sections.heroImage?.caption || ""}
              onChange={(v) =>
                updateSection("heroImage", { ...(sections.heroImage || {}), caption: v, layout: sections.heroImage?.layout || "contained" })
              }
            />
          </div>

          <div className="overflow-hidden rounded-panel border border-slate-800/70 bg-slate-950/40">
            {sections.heroImage?.imageUrl ? (
              <img
                src={sections.heroImage.imageUrl}
                alt={sections.heroImage.alt || ""}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[160px] items-center justify-center p-6 text-xs text-slate-500">
                No hero image selected.
              </div>
            )}
          </div>
        </div>
      </SectionEditor>

      {/* Anniversary Banner */}
      <SectionEditor title="Anniversary Banner">
        <TextInput label="Banner Text" value={sections.anniversaryBanner?.text || ""} onChange={(v) => updateSection("anniversaryBanner", { text: v })} />
      </SectionEditor>

      {/* Metrics */}
      <ArraySectionEditor
        title="Metrics"
        items={sections.metrics || []}
        onAdd={() => updateSection("metrics", [...(sections.metrics || []), { label: "", value: "", hint: "" }])}
        onRemove={(index) => {
          const metrics = [...(sections.metrics || [])];
          metrics.splice(index, 1);
          updateSection("metrics", metrics);
        }}
        renderItem={(metric: MetricSection, index: number) => (
          <div className="grid grid-cols-3 gap-3">
            <TextInput label="Label" value={metric.label || ""} onChange={(v) => {
              const metrics = [...(sections.metrics || [])];
              metrics[index] = { ...metric, label: v };
              updateSection("metrics", metrics);
            }} />
            <TextInput label="Value" value={metric.value || ""} onChange={(v) => {
              const metrics = [...(sections.metrics || [])];
              metrics[index] = { ...metric, value: v };
              updateSection("metrics", metrics);
            }} />
            <TextInput label="Hint" value={metric.hint || ""} onChange={(v) => {
              const metrics = [...(sections.metrics || [])];
              metrics[index] = { ...metric, hint: v };
              updateSection("metrics", metrics);
            }} />
          </div>
        )}
      />

      {/* Value Props */}
      <ArraySectionEditor
        title="Value Props (Why Orca?)"
        items={sections.valueProps || []}
        onAdd={() => updateSection("valueProps", [...(sections.valueProps || []), { title: "", description: "", icon: "" }])}
        onRemove={(index) => {
          const items = [...(sections.valueProps || [])];
          items.splice(index, 1);
          updateSection("valueProps", items);
        }}
        renderItem={(item: ValuePropSection, index: number) => (
          <div className="space-y-3">
            <TextInput label="Title" value={item.title || ""} onChange={(v) => {
              const items = [...(sections.valueProps || [])];
              items[index] = { ...item, title: v };
              updateSection("valueProps", items);
            }} />
            <TextArea label="Description" value={item.description || ""} onChange={(v) => {
              const items = [...(sections.valueProps || [])];
              items[index] = { ...item, description: v };
              updateSection("valueProps", items);
            }} />
            <TextInput label="Icon (emoji)" value={item.icon || ""} onChange={(v) => {
              const items = [...(sections.valueProps || [])];
              items[index] = { ...item, icon: v };
              updateSection("valueProps", items);
            }} />
          </div>
        )}
      />

      {/* Services */}
      <ArraySectionEditor
        title="Services (What we do)"
        items={sections.services || []}
        onAdd={() => updateSection("services", [...(sections.services || []), { title: "", description: "", link: "" }])}
        onRemove={(index) => {
          const items = [...(sections.services || [])];
          items.splice(index, 1);
          updateSection("services", items);
        }}
        renderItem={(item: ServiceSection, index: number) => (
          <div className="space-y-3">
            <TextInput label="Title" value={item.title || ""} onChange={(v) => {
              const items = [...(sections.services || [])];
              items[index] = { ...item, title: v };
              updateSection("services", items);
            }} />
            <TextArea label="Description" value={item.description || ""} onChange={(v) => {
              const items = [...(sections.services || [])];
              items[index] = { ...item, description: v };
              updateSection("services", items);
            }} />
            <TextInput label="Link" value={item.link || ""} onChange={(v) => {
              const items = [...(sections.services || [])];
              items[index] = { ...item, link: v };
              updateSection("services", items);
            }} />
          </div>
        )}
      />

      {/* Testimonials */}
      <ArraySectionEditor
        title="Testimonials"
        items={sections.testimonials || []}
        onAdd={() => updateSection("testimonials", [...(sections.testimonials || []), { quote: "", author: "", company: "" }])}
        onRemove={(index) => {
          const items = [...(sections.testimonials || [])];
          items.splice(index, 1);
          updateSection("testimonials", items);
        }}
        renderItem={(item: TestimonialSection, index: number) => (
          <div className="space-y-3">
            <TextArea label="Quote" value={item.quote || ""} onChange={(v) => {
              const items = [...(sections.testimonials || [])];
              items[index] = { ...item, quote: v };
              updateSection("testimonials", items);
            }} />
            <TextInput label="Author" value={item.author || ""} onChange={(v) => {
              const items = [...(sections.testimonials || [])];
              items[index] = { ...item, author: v };
              updateSection("testimonials", items);
            }} />
            <TextInput label="Company" value={item.company || ""} onChange={(v) => {
              const items = [...(sections.testimonials || [])];
              items[index] = { ...item, company: v };
              updateSection("testimonials", items);
            }} />
          </div>
        )}
      />

      {/* Trust Badges */}
      <ArraySectionEditor
        title="Trust Badges"
        items={sections.trustBadges || []}
        onAdd={() => updateSection("trustBadges", [...(sections.trustBadges || []), { label: "" }])}
        onRemove={(index) => {
          const items = [...(sections.trustBadges || [])];
          items.splice(index, 1);
          updateSection("trustBadges", items);
        }}
        renderItem={(item: TrustBadgeSection, index: number) => (
          <TextInput label="Label" value={item.label || ""} onChange={(v) => {
            const items = [...(sections.trustBadges || [])];
            items[index] = { ...item, label: v };
            updateSection("trustBadges", items);
          }} />
        )}
      />

      {/* Timeline */}
      <ArraySectionEditor
        title="Timeline (10-year milestones)"
        items={sections.timeline || []}
        onAdd={() => updateSection("timeline", [...(sections.timeline || []), { year: "", title: "", description: "" }])}
        onRemove={(index) => {
          const items = [...(sections.timeline || [])];
          items.splice(index, 1);
          updateSection("timeline", items);
        }}
        renderItem={(item: TimelineItemSection, index: number) => (
          <div className="space-y-3">
            <TextInput label="Year" value={item.year || ""} onChange={(v) => {
              const items = [...(sections.timeline || [])];
              items[index] = { ...item, year: v };
              updateSection("timeline", items);
            }} />
            <TextInput label="Title" value={item.title || ""} onChange={(v) => {
              const items = [...(sections.timeline || [])];
              items[index] = { ...item, title: v };
              updateSection("timeline", items);
            }} />
            <TextArea label="Description" value={item.description || ""} onChange={(v) => {
              const items = [...(sections.timeline || [])];
              items[index] = { ...item, description: v };
              updateSection("timeline", items);
            }} />
          </div>
        )}
      />

      {/* Final CTA */}
      <SectionEditor title="Final CTA Band">
        <TextInput label="Title" value={sections.finalCTA?.title || ""} onChange={(v) => updateSection("finalCTA", { ...sections.finalCTA, title: v })} />
        <TextArea label="Description" value={sections.finalCTA?.description || ""} onChange={(v) => updateSection("finalCTA", { ...sections.finalCTA, description: v })} />
        <TextInput label="Primary CTA Text" value={sections.finalCTA?.ctaPrimary || ""} onChange={(v) => updateSection("finalCTA", { ...sections.finalCTA, ctaPrimary: v })} />
        <TextInput label="Primary CTA Link" value={sections.finalCTA?.ctaPrimaryLink || ""} onChange={(v) => updateSection("finalCTA", { ...sections.finalCTA, ctaPrimaryLink: v })} />
        <TextInput label="Secondary CTA Text" value={sections.finalCTA?.ctaSecondary || ""} onChange={(v) => updateSection("finalCTA", { ...sections.finalCTA, ctaSecondary: v })} />
        <TextInput label="Secondary CTA Link" value={sections.finalCTA?.ctaSecondaryLink || ""} onChange={(v) => updateSection("finalCTA", { ...sections.finalCTA, ctaSecondaryLink: v })} />
        <TextInput label="Note" value={sections.finalCTA?.note || ""} onChange={(v) => updateSection("finalCTA", { ...sections.finalCTA, note: v })} />
      </SectionEditor>

      {/* Images */}
      <ImageSectionsEditor sections={sections} availableImages={availableImages} updateSection={updateSection} />

      {/* Mockups */}
      <MockupSectionsEditor sections={sections} availableImages={availableImages} updateSection={updateSection} />
    </div>
  );
}

// Solutions Page Editor
function SolutionsPageEditor({ content, availableImages, updateSection }: PageSectionEditorsProps) {
  const sections = content.sections as any;
  
  return (
    <div className="space-y-6">
      <SectionEditor title="Hero Section">
        <TextInput label="Title" value={sections.hero?.title || ""} onChange={(v) => updateSection("hero", { ...sections.hero, title: v })} />
        <TextArea label="Description" value={sections.hero?.description || ""} onChange={(v) => updateSection("hero", { ...sections.hero, description: v })} />
      </SectionEditor>

      <ArraySectionEditor
        title="By Role"
        items={sections.roles || []}
        onAdd={() => updateSection("roles", [...(sections.roles || []), { title: "", description: "", benefits: [], metric: "", icon: "" }])}
        onRemove={(index) => {
          const items = [...(sections.roles || [])];
          items.splice(index, 1);
          updateSection("roles", items);
        }}
        renderItem={(item: RoleSection, index: number) => (
          <div className="space-y-3">
            <TextInput label="Title" value={item.title || ""} onChange={(v) => {
              const items = [...(sections.roles || [])];
              items[index] = { ...item, title: v };
              updateSection("roles", items);
            }} />
            <TextArea label="Description" value={item.description || ""} onChange={(v) => {
              const items = [...(sections.roles || [])];
              items[index] = { ...item, description: v };
              updateSection("roles", items);
            }} />
            <TextInput label="Metric" value={item.metric || ""} onChange={(v) => {
              const items = [...(sections.roles || [])];
              items[index] = { ...item, metric: v };
              updateSection("roles", items);
            }} />
            <TextInput label="Icon (emoji)" value={item.icon || ""} onChange={(v) => {
              const items = [...(sections.roles || [])];
              items[index] = { ...item, icon: v };
              updateSection("roles", items);
            }} />
            <ArrayInput label="Benefits" value={item.benefits || []} onChange={(v) => {
              const items = [...(sections.roles || [])];
              items[index] = { ...item, benefits: v };
              updateSection("roles", items);
            }} />
          </div>
        )}
      />

      <ArraySectionEditor
        title="By Freight Mode"
        items={sections.modes || []}
        onAdd={() => updateSection("modes", [...(sections.modes || []), { title: "", description: "", benefits: [], example: "" }])}
        onRemove={(index) => {
          const items = [...(sections.modes || [])];
          items.splice(index, 1);
          updateSection("modes", items);
        }}
        renderItem={(item: ModeSection, index: number) => (
          <div className="space-y-3">
            <TextInput label="Title" value={item.title || ""} onChange={(v) => {
              const items = [...(sections.modes || [])];
              items[index] = { ...item, title: v };
              updateSection("modes", items);
            }} />
            <TextArea label="Description" value={item.description || ""} onChange={(v) => {
              const items = [...(sections.modes || [])];
              items[index] = { ...item, description: v };
              updateSection("modes", items);
            }} />
            <TextInput label="Example" value={item.example || ""} onChange={(v) => {
              const items = [...(sections.modes || [])];
              items[index] = { ...item, example: v };
              updateSection("modes", items);
            }} />
            <ArrayInput label="Benefits" value={item.benefits || []} onChange={(v) => {
              const items = [...(sections.modes || [])];
              items[index] = { ...item, benefits: v };
              updateSection("modes", items);
            }} />
          </div>
        )}
      />

      <CTASectionEditor sections={sections} updateSection={updateSection} />
    </div>
  );
}

// Product Page Editor
function ProductPageEditor({ content, availableImages, updateSection }: PageSectionEditorsProps) {
  const sections = content.sections as any;
  
  return (
    <div className="space-y-6">
      <SectionEditor title="Hero Section">
        <TextInput label="Title" value={sections.hero?.title || ""} onChange={(v) => updateSection("hero", { ...sections.hero, title: v })} />
        <TextArea label="Description" value={sections.hero?.description || ""} onChange={(v) => updateSection("hero", { ...sections.hero, description: v })} />
      </SectionEditor>

      <ArraySectionEditor
        title="Platform Modules"
        items={sections.modules || []}
        onAdd={() => updateSection("modules", [...(sections.modules || []), { title: "", description: "", features: [], preview: "" }])}
        onRemove={(index) => {
          const items = [...(sections.modules || [])];
          items.splice(index, 1);
          updateSection("modules", items);
        }}
        renderItem={(item: ModuleSection, index: number) => (
          <div className="space-y-3">
            <TextInput label="Title" value={item.title || ""} onChange={(v) => {
              const items = [...(sections.modules || [])];
              items[index] = { ...item, title: v };
              updateSection("modules", items);
            }} />
            <TextArea label="Description" value={item.description || ""} onChange={(v) => {
              const items = [...(sections.modules || [])];
              items[index] = { ...item, description: v };
              updateSection("modules", items);
            }} />
            <TextInput label="Preview Text" value={item.preview || ""} onChange={(v) => {
              const items = [...(sections.modules || [])];
              items[index] = { ...item, preview: v };
              updateSection("modules", items);
            }} />
            <ArrayInput label="Features" value={item.features || []} onChange={(v) => {
              const items = [...(sections.modules || [])];
              items[index] = { ...item, features: v };
              updateSection("modules", items);
            }} />
          </div>
        )}
      />

      <SectionEditor title="Integrations Section">
        <TextInput label="Title" value={sections.integrations?.title || ""} onChange={(v) => updateSection("integrations", { ...sections.integrations, title: v })} />
        <TextArea label="Description" value={sections.integrations?.description || ""} onChange={(v) => updateSection("integrations", { ...sections.integrations, description: v })} />
        <ArrayInput label="Integration Items" value={sections.integrations?.items || []} onChange={(v) => updateSection("integrations", { ...sections.integrations, items: v })} />
      </SectionEditor>

      <SectionEditor title="Platform Outcomes">
        <ArrayInput label="Outcomes" value={sections.outcomes || []} onChange={(v) => updateSection("outcomes", v)} />
      </SectionEditor>

      <CTASectionEditor sections={sections} updateSection={updateSection} />
    </div>
  );
}

// AI Page Editor
function AiPageEditor({ content, availableImages, updateSection }: PageSectionEditorsProps) {
  const sections = content.sections as any;
  
  return (
    <div className="space-y-6">
      <SectionEditor title="Hero Section">
        <TextInput label="Badge" value={sections.hero?.badge || ""} onChange={(v) => updateSection("hero", { ...sections.hero, badge: v })} />
        <TextInput label="Title" value={sections.hero?.title || ""} onChange={(v) => updateSection("hero", { ...sections.hero, title: v })} />
        <TextArea label="Description" value={sections.hero?.description || ""} onChange={(v) => updateSection("hero", { ...sections.hero, description: v })} />
      </SectionEditor>

      <ArraySectionEditor
        title="AI Capabilities"
        items={sections.capabilities || []}
        onAdd={() => updateSection("capabilities", [...(sections.capabilities || []), { title: "", description: "", examples: [], icon: "" }])}
        onRemove={(index) => {
          const items = [...(sections.capabilities || [])];
          items.splice(index, 1);
          updateSection("capabilities", items);
        }}
        renderItem={(item: any, index: number) => (
          <div className="space-y-3">
            <TextInput label="Title" value={item.title || ""} onChange={(v) => {
              const items = [...(sections.capabilities || [])];
              items[index] = { ...item, title: v };
              updateSection("capabilities", items);
            }} />
            <TextArea label="Description" value={item.description || ""} onChange={(v) => {
              const items = [...(sections.capabilities || [])];
              items[index] = { ...item, description: v };
              updateSection("capabilities", items);
            }} />
            <TextInput label="Icon (emoji)" value={item.icon || ""} onChange={(v) => {
              const items = [...(sections.capabilities || [])];
              items[index] = { ...item, icon: v };
              updateSection("capabilities", items);
            }} />
            <ArrayInput label="Examples" value={item.examples || []} onChange={(v) => {
              const items = [...(sections.capabilities || [])];
              items[index] = { ...item, examples: v };
              updateSection("capabilities", items);
            }} />
          </div>
        )}
      />

      <ArraySectionEditor
        title="Data Foundation"
        items={sections.dataFoundation || []}
        onAdd={() => updateSection("dataFoundation", [...(sections.dataFoundation || []), { title: "", description: "" }])}
        onRemove={(index) => {
          const items = [...(sections.dataFoundation || [])];
          items.splice(index, 1);
          updateSection("dataFoundation", items);
        }}
        renderItem={(item: any, index: number) => (
          <div className="space-y-3">
            <TextInput label="Title" value={item.title || ""} onChange={(v) => {
              const items = [...(sections.dataFoundation || [])];
              items[index] = { ...item, title: v };
              updateSection("dataFoundation", items);
            }} />
            <TextArea label="Description" value={item.description || ""} onChange={(v) => {
              const items = [...(sections.dataFoundation || [])];
              items[index] = { ...item, description: v };
              updateSection("dataFoundation", items);
            }} />
          </div>
        )}
      />

      <ArraySectionEditor
        title="Trust, Security, and Governance"
        items={sections.trustSecurity || []}
        onAdd={() => updateSection("trustSecurity", [...(sections.trustSecurity || []), { title: "", description: "" }])}
        onRemove={(index) => {
          const items = [...(sections.trustSecurity || [])];
          items.splice(index, 1);
          updateSection("trustSecurity", items);
        }}
        renderItem={(item: any, index: number) => (
          <div className="space-y-3">
            <TextInput label="Title" value={item.title || ""} onChange={(v) => {
              const items = [...(sections.trustSecurity || [])];
              items[index] = { ...item, title: v };
              updateSection("trustSecurity", items);
            }} />
            <TextArea label="Description" value={item.description || ""} onChange={(v) => {
              const items = [...(sections.trustSecurity || [])];
              items[index] = { ...item, description: v };
              updateSection("trustSecurity", items);
            }} />
          </div>
        )}
      />

      <CTASectionEditor sections={sections} updateSection={updateSection} />
    </div>
  );
}

// Results Page Editor
function ResultsPageEditor({ content, availableImages, updateSection }: PageSectionEditorsProps) {
  const sections = content.sections as any;
  
  return (
    <div className="space-y-6">
      <SectionEditor title="Hero Section">
        <TextInput label="Title" value={sections.hero?.title || ""} onChange={(v) => updateSection("hero", { ...sections.hero, title: v })} />
        <TextArea label="Description" value={sections.hero?.description || ""} onChange={(v) => updateSection("hero", { ...sections.hero, description: v })} />
      </SectionEditor>

      <ArraySectionEditor
        title="Case Studies"
        items={sections.caseStudies || []}
        onAdd={() => updateSection("caseStudies", [...(sections.caseStudies || []), { title: "", problem: "", approach: "", results: [], quote: "", author: "" }])}
        onRemove={(index) => {
          const items = [...(sections.caseStudies || [])];
          items.splice(index, 1);
          updateSection("caseStudies", items);
        }}
        renderItem={(item: CaseStudySection, index: number) => (
          <div className="space-y-3">
            <TextInput label="Title" value={item.title || ""} onChange={(v) => {
              const items = [...(sections.caseStudies || [])];
              items[index] = { ...item, title: v };
              updateSection("caseStudies", items);
            }} />
            <TextArea label="Problem" value={item.problem || ""} onChange={(v) => {
              const items = [...(sections.caseStudies || [])];
              items[index] = { ...item, problem: v };
              updateSection("caseStudies", items);
            }} />
            <TextArea label="Approach" value={item.approach || ""} onChange={(v) => {
              const items = [...(sections.caseStudies || [])];
              items[index] = { ...item, approach: v };
              updateSection("caseStudies", items);
            }} />
            <ArrayInput label="Results" value={item.results || []} onChange={(v) => {
              const items = [...(sections.caseStudies || [])];
              items[index] = { ...item, results: v };
              updateSection("caseStudies", items);
            }} />
            <TextArea label="Quote" value={item.quote || ""} onChange={(v) => {
              const items = [...(sections.caseStudies || [])];
              items[index] = { ...item, quote: v };
              updateSection("caseStudies", items);
            }} />
            <TextInput label="Author" value={item.author || ""} onChange={(v) => {
              const items = [...(sections.caseStudies || [])];
              items[index] = { ...item, author: v };
              updateSection("caseStudies", items);
            }} />
          </div>
        )}
      />

      <SectionEditor title="Aggregate Metrics">
        <ArraySectionEditor
          title="Metrics"
          items={sections.aggregateMetrics || []}
          onAdd={() => updateSection("aggregateMetrics", [...(sections.aggregateMetrics || []), { label: "", value: "", hint: "" }])}
          onRemove={(index) => {
            const items = [...(sections.aggregateMetrics || [])];
            items.splice(index, 1);
            updateSection("aggregateMetrics", items);
          }}
          renderItem={(metric: MetricSection, index: number) => (
            <div className="grid grid-cols-3 gap-3">
              <TextInput label="Label" value={metric.label || ""} onChange={(v) => {
                const items = [...(sections.aggregateMetrics || [])];
                items[index] = { ...metric, label: v };
                updateSection("aggregateMetrics", items);
              }} />
              <TextInput label="Value" value={metric.value || ""} onChange={(v) => {
                const items = [...(sections.aggregateMetrics || [])];
                items[index] = { ...metric, value: v };
                updateSection("aggregateMetrics", items);
              }} />
              <TextInput label="Hint" value={metric.hint || ""} onChange={(v) => {
                const items = [...(sections.aggregateMetrics || [])];
                items[index] = { ...metric, hint: v };
                updateSection("aggregateMetrics", items);
              }} />
            </div>
          )}
        />
      </SectionEditor>

      <CTASectionEditor sections={sections} updateSection={updateSection} />
    </div>
  );
}

// About Page Editor
function AboutPageEditor({ content, availableImages, updateSection }: PageSectionEditorsProps) {
  const sections = content.sections as any;
  
  return (
    <div className="space-y-6">
      <SectionEditor title="Hero Section">
        <TextInput label="Title" value={sections.hero?.title || ""} onChange={(v) => updateSection("hero", { ...sections.hero, title: v })} />
        <TextArea label="Description" value={sections.hero?.description || ""} onChange={(v) => updateSection("hero", { ...sections.hero, description: v })} />
      </SectionEditor>

      <SectionEditor title="The Orca Story">
        <ArrayInput label="Story Paragraphs" value={sections.story || []} onChange={(v) => updateSection("story", v)} />
      </SectionEditor>

      <ArraySectionEditor
        title="Timeline (10 years of evolution)"
        items={sections.timeline || []}
        onAdd={() => updateSection("timeline", [...(sections.timeline || []), { year: "", title: "", description: "" }])}
        onRemove={(index) => {
          const items = [...(sections.timeline || [])];
          items.splice(index, 1);
          updateSection("timeline", items);
        }}
        renderItem={(item: TimelineItemSection, index: number) => (
          <div className="space-y-3">
            <TextInput label="Year" value={item.year || ""} onChange={(v) => {
              const items = [...(sections.timeline || [])];
              items[index] = { ...item, year: v };
              updateSection("timeline", items);
            }} />
            <TextInput label="Title" value={item.title || ""} onChange={(v) => {
              const items = [...(sections.timeline || [])];
              items[index] = { ...item, title: v };
              updateSection("timeline", items);
            }} />
            <TextArea label="Description" value={item.description || ""} onChange={(v) => {
              const items = [...(sections.timeline || [])];
              items[index] = { ...item, description: v };
              updateSection("timeline", items);
            }} />
          </div>
        )}
      />

      <ArraySectionEditor
        title="Mission & Values"
        items={sections.values || []}
        onAdd={() => updateSection("values", [...(sections.values || []), { title: "", description: "" }])}
        onRemove={(index) => {
          const items = [...(sections.values || [])];
          items.splice(index, 1);
          updateSection("values", items);
        }}
        renderItem={(item: ValueSection, index: number) => (
          <div className="space-y-3">
            <TextInput label="Title" value={item.title || ""} onChange={(v) => {
              const items = [...(sections.values || [])];
              items[index] = { ...item, title: v };
              updateSection("values", items);
            }} />
            <TextArea label="Description" value={item.description || ""} onChange={(v) => {
              const items = [...(sections.values || [])];
              items[index] = { ...item, description: v };
              updateSection("values", items);
            }} />
          </div>
        )}
      />

      <SectionEditor title="Responsibility">
        <TextInput label="Title" value={sections.responsibility?.title || ""} onChange={(v) => updateSection("responsibility", { ...sections.responsibility, title: v })} />
        <ArrayInput label="Paragraphs" value={sections.responsibility?.paragraphs || []} onChange={(v) => updateSection("responsibility", { ...sections.responsibility, paragraphs: v })} />
      </SectionEditor>

      <CTASectionEditor sections={sections} updateSection={updateSection} />
    </div>
  );
}

// Contact Page Editor
function ContactPageEditor({ content, availableImages, updateSection }: PageSectionEditorsProps) {
  const sections = content.sections as any;
  
  return (
    <div className="space-y-6">
      <SectionEditor title="Hero Section">
        <TextInput label="Title" value={sections.hero?.title || ""} onChange={(v) => updateSection("hero", { ...sections.hero, title: v })} />
        <TextArea label="Description" value={sections.hero?.description || ""} onChange={(v) => updateSection("hero", { ...sections.hero, description: v })} />
      </SectionEditor>

      <SectionEditor title="What Happens Next">
        <ArrayInput label="Steps" value={sections.whatHappensNext || []} onChange={(v) => updateSection("whatHappensNext", v)} />
      </SectionEditor>

      <SectionEditor title="Contact Information">
        <TextInput label="Email" value={sections.contactInfo?.email || ""} onChange={(v) => updateSection("contactInfo", { ...sections.contactInfo, email: v })} />
        <TextInput label="Support Email" value={sections.contactInfo?.supportEmail || ""} onChange={(v) => updateSection("contactInfo", { ...sections.contactInfo, supportEmail: v })} />
        <TextInput label="Phone" value={sections.contactInfo?.phone || ""} onChange={(v) => updateSection("contactInfo", { ...sections.contactInfo, phone: v })} />
        <TextInput label="Address" value={sections.contactInfo?.address || ""} onChange={(v) => updateSection("contactInfo", { ...sections.contactInfo, address: v })} />
      </SectionEditor>

      <SectionEditor title="Testimonial">
        <TextArea label="Quote" value={sections.testimonial?.quote || ""} onChange={(v) => updateSection("testimonial", { ...sections.testimonial, quote: v })} />
        <TextInput label="Author" value={sections.testimonial?.author || ""} onChange={(v) => updateSection("testimonial", { ...sections.testimonial, author: v })} />
        <TextInput label="Company" value={sections.testimonial?.company || ""} onChange={(v) => updateSection("testimonial", { ...sections.testimonial, company: v })} />
      </SectionEditor>
    </div>
  );
}

// Helper Components
function SectionEditor({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-tile border border-slate-800/70 bg-slate-950/60 p-4">
      <h3 className="mb-4 text-lg font-semibold text-slate-50">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-50 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
      />
    </div>
  );
}

function ArrayInput({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">{label}</label>
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newValue = [...value];
                newValue[index] = e.target.value;
                onChange(newValue);
              }}
              className="flex-1 rounded-md border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-50 focus:border-cyan-400/50 focus:outline-none"
            />
            <button
              onClick={() => {
                const newValue = [...value];
                newValue.splice(index, 1);
                onChange(newValue);
              }}
              className="rounded-md border border-red-500/30 bg-red-500/10 px-2 text-xs text-red-300 hover:bg-red-500/20"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => onChange([...value, ""])}
          className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
        >
          + Add Item
        </button>
      </div>
    </div>
  );
}

function ArraySectionEditor({ title, items, onAdd, onRemove, renderItem }: {
  title: string;
  items: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: any, index: number) => React.ReactNode;
}) {
  return (
    <div className="rounded-tile border border-slate-800/70 bg-slate-950/60 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
        <button
          onClick={onAdd}
          className="rounded-md border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300 hover:bg-slate-800"
        >
          + Add
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-md border border-slate-800/50 bg-slate-900/40 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">{title} {index + 1}</span>
              <button
                onClick={() => onRemove(index)}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
            {renderItem(item, index)}
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-center text-xs text-slate-500">No items. Click "+ Add" to create one.</p>
        )}
      </div>
    </div>
  );
}

function ImageSectionsEditor({ sections, availableImages, updateSection }: { sections: any; availableImages: ImageAsset[]; updateSection: (key: string, value: any) => void }) {
  return (
    <div className="rounded-tile border border-slate-800/70 bg-slate-950/60 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-50">Image Sections</h3>
        <a href="/admin/images" target="_blank" className="text-xs text-cyan-400 hover:text-cyan-300">Manage Images →</a>
      </div>
      <div className="space-y-4">
        {(sections.images || []).map((image: ImageSection, index: number) => (
          <div key={index} className="rounded-md border border-slate-800/50 bg-slate-900/40 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">Image {index + 1}</span>
              <button onClick={() => {
                const images = [...(sections.images || [])];
                images.splice(index, 1);
                updateSection("images", images);
              }} className="text-xs text-red-400 hover:text-red-300">Remove</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-slate-400">Select Image</label>
                <select
                  value={image.imageUrl || ""}
                  onChange={(e) => {
                    const images = [...(sections.images || [])];
                    images[index] = { ...image, imageUrl: e.target.value };
                    updateSection("images", images);
                  }}
                  className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-50 focus:border-cyan-400/50 focus:outline-none"
                >
                  <option value="">Select an image...</option>
                  {availableImages.map((img) => (
                    <option key={img.id} value={img.url}>{img.name}</option>
                  ))}
                </select>
              </div>
              {image.imageUrl && (
                <div className="relative h-32 w-full overflow-hidden rounded-md bg-slate-900">
                  <img src={image.imageUrl} alt={image.alt || ""} className="h-full w-full object-cover" />
                </div>
              )}
              <TextInput label="Alt Text" value={image.alt || ""} onChange={(v) => {
                const images = [...(sections.images || [])];
                images[index] = { ...image, alt: v };
                updateSection("images", images);
              }} />
              <TextInput label="Caption" value={image.caption || ""} onChange={(v) => {
                const images = [...(sections.images || [])];
                images[index] = { ...image, caption: v };
                updateSection("images", images);
              }} />
            </div>
          </div>
        ))}
        <button
          onClick={() => updateSection("images", [...(sections.images || []), { imageUrl: "", alt: "", caption: "" }])}
          className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
        >
          + Add Image
        </button>
      </div>
    </div>
  );
}

function MockupSectionsEditor({ sections, availableImages, updateSection }: { sections: any; availableImages: ImageAsset[]; updateSection: (key: string, value: any) => void }) {
  return (
    <div className="rounded-tile border border-slate-800/70 bg-slate-950/60 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-50">Laptop/Desktop Mockups</h3>
        <a href="/admin/images" target="_blank" className="text-xs text-cyan-400 hover:text-cyan-300">Manage Images →</a>
      </div>
      <div className="space-y-4">
        {(sections.mockups || []).map((mockup: MockupSection, index: number) => (
          <div key={index} className="rounded-md border border-slate-800/50 bg-slate-900/40 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-300">Mockup {index + 1}</span>
              <button onClick={() => {
                const mockups = [...(sections.mockups || [])];
                mockups.splice(index, 1);
                updateSection("mockups", mockups);
              }} className="text-xs text-red-400 hover:text-red-300">Remove</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-slate-400">Mockup Type</label>
                <select
                  value={mockup.type || "laptop"}
                  onChange={(e) => {
                    const mockups = [...(sections.mockups || [])];
                    mockups[index] = { ...mockup, type: e.target.value as "laptop" | "desktop" };
                    updateSection("mockups", mockups);
                  }}
                  className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-50 focus:border-cyan-400/50 focus:outline-none"
                >
                  <option value="laptop">Laptop</option>
                  <option value="desktop">Desktop</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-400">Screen Image</label>
                <select
                  value={mockup.imageUrl || ""}
                  onChange={(e) => {
                    const mockups = [...(sections.mockups || [])];
                    mockups[index] = { ...mockup, imageUrl: e.target.value };
                    updateSection("mockups", mockups);
                  }}
                  className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-50 focus:border-cyan-400/50 focus:outline-none"
                >
                  <option value="">Select an image...</option>
                  {availableImages.map((img) => (
                    <option key={img.id} value={img.url}>{img.name}</option>
                  ))}
                </select>
              </div>
              {mockup.imageUrl && (
                <div className="relative h-32 w-full overflow-hidden rounded-md bg-slate-900">
                  <img src={mockup.imageUrl} alt={mockup.alt || ""} className="h-full w-full object-cover" />
                </div>
              )}
              <TextInput label="Title" value={mockup.title || ""} onChange={(v) => {
                const mockups = [...(sections.mockups || [])];
                mockups[index] = { ...mockup, title: v };
                updateSection("mockups", mockups);
              }} />
              <TextArea label="Description" value={mockup.description || ""} onChange={(v) => {
                const mockups = [...(sections.mockups || [])];
                mockups[index] = { ...mockup, description: v };
                updateSection("mockups", mockups);
              }} />
            </div>
          </div>
        ))}
        <button
          onClick={() => updateSection("mockups", [...(sections.mockups || []), { type: "laptop", imageUrl: "", alt: "" }])}
          className="w-full rounded-md border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
        >
          + Add Mockup
        </button>
      </div>
    </div>
  );
}

function CTASectionEditor({ sections, updateSection }: { sections: any; updateSection: (key: string, value: any) => void }) {
  return (
    <SectionEditor title="Final CTA">
      <TextInput label="Title" value={sections.finalCTA?.title || ""} onChange={(v) => updateSection("finalCTA", { ...sections.finalCTA, title: v })} />
      <TextArea label="Description" value={sections.finalCTA?.description || ""} onChange={(v) => updateSection("finalCTA", { ...sections.finalCTA, description: v })} />
      <TextInput label="Primary CTA Text" value={sections.finalCTA?.ctaPrimary || ""} onChange={(v) => updateSection("finalCTA", { ...sections.finalCTA, ctaPrimary: v })} />
      <TextInput label="Primary CTA Link" value={sections.finalCTA?.ctaPrimaryLink || ""} onChange={(v) => updateSection("finalCTA", { ...sections.finalCTA, ctaPrimaryLink: v })} />
      <TextInput label="Secondary CTA Text" value={sections.finalCTA?.ctaSecondary || ""} onChange={(v) => updateSection("finalCTA", { ...sections.finalCTA, ctaSecondary: v })} />
      <TextInput label="Secondary CTA Link" value={sections.finalCTA?.ctaSecondaryLink || ""} onChange={(v) => updateSection("finalCTA", { ...sections.finalCTA, ctaSecondaryLink: v })} />
      <TextInput label="Note" value={sections.finalCTA?.note || ""} onChange={(v) => updateSection("finalCTA", { ...sections.finalCTA, note: v })} />
    </SectionEditor>
  );
}
