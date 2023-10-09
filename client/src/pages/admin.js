import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import Axios from 'axios'
import Cards from '../components/Cards'
import Navbarz from '../components/navbar'

function Admin() {
    const [parts, setParts] = useState([]);
    const [product, setProducts] = useState();
    const [updateProducts, setUpdateProducts] = useState(false);

    useEffect(() => {
        Axios.get('http://localhost:5002/api/allParts')
            .then(res => {
                let productData = res.data;
                let slicedArray = [];
                slicedArray = productData.slice(0, 2);
                let renderProducts = productData.map((item) => <Cards key={item._id} productId={item._id} name={item.name} make={item.make} model={item.model} chasisNumber={item.chasisNumber} year={item.year} image={item.image} editRender={setUpdateProducts} />);
                setProducts(renderProducts);
                setUpdateProducts(false);
            })
            .catch(err => console.log(err))
    }, [updateProducts])

    let defaultFormVals = ["name", "make", "model", "year", "chasisNumber", "image"];

    const [formValues, setFormValues] = useState(defaultFormVals);

    const getValues = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const addProduct = (e) => {

        const payloadData = new FormData();

        let payload = {
            name: formValues['name'],
            make: formValues['make'],
            model: formValues['model'],
            chasisNumber: +formValues['chasisNumber'],
            year: +formValues['year'],
            image: formValues['image']
        }

        Axios.post("http://localhost:5002/api/parts", payload)
            .then((res) => {
                if (res) {
                    console.log("Item Added");
                    setUpdateProducts(true);
                }
            })
            .catch(err => console.log(err))
    }



    return (
        <div>
            <Navbarz />

            <Form
                onSubmit={addProduct}
                style={{ marginTop: '2%', width: '25%', marginLeft: 'auto', marginRight: 'auto' }}
            >
                <Form.Group className="mb-3">
                    <Form.Label>Part Name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Shocks" onChange={getValues} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Car make</Form.Label>
                    <Form.Control name="make" type="text" placeholder="volkswagen" onChange={getValues} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Car model</Form.Label>
                    <Form.Control name="model" placeholder="citi golf" onChange={getValues} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Chasis Number</Form.Label>
                    <Form.Control name="chasisNumber" type="number" onChange={getValues} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Year</Form.Label>
                    <Form.Control name="year" type="number" placeholder="XXXX" onChange={getValues} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control name="image" type="text" placeholder="yomamasofat.com" onChange={getValues} />
                </Form.Group>
                <Button
                    type="submit"
                    style={{ width: '100%', marginTop: '2%', marginBottom: '2%' }}
                >
                    Add new product
                </Button>
            </Form>

            <div className="row row-cols-1 row-cols-md-5 g-4" style={{ margin: '5%' }}>
                {product}
            </div>

        </div>
    )
}

export default Admin;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbarz from '../components/navbar';

// const Admin = () => {
//   const [parts, setParts] = useState([]);
//   const [newPart, setNewPart] = useState({
//     name: '',
//     make: '',
//     model: '',
//     chasis: '',
//     year: '',
//     image: '',
//   });

//   useEffect(() => {
//     // Fetch existing parts when the component mounts
//     fetchParts();
//   }, []);

//   const fetchParts = () => {
//     axios.get('http://localhost:5002/api/parts')
//       .then(response => {
//         setParts(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching parts:', error);
//       });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewPart(prevPart => ({
//       ...prevPart,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Make a POST request to add the new part
//     axios.post('http://localhost:5002/api/parts', newPart)
//       .then(response => {
//         console.log('Part added successfully:', response.data);
//         // Fetch updated list of parts after adding a new one
//         fetchParts();
//         setNewPart({
//           name: '',
//           make: '',
//           model: '',
//           chasis: '',
//           year: '',
//           image: '',
//         });
//       })
//       .catch(error => {
//         console.error('Error adding part:', error);
//       });
//   };

//   const handleDelete = (partId) => {
//     // Make a DELETE request to remove the part
//     axios.delete(`http://localhost:5002/api/parts/${partId}`)
//       .then(response => {
//         console.log('Part deleted successfully:', response.data);
//         // Fetch updated list of parts after deleting one
//         fetchParts();
//       })
//       .catch(error => {
//         console.error('Error deleting part:', error);
//       });
//   };

//   return (
//     <div>
//         <Navbarz />
//         <h2>Part List</h2>
//         <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//             {parts.map(part => (
//             <div key={part._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '200px' }}>
//                 <img height='150' src={part.image} alt={part.name} />
//                 <h3>{part.name}</h3>
//                 <p>Name: {part.name}</p>
//                 <p>Car Make: {part.make}</p>
//                 <p>Car Model: {part.model}</p>
//                 <p>Chasis Number: {part.chasis}</p>
//                 <p>Year: {part.year}</p>
//                 <button onClick={() => handleDelete(part._id)}>Delete</button>
//             </div>
//             ))}
//         </div>

//         <h2>Add New Part</h2>
//         <form onSubmit={handleSubmit}>
//             <label>
//             Name:
//             <input type="text" name="name" value={newPart.name} onChange={handleInputChange} required />
//             </label>
//             <label>
//             Car Make:
//             <input type="text" name="make" value={newPart.make} onChange={handleInputChange} required />
//             </label>
//             <label>
//             Car Model:
//             <input type="text" name="model" value={newPart.model} onChange={handleInputChange} required />
//             </label>
//             <label>
//             Chasis Number:
//             <input type="text" name="chasis" value={newPart.chasis} onChange={handleInputChange} required />
//             </label>
//             <label>
//             Year:
//             <input type="text" name="year" value={newPart.year} onChange={handleInputChange} required />
//             </label>
//             <label>
//             Image URL:
//             <input type="text" name="image" value={newPart.image} onChange={handleInputChange} required />
//             </label>
//             <button type="submit">Add Part</button>
//         </form>
//     </div>
//   );
// };

// export default Admin;
