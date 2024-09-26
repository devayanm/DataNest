const Data = require('../models/Data');

// Fetch all available data for the marketplace
const getAvailableData = async (req, res) => {
  try {
    const availableData = await Data.find({ isSold: false }).populate('owner', 'name');
    res.json(availableData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch specific data details
const getDataDetails = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id).populate('owner', 'name email');

    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAvailableData, getDataDetails };
