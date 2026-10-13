'use client';
import { useEffect } from 'react';

export default function JsFlag() {
  useEffect(() => {
    // Si la página tiene pantalla de carga, ella marca `ready` al terminar.
    if (document.getElementById('loader')) return;
    requestAnimationFrame(() => document.documentElement.classList.add('ready'));
  }, []);
  return null;
}
