'use client';
import { useEffect } from 'react';

// Al llegar a cualquier página que no sea el home se retira la marca de la puerta de EVE:
// así, si la persona vuelve al home con el logo, aterriza en el home y no otra vez en la puerta.
export default function QuitaPuerta() {
  useEffect(() => { document.documentElement.classList.remove('gate', 'gate-out'); }, []);
  return null;
}
