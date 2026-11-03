"use strict";

/* =====================================================
   SHOP SETTINGS: change these to your own details
   ===================================================== */
const SHOP = {
  currency: "KSh",
  paybill: "123456",   // your M-Pesa Paybill number
  account: "MAKUMI",   // account number customers should use
};

/* =====================================================
   PRODUCT DETAILS: every product lives in this object.
   The "Add Products" form reads from here, so users can
   only pick products that exist. Replace the image links
   with your own picture URLs.
   ===================================================== */
const catalog = {
  phones: {
    label: "Phones",
    items: [
      {
        id: "ph1",
        name: "Samsung Galaxy A15",
        price: 18500,
        image: "https://placehold.co/600x400/0f172a/38bdf8?text=Galaxy+A15",
        description: "6.5-inch AMOLED display, 128GB storage, 50MP camera and a 5000mAh battery that lasts all day.",
      },
      {
        id: "ph2",
        name: "Tecno Spark 20",
        price: 15500,
        image: "https://placehold.co/600x400/0f172a/38bdf8?text=Tecno+Spark+20",
        description: "Smooth 90Hz screen, 8GB RAM, 128GB storage and fast charging for busy days.",
      },
      {
        id: "ph3",
        name: "Infinix Hot 40",
        price: 17000,
        image: "https://placehold.co/600x400/0f172a/38bdf8?text=Infinix+Hot+40",
        description: "Large 6.78-inch display, 256GB storage and a powerful processor for games and videos.",
      },
      {
        id: "ph4",
        name: "iPhone 13",
        price: 78000,
        image: "https://placehold.co/600x400/0f172a/38bdf8?text=iPhone+13",
        description: "6.1-inch Super Retina display, A15 chip, dual 12MP cameras and great video quality.",
      },
    ],
  },

  clothes: {
    label: "Clothes",
    items: [
      {
        id: "cl1",
        name: "Classic Cotton T-Shirt",
        price: 900,
        image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Cotton+T-Shirt",
        description: "Soft 100% cotton crew-neck t-shirt, breathable and comfortable for everyday wear.",
      },
      {
        id: "cl2",
        name: "Slim Fit Jeans",
        price: 2200,
        image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Slim+Fit+Jeans",
        description: "Stretch denim with a modern slim fit. Durable and easy to match with any top.",
      },
      {
        id: "cl3",
        name: "Hooded Sweatshirt",
        price: 2800,
        image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Hoodie",
        description: "Warm fleece-lined hoodie with a front pocket and adjustable hood.",
      },
      {
        id: "cl4",
        name: "Summer Floral Dress",
        price: 2500,
        image: "https://placehold.co/600x400/3b0764/e9d5ff?text=Floral+Dress",
        description: "Light, flowing dress with a floral print, perfect for warm days and weekend outings.",
      },
    ],
  },

  jewelry: {
    label: "Jewelry",
    items: [
      {
        id: "jw1",
        name: "Gold-Plated Necklace",
        price: 1800,
        image: "https://placehold.co/600x400/422006/fde68a?text=Gold+Necklace",
        description: "Elegant gold-plated chain with a small pendant. Lightweight and skin-friendly.",
      },
      {
        id: "jw2",
        name: "Silver Hoop Earrings",
        price: 1200,
        image: "https://placehold.co/600x400/422006/fde68a?text=Hoop+Earrings",
        description: "Classic polished silver hoops that go with both casual and formal outfits.",
      },
      {
        id: "jw3",
        name: "Beaded Bracelet",
        price: 700,
        image: "https://placehold.co/600x400/422006/fde68a?text=Beaded+Bracelet",
        description: "Handmade beaded bracelet with an adjustable fit. Colorful and lightweight.",
      },
      {
        id: "jw4",
        name: "Stainless Steel Watch",
        price: 3500,
        image: "https://placehold.co/600x400/422006/fde68a?text=Steel+Watch",
        description: "Water-resistant analog watch with a stainless steel strap and a clear, easy-to-read dial.",
      },
    ],
  },

  stationaries: {
    label: "Stationaries",
    items: [
      {
        id: "st1",
        name: "A4 Notebook (Pack of 5)",
        price: 600,
        image: "https://placehold.co/600x400/052e16/86efac?text=A4+Notebooks",
        description: "Five ruled A4 notebooks, 96 pages each, with strong covers for school or office.",
      },
      {
        id: "st2",
        name: "Ballpoint Pens (Box of 20)",
        price: 400,
        image: "https://placehold.co/600x400/052e16/86efac?text=Ballpoint+Pens",
        description: "Smooth-writing blue ballpoint pens that dry quickly and don't smudge.",
      },
      {
        id: "st3",
        name: "Geometry Set",
        price: 350,
        image: "https://placehold.co/600x400/052e16/86efac?text=Geometry+Set",
        description: "Complete set with ruler, protractor, set squares, compass and divider in a sturdy tin.",
      },
      {
        id: "st4",
        name: "Desk Organizer",
        price: 1200,
        image: "https://placehold.co/600x400/052e16/86efac?text=Desk+Organizer",
        description: "Multi-compartment organizer that keeps pens, notes and small items neat on your desk.",
      },
    ],
  },
};

