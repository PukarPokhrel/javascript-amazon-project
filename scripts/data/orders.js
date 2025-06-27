// import { products } from "./products.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}

// function trackPackage() {
//   let html = '';

//   html += `
//   <a href="tracking.html?orderId=${orderId}&productId=${product.id}">
//     <button class="track-package-button button-secondary">
//       Track package
//     </button>
//   </a>
//   `;
// }

// trackPackage();
