
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middelwares/validatorMiddelware');
const Category=require('../../models/categoryModel');
const Subcategory=require('../../models/subCategoryModel');

exports.createProductValidator = [
  check('title')
    .isLength({ min: 3 })
    .withMessage('must be at least 3 chars')
    .notEmpty()
    .withMessage('Product required'),
  check('description')
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ max: 2000 })
    .withMessage('Too long description'),
  check('quntity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isNumeric()
    .withMessage('Product quantity must be a number'),
  check('sold')
    .optional()
    .isNumeric()
    .withMessage('Product quantity must be a number'),
  check('price')
    .notEmpty()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('Product price must be a number')
    .isLength({ max: 32000 })
    .withMessage('To long price'),
  check('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('Product priceAfterDiscount must be a number')
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error('priceAfterDiscount must be lower than price');
      }
      return true;
    }),
  check('category')
    .notEmpty()
    .withMessage('Product must be belong to a category')
    .isMongoId()
    .withMessage('Invalid ID formate').custom((categoryId) =>
    Category.findById(categoryId).then((category) => {
      if (!category) {
        throw new Error(`No category for this id: ${categoryId}`)
        
      }
    })
  ),
  check('subcategory')
    .optional()
    .isMongoId()
    .withMessage('Invalid ID formate').custom((subcategoryid)=>Subcategory.find({_id:{$exists:true,$in:subcategoryid}}).then((result)=>{
      if(result.length<1 && result.length!==subcategoryid.length){
        throw new Error(`No subcategory for this id: ${subcategoryid}`)
      }
    }))
    .custom((val, { req }) => {
      return Subcategory.find({ category: req.body.category }).then((subcategory) => {
        const subcategoryinDB = [];
        subcategory.forEach((sub) => {
          subcategoryinDB.push(sub._id.toString());
        });
    
        if (!val.every((v) => subcategoryinDB.includes(v))) {
          throw new Error('Subcategory does not belong to category');
        }
      });
    })
    ,
  check('brand').optional().isMongoId().withMessage('Invalid ID formate'),
  check('ratingsAverage')
    .optional()
    .isNumeric()
    .withMessage('ratingsAverage must be a number')
    .isLength({ min: 1 })
    .withMessage('Rating must be above or equal 1.0')
    .isLength({ max: 5 })
    .withMessage('Rating must be below or equal 5.0'),
  check('ratingsQuantity')
    .optional()
    .isNumeric()
    .withMessage('ratingsQuantity must be a number'),

  validatorMiddleware,
];

exports.getProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  body('title')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];