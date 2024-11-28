const loadTranslations = async (language: "en" | "ar") => {
  switch (language) {
    case "ar":
      return (await import("../Locales/ar.json")).default;
    case "en":
    default:
      return (await import("../locales/en.json")).default;
  }
};

export default loadTranslations;
