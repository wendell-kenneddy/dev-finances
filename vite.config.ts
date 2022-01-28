import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      includeAssets: [
        '/*.svg',
        'apple-touch-icon.png',
        'favicon.ico',
        'manifest.json'
      ],
      devOptions: { enabled: true }
    })
  ]
});
