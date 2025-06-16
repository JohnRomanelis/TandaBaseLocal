import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwind(), // 👈 this handles Tailwind for you
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
