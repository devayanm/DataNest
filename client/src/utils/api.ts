import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust based on your backend URL

export const createPaymentIntent = async (amount: number, currency: string) => {
  const response = await axios.post(`${API_URL}/payments/create-payment-intent`, {
    amount,
    currency,
  });
  return response.data;
};

// Add other API functions as needed