/* Products shown on the Products page the first time the shop opens */
const DEFAULT_LISTED = ["ph1", "ph2", "cl1", "cl2", "jw1", "jw2", "st1", "st2"];

/* =====================================================
   Helpers
   ===================================================== */
const $ = (selector) => document.querySelector(selector);

// Look up any product by its id
const productIndex = {};
Object.entries(catalog).forEach(([category, group]) => {
  group.items.forEach((item) => {
    productIndex[item.id] = { ...item, category };
  });
});

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function formatPrice(amount) {
  return `${SHOP.currency} ${Number(amount).toLocaleString("en-KE")}`;
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    const value = raw ? JSON.parse(raw) : fallback;
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: the shop still works for this visit */
  }
}

// 0712345678, 0112345678, +254712345678 and 254712345678 all become 254712345678
function normalizePhone(input) {
  const digits = String(input).replace(/[\s\-()+]/g, "");
  if (/^0[17]\d{8}$/.test(digits)) return `254${digits.slice(1)}`;
  if (/^254[17]\d{8}$/.test(digits)) return digits;
  return null;
}

// Broken image links fall back to a plain placeholder
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">' +
    '<rect width="100%" height="100%" fill="#e2e8f0"/>' +
    '<text x="50%" y="50%" fill="#64748b" font-family="sans-serif" font-size="28" ' +
    'text-anchor="middle" dominant-baseline="middle">Image unavailable</text></svg>'
  );

document.addEventListener(
  "error",
  (event) => {
    const el = event.target;
    if (el instanceof HTMLImageElement && !el.dataset.failed) {
      el.dataset.failed = "1";
      el.src = FALLBACK_IMG;
    }
  },
  true
);

/* =====================================================
   State (saved in the browser so a refresh keeps it)
   ===================================================== */
let listedIds = load("makumi_listed", DEFAULT_LISTED).filter((id) => productIndex[id]);
let cart = load("makumi_cart", []).filter(
  (line) => line && productIndex[line.id] && Number.isInteger(line.qty) && line.qty > 0
);
let orders = load("makumi_orders", []).filter(
  (o) => o && typeof o.ref === "string" && Array.isArray(o.items)
);
let activeFilter = "all";

/* =====================================================
   Page elements
   ===================================================== */
const cartModal = $("#cartModal");
const checkoutModal = $("#checkoutModal");
const addModal = $("#addModal");

/* =====================================================
   Pop-up helpers
   ===================================================== */
let lastFocus = null;

function openModal(modal) {
  lastFocus = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  const target = modal.querySelector("[data-autofocus]") || modal.querySelector(".modal-close");
  if (target) target.focus();
}

function closeModal(modal) {
  modal.hidden = true;
  if (!document.querySelector(".modal:not([hidden])")) {
    document.body.classList.remove("modal-open");
  }
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest("[data-close]")) closeModal(modal);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const open = [...document.querySelectorAll(".modal:not([hidden])")].pop();
  if (open) closeModal(open);
});

let toastTimer;
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 2200);
}

/* =====================================================
   Pages (Home / Products / Profile)
   ===================================================== */
function showPage() {
  const wanted = (location.hash || "#home").slice(1);
  const page = ["home", "products", "profile"].includes(wanted) ? wanted : "home";

  document.querySelectorAll(".page").forEach((section) => {
    section.hidden = section.id !== `page-${page}`;
  });
  document.querySelectorAll(".nav a").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === page);
  });

  if (page === "profile") renderProfile();
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", showPage);

/* =====================================================
   Products page
   ===================================================== */
function renderChips() {
  const chips = [["all", "All"], ...Object.entries(catalog).map(([key, group]) => [key, group.label])];
  $("#filterChips").innerHTML = chips
    .map(([key, label]) =>
      `<button type="button" class="chip${key === activeFilter ? " active" : ""}" data-filter="${esc(key)}">${esc(label)}</button>`
    )
    .join("");
}

function setFilter(key) {
  activeFilter = key === "all" || catalog[key] ? key : "all";
  renderChips();
  renderProducts();
}

