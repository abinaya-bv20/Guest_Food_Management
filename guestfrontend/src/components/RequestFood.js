import React, { useState } from 'react';
import axios from 'axios';

const RequestFood = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [mealType, setMealType] = useState('Lunch');
  const [guestCount, setGuestCount] = useState(1);
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [responseMessage, setResponseMessage] = useState(''); // State for response message

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/dep/request-food',
        {
          departmentName,
          eventDate,
          mealType,
          guestCount,
          specialRequirements,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert('Food request submitted successfully');
        setResponseMessage('Thank you! Your food request has been submitted successfully.');
      } else {
        alert('Submission failed: ' + response.data.message);
        setResponseMessage('Failed to submit food request. Please try again.');
      }
      
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request');
      setResponseMessage('Error submitting request. Please try again.');
    }
  };

  return (
    <div>
      <h2>Request Food</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          required
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
        <select value={mealType} onChange={(e) => setMealType(e.target.value)} required>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <input
          type="number"
          placeholder="Guest Count"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
          min="1"
          required
        />
        <textarea
          placeholder="Special Requirements (optional)"
          value={specialRequirements}
          onChange={(e) => setSpecialRequirements(e.target.value)}
        />
        <button type="submit">Submit Request</button>
      </form>

      {/* Display the response message after the form */}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default RequestFood;
