/* EVE · avatar animado de Scenario Zero
   Anillo de 67 puntos del logo, dibujado en <canvas>.
   API:  const a = new EveAvatar(canvas, { size: 48 });
         EveAvatar.setState('reposo' | 'escuchando' | 'pensando' | 'respondiendo')  // todos los avatares
         a.setState(...)            // uno solo
         EveAvatar.keystroke()      // onda al escribir (estado escuchando)
         EveAvatar.beat(fuerza)     // latido puntual (cada fragmento de respuesta)
   Respeta prefers-reduced-motion y se pausa con la pestaña oculta. */
(function () {
  const DOTS = [[0.1007,-0.8967,0.0282],[-0.0672,-0.7441,0.1593],[0.3674,-0.7426,0.1374],[0.1734,-0.8186,0.037],[-0.3063,-0.7725,0.0543],[-0.421,-0.7745,0.0207],[-0.4818,-0.634,0.0993],[0.5561,-0.689,0.0293],[0.1592,-0.5819,0.0543],[0.6388,-0.4821,0.1531],[-0.2903,-0.5647,0.0588],[-0.6509,-0.5787,0.0269],[0.4399,-0.5674,0.025],[0.0378,-0.5517,0.0277],[-0.1539,-0.5357,0.0337],[0.3186,-0.4769,0.0795],[-0.562,-0.5083,0.0298],[-0.7081,-0.3706,0.1423],[-0.4097,-0.4181,0.0763],[-0.2608,-0.4656,0.0233],[0.4525,-0.3333,0.0399],[0.8296,-0.3169,0.0465],[-0.5192,-0.3143,0.0267],[0.6331,-0.2088,0.0739],[-0.8826,-0.218,0.0364],[0.8826,-0.1767,0.0467],[-0.5764,-0.1638,0.0554],[-0.7782,-0.1734,0.0278],[-0.6952,-0.1333,0.0273],[0.5176,-0.1294,0.0276],[-0.8154,0.0539,0.1671],[0.7956,0.0808,0.1813],[-0.5738,-0.0428,0.0356],[0.5552,-0.021,0.0558],[-0.5732,0.0583,0.0269],[-0.5714,0.1795,0.0485],[0.5313,0.1976,0.057],[-0.7032,0.3033,0.0702],[0.6533,0.3373,0.0792],[-0.5153,0.3357,0.0657],[0.4984,0.2961,0.0245],[0.8319,0.3369,0.0281],[-0.8611,0.3439,0.0274],[0.4187,0.3867,0.0636],[0.8193,0.4405,0.0395],[-0.8171,0.4672,0.0587],[-0.428,0.4374,0.0214],[-0.592,0.5795,0.1561],[-0.3627,0.4567,0.027],[0.5457,0.4562,0.0244],[0.267,0.4862,0.0268],[0.4082,0.6622,0.1784],[0.6834,0.5509,0.0799],[-0.2364,0.5647,0.082],[0.1876,0.5571,0.0244],[-0.071,0.5969,0.0469],[0.0883,0.6264,0.0556],[-0.3564,0.718,0.0609],[0.6335,0.6968,0.0277],[0.0061,0.7031,0.027],[-0.1393,0.8119,0.1199],[-0.5034,0.7853,0.0319],[0.1018,0.7884,0.0301],[0.2165,0.8503,0.0531],[-0.4216,0.8486,0.0312],[0.0695,0.8967,0.0509],[-0.3144,0.8808,0.027]]
    .map(([x, y, s]) => ({ x, y, s, th: Math.atan2(y, x) }));

  // Parámetros por estado (se interpolan en ~250 ms al cambiar)
  const STATES = {
    reposo:       { bright: .38, wave: 0,   spin: 0,   breathe: .022, glow: .35, inward: 1,   heart: 0 },
    escuchando:   { bright: .52, wave: .28, spin: .12, breathe: .010, glow: .6,  inward: .965, heart: 0 },
    pensando:     { bright: .30, wave: .95, spin: .62, breathe: 0,    glow: .85, inward: 1,   heart: 1.15 },
    respondiendo: { bright: .70, wave: .30, spin: .10, breathe: 0,    glow: .9,  inward: 1,   heart: 0 }
  };
  const C0 = [0, 101, 140], C1 = [0, 200, 248], C2 = [242, 246, 250]; // Profundo, Brillo, Papel
  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const angDist = (a, b) => { let d = Math.abs(a - b) % (2 * Math.PI); return d > Math.PI ? 2 * Math.PI - d : d; };
  const reduce = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  const all = [];
  let ripples = [], beats = [], last = performance.now(), running = false, lastHeart = 0;

  class EveAvatar {
    constructor(canvas, opts = {}) {
      this.c = canvas; this.ctx = canvas.getContext('2d');
      this.size = opts.size || canvas.width || 48;
      this.state = opts.state || 'reposo';
      this.p = { ...STATES[this.state] }; this.head = -Math.PI / 2;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.height = Math.round(this.size * dpr);
      canvas.style.width = canvas.style.height = this.size + 'px';
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.setAttribute('role', 'img');
      this.label();
      all.push(this); EveAvatar.start(); this.draw(performance.now(), 0);
    }
    label() { this.c.setAttribute('aria-label', 'EVE, ' + this.state); }
    setState(s) { if (STATES[s]) { this.state = s; this.label(); if (reduce.matches) this.draw(performance.now(), 0); } }
    draw(now, dt) {
      const p = this.p, t = STATES[this.state], k = Math.min(1, dt / 250);
      for (const key in t) p[key] += (t[key] - p[key]) * (reduce.matches ? 1 : k);
      const still = reduce.matches;
      if (!still) this.head += p.spin * 2 * Math.PI * dt / 1000;
      const S = this.size, h = S / 2, ctx = this.ctx;
      let kick = 0, beatGlow = 0;
      if (!still) for (const b of beats) {
        const a = (now - b.t) / 1000;
        if (a >= 0) { kick += b.f * (0.055 * Math.exp(-a / .11) + (a > .17 ? 0.03 * Math.exp(-(a - .17) / .1) : 0)); beatGlow += b.f * .35 * Math.exp(-a / .2); }
      }
      const breath = still ? 0 : p.breathe * Math.sin(now / 1000 * 2 * Math.PI / 4);
      const sc = (1 + breath + kick) * p.inward * 0.9;
      ctx.clearRect(0, 0, S, S);
      for (const d of DOTS) {
        let w = 0;
        if (!still && p.wave > 0.001) {
          const dd = angDist(d.th, this.head);
          const behind = ((this.head - d.th) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) < Math.PI;
          w = Math.exp(-(dd * dd) / (2 * (behind ? .75 : .32) ** 2));
        }
        let r = 0;
        if (!still) for (const rp of ripples) {
          const a = (now - rp.t) / 650; if (a < 0 || a > 1) continue;
          const dd = angDist(d.th, rp.a) - a * Math.PI; r += Math.exp(-(dd * dd) / .12) * (1 - a) * .6;
        }
        const b = Math.max(0, Math.min(1, p.bright + p.wave * w + r + beatGlow));
        const col = b > .85 ? mix(C1, C2, (b - .85) / .15 * .6) : mix(C0, C1, b / .85);
        const rad = Math.max(.6, d.s * h * sc * (.82 + .45 * b));
        ctx.beginPath();
        ctx.arc(h + d.x * h * sc, h + d.y * h * sc, rad, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${col})`;
        ctx.shadowColor = `rgba(0,200,248,${(.25 + .6 * b) * p.glow})`;
        ctx.shadowBlur = S * .06 * p.glow * (.4 + b);
        ctx.fill();
      }
    }
    static setState(s) { all.forEach(a => a.setState(s)); }
    static keystroke() { if (!reduce.matches) ripples.push({ t: performance.now(), a: Math.random() * Math.PI * 2 }); }
    static beat(f = 1) { if (!reduce.matches) beats.push({ t: performance.now(), f }); }
    static start() {
      if (running || reduce.matches) return; running = true;
      const loop = now => {
        if (document.hidden) { running = false; return; }
        const dt = Math.min(64, now - last); last = now;
        ripples = ripples.filter(r => now - r.t < 700);
        beats = beats.filter(b => now - b.t < 900);
        const thinking = all.some(a => a.state === 'pensando');
        if (thinking && now - lastHeart > 1150) { lastHeart = now; beats.push({ t: now, f: .8 }); }
        all.forEach(a => { if (a.c.isConnected) a.draw(now, dt); });
        requestAnimationFrame(loop);
      };
      last = performance.now(); requestAnimationFrame(loop);
    }
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) EveAvatar.start(); });
  if (reduce.addEventListener) reduce.addEventListener('change', () => { all.forEach(a => a.draw(performance.now(), 0)); EveAvatar.start(); });
  window.EveAvatar = EveAvatar;
})();
