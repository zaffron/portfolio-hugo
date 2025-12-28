/** @type {import('tailwindcss').Config} */
export default {
  content: ["./layouts/**/*.html", "./content/**/*.md", "./assets/**/*.css"],
  darkMode: "class", // Enable dark mode with class strategy
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#374151",
            a: {
              color: "#6b63ff",
              "&:hover": {
                color: "#5a52e8",
              },
            },
            code: {
              color: "inherit",
              backgroundColor: "inherit",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.25rem",
              fontWeight: "500",
            },
            pre: {
              color: "inherit",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
        invert: {
          css: {
            "--tw-prose-body": "#e5e7eb", // gray-200
            "--tw-prose-headings": "#f9fafb", // almost white
            "--tw-prose-links": "#a5b4fc", // indigo-300
            "--tw-prose-bold": "#f9fafb",
            "--tw-prose-code": "#8b83ff",
            "--tw-prose-quotes": "#d1d5db",
            "--tw-prose-quote-borders": "#6b63ff",
            "--tw-prose-hr": "#374151",
            code: {
              color: "inherit",
            },
            pre: {
              color: "inherit",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
