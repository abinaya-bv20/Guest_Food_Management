import React, { useEffect, useState } from 'react';
import axios from 'axios';


const OfficeDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);

  useEffect(() => {
    fetchPendingRequests();
    fetchCompletedRequests();
  }, []);

  // Function to fetch pending requests
  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/office/pending', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPendingRequests(response.data);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };

  // Function to fetch completed requests
  const fetchCompletedRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/office/completed', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCompletedRequests(response.data);
    } catch (error) {
      console.error('Error fetching completed requests:', error);
    }
  };


  // Function to handle approval
  const handleApprove = async (request) => {
    try {
      await axios.post(
        `http://localhost:5000/api/office/approve`,
        {
          departmentName: request.departmentName,
          eventDate: request.eventDate,
          mealType: request.mealType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // Refresh requests after approving
      fetchPendingRequests();
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  return (
    <div>
      <h1>Pending Food Requests</h1>
      {pendingRequests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Event Date</th>
              <th>Meal Type</th>
              <th>Guest Count</th>
              <th>Special Requirements</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((request) => (
              <tr key={`${request.departmentName}-${request.eventDate}-${request.mealType}`}>
                <td>{request.departmentName}</td>
                <td>{new Date(request.eventDate).toLocaleDateString()}</td>
                <td>{request.mealType}</td>
                <td>{request.guestCount}</td>
                <td>{request.specialRequirements || 'None'}</td>
                <td>
                  <button
                    onClick={() => handleApprove(request)}
                    disabled={request.status === 'Approved'}
                  >
                    {request.status === 'Approved' ? 'Approved' : 'Pending'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h1>Completed Food Requests</h1>
      {completedRequests.length === 0 ? (
        <p>No completed requests</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Event Date</th>
              <th>Meal Type</th>
              <th>Guest Count</th>
              <th>Special Requirements</th>
            </tr>
          </thead>
          <tbody>
            {completedRequests.map((request) => (
              <tr key={`${request.departmentName}-${request.eventDate}-${request.mealType}`}>
                <td>{request.departmentName}</td>
                <td>{new Date(request.eventDate).toLocaleDateString()}</td>
                <td>{request.mealType}</td>
                <td>{request.guestCount}</td>
                <td>{request.specialRequirements || 'None'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OfficeDashboard;
