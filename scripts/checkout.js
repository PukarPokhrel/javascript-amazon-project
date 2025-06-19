import { renderCheckoutHeader } from './checkout/checkoutHeader.js'
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from './data/products.js';
import { cart } from './data/cart-class.js';
// import './data/cart-class.js';
// import './data/car.js';
// import './data/backend-practice.js';

const notJasmineTest = typeof window !== 'undefined' &&
  window.location &&
  !(typeof jasmine !== 'undefined');

export function renderCheckout() {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

async function loadPage() {
  try {
    // throw 'error1'; // test error handling on async

    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      // throw 'error2'; // test error handling on promises
      cart.loadCart(() => {
        // reject('error3'); // test error handling on promises
        resolve('value3');
      });
    });

  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }

  if (notJasmineTest) {
    renderCheckout();
  }
}

loadPage();

/*
Promise.all([
  loadProductsFetch(),

  new Promise((resolve) => {
    cart.loadCart(() => {
      resolve();
    });
  });

]).then((values) => {
  console.log(values); // ['value1', undefined]
  if (notJasmineTest) {
    renderCheckout();
  }
});
*/

/*
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1');
    });
  }),
  new Promise((resolve) => {
    cart.loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values); // ['value1', undefined]
  if (notJasmineTest) {
    renderCheckout();
  }
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value); // 'value1'

  return new Promise((resolve) => {
    cart.loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  if (notJasmineTest) {
    renderCheckout();
  }
});
*/

/*
loadProducts(() => {
  cart.loadCart(() => {
    renderCheckout();
  })
});
*/

/*
export function renderCheckout() {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

if (notJasmineTest) // notJasmineTest = typeof window !== 'undefined' && window.location && !(typeof jasmine !== 'undefined')
 {
  loadProducts(() => {
    renderCheckout();
  });
}
*/


// async function loadPage() {
//   try {
//     await Promise.all([
//       loadProductsFetch(),
//       loadCartFetch()
//     ]);

//   } catch (error) {
//     console.log('Unexpected error. Please try again later.')
//   }

  // if (notJasmineTest) {
  //     renderCheckout();
  //   }
// }

// loadPage();
