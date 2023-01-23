// Target menu highlight

const nav_bar = document.querySelector(".navbar");

const navigation = document.querySelectorAll(".new-menu");

const homeItems = document.querySelectorAll(".home-1");

nav_bar.addEventListener("click", function (e) {
  const id = e.target.dataset.id;

  if (id) {
    navigation.forEach(function (nava) {
      e.target.classList.add("active");

      nava.classList.remove("active");
    });
  }
});

//About section

const aboutText = document.querySelector(".about-text");

const aboutBtn = document.querySelectorAll(".about-btn");

const aboutArticles = document.querySelectorAll(".about-articles");

aboutText.addEventListener("click", function (e) {
  const id = e.target.dataset.id;

  if (id) {
    aboutBtn.forEach(function (btn) {
      btn.classList.remove("active");

      e.target.classList.add("active");
    });

    aboutArticles.forEach(function (article) {
      article.classList.remove("active");

      const element = document.getElementById(id);

      element.classList.add("active");
    });
  }
});

//Cart container display

const shoppingCartIcon = document.querySelector(".shopping-cart");

const optimumCartItemDisplay = document.querySelector(".cart-display");

shoppingCartIcon.addEventListener("click", function () {
  optimumCartItemDisplay.style.display = "block";
});

//Cart container remover

const cancelBtn = document.querySelector(".cancel-button");

const newcartDisplay = cancelBtn.parentElement;

cancelBtn.addEventListener("click", function () {
  newcartDisplay.style.display = "none";
});

//Cart total update

function updateCartTotal() {
  const cartList = document.querySelector(".all-out-cart-display");

  const cartDetails = cartList.querySelectorAll(".cart-details");

  Itemtotal = 0;

  //Looping through cart details variable

  for (i = 0; i < cartDetails.length; i++) {
    const cartDetail = cartDetails[i];

    const priceElement = cartDetail.querySelector(".cart-product-price");

    const quantityElement = cartDetail.querySelector(".cart-quantity-display");

    console.log(quantityElement);

    let price = priceElement.innerHTML.replace(`₦`, ``);

    let quantity = quantityElement.value;

    Itemtotal = Itemtotal + price * quantity;
  }

  Itemtotal = Itemtotal.toFixed(2);

  const cartValue = document.querySelector(".cart-value");

  cartValue.innerHTML = `&#x20A6; ${Itemtotal}`;
}

//Cart notification update

function showTotal() {
  const total = [];

  const items = document.querySelectorAll(".cart-details");

  items.forEach(function (item) {
    total.push(item);
  });

  const itemNotificationCounter = document.getElementById("item-accumulation");

  itemNotificationCounter.innerHTML = total.length;
}

//cart item remove button

const removeBtn = document.querySelectorAll(".remove-btn");

removeBtn.forEach(function (clickedRemovedBtn) {
  clickedRemovedBtn.addEventListener("click", removeCartItem);
});

//cart quantity updatees

const quantityInputs = document.querySelectorAll(".cart-quantity-display");

for (i = 0; i < quantityInputs.length; i++) {
  const input = quantityInputs[i];

  input.addEventListener("change", quantityChanged);
}

//Add to cart functionality.

const addTocartButtons = document.querySelectorAll(".cart-icon");

for (i = 0; i < addTocartButtons.length; i++) {
  const addToCartButton = addTocartButtons[i];

  addToCartButton.addEventListener("click", addToCartClicked);
}

const purchaseBtn = document.querySelector(".btn-purchase");



// Clear Cart Items

function clearCart(){

  const cartDetails = document.querySelector(".all-out-cart-display");

  while (cartDetails.hasChildNodes()) {

    cartDetails.removeChild(cartDetails.firstChild);

  }
  updateCartTotal();

  showTotal();
  
}

const clearBtn = document.querySelector('.clear-btn')

console.log(clearBtn)

clearBtn.addEventListener('click', clearCart)

//Show payment details Pop-up

const paymentContainer = document.getElementById('paystack-payment-form')

function removePayment(){

  paymentContainer.remove()

}
const itemAmount =  document.getElementById("amount")

const purchasBtn = document.querySelector('.btn-purchase')


purchaseBtn.addEventListener("click", function () {

  updateCartTotal();

  let amountPrice = document.querySelector("#amount");

  amountPrice.value = `${Itemtotal}`;

  if(Itemtotal == 0){

    alert('There are no items on your cart list...')
  
  }

  else{

    paymentContainer.style.display = "block";

  }

 
});

// Actual Paystack payment 

