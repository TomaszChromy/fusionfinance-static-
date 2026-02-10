/**
 * FusionFinance.pl - Restore API Routes & Finalize Build
 * Przywraca API routes po static build i kopiuje pliki konfiguracyjne
 */
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, '..', 'app', 'api');
const backupDir = path.join(__dirname, '..', '.api-backup');
const outDir = path.join(__dirname, '..', 'out');
const publicDir = path.join(__dirname, '..', 'public');

console.log('🔄 Przywracam API routes...');

// Przywróć folder api
if (fs.existsSync(backupDir)) {
  // Usuń api jeśli istnieje (nie powinno)
  if (fs.existsSync(apiDir)) {
    fs.rmSync(apiDir, { recursive: true, force: true });
  }

  // Kopiuj z powrotem
  fs.cpSync(backupDir, apiDir, { recursive: true });

  // Usuń backup
  fs.rmSync(backupDir, { recursive: true, force: true });

  console.log('✅ API routes przywrócone');
} else {
  console.log('ℹ️ Brak backupu do przywrócenia');
}

// Kopiuj pliki konfiguracyjne do out
console.log('📋 Kopiuję pliki konfiguracyjne...');

const filesToCopy = ['.htaccess', 'robots.txt'];

for (const file of filesToCopy) {
  const src = path.join(publicDir, file);
  const dest = path.join(outDir, file);

  if (fs.existsSync(src) && fs.existsSync(outDir)) {
    fs.copyFileSync(src, dest);
    console.log(`✅ ${file} skopiowany do out/`);
  }
}

// Kopiuj pliki PHP z public/api do out/api
console.log('📋 Kopiuję pliki PHP API...');

const publicApiDir = path.join(publicDir, 'api');
const outApiDir = path.join(outDir, 'api');

if (fs.existsSync(publicApiDir)) {
  // Utwórz folder out/api jeśli nie istnieje
  if (!fs.existsSync(outApiDir)) {
    fs.mkdirSync(outApiDir, { recursive: true });
  }

  // Kopiuj wszystkie pliki PHP
  const phpFiles = fs.readdirSync(publicApiDir).filter(f => f.endsWith('.php'));

  for (const file of phpFiles) {
    const src = path.join(publicApiDir, file);
    const dest = path.join(outApiDir, file);
    fs.copyFileSync(src, dest);
    console.log(`✅ ${file} skopiowany do out/api/`);
  }
}

// Usuń niepotrzebne pliki z out
console.log('🧹 Czyszczę niepotrzebne pliki...');
let deletedCount = 0;

function cleanUnnecessaryFiles(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      cleanUnnecessaryFiles(filePath);
    } else if (
      file.endsWith('.txt') ||
      file.includes('__next') ||
      file.endsWith('.map')
    ) {
      fs.unlinkSync(filePath);
      deletedCount++;
    }
  }
}

cleanUnnecessaryFiles(outDir);
console.log(`✅ Usunięto ${deletedCount} niepotrzebnych plików`);

console.log('');
console.log('🎉 Build zakończony!');
console.log('📁 Pliki do uploadu znajdują się w folderze: out/');
console.log('');
console.log('📤 Instrukcja wdrożenia na nazwa.pl:');
console.log('   1. Zaloguj się do panelu DirectAdmin');
console.log('   2. Przejdź do Menedżera plików');
console.log('   3. Wejdź do public_html');
console.log('   4. Usuń istniejące pliki (jeśli są)');
console.log('   5. Wgraj całą zawartość folderu out/');
console.log('   6. Upewnij się, że .htaccess jest widoczny');
console.log('');
