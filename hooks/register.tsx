import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Deep ocean blues with moonlit sand accents.
const { theme, problems } = makeColors({
  label: 'Night beach',
  only: 'dark',
  roles: { accent: '#5fb4d9', danger: '#e0705f', success: '#6cc49a', warning: '#e8b86a', pro: '#a493e0' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0a1324',
        'surface-1': '#0f1b30',
        'surface-2': '#14223a',
        'surface-3': '#192842',
        'text-primary': '#eef2f8',
        'text-secondary': '#c3cde0',
        'text-muted': '#9aa8c2',
      },
    },
  },
})

// Deterministic star field, upper sky only.
function stars(): string {
  let seed = 7
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  let out = ''
  for (let i = 0; i < 140; i++) {
    const x = Math.round(rand() * 1600)
    const y = Math.round(rand() * 520)
    const r = (0.6 + rand() * 1.4).toFixed(2)
    const cls = `s${i % 3}`
    const delay = (rand() * 8).toFixed(1)
    out += `<circle class="${cls}" cx="${x}" cy="${y}" r="${r}" style="animation-delay:-${delay}s"/>`
  }
  return out
}

const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<style>
  .st circle { fill: #f4f1e6; opacity: 0.8; }
  .s0 { animation: tw 6s ease-in-out infinite; }
  .s1 { animation: tw 9s ease-in-out infinite; }
  .s2 { animation: tw 13s ease-in-out infinite; }
  @keyframes tw { 0%, 100% { opacity: 0.85; } 50% { opacity: 0.3; } }
  .glow { animation: breathe 14s ease-in-out infinite; transform-origin: 1290px 210px; }
  @keyframes breathe { 0%, 100% { opacity: 0.55; } 50% { opacity: 0.8; } }
  .w1 { animation: drift 26s ease-in-out infinite alternate; }
  .w2 { animation: drift 34s ease-in-out infinite alternate-reverse; }
  .w3 { animation: drift 40s ease-in-out infinite alternate; }
  @keyframes drift { from { transform: translateX(-40px); } to { transform: translateX(40px); } }
  .shim { animation: shim 7s ease-in-out infinite; }
  .shim.b { animation-duration: 10s; animation-delay: -3s; }
  @keyframes shim { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.65; } }
  .surf { animation: surf 12s ease-in-out infinite; }
  @keyframes surf { 0%, 100% { transform: translateY(0); opacity: 0.55; } 50% { transform: translateY(14px); opacity: 0.85; } }
  .palm { animation: sway 18s ease-in-out infinite; transform-origin: 150px 1000px; }
  @keyframes sway { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(1.2deg); } }
</style>
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#040915"/>
    <stop offset="0.55" stop-color="#0c1a36"/>
    <stop offset="1" stop-color="#1d3358"/>
  </linearGradient>
  <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0d2340"/>
    <stop offset="1" stop-color="#06142a"/>
  </linearGradient>
  <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#3a3a4a"/>
    <stop offset="1" stop-color="#1c1d2a"/>
  </linearGradient>
  <radialGradient id="moonglow" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#fff6d8" stop-opacity="0.55"/>
    <stop offset="0.4" stop-color="#c9d8f0" stop-opacity="0.15"/>
    <stop offset="1" stop-color="#c9d8f0" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="path" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff3cf" stop-opacity="0.7"/>
    <stop offset="1" stop-color="#fff3cf" stop-opacity="0.05"/>
  </linearGradient>
</defs>
<!-- sky -->
<rect width="1600" height="620" fill="url(#sky)"/>
<g class="st">${stars()}</g>
<!-- moon -->
<circle class="glow" cx="1290" cy="210" r="210" fill="url(#moonglow)"/>
<circle cx="1290" cy="210" r="62" fill="#f7efd6"/>
<circle cx="1270" cy="195" r="11" fill="#e6dcbe"/>
<circle cx="1312" cy="232" r="8" fill="#e8dfc3"/>
<circle cx="1300" cy="182" r="5" fill="#e8dfc3"/>
<!-- sea -->
<rect y="600" width="1600" height="300" fill="url(#sea)"/>
<rect y="598" width="1600" height="3" fill="#2f4a74" opacity="0.7"/>
<!-- moon path on the water -->
<g>
  <rect class="shim" x="1262" y="612" width="56" height="4" rx="2" fill="url(#path)"/>
  <rect class="shim b" x="1240" y="630" width="100" height="4" rx="2" fill="#fff3cf"/>
  <rect class="shim" x="1255" y="650" width="70" height="3" rx="1.5" fill="#fff3cf"/>
  <rect class="shim b" x="1225" y="672" width="130" height="4" rx="2" fill="#fff3cf"/>
  <rect class="shim" x="1245" y="696" width="90" height="3" rx="1.5" fill="#fff3cf"/>
  <rect class="shim b" x="1210" y="722" width="160" height="4" rx="2" fill="#fff3cf"/>
  <rect class="shim" x="1235" y="750" width="110" height="3" rx="1.5" fill="#fff3cf"/>
  <rect class="shim b" x="1195" y="780" width="190" height="4" rx="2" fill="#fff3cf"/>
</g>
<!-- swells -->
<path class="w1" d="M-60 680 Q 140 668 340 680 T 740 680 T 1140 680 T 1540 680 T 1940 680" fill="none" stroke="#3b5d8c" stroke-width="2" opacity="0.45"/>
<path class="w2" d="M-60 735 Q 160 720 380 735 T 820 735 T 1260 735 T 1700 735" fill="none" stroke="#4a6f9e" stroke-width="2.5" opacity="0.4"/>
<path class="w3" d="M-60 800 Q 180 782 420 800 T 900 800 T 1380 800 T 1860 800" fill="none" stroke="#5a80ad" stroke-width="3" opacity="0.4"/>
<!-- beach -->
<path d="M0 870 C 300 845 600 860 900 850 C 1200 840 1400 860 1600 848 L1600 1000 L0 1000 Z" fill="url(#sand)"/>
<path class="surf" d="M0 866 C 300 842 600 857 900 847 C 1200 837 1400 857 1600 845" fill="none" stroke="#cfe0f2" stroke-width="3" stroke-linecap="round"/>
<!-- palm silhouette -->
<g class="palm" fill="#03070f">
  <path d="M140 1000 C 150 900 170 780 210 660 C 230 600 250 560 262 540 L 274 546 C 262 570 246 610 228 668 C 192 788 176 900 172 1000 Z"/>
  <path d="M266 540 C 210 500 140 500 70 540 C 140 512 210 516 262 552 Z"/>
  <path d="M266 540 C 230 470 170 440 100 440 C 170 456 226 490 260 548 Z"/>
  <path d="M268 540 C 300 470 360 440 430 448 C 360 462 306 496 274 550 Z"/>
  <path d="M268 542 C 330 510 400 520 460 570 C 396 534 330 530 274 552 Z"/>
  <path d="M266 544 C 250 600 220 640 180 670 C 214 632 240 594 258 546 Z"/>
  <path d="M270 544 C 300 590 330 620 372 640 C 330 612 302 584 276 546 Z"/>
</g>
<!-- grass tufts -->
<g fill="#03070f">
  <path d="M1480 1000 L1490 940 L1496 1000 Z M1500 1000 L1515 925 L1514 1000 Z M1520 1000 L1540 950 L1530 1000 Z"/>
</g>
</svg>`


const LOOK: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: 'night-beach', glass: { blur: 14, tint: '#0a1324', opacity: 0.55 } },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))
    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)
    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }
    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)
    return <Svg source={SCENE} alt="A moonlit beach at night, with gentle waves and a palm tree" />
  })
}
