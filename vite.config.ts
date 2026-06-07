import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@react-three/fiber")) {
              return "three-fiber";
            }
            if (
              id.includes("@react-three/drei") ||
              id.includes("@react-three/postprocessing")
            ) {
              return "three-ui";
            }
            if (id.includes("@dimforge")) {
              return "rapier-core";
            }
            if (id.includes("@react-three/rapier")) {
              return "three-physics";
            }
            if (id.includes("three-stdlib") || id.includes("/three/")) {
              return "three-core";
            }
            if (id.includes("gsap")) {
              return "gsap";
            }
            if (id.includes("react-fast-marquee")) {
              return "ui-effects";
            }
          }
        },
      },
    },
  },
});
