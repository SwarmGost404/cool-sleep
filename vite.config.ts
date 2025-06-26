import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact(),svgr()],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    }
  }
})
