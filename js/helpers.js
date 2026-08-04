/*
  helpers.js — small utilities shared across pages
------------------------------------------------------------------ */

function moneyKRW(n) {
  return "₩" + Number(n).toLocaleString("en-US");
}

function productCard(p) {
  const photo = p.list_image
    ? `<img src="${p.list_image}" alt="${p.product_name}">`
    : "";
  const soldOut = p.quantity <= 0;
  return `
    <a class="product-cell" href="product.html?id=${p.product_no}">
      <div class="product-photo" data-shape="${p.shape_key}" data-tinted="${!!p.tinted}">${photo}</div>
      <div class="product-info">
        <span class="product-name">${p.product_name}</span>
        <span class="product-price">${moneyKRW(p.price)}</span>
      </div>
      ${soldOut ? `<div class="product-soldout">SOLD OUT</div>` : ""}
    </a>
  `;
}

function fillPlaceholderArt(root) {
  root.querySelectorAll(".product-photo").forEach((el) => {
    if (el.querySelector("img")) return;
    const shape = el.dataset.shape;
    const tinted = el.dataset.tinted === "true";
    renderProductArt(el, shape, tinted);
  });
}
