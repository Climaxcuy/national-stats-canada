/* Canada in Numbers — charts.js
   Small dependency-free SVG chart builders. Every function takes plain data
   and returns an SVG string, so pages can render charts without a library. */

function fmt(n) {
  return n.toLocaleString("en-CA");
}

/* Escape text that goes into SVG labels. */
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* Line chart with labelled points. data: [{year, value}], opts: {w, h, color,
   format (fn), title}. */
function lineChart(data, opts) {
  const w = opts.w || 640;
  const h = opts.h || 260;
  const padL = 58, padR = 14, padT = 18, padB = 30;
  const color = opts.color || "#0b6b4f";
  const values = data.map((d) => d.value);
  let min = Math.min.apply(null, values);
  let max = Math.max.apply(null, values);
  const span = max - min || 1;
  min -= span * 0.12;
  max += span * 0.12;
  const x = (i) => padL + (i * (w - padL - padR)) / (data.length - 1);
  const y = (v) => padT + ((max - v) * (h - padT - padB)) / (max - min);
  const pts = data.map((d, i) => x(i).toFixed(1) + "," + y(d.value).toFixed(1)).join(" ");
  const area = pts + " " + x(data.length - 1).toFixed(1) + "," + (h - padB) + " " + x(0).toFixed(1) + "," + (h - padB);
  const grid = [0.25, 0.5, 0.75].map((f) => {
    const gv = min + (max - min) * f;
    const gy = y(gv);
    return '<line x1="' + padL + '" y1="' + gy.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + gy.toFixed(1) + '" class="grid"/>' +
      '<text x="' + (padL - 6) + '" y="' + (gy + 4).toFixed(1) + '" class="axis" text-anchor="end">' + esc(opts.format ? opts.format(gv) : fmt(Math.round(gv))) + "</text>";
  }).join("");
  const labels = data.map((d, i) =>
    '<text x="' + x(i).toFixed(1) + '" y="' + (h - 10) + '" class="axis" text-anchor="middle">' + d.year + "</text>"
  ).join("");
  const dots = data.map((d, i) =>
    '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(d.value).toFixed(1) + '" r="3.5" fill="' + color + '"/>' +
    '<title>' + d.year + ": " + esc(opts.format ? opts.format(d.value) : fmt(d.value)) + "</title>"
  ).join("");
  const last = data[data.length - 1];
  const callout = '<text x="' + x(data.length - 1).toFixed(1) + '" y="' + (y(last.value) - 10).toFixed(1) +
    '" class="callout" text-anchor="end">' + esc(opts.format ? opts.format(last.value) : fmt(last.value)) + "</text>";
  return '<svg viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + esc(opts.title || "Line chart") + '">' +
    grid + '<polygon points="' + area + '" fill="' + color + '" opacity="0.10"/>' +
    '<polyline points="' + pts + '" fill="none" stroke="' + color + '" stroke-width="2.5" stroke-linejoin="round"/>' +
    dots + callout + labels + "</svg>";
}

/* Vertical bar chart. data: [{label, value}], opts: {w, h, color, format, title}.
   Negative values draw below the zero line. */
function barChart(data, opts) {
  const w = opts.w || 640;
  const h = opts.h || 280;
  const padL = 52, padR = 10, padT = 22, padB = 46;
  const color = opts.color || "#c25e1e";
  const negColor = opts.negColor || "#8a9a93";
  const vmax = Math.max.apply(null, data.map((d) => d.value));
  const vmin = Math.min.apply(null, data.map((d) => d.value));
  const top = (vmax > 0 ? vmax : 0) * 1.08;
  const bottom = (vmin < 0 ? vmin : 0) * 1.15;
  const y = (v) => padT + ((top - v) * (h - padT - padB)) / (top - bottom);
  const y0 = y(0);
  const slot = (w - padL - padR) / data.length;
  const bw = Math.min(46, slot * 0.62);
  const bars = data.map((d, i) => {
    const yv = y(d.value);
    const by = Math.min(y0, yv);
    const bh = Math.max(1, Math.abs(y0 - yv));
    const bx = padL + i * slot + (slot - bw) / 2;
    const labelY = d.value >= 0 ? by - 6 : by + bh + 12;
    return '<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + bh.toFixed(1) +
      '" rx="3" fill="' + (d.value >= 0 ? color : negColor) + '"><title>' + esc(d.label) + ": " + esc(opts.format ? opts.format(d.value) : fmt(d.value)) + "</title></rect>" +
      '<text x="' + (bx + bw / 2).toFixed(1) + '" y="' + labelY.toFixed(1) + '" class="barval" text-anchor="middle">' +
      esc(opts.format ? opts.format(d.value) : fmt(d.value)) + "</text>" +
      '<text x="' + (bx + bw / 2).toFixed(1) + '" y="' + (h - 28) + '" class="axis" text-anchor="middle">' + esc(d.label) + "</text>";
  }).join("");
  return '<svg viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + esc(opts.title || "Bar chart") + '">' +
    '<line x1="' + padL + '" y1="' + y0.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + y0.toFixed(1) + '" class="axisline"/>' +
    bars + "</svg>";
}

