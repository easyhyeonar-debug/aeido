/*
  lookbook-detail.js — renders lookbook-detail.html?id=<id>

  Editorial photo spread (LOOKBOOK[i].photos) + a "Shop the look"
  product grid pulled from the story's category (or a general mix
  when the story isn't tied to one category).
------------------------------------------------------------------ */

function renderEditorial(item) {
  const grid = document.getElementById("lb-editorial");
  grid.innerHTML = item.photos
    .map((photo) => {
      const sizeClass = photo.size === "full" ? "lb-photo--full" : "";
      return `<div class="lb-photo reveal-on-scroll ${photo.tone} ${sizeClass}" style="background-image:url('${photo.image}')"></div>`;
    })
    .join("");

  initScrollReveal(grid.querySelectorAll(".lb-photo"));
}

async function renderShopTheLook(item) {
  const grid = document.getElementById("lb-related-grid");
  const products = await api.getProducts(
    item.category_no ? { category_no: item.category_no } : {}
  );
  grid.innerHTML = products
    .slice(0, 8)
    .map((p) => productCard(p, { hideSoldOut: true }))
    .join("");
  fillPlaceholderArt(grid);
}

document.addEventListener("DOMContentLoaded", async () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const item = await api.getLookbookItem(id);

  if (!item) {
    document.querySelector(".frame").innerHTML =
      '<div class="empty-state">룩북을 찾을 수 없습니다. <a href="lookbook.html">전체 룩북 보기 &#8594;</a></div>';
    return;
  }

  document.getElementById("page-title").textContent = `Aeido — ${item.label}`;
  document.getElementById("breadcrumb").textContent = `HOME / LOOKBOOK / ${item.label.toUpperCase()}`;

  const hero = document.getElementById("lb-hero");
  hero.style.backgroundImage = `url('${item.cover_image}')`;
  hero.classList.add(item.tone);
  document.getElementById("lb-title").textContent = item.label;
  document.getElementById("lb-desc").textContent = item.description;

  renderEditorial(item);
  renderShopTheLook(item);
});
