import preact from '@preact/preset-vite'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
    plugins: [preact(), svgr()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './test/setup.js',
    },
    resolve: {
        alias: {
            react: 'preact/compat',
            'react-dom': 'preact/compat',
        },
    },
})
