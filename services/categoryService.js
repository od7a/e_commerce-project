const Category=require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const slugify=require('slugify');
const ApiError = require('../utils/ApiError');
// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
const getCategories=asyncHandler(async(req,res)=>{
    const query=req.query;
    const page=query.page;
    const limit=query.limit;
    const skip=(page-1)*limit;
    const categories=await Category.find({}).skip(skip).limit(limit);
    res.status(200).json({status:'success',result:categories.length,data:{categories}})
})
// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
const getCategory=asyncHandler(async(req,res,next)=>{
    const id =req.params.id;
    const category=await Category.findById(id);
    if (!category) {
        return next(new ApiError(`No Category found for this id ${id}`, 404));
    }
    res.status(200).json({ status: 'success', data: { category } });
})
// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private/Admin-Manager
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const category = await Category.create({ name, slug: slugify(name) });
    res.status(201).json({ status: 'success', data: { category } });
});
// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin-Manager
const updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
    if (!category) {
        return next(new ApiError(`No Category found for this id ${id}`, 404));
    }
    res.status(200).json({ status: 'success', data: { category } });
});
// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        return next(new ApiError(`No Category found for this id ${id}`, 404));
    }
    res.status(204).json({ message: "Category Deleted" });
});
module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};

