const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: [true,'category must be unique'], 
        minlength: [3, 'Category name must be at least 3 characters long'], 
        maxlength: [37, 'Category name must be less than 37 characters long']
    },
    slug: {
        type: String,
        lowercase: true 
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Category', categorySchema);
