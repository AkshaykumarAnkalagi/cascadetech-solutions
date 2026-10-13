import { defineField, defineType } from "sanity";

export const statSchema = defineType({
  name: "stat",
  title: "Stat / Credibility Metric",
  type: "document",
  fields: [
    defineField({
      name: "value",
      title: "Metric Value",
      type: "string",
      description: 'Display figure (e.g. "5+", "45+", "2", "99.4%")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Metric Label",
      type: "string",
      description: 'e.g. "Years of Innovation", "Projects Delivered"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "string",
      description: "Additional context shown underneath the stat",
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
      title: "label",
      subtitle: "value",
    },
  },
});
