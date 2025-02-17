import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 5123,
        strictPort: true,
        host: true,
    },
    plugins: [react()],
    base: "./",
    build: {
        outDir: "dist-react",
    },
});
