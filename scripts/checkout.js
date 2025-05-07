import { renderCheckoutHeader } from './checkout/checkoutHeader.js'
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';

export function renderCheckout() {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

renderCheckout();
