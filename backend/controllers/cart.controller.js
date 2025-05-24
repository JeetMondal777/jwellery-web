// controllers/userController.js
const User = require('../models/user.model');

// @desc    Add an item to the logged-in user’s cart
// @route   POST /cart
// @access  Private
exports.makeCart = async (req, res) => {
  try {
    const { title, imgLink, price } = req.body;
    if (!title || !imgLink || price == null) {
      return res
        .status(400)
        .json({ message: 'title, imgLink and price are required' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optional: prevent exact duplicates
    const exists = user.cartItems.find(
      item =>
        item.title === title &&
        item.imgLink === imgLink &&
        item.price === price
    );
    if (exists) {
      return res.status(409).json({ message: 'Item already in cart' });
    }

    user.cartItems.push({ title, imgLink, price });
    await user.save();

    res.status(201).json(user.cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all cart items for a given user
// @route   GET /cart/:id
// @access  Private
exports.getCart = async (req, res) => {
  try {
    // Only allow a user to view their own cart
    if (!req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.user.id).select('cartItems');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove a cart entry by its sub-document ID
// @route   DELETE /cart/:id
// @access  Private
exports.deleteCart = async (req, res) => {
  try {
    // here :id is the ObjectId of the cartItems subdoc
    const itemId = req.params.id;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const idx = user.cartItems.findIndex(
      item => item._id.toString() === itemId
    );
    if (idx === -1) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    user.cartItems.splice(idx, 1);
    await user.save();

    res.json({ message: 'Removed from cart', cart: user.cartItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
