const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String, // e.g., "Necklace", "Ring"
  material: String, // e.g., "Gold", "Diamond"
  price: { type: Number, required: true },
  images: [String],
  rating: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
