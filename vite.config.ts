import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/puyn-supa/", // ✅ 改成你實際 GitHub Pages 的 repo 名稱
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
