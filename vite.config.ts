import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    dts({ rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "DiviaAPI",
      formats: ["es", "cjs"],
      fileName: (format) => `divia-api.${format === "es" ? "mjs" : "cjs"}`,
    },
    sourcemap: true,
  },
});
