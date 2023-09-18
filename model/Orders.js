// Import required modules
const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Delivered'],
    default: 'Pending',
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

// Export the model for use in other parts of your application
module.exports = Order;
