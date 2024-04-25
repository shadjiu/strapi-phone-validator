# Strapi-Phone-Validator

<p align="center">
  <img src="https://raw.githubusercontent.com/shadjiu/strapi-phone-validator/main/pictures/logo.svg" alt="Strapi Phone Validator" width="300" height="300" />
</p>

Strapi Phone Validator is a powerful and easy-to-use plugin designed to validate phone numbers in various formats. With support for international phone numbers, it offers comprehensive validation to ensure the accuracy of user-provided phone data in your applications.

It's a integration of [React International Phone](https://www.npmjs.com/package/react-international-phone) library.

## ❗ Requirements

- Strapi v4

## 🔧 Installation

You just need to install the `strapi-phone-validator` package via npm or yarn, at the root of your strapi project.

**npm:**

```bash
npm i strapi-phone-validator
```


**yarn:**

```bash
yarn add strapi-phone-validator
```


## ✨ Usage

Create a custom field for a phone number on content type builder page.

![Preview](https://github.com/shadjiu/strapi-phone-validator/blob/main/pictures/content-builder.gif?raw=true)

Now you can use Strapi Phone Validator as a custom field.

![Preview](https://github.com/shadjiu/strapi-phone-validator/blob/main/pictures/content.gif?raw=true)



You can also validate a phone number also on creating a new entity via API endpoint:

```
<code>
import { factories, Strapi } from "@strapi/strapi";
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

export default factories.createCoreController(
  "api::.......",
  ({ strapi }: { strapi: Strapi }) => ({
    async create(ctx) {
      const { data } = ctx.request.body;

     const isValid = isPhoneValid(data.phone);


     if(isValid) {
        //...
     }

    ...
    },
  })
);
<code>
```

**To make Strapi Phone Validator work, you should take a look at the next section.**

After restarting your Strapi app, Strapi Phone Validator should be listed as one of your plugins.

## 🚀 Strapi Configuration (required)

Allow Strapi Phone Validator assets to be loaded correctly by customizing the **strapi::security** middleware inside `./config/middlewares.js`.

Instead of:

```js
export default [
  // ...
  'strapi::security',
  // ...
];
```

Write:

```js
export default [
  // ...
    {
        name: "strapi::security",
        config: {
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
            "connect-src": ["'self'", "https:"],
            "script-src": ["https://cdnjs.cloudflare.com"],
            "media-src": ["https://cdnjs.cloudflare.com"],
            "img-src": ["https://cdnjs.cloudflare.com"],
            },
        },
        },
    },
  // ...
];
```
