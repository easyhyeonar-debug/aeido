/*
  home.js — renders index.html
------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", async () => {
  const hero = document.getElementById("hero");
  if (hero && CONTENT.hero.image) {
    hero.style.backgroundImage = `url('${CONTENT.hero.image}')`;
  }

  const grid = document.getElementById("lookbook-grid");
  if (grid) {
    grid.innerHTML = CONTENT.lookbook
      .map(
        (item) => `
        <div class="lookbook-tile ${item.tone}" style="background-image:url('${item.image}')">
          <span class="lookbook-caption">${item.caption}</span>
        </div>`
      )
      .join("");
  }

  const selectedGrid = document.getElementById("selected-grid");
  if (selectedGrid) {
    const products = await api.getProducts();
    selectedGrid.innerHTML = products.slice(0, 8).map(productCard).join("");
    fillPlaceholderArt(selectedGrid);
  }
});
