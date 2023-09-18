const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expenseController');

// Create a new expense
router.post('/expenses', expenseController.createExpense);

// Get all expenses
router.get('/expenses', expenseController.getAllExpenses);

// Get expenses for a specific month (e.g., /expenses/monthly?month=2023-09)
router.get('/expenses/monthly', expenseController.getExpensesByMonth);

// Get expenses for a specific day (e.g., /expenses/daily?date=2023-09-18)
router.get('/expenses/daily', expenseController.getExpensesByDay);

// Get expenses within a specific time range (e.g., /expenses/time-range?startDate=2023-09-01&endDate=2023-09-30)
router.get('/expenses/time-range', expenseController.getExpensesByTimeRange);

module.exports = router;