function productCard(product) {
  return `
    <article class="card">
      <img src="${esc(product.image)}" alt="${esc(product.name)}" loading="lazy">
      <div class="card-body">
        <span class="tag">${esc(catalog[product.category].label)}</span>
        <h3>${esc(product.name)}</h3>
        <p>${esc(product.description)}</p>
        <div class="card-foot">
          <span class="price">${formatPrice(product.price)}</span>
          <button type="button" class="btn btn-primary" data-add="${esc(product.id)}">Add to cart</button>
        </div>
      </div>
    </article>`;
}

function renderProducts() {
  const list = listedIds
    .map((id) => productIndex[id])
    .filter((p) => activeFilter === "all" || p.category === activeFilter);

  $("#productGrid").innerHTML = list.length
    ? list.map(productCard).join("")
    : '<p class="empty">No products here yet. Click "Add Products" to add some.</p>';
}

$("#productGrid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});

// Category links on Home and filter chips on Products
document.addEventListener("click", (event) => {
  const el = event.target.closest("[data-filter]");
  if (el) setFilter(el.dataset.filter);
});

/* =====================================================
   Cart
   ===================================================== */
function cartCount() {
  return cart.reduce((sum, line) => sum + line.qty, 0);
}

function cartTotal() {
  return cart.reduce((sum, line) => sum + productIndex[line.id].price * line.qty, 0);
}

function updateCartBadge() {
  const count = cartCount();
  const badge = $("#cartCount");
  badge.textContent = count;
  badge.hidden = count === 0;
  $("#cartBtn").setAttribute("aria-label", `Open cart, ${count} item${count === 1 ? "" : "s"}`);
}

function commitCart() {
  save("makumi_cart", cart);
  updateCartBadge();
  if (!cartModal.hidden) renderCart();
}

function addToCart(id) {
  if (!productIndex[id]) return;
  const line = cart.find((item) => item.id === id);
  if (line) {
    line.qty = Math.min(line.qty + 1, 99);
  } else {
    cart.push({ id, qty: 1 });
  }
  commitCart();
  toast(`${productIndex[id].name} added to cart`);
}

function renderCart() {
  const box = $("#cartItems");

  if (cart.length === 0) {
    box.innerHTML = '<p class="empty">Your cart is empty.</p>';
  } else {
    box.innerHTML = cart
      .map((line) => {
        const p = productIndex[line.id];
        return `
          <div class="cart-line">
            <img src="${esc(p.image)}" alt="${esc(p.name)}">
            <div class="cart-info">
              <strong>${esc(p.name)}</strong>
              <span class="muted small">${formatPrice(p.price)} each</span>
              <div class="qty">
                <button type="button" data-act="dec" data-id="${esc(p.id)}" aria-label="Decrease quantity of ${esc(p.name)}">−</button>
                <span>${line.qty}</span>
                <button type="button" data-act="inc" data-id="${esc(p.id)}" aria-label="Increase quantity of ${esc(p.name)}">+</button>
              </div>
            </div>
            <div class="cart-side">
              <strong>${formatPrice(p.price * line.qty)}</strong>
              <button type="button" class="link-danger" data-act="remove" data-id="${esc(p.id)}">Remove</button>
            </div>
          </div>`;
      })
      .join("");
  }

  $("#cartTotal").textContent = formatPrice(cartTotal());
  $("#checkoutBtn").disabled = cart.length === 0;
}

$("#cartItems").addEventListener("click", (event) => {
  const button = event.target.closest("[data-act]");
  if (!button) return;

  const id = button.dataset.id;
  const line = cart.find((item) => item.id === id);
  if (!line) return;

  if (button.dataset.act === "inc") line.qty = Math.min(line.qty + 1, 99);
  if (button.dataset.act === "dec") line.qty -= 1;
  if (button.dataset.act === "remove") line.qty = 0;

  cart = cart.filter((item) => item.qty > 0);
  commitCart();
});

$("#cartBtn").addEventListener("click", () => {
  renderCart();
  openModal(cartModal);
});

/* =====================================================
   Checkout
   ===================================================== */
const checkoutForm = $("#checkoutForm");
const checkoutError = $("#checkoutError");

$("#checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) return;

  closeModal(cartModal);

  $("#billAmount").textContent = formatPrice(cartTotal());
  $("#paybillNo").textContent = SHOP.paybill;
  $("#accountNo").textContent = SHOP.account;

  checkoutForm.reset();
  if (orders[0]) {
    $("#custName").value = orders[0].name || "";
    $("#custPhone").value = orders[0].phone || "";
  }
  checkoutError.textContent = "";
  $("#checkoutBody").hidden = false;
  $("#checkoutSuccess").hidden = true;

  openModal(checkoutModal);
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = $("#custName").value.trim();
  const phone = normalizePhone($("#custPhone").value);
  const message = $("#payMessage").value.trim();

  if (cart.length === 0) {
    checkoutError.textContent = "Your cart is empty.";
    return;
  }
  if (name.length < 2) {
    checkoutError.textContent = "Please enter your name.";
    return;
  }
  if (!phone) {
    checkoutError.textContent = "Enter a valid phone number, e.g. 0712345678.";
    return;
  }
  if (message.length < 10) {
    checkoutError.textContent = "Paste the message you received when you paid.";
    return;
  }

  const order = {
    ref: "MK" + Date.now().toString(36).toUpperCase(),
    date: new Date().toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" }),
    name,
    phone,
    message,
    total: cartTotal(),
    items: cart.map((line) => ({
      name: productIndex[line.id].name,
      price: productIndex[line.id].price,
      qty: line.qty,
    })),
  };

  orders.unshift(order);
  orders = orders.slice(0, 20);
  save("makumi_orders", orders);

  // Clear the cart after a successful checkout
  cart = [];
  commitCart();

  $("#successText").textContent =
    `Thank you, ${name}! Your order ${order.ref} for ${formatPrice(order.total)} has been received. ` +
    `We will confirm your payment and contact you on ${phone}.`;
  $("#checkoutBody").hidden = true;
  $("#checkoutSuccess").hidden = false;
});

