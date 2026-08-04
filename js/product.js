/*
  product.js — renders product.html
------------------------------------------------------------------ */

let currentProduct = null;
let selectedLensColor = null;
let currentQty = 1;

function categoryName(category_no) {
  const cat = CATEGORIES.find((c) => c.category_no === category_no);
  return cat ? cat.category_name : "";
}

function renderLensColors(p) {
  const row = document.getElementById("lens-color-row");
  const colors = (p.options && p.options.lens_color) || [];
  selectedLensColor = colors[0] || null;

  row.innerHTML = colors
    .map(
      (c, i) =>
        `<button type="button" class="chip ${i === 0 ? "active" : ""}" data-color="${c}">${c}</button>`
    )
    .join("");

  row.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      row.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      selectedLensColor = chip.dataset.color;
    });
  });
}

function updateQtyDisplay() {
  document.getElementById("qty-value").textContent = currentQty;
  document.getElementById("qty-minus").disabled = currentQty <= 1;
  const max = currentProduct ? currentProduct.quantity : 1;
  document.getElementById("qty-plus").disabled = currentQty >= max;
}

function renderSpecRows(p) {
  const el = document.getElementById("spec-rows");
  const rows = [
    ["소재", p.material],
    ["무게", p.weight],
    ["사이즈", p.size],
  ];
  el.innerHTML = rows
    .map(
      ([label, value]) => `
      <div class="spec-row">
        <span class="label">${label}</span>
        <span class="value">${value}</span>
      </div>`
    )
    .join("");
}

function renderDetailShots(p) {
  const grid = document.getElementById("details-grid");
  grid.innerHTML = (p.detail_shots || [])
    .map(
      (shot) => `
      <div class="details-cell">
        <div class="details-caption">${shot.caption}</div>
        <div class="details-photo" data-shape="${shot.shape_key}"></div>
      </div>`
    )
    .join("");

  grid.querySelectorAll(".details-photo").forEach((el) => {
    if (el.querySelector("img")) return;
    renderProductArt(el, el.dataset.shape, false);
  });
}

async function renderRelated(product_no) {
  const grid = document.getElementById("related-grid");
  const items = await api.getRelatedProducts(product_no, 4);
  grid.innerHTML = items.map(productCard).join("");
  fillPlaceholderArt(grid);
}

function flashButton(btn, text) {
  const original = btn.textContent;
  btn.textContent = text;
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 900);
}

document.addEventListener("DOMContentLoaded", async () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const product = await api.getProduct(id);

  if (!product) {
    document.querySelector(".detail-grid").innerHTML =
      '<div class="empty-state">상품을 찾을 수 없습니다. <a href="products.html">전체 상품 보기 &#8594;</a></div>';
    return;
  }

  currentProduct = product;
  document.body.dataset.page = product.category_no === 1 ? "glasses" : "sunglasses";
  // header was already rendered by layout.js before this ran (script order),
  // so re-render it now that dataset.page is correct, to reflect the active nav link
  if (typeof renderHeader === "function") renderHeader();
  document.getElementById("page-title").textContent = `Aeido — ${product.product_name}`;
  document.getElementById("breadcrumb").textContent =
    `HOME / ${categoryName(product.category_no).toUpperCase()} / ${product.product_name.toUpperCase()}`;

  const photoEl = document.getElementById("detail-photo");
  if (product.list_image) {
    photoEl.innerHTML = `<img src="${product.list_image}" alt="${product.product_name}">`;
  } else {
    renderProductArt(photoEl, product.shape_key, !!product.tinted);
    photoEl.querySelector("svg").setAttribute("width", "55%");
  }

  document.getElementById("detail-category").textContent = categoryName(product.category_no).toUpperCase();
  document.getElementById("detail-name").textContent = product.product_name;
  document.getElementById("detail-price").textContent = moneyKRW(product.price);
  document.getElementById("detail-desc").textContent = product.summary_description;

  renderLensColors(product);
  renderSpecRows(product);
  renderDetailShots(product);
  renderRelated(product.product_no);

  const soldOut = product.quantity <= 0;
  const addBtn = document.getElementById("add-to-bag");
  const buyBtn = document.getElementById("buy-now");
  const qtyMinus = document.getElementById("qty-minus");
  const qtyPlus = document.getElementById("qty-plus");

  if (soldOut) {
    addBtn.disabled = true;
    buyBtn.disabled = true;
    addBtn.textContent = "SOLD OUT";
    qtyMinus.disabled = true;
    qtyPlus.disabled = true;
  } else {
    updateQtyDisplay();
    qtyMinus.addEventListener("click", () => {
      if (currentQty > 1) currentQty--;
      updateQtyDisplay();
    });
    qtyPlus.addEventListener("click", () => {
      if (currentQty < product.quantity) currentQty++;
      updateQtyDisplay();
    });

    addBtn.addEventListener("click", () => {
      cart.addItem(product, selectedLensColor, currentQty);
      flashButton(addBtn, "ADDED");
    });

    buyBtn.addEventListener("click", () => {
      cart.addItem(product, selectedLensColor, currentQty);
      window.location.href = "cart.html";
    });
  }
});
