const Product=require('../models/productModel');
const asyncHandler = require('express-async-handler');
const slugify=require('slugify');
const ApiError = require('../utils/ApiError');
const { json } = require('express');
// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
const getproducts = asyncHandler(async(req, res) => {
    // Filteration
    let query = JSON.stringify(req.query);
    query = query.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    // Build query
    const mongooseQuery = Product.find(JSON.parse(query)).skip(skip).limit(limit).populate({ path: 'category', select: 'name -_id' });

    // Execute query
    const products = await mongooseQuery;

    res.status(200).json({ status: 'success', result: products.length, page, data: { products } });
});


// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
const getproduct=asyncHandler(async(req,res,next)=>{
    const id =req.params.id;
    const product =await Product.findById(id).populate({path:'category',select:'name -_id'});
    if (!product) {
        return next(new ApiError(`No product found for this id ${id}`, 404));
    }
    res.status(200).json({ status: 'success', data: { product } });
})
// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private/Admin-Manager
const createproduct = asyncHandler(async (req, res) => {
     req.body.slug=slugify(req.body.title);
    const product = await Product.create(req.body);
    res.status(201).json({ status: 'success', data: {product } });
});
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private/Admin-Manager
const updateproduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if(req.body.title){req.body.slug=slugify(req.body.title)};
    const product = await Product.findByIdAndUpdate(id,req.body, { new: true });
    if (!product) {
        return next(new ApiError(`No product found for this id ${id}`, 404));
    }
    res.status(200).json({ status: 'success', data: {product} });
});
// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
const deleteproduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product  = await Product.findByIdAndDelete(id);
    if (!product) {
        return next(new ApiError(`No product found for this id ${id}`, 404));
    }
    res.status(204).json({ message: "product Deleted" });
});
module.exports = {
    getproducts,
    getproduct,
    createproduct,
    updateproduct,
    deleteproduct
};

