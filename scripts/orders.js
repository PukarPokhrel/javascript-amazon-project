import { renderAmazonHeader } from "./amazon/amazonHeader.js";
import { getProduct, loadProductsFetch } from "./data/products.js";
import { orders } from "./data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from "./utils/money.js";
import { cart } from "./data/cart-class.js"
import { orderDeliveryDate } from "./data/deliveryOptions.js";

const notJasmineTest = typeof window !== 'undefined' &&
  window.location &&
  !(typeof jasmine !== 'undefined');

if (notJasmineTest) {
  renderAmazonHeader();
}

async function loadPage() {
  await loadProductsFetch();

  let ordersHTML = '';

  orders.forEach((order) => {
    const orderTimeString = dayjs(order.orderTime).format('MMMM D');

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
    `;
  });

  function productsListHTML(order) {
    let productsListHTMl = '';

    order.products.forEach((productDetails) => {
      const product = getProduct(productDetails.productId);

      const today = dayjs().format('MMMM D');
      const deliveryDate = orderDeliveryDate(order.orderTime, productDetails.estimatedDeliveryTime);

       const deliveredMessage = dayjs(deliveryDate).diff(dayjs(today)) > 0 ? 'Arriving on:' : 'Delivered on:';

      productsListHTMl += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            ${deliveredMessage} ${deliveryDate}
          </div>
          <div class="product-quantity">
            Quantity: ${productDetails.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions js-track-package">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    return productsListHTMl;
  }

  document.querySelector('.js-orders-grid')
    .innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again')
    .forEach((button) => {
      button.addEventListener('click', () => {
        cart.addToCart(button.dataset.productId);

        // Optional
        button.innerHTML= 'Added';
        setTimeout(() => {
          button.innerHTML = `
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          `;
        }, 1000);
      });
    });

  renderAmazonHeader();
}

loadPage();
