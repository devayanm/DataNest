import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    userData: null,
    transactions: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export const { setUserData, setTransactions } = dataSlice.actions;
export default dataSlice.reducer;
