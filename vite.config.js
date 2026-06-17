import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        // Rozbij ciężkie biblioteki na osobne chunki — three jest dodatkowo
        // ładowane dynamicznie (import() w useExperience), więc trafia do
        // własnego pliku pobieranego dopiero, gdy WebGL jest włączone.
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                    gsap: ['gsap'],
                    motion: ['framer-motion'],
                    lenis: ['lenis'],
                },
            },
        },
        chunkSizeWarningLimit: 700,
    },
});
