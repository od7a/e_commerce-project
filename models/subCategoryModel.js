const mongoose=require('mongoose');
const subCategorySchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:[true,'subCategory must be unique'],
        minlength:[2,'To short subCategory name'],
        maxlength:[32,'To long subCategory name']
    },
    slug:{
        type:String,
        lowercase:true
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,'sub category must be belong to parent category']
    }

},{timestamps:true})

module.exports=mongoose.model('SubCategory',subCategorySchema);