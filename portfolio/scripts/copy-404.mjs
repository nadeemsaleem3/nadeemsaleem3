// GitHub Pages serves 404.html for unknown paths. Copying the built SPA shell
// there lets client-side routes (for example /projects/malwareguard-ai) load
// correctly when a shared link is opened or the page is refreshed.
import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const indexHtml = resolve(root, 'dist/index.html');
const notFoundHtml = resolve(root, 'dist/404.html');

copyFileSync(indexHtml, notFoundHtml);
console.log('GitHub Pages fallback created: dist/404.html');
