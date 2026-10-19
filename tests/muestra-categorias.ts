// Imprime cómo responde la tabla fija a preguntas de ejemplo: npx tsx tests/muestra-categorias.ts
import { responderCategoria } from '../src/lib/eve/categorias';

for (const q of ['¿Qué recibe un aliado Gold?', '¿Qué recibe un aliado Silicio?', '¿Cuánto cuesta un cupo Silver comparado con uno Gold?', '¿Cuál es la diferencia entre Silicio y Platinum?']) {
  const r = responderCategoria(q);
  const frases = (r?.texto.match(/[.!?](\s|$)/g) ?? []).length;
  console.log(`P: ${q}\n${frases} frases | ${r?.texto}\n`);
}
