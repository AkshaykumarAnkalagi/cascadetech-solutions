import { defineField, defineType } from "sanity";

export const serviceSchema = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Benefit-Focused Description",
      type: "text",
      rows: 2,
      description: "Brief summary shown on homepage service cards",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Service Description",
      type: "text",
      rows: 5,
      description: "Detailed overview shown on the dedicated services page",
    }),
    defineField({
      name: "iconName",
      title: "Icon Name",
      type: "string",
      description: "Lucide icon name (e.g. Globe, Palette, Cpu, Bot, RefreshCw, Sparkles, GraduationCap)",
    }),
    defineField({
      name: "benefits",
      title: "Key Benefits",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "deliverables",
      title: "Core Deliverables",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "techStack",
      title: "Technologies & Frameworks",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "shortDescription",
    },
  },
});
