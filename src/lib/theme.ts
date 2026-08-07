export type Mode = "light" | "dark" | "system";

export interface Palette {
  id: string;
  label: string;
  swatch: string; // representative color for the picker UI
}

export const PALETTES: Palette[] = [
  { id: "indigo", label: "Indigo", swatch: "#6366f1" },
  { id: "ocean", label: "Ocean", swatch: "#0ea5e9" },
  { id: "sunset", label: "Sunset", swatch: "#f97316" },
  { id: "forest", label: "Forest", swatch: "#10b981" },
  { id: "rose", label: "Rose", swatch: "#e11d48" },
  { id: "mono", label: "Mono", swatch: "#525252" },
];

export const DEFAULT_PALETTE = "indigo";
export const MODE_STORAGE_KEY = "gariyuuu-mode";
export const PALETTE_STORAGE_KEY = "gariyuuu-palette";

// Runs before first paint (see layout.tsx) so there's no flash of the wrong
// theme/palette on load. Kept as a plain string, not JSX, since it has to be
// injected as an inline <script> before hydration.
export const NO_FLASH_SCRIPT = `
(function () {
  try {
    var mode = localStorage.getItem(${JSON.stringify(MODE_STORAGE_KEY)}) || "system";
    var palette = localStorage.getItem(${JSON.stringify(PALETTE_STORAGE_KEY)}) || ${JSON.stringify(DEFAULT_PALETTE)};
    var resolved = mode === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : mode;
    document.documentElement.setAttribute("data-theme", resolved);
    document.documentElement.setAttribute("data-palette", palette);
  } catch (e) {}
})();
`;
