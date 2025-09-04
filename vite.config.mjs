import { defineConfig } from 'vite';
import vuePlugin from '@vitejs/plugin-vue';
import path from 'path';
import { checker } from 'vite-plugin-checker';

export default defineConfig(() => {
    return {
        appType: 'spa',
        resolve: {
            extensions: ['.js', '.ts', '.vue', '.mjs'],
        },
        build: {
            target: 'es2020',
            outDir: path.resolve(__dirname, 'dist'),
            copyPublicDir: false,
            publicDir: false,
            reportCompressedSize: false,
            chunkSizeWarningLimit: false,
            rollupOptions: {
                input: [
                    './src/index.html',
                ],
                output: {
                    entryFileNames: '[name].bundle.js',
                    chunkFileNames: 'chunks/[name].[hash].js',
                    assetFileNames: 'assets/[name].[hash].[ext]',
                },
            },
        },
        css: {
            preprocessorMaxWorkers: 4,
        },
        base: './',
        plugins: [
            vuePlugin(),
            checker({
                vueTsc: true,
            }),
        ],
        server: {
            host: '0.0.0.0',
            cors: true,
            open: '/src/index.html',
        },
        test: {
            globals: true,
            environment: 'jsdom',
            include: ['**/*.test.{ts,js}'],
            setupFiles: './vitest.setup.mjs',
        },
    };
});
