document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { name: 'Happy Cow Cheese 250g', price: 200 },
        { name: 'Milk 550ml', price: 150 },
        { name: 'Yogurt 500g', price: 100 },
        { name: 'ICE-Cream 1l', price: 250 },
        { name: 'Butter 250g', price: 180 },
        { name: 'Curd 500ml', price: 120 },
        { name: "Grapes 100g", price: 250 },
        { name: "Papaya", price: 250 },
        { name: "Apple Kalakulu 100g", price: 260 },
        { name: "Organic Banana 100g", price: 150 },
        { name: "Avocado 100g", price: 140 },
        { name: "Watermelon 100g", price: 200 },
        { name: "Pumkin 100g", price: 250 },
        { name: "Carrot 100g", price: 100 },
        { name: "Cabbage 100g", price: 130 },
        { name: "Sweet Potato 100g", price: 150 },
        { name: "Red Onions 100g", price: 140 },
        { name: "Brocoil 100g", price: 150 },
        { name: "Beef 100g", price: 250 },
        { name: "Tuna Fish 100g", price: 400 },
        { name: "Chicken 100g", price: 130 },
        { name: "Crabs 100g", price: 550 },
        { name: "Prawns 100g", price: 190 },
        { name: "Cuttle Fish 100g", price: 150 },
        { name: "King Flour 1kg", price: 900 },
        { name: "Bread Flour 600g", price: 700 },
        { name: "Cake Flour", price: 130 },
        { name: "Pizza Flour 700g", price: 550 },
        { name: "Extra Virgin Olive Oil 250ml", price: 3000 },
        { name: "Vanilla Essence 50ml", price: 300 }
      
    ];

    function updateOrder(index) {
        const quantityInput = document.getElementsByClassName('input')[index];
        const quantity = parseInt(quantityInput.value);
        let productName = products[index].name;
        let subtotal = quantity * products[index].price;

        if (quantity > 0) {
            const ordersTable = document.getElementById('orders');
            const newRow = ordersTable.insertRow();
            const msg = [productName, quantity, subtotal];

            msg.forEach(text => {
                const newCell = newRow.insertCell();
                newCell.innerHTML = text;
            });

            updateTotalPrice(subtotal);
        }
    }

    function updateTotalPrice(subtotal) {
        let totalPrice = document.getElementById('totalPrice');
        let currentTotal = parseInt(totalPrice.innerText);
        totalPrice.innerText = currentTotal + subtotal;
    }
    const buttons = document.getElementsByClassName('btn');
    Array.from(buttons).forEach((button, index) => {
        button.addEventListener('click', function() {
            updateOrder(index);
        });
    });

    document.getElementById('reset').addEventListener('click', function() {
        document.getElementById('orders').innerHTML = '';
        document.getElementById('totalPrice').innerText = '0';
    });
});








/*let quantityInputs = document.querySelectorAll('.input');
let ordersTable = document.getElementById('orders');
let totalPrice = document.getElementById('totalPrice');

               quantityInputs.forEach(function(input, index) {
                input.addEventListener('input', function() {
                    updateOrder(index, parseInt(input.value));
                });
            });

            function updateOrder(index, quantity) {
                let productName = products[index].name;
                let subtotal = quantity * products[index].price;
            

                
                let existingRow = ordersTable.querySelector(`tr[data-index="${index}"]`);
                
                if (quantity > 0) {
                    if (existingRow) {
                        existingRow.querySelector('.quantity').textContent = quantity;
                        existingRow.querySelector('.subtotal').textContent = subtotal;
                    } else {
                        var row = document.createElement('tr');
                        row.setAttribute('data-index', index);
                        row.innerHTML = `
                            <td>${productName}</td>
                            <td class="quantity">${quantity}</td>
                            <td class="subtotal">${subtotal}</td>
                        `;
                        ordersTable.appendChild(row);
                    }
                } 

                
                let total = calculateTotal();
                totalPrice.textContent = total;
            }

            function calculateTotal() {
                let total = 0;
                ordersTable.querySelectorAll('tr').forEach(function(row) {
                    let subtotal = parseInt(row.querySelector('.subtotal').textContent);
                    total += subtotal;
                });
                return total;
            }

            
            let resetButton = document.getElementById('reset');
            resetButton.addEventListener('click', function() {
                quantityInputs.forEach(function(input) {
                    input.value = 0;
                });
                ordersTable.innerHTML = '';
                totalPrice.textContent = 0;
            });
        });*/