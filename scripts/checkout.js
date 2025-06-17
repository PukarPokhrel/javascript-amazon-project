import { renderCheckoutHeader } from './checkout/checkoutHeader.js'
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts } from './data/products.js';
// import './data/cart-class.js';
// import './data/car.js';
// import './data/backend-practice.js';

loadProducts(() => {
  renderCheckout();
});

export function renderCheckout() {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

if (
  typeof window !== 'undefined' &&
  window.location &&
  !(typeof jasmine !== 'undefined')
) {
  loadProducts();
}


// async function loadPage() {
//   try {

//     await Promise.all([
//       loadProductsFetch(),
//       loadCartFetch()
//     ]);

//   } catch (error) {
//     console.log('Unexpected error. Please try again later.')
//   }

//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// }

// loadPage();
