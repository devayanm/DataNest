const Data = require('../models/Data');
const User = require('../models/User');

// Create a new data listing
const createData = async (req, res) => {
  const { title, description, price, dataFields } = req.body;

  try {
    const newData = new Data({
      owner: req.user._id,
      title,
      description,
      price,
      dataFields,
    });

    await newData.save();

    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all available data listings
const getAllData = async (req, res) => {
  try {
    const data = await Data.find({ isSold: false }).populate('owner', 'name email');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Purchase data
const purchaseData = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: 'Data not found' });
    }

    if (data.isSold) {
      return res.status(400).json({ message: 'Data already sold' });
    }

    data.isSold = true;
    data.buyer = req.user._id;

    await data.save();

    res.json({ message: 'Purchase successful', data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createData, getAllData, purchaseData };
