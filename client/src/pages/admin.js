import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [parts, setParts] = useState([]);
  const [newPart, setNewPart] = useState({
    name: '',
    make: '',
    model: '',
    chasis: '',
    year: '',
    image: '',
  });

  useEffect(() => {
    // Fetch existing parts when the component mounts
    fetchParts();
  }, []);

  const fetchParts = () => {
    axios.get('http://localhost:5002/api/parts')
      .then(response => {
        setParts(response.data);
      })
      .catch(error => {
        console.error('Error fetching parts:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPart(prevPart => ({
      ...prevPart,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to add the new part
    axios.post('http://localhost:5002/api/parts', newPart)
      .then(response => {
        console.log('Part added successfully:', response.data);
        // Fetch updated list of parts after adding a new one
        fetchParts();
        setNewPart({
          name: '',
          make: '',
          model: '',
          chasis: '',
          year: '',
          image: '',
        });
      })
      .catch(error => {
        console.error('Error adding part:', error);
      });
  };

  const handleDelete = (partId) => {
    // Make a DELETE request to remove the part
    axios.delete(`http://localhost:5002/api/parts/${partId}`)
      .then(response => {
        console.log('Part deleted successfully:', response.data);
        // Fetch updated list of parts after deleting one
        fetchParts();
      })
      .catch(error => {
        console.error('Error deleting part:', error);
      });
  };

  return (
    <div>
      <h2>Part List</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {parts.map(part => (
          <div key={part._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '200px' }}>
            <img height='150' src={part.image} alt={part.name} />
            <h3>{part.name}</h3>
            <p>Name: {part.name}</p>
            <p>Car Make: {part.make}</p>
            <p>Car Model: {part.model}</p>
            <p>Chasis Number: {part.chasis}</p>
            <p>Year: {part.year}</p>
            <button onClick={() => handleDelete(part._id)}>Delete</button>
          </div>
        ))}
      </div>

      <h2>Add New Part</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (unchanged form fields) */}
        <button type="submit">Add Part</button>
      </form>
    </div>
  );
};

export default Admin;
