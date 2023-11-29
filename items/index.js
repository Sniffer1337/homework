document.addEventListener('DOMContentLoaded', fetchProducts);

function fetchProducts() {
  const categoryFilter = document.getElementById('categoryFilter');
  const productContainer = document.getElementById('productContainer');

  // Fetch products from the API
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
      // Populate the productContainer with products
      displayProducts(products);

      // Add event listener to the category filter
      categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        const filteredProducts = filterProducts(products, selectedCategory);
        displayProducts(filteredProducts);
      });
    })
    .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products) {
  const productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = '';

  let currentRow;

  products.forEach((product, index) => {
    if (index % 4 === 0) {
      // Create a new row after every fourth product
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
        <button onclick="viewDetails()">View Details</button>
        <button onclick="addToCart()">Add to Cart</button>
        <button onclick="buyNow()">Buy Now</button>
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

// Example interaction functions
function viewDetails() {
  alert("View Details clicked!");
}

function addToCart() {
  alert("Add to Cart clicked!");
}

function buyNow() {
  alert("Buy Now clicked!");
}