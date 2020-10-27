import { writable } from "svelte/store";
import { locales } from "./data.js";

const getInitialLocale = () => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return (
      navigator.userLanguage ||
      navigator.language ||
      navigator.browserLanguage ||
      Object.keys(locales)[0]
    );
  }
};

let currentLocaleCode = getInitialLocale().substr(0, 2);

if (!(currentLocaleCode in locales)) currentLocaleCode = "en";

let currentLocale = locales[currentLocaleCode];

console.log(`Initial locale ${currentLocaleCode}`);

const { subscribe, set } = writable(locales[currentLocaleCode]),
  setLocale = (newLocaleCode) => {
    if (currentLocaleCode === newLocaleCode) return;
    const newLocale = locales[newLocaleCode];
    if (newLocale) {
      currentLocaleCode = newLocaleCode;
      currentLocale = newLocale;
      set(newLocale);
    }
  },
  getAvailableLocales = () =>
    Object.entries(locales).map(([k, v]) => [k, v.name]),
  getCurrentLocaleCode = () => currentLocaleCode,
  getCurrentLocale = () => currentLocale;

export const locale = {
  subscribe,
  setLocale,
  getAvailableLocales,
  getCurrentLocaleCode,
  getCurrentLocale
};
