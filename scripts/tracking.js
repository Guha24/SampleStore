import { loadProductsFetch,getProduct } from "../data/products.js";
import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

const url=new URL(window.location.href);
const orderId=url.searchParams.get('orderId');
const productId=url.searchParams.get('productId');
async function loadPage(){
  await loadProductsFetch();
  const product=getProduct(productId);
  let order;
  let productOrderDetails;

  orders.forEach((orderItem) => {
    if(orderItem.id === orderId){
      order=orderItem;
      const product1=orderItem.products;
    
      product1.forEach((item)=>{
        if(item.productId === productId){
          productOrderDetails=item;
        }
      })
    }
  });

  const date =dayjs(productOrderDetails.estimatedDeliveryTime);
  const dateFormat=date.format('dddd, MMMM D')
  const orderDate=dayjs(order.orderTime);
  const presentDate=dayjs();
  const hoursPassed=presentDate.diff(orderDate,'minute');
  console.log(hoursPassed);

  const diffInHours=date.diff(orderDate,'minute')
  console.log(diffInHours);

  const barLength=(hoursPassed/diffInHours) *100;
  console.log(barLength);
  const trackingHTML=
  `<div class="order-tracking">
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${dateFormat}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productOrderDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="progress-label js-preparing-label">
        Preparing
      </div>
      <div class="progress-label js-shipping-label">
        Shipped
      </div>
      <div class="progress-label js-delivered-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar js-progress-bar"></div>
    </div>
  </div>
  `

  document.querySelector('.main').innerHTML=trackingHTML;
  requestAnimationFrame(()=>{
    requestAnimationFrame(()=>{
      if(barLength<=10){
        document.querySelector('.js-progress-bar').style.width=`10%`;
      }
      else{
        document.querySelector('.js-progress-bar').style.width=`${barLength}%`;
      }
      
      if(barLength < 50){
        document.querySelector('.js-preparing-label').classList.add('current-status');
      }
      else if(barLength>=50 && barLength<100){
        document.querySelector('.js-shipping-label').classList.add('current-status');
      }
      else{
        document.querySelector('.js-delivered-label').classList.add('current-status');
      }
    })
    
  })
  



}

loadPage();


