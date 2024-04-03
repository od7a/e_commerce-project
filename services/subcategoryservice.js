const SubCategory = require('../models/subCategoryModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const ApiError = require('../utils/ApiError');

// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
const getsubCategories = asyncHandler(async (req, res, next) => {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    let filterObject={};
    if(req.params.categoryid) filterObject={category:req.params.categoryid};

    const subcategories = await SubCategory.find(filterObject)
      .skip(skip)
      .limit(limit)
      .populate({ path: 'category', select: 'name -_id' });

    res.status(200).json({
      status: 'success',
      result: subcategories.length,
      data: { subcategories }
    });
});


// @desc    Get specific subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
const getsubCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const subcategory = await SubCategory.findById(id).populate({ path: 'category', select: 'name -_id' });
  if (!subcategory) {
    return next(new ApiError(`No subCategory found for this id ${id}`, 404));
  }
  res.status(200).json({ status: 'success', data: { subcategory } });
});

// @desc    Create subcategory
// @route   POST /api/v1/subcategories
// @access  Private/Admin-Manager
const setcategory=(req,res,next)=>{
  if(!req.body.category) req.body.category=req.params.categoryid;
  next();
}
const createsubcategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subcategory = await SubCategory.create({ name, slug: slugify(name), category });
  res.status(201).json({ status: 'success', data: { subcategory } });
});

// @desc    Update specific subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private/Admin-Manager
const updatesubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subcategory = await SubCategory.findByIdAndUpdate(id, { name, slug: slugify(name), category }, { new: true });
  if (!subcategory) {
    return next(new ApiError(`No subCategory found for this id ${id}`, 404));
  }
  res.status(200).json({ status: 'success', data: { subcategory } });
});

// @desc    Delete specific subcategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private/Admin
const deletesubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findByIdAndDelete(id);
  if (!subcategory) {
    return next(new ApiError(`No subCategory found for this id ${id}`, 404));
  }
  res.status(204).json({ message: "subCategory Deleted" });
});

module.exports = {
  createsubcategory,
  getsubCategories,
  getsubCategory,
  updatesubCategory,
  deletesubCategory,
  setcategory
};
