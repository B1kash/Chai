const Expense = require('../model/Expense');

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const { personName, amount, date, reason } = req.body;
    const expense = new Expense({ personName, amount, date, reason });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Error creating expense' });
  }
};

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    res.json({totalAmount,expenses});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching expenses' });
  }
};

// Get expenses for a specific month
exports.getExpensesByMonth = async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(month);
    startDate.setDate(1); // Set to the 1st day of the specified month

    const endDate = new Date(month);
    endDate.setMonth(endDate.getMonth() + 1); // Set to the 1st day of the next month

    const expenses = await Expense.find({
      date: { $gte: startDate, $lt: endDate },
    });
    
    // Calculate total amount for the month
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

    res.json({ expenses, totalAmount });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching expenses for the specified month' });
  }
};

// Get expenses for a specific day
exports.getExpensesByDay = async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0); // Set to the start of the specified day

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1); // Set to the start of the next day

    const expenses = await Expense.find({
      date: { $gte: targetDate, $lt: nextDate },
    });

    // Calculate total amount for the day
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

    res.json({ expenses, totalAmount });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching expenses for the specified day' });
  }
};

// Get expenses within a specific time range
exports.getExpensesByTimeRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const startTime = new Date(startDate);
    const endTime = new Date(endDate);

    const expenses = await Expense.find({
      date: { $gte: startTime, $lte: endTime },
    });

    // Calculate total amount for the time range
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);

    res.json({ expenses, totalAmount });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching expenses within the specified time range' });
  }
};
