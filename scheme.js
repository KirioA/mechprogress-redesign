// Undercarriage side view per machine, drawn in millimetres (viewBox = mm).
// Part counts come from factory docs and catalogs (see undercarriage-specs.md in the project notes).
// Where a source is missing, the drawing and the notes say nothing specific.
// shortcut: wheel radii and lifts are typical values, not factory drawings; replace when a parts album is found.

const C = 40; // half height of a link: chain centreline sits this far outside roller treads

const COMMON_CHTZ = {
  chain: 'Шаг 203 мм, закрытый шарнир со смазкой, замок — палец с конусом.',
  shoes: 'Башмак 500 мм, есть 560, 690 и 900 мм.',
  sprocket: 'Сзади, низкая схема. Литое 50-19-99 или сегментное 50-19-182СП.',
  ring: 'Венцы 50-19-160 и 50-19-160-1 не взаимозаменяемы: разная посадочная расточка.',
  segments: 'Сменный сегмент 50-19-201 на 3 зуба.',
  bolts: 'Крепят сегменты и венец к ступице ведущего колеса.',
  idler: 'Спереди. Натяжение: пружина и цилиндр, который набивают солидолом.',
  drive: 'Цилиндрический, две пары шестерён в последовательном зацеплении.',
};

const MODELS = {
  sd16: {
    title: 'Shantui SD-16', links: 37, rollers: 6, order: null, carriers: 2,
    Rs: 435, Ri: 330, rr: 110, rc: 80, teeth: 27, segs: 9, drive: 'spur', gear2: false,
    spec: '6 опорных · 2 поддерживающих · 37 звеньев · шаг 203 мм · башмак 510 мм · колея 1880 мм',
    notes: {
      chain: '37 звеньев на сторону, шаг 203 мм. Цепь 203MJ-37000.',
      track: 'Гусеница 37 звеньев, однозацепные башмаки 510 мм.',
      shoes: 'Башмак 510 мм, есть 560 и 610 мм. Высота грунтозацепа 65 мм.',
      sprocket: 'Сзади, низкая схема. Собрано из 9 сегментов по 3 зуба.',
      ring: 'Венец собран из 9 сменных сегментов.',
      segments: '9 сегментов по 3 зуба на сторону, 16Y-18-00014.',
      bolts: 'Крепят сегменты к ступице ведущего колеса.',
      idler: 'Спереди, с натяжителем гусеницы. 16Y-40-03000.',
      roller: '6 на сторону: 4 однобортных и 2 двубортных.',
      'roller-s': '4 на сторону, 16Y-40-09000. Места на раме уточнит менеджер.',
      'roller-d': '2 на сторону, 16Y-40-10000. Места на раме уточнит менеджер.',
      carrier: '2 на сторону, 16Y-40-06000.',
      drive: 'Цилиндрический, двухступенчатый, смазка разбрызгиванием, 21 л масла.',
    },
  },
  t130: {
    title: 'Т-130М', links: 38, rollers: 5, order: 'SDSDS', carriers: 2,
    Rs: 435, Ri: 330, rr: 110, rc: 80, teeth: 27, segs: 9, drive: 'spur', gear2: true,
    spec: '5 опорных · 2 поддерживающих · 38 звеньев · шаг 203 мм · башмак 500 мм · колея 1880 мм',
    notes: {
      ...COMMON_CHTZ,
      chain: '38 звеньев на сторону. ' + COMMON_CHTZ.chain,
      track: 'Гусеница 24-22-1СП: 38 звеньев, башмаки 500 мм.',
      roller: '5 на сторону: однобортный, двубортный, однобортный, двубортный, однобортный.',
      'roller-s': '3 на сторону, 24-21-169СП. Стоят на нечётных местах от ведущего колеса.',
      'roller-d': '2 на сторону, 24-21-170СП. Стоят на чётных местах.',
      carrier: '2 на сторону, специальные 24-21-171.',
      drive: COMMON_CHTZ.drive + ' Передаточное число 9,94.',
      gear2: '50-19-144СП, промежуточная ступень бортового редуктора, на двух роликовых подшипниках.',
    },
  },
  t170: {
    title: 'Т-170М', links: 38, rollers: 5, order: 'SDSDS', carriers: 2,
    Rs: 435, Ri: 330, rr: 110, rc: 110, teeth: 27, segs: 9, drive: 'spur', gear2: true,
    spec: '5 опорных · 2 поддерживающих · 38 звеньев · шаг 203 мм · башмак 500 мм · колея 1880 мм',
    notes: {
      ...COMMON_CHTZ,
      chain: '38 звеньев на сторону. ' + COMMON_CHTZ.chain,
      track: 'Гусеница 38 звеньев, башмаки 500 мм. На 7-катковой тележке — 45 звеньев.',
      roller: '5 на сторону: однобортный, двубортный, однобортный, двубортный, однобортный. Болотоход — 7.',
      'roller-s': '3 на сторону, 24-21-169СП. Стоят на нечётных местах от ведущего колеса.',
      'roller-d': '2 на сторону, 24-21-170СП. Стоят на чётных местах.',
      carrier: '2 на сторону. В роли поддерживающих стоят однобортные катки 24-21-169СП.',
      drive: COMMON_CHTZ.drive + ' Передаточное число 9,94, у Т-170.01 — 14,79.',
      gear2: '50-19-144СП, промежуточная ступень бортового редуктора, на двух роликовых подшипниках.',
    },
  },
  b10: {
    title: 'Б-10М', links: 42, rollers: 6, order: null, carriers: 2,
    Rs: 435, Ri: 330, rr: 110, rc: 80, teeth: 27, segs: 9, drive: 'spur', gear2: false,
    spec: '6 опорных · 2 поддерживающих · 42 звена · шаг 203 мм · башмак 500 мм · колея 1880 мм',
    notes: {
      ...COMMON_CHTZ,
      chain: '42 звена на сторону, длина цепи 8526 мм. ' + COMMON_CHTZ.chain,
      track: 'Гусеница 42 звена, башмаки 500 мм.',
      sprocket: 'Сзади, низкая схема, со сменными зубчатыми сегментами.',
      roller: '6 на сторону, у болотохода Б10МБ — 7. Катки 24-21-169СП и 24-21-170СП общие с Т-130 и Т-170.',
      'roller-s': 'Однобортный 24-21-169СП. Сочетание с двубортными зависит от тележки — уточните у менеджера.',
      'roller-d': 'Двубортный 24-21-170СП. Сочетание с однобортными зависит от тележки — уточните у менеджера.',
      carrier: '2 на сторону, 50-21-416СП.',
      drive: 'Цилиндрические бортовые редукторы.',
      gear2: 'Подберём по номеру бортового редуктора.',
    },
  },
  b11: {
    title: 'Б-11', links: 42, rollers: 6, order: null, carriers: 2,
    Rs: 435, Ri: 330, rr: 110, rc: 80, teeth: 27, segs: 9, drive: 'spur', gear2: false,
    spec: '6 опорных · 2 поддерживающих · 42 звена · шаг 203 мм · башмак 500 мм · колея 1880 мм',
    notes: {
      ...COMMON_CHTZ,
      chain: '42 звена на сторону, шаг 203 мм. На болотном исполнении — 45.',
      track: 'Гусеница 42 звена, башмаки 500 мм.',
      sprocket: 'Сзади, низкая схема. Исполнение подберём по номеру.',
      roller: '6 на сторону.',
      'roller-s': 'Сочетание с двубортными подберём по номеру тележки.',
      'roller-d': 'Сочетание с однобортными подберём по номеру тележки.',
      carrier: '2 на сторону.',
      drive: 'Тип бортового редуктора подберём по номеру.',
      gear2: 'Подберём по номеру бортового редуктора.',
    },
  },
  dst: {
    title: 'ДСТ-Урал D10 / D12', links: 45, rollers: 7, order: null, carriers: 2,
    Rs: 435, Ri: 330, rr: 105, rc: 80, teeth: 27, segs: 0, drive: 'planetary', gear2: false,
    spec: '7 опорных · 2 поддерживающих · 45 звеньев · шаг 203 мм · башмак 500 мм (D12 — 510 мм)',
    notes: {
      chain: '45 звеньев на сторону, шаг 203 мм.',
      track: 'Гусеница 45 звеньев, башмаки 500 мм (D12 — 510 мм).',
      shoes: 'Башмак 500 мм, на D12 — 510 мм. Высота грунтозацепа 65 мм.',
      sprocket: 'Сзади, низкая схема.',
      ring: 'Исполнение подберём по номеру.',
      segments: 'Исполнение подберём по номеру.',
      bolts: 'Крепят ведущее колесо к ступице.',
      idler: 'Спереди. Натяжение гидравлическое.',
      roller: '7 на сторону. Однобортный Т170-21-001-01СБ подходит для 10-го класса, в том числе ДСТ-Урал.',
      'roller-s': 'Сочетание с двубортными подберём по номеру тележки.',
      'roller-d': 'Сочетание с однобортными подберём по номеру тележки.',
      carrier: '2 на сторону.',
      drive: 'Планетарный бортовой редуктор, привод от гидромотора (гидростатическая трансмиссия).',
      gear2: 'Редуктор планетарный — подберём шестерни по номеру.',
    },
  },
  eo: {
    title: 'ЭО-3223', links: null, base: 3200, rollers: 8, order: null, carriers: 2,
    Rs: 300, Ri: 280, rr: 90, rc: 65, teeth: 0, segs: 0, drive: 'planetary', gear2: false,
    spec: '8 опорных · 2 поддерживающих · база 3200 мм · колея 2300 мм · башмак 600, 800 или 900 мм',
    notes: {
      chain: 'Число звеньев в руководстве не указано — подберём по шагу и старой цепи.',
      track: 'Башмаки 600 мм — цельнолитые, 800 и 900 мм — сварнолитые.',
      shoes: 'Башмак 600, 800 или 900 мм.',
      sprocket: 'Сзади, под противовесом. Крепится болтами к планетарному редуктору хода.',
      ring: 'Подберём по номеру ведущего колеса.',
      segments: 'Подберём по номеру ведущего колеса.',
      bolts: 'Крепят ведущее колесо к редуктору хода.',
      idler: 'Спереди, в лонжероне. Пружина (монтажный размер 390 мм) и цилиндр, который набивают смазкой.',
      roller: '8 на сторону, крепление жёсткое.',
      'roller-s': 'Сочетание с двубортными подберём по номеру тележки.',
      'roller-d': 'Сочетание с однобортными подберём по номеру тележки.',
      carrier: '2 на сторону, над лонжероном.',
      drive: 'Планетарный редуктор хода и аксиально-поршневой гидромотор в каждой гусенице. Стояночный тормоз внутри редуктора.',
    },
  },
};