/* =====================================================
   Add Products (select inputs only, filled from the catalog)
   ===================================================== */
const newCategory = $("#newCategory");
const newProduct = $("#newProduct");
const addSubmit = $("#addSubmit");

function renderPreview() {
  const product = productIndex[newProduct.value];
  $("#newPreview").innerHTML = product
    ? `<img src="${esc(product.image)}" alt="${esc(product.name)}">
       <div>
         <p><strong>${esc(product.name)}</strong></p>
         <p class="price">${formatPrice(product.price)}</p>
         <p class="muted">${esc(product.description)}</p>
       </div>`
    : "";
}

function refreshProductSelect() {
  const available = catalog[newCategory.value].items.filter((p) => !listedIds.includes(p.id));

  if (available.length === 0) {
    newProduct.innerHTML = '<option value="">All products in this category are already listed</option>';
    newProduct.disabled = true;
    addSubmit.disabled = true;
  } else {
    newProduct.innerHTML = available
      .map((p) => `<option value="${esc(p.id)}">${esc(p.name)} (${formatPrice(p.price)})</option>`)
      .join("");
    newProduct.disabled = false;
    addSubmit.disabled = false;
  }
  renderPreview();
}

$("#addProductBtn").addEventListener("click", () => {
  const current = newCategory.value;
  newCategory.innerHTML = Object.entries(catalog)
    .map(([key, group]) => `<option value="${esc(key)}">${esc(group.label)}</option>`)
    .join("");
  if (catalog[current]) newCategory.value = current;

  refreshProductSelect();
  openModal(addModal);
});

newCategory.addEventListener("change", refreshProductSelect);
newProduct.addEventListener("change", renderPreview);

$("#addProductForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const id = newProduct.value;
  if (!productIndex[id] || listedIds.includes(id)) return;

  listedIds.push(id);
  save("makumi_listed", listedIds);

  setFilter("all");
  closeModal(addModal);
  toast(`${productIndex[id].name} added to Products`);
});

/* =====================================================
   Profile
   ===================================================== */
function renderProfile() {
  const latest = orders[0];
  const name = latest && latest.name ? latest.name : "Guest";

  $("#profileName").textContent = name;
  $("#profileAvatar").textContent = name.charAt(0).toUpperCase();
  $("#profilePhone").textContent = latest && latest.phone ? latest.phone : "Not provided yet";
  $("#orderCount").textContent = orders.length;
  $("#clearOrders").hidden = orders.length === 0;

  $("#orderList").innerHTML = orders.length
    ? orders
        .map(
          (o) => `
        <article class="order">
          <div class="order-head">
            <strong>${esc(o.ref)}</strong>
            <span class="muted small">${esc(o.date || "")}</span>
          </div>
          <ul>${o.items.map((i) => `<li>${esc(i.name)} × ${Number(i.qty) || 0}</li>`).join("")}</ul>
          <p><strong>Total:</strong> ${formatPrice(o.total || 0)}</p>
          <p class="muted small">Payment message: ${esc(o.message || "")}</p>
        </article>`
        )
        .join("")
    : '<p class="empty">You have not placed any orders yet.</p>';
}

$("#clearOrders").addEventListener("click", () => {
  orders = [];
  save("makumi_orders", orders);
  renderProfile();
});

/* =====================================================
   Start
   ===================================================== */
$("#year").textContent = new Date().getFullYear();
renderChips();
renderProducts();
updateCartBadge();
showPage();