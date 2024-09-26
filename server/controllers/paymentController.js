const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Transaction = require('../models/Transaction');

const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const recordTransaction = async (buyerId, sellerId, dataItemId, price) => {
  const transaction = new Transaction({
    buyer: buyerId,
    seller: sellerId,
    dataItem: dataItemId,
    price,
  });
  
  await transaction.save();
};

module.exports = { createPaymentIntent, recordTransaction };
