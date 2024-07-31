document.addEventListener('DOMContentLoaded', () => {
    // Display stored product information
    const storedProductInfo = localStorage.getItem('productInfo');
    const display = document.getElementById('displayProductInfo');

    if (storedProductInfo) {
        const products = JSON.parse(storedProductInfo);
        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
        `;

        products.forEach(product => {
            tableHTML += `
                <tr>
                    <td><img src="${product.imageSrc}" alt="${product.name}" style="width: 50px; height: 50px;"></td>
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td>${product.subtotal}</td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        display.innerHTML = tableHTML;
    } else {
        display.innerHTML = 'No product information available.';
    }

    // Show card details only if payment method is credit or debit card
    const paymentSelect = document.getElementById('payment');
    const cardDetails = document.getElementById('cardDetails');
    paymentSelect.addEventListener('change', function() {
        if (this.value === 'credit' || this.value === 'debit') {
            cardDetails.classList.remove('hidden');
        } else {
            cardDetails.classList.add('hidden');
        }
    });
    // Display thank you message on form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        displayThankingMessage();
    });
});

function calculateDeliveryDate() {
    const today = new Date();
    today.setDate(today.getDate() + 4); // Add 4 days
    return today.toDateString();
}

function displayThankingMessage() {
    const deliveryDate = calculateDeliveryDate();
    const thankingMessage = document.getElementById('message');
    thankingMessage.innerText = `Thank you for your order! Your estimated delivery date is ${deliveryDate}.`;
    thankingMessage.style.display = 'block';
}
