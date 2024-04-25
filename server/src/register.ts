import { Strapi } from "@strapi/strapi";
import * as pckg from "../../package.json";

export default ({ strapi }: { strapi: Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: "phone",
    plugin: pckg.strapi.name,
    type: "string",
  });
};
