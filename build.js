import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

console.log('Construction du projet...');

// Réinitialisation du dossier dist/
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copie des fichiers sources dans dist/
fs.cpSync('src', distDir, { recursive: true });

// Création d'un manifest de build
const manifest = {
  buildDate: new Date().toISOString(),
  nodeVersion: process.version,
  files: fs.readdirSync(distDir)
};

fs.writeFileSync(
  path.join(distDir, 'build-manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log(`Build terminé avec succès dans ${distDir} :`, manifest.files);
