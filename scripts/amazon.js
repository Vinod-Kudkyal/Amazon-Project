let productHtml = ``;

products.forEach((product) => {
  productHtml += `<div class="product-container">
  <div class="product-image-container">
    <img class="product-image"
      src="${product.image}">
  </div>

  <div class="product-name limit-text-to-2-lines">
      ${product.name}
  </div>

  <div class="product-rating-container">
    <img class="product-rating-stars"
      src="images/ratings/rating-${product.rating.stars * 10}.png">
    <div class="product-rating-count link-primary">
      ${product.rating.count}
    </div>
  </div>

  <div class="product-price">
      ${(product.priceCents / 100).toFixed(2)}
  </div>

  <div class="product-quantity-container">
    <select class="js-quantity-selector-${product.id}">
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
  </div>

  <div class="product-spacer"></div>

  <div class="added-to-cart js-added-to-cart-${product.id}">
    <img src="images/icons/checkmark.png">
    Added
  </div>

  <button data-product-id = "${product.id}"
  class="add-to-cart-button button-primary js-add-to-cart">
    Add to Cart
  </button>
</div>`;


})

let grid = document.querySelector(".js-products-grid");

grid.innerHTML = productHtml;


document.querySelectorAll(".js-add-to-cart")

  .forEach((button) => {
    const addedMessageTimeouts = {};
    button.addEventListener("click", () => {

      const { productId } = button.dataset;
      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );

      const quantity = Number(quantitySelector.value);

      let matchingItem;

      cart.forEach((item) => {
        if (item.productId === productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += quantity; // ✅ use selected quantity
      } else {
        cart.push({
          productId,
          quantity
        });
      }

      // Update cart UI
      let totalQuantity = 0;

      cart.forEach((item) => {
        totalQuantity += item.quantity;
      });

      const addedMessage = document.querySelector(
        `.js-added-to-cart-${productId}`
      );

      addedMessage.classList.add("added-visible");

      // Clear previous timeout if exists
      if (addedMessageTimeouts[productId]) {
        clearTimeout(addedMessageTimeouts[productId]);
      }

      // Set new timeout
      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove("added-visible");
      }, 2000);

      // Save timeout
      addedMessageTimeouts[productId] = timeoutId;

      document.querySelector(".js-cart-quantity")
        .innerHTML = totalQuantity;

      console.log(cart);
    });
  });