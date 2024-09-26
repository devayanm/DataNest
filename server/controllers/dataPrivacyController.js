const Data = require('../models/Data');

// Update data access control
const updateAccessControl = async (req, res) => {
  try {
    const { accessControl } = req.body;
    const data = await Data.findById(req.params.id);

    if (!data || data.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    data.accessControl = accessControl;
    await data.save();

    res.json({ message: 'Access control updated', data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateAccessControl };
