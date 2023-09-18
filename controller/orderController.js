const Order = require("../model/Orders");


// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};

// Update order status by ID
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       { status },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     res.json(updatedOrder);
//   } catch (error) {
//     res.status(500).json({ error: 'Error updating order status' });
//   }
// };
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error updating order status' });
  }
};

// Get today's orders
exports.getTodayOrders = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const orders = await Order.find({
      createdTime: { $gte: today },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching today\'s orders' });
  }
};

// Get today's orders by status
exports.getTodayOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const orders = await Order.find({
      createdTime: { $gte: today },
      status,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching today\'s orders by status' });
  }
};




// Calculate daily selling price for delivered orders based on the date (excluding time)
exports.calculateDailySellingPrice = async (req, res) => {
  try {
    const { date } = req.params;
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0); // Set the time to the start of the day

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    nextDate.setHours(0, 0, 0, 0); // Set the time to the start of the next day

    const orders = await Order.find({
      createdTime: {
        $gte: targetDate,
        $lt: nextDate
      },
      'status': 'Delivered' // Filter by item status (ensure it matches case and spelling)
    });

    const dailySellingPrice = orders.reduce((total, order) => {
      return total + order.items.reduce((orderTotal, item) => {
        if (order.status === 'Delivered') {
          return orderTotal + item.quantity * item.price;
        }
        return orderTotal;
      }, 0);
    }, 0);

    res.json({ dailySellingPrice });
  } catch (error) {
    res.status(500).json({ error: 'Error calculating daily selling price' });
  }
};




// Calculate monthly selling price for delivered orders based on the date (excluding time)
exports.calculateMonthlySellingPrice = async (req, res) => {
  try {
    const { date } = req.params;
    const startDate = new Date(date);
    startDate.setDate(1); // Set to the 1st day of the specified month
    startDate.setHours(0, 0, 0, 0); // Set the time to the start of the day
    console.log(startDate);

    const endDate = new Date(date);
    endDate.setMonth(endDate.getMonth() + 1); // Set to the 1st day of the next month
    endDate.setHours(0, 0, 0, 0); // Set the time to the start of the day
    console.log(endDate);

    const orders = await Order.find({
      createdTime: {
        $gte: startDate,
        $lt: endDate
      },
      'status': 'Delivered', // Filter by item status (ensure it matches case and spelling)
    });

    console.log(orders);

    const monthlySellingPrice = orders.reduce((total, order) => {
      return total + order.items.reduce((orderTotal, item) => {
        if (order.status === 'Delivered') {
          return orderTotal + item.quantity * item.price;
        }
        return orderTotal;
      }, 0);
    }, 0);

    res.json({ monthlySellingPrice });
  } catch (error) {
    res.status(500).json({ error: 'Error calculating monthly selling price' });
  }
};
