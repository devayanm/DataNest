const User = require('../models/User');

// Rate a user
const rateUser = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const userToRate = await User.findById(req.params.id);

    if (!userToRate) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure user is not rating themselves
    if (req.user._id.toString() === userToRate._id.toString()) {
      return res.status(400).json({ message: 'You cannot rate yourself' });
    }

    const newRating = {
      rating,
      comment,
      ratedBy: req.user._id,
    };

    userToRate.ratings.push(newRating);
    await userToRate.save();

    res.status(201).json({ message: 'Rating submitted', newRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user ratings
const getUserRatings = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('ratings.ratedBy', 'name');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { rateUser, getUserRatings };
