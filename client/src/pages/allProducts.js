// import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
// import Navbarz from '../components/navbar';
// import Cards from '../components/Cards';

// function Allproducts() {
//   const [products, setProducts] = useState([]);
//   const [updateProducts, setUpdateProducts] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     Axios.get('http://localhost:5002/api/allParts')
//       .then(res => {
//         let productData = res.data;
//         let slicedArray = productData.slice(0, 2);
//         let renderProducts = productData.map(item => (
//           <Cards
//             key={item._id}
//             productId={item._id}
//             name={item.name}
//             make={item.make}
//             model={item.model}
//             chasisNumber={item.chasisNumber}
//             year={item.year}
//             image={item.image}
//             editRender={setUpdateProducts}
//           />
//         ));
//         setProducts(renderProducts);
//         setUpdateProducts(false);
//       })
//       .catch(err => {
//         console.error('Error fetching products:', err);
//         setError(err.message || 'An error occurred while fetching data.');
//       });
//   }, [updateProducts]);


//   return (
//     <div>
//       <Navbarz />
//       <h1>Car Parts</h1>
//       <p>
//         Welcome to GlenSpares. We offer a wide variety of high-quality
//         <br /> car parts and <br /> spares to keep your vehicle running smoothly
//         and looking its best.
//       </p>

//       {error ? (
//         <div>Error: {error}</div>
//       ) : (
//         <div className="row row-cols-1 row-cols-md-5 g-4" style={{ margin: '5%' }}>
//           {/* Determine how many I want to display --> row-cols-md-5*/}
//           {products}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Allproducts;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbarz from '../components/navbar';

function Allproducts() {
  const [products, setProducts] = useState([]);

  // Gets all the products from the db
  useEffect(() => {
    axios.get('http://localhost:5002/api/allParts')
      .then(result => setProducts(result.data))
      .catch(err => console.log(err));
  }, []);

  const cartArray = [];
  let asshole = JSON.parse(sessionStorage.getItem('cart'));
  const handleCart = (product) => {
      if (asshole == undefined || asshole == null) {
          console.log(product)
          cartArray.push(product)
          console.log(cartArray)
          let string = JSON.stringify(cartArray)
          sessionStorage.setItem('cart', string)
          alert("Item Added to cart")
      }else{
          console.log(product)
          cartArray.push(asshole)
          cartArray.push(product)
          console.log(cartArray)
          let string = JSON.stringify(cartArray)
          sessionStorage.setItem('cart', string)
          alert("Item Added to cart")
      } 
  }

  const leProducts = products.map((produx) => (
    <Col key={produx._id} xs={12} md={3}>
      <Card height={200}>
        <Card.Img variant="top" src={produx.image} height={150} />
        <Card.Body>
          <Card.Title>{produx.name}</Card.Title>
          <Card.Text>
            <p>Category: {produx.category}</p>
            <p className='treefiddy'>R {produx.price}</p>
          </Card.Text>
          <div>
            <a href="#" className="btn btn-primary right" onClick={() => handleCart(produx)}>Add to Cart</a>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <div>
        <Navbarz />
        <Row className="g-4">
        {leProducts}
        </Row>
    </div>
  );
}

export default Allproducts;
