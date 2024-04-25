import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import Initializer from "./components/Initializer";
import PluginIcon from "./components/PluginIcon";
import getTrad from "./utils/getTrad";
import {
  defaultCountries,
  parseCountry,
  CountryData,
} from "react-international-phone";

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.customFields.register({
      name: "phone",
      pluginId, // the custom field is created by plugin
      type: "string", // the phone will be stored as a string
      intlLabel: {
        id: getTrad("input.label"),
        defaultMessage: name,
      },
      intlDescription: {
        id: getTrad("input.description"),
        defaultMessage: "Validate phone number",
      },
      icon: PluginIcon, // don't forget to create/import your icon component
      components: {
        Input: async () => import("./components/Input"),
      },
      error: {
        id: getTrad("form.attribute.item.phoneValidator"),
        defaultMessage: "This is an invalid phone number",
      },
      options: {
        advanced: [
          {
            name: "options.country",
            type: "select",
            intlLabel: {
              id: getTrad("attribute.item.defaultCountry"),
              defaultMessage: "Default Country",
            },
            options: defaultCountries.map((country: CountryData) => {
              const { iso2, name } = parseCountry(country);
              return {
                key: iso2,
                value: iso2,
                metadatas: {
                  intlLabel: {
                    id: getTrad(`country.item.${iso2}`),
                    defaultMessage: name,
                  },
                },
              };
            }),
          },
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings",
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.requiredField",
                  defaultMessage: "Required field",
                },
                description: {
                  id: "form.attribute.item.requiredField.description",
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
              {
                name: "private",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.privateField",
                  defaultMessage: "Private field",
                },
                description: {
                  id: "form.attribute.item.privateField.description",
                  defaultMessage:
                    "This field will not show up in the API response",
                },
              },
            ],
          },
        ],
      },
    });

    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
