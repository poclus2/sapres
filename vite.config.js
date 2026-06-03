import { defineConfig } from 'vite';
import { resolve } from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { quality: 80, lossless: true },
      avif: { quality: 70 },
    }),
  ],
  preview: {
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        shop: resolve(__dirname, 'shop.html'),
        cart: resolve(__dirname, 'cart.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
