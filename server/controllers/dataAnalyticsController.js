const Data = require('../models/Data');

// Update views count when data is viewed
const updateViews = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }

    data.views += 1;
    await data.save();

    res.json({ message: 'Views updated', views: data.views });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get analytics for user's data
const getUserDataAnalytics = async (req, res) => {
  try {
    const data = await Data.find({ owner: req.user._id });

    const analytics = data.map(item => ({
      title: item.title,
      views: item.views,
      purchases: item.purchases,
      downloads: item.downloads,
    }));

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateViews, getUserDataAnalytics };
