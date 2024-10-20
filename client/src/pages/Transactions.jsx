import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTransactions } from '../redux/slices/dataSlice';
import { fetchUserTransactions } from '../utils/api';

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.data.transactions);
  const loading = transactions.length === 0;

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await fetchUserTransactions();
        dispatch(setTransactions(data));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    getTransactions();
  }, [dispatch]);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className="container mt-4">
      <h2>Your Transactions</h2>
      {transactions.length > 0 ? (
        <ul className="list-group">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="list-group-item">
              <p>Data Item: {transaction.dataItem}</p>
              <p>Price: ${transaction.price}</p>
              <p>Status: {transaction.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default Transactions;