/* Horizontal bar chart — good for long labels (provinces, partners). */
function hbarChart(data, opts) {
  const rowH = opts.rowH || 34;
  const w = opts.w || 640;
  const h = rowH * data.length + 30;
  const padL = opts.labelW || 150;
  const padR = 64;
  const color = opts.color || "#0b6b4f";
  const max = Math.max.apply(null, data.map((d) => d.value)) * 1.05;
  const rows = data.map((d, i) => {
    const bw = ((d.value / max) * (w - padL - padR));
    const y = 8 + i * rowH;
    return '<text x="' + (padL - 8) + '" y="' + (y + 15) + '" class="hbar-label" text-anchor="end">' + esc(d.label) + "</text>" +
      '<rect x="' + padL + '" y="' + y + '" width="' + bw.toFixed(1) + '" height="20" rx="3" fill="' + color + '">' +
      "<title>" + esc(d.label) + ": " + esc(opts.format ? opts.format(d.value) : fmt(d.value)) + "</title></rect>" +
      '<text x="' + (padL + bw + 6).toFixed(1) + '" y="' + (y + 15) + '" class="barval">' +
      esc(opts.format ? opts.format(d.value) : fmt(d.value)) + "</text>";
  }).join("");
  return '<svg viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + esc(opts.title || "Horizontal bar chart") + '">' + rows + "</svg>";
}

/* Donut chart with a centre label. data: [{label, value, color}]. */
function donutChart(data, opts) {
  const size = opts.size || 220;
  const r = size / 2 - 14;
  const cx = size / 2, cy = size / 2;
  const total = data.reduce((s, d) => s + d.value, 0);
  let acc = 0;
  const arcs = data.map((d) => {
    const a0 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d.value;
    const a1 = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    return '<path d="M ' + x0.toFixed(1) + " " + y0.toFixed(1) + " A " + r + " " + r + " 0 " + large + " 1 " + x1.toFixed(1) + " " + y1.toFixed(1) +
      '" fill="none" stroke="' + d.color + '" stroke-width="30"><title>' + esc(d.label) + ": " + d.value + "%</title></path>";
  }).join("");
  const legend = data.map((d) =>
    '<span class="legend-item"><i style="background:' + d.color + '"></i>' + esc(d.label) + " — " + d.value + "%</span>"
  ).join("");
  return '<div class="donut-wrap"><svg viewBox="0 0 ' + size + " " + size + '" role="img" aria-label="' + esc(opts.title || "Donut chart") + '">' +
    arcs + '<text x="' + cx + '" y="' + (cy - 4) + '" class="donut-centre" text-anchor="middle">' + esc(opts.centre || "") + "</text>" +
    '<text x="' + cx + '" y="' + (cy + 16) + '" class="donut-sub" text-anchor="middle">' + esc(opts.sub || "") + "</text></svg>" +
    '<div class="legend">' + legend + "</div></div>";
}

/* Small sparkline for KPI cards. */
function sparkline(data, color) {
  const w = 120, h = 34;
  const values = data.map((d) => d.value);
  const min = Math.min.apply(null, values);
  const max = Math.max.apply(null, values);
  const span = max - min || 1;
  const x = (i) => (i * w) / (data.length - 1);
  const y = (v) => 3 + ((max - v) * (h - 6)) / span;
  const pts = data.map((d, i) => x(i).toFixed(1) + "," + y(d.value).toFixed(1)).join(" ");
  return '<svg viewBox="0 0 ' + w + " " + h + '" class="spark" aria-hidden="true"><polyline points="' + pts +
    '" fill="none" stroke="' + (color || "#0b6b4f") + '" stroke-width="2"/></svg>';
}
