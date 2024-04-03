const express = require('express');
const dotenv = require('dotenv');
// Ensure the file is named config.env and located in the root or specified directory
dotenv.config({path: './config.env'}); 
const globalError=require('./middelwares/ErrorMiddelware');
const ApiError = require('./utils/ApiError');
const categoryRouter=require('./routes/categoryRoute');
const SubCategoryRoute=require('./routes/subcategoryRoute');
const brandRoute=require('./routes/brandRoute');
const productRoute=require('./routes/productRoute');
// Connect to database
const dbConnection = require('./config/database');
dbConnection();

// Express app initialization
const app = express();

// Middleware for JSON body parsing
app.use(express.json());
//Mount MiddelWare
app.use('/api/v1/category',categoryRouter);
app.use('/api/v1/subcategory',SubCategoryRoute);
app.use('/api/v1/brands',brandRoute);
app.use('/api/v1/products',productRoute);

// Catch-all route for handling 404 errors
app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
//handelerror inside express
app.use(globalError);
// Define the port to use from environment variables or default to 6000
const PORT = process.env.PORT || 6000;
const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Unhandled Rejection: ${err.message}`);
    server.close(() => {
        console.log('Server shutdown...');
        process.exit(1);
    });
});
