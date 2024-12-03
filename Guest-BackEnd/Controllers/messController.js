const Request = require('../Models/Request');

// Mark a request as completed
exports.completeRequest = async (req, res) => {
  try {
    const { id } = req.body; // Get request ID from the request body
    const request = await Request.findByIdAndUpdate(id, { status: 'Completed' }, { new: true }); // Update status to 'Completed'
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    
    // Optionally, send a notification logic can go here if needed
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all approved requests for the mess department
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: 'Approved' }); // Only get 'Approved' requests
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all completed requests
exports.getCompletedRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: 'Completed' });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