const PART_TARGETS = {
  chain: '.links, .pins', track: '.links, .pins, .shoe', 'shoe-bolts': '.shoe', 'track-bolts': '.shoe',
  sprocket: '.sprocket', ring: '.teeth', segments: '.seg-odd', 'sprocket-bolts': '.sp-bolt',
  idler: '.idler', roller: '.roller', carrier: '.carrier', drive: '.drive', bearings: '.drive', gear2: '.gear2',
};
const NOTE_KEY = { 'shoe-bolts': 'shoes', 'track-bolts': 'shoes', 'sprocket-bolts': 'bolts', bearings: 'drive' };

// Outer tangent between consecutive circles of a clockwise hull (screen coords, y down).
function tangent(a, b) {
  const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
  const phi = Math.atan2(dy, dx) - Math.acos((a.r - b.r) / d);
  return { p: { x: a.x + a.r * Math.cos(phi), y: a.y + a.r * Math.sin(phi) }, q: { x: b.x + b.r * Math.cos(phi), y: b.y + b.r * Math.sin(phi) }, phi };
}

function layout(m, D) {
  const G = 0; // bottom run of the chain centreline
  const idler = { x: 0, y: G - (m.Ri + C) - 30, r: m.Ri + C };
  const spr = { x: D, y: G - m.Rs - 60, r: m.Rs };
  const x0 = idler.x + m.Ri * 0.9 + m.rr, x1 = spr.x - m.Rs * 0.8 - m.rr;
  const rollers = Array.from({ length: m.rollers }, (_, i) => ({ x: x0 + (x1 - x0) * i / (m.rollers - 1), y: G - m.rr - C, r: m.rr + C }));
  const topAt = x => (idler.y - idler.r) + ((spr.y - spr.r) - (idler.y - idler.r)) * (x - idler.x) / (spr.x - idler.x);
  const carriers = Array.from({ length: m.carriers }, (_, i) => {
    const x = idler.x + (spr.x - idler.x) * (i + 1) / (m.carriers + 1);
    return { x, y: topAt(x) + m.rc + C - 15, r: m.rc + C };
  });
  const hull = [idler, ...carriers, spr, ...rollers.slice().reverse()];
  let len = 0, d = '';
  const segs = hull.map((c, i) => tangent(c, hull[(i + 1) % hull.length]));
  segs.forEach((s, i) => {
    const next = segs[(i + 1) % segs.length], c = hull[(i + 1) % hull.length];
    let sweep = (next.phi - s.phi) % (2 * Math.PI); if (sweep < 0) sweep += 2 * Math.PI;
    if (sweep > 2 * Math.PI - 1e-6) sweep = 0;
    len += Math.hypot(s.q.x - s.p.x, s.q.y - s.p.y) + c.r * sweep;
    if (!i) d += `M${s.p.x.toFixed(1)} ${s.p.y.toFixed(1)}`;
    d += `L${s.q.x.toFixed(1)} ${s.q.y.toFixed(1)}A${c.r} ${c.r} 0 ${sweep > Math.PI ? 1 : 0} 1 ${next.p.x.toFixed(1)} ${next.p.y.toFixed(1)}`;
  });
  return { G, idler, spr, rollers, carriers, d: d + 'Z', len };
}

