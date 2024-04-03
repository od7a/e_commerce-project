const mongoose=require('mongoose');
const productSchema=new mongoose.Schema(
{
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,'Too short Product title'],
        maxlength:[100,'Too long Product title']
    },
    slug:{
        type:String,
        lowercase:true
    },
    description:{
        type:String,
        required:[true,'product description is required'],
        minlength:[20,'Too short product description']
    },
    quntity:{
        type:Number,
        required:[true,'product quntity is required']
    },
    slod:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true,'product price is required'],
        max:[320000,'Too short product type']
    },
    priceAfterDiscount:{
        type:Number
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,'product must be belong to category']
    },
    subcategory:[{
        type:mongoose.Schema.ObjectId,
        ref:'SubCategory'
    }],
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:'Brand'
    },
    ratingAverage:{
        type:Number,
        min:[1,' Rating Average must be above or equal 1.0'],
        max:[5,'Rating Average must be below or equal 5.0']
    },
    ratingQuantity:{
        type:Number,
        default:0
    }
}
,{timestamps:true})
module.exports=mongoose.model('Product',productSchema);