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
    <div class="site-header-inner">
      <a href="index.html" class="logo">Aeido</a>
      <button class="nav-toggle" id="nav-toggle" aria-label="메뉴 열기">${ICON_MENU}</button>
      <nav class="site-nav" id="site-nav">
        <a href="index.html" class="${page === "home" ? "active" : ""}">HOME</a>
        <a href="lookbook.html" class="${page === "lookbook" ? "active" : ""}">LOOKBOOK</a>
        <a href="products.html?category=1" class="${page === "glasses" ? "active" : ""}">GLASSES</a>
        <a href="products.html?category=2" class="${page === "sunglasses" ? "active" : ""}">SUNGLASSES</a>
        <a href="products.html" class="mobile-only-link">찾기</a>
        <a href="mypage.html" class="mobile-only-link">마이페이지</a>
        <a href="cart.html" class="mobile-only-link">장바구니</a>
      </nav>
      <div class="header-icons">
        <a href="products.html" aria-label="검색">${ICON_SEARCH}</a>
        <a href="mypage.html" aria-label="마이페이지">${ICON_USER}</a>
        <a href="cart.html" aria-label="장바구니" style="position:relative;">
          ${ICON_BAG}
          <span class="cart-count" data-cart-count>0</span>
        </a>
      </div>
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
let headerHeightObserver = null;
function initHeaderScroll(header) {
  const setHeaderHeight = () => {
    document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  };
  setHeaderHeight();
  // ResizeObserver instead of a window "resize" listener — it catches
  // every reason the header's own box height can change (viewport
  // resize, orientation change, the mobile menu toggling, fonts
  // finishing load), not just a window-level resize event.
  if (!headerHeightObserver && "ResizeObserver" in window) {
    headerHeightObserver = new ResizeObserver(setHeaderHeight);
    headerHeightObserver.observe(header);
  }
  // Belt-and-suspenders: the web fonts (Pretendard/Montserrat) can
  // finish loading after the header's first paint and swap in with
  // slightly different metrics, changing its height. ResizeObserver
  // should already catch that reflow, but explicitly re-measuring once
  // fonts are ready closes any gap — this is what was letting the
  // breadcrumb sit a few px under the header on some pages.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(setHeaderHeight);
  }

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
        <!-- TODO: placeholder business info — swap in the real registered
             details (사업자등록번호/통신판매업신고/주소/대표자 등) before launch -->
        <div class="footer-brand-desc">
          상호 aeido(에이도)<br>
          대표 OOO<br>
          사업자등록번호 000-00-00000<br>
          통신판매업신고 제2026-서울강남-0000호<br>
          주소 서울특별시 강남구 테헤란로 000, 0층<br>
          이메일 hello@aeido.co.kr<br>
          고객센터 02-0000-0000 (평일 10:00–18:00)
        </div>
      </div>
      <div class="footer-links-group">
        <div class="footer-col footer-links">
          <div class="footer-col-title">SHOP</div>
          <a href="products.html?category=1">GLASSES</a><br>
          <a href="products.html?category=2">SUNGLASSES</a><br>
          <a href="lookbook.html">LOOKBOOK</a>
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
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});
