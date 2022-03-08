let openMenu = document.getElementById("open-menu");
let closeMenu = document.getElementById("close-menu");
let nav = document.querySelector(".header-content nav");
let cartBtn = document.getElementById("cart-btn");
let cartCon = document.querySelector(".cart-con");
let slider = document.querySelector(".slider");
let current = 0;
let clientWidth = document.querySelector(".main-slider").clientWidth;
let sliderShuffle = Array.from(document.querySelectorAll(".slider-shuffle li"));
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let plus = document.querySelector("#plus");
let minus = document.querySelector("#minus");
let itemNum = document.querySelector(".item-num");
let addToCart = document.getElementById("add-to-cart");
let productPrice = document.querySelector(".product-price .price");
let cartItemsCon = document.querySelector(".cart-items");

let productTitle = document.querySelector(".product-details-heading h1");
let productImg = document.querySelector(".slider img");
openMenu.onclick = () => {
  let overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);
  nav.style.left = "0";
};
closeMenu.onclick = () => {
  nav.style.left = `-100%`;

  document.querySelector(".overlay").remove();
};
cartBtn.onclick = () => {
  cartCon.classList.toggle("open");
  cartBtn.classList.toggle("active");
};

function changeState() {
  slider.style.transform = `translateX(-${clientWidth * current}px)`;
  sliderShuffle.forEach((li) => {
    li.classList.remove("active");
  });
  sliderShuffle[current].classList.add("active");
}
changeState();
next.addEventListener("click", () => {
  if (current < sliderShuffle.length - 1) {
    current += 1;
    changeState();
  }
});
prev.addEventListener("click", () => {
  if (current > 0) {
    current -= 1;
    changeState();
  }
});
sliderShuffle.forEach((li) => {
  li.addEventListener("click", () => {
    current = parseInt(li.dataset.index);
    changeState();
  });
});
plus.addEventListener("click", () => {
  itemNum.innerHTML = parseInt(itemNum.innerHTML) + 1;
});
minus.addEventListener("click", () => {
  if (parseInt(itemNum.innerHTML) > 1) {
    itemNum.innerHTML = parseInt(itemNum.innerHTML) - 1;
  }
});
function cartChange() {
  if (document.querySelectorAll(".cart-items .cart-item").length === 0) {
    let span = document.createElement("span");
    span.className = "empty-cart";
    span.appendChild(document.createTextNode("Your cart is empty"));
    cartItemsCon.appendChild(span);
  }
  cartItemsNum();
}
cartChange();
addToCart.addEventListener("click", () => {
  if (document.querySelector(".empty-cart")) {
    document.querySelector(".empty-cart").remove();
  }
  let cartItem = document.createElement("div");
  cartItem.className = "cart-item";
  let img = document.createElement("img");
  img.src = productImg.src;
  let cartItemDetail = document.createElement("div");
  let title = document.createElement("h3");
  title.appendChild(document.createTextNode(productTitle.textContent));
  let div = document.createElement("div");
  let cartItemNum = document.createElement("span");
  cartItemNum.className = "cart-item-num";
  cartItemNum.appendChild(
    document.createTextNode(`$${productPrice.innerHTML} × ${itemNum.innerHTML}`)
  );
  let totalPrice = document.createElement("span");
  totalPrice.appendChild(
    document.createTextNode(
      `$${(productPrice.innerHTML * itemNum.innerHTML).toFixed(2)}`
    )
  );
  totalPrice.className = "cart-item-total-price";
  let deleteItem = document.createElement("button");
  deleteItem.innerHTML = `<img src="images/icon-delete.svg">`;
  div.appendChild(cartItemNum);
  div.appendChild(totalPrice);
  cartItemDetail.appendChild(title);
  cartItemDetail.appendChild(div);
  cartItem.appendChild(img);
  cartItem.appendChild(cartItemDetail);
  cartItem.appendChild(deleteItem);
  cartItemsCon.appendChild(cartItem);
  cartItemsNum();

  deleteItem.addEventListener("click", (e) => {
    e.currentTarget.parentElement.remove();
    cartChange();
  });
  if (!document.querySelector(".cart-con #checkout")) {
    let checkout = document.createElement("button");
    checkout.id = "checkout";
    checkout.appendChild(document.createTextNode("Checkout"));
    cartCon.appendChild(checkout);
  }
});
function cartItemsNum() {
  let span = document.querySelector(".num-of-cart-item");
  span.innerHTML = document.querySelectorAll(".cart-items .cart-item").length;
  console.log(document.querySelectorAll(".cart-items .cart-item").length);
}
