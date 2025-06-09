const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
    
  categories: {
    type: String,
    required: true,
  },
    
  weight: {
    type: Number,
    required: true,
  },
  
  title: {
    type: String,
    required: true,
  },

  calories: {
    type: Number,
    required: true,
  },

  groupBloodNotAllowed: {
    type: [Boolean],
    default: [],
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
