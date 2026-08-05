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

/*
  renderGallery — builds the left-hand image column: the main product
  shot followed by the close-up detail shots, stacked full-width (the
  gentlemonster.com PDP pattern this is modeled on: a long scrolling
  photo column next to a buy panel that stays pinned in view).
*/
function renderGallery(p) {
  const gallery = document.getElementById("pd-gallery");

  const mainShot = `
    <div class="pd-shot pd-shot-main reveal-on-scroll">
      <div class="pd-shot-photo" id="detail-photo"></div>
    </div>`;

  const detailShots = (p.detail_shots || [])
    .map(
      (shot) => `
      <div class="pd-shot pd-shot-detail reveal-on-scroll">
        <div class="pd-shot-caption">${shot.caption}</div>
        <div class="pd-shot-photo" data-shape="${shot.shape_key}"></div>
      </div>`
    )
    .join("");

  gallery.innerHTML = mainShot + detailShots;

  const photoEl = document.getElementById("detail-photo");
  if (p.list_image) {
    photoEl.innerHTML = `<img src="${p.list_image}" alt="${p.product_name}">`;
  } else {
    renderProductArt(photoEl, p.shape_key, !!p.tinted);
    photoEl.querySelector("svg").setAttribute("width", "45%");
  }

  gallery.querySelectorAll(".pd-shot-detail .pd-shot-photo").forEach((el) => {
    if (el.querySelector("img")) return;
    renderProductArt(el, el.dataset.shape, false);
  });

  initScrollReveal(gallery.querySelectorAll(".pd-shot"));
}

/*
  renderAccordion — spec info + shipping note as collapsible sections
  in the sticky buy panel, expand/collapse animated via max-height.
*/
function renderAccordion(p) {
  const el = document.getElementById("pd-accordion");
  const sections = [
    {
      title: "SPECIFICATION",
      open: true,
      body: `
        <div class="acc-row"><span class="label">소재</span><span class="value">${p.material}</span></div>
        <div class="acc-row"><span class="label">무게</span><span class="value">${p.weight}</span></div>
        <div class="acc-row"><span class="label">사이즈</span><span class="value">${p.size}</span></div>
      `,
    },
    {
      title: "무료 배송 & 반품",
      open: false,
      body: `<p class="acc-text">전 상품 무료 배송으로 발송되며, 수령 후 7일 이내 미착용 상품에 한해 무료 반품이 가능합니다.</p>`,
    },
  ];

  el.innerHTML = sections
    .map(
      (s, i) => `
      <div class="acc-item ${s.open ? "is-open" : ""}" data-index="${i}">
        <button type="button" class="acc-trigger">
          <span>${s.title}</span>
          <span class="acc-icon"></span>
        </button>
        <div class="acc-panel">
          <div class="acc-panel-inner">${s.body}</div>
        </div>
      </div>`
    )
    .join("");

  el.querySelectorAll(".acc-item").forEach((item) => {
    const trigger = item.querySelector(".acc-trigger");
    const panel = item.querySelector(".acc-panel");
    if (item.classList.contains("is-open")) {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
    trigger.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      panel.style.maxHeight = isOpen ? panel.scrollHeight + "px" : "0px";
    });
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
    document.querySelector(".pd-layout").innerHTML =
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

  document.getElementById("detail-category").textContent = categoryName(product.category_no).toUpperCase();
  document.getElementById("detail-name").textContent = product.product_name;
  document.getElementById("detail-price").textContent = moneyKRW(product.price);
  document.getElementById("detail-desc").textContent = product.summary_description;

  renderGallery(product);
  renderLensColors(product);
  renderAccordion(product);
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
