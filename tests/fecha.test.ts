// Protege la fecha del evento: npm run test:eve
// 1) las fechas derivadas son las esperadas; 2) la fecha anterior (12 nov) no reaparece en ningún archivo del sitio.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { listaEsperaFaq } from '../src/data/events';
import { FECHAS } from '../src/data/fechas';
import { CORPUS } from '../src/lib/eve/corpus';
import { SYSTEM } from '../src/lib/eve/schema';

let n = 0;
const ok = (nombre: string, fn: () => void) => { fn(); n++; console.log('  ✓', nombre); };

console.log('Fechas derivadas del evento');
ok('fecha del evento: 19 de noviembre de 2026', () => {
  assert.equal(FECHAS.iso, '2026-11-19');
  assert.equal(FECHAS.corta, '19.11.2026');
  assert.equal(FECHAS.cortaDM, '19.11');
  assert.equal(FECHAS.dia, '19 de noviembre');
  assert.equal(FECHAS.larga, '19 de noviembre de 2026');
});
ok('hitos D+30, D+90, D+180 y aniversario contados desde el 19.11.2026', () => {
  assert.equal(FECHAS.d30, '19.12.2026');
  assert.equal(FECHAS.d90, '17.02.2027');
  assert.equal(FECHAS.d180, '18.05.2027');
  assert.equal(FECHAS.aniv, '19.11.2027');
});
ok('el corpus de EVE y su prompt usan la fecha nueva', () => {
  for (const t of [CORPUS, SYSTEM]) assert.match(t, /19 de noviembre/);
  for (const s of [FECHAS.d30, FECHAS.d90, FECHAS.d180, FECHAS.aniv]) assert.ok(CORPUS.includes(s), s);
});

console.log('La fecha anterior no reaparece');
const VIEJA = /12 de noviembre|12\.11|12\/11|2026-11-12|12\.12\.2026|10\.02\.2027|11\.05\.2027|12 dic\b|10 feb\b|11 may\b/;
const raiz = path.resolve(__dirname, '..');
const archivos: string[] = [];
const recorre = (dir: string) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) recorre(p);
    else if (/\.(ts|tsx|js|mjs|css|json|md)$/.test(e.name) && !/package-lock|fecha\.test|cambiar-fecha|^fechas\.ts$|^eve-battery\.mjs$/.test(e.name)) archivos.push(p);
  }
};
for (const d of ['src', 'scripts', 'tests', 'public']) if (fs.existsSync(path.join(raiz, d))) recorre(path.join(raiz, d));
ok(`ninguno de ${archivos.length} archivos menciona el 12 de noviembre ni sus fechas derivadas`, () => {
  const mal = archivos.filter((f) => VIEJA.test(fs.readFileSync(f, 'utf8'))).map((f) => path.relative(raiz, f));
  assert.deepEqual(mal, []);
});

console.log(`\n${n} pruebas pasaron`);
