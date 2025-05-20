// Sample product data
const products = [
    { id: 1, name: 'Laptop Pro X1', price: 1299.99, category: 'Electronics', stock: 15 },
    { id: 2, name: 'Wireless Mouse', price: 29.99, category: 'Accessories', stock: 50 },
    { id: 3, name: '4K Monitor', price: 499.99, category: 'Electronics', stock: 10 },
    { id: 4, name: 'Mechanical Keyboard', price: 149.99, category: 'Accessories', stock: 25 },
    { id: 5, name: 'Gaming Headset', price: 89.99, category: 'Audio', stock: 30 },
    { id: 6, name: 'USB-C Hub', price: 39.99, category: 'Accessories', stock: 40 },
    { id: 7, name: 'External SSD 1TB', price: 199.99, category: 'Storage', stock: 20 },
    { id: 8, name: 'Webcam HD', price: 79.99, category: 'Electronics', stock: 15 }
];

// Make functions globally accessible
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (product && product.stock > 0) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity++;
            } else {
                alert('Maximum stock limit reached!');
                return;
            }
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
    }
};

window.updateQuantity = function(index, newQuantity) {
    const item = cart[index];
    if (newQuantity > 0 && newQuantity <= item.stock) {
        item.quantity = newQuantity;
        updateCartDisplay();
    } else if (newQuantity === 0) {
        removeFromCart(index);
    }
};

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartDisplay();
};

// Cart state
let cart = [];

// DOM Elements
const loginForm = document.getElementById('login-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');
const cartItems = document.getElementById('cart-items');
const totalAmount = document.getElementById('total-amount');
const checkoutBtn = document.getElementById('checkout-btn');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize the page
function initializePage() {
    // Display all products initially
    displaySearchResults(products);
    
    // Set up event listeners
    setupEventListeners();
    
    // Handle initial navigation
    handleNavigation();
}

function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.dataset.section;
            navigateToSection(section);
        });
    });

    // Handle hash changes
    window.addEventListener('hashchange', handleNavigation);

    // Login form handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username && password) {
            alert('Login successful!');
            loginForm.reset();
        } else {
            alert('Please fill in all fields');
        }
    });

    // Search functionality
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        
        displaySearchResults(filteredProducts);
    });

    // Checkout functionality
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // Update stock levels
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product) {
                product.stock -= item.quantity;
            }
        });
        
        alert('Checkout successful! Thank you for your purchase.');
        cart = [];
        updateCartDisplay();
        
        // Refresh search results if any are displayed
        if (searchInput.value) {
            searchBtn.click();
        } else {
            displaySearchResults(products);
        }
    });
}

function handleNavigation() {
    const hash = window.location.hash.slice(1) || 'home';
    navigateToSection(hash);
}

function navigateToSection(section) {
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === section);
    });

    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Update URL hash
    window.location.hash = section;
}

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p>No products found</p>';
        return;
    }
    
    results.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="category">${product.category}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="stock">In Stock: ${product.stock}</p>
            </div>
            <button onclick="addToCart(${product.id})" class="btn" ${product.stock === 0 ? 'disabled' : ''}>
                ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
        `;
        searchResults.appendChild(productElement);
    });
}

function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price.toFixed(2)}</span>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity(${index}, ${item.quantity - 1})" class="btn-quantity">-</button>
                <span class="quantity">${item.quantity}</span>
                <button onclick="updateQuantity(${index}, ${item.quantity + 1})" class="btn-quantity" ${item.quantity >= item.stock ? 'disabled' : ''}>+</button>
                <button onclick="removeFromCart(${index})" class="btn-remove">Remove</button>
            </div>
            <div class="item-total">$${itemTotal.toFixed(2)}</div>
        `;
        cartItems.appendChild(itemElement);
    });
    
    totalAmount.textContent = total.toFixed(2);
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage); 