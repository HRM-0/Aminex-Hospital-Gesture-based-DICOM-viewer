import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs' // 1. Import the plugin

export default defineConfig({
    plugins: [
        react(),
        viteCommonjs() // 2. Add it to your plugins array
    ],
    server: {
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp",
        },
    },
    // 3. Prevent Vite from mangling the DICOM image loader dependencies
    optimizeDeps: {
        exclude: ['@cornerstonejs/dicom-image-loader'],
        include: ['dicom-parser'],
    },
    // 4. Force web workers to compile as standard ES modules
    worker: {
        format: 'es',
    },
})