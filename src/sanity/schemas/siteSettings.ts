import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      initialValue: "CascadeTech Solutions",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Core Positioning / Tagline",
      type: "string",
      initialValue: "Delivering Intelligent and Scalable Digital Solutions",
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      initialValue: "cascadetechnologiessolutions@gmail.com",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Contact Phone",
      type: "string",
      initialValue: "+91 836 295 4488",
    }),
    defineField({
      name: "location",
      title: "Office Location / Address",
      type: "string",
      initialValue: "Vidya-Nagar, Hubballi, Karnataka, India – 580021",
    }),
    defineField({
      name: "navigation",
      title: "Header Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "path", title: "Path", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "Global SEO Defaults",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "companyName",
      subtitle: "tagline",
    },
  },
});
