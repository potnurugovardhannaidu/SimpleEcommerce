const PRODUCTS = [
  {id:1,title:"T-Shirt",price:399,img:"https://picsum.photos/200?1"},
  {id:2,title:"Sneakers",price:1999,img:"https://picsum.photos/200?2"},
  {id:3,title:"Watch",price:999,img:"https://picsum.photos/200?3"}
];

let cart = {};

const qs = id => document.getElementById(id);
const productsDiv = qs("products");
const cartItemsDiv = qs("cart-items");
const cartTotal = qs("cart-total");
const cartCount = qs("cart-count");

function renderProducts() {
  productsDiv.innerHTML = "";
  PRODUCTS.forEach(p => {
    productsDiv.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.title}</h3>
        <p class="price">₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>`;
  });
}

function addToCart(id) {
  if (!cart[id]) cart[id] = { ...PRODUCTS.find(p=>p.id===id), qty: 0 };
  cart[id].qty++;
  renderCart();
}

function renderCart() {
  cartItemsDiv.innerHTML = "";
  let total = 0, count = 0;

  Object.values(cart).forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}">
        <div>
          <p>${item.title}</p>
          <p>₹${item.price} × ${item.qty}</p>
        </div>
      </div>`;
  });

  cartTotal.textContent = "₹" + total;
  cartCount.textContent = count;
}

qs("search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  const filtered = PRODUCTS.filter(p => p.title.toLowerCase().includes(q));
  productsDiv.innerHTML = "";
  filtered.forEach(p => {
    productsDiv.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.title}</h3>
        <p class="price">₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>`;
  });
});

qs("checkout").addEventListener("click", () => {
  if (Object.keys(cart).length === 0) return alert("Cart is empty");
  alert("Order Placed Successfully!");
  cart = {};
  renderCart();
});

qs("clear-cart").addEventListener("click", () => {
  cart = {};
  renderCart();
});

renderProducts();
renderCart();