// Pick the idler–sprocket distance so the drawn chain is exactly links × 203 mm.
function solve(m) {
  if (!m.links) return layout(m, m.base);
  let lo = 1500, hi = 6000;
  for (let i = 0; i < 50; i++) { const mid = (lo + hi) / 2; layout(m, mid).len < m.links * 203 ? lo = mid : hi = mid; }
  return layout(m, (lo + hi) / 2);
}

const NS = 'http://www.w3.org/2000/svg';
const el = (tag, attrs, parent) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent && parent.append(e); return e; };
const circ = (p, r, cls, parent, extra = {}) => el('circle', { cx: p.x.toFixed(1), cy: p.y.toFixed(1), r, class: cls, ...extra }, parent);

function wheelTeeth(g, c, R, n, cls) {
  const t = el('g', { class: cls }, g);
  for (let i = 0; i < n; i++) {
    const a = i / n * 2 * Math.PI, w = Math.PI / n * 0.55;
    const pts = [[R - 75, -w * 1.3], [R + 12, -w * 0.5], [R + 12, w * 0.5], [R - 75, w * 1.3]]
      .map(([r, da]) => `${(c.x + r * Math.cos(a + da)).toFixed(1)},${(c.y + r * Math.sin(a + da)).toFixed(1)}`).join(' ');
    el('polygon', { points: pts, class: 'part' }, t);
  }
}

