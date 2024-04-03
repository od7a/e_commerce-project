const express = require('express');
const router = express.Router({mergeParams:true});
const subcategoryservice = require('../services/subcategoryservice');
const {
  createCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator
} = require('../utils/validators/subcategoryvalidator');

router.route('/')
  .post(subcategoryservice.setcategory,createCategoryValidator, subcategoryservice.createsubcategory)
  .get(subcategoryservice.getsubCategories);

router.route('/:id')
  .get(getCategoryValidator, subcategoryservice.getsubCategory)
  .patch(updateCategoryValidator, subcategoryservice.updatesubCategory)
  .delete(deleteCategoryValidator, subcategoryservice.deletesubCategory);

module.exports = router;
