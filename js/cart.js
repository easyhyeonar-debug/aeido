/*
  cart.js
  ------------------------------------------------------------------
  Cart state, kept in localStorage so it survives page navigation
  and reloads. This runs in the user's own browser (not a Claude
  artifact), so localStorage is fine here.

  Cart item shape:
  { product_no, product_name, price, lens_color, qty, shape_key, tinted }

  When Cafe24 is connected later, addToCart/updateQty/removeFromCart
  can additionally call the Cafe24 cart API through api.js if you
  want the cart to live server-side — the localStorage cart can stay
  as an offline/guest fallback either way.
------------------------------------------------------------------ */

const CART_KEY = "aeido_cart";

const cart = {
  getItems() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  _save(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    cart._updateBadge();
  },

  addItem(product, lens_color, qty) {
    const items = cart.getItems();
    const existing = items.find(
      (i) => i.product_no === product.product_no && i.lens_color === lens_color
    );
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({
        product_no: product.product_no,
        product_name: product.product_name,
        price: product.price,
        lens_color: lens_color,
        shape_key: product.shape_key,
        tinted: !!product.tinted,
        qty: qty,
      });
    }
    cart._save(items);
  },

  updateQty(product_no, lens_color, qty) {
    let items = cart.getItems();
    if (qty <= 0) {
      items = items.filter(
        (i) => !(i.product_no === product_no && i.lens_color === lens_color)
      );
    } else {
      const existing = items.find(
        (i) => i.product_no === product_no && i.lens_color === lens_color
      );
      if (existing) existing.qty = qty;
    }
    cart._save(items);
  },

  removeItem(product_no, lens_color) {
    const items = cart
      .getItems()
      .filter((i) => !(i.product_no === product_no && i.lens_color === lens_color));
    cart._save(items);
  },

  clear() {
    cart._save([]);
  },

  count() {
    return cart.getItems().reduce((sum, i) => sum + i.qty, 0);
  },

  subtotal() {
    return cart.getItems().reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  _updateBadge() {
    const badge = document.querySelector("[data-cart-count]");
    if (badge) badge.textContent = cart.count();
  },
};
