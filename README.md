# strapi-hook-allegro

This hook allows you to use [Allegro Rest API](https://developer.allegro.pl/documentation/) with [Strapi](https://github.com/strapi/strapi).

## Installation

```bash
# using yarn
yarn add strapi-hook-allegro

# using npm
npm install strapi-hook-allegro --save
```

## Hook config

To activate and configure the hook, you need to create or update the file `./config/hook.js` in your strapi app.

```js
module.exports = {
  settings: {
    // ...
    allegro: {
      enabled: true,
      sandbox: true,
      accounts: [""], // list of allegro accounts used by hook
      app_name: "",
      type: "", // device or web
      client_id: "",
      client_secret: "",
    },
  },
};
```

### Resources

- [MIT License](LICENSE.md)

### Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
