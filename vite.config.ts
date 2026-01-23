import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { ConfigEnv, loadEnv } from 'vite'
import { cwd } from 'node:process'

/**
 * Get the base URL from environment variables, or default to "/"
 * @param configEnv Loaded configuration
 * @returns The base URL as a string
 */
function baseURL(configEnv: ConfigEnv): string {
    const env = loadEnv(configEnv.mode, cwd())
    return env.VITE_BASE_URL ?? "/"
}

// https://vite.dev/config/
export default defineConfig((configEnv) => ({
    base: baseURL(configEnv),
    plugins: [
        vue(),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    build: {
        rollupOptions: {
            output: {
                assetFileNames: "[hash:16][extname]",
                chunkFileNames: "[hash:16].js",
                entryFileNames: "[hash:16].js",
            },
        },
    },
}))
