import mongoose from 'mongoose';

// Subdocument schema for each product in the wishlist
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  imgLink: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

// Main schema for wishlist
const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // ensure one wishlist per user
  },
  products: {
    type: [productSchema],
    default: []
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

// Exporting the Wishlist model
export default mongoose.model('Wishlist', wishlistSchema);
