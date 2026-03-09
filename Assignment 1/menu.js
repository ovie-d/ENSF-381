let cart = {};

function addToCart(name, price) {

    if (!cart[name]) {
        cart[name] = { quantity: 0, price: price };
    }

    cart[name].quantity++;

    updateCart();
}

function removeFromCart(name) {

    if (cart[name]) {

        cart[name].quantity--;

        if (cart[name].quantity <= 0) {
            delete cart[name];
        }
    }

    updateCart();
}

function updateCart() {

    const cartDiv = document.getElementById("cart-items");

    cartDiv.innerHTML = "";

    const items = Object.keys(cart);

    if (items.length === 0) {
        cartDiv.innerHTML = "<p>No items in cart.</p>";
        return;
    }

    items.forEach(item => {

        let quantity = cart[item].quantity;
        let price = cart[item].price;

        let total = (quantity * price).toFixed(2);

        let line = document.createElement("p");

        line.textContent = item + " (" + quantity + ") - $" + total;

        cartDiv.appendChild(line);
    });
}
