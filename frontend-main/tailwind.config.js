/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-inset": "inset 0 -7px 7px rgba(0, 0, 0, 0.05)", // Custom shadow
      },
      width: {
        22: "5.5rem", // 5.5rem 너비 추가
      },
      colors: {
        "catch-tier-Bronze": "#9d4900",
        "catch-tier-Silver": "#c0c0c0",
        "catch-tier-Gold": "#ffb028",
        "catch-tier-Platinum": "#27e2a4",
        "catch-tier-Diamond": "#41caff",
        "catch-tier-Ruby": "#f5005a",
        "catch-sub-100": "#fef8ec",
        "catch-sub-200": "#fce9c9",
        "catch-sub-300": "#f8d18f",
        "catch-sub-400": "#f5b354",
        "catch-main-400": "#f29627",
        "catch-main-700": "#ad3910",
        "catch-gray-100": "#f6f6f6",
        "catch-gray-200": "#e6e6e6",
        "catch-gray-300": "#999999",
        "catch-gray-400": "#666666",
        "catch-gray-500": "#1a1a1a",
        "catch-gray-999": "#000000",
        "catch-gray-000": "#ffffff",
        "catch-system-color-success": "#43b836",
        "catch-system-color-info": "#519ee6",
        "catch-system-color-error": "#e65b5b",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      fontWeight: {
        bold: "700", // Tailwind에서 bold는 일반적으로 700으로 사용
        medium: "500",
      },
      fontSize: {
        caption1: ["12px", { lineHeight: "1.5" }],
        caption2: ["14px", { lineHeight: "1.5" }],
        body2: ["16px", { lineHeight: "1.5" }],
        body1: ["20px", { lineHeight: "1.5" }],
        sub2: ["24px", { lineHeight: "1.5" }],
        sub1: ["32px", { lineHeight: "1.5" }],
        title: ["36px", { lineHeight: "1.5" }],
        h2: ["48px", { lineHeight: "1.5" }],
        h1: ["64px", { lineHeight: "1.5" }],
      },
      letterSpacing: {
        0: "-0.004em",
        1: "-0.02em",
      },
      borderRadius: {
        xs: "5px",
        sm: "8px",
        md: "10px",
        lg: "15px",
        xl: "20px",
      },
    },
  },
  plugins: [],
};
