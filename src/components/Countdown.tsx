'use client';
import { useEffect, useState } from 'react';

function parts(target: number) {
  const s = Math.max(0, Math.floor((target - Date.now()) / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export default function Countdown({ iso }: { iso: string }) {
  const target = new Date(iso).getTime();
  const [t, setT] = useState<ReturnType<typeof parts> | null>(null);
  useEffect(() => {
    setT(parts(target));
    const id = setInterval(() => setT(parts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  const cells: [string, number | null][] = [
    ['días', t?.d ?? null], ['horas', t?.h ?? null], ['min', t?.m ?? null], ['seg', t?.s ?? null],
  ];
  return (
    <div className="countdown" role="timer" aria-label="Cuenta regresiva para el evento">
      {cells.map(([label, v]) => (
        <div key={label} className="cd-cell">
          <b>{v === null ? '--' : String(v).padStart(2, '0')}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
