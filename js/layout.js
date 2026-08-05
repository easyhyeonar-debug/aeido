/*
  layout.js
  ------------------------------------------------------------------
  Renders the shared header and footer into every page and wires up
  the mobile nav toggle + cart badge. Each HTML page just needs:
    <header id="site-header"></header>
    ...page content...
    <footer id="site-footer"></footer>
  and to set `document.body.dataset.page` to one of:
    home | glasses | sunglasses | lookbook
  so the matching nav link gets the active underline.
------------------------------------------------------------------ */

function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  const page = document.body.dataset.page || "";

  el.innerHTML = `
    <a href="index.html" class="logo">Aeido</a>
    <button class="nav-toggle" id="nav-toggle" aria-label="메뉴 열기">${ICON_MENU}</button>
    <nav class="site-nav" id="site-nav">
      <a href="index.html" class="${page === "home" ? "active" : ""}">HOME</a>
      <a href="index.html#lookbook">LOOKBOOK</a>
      <a href="products.html?category=1" class="${page === "glasses" ? "active" : ""}">GLASSES</a>
      <a href="products.html?category=2" class="${page === "sunglasses" ? "active" : ""}">SUNGLASSES</a>
    </nav>
    <div class="header-icons">
      <a href="products.html" aria-label="검색">${ICON_SEARCH}</a>
      <a href="mypage.html" aria-label="마이페이지">${ICON_USER}</a>
      <a href="cart.html" aria-label="장바구니" style="position:relative;">
        ${ICON_BAG}
        <span class="cart-count" data-cart-count>0</span>
      </a>
    </div>
  `;

  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  if (typeof cart !== "undefined") cart._updateBadge();

  initHeaderScroll(el);
}

/*
  initHeaderScroll — the header is `position: fixed`, so:
  1) it publishes its real height as --header-h so `body` can pad itself
     out of the way (a page-load fallback covers the instant before this
     runs), and
  2) it hides itself on scroll-down and reappears on scroll-up, so it
     doesn't permanently eat screen space on the long product-detail
     page but is always one upward scroll away.
  product.js re-renders the header after it resolves the page's active
  category, so this only wires up the scroll listener once (headerScrollBound)
  even though renderHeader() itself can run more than once per page.
*/
let headerScrollBound = false;
function initHeaderScroll(header) {
  const setHeaderHeight = () => {
    document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  };
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);

  if (headerScrollBound) return;
  headerScrollBound = true;

  let lastY = window.scrollY;
  let ticking = false;

  function update() {
    const y = window.scrollY;
    const nav = document.getElementById("site-nav");
    const menuOpen = nav && nav.classList.contains("open");
    if (!menuOpen) {
      if (y <= header.offsetHeight) {
        header.classList.remove("header-hidden");
      } else if (y > lastY + 4) {
        header.classList.add("header-hidden");
      } else if (y < lastY - 4) {
        header.classList.remove("header-hidden");
      }
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.innerHTML = `
    <div class="site-footer">
      <div class="footer-col">
        <div class="footer-brand-name">Aeido</div>
        <div class="footer-brand-desc">형태가 기능이 되는<br>안경을 만듭니다.</div>
      </div>
      <div class="footer-col footer-links">
        <div class="footer-col-title">SHOP</div>
        <a href="products.html?category=1">GLASSES</a><br>
        <a href="products.html?category=2">SUNGLASSES</a><br>
        <a href="index.html#lookbook">LOOKBOOK</a>
      </div>
      <div class="footer-col footer-links">
        <div class="footer-col-title">ABOUT</div>
        <a href="#">OUR STORY</a><br>
        <a href="#">CONTACT</a>
      </div>
      <div class="footer-col footer-links">
        <div class="footer-col-title">FOLLOW</div>
        <a href="#" target="_blank" rel="noopener">INSTAGRAM</a>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});
