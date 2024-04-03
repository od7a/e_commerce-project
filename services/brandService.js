const Brand=require('../models/brandModel');
const asyncHandler = require('express-async-handler');
const slugify=require('slugify');
const ApiError = require('../utils/ApiError');
// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
const getbrands=asyncHandler(async(req,res)=>{
    const query=req.query;
    const page=query.page;
    const limit=query.limit;
    const skip=(page-1)*limit;
    const brands=await Brand.find({}).skip(skip).limit(limit);
    res.status(200).json({status:'success',result:brands.length,data:{brands}})
})
// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
const getbrand=asyncHandler(async(req,res,next)=>{
    const id =req.params.id;
    const brand=await Brand.findById(id);
    if (!brand) {
        return next(new ApiError(`No brand found for this id ${id}`, 404));
    }
    res.status(200).json({ status: 'success', data: { brand } });
})
// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private/Admin-Manager
const createbrand = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const brand = await Brand.create({ name, slug: slugify(name) });
    res.status(201).json({ status: 'success', data: { brand } });
});
// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private/Admin-Manager
const updatebrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const brand= await Brand.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
    if (!brand) {
        return next(new ApiError(`No brand found for this id ${id}`, 404));
    }
    res.status(200).json({ status: 'success', data: { brand } });
});
// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private/Admin
const deletebrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand= await Brand.findByIdAndDelete(id);
    if (!brand) {
        return next(new ApiError(`No brand found for this id ${id}`, 404));
    }
    res.status(204).json({ message: "brand Deleted" });
});
module.exports = {
    getbrands,
    getbrand,
    createbrand,
    updatebrand,
    deletebrand
};

