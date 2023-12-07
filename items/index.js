document.addEventListener('DOMContentLoaded', fetchProducts);

function fetchProducts() {
  const categoryFilter = document.getElementById('categoryFilter');
  const productContainer = document.getElementById('productContainer');

  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      displayProducts(products);

      categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        const filteredProducts = filterProducts(products, selectedCategory);
        displayProducts(filteredProducts);
      });
    })
    .catch(error => console.error('Produqtebi Ver Chaitvirta', error));
}

function displayProducts(products) {
  const productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = '';

  let currentRow;

  products.forEach((product, index) => {
    if (index % 4 === 0) {
      currentRow = document.createElement('div');
      currentRow.classList.add('product-row');
      productContainer.appendChild(currentRow);
    }

    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.category}</p>
      <p>$${product.price}</p>
      <div class="product-buttons">
      <button onclick="viewDetails()" <i class="fa-regular fa-heart"></i></button>
        <button onclick="addToCart()" <i class="fa-solid fa-cart-shopping"></i></button>
        <button onclick="buyNow()" <i class="fa-regular fa-eye"></i></button>
      </div>
    `;
    currentRow.appendChild(productCard);
  });
}

function filterProducts(products, category) {
  if (category === 'all') {
    return products;
  } else {
    return products.filter(product => product.category === category);
  }
}

function viewDetails() {
  alert("View Details clicked!");
}

function addToCart() {
  alert("Add to Cart clicked!");
}

function buyNow() {
  alert("Buy Now clicked!");
}