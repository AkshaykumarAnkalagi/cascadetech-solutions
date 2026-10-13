import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project / Case Study",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      description: 'e.g. "Startopia" or "TextYourBoss.ai"',
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
      name: "category",
      title: "Category / Domain",
      type: "string",
      description: 'e.g. "Startup Ecosystem Platform" or "AI Communication & Workflow Engine"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullDescription",
      title: "Full Case Study Description",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "status",
      title: "Project Status",
      type: "string",
      options: {
        list: [
          { title: "Live Product", value: "Live Product" },
          { title: "Active Enterprise", value: "Active Enterprise" },
          { title: "In Pipeline", value: "In Pipeline" },
        ],
      },
      initialValue: "Live Product",
    }),
    defineField({
      name: "featured",
      title: "Feature on Homepage",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color Hex",
      type: "string",
      initialValue: "#00F2FE",
    }),
    defineField({
      name: "keyFeatures",
      title: "Key Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "metrics",
      title: "Key Metrics / Impact Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Metric Label", type: "string" },
            { name: "value", title: "Metric Value", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "link",
      title: "Live Product URL",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
});
