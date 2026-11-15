import type { Config } from "tailwindcss";

// As cores apontam para as variáveis CSS definidas em src/app/globals.css.
export default {
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        paper: "var(--paper)",
        "paper-deep": "var(--paper-deep)",
        surface: "var(--surface)",
        brass: "var(--brass)",
        "brass-ink": "var(--brass-ink)",
        "brass-soft": "var(--brass-soft)",
        muted: "var(--muted)",
        "on-dark": "var(--on-dark)",
        line: "var(--line)",
        field: "var(--field)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { container: "1240px" },
    },
  },
} satisfies Config;
