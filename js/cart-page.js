/*
  cart-page.js — renders cart.html
------------------------------------------------------------------ */

function cartRowHTML(item) {
  return `
    <div class="cart-row" data-product="${item.product_no}" data-color="${item.lens_color || ""}">
      <div class="cart-thumb" data-shape="${item.shape_key}" data-tinted="${!!item.tinted}"></div>
      <div class="cart-info">
        <div class="name">${item.product_name}</div>
        <div class="option">${item.lens_color ? item.lens_color.toUpperCase() + " LENS" : ""}</div>
      </div>
      <div class="qty-stepper">
        <button type="button" class="row-qty-minus" aria-label="수량 줄이기">&#8722;</button>
        <span>${item.qty}</span>
        <button type="button" class="row-qty-plus" aria-label="수량 늘리기">&#43;</button>
      </div>
      <div class="cart-price">${moneyKRW(item.price * item.qty)}</div>
      <button type="button" class="cart-remove" aria-label="삭제">${ICON_X}</button>
    </div>
  `;
}

function renderCart() {
  const items = cart.getItems();
  const rowsEl = document.getElementById("cart-rows");
  const emptyEl = document.getElementById("cart-empty");
  const summaryEl = document.getElementById("cart-summary");
  const countEl = document.getElementById("cart-item-count");

  countEl.textContent = items.length ? `${cart.count()} items` : "";

  if (items.length === 0) {
    rowsEl.innerHTML = "";
    emptyEl.style.display = "block";
    summaryEl.style.display = "none";
    return;
  }

  emptyEl.style.display = "none";
  summaryEl.style.display = "flex";
  rowsEl.innerHTML = items.map(cartRowHTML).join("");

  rowsEl.querySelectorAll(".cart-thumb").forEach((el) => {
    renderProductArt(el, el.dataset.shape, el.dataset.tinted === "true");
  });

  rowsEl.querySelectorAll(".cart-row").forEach((row) => {
    const product_no = Number(row.dataset.product);
    const color = row.dataset.color || null;
    const item = items.find(
      (i) => i.product_no === product_no && (i.lens_color || "") === (color || "")
    );

    row.querySelector(".row-qty-minus").addEventListener("click", () => {
      cart.updateQty(product_no, color, item.qty - 1);
      renderCart();
    });
    row.querySelector(".row-qty-plus").addEventListener("click", () => {
      cart.updateQty(product_no, color, item.qty + 1);
      renderCart();
    });
    row.querySelector(".cart-remove").addEventListener("click", () => {
      cart.removeItem(product_no, color);
      renderCart();
    });
  });

  document.getElementById("summary-subtotal").textContent = moneyKRW(cart.subtotal());
  document.getElementById("summary-total").textContent = moneyKRW(cart.subtotal());
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  document.getElementById("checkout-btn").addEventListener("click", () => {
    alert("카페24 결제 연동 전입니다. 연동 후 실제 결제 페이지로 연결됩니다.");
  });
});
