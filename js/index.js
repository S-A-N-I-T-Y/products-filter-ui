"use strict";
// Get DOM elements
const searchInput = document.getElementById("search");
const ProductsContainer = document.getElementById("products-container");
const cartBTn = document.querySelectorAll(".btn");
const cartCount = document.getElementById("count");
const orderCount = document.getElementById("order-count");
const emptyOrder = document.getElementById("empty-order");

// Initialize products
let productsArray = [];

let productsElements = [];

// Getting products from json
async function getProducts() {
  try {
    let response = await fetch("data.json");
    let data = await response.json();
    productsArray = receiveProducts(data);
  } catch (error) {
    console.error(error);
  }
}

function receiveProducts(products) {
  return products.map((product) => product);
}
await getProducts()


  productsArray.forEach((product) => {
    let productEl = createProductsEl(product);
    ProductsContainer.appendChild(productEl);
    productsElements.push(productEl);
  });

  console.log(productsElements.length);




function createProductsEl(product) {
  let productEl = document.createElement("div");
  productEl.className = "shadow-lg p-2 rounded-md";
  productEl.innerHTML = `          <div
              id="product-item"
              class="border rounded-md relative mb-10 cursor-pointer hover:border-Red transition flex flex-col items-center"
            >
              <img
                src="${product.image.mobile}"
                alt=""
                class="w-full"
              />
              <button

                class="btn shadow-md px-6 py-2 rounded-full font-bold absolute top-[92.5%] border-Red bg-white hover:bg-Red text-red-500 hover:text-white transition delay-200 ease-in"
              >
                <i class="fa-solid fa-cart-shopping mr-3"></i>Add to Cart
              </button>
            </div>
            <p class="text-gray-500 font-light">${product.category}</p>
            <p class="font-bold">${product.name}</p>
            <p class="text-Red font-semibold">$${product.price}</p>`;

  productEl.querySelector(".btn").addEventListener("click", updateCart);

  return productEl;
}

let cartItemCount = 0;

function updateCart(e) {
  let statusEl = e.target;

  if (statusEl.classList.contains("added")) {
    statusEl.classList.remove("added");
    statusEl.innerHTML = "Add to Cart";

    cartItemCount--;
  } else {
    statusEl.classList.add("added");
    statusEl.innerHTML = "Remove from Cart";

    console.log(statusEl);
    cartItemCount++;
  }

  cartCount.innerHTML = cartItemCount;
}

// Filter Products

function filterProducts() {
  // get searchTerm
  let searchTerm = searchInput.value.trim().toLowerCase();
  console.log(searchTerm);

  productsElements.forEach((productEl, index) => {
    let product = productsArray[index];
    console.log(product);

    let matchProduct = product.name.toLowerCase().includes(searchTerm)

    if (matchProduct) {
      productEl.classList.remove("hidden");
    } else {
      productEl.classList.add("hidden");
    }
  });
}

searchInput.addEventListener("input", filterProducts);

