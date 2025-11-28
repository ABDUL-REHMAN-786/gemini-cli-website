document.addEventListener('DOMContentLoaded', () => {
    // Initialize default products if none exist
    if (!localStorage.getItem('products') || JSON.parse(localStorage.getItem('products')).length === 0) {
        const defaultProducts = [
            { id: '1', name: 'Elegant Watch', price: 199.99, image: 'https://picsum.photos/250/250?random=1', description: 'A sleek and stylish watch for everyday wear.' },
            { id: '2', name: 'Premium Headphones', price: 149.99, image: 'https://picsum.photos/250/250?random=2', description: 'Immersive sound experience with noise-cancelling technology.' },
            { id: '3', name: 'Designer Handbag', price: 249.99, image: 'https://picsum.photos/250/250?random=3', description: 'Fashionable and spacious, perfect for any occasion.' },
            { id: '4', name: 'Smart Fitness Tracker', price: 79.99, image: 'https://picsum.photos/250/250?random=4', description: 'Monitor your health and achieve your fitness goals.' },
            { id: '5', name: 'Luxury Coffee Machine', price: 399.99, image: 'https://picsum.photos/250/250?random=5', description: 'Brew barista-quality coffee at home with ease.' },
            { id: '6', name: 'Wireless Ergonomic Mouse', price: 35.00, image: 'https://picsum.photos/250/250?random=6', description: 'Comfortable and precise for long hours of work.' },
            { id: '7', name: 'Portable Bluetooth Speaker', price: 59.99, image: 'https://picsum.photos/250/250?random=7', description: 'High-quality audio on the go, with long-lasting battery.' },
            { id: '8', name: 'Travel Backpack', price: 89.99, image: 'https://picsum.photos/250/250?random=8', description: 'Durable and spacious, ideal for your next adventure.' },
            { id: '9', name: 'Instant Camera', price: 110.00, image: 'https://picsum.photos/250/250?random=9', description: 'Capture and print your favorite moments instantly.' },
            { id: '10', name: 'Gaming Keyboard', price: 120.00, image: 'https://picsum.photos/250/250?random=10', description: 'Responsive keys and customizable RGB lighting for gamers.' },
            { id: '11', name: 'Robot Vacuum Cleaner', price: 299.00, image: 'https://picsum.photos/250/250?random=11', description: 'Effortlessly keep your home clean with smart navigation.' },
            { id: '12', name: 'Electric Toothbrush', price: 65.00, image: 'https://picsum.photos/250/250?random=12', description: 'Achieve a brighter smile with advanced cleaning technology.' },
        ];
        localStorage.setItem('products', JSON.stringify(defaultProducts));
    }

    const cartCount = document.getElementById('cart-count');
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const cartItemsTableBody = document.querySelector('#cart-items tbody');
    const cartTotalPriceSpan = document.getElementById('cart-total-price');
    const productsSection = document.querySelector('.products'); // Where products are displayed on home/products page

    let cart = getCart();
    updateCartCount();

    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function saveCart(currentCart) {
        localStorage.setItem('cart', JSON.stringify(currentCart));
    }

    function updateCartCount() {
        cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    function addToCart(productId, name, price, image) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, name, price, image, quantity: 1 });
        }
        saveCart(cart);
        updateCartCount();
    }

    // Function to attach "Add to Cart" event listeners
    function attachAddToCartListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            // Remove existing listener to prevent duplicates when products are re-rendered
            button.removeEventListener('click', handleAddToCartClick);
            button.addEventListener('click', handleAddToCartClick);
        });
    }

    function handleAddToCartClick(e) {
        const productCard = e.target.closest('.product-card');
        const productId = e.target.dataset.productId;
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));
        const productImage = productCard.querySelector('img').src;
        addToCart(productId, productName, productPrice, productImage);
    }

    function getProductsFromLocalStorage() {
        return JSON.parse(localStorage.getItem('products')) || [];
    }

    function displayProductsOnPage(targetSection, productsToDisplay) {
        if (!targetSection) return;

        targetSection.innerHTML = ''; // Clear existing products
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card', 'fade-in');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            `;
            targetSection.appendChild(productCard);
        });

        // Re-attach event listeners for newly added "Add to Cart" buttons
        attachAddToCartListeners();
    }

    // --- User Management Functions (Client-side simulation) ---
    function getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // --- Page Specific Logic ---
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            const users = getUsers();

            // Basic validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            if (users.some(user => user.username === username)) {
                alert('Username already taken!');
                return;
            }
            if (users.some(user => user.email === email)) {
                alert('Email already registered!');
                return;
            }

            const newUser = {
                id: Date.now().toString(),
                username,
                email,
                password, // In a real app, hash and salt this!
                role: 'user' // Default role
            };

            users.push(newUser);
            saveUsers(users);
            alert('Registration successful! Please log in.');
            window.location.href = 'login.html'; // Redirect to login page
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameOrEmail = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const users = getUsers();
            const foundUser = users.find(user => 
                (user.username === usernameOrEmail || user.email === usernameOrEmail) && user.password === password
            );

            if (foundUser) {
                sessionStorage.setItem('loggedInUser', JSON.stringify(foundUser)); // Simulate session
                alert('Login successful!');
                if (foundUser.role === 'admin') {
                    window.location.href = 'admin.html'; // Redirect to admin dashboard
                } else {
                    window.location.href = 'index.html'; // Redirect to home page
                }
            } else {
                alert('Invalid username/email or password.');
            }
        });
    }

    // --- Session Management Functions ---
    function getLoggedInUser() {
        return JSON.parse(sessionStorage.getItem('loggedInUser'));
    }

    function logoutUser() {
        sessionStorage.removeItem('loggedInUser');
        alert('Logged out successfully!');
        window.location.href = 'index.html'; // Redirect to home page
    }

    // Function to update navigation links based on login status and role
    function updateNavigation() {
        const loggedInUser = getLoggedInUser();
        const navLinks = document.querySelector('.nav-links');
        const cartDiv = document.querySelector('.cart');
        
        if (!navLinks || !cartDiv) return;

        // Clear existing dynamic links (if any)
        const oldAuthLinks = navLinks.querySelectorAll('.auth-link');
        oldAuthLinks.forEach(link => link.remove());

        const adminLink = navLinks.querySelector('.admin-link');
        if (adminLink) adminLink.remove();


        if (loggedInUser) {
            // Logged in: show logout, maybe profile
            const logoutLi = document.createElement('li');
            const logoutA = document.createElement('a');
            logoutA.href = '#';
            logoutA.textContent = `Logout (${loggedInUser.username})`;
            logoutA.classList.add('auth-link');
            logoutA.addEventListener('click', (e) => {
                e.preventDefault();
                logoutUser();
            });
            logoutLi.appendChild(logoutA);
            navLinks.appendChild(logoutLi);

            if (loggedInUser.role === 'admin') {
                const adminLi = document.createElement('li');
                const adminA = document.createElement('a');
                adminA.href = 'admin.html';
                adminA.textContent = 'Admin Dashboard';
                adminA.classList.add('admin-link');
                adminLi.appendChild(adminA);
                navLinks.appendChild(adminLi);
            }
            cartDiv.style.display = 'block'; // Ensure cart is visible for logged-in users
        } else {
            // Not logged in: show signup, login
            const signupLi = document.createElement('li');
            const signupA = document.createElement('a');
            signupA.href = 'signup.html';
            signupA.textContent = 'Sign Up';
            signupA.classList.add('auth-link');
            signupLi.appendChild(signupA);
            navLinks.appendChild(signupLi);

            const loginLi = document.createElement('li');
            const loginA = document.createElement('a');
            loginA.href = 'login.html';
            loginA.textContent = 'Login';
            loginA.classList.add('auth-link');
            loginLi.appendChild(loginA);
            navLinks.appendChild(loginLi);
            cartDiv.style.display = 'block'; // Ensure cart is visible for guest users as well
        }
    }

    // Initial navigation update on page load
    updateNavigation();




    // For Home page and Products page: dynamically load products
    if (productsSection && (window.location.pathname.includes('index.html') || window.location.pathname.includes('home.html') || window.location.pathname.includes('products.html'))) {
        const products = getProductsFromLocalStorage();
        displayProductsOnPage(productsSection, products);
    }

    // For Contact form page
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            successMessage.style.display = 'block';
            contactForm.reset();
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        });
    }

    // For Cart page
    if (cartItemsTableBody && cartTotalPriceSpan) {
        displayCartItems();
    }

    function displayCartItems() {
        cartItemsTableBody.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" width="50"> ${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><input type="number" class="item-quantity" value="${item.quantity}" data-product-id="${item.id}" min="1"></td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="remove-item" data-product-id="${item.id}">Remove</button></td>
            `;
            cartItemsTableBody.appendChild(row);
        });

        cartTotalPriceSpan.textContent = `$${totalPrice.toFixed(2)}`;

        const quantityInputs = document.querySelectorAll('.item-quantity');
        quantityInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = e.target.dataset.productId;
                const newQuantity = parseInt(e.target.value);
                if (newQuantity > 0) {
                    updateQuantity(productId, newQuantity);
                }
            });
        });

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                removeItem(productId);
            });
        });
    }

    function updateQuantity(productId, quantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            saveCart(cart);
            updateCartCount();
            displayCartItems(); // Re-render cart items
        }
    }

    function removeItem(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart(cart);
        updateCartCount();
        displayCartItems(); // Re-render cart items
    }

    // Intersection Observer for fade-in animations
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Optional: remove 'visible' class if element scrolls out of view
                // entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // --- Mobile Menu Toggle Logic ---
    const burgerMenuToggle = document.querySelector('.burger-menu-toggle');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');

    if (burgerMenuToggle && mobileMenuContainer) {
        burgerMenuToggle.addEventListener('click', () => {
            mobileMenuContainer.classList.toggle('open');
            // Optional: Toggle an 'active' class on the burger icon for animation
            burgerMenuToggle.classList.toggle('active'); 
            updateNavigation(); // Update navigation when menu opens/closes
        });

        // Close menu when clicking outside or on a link
        mobileMenuContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' || e.target === mobileMenuContainer) {
                mobileMenuContainer.classList.remove('open');
                burgerMenuToggle.classList.remove('active');
            }
        });
    }
});