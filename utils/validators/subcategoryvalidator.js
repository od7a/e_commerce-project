const { check } = require('express-validator');
const validatorMiddleware = require('../../middelwares/validatorMiddelware');

 exports.getCategoryValidator = [
 check('id').isMongoId().withMessage('Invalid subcategory id format'),
  validatorMiddleware,
 ];

exports.createCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('subCategory required')
    .isLength({ min: 3 })
    .withMessage('Too short subcategory name')
    .isLength({ max: 32 })
    .withMessage('Too long subcategory name'),
    check('category').notEmpty().withMessage('subcategory must be belong to category')
    .isMongoId().withMessage('Invalid  subcategory id'),
  validatorMiddleware,
];

 exports.updateCategoryValidator = [
check('id').isMongoId().withMessage('Invalid subcategory id format'),
 validatorMiddleware,
];

 exports.deleteCategoryValidator = [
check('id').isMongoId().withMessage('Invalid subcategory id format'),
validatorMiddleware,
];