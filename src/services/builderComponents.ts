/**
 * Register custom React components with Builder.io
 * This allows you to use your existing components visually in Builder.io
 */

import { builder } from "@builder.io/react";
import { ValuePropsGrid } from "../components/ValuePropsGrid";
import { ServicesOverview } from "../components/ServicesOverview";
import { ProductPreview } from "../components/ProductPreview";
import { AiSection } from "../components/AiSection";
import { TimelineStrip } from "../components/TimelineStrip";
import { FinalCtaBand } from "../components/FinalCtaBand";
import { MetricsShowcase } from "../components/MetricsShowcase";
import { LaptopMockup } from "../components/LaptopMockup";
import { DesktopMockup } from "../components/DesktopMockup";
import { HeroVisual } from "../components/HeroVisual";

// Register components with Builder.io
// These will appear in the Builder.io visual editor for drag-and-drop

builder.registerComponent(ValuePropsGrid, {
  name: "Value Props Grid",
  description: "Display value propositions in a grid layout",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Why Orca?",
    },
    {
      name: "subtitle",
      type: "string",
      defaultValue: "A decade of freight audit expertise, now enhanced with AI-driven analytics and automation.",
    },
  ],
});

builder.registerComponent(ServicesOverview, {
  name: "Services Overview",
  description: "Display services in a grid with icons",
  inputs: [],
});

builder.registerComponent(ProductPreview, {
  name: "Product Preview",
  description: "Show product features with preview images",
  inputs: [],
});

builder.registerComponent(AiSection, {
  name: "AI Section",
  description: "Display AI capabilities section",
  inputs: [],
});

builder.registerComponent(TimelineStrip, {
  name: "Timeline Strip",
  description: "Display timeline of milestones",
  inputs: [],
});

builder.registerComponent(FinalCtaBand, {
  name: "Final CTA Band",
  description: "Final call-to-action section",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Ready to transform your freight audit?",
    },
    {
      name: "description",
      type: "string",
      defaultValue: "See how Orca can help you catch overcharges and gain visibility.",
    },
    {
      name: "ctaText",
      type: "string",
      defaultValue: "Book a demo",
    },
    {
      name: "ctaLink",
      type: "string",
      defaultValue: "/contact",
    },
  ],
});

builder.registerComponent(MetricsShowcase, {
  name: "Metrics Showcase",
  description: "Display key metrics with animated counters",
  inputs: [],
});

builder.registerComponent(LaptopMockup, {
  name: "Laptop Mockup",
  description: "Display an image in a laptop frame",
  inputs: [
    {
      name: "imageUrl",
      type: "string",
      required: true,
      defaultValue: "",
    },
    {
      name: "alt",
      type: "string",
      defaultValue: "Laptop screen",
    },
  ],
});

builder.registerComponent(DesktopMockup, {
  name: "Desktop Mockup",
  description: "Display an image in a desktop monitor frame",
  inputs: [
    {
      name: "imageUrl",
      type: "string",
      required: true,
      defaultValue: "",
    },
    {
      name: "alt",
      type: "string",
      defaultValue: "Desktop screen",
    },
  ],
});

builder.registerComponent(HeroVisual, {
  name: "Hero Visual",
  description: "Hero section visual component",
  inputs: [],
});

console.log("✅ Builder.io custom components registered");
