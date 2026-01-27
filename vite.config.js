import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    base: "/portfolio/",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                resume: resolve(__dirname, 'resume.html'),
            },
        },
    },
});
