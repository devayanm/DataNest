const Transaction = require('../models/Transaction');
const Data = require('../models/Data');

// Create a new transaction after data purchase
const createTransaction = async (req, res) => {
  try {
    const { dataId, amount } = req.body;

    const data = await Data.findById(dataId);

    if (!data || data.isSold) {
      return res.status(400).json({ message: 'Data unavailable for purchase' });
    }

    const transaction = new Transaction({
      buyer: req.user._id,
      data: dataId,
      amount,
    });

    await transaction.save();

    // Mark data as sold
    data.isSold = true;
    data.buyer = req.user._id;
    await data.save();

    res.status(201).json({
      message: 'Transaction completed successfully',
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all transactions for a user
const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ buyer: req.user._id })
      .populate('data', 'title description')
      .populate('buyer', 'name email');

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTransaction, getUserTransactions };
