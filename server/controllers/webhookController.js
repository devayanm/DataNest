const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Add your Stripe secret key
const Transaction = require('../models/Transaction');

const handleWebhook = async (req, res) => {
  const event = req.body;

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;

      // You can retrieve additional information from the payment intent
      const { amount, currency, metadata } = paymentIntent;

      // Record the transaction in your database
      await Transaction.create({
        buyer: metadata.buyerId,
        seller: metadata.sellerId,
        dataItem: metadata.dataItemId,
        price: amount / 100, // amount is in cents
      });

      console.log('PaymentIntent was successful!');
      break;

    case 'payment_intent.payment_failed':
      console.log('PaymentIntent failed:', event.data.object);
      break;

    // Handle other event types as needed

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
};

module.exports = { handleWebhook };
