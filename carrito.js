// document.getElementById('formContacto').addEventListener('submit', function(event) {
//   event.preventDefault();

//   let nombre = document.getElementById('nombre').value;
//   let apellido = document.getElementById('apellido').value;
//   let email = document.getElementById('email').value;

//   // Creo el json
//   let formData = {
//     nombre: nombre,
//     apellido: apellido,
//     email: email
//   };

//   // Convierto en string
//   let formDataString = JSON.stringify(formData);

//   // Guardo la info
//   localStorage.setItem('formData', formDataString);


// alert('Formulario enviado. Los datos han sido guardados en el almacenamiento local.');
// });

// Get the elements
const products = document.querySelectorAll('.add-to-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartButton = document.getElementById('clear-cart');
const checkoutButton = document.getElementById('checkout');

// Initialize the cart and total
let cart = [];
let total = 0;

// Function to add a product to the cart
function addToCart(id, price) {
  cart.push({ id, price });
  total += price;
}

// Function to update the cart items and total on the page
function updateCart() {
  // Clear the current items in the cart
  cartItems.innerHTML = '';

  // Loop through the cart and add each item to the cartItems element
  cart.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.innerText = `Product ID: ${item.id} Price: $${item.price.toFixed(2)}`;
    cartItems.appendChild(cartItem);
  });

  // Update the total on the page
  cartTotal.innerText = `$${total.toFixed(2)}`;
}

// Add event listeners for the add to cart buttons
products.forEach((product) => {
  product.addEventListener('click', () => {
    const id = product.dataset.id;
    const price = parseFloat(product.previousElementSibling.innerText.replace('$', ''));
    addToCart(id, price);
    updateCart();
  });
});

// Add event listener for the clear cart button
clearCartButton.addEventListener('click', () => {
  cart = [];
  total = 0;
  updateCart();
});

// Add event listener for the checkout button
checkoutButton.addEventListener('click', () => {
  if (cart.length > 0) {
    // Perform the checkout action
    swal('Success', 'Checkout complete', 'success');
    cart = [];
    total = 0;
    updateCart();
  } else {
    swal('Error', 'There are no items in the cart', 'error');
  }
});