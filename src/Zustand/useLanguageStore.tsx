import { create } from "zustand";
import { getCookie, setCookie } from "cookies-next";
import loadTranslations from "@/config/i18n";

interface LanguageState {
  language: "ar" | "en";
  translations: any;
  setLanguage: (language: "en" | "ar") => void;
  loadTranslations: (language: "en" | "ar") => Promise<void>;
}

const getInitialLanguage = (): "en" | "ar" => {
  const cookieLang = getCookie("language") as "ar" | "en";
  return cookieLang || "ar"; // Default to Arabic if no cookie
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: getInitialLanguage(),
  translations: {},

  // Set language and load the corresponding translations
  setLanguage: async (language) => {
    set({ language });
    setCookie("language", language);
    const translations = await loadTranslations(language);
    set({ translations });
  },

  // Load translations for the initial language
  loadTranslations: async (language) => {
    const translations = await loadTranslations(language);
    set({ translations });
  },
}));
