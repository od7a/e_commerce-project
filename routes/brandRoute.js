const express=require('express');
const brandService=require('../services/brandService');
const{getbrandValidator,createbrandValidator,updatebrandValidator,deletebrandValidator}=require('../utils/validators/brandvalidator');
const router=express.Router();
router.route('/')
      .get(brandService.getbrands)
      .post(createbrandValidator,brandService.createbrand);
router.route('/:id')
      .get(getbrandValidator,brandService.getbrand)
      .patch(updatebrandValidator,brandService.updatebrand)
      .delete(deletebrandValidator,brandService.deletebrand);
module.exports=router;