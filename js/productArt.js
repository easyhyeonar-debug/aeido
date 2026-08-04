/*
  productArt.js
  ------------------------------------------------------------------
  Line-art placeholder "photography" for products that don't have a
  real photo yet (list_image / images empty in data.js). Renders a
  simple glasses/sunglasses SVG sized to fill its container.

  Once real product photos exist, set `list_image` (and `images`) on
  the product in data.js — product.js and home.js already prefer the
  real image over this placeholder automatically.
------------------------------------------------------------------ */

function productArtSVG(shapeKey, tinted) {
  const stroke = "#1F1E1C";
  const lensFill = tinted ? `fill="${stroke}" fill-opacity="0.85"` : `fill="none"`;

  const shapes = {
    round: `
      <circle cx="55" cy="45" r="30" ${lensFill} stroke="${stroke}" stroke-width="3"/>
      <circle cx="145" cy="45" r="30" ${lensFill} stroke="${stroke}" stroke-width="3"/>
      <line x1="85" y1="42" x2="115" y2="42" stroke="${stroke}" stroke-width="3"/>
      <line x1="25" y1="35" x2="5" y2="20" stroke="${stroke}" stroke-width="3"/>
      <line x1="175" y1="35" x2="195" y2="20" stroke="${stroke}" stroke-width="3"/>`,
    square: `
      <rect x="25" y="18" width="60" height="54" rx="8" ${lensFill} stroke="${stroke}" stroke-width="3"/>
      <rect x="115" y="18" width="60" height="54" rx="8" ${lensFill} stroke="${stroke}" stroke-width="3"/>
      <line x1="85" y1="42" x2="115" y2="42" stroke="${stroke}" stroke-width="3"/>
      <line x1="25" y1="35" x2="5" y2="20" stroke="${stroke}" stroke-width="3"/>
      <line x1="175" y1="35" x2="195" y2="20" stroke="${stroke}" stroke-width="3"/>`,
    oval: `
      <ellipse cx="55" cy="45" rx="34" ry="26" ${lensFill} stroke="${stroke}" stroke-width="3"/>
      <ellipse cx="145" cy="45" rx="34" ry="26" ${lensFill} stroke="${stroke}" stroke-width="3"/>
      <line x1="89" y1="42" x2="111" y2="42" stroke="${stroke}" stroke-width="3"/>
      <line x1="21" y1="35" x2="2" y2="20" stroke="${stroke}" stroke-width="3"/>
      <line x1="179" y1="35" x2="198" y2="20" stroke="${stroke}" stroke-width="3"/>`,
    rectangle: `
      <rect x="18" y="24" width="68" height="42" rx="4" ${lensFill} stroke="${stroke}" stroke-width="3"/>
      <rect x="114" y="24" width="68" height="42" rx="4" ${lensFill} stroke="${stroke}" stroke-width="3"/>
      <line x1="86" y1="42" x2="114" y2="42" stroke="${stroke}" stroke-width="3"/>
      <line x1="18" y1="35" x2="2" y2="22" stroke="${stroke}" stroke-width="3"/>
      <line x1="182" y1="35" x2="198" y2="22" stroke="${stroke}" stroke-width="3"/>`,
    browline: `
      <path d="M25 30 A30 30 0 0 1 85 30" fill="none" stroke="${stroke}" stroke-width="3"/>
      <path d="M115 30 A30 30 0 0 1 175 30" fill="none" stroke="${stroke}" stroke-width="3"/>
      <circle cx="55" cy="45" r="30" ${lensFill} stroke="none"/>
      <circle cx="145" cy="45" r="30" ${lensFill} stroke="none"/>
      <line x1="85" y1="30" x2="115" y2="30" stroke="${stroke}" stroke-width="3"/>
      <line x1="25" y1="30" x2="5" y2="18" stroke="${stroke}" stroke-width="3"/>
      <line x1="175" y1="30" x2="195" y2="18" stroke="${stroke}" stroke-width="3"/>`,
    bridge: `
      <ellipse cx="70" cy="50" rx="38" ry="30" fill="none" stroke="${stroke}" stroke-width="2.5"/>
      <path d="M108 44 Q118 30 128 44" fill="none" stroke="${stroke}" stroke-width="2.5"/>
      <line x1="150" y1="46" x2="195" y2="30" stroke="${stroke}" stroke-width="2.5"/>`,
    tip: `
      <path d="M10 20 L170 70" stroke="${stroke}" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M150 60 Q185 78 190 60" stroke="${stroke}" stroke-width="6" stroke-linecap="round" fill="none"/>`,
    rim: `
      <circle cx="70" cy="50" r="34" fill="none" stroke="${stroke}" stroke-width="2.5"/>
      <line x1="104" y1="48" x2="140" y2="48" stroke="${stroke}" stroke-width="2.5"/>
      <line x1="140" y1="48" x2="195" y2="30" stroke="${stroke}" stroke-width="2.5"/>`,
  };

  const inner = shapes[shapeKey] || shapes.round;
  return `<svg viewBox="0 0 200 90" width="70%" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;
}

function renderProductArt(container, shapeKey, tinted) {
  container.innerHTML = productArtSVG(shapeKey, tinted);
}
