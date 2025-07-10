// import { cart, addToCart, calculateCartQuantity } from './data/cart.js';
import { cart } from './data/cart-class.js';
import { products, loadProductsFetch } from './data/products.js';
import { renderAmazonHeader } from './amazon/amazonHeader.js';
import { formatCurrency } from './utils/money.js';

const notJasmineTest = typeof window !== 'undefined' &&
  window.location &&
  !(typeof jasmine !== 'undefined');

loadProductsFetch(renderProductsGrid);

if (notJasmineTest) {
  renderAmazonHeader();
}

function renderProductsGrid() {
  let productsHTML = '';

  const url = new URL(window.location.href);
  let search = url.searchParams.get('search');

  let filteredProducts = products;

  // If a search exists in the URL parameters,
  // filter the products that match the search.
  if(search) {
    search = search.toLowerCase();

    filteredProducts = products.filter(product => {
      return product.name.toLowerCase().includes(search) || product.keywords.includes(search);
    });
  }

  if (filteredProducts.length === 0) {
    productsHTML = `
      <div class="no-products-found">
        <h3>No results for "${search}".</h3>
      </div>
    `;
    document.querySelector('.js-products-grid')
      .innerHTML = productsHTML;
    return;
  }

  filteredProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button js-add-to-cart button-primary" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
      `;
  });

  document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;

  // function updateCartQuantity() {
  //   const cartQuantity = cart.calculateCartQuantity();

  //   document.querySelector('.js-cart-quantity')
  //     .innerHTML = cartQuantity;
  // }

  // updateCartQuantity();


  function addedMessage(productId) {
    let addedMessageTimeoutId;

    const addedMessage = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

    addedMessage.classList.add('added-to-cart-visible');

    // Check if previous timeout exists and clear it
    if (addedMessageTimeoutId) {
      clearTimeout(addedMessageTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
    }, 2000);

    // Save the timeoutId to clear it later
    addedMessageTimeoutId = timeoutId;
  }

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const { productId } = button.dataset;

        cart.addToCart(productId);
        // updateCartQuantity();
        renderProductsGrid();
        renderAmazonHeader();
        addedMessage(productId);
      });
    });

    renderAmazonHeader();

}
