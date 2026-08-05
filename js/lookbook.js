/*
  lookbook.js — renders lookbook.html

  Each tile is a story from LOOKBOOK (data.js), read through
  api.getLookbook(). Clicking one goes to its own editorial page —
  lookbook-detail.html?id=<id> — instead of straight to a product list.
------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("lookbook-grid");
  if (!grid) return;

  const items = await api.getLookbook();

  grid.innerHTML = items
    .map(
      (item) => `
      <a class="lookbook-tile ${item.tone}" href="lookbook-detail.html?id=${item.id}" style="background-image:url('${item.cover_image}')">
        <span class="lookbook-caption">${item.label}</span>
      </a>`
    )
    .join("");
});
