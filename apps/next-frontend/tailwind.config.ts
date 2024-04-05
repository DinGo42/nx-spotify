import { createGlobPatternsForDependencies } from "@nx/next/tailwind";
import { join } from "path";

// eslint-disable-next-line @nx/enforce-module-boundaries
import { Config, defaultConfig } from "../../dist/packages/tailwind/src";

export default {
  content: [
    join(__dirname, "src/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./assets/**/*.svg"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  presets: [defaultConfig],
} satisfies Config;
