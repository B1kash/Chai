const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongooseConnection = require('./config/database.js')
const orderRoutes = require("./routes/orderRoutes.js")
const expenseRoutes = require("./routes/expenseRoute.js")
require('dotenv').config();

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cors());

// mongooseConnection
//   .then(() => {
//     // MongoDB connection is established
//     console.log('Connected to MongoDB');

//     // Additional app configuration and route handling can go here

//     // Start the Express server
//     const port = process.env.PORT || 3000;
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   })
//   .catch((error) => {
//     // Handle MongoDB connection error
//     console.error('MongoDB connection error:', error);
//   });

app.get('/', (req,res)=>{
    res.send('Hello , express with middleware');
});

// Use the order routes
app.use(orderRoutes);
app.use(expenseRoutes);

mongooseConnection.on('connected', () => {
    // MongoDB connection is established
    console.log('Connected to MongoDB');
  
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
  
  mongooseConnection.on('error', (error) => {
    // Handle MongoDB connection error
    console.error('MongoDB connection error:', error);
  });


