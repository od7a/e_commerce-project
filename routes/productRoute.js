const express=require('express');
const router=express.Router();
const productService=require('../services/productService');
const {createProductValidator,getProductValidator,updateProductValidator,deleteProductValidator}=require('../utils/validators/productValidator');
router.route('/')
      .get(productService.getproducts)
      .post(createProductValidator,productService.createproduct)
router.route('/:id')
      .get(getProductValidator,productService.getproduct)
      .patch(updateProductValidator,productService.updateproduct)
      .delete(deleteProductValidator,productService.deleteproduct)
module.exports=router;