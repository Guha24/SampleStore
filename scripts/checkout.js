import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
import {renderSearch } from "../data/search.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';


async function loadPage(){
  await loadProductsFetch();

  const value=await new Promise((resolve)=>{
    loadCart(()=>{
      resolve('value3');
    });
  });

  renderOrderSummary();
  renderPaymentSummary();
  
}

loadPage();



/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve('value2');
    });
  })

]).then((value)=>{
  console.log(value);
  renderOrderSummary();
  renderPaymentSummary();

});
*/


/*new Promise((resolve)=>{
  
  loadProducts(()=>{
    resolve();
  });

  
}).then(()=>{
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
loadProducts(()=>{
  renderOrderSummary();
  renderPaymentSummary();

});
*/