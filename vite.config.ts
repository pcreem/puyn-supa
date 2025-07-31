// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ base 記得設成你的 repo 名稱（如果是 puyn-supa）
export default defineConfig({
  base: '/puyn-supa/',
  plugins: [react()],
});
