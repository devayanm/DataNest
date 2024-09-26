const ActivityLog = require('../models/ActivityLog');

// Log a user's activity
const logActivity = async (user, action, resourceId, resourceType) => {
  try {
    const log = new ActivityLog({
      user,
      action,
      resourceId,
      resourceType,
    });
    await log.save();
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};

// Get activity logs for the logged-in user
const getUserActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ user: req.user._id });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { logActivity, getUserActivityLogs };
