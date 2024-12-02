let products;

// Function to fetch products from the Fake Store API
async function getProducts() {
  const apiUrl = "https://fakestoreapi.com/products";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Transform API data to fit the existing format
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      url: item.image,
      originalPrice: item.price,
      salePrice: null, // Assuming no sale price in the API
      rating: Math.random() * 5, // Random rating since the API doesn't provide it
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return empty array if API fails
  }
}

// Function to render products based on filters
async function renderProducts(filter) {
  const productsWrapper = document.querySelector(".products");

  productsWrapper.classList.add("products__loading");

  if (!products) {
    products = await getProducts();
  }

  productsWrapper.classList.remove("products__loading");

  if (filter === "LOW_TO_HIGH") {
    products.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    products.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "RATING") {
    products.sort((a, b) => b.rating - a.rating);
  }

  const productsHtml = products
    .map((product) => {
      return `<div class="product">
    <figure class="product__img--wrapper">
      <img class="product__img" src="${product.url}" alt="">
    </figure>
    <div class="product__title">
      ${product.title}
    </div>
    <div class="product__ratings">
      ${ratingsHTML(product.rating)}
    </div>
    <div class="product__price">
      ${priceHTML(product.originalPrice)}
    </div>
  </div>`;
    })
    .join("");

  productsWrapper.innerHTML = productsHtml;
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`;
  }
  return `<span class="product__price--normal">$${originalPrice.toFixed(
    2
  )}</span>$${salePrice.toFixed(2)}`;
}

function ratingsHTML(rating) {
  let ratingHTML = "";
  for (let i = 0; i < Math.floor(rating); ++i) {
    ratingHTML += '<i class="fas fa-star"></i>\n';
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>\n';
  }
  return ratingHTML;
}

function filterProducts(event) {
  renderProducts(event.target.value);
}

// Initial rendering
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
