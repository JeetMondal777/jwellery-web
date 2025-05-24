// controllers/wishlistController.js
const User = require('../models/user.model');

// @desc    Add an item to the logged-in user’s wishlist
// @route   POST /wishlist
// @access  Private
exports.makeWishlist = async (req, res) => {
  try {
    const { title, imgLink, price } = req.body;
    if (!title || !imgLink || price == null) {
      return res.status(400).json({ message: 'title, imgLink and price are required' });
    }

    // find user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // check for duplicate by title & imgLink & price (optional)
    const exists = user.wishlistItems.find(
      item =>
        item.title === title &&
        item.imgLink === imgLink &&
        item.price === price
    );
    if (exists) {
      return res.status(409).json({ message: 'Item already in wishlist' });
    }

    // push new wishlist item
    user.wishlistItems.push({ title, imgLink, price });
    await user.save();

    // return the full updated wishlist
    res.status(201).json(user.wishlistItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all wishlist items for a given user
// @route   GET /wishlist/:id
// @access  Private
exports.getWishlist = async (req, res) => {
  try {
    // Only allow users to fetch their own wishlist
    if (!req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.user.id).select('wishlistItems');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.wishlistItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove a wishlist entry by its sub-document ID
// @route   DELETE /wishlist/:id
// @access  Private
exports.deleteWishlist = async (req, res) => {
  try {
    // req.params.id here is the _id of the wishlistItems subdoc
    const itemId = req.params.id;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const itemIndex = user.wishlistItems.findIndex(
      item => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    // remove the subdocument
    user.wishlistItems.splice(itemIndex, 1);
    await user.save();

    res.json({ message: 'Removed from wishlist', wishlist: user.wishlistItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
