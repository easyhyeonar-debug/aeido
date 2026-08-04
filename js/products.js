/*
  products.js — renders products.html (list / category page)
------------------------------------------------------------------ */

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

async function renderProducts() {
  const category_no = getQueryParam("category") || "";
  const sort = document.getElementById("sort-select").value;

  const grid = document.getElementById("product-grid");
  const empty = document.getElementById("empty-state");

  const items = await api.getProducts({ category_no, sort });

  if (items.length === 0) {
    grid.innerHTML = "";
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";
  grid.innerHTML = items.map(productCard).join("");
  fillPlaceholderArt(grid);
}

function setActiveTab(category_no) {
  document.querySelectorAll("#filter-tabs button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === (category_no || ""));
  });
  document.body.dataset.page =
    category_no === "1" ? "glasses" : category_no === "2" ? "sunglasses" : "";
  // header was already rendered by layout.js before this ran (script order),
  // so re-render it now that dataset.page is correct, to reflect the active nav link
  if (typeof renderHeader === "function") renderHeader();
}

document.addEventListener("DOMContentLoaded", () => {
  const initialCategory = getQueryParam("category") || "";
  setActiveTab(initialCategory);
  renderProducts();

  document.querySelectorAll("#filter-tabs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const category_no = btn.dataset.category;
      const url = category_no
        ? `products.html?category=${category_no}`
        : "products.html";
      history.replaceState(null, "", url);
      setActiveTab(category_no);
      renderProducts();
    });
  });

  document.getElementById("sort-select").addEventListener("change", renderProducts);
});
