// controllers/userController.js
const User = require('../models/user.model');

// @desc    Add an item to the logged-in user’s orders
// @route   POST /order
// @access  Private
exports.makeOrder = async (req, res) => {
  try {
    const { title, imgLink, price, deliveryDetails } = req.body;
    if (!title || !imgLink ||!deliveryDetails || price == null) {
      return res
        .status(400)
        .json({ message: 'title, imgLink and price are required' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.orderedItems.push({ title, imgLink, price, deliveryDetails });
    await user.save();

    res.status(201).json(user.orderedItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all orders for a given user
// @route   GET /order/:id
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    // Only allow the user to view their own orders
    if (!req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.user.id).select('orderedItems');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.orderedItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove an order entry by its sub-document ID
// @route   DELETE /order/:id
// @access  Private
exports.deleteOrder = async (req, res) => {
  try {
    // here :id is the ObjectId of the orderedItems subdoc
    const itemId = req.params.id;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const idx = user.orderedItems.findIndex(
      item => item._id.toString() === itemId
    );
    if (idx === -1) {
      return res.status(404).json({ message: 'Order item not found' });
    }

    user.orderedItems.splice(idx, 1);
    await user.save();

    res.json({ message: 'Removed from orders', orders: user.orderedItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
