/*
  api.js — Cafe24-ready data layer
  ------------------------------------------------------------------
  Every page talks to product/category data ONLY through the
  functions in this file. Right now they read from the mock arrays
  in data.js. When a real Cafe24 mall is connected later, this is
  the ONLY file that needs to change — swap the body of each
  function for a real fetch() call and nothing else in the site
  (home.js, products.js, product.js, ...) needs to be touched.

  How the real Cafe24 connection will work (for later):
  1. Open a Cafe24 mall (free tier is fine) and register products
     as usual through the Cafe24 admin — that part never changes,
     Cafe24's own admin stays the "easy product registration" tool.
  2. Register a Private app for this mall at developers.cafe24.com
     to get a client_id / client_secret, then complete the OAuth
     flow to get an access token.
  3. Because the client secret can't be exposed in the browser, put
     a small proxy server between this frontend and the Cafe24
     Admin API — it holds the token and forwards requests, e.g.
     GET /admin/products?category=... .
  4. Replace the body of getProducts/getProduct/getCategories below
     with `fetch('/api/products?...')` calls to that proxy, mapping
     the Cafe24 response fields (product_no, product_name, price,
     list_image, quantity, category ...) onto the same shape used
     here — since data.js already mirrors those field names, the
     rest of the app should keep working unchanged.
------------------------------------------------------------------ */

const api = {
  async getCategories() {
    return Promise.resolve(CATEGORIES);
  },

  async getProducts({ category_no, keyword, sort } = {}) {
    let items = PRODUCTS.slice();

    if (category_no) {
      items = items.filter((p) => p.category_no === Number(category_no));
    }
    if (keyword) {
      const q = keyword.trim().toLowerCase();
      items = items.filter((p) => p.product_name.toLowerCase().includes(q));
    }
    if (sort === "price_asc") {
      items.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      items.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      items.sort((a, b) => b.product_no - a.product_no);
    }

    return Promise.resolve(items);
  },

  async getProduct(product_no) {
    const item = PRODUCTS.find((p) => p.product_no === Number(product_no));
    return Promise.resolve(item || null);
  },

  async getRelatedProducts(product_no, limit = 4) {
    const current = PRODUCTS.find((p) => p.product_no === Number(product_no));
    if (!current) return Promise.resolve([]);
    const items = PRODUCTS.filter(
      (p) => p.product_no !== current.product_no && p.category_no === current.category_no
    );
    const rest = PRODUCTS.filter(
      (p) => p.product_no !== current.product_no && p.category_no !== current.category_no
    );
    return Promise.resolve(items.concat(rest).slice(0, limit));
  },

  async getLookbook() {
    return Promise.resolve(LOOKBOOK);
  },
};
