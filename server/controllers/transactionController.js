const Transaction = require('../models/Transaction');
const Data = require('../models/Data');

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

const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ buyer: req.user._id }, { seller: req.user._id }],
    }).populate('buyer seller dataItem', 'name title');

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTransaction, getUserTransactions };
