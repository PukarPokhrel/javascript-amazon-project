import { getOrder } from "./data/orders.js";
import { getProduct, loadProductsFetch } from "./data/products.js";
import { orderDeliveryDate } from "./data/deliveryOptions.js";
import { renderAmazonHeader } from "./amazon/amazonHeader.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';

const notJasmineTest = typeof window !== 'undefined' &&
  window.location &&
  !(typeof jasmine !== 'undefined');

  if (notJasmineTest) {
    renderAmazonHeader();
  }

async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);

  if (!order || !product) {
    document.querySelector('.js-order-tracking').innerHTML = `No order selected.`;
    return;
  }

  // Get additional details about the product like
  // the estimated delivery time.
  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  const today = dayjs().format('MMMM D');
  const orderDate = dayjs(order.orderTime).format('MMMM D');
  const deliveryDate = orderDeliveryDate(order.orderTime, productDetails.estimatedDeliveryTime);
  const percentProgress = (dayjs(today).diff(dayjs(orderDate)) / (dayjs(deliveryDate).diff(dayjs(orderDate)))) * 100;

  // Extra feature: Display 'delivered' if today's date is past the delivery date.
  const deliveredMessage = dayjs(deliveryDate).diff(dayjs(today)) > 0 ? 'Arriving on' : 'Delivered on';

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>
    <div class="delivery-date">
      ${deliveredMessage} ${deliveryDate}
    </div>
    <div class="product-info">
      ${product.name}
    </div>
    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>
    <img class="product-image" src="${product.image}">
    <div class="progress-labels-container">
      <div class="progress-label ${
        percentProgress < 50 ? 'current-status' : ''
      }">
        Preparing
      </div>
      <div class="progress-label ${
        percentProgress >= 50 && percentProgress < 100 ? 'current-status' : ''
      }">
        Shipped
      </div>
      <div class="progress-label ${
        percentProgress >= 100 ? 'current-status' : ''
      }">
        Delivered
      </div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentProgress}%;"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

  renderAmazonHeader();
}

loadPage();
