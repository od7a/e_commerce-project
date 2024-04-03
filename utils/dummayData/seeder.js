const fs = require('fs');
require('colors');
const dotenv = require('dotenv');
const Product = require('../../models/productModel');
const dbConnection = require('../../config/database');

dotenv.config({ path: './config.env' });

// Ensure the path to the dotenv file is correct based on your script's execution context

// Initialize database connection
const initDbConnection = async () => {
  await dbConnection().catch(err => {
    console.error("Failed to connect to the database", err);
    process.exit(1); // Exit with error
  });
};
console.log(`Current directory: ${process.cwd()}`);


// Read data from the JSON file
const products = JSON.parse(fs.readFileSync('G:/E_commerce Backend/utils/dummyData/products.json', 'utf-8'));


// Function to insert data into the database
const insertData = async () => {
  try {
    await initDbConnection(); // Ensure DB connection is established
    await Product.create(products); // Insert the products
    console.log('Data Inserted'.green.inverse);
    process.exit();
  } catch (error) {
    console.error('Failed to insert data:', error);
    process.exit(1); // Exit with error
  }
};

// Function to delete data from the database
const destroyData = async () => {
  try {
    await initDbConnection(); // Ensure DB connection is established
    await Product.deleteMany(); // Delete all products
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error('Failed to destroy data:', error);
    process.exit(1); // Exit with error
  }
};

// Process command line arguments to determine the operation
if (process.argv[2] === '-i') {
  insertData();
} else if (process.argv[2] === '-d') {
  destroyData();
}
