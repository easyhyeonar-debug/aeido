/*
  helpers.js — small utilities shared across pages
------------------------------------------------------------------ */

function moneyKRW(n) {
  return "₩" + Number(n).toLocaleString("en-US");
}

function productCard(p, opts = {}) {
  const photo = p.list_image
    ? `<img src="${p.list_image}" alt="${p.product_name}">`
    : "";
  const soldOut = p.quantity <= 0;
  const showSoldOut = soldOut && !opts.hideSoldOut;
  return `
    <a class="product-cell" href="product.html?id=${p.product_no}">
      <div class="product-photo" data-shape="${p.shape_key}" data-tinted="${!!p.tinted}">${photo}</div>
      <div class="product-info">
        <span class="product-name">${p.product_name}</span>
        <span class="product-price">${moneyKRW(p.price)}</span>
      </div>
      ${showSoldOut ? `<div class="product-soldout">SOLD OUT</div>` : ""}
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

/*
  initScrollReveal — fades/rises each element in as it scrolls into
  view (pair with the .reveal-on-scroll CSS class). Used by the
  product-detail gallery and the lookbook-detail editorial spread.
  Falls back to instantly visible if IntersectionObserver isn't
  available.
*/
function initScrollReveal(elements) {
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  elements.forEach((el) => io.observe(el));
}
