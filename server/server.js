const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const dataRoutes = require('./routes/dataRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const marketplaceRoutes = require('./routes/marketplaceRoutes');
const { validateData } = require('../middleware/validationMiddleware');
const encrypt = require('mongoose-encryption');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 100, 
});

app.use(limiter);



dotenv.config();

const app = express();

app.use(express.json());

connectDB();

userSchema.plugin(encrypt, { secret: process.env.DATA_ENCRYPTION_KEY, encryptedFields: ['dataFields'] });


app.get('/', (req, res) => {
  res.send('Welcome to DataNest API');
});

router.post('/create', protect, validateData, createData);

app.use('/api/users', userRoutes);

app.use('/api/data', dataRoutes);  

app.use('/api/transactions', transactionRoutes);

app.use('/api/marketplace', marketplaceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
