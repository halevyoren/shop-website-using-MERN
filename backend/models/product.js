const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the product's name"],
    trim: true,
    maxLength: [100, 'Product name cannot exeed 100 characters']
  },
  price: {
    type: Number,
    required: [true, "Please enter the product's price"],
    maxLength: [5, 'Product price cannot exeed 5 characters'],
    default: 0.0
  },
  description: {
    type: String,
    required: [true, "Please enter the product's description"]
  },
  ratings: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Please select a category for this product'],
    enum: {
      values: [
        'Electronics',
        'Camera',
        'Laptop',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
      ],
      message: 'Please select a correct for this product'
    }
  },
  seller: {
    type: String,
    required: [true, 'Please enter product seller']
  },
  stock: {
    type: Number,
    required: [true, 'Please enter how many of this product are in stock'],
    maxLength: [5, 'Product stock cannot exeed 5 characters'],
    default: 0
  },
  numberOfReviews: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Product', productSchema);
