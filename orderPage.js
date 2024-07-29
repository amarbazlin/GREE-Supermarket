// Wait until the DOM content is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
  // Retrieve stored product information from local storage
  var storedProductInfo = localStorage.getItem('productInfo');
  // Get the HTML element where the product information will be displayed
  var displayElement = document.getElementById('displayProductInfo');
  
  // Check if there is any product information stored
  if (storedProductInfo) {
    // If there is, display it in the designated HTML element
    displayElement.innerHTML = storedProductInfo;
  } else {
    // If not, show a message indicating that no product information is available
    displayElement.innerHTML = 'No product information available.';
  }

  // Get the HTML select element for choosing the payment method
  const paymentSelect = document.getElementById('payment');
  // Get the HTML element that contains card details input fields
  const cardDetails = document.getElementById('cardDetails');
  
  // Add an event listener to the payment method select element
  paymentSelect.addEventListener('change', function() {
    // Check if the selected payment method is 'credit' or 'debit'
    if (this.value === 'credit' || this.value === 'debit') {
      // If so, show the card details input fields
      cardDetails.style.display = 'block';
    } else {
      // Otherwise, hide the card details input fields
      cardDetails.style.display = 'none';
    }
  });

  // Get the HTML form element
  const form = document.querySelector('form');
  
  // Add an event listener to the form submission event
  form.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Call the function to display the thank you message
    displayThankYouMessage();
  });
});

// Function to calculate the estimated delivery date based on the shipping option
function calculateDeliveryDate(shippingOption) {
  // Get the current date
  const today = new Date();
  // Variable to store the calculated delivery date
  let deliveryDate;

  // Determine the delivery date based on the shipping option selected
  switch (shippingOption) {
    case 'normal':
      // For normal shipping, add 7 days to the current date
      deliveryDate = new Date(today.setDate(today.getDate() + 7));
      break;
    case 'fast':
      // For fast shipping, add 5 days to the current date
      deliveryDate = new Date(today.setDate(today.getDate() + 5));
      break;
    case 'express':
      // For express shipping, add 3 days to the current date
      deliveryDate = new Date(today.setDate(today.getDate() + 3));
      break;
    default:
      // If no valid shipping option is selected, use today's date
      deliveryDate = today;
  }

  // Return the delivery date as a human-readable string
  return deliveryDate.toDateString();
}

// Function to display the thank you message with the estimated delivery date
function displayThankYouMessage() {
  // Get the HTML select element for choosing the shipping option
  const shippingSelect = document.getElementById('shipping');
  // Retrieve the selected shipping option value
  const shippingOption = shippingSelect.value;
  // Calculate the estimated delivery date based on the selected shipping option
  const deliveryDate = calculateDeliveryDate(shippingOption);
  // Get the HTML element where the thank you message will be displayed
  const thankYouMessage = document.getElementById('message');

  // Check if a shipping option is selected
  if (shippingOption) {
    // If so, update the thank you message to include the estimated delivery date
    thankYouMessage.innerText = `Thank you for your order! Your payment has been received. Your estimated delivery date is ${deliveryDate}.`;
  } else {
    // If no shipping option is selected, just thank the user
    thankYouMessage.innerText = "Thank you for your order! Your payment has been received.";
  }

  // Show the thank you message
  thankYouMessage.style.display = 'block';
}
