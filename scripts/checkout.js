import { renderCheckoutHeader } from './checkout/checkoutHeader.js'
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
// import './data/cart-class.js';
import './data/car.js';

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
  renderCheckout();
}
