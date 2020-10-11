"use strict";

// AllegroRestClient https://www.npmjs.com/package/allegro-rest-client
const { AllegroRestClient } = require("allegro-rest-client");

/**
 * Allegro Hook
 */

const getStorage = (allegroPlugin) => {
  const storageMap = new Map();
  return allegroPlugin
    ? {
        set: allegroPlugin.services.allegro.set,
        get: allegroPlugin.services.allegro.get,
      }
    : {
        async set(account, tokens) {
          storageMap.set(account, tokens);
        },
        async get(account) {
          return storageMap.get(account);
        },
      };
};

module.exports = (strapi) => {
  return {
    /**
     * Default options
     * This object is merged to strapi.config.hook.settings.allegro
     */
    defaults: {
      accounts: [],
      sandbox: false,
      logger: false,
      app_name: "",
      type: "",
      client_id: "",
      client_secret: "",
    },

    /**
     * Initialize the hook
     */
    async initialize() {
      // Merging defaults and config/hook.js
      const { enabled, accounts, sandbox, logger, ...config } = {
        ...this.defaults,
        ...strapi.config.hook.settings.allegro,
      };

      if (accounts.length < 1) {
        throw Error(
          "Allegro Hook: Could not initialize - hook does not contain any accounts"
        );
      }

      if (!["device", "web"].includes(config.type)) {
        throw Error(
          'Allegro Hook: Could not initialize - config type must be "device" or "web"'
        );
      }

      if (!config.app_name) {
        throw Error(
          "Allegro Hook: Could not initialize - config app_name must be defined"
        );
      }

      const options = {
        sandbox,
        logger,
        storage: getStorage(strapi.plugins["allegro"] || null),
      };

      strapi.hook.allegro.clients = new Map();
      for (const account of accounts) {
        const client = await AllegroRestClient(config, {
          ...options,
          account,
        });
        strapi.hook.allegro.clients.set(account, client);
      }
    },
  };
};
