import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { getProduct } from "../data/products.js";
import { products,loadProductsFetch} from "../data/products.js";
import { addToCartOrders,cart,updateOrderQuantity } from "../data/cart.js";


const orderPageHTML=''


async function loadPage(){
  await loadProductsFetch();

  orders.forEach((orderItem)=>{
    const orderId=orderItem.id;
    
    
    const date=dayjs(orderItem.orderTime).format('MMMM D');

    const tempHTML=
    `<div class="order-container js-order-container-${orderId}">
            
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${date}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${(orderItem.totalCostCents/100).toFixed(2)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${orderId}</div>
        </div>
      </div>
      <div class="order-details-grid js-order-details-grid">
            
      </div>
    </div>`

    const pro=orderItem.products;
    let productListHTML=''
    pro.forEach((proItem)=>{
      const productId=proItem.productId;
      const matchingProduct=getProduct(productId);
      const deliveryDate=dayjs(proItem.estimatedDeliveryTime).format('MMMM D');

    
      productListHTML+=
      `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${deliveryDate}
          </div>
          <div class="product-quantity">
            Quantity: ${proItem.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again" data-product-id="${productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${orderId}&productId=${productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>

      `
    });
    document.querySelector('.js-orders-grid').innerHTML+=tempHTML;
    const container=document.querySelector(`.js-order-container-${orderId}`);
    
    container.querySelector('.js-order-details-grid').innerHTML=productListHTML;

    
   
  });
  document.querySelectorAll('.js-buy-again')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId=link.dataset.productId;
      addToCartOrders(productId);
      document.querySelector('.js-buy-again')
          .innerHTML=`<img class="check-icon" src="images/icons/check.png">
          <span>Added</span>`
      setTimeout(()=>{
        document.querySelector('.js-buy-again')
        .innerHTML=`<img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
        `
      },2000);
      

      updateOrderQuantity();
      
    });
  });

  updateOrderQuantity();
  

};



loadPage();


