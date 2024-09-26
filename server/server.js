const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const dataRoutes = require("./routes/dataRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const marketplaceRoutes = require("./routes/marketplaceRoutes");
const privacyRoutes = require("./routes/privacyRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const activityLogRoutes = require("./routes/activityLogRoutes");
const { validateData } = require("./middleware/validationMiddleware");
const rateLimit = require("express-rate-limit");

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to DataNest API");
});

const { protect } = require("./middleware/authMiddleware");
const { createData } = require("./controllers/dataController");

app.post("/create", protect, validateData, createData);

app.use("/api/users", userRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/privacy", privacyRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/activityLogs", activityLogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
