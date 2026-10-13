import { defineType, defineField } from "sanity";

export const localeStringSchema = defineType({
  name: "localeString",
  title: "Localized String",
  type: "object",
  fieldsets: [
    {
      title: "Regional Translations",
      name: "translations",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({ name: "en", title: "English (Default)", type: "string" }),
    defineField({ name: "kn", title: "Kannada (ಕನ್ನಡ)", type: "string", fieldset: "translations" }),
    defineField({ name: "hi", title: "Hindi (हिन्दी)", type: "string", fieldset: "translations" }),
    defineField({ name: "te", title: "Telugu (తెలుగు)", type: "string", fieldset: "translations" }),
    defineField({ name: "ta", title: "Tamil (தமிழ்)", type: "string", fieldset: "translations" }),
    defineField({ name: "ml", title: "Malayalam (മലയാളം)", type: "string", fieldset: "translations" }),
    defineField({ name: "mr", title: "Marathi (मराठी)", type: "string", fieldset: "translations" }),
    defineField({ name: "bn", title: "Bengali (বাংলা)", type: "string", fieldset: "translations" }),
    defineField({ name: "gu", title: "Gujarati (ગુજરાતી)", type: "string", fieldset: "translations" }),
  ],
});

export const localeTextSchema = defineType({
  name: "localeText",
  title: "Localized Text (Paragraph)",
  type: "object",
  fieldsets: [
    {
      title: "Regional Translations",
      name: "translations",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({ name: "en", title: "English (Default)", type: "text", rows: 3 }),
    defineField({ name: "kn", title: "Kannada (ಕನ್ನಡ)", type: "text", rows: 3, fieldset: "translations" }),
    defineField({ name: "hi", title: "Hindi (हिन्दी)", type: "text", rows: 3, fieldset: "translations" }),
    defineField({ name: "te", title: "Telugu (తెలుగు)", type: "text", rows: 3, fieldset: "translations" }),
    defineField({ name: "ta", title: "Tamil (தமிழ்)", type: "text", rows: 3, fieldset: "translations" }),
    defineField({ name: "ml", title: "Malayalam (മലയാളം)", type: "text", rows: 3, fieldset: "translations" }),
    defineField({ name: "mr", title: "Marathi (मराठी)", type: "text", rows: 3, fieldset: "translations" }),
    defineField({ name: "bn", title: "Bengali (বাংলা)", type: "text", rows: 3, fieldset: "translations" }),
    defineField({ name: "gu", title: "Gujarati (ગુજરાતી)", type: "text", rows: 3, fieldset: "translations" }),
  ],
});
