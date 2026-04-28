/* js/cart.js */

const CART_KEY = 'tastebud_cart';

function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartIcon();
}

function addToCart(name, price, image) {
    const cart = getCart();
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price: parseFloat(price), image, quantity: 1 });
    }

    saveCart(cart);
    showToast(`Added ${name} to cart!`);
}

function updateQuantity(name, change) {
    let cart = getCart();
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += change;
        if (existingItem.quantity <= 0) {
            cart = cart.filter(item => item.name !== name);
        }
    }

    saveCart(cart);
    renderCartPage(); // Re-render if we are on the cart page
}

function removeFromCart(name) {
    let cart = getCart();
    cart = cart.filter(item => item.name !== name);
    saveCart(cart);
    renderCartPage();
}

function updateCartIcon() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartLink = document.getElementById('open-cart');
    if (cartLink) {
        if (totalItems > 0) {
            cartLink.innerHTML = `My Cart <span class="badge bg-danger rounded-pill">${totalItems}</span>`;
        } else {
            cartLink.innerHTML = `My Cart`;
        }
    }
}

function showToast(message) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'bg-success text-white px-4 py-3 shadow';
    toast.style.cssText = 'transition: opacity 0.5s ease; opacity: 1; border-radius: 8px; font-weight: 500; font-family: "Poppins", sans-serif;';
    toast.innerHTML = `<div class="d-flex align-items-center">
        <span class="me-2 fw-bold">&#10003;</span> ${message}
    </div>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function renderCartPage() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const orderSummaryContainer = document.getElementById('order-summary-container');

    if (!cartItemsContainer || !orderSummaryContainer) return;

    const cart = getCart();

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-5">
                <img src="img/iconlady.jpg" alt="Empty Cart" width="100" class="mb-3 opacity-50" style="filter: grayscale(1);">
                <h4 class="text-muted mt-3">Your cart is empty</h4>
                <p class="text-muted mb-4">Looks like you haven't added anything to your cart yet.</p>
                <button class="btn btn-outline-danger px-4 py-2" style="font-weight: bold; border-radius: 8px;" onclick="window.location.href='menu.html'">Browse Menu</button>
            </div>
        `;
        orderSummaryContainer.style.display = 'none';
        return;
    }

    orderSummaryContainer.style.display = 'block';

    let itemsHtml = '<ul class="list-group mb-3">';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        itemsHtml += `
            <li class="list-group-item d-flex justify-content-between lh-sm align-items-center py-3 border-0 border-bottom">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px;" class="me-3 shadow-sm">
                    <div>
                        <h6 class="my-0 fw-bold" style="font-size: 1.1rem;">${item.name}</h6>
                        <small class="text-muted d-block mt-1">₹${item.price.toFixed(2)}</small>
                    </div>
                </div>
                <div class="text-end d-flex align-items-center">
                    <div class="btn-group me-3 shadow-sm" role="group">
                        <button type="button" class="btn btn-sm btn-outline-secondary px-2" style="font-weight: bold;" onclick="updateQuantity('${item.name}', -1)">-</button>
                        <button type="button" class="btn btn-sm btn-light px-3 fw-bold" disabled>${item.quantity}</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary px-2" style="font-weight: bold;" onclick="updateQuantity('${item.name}', 1)">+</button>
                    </div>
                    <span class="text-muted ms-2 fw-bold" style="width: 70px; font-size: 1.1rem;">₹${itemTotal.toFixed(2)}</span>
                    <button class="btn btn-sm text-danger ms-2 bg-light border-0" style="border-radius: 50%; width: 32px; height: 32px;" onclick="removeFromCart('${item.name}')" title="Remove item">&times;</button>
                </div>
            </li>
        `;
    });
    itemsHtml += '</ul>';
    cartItemsContainer.innerHTML = itemsHtml;

    const tax = subtotal * 0.05; // 5% GST
    const delivery = 50;
    const total = subtotal + tax + delivery;

    document.getElementById('cart-subtotal').innerText = `₹${subtotal.toFixed(2)}`;
    document.getElementById('cart-tax').innerText = `₹${tax.toFixed(2)}`;
    document.getElementById('cart-delivery').innerText = `₹${delivery.toFixed(2)}`;
    document.getElementById('cart-total').innerText = `₹${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", function () {
    updateCartIcon();
    renderCartPage();

    // Attach event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        // override inline onclick gracefully
        button.removeAttribute('onclick');

        button.addEventListener('click', function (e) {
            e.preventDefault();
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            // get closest image inside the card
            const cardEl = this.closest('.menu-card');
            const imgEl = cardEl ? cardEl.querySelector('.menu-card-img') : null;
            const image = imgEl ? imgEl.src : 'img/iconlady.jpg';

            addToCart(name, price, image);
        });
    });
});
