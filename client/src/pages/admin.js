import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    make: '',
    model: '',
    chasis: '',
    year: '',
    image: '',
  });

  useEffect(() => {
    // Fetch existing products when the component mounts
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:5002/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to add the new product
    axios.post('http://localhost:5002/api/products', newProduct)
      .then(response => {
        console.log('Product added successfully:', response.data);
        // Fetch updated list of products after adding a new one
        fetchProducts();
        setNewProduct({
          name: '',
          make: '',
          model: '',
          chasis: '',
          year: '',
          image: '',
        });
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div>
      <h2>Product List</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '200px' }}>
            <img height='150' src={product.image} />
            <h3>{product.name}</h3>
            <p>Name: {product.name}</p>
            <p>Car Make: {product.make}</p>
            <p>Car Model: {product.model}</p>
            <p>Chasis Number: {product.chasis}</p>
            <p>Year: {product.year}</p>
            <p>PartID: {product.id}</p>
          </div>
        ))}
      </div>

      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} required />
        </label>
        <label>
          Car Make:
          <input type="text" name="make" value={newProduct.make} onChange={handleInputChange} required />
        </label>
        <label>
          Car Model:
          <input type="text" name="model" value={newProduct.model} onChange={handleInputChange} required />
        </label>
        <label>
          Chasis Number:
          <input type="text" name="chasis" value={newProduct.chasis} onChange={handleInputChange} required />
        </label>
        <label>
          Year:
          <input type="text" name="year" value={newProduct.year} onChange={handleInputChange} required />
        </label>
        <label>
          Image URL:
          <input type="text" name="image" value={newProduct.image} onChange={handleInputChange} required />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default Admin;
