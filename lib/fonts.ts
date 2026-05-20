import localFont from "next/font/local";

/** Display serif used for headings. */
export const serif = localFont({
  src: [
    { path: "../public/fonts/newsreader-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/newsreader-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

/** UI sans used for body copy and product mockups. */
export const sans = localFont({
  src: [
    { path: "../public/fonts/inter-tight-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/inter-tight-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/inter-tight-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/inter-tight-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});
