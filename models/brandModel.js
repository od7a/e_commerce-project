const mongoose=require('mongoose');
const brandschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Brand must be required'],
        unique: [true,' Brand must be unique'], 
        minlength: [3, 'Brand name must be at least 3 characters long'], 
        maxlength: [37, 'Brand name must be less than 37 characters long']
    },
    slug:{
        type:String,
        lowercase:true
    }
},{timestamps:true});
module.exports=mongoose.model('Brand',brandschema);