const paymentForm = document.getElementById('paymentForm');

paymentForm.addEventListener("submit", payWithPaystack, false);

function payWithPaystack(e) {
 
  e.preventDefault();

  let handler = PaystackPop.setup({

    key: testKey, // Replace with your public key

    email: document.getElementById("email-address").value,

    amount: document.getElementById("amount").value * 100,

    ref: ''+Math.floor((Math.random() * 1000000000) + 1), 

    onClose: function(){

      alert('Window closed.');

    },

    callback: function(response){

      let message = 'Payment complete! Reference: ' + response.reference;

      alert(message);

    }
  });

  handler.openIframe();

  removePayment()

  clearCart()


}

const formRemove = document.querySelector('.form-remove')

formRemove.addEventListener('click', function(){

  paymentContainer.style.display = 'none'
  
})


//Function for remove button

function removeCartItem(e) {
  const clickedRemovedBtn = e.target;

  clickedRemovedBtn.parentElement.parentElement.remove();

  updateCartTotal();

  showTotal();
}

// Ensure negative or zero values return to one

function quantityChanged(e) {
  const input = e.target;

  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }

  updateCartTotal();
}

//Function for add to cart

function addToCartClicked(e) {

  const button = e.target;

  const shopItem = button.parentElement.parentElement;

  const title = shopItem.querySelector(".product-name").innerHTML;

  const productPrice = shopItem.querySelector(".cart-price-item").innerHTML;

  const productImage = shopItem.querySelector(".image-source").src;

  addItemToCart(title, productPrice, productImage);

  updateCartTotal();
}

//Add Item to cart function.

function addItemToCart(title, productPrice, productImage) {

  const cartCreate = document.createElement("div");

  const cartItems = document.querySelector(".all-out-cart-display");

  const total = document.querySelector(".cart-total");

  const cartItemNames = cartItems.querySelectorAll(".cart-item-title");

  for (i = 0; i < cartItemNames.length; i++) {

    const cartItemName = cartItemNames[i];

    if (cartItemName.innerHTML === title) {

      alert("Item already added to cart");

      return;
    }
  }

  cartCreate.classList.add("cart-detail");

  const cartRowContents = `<div class="cart-details">

    <div class="cart-item cart-column">

        <img class="cart-item-image" src="${productImage}" width="100" height="100">
        
    </div>

    <span class="cart-item-title">${title}</span>

    <span class="cart-product-price cart-column">${productPrice} </span>

    <div class="cart-quantity cart-column">

        <input class="cart-quantity-display" type="number" value="1">

        <button class="remove-btn" type="button">DELETE</button>

    </div>

</div>`;

  cartCreate.innerHTML = cartRowContents;

  cartItems.append(cartCreate);

  const newRemoveBtn = cartCreate.querySelector(".remove-btn");

  newRemoveBtn.addEventListener("click", removeCartItem);

  const newQuantityDisplay = cartCreate.querySelector(".cart-quantity-display");

  newQuantityDisplay.addEventListener("change", quantityChanged);

  alert("item added to cart");

  updateCartTotal();

  showTotal();
}

//Menu Icon toggle for smaller screen sizes.

let navbar = document.querySelector(".navbar");

const menuIcon = document.querySelector("#menu-icon");

menuIcon.addEventListener("click", function () {

  navbar.classList.toggle("active");

});

// Search filter bar

const searchBar = document.querySelector(".search-bar");

searchBar.addEventListener("input", searchFilter);

function searchFilter() {

  const searchBarInput = document.querySelector(".search-bar");

  const itemFilter = searchBarInput.value.toLowerCase();

  const productItems = document.querySelectorAll(".box");

  for (i = 0; i < productItems.length; i++) {
    const productItem = productItems[i];

    const productName = productItem.querySelector(".product-name");

    let searchText = productName;

    if (searchText.innerHTML.toLowerCase().includes(itemFilter)) {

      productItem.style.display = "block";

    } else {

      productItem.style.display = "none";

    }

  }

}

//Grab Elements Easily.

const selectElement = function (selector) {
  const element = document.querySelector(selector);

  if (element) return element;

  throw new Error(
    "something went wrong, make sure that $(selector) exists or is typed correctly"
  );
};

// Navigation bar scroll background color change.

function headerSwap() {

  const headerElement = selectElement(".header");

  if (this.scrollY >= 700) {

    headerElement.classList.add("active");
    
  } else {

    headerElement.classList.remove("active");

  }

}

window.addEventListener("scroll", headerSwap);

// Back To Top scroll Icon appear and disappear feature.

