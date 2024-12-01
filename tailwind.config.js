/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "1px 1px 15px 0px rgba(51, 51, 51, 0.03)",
      },
      colors: {
        mainYellow: "#E9C237",
        mainGrey: "#4C4C4C",
        subGrey: "#666666",
        backGrey: "#f7f7f7",
      },
      screens: {
        mobile: { max: "500px" }, // Mobile breakpoint at 500px and below
        tablet: { max: "1024px" }, // Tablet breakpoint at 1024px and below
        desktop: { min: "1024px" }, // Desktop breakpoint above 1024px
      },
      backgroundImage: {
        "gradient-custom":
          "linear-gradient(90deg, #F9E471 0%, #E5BB32 25%, #F3D859 50%, #F5DE6B 75%)",
        "custom-bg": "url('/public/backkground.png')",
      },
      fontFamily: {
        ibm: ["var(--font-ibm)"], // Update font family to use the imported variable
        ibmArabic: ["var(--font-ibm-arabic)"], // Update font family to use the imported variable
        tajawal: ["var(--font-tajawal)"], // Update font family to use the imported variable
      },
      boxShadow: {
        custom: "1px 1px 16px 0 rgba(51, 51, 51, 0.04)",
        newCustom: "1px 1px 15px 0px rgba(51, 51, 51, 0.03)",
      },
      scale: {
        "-1": "-1",
      },
    },
  },
  plugins: [],
};
