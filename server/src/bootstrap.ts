import { Strapi } from "@strapi/strapi";

const accessActions = [
  {
    section: "plugins",
    displayName: "View / Edit Configuration",
    uid: "config",
    pluginName: "strapi-phone-validator",
  },
];

export default async ({ strapi }: { strapi: Strapi }) => {
  // bootstrap phase
  await strapi.admin.services.permission.actionProvider.registerMany(
    accessActions
  );
};
