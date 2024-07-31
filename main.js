// Wait until the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {

    // Select all buttons with the class 'btn' and add a click event listener to each
    const addButtons = document.querySelectorAll('.btn');
    addButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Get the product ID from the data attribute of the button that was clicked
            const productId = event.target.getAttribute('data-product-id');
            addItemToOrder(productId); // Call the function to add the item to the order
        });
    });

    // Add event listeners for saving, loading, and clearing favorites
    document.getElementById('saveToFavorites').addEventListener('click', saveToFavorites);
    document.getElementById('loadFavorites').addEventListener('click', loadFavorites);
    document.getElementById('clearFavorites').addEventListener('click', clearFavorites);
});

// Function to add an item to the order table
function addItemToOrder(productId) {
    // Get the product element using the product ID
    const productElement = document.getElementById(productId);
    // Extract the product name, price, image source, and quantity
    const name = productElement.querySelector('.product-name').innerText;
    const priceText = productElement.querySelector('.product-price').innerText;
    const imageSrc = productElement.querySelector('.product-image').src;
    const quantityInput = productElement.querySelector('.input');
    const quantity = parseInt(quantityInput.value); // Convert quantity to an integer

    // Check if quantity is greater than 0 before adding to the order
    if (quantity > 0) {
        // Extract the price and calculate the subtotal
        const price = parseInt(priceText.replace('Rs.', ''));
        const subtotal = quantity * price;

        // Get the order table body to append the new row
        const orderTableBody = document.getElementById('orders').querySelector('tbody');
        const newRow = document.createElement('tr'); // Create a new row

        // Populate the new row with product details
        newRow.innerHTML = `
            <td><img src="${imageSrc}" alt="${name}" style="width: 50px; height: 50px; margin-right:300px;">${name}</td>
            <td>${quantity}</td>
            <td>${subtotal}</td>
            <td><button class="remove-item"><i class="fas fa-trash"></i></button></td>
        `;

        // Add a click event listener to the remove button in the new row
        newRow.querySelector('.remove-item').addEventListener('click', () => {
            newRow.remove(); // Remove the row from the table
            updateTotal(); // Update the total price
        });

        // Append the new row to the order table
        orderTableBody.appendChild(newRow);
        updateTotal(); // Update the total price
    }
}

// Function to update the total price displayed
function updateTotal() {
    const totalPriceElement = document.getElementById('totalPrice');
    const rows = document.getElementById('orders').querySelector('tbody').querySelectorAll('tr');
    let total = 0;

    // Loop through each row to calculate the total price
    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const subtotal = parseInt(cells[2].innerText);
        total += subtotal; // Add the subtotal to the total
    });

    // Display the total price
    totalPriceElement.innerText = total;
}

// Function to reset the order table and total price
function resetOrder() {
    document.getElementById('orders').querySelector('tbody').innerHTML = ''; // Clear the table
    document.getElementById('totalPrice').innerText = '0'; // Reset the total price
}



document.getElementById('buyNowButton').addEventListener('click', () => {
    // Get all the rows in the order table
    const rows = document.getElementById('orders').querySelector('tbody').querySelectorAll('tr');
    let products = [];

    // Loop through each row and store the product details
    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const imageSrc = cells[0].querySelector('img').src;
        const name = cells[0].textContent.trim();
        const quantity = parseInt(cells[1].innerText);
        const subtotal = parseInt(cells[2].innerText);

        // Push the item details into the products array
        products.push({ imageSrc, name, quantity, subtotal });
    });

    // Save the products array to localStorage
    localStorage.setItem('productInfo', JSON.stringify(products));

    // Redirect to the checkout page
    window.location.href = 'checkout.html';
});




// Function to save the current order to local storage as favorites
document.getElementById('saveToFavorites').addEventListener('click', function() {
    const orderTableBody = document.getElementById('orders').querySelector('tbody');
    const rows = orderTableBody.querySelectorAll('tr');
    let favorites = [];

    // Loop through each row and store the item details in the favorites array
    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const imageSrc = cells[0].querySelector('img').src;
        const name = cells[0].textContent.trim();
        const quantity = parseInt(cells[1].innerText);
        const subtotal = parseInt(cells[2].innerText);

        // Push the item details into the favorites array
        favorites.push({ imageSrc, name, quantity, subtotal });
    });

    // Save the favorites array to local storage
    localStorage.setItem('favorites', JSON.stringify(favorites));
});

// Function to load the favorites from local storage and display them in the order table
document.getElementById('loadFavorites').addEventListener('click', function() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const orderTableBody = document.getElementById('orders').querySelector('tbody');
    orderTableBody.innerHTML = ''; // Clear current table

    // Check if there are any favorites saved
    if (favorites.length > 0) {
        // Loop through each favorite item and create a new row in the order table
        favorites.forEach(item => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><img src="${item.imageSrc}" alt="${item.name}" style="width: 50px; height: 50px; margin-right:350px;">${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.subtotal}</td>
                <td><button class="remove-item"><i class="fas fa-trash"></i></button></td>
            `;

            // Add event listener for the remove button to delete the row
            newRow.querySelector('.remove-item').addEventListener('click', () => {
                newRow.remove(); // Remove the row from the table
                updateTotal(); // Update the total price
            });

            // Append the new row to the order table
            orderTableBody.appendChild(newRow);
        });

        updateTotal(); // Update the total price
    }
});

// Function to clear the favorites from local storage and the order table
document.getElementById('clearFavorites').addEventListener('click', function() {
    localStorage.removeItem('favorites'); // Remove the favorites from local storage
    
    // Clear the displayed items in the order table
    const orderTableBody = document.getElementById('orders').querySelector('tbody');
    orderTableBody.innerHTML = ''; // Clear current table
    
    // Reset the total price
    document.getElementById('totalPrice').innerText = '0';
});
