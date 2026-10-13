import { seoSchema } from "./seo";
import { statSchema } from "./stat";
import { serviceSchema } from "./service";
import { projectSchema } from "./project";
import { siteSettingsSchema } from "./siteSettings";
import { homePageSchema } from "./homePage";
import { localeStringSchema, localeTextSchema } from "./localeString";

export const schemaTypes = [
  localeStringSchema,
  localeTextSchema,
  seoSchema,
  statSchema,
  serviceSchema,
  projectSchema,
  siteSettingsSchema,
  homePageSchema,
];
