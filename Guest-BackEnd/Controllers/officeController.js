const Request = require('../Models/Request');

// Approve a food request
exports.approveRequest = async (req, res) => {
  try {
    const { departmentName, eventDate, mealType } = req.body;
    const request = await Request.findOneAndUpdate(
      { departmentName, eventDate, mealType, status: 'Pending' },
      { status: 'Approved' },
      { new: true }
    );
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all pending requests
exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: 'Pending' });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


