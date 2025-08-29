import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	css: {
		// Use a minimal PostCSS config for tests to avoid Tailwind/PostCSS plugin issues
		postcss: path.resolve(__dirname, 'test/postcss.config.cjs'),
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./test/setup.ts'],
	},
});


