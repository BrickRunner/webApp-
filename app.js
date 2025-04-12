let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch('/products')
    .then(res => res.json())
    .then(data => {
      const categoriesDiv = document.getElementById("categories");
      const productsDiv = document.getElementById("products");

      for (let category in data) {
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.onclick = () => showProducts(category, data[category]);
        categoriesDiv.appendChild(btn);
      }

      document.getElementById("checkout").onclick = () => {
        alert("Заказ оформлен!");
        cart = [];
        updateCart();
      };

      document.getElementById("theme-toggle").onclick = () => {
        document.body.classList.toggle("dark-theme");
      };
    });
});

function showProducts(category, products) {
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = `<h2>${category}</h2>`;
  products.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `${p.name} — ${p.price}₽ 
      <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">Добавить</button>`;
    productsDiv.appendChild(div);
  });
}

function addToCart(id, name, price) {
  cart.push({ id, name, price });
  updateCart();
}

function updateCart() {
  const cartUl = document.getElementById("cart");
  cartUl.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.price}₽`;
    cartUl.appendChild(li);
  });
}