function backToTop() {

  const toTop = selectElement(".to-top");

  if (this.scrollY >= 1000) {

    toTop.classList.add("activated");

  } else {

    toTop.classList.remove("activated");

  }

}

window.addEventListener("scroll", backToTop);

// Target filter button background color highlight.

const colorFlipperBtns = document.querySelectorAll(".btn-1");

const newArrivalsSection = document.querySelector(".new-arrivals");

newArrivalsSection.addEventListener("click", function (e) {
  const id = e.target.dataset.id;

  if (id) {
    colorFlipperBtns.forEach(function (btn) {

      btn.classList.remove("active");

      e.target.classList.add("active");

    });

  }

});

// New arrivals filter section

const newProducts = [
  {
    id: 1,
    image: "NEW-ARRIVALS/product-3.jpg",
    product_name: "Designer Top",
    price: 14,
    Arrival: "last 10 mins",
  },

  {
    id: 2,
    image: "NEW-ARRIVALS/image5.png",
    product_name: "Wrist Watch",
    price: 27,
    Arrival: "last 24 hours",
  },

  {
    id: 3,
    image: "NEW-ARRIVALS/new-arrival-4.jpg",
    product_name: "Nike Air Max",
    price: 22,
    Arrival: "last 24 hours",
  },
  {
    id: 4,
    image: "NEW-ARRIVALS/new-arrival.jpg",
    product_name: "Gentle Man Brogues",
    price: 23.95,
    Arrival: "last 24 hours",
  },
  {
    id: 5,
    image: "NEW-ARRIVALS/Popular products 4.png",
    product_name: "Necklace Jewellry",
    price: 19,
    Arrival: "last week",
  },
  {
    id: 6,
    image: "NEW-ARRIVALS/new-arrival-2.jpg",
    product_name: "Addidas Crocks",
    price: 27,
    Arrival: "last week",
  },
];

const arrivalContainer = document.querySelector(".new-products-description");

//Display item function

function firstDisplay(menuItems) {

  let productContainer = document.getElementById("some-other-product-stuff");

  displayMenu = menuItems.map(function (itemContainer) {

    return ` <div class="new-products-description">

        <img src="${itemContainer.image}" alt="" class="new-product-img">

        <h2 class="new-arrival-name">${itemContainer.product_name}</h2>

        <div class="new-product-price">

            <span>$${itemContainer.price}</span>

        </div>

        <div class="arrival-text">

            <h5>${itemContainer.Arrival}</h5>

        </div>
        
    </div>`;
  });

  displayMenu = displayMenu.join("");

  productContainer.innerHTML = displayMenu;
}

//Menu items first display

window.addEventListener("DOMContentLoaded", function () {

  return firstDisplay(newProducts);

});

//Filter buttons functionality

const filterBtns = document.querySelectorAll(".btn-1");

filterBtns.forEach(function (btn) {

  btn.addEventListener("click", function (e) {

    clickedBtn = e.currentTarget.dataset.id;

    const menuCategory = newProducts.filter(function (eachItem) {

      if (eachItem.Arrival === clickedBtn) {

        return eachItem;

      }

    });

    if (clickedBtn === "all") {

      firstDisplay(newProducts);

    } else {

      firstDisplay(menuCategory);

    }

  });

});

// Frequently asked questions functionality.

const questions = document.querySelectorAll(".question-container-Wrapper");

questions.forEach(function (question) {

  let text = question.querySelector(".question-text-container");

  const btn = question.querySelector(".button-container");

  const downBtn = question.querySelector(".down-btn");

  const upBtn = question.querySelector(".up-btn");

  btn.addEventListener("click", function () {
    text.classList.toggle("show-questions");

    downBtn.classList.toggle("show-questions");

    upBtn.classList.toggle("show-questions");
  });
});

//About section for carousel.

const slides = document.querySelectorAll(".slide");

const prevBtn = document.querySelector(".prev");

const nextBtn = document.querySelector(".next");

counter = 0;

slides.forEach(function (slide, index) {

  slide.style.left = `${index * 100}%`;

});

function carousel() {

  if (counter === slides.length) {

    counter = 0;

  }

  if (counter < 0) {

    counter = slides.length - 1;
  }

  slides.forEach(function (slide) {

    slide.style.transform = `translateX(-${counter * 100}%)`;
    
  });
}
// Buttons functionality

nextBtn.addEventListener("click", function () {
  counter++;

  carousel();
});
prevBtn.addEventListener("click", function () {
  counter--;

  carousel();
});
