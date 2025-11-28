document.addEventListener('DOMContentLoaded', () => {
    const addProductBtn = document.getElementById('add-product-btn');
    const addProductModal = document.getElementById('add-product-modal');
    const closeBtn = document.querySelector('.close-btn');
    const addProductForm = document.getElementById('add-product-form');
    const productList = document.querySelector('#product-list tbody');

    let products = getProducts();
    displayProducts();

    function getProducts() {
        return JSON.parse(localStorage.getItem('products')) || [];
    }

    function saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }

    function displayProducts() {
        productList.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id}</td>
                <td><img src="${product.image}" alt="${product.name}" width="50"></td>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button class="edit-btn" data-product-id="${product.id}">Edit</button>
                    <button class="delete-btn" data-product-id="${product.id}">Delete</button>
                </td>
            `;
            productList.appendChild(row);
        });

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                deleteProduct(productId);
            });
        });
    }

    function addProduct(name, price, image) {
        const newProduct = {
            id: Date.now().toString(),
            name,
            price,
            image
        };
        products.push(newProduct);
        saveProducts(products);
        displayProducts();
    }

    function deleteProduct(productId) {
        products = products.filter(product => product.id !== productId);
        saveProducts(products);
        displayProducts();
    }

    addProductBtn.addEventListener('click', () => {
        addProductModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        addProductModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === addProductModal) {
            addProductModal.style.display = 'none';
        }
    });

    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productName = document.getElementById('product-name').value;
        const productPrice = parseFloat(document.getElementById('product-price').value);
        const productImage = document.getElementById('product-image').value;
        
        addProduct(productName, productPrice, productImage);

        addProductModal.style.display = 'none';
        addProductForm.reset();
    });

    // --- User Management Functions ---
    const userList = document.querySelector('#user-list tbody');

    let users = getUsersFromLocalStorage();
    displayUsers();

    function getUsersFromLocalStorage() {
        // Exclude the 'products' localStorage item, as this file should only handle users
        const allUsers = JSON.parse(localStorage.getItem('users')) || [];
        return allUsers;
    }

    function saveUsersToLocalStorage(usersArray) {
        localStorage.setItem('users', JSON.stringify(usersArray));
    }

    function displayUsers() {
        userList.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button class="edit-user-btn" data-user-id="${user.id}">Edit</button>
                    <button class="delete-user-btn" data-user-id="${user.id}">Delete</button>
                </td>
            `;
            userList.appendChild(row);
        });

        const deleteUserButtons = document.querySelectorAll('.delete-user-btn');
        deleteUserButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const userId = e.target.dataset.userId;
                deleteUser(userId);
            });
        });
    }

    function deleteUser(userId) {
        users = users.filter(user => user.id !== userId);
        saveUsersToLocalStorage(users);
        displayUsers();
    }
});

