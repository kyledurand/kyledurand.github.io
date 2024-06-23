import {defineConfig} from "astro/config";
import yaml from "@rollup/plugin-yaml";
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  vite: {plugins: [yaml()]},
  integrations: [lit(), (await import("astro-compress")).default()],
  site: "https://kyledurand.github.io",
});