function render(svg, key) {
  const m = MODELS[key], L = solve(m);
  svg.replaceChildren();
  const { idler, spr, G } = L;
  const minX = idler.x - idler.r - 260, maxX = spr.x + spr.r + 200, minY = Math.min(spr.y - spr.r, ...L.carriers.map(c => c.y - c.r)) - 330, maxY = G + 420;
  svg.setAttribute('viewBox', `${minX} ${minY} ${maxX - minX} ${maxY - minY}`);
  svg.setAttribute('aria-label', `Схема ходовой части ${m.title}: ${m.spec}`);

  // Track frame and tensioner sit behind the wheels.
  const fy0 = Math.min(...L.carriers.map(c => c.y)) + 40, fy1 = L.rollers[0].y - 20;
  el('rect', { x: idler.x + m.Ri * 0.55, y: fy0, width: spr.x - m.Rs * 0.7 - idler.x - m.Ri * 0.55, height: fy1 - fy0, rx: 40, class: 'frame' }, svg);
  const ten = el('g', { class: 'tensioner' }, svg);
  const tx0 = idler.x + 60, tx1 = idler.x + m.Ri + 520, ty = idler.y;
  el('rect', { x: tx0, y: ty - 28, width: m.Ri + 40, height: 56, rx: 10, class: 'part' }, ten);
  let zz = `M${tx0 + m.Ri + 40} ${ty}`;
  for (let i = 1; i <= 8; i++) zz += `L${tx0 + m.Ri + 40 + i * (tx1 - tx0 - m.Ri - 40) / 8} ${ty + (i % 2 ? -42 : 42)}`;
  el('path', { d: zz, class: 'spring' }, ten);

  // Idler.
  const gi = el('g', { class: 'idler part' }, svg);
  circ(idler, m.Ri, '', gi); circ(idler, m.Ri * 0.72, 'inner', gi); circ(idler, m.Ri * 0.22, 'hub', gi);

  // Sprocket: teeth ring, alternating segments, bolts, hub.
  const gs = el('g', { class: 'sprocket part' }, svg);
  if (m.teeth) wheelTeeth(gs, spr, m.Rs, m.teeth, 'teeth');
  else wheelTeeth(gs, spr, m.Rs, Math.round(2 * Math.PI * m.Rs / 101), 'teeth');
  circ(spr, m.Rs - 70, 'disc', gs);
  const segN = m.segs || 1;
  if (m.segs) for (let i = 0; i < segN; i++) {
    if (i % 2) continue;
    const a0 = i / segN * 2 * Math.PI, a1 = (i + 1) / segN * 2 * Math.PI, R1 = m.Rs - 70, R0 = m.Rs - 150;
    const P = (r, a) => `${(spr.x + r * Math.cos(a)).toFixed(1)} ${(spr.y + r * Math.sin(a)).toFixed(1)}`;
    el('path', { d: `M${P(R0, a0)}L${P(R1, a0)}A${R1} ${R1} 0 0 1 ${P(R1, a1)}L${P(R0, a1)}A${R0} ${R0} 0 0 0 ${P(R0, a0)}Z`, class: 'seg-odd part' }, gs);
  }
  const boltN = m.segs ? m.segs * 3 : 12;
  for (let i = 0; i < boltN; i++) { const a = (i + 0.5) / boltN * 2 * Math.PI; circ({ x: spr.x + (m.Rs - 185) * Math.cos(a), y: spr.y + (m.Rs - 185) * Math.sin(a) }, 14, 'sp-bolt part', gs); }
  circ(spr, m.Rs * 0.3, 'hub', gs);

  // Rollers; single/double flange marked only where the factory order is known.
  L.rollers.forEach((r, i) => {
    const t = m.order ? m.order[i] : '';
    const g = el('g', { class: `roller part ${t === 'S' ? 'roller-s' : t === 'D' ? 'roller-d' : 'roller-s roller-d'}` }, svg);
    circ(r, m.rr, '', g); circ(r, m.rr * 0.4, 'hub', g);
    if (t) el('text', { x: r.x, y: G + 230, class: 'tag-t' }, svg).textContent = t === 'S' ? 'О' : 'Д';
  });
  L.carriers.forEach(c => { const g = el('g', { class: 'carrier part' }, svg); circ(c, m.rc, '', g); circ(c, m.rc * 0.4, 'hub', g); });

  // Chain: link plates as a thick band, pins at every joint, shoes outside.
  el('path', { d: L.d, class: 'links' }, svg);
  const path = el('path', { d: L.d, fill: 'none', stroke: 'none' }, svg);
  const total = path.getTotalLength(), n = m.links || Math.round(total / 190), step = total / n;
  const shoes = el('g', {}, svg), pins = el('g', { class: 'pins' }, svg);
  for (let i = 0; i < n; i++) {
    const s = i * step, p = path.getPointAtLength(s), p2 = path.getPointAtLength((s + 4) % total);
    const ang = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI, mid = path.getPointAtLength((s + step / 2) % total);
    circ(p, 24, 'part', pins);
    const sh = el('g', { class: 'shoe part', transform: `translate(${mid.x.toFixed(1)} ${mid.y.toFixed(1)}) rotate(${ang.toFixed(1)})` }, shoes);
    el('path', { d: `M${-step * 0.48} ${-C}L${-step * 0.48} ${-C - 36}L-34 ${-C - 36}L-20 ${-C - 95}L20 ${-C - 95}L34 ${-C - 36}L${step * 0.48} ${-C - 36}L${step * 0.48} ${-C}Z` }, sh);
  }

  // Final drive sits inboard of the sprocket, shown as a dashed x-ray outline: spur housing reaches up and forward to the intermediate gear.
  const dr = el('g', { class: 'drive part' }, svg);
  if (m.drive === 'spur') {
    const g2 = { x: spr.x - m.Rs * 0.45, y: spr.y - m.Rs * 0.62 };
    el('path', { d: `M${spr.x - m.Rs * 0.62} ${spr.y}A${m.Rs * 0.62} ${m.Rs * 0.62} 0 0 0 ${spr.x + m.Rs * 0.62} ${spr.y}L${spr.x + m.Rs * 0.2} ${g2.y - m.Rs * 0.4}L${g2.x - m.Rs * 0.38} ${g2.y - m.Rs * 0.25}Z` }, dr);
    if (m.gear2) { const gg = el('g', { class: 'gear2 part' }, svg); wheelTeeth(gg, g2, m.Rs * 0.22, 14, ''); circ(g2, m.Rs * 0.22, '', gg); circ(g2, m.Rs * 0.13, 'inner', gg); }
  } else {
    circ(spr, m.Rs * 0.62, '', dr);
    for (let i = 0; i < 3; i++) { const a = i * 2.094 - 1.57; circ({ x: spr.x + m.Rs * 0.33 * Math.cos(a), y: spr.y + m.Rs * 0.33 * Math.sin(a) }, m.Rs * 0.17, 'inner', dr); }
    el('rect', { x: spr.x + m.Rs * 0.2, y: spr.y - m.Rs * 1.15, width: m.Rs * 0.7, height: m.Rs * 0.42, rx: 18 }, dr); // hydraulic motor
  }

  const label = (x, y, txt, anchor = 'middle') => { const t = el('text', { x, y, class: 'lbl', 'text-anchor': anchor }, svg); t.textContent = txt; };
  label(idler.x, idler.y - idler.r - 170, 'направляющее колесо');
  label(spr.x, spr.y - spr.r - 170, 'ведущее колесо');
  label((L.carriers[0].x + L.carriers.at(-1).x) / 2, Math.min(...L.carriers.map(c => c.y - c.r)) - 120, 'поддерживающие катки');
  label((L.rollers[0].x + L.rollers.at(-1).x) / 2, G + (m.order ? 360 : 260), 'опорные катки');
  label(minX + 40, maxY - 30, '← перед', 'start');
}

function highlight(svg, key, partKey, on) {
  const sel = PART_TARGETS[partKey];
  const m = MODELS[key];
  // Single/double flange: if the order is unknown every roller carries both classes, so all light up.
  const q = partKey === 'roller-s' ? '.roller-s' : partKey === 'roller-d' ? '.roller-d' : sel;
  if (q) svg.querySelectorAll(q).forEach(e => e.classList.toggle('on', on));
  return m.notes[NOTE_KEY[partKey] || partKey] || '';
}

window.Scheme = { MODELS, render, highlight };
