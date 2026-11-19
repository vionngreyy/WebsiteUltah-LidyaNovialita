import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function nonBlockingCss() {
  return {
    name: 'non-blocking-css',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/,
        `<link rel="preload" as="style" href="$1" fetchpriority="high" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="$1"></noscript>`
      );
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), nonBlockingCss()],
});
