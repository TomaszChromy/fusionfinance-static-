/**
 * FusionFinance.pl - Prepare for Static Export
 * Tymczasowo przenosi API routes przed static build
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, '..', 'app', 'api');
const backupDir = path.join(__dirname, '..', '.api-backup');

console.log('📦 Przygotowuję do eksportu statycznego...');

// Na Vercel nie robimy static-export (SSR, API musi zostać).
if (process.env.VERCEL === '1') {
  console.log('ℹ️ Vercel build – pomijam prepare-static (zostawiam app/api).');
  process.exit(0);
}

// Utwórz folder backup
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Przenieś folder api
if (fs.existsSync(apiDir)) {
  // Kopiuj rekursywnie
  fs.cpSync(apiDir, backupDir, { recursive: true });
  
  // Usuń oryginał
  fs.rmSync(apiDir, { recursive: true, force: true });
  
  console.log('✅ API routes przeniesione do .api-backup');
} else {
  console.log('ℹ️ Brak folderu app/api');
}

console.log('🚀 Gotowe do build:static');
