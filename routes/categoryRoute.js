const express = require('express');

const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require('../utils/validators/categoryvalidator');

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../services/categoryService');
const router = express.Router();
const subcategoryRoute=require('./subcategoryRoute');
router.use('/:categoryid/subcategory',subcategoryRoute);
router
  .route('/')
  .get(getCategories)
  .post(
    createCategoryValidator,
    createCategory
  );
router
  .route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    deleteCategoryValidator,
    deleteCategory
  );

module.exports = router;