import { defineField, defineType } from "sanity";

export const homePageSchema = defineType({
  name: "homePage",
  title: "Homepage Settings",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Hero Eyebrow Text",
      type: "string",
      initialValue: "NEXT-GEN TECHNOLOGY PARTNER",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      initialValue: "Delivering Intelligent and Scalable Digital Solutions",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
      initialValue:
        "We architect high-performance websites, custom enterprise software, and applied AI systems engineered to accelerate ambitious businesses.",
    }),
    defineField({
      name: "primaryCtaText",
      title: "Primary CTA Text",
      type: "string",
      initialValue: "Start a Project",
    }),
    defineField({
      name: "secondaryCtaText",
      title: "Secondary CTA Text",
      type: "string",
      initialValue: "Explore Live Products",
    }),
    defineField({
      name: "trustIndicators",
      title: "Trust Indicators",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["AI-Powered Systems", "Reliable & Scalable", "Expert Engineering Support"],
    }),
    defineField({
      name: "processSectionTitle",
      title: "Process Section Headline",
      type: "string",
      initialValue: "Our Engineering Process",
    }),
    defineField({
      name: "finalCtaHeadline",
      title: "Final CTA Headline",
      type: "string",
      initialValue: "Ready to Build Something Extraordinary?",
    }),
  ],
  preview: {
    select: {
      title: "heroHeadline",
      subtitle: "eyebrow",
    },
  },
});
