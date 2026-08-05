/*
  home.js — renders index.html
------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", async () => {
  const hero = document.getElementById("hero");
  if (hero && CONTENT.hero.image) {
    hero.style.backgroundImage = `url('${CONTENT.hero.image}')`;
  }

  const lookbookGrid = document.getElementById("lookbook-grid");
  if (lookbookGrid) {
    const stories = await api.getLookbook();
    lookbookGrid.innerHTML = stories
      .slice(0, 4)
      .map(
        (item) => `
        <a class="lookbook-tile ${item.tone}" href="lookbook-detail.html?id=${item.id}" style="background-image:url('${item.cover_image}')">
          <span class="lookbook-caption">${item.label}</span>
        </a>`
      )
      .join("");
  }

  const selectedGrid = document.getElementById("selected-grid");
  if (selectedGrid) {
    const products = await api.getProducts();
    selectedGrid.innerHTML = products
      .slice(0, 8)
      .map((p) => productCard(p, { hideSoldOut: true }))
      .join("");
    fillPlaceholderArt(selectedGrid);
  }
});
