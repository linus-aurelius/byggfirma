import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';
import { glob } from 'glob';

function copyMarkdownPlugin() {
	return {
		name: 'copy-markdown',
		buildStart() {
			// Copy markdown files to public directory
			const files = glob.sync('src/data/**/*.md');
			files.forEach(file => {
				const destPath = file.replace('src/', 'static/');
				const destDir = destPath.substring(0, destPath.lastIndexOf('/'));
				mkdirSync(destDir, { recursive: true });
				copyFileSync(file, destPath);
			});
		}
	};
}

export default defineConfig({
	plugins: [sveltekit(), copyMarkdownPlugin()]
});
