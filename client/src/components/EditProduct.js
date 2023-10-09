import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditProduct = (props) => {

  // console.log(props)

  let editFormValues = { name: props.name, make: props.make, model: props.model, chasisNumber: props.chasisNumber, year: props.year, image: props.image}

  const [editValues, setEditValues] = useState(editFormValues)

  const updateValues = (e) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
    // console.log(editValues)
  }

  const updateProd = (e) => {
    e.preventDefault()
    let productId = props.id
    let payload = editValues

    Axios.patch('http://localhost:5002/api/updatePart/' + productId, payload)
      .then(res => {
        if (res) {
          console.log("Item Updated")
          props.close();
          props.editRender(true)
          alert(payload.name + " Updated")
        }
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  const closeModal = () => {
    props.close()
  }

  return (
    // <div className='modal show'>
    <div
      className="modal"
      style={{ display: 'block', position: 'fixed' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Update This Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={updateProd}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control defaultValue={props.name} name="name" type="text" onChange={updateValues} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Make</Form.Label>
              <Form.Control defaultValue={props.make} name="make" type="text" placeholder="Make" onChange={updateValues} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Model</Form.Label>
              <Form.Control defaultValue={props.model} name="model" type="text" placeholder="Model" onChange={updateValues} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Year</Form.Label>
              <Form.Control defaultValue={props.year} name="year" type="number" placeholder="Year" onChange={updateValues} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Chasis Number</Form.Label>
              <Form.Control defaultValue={props.chasisNumber} name="chasis" type="number" placeholder="Chasis Number" onChange={updateValues} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image</Form.Label>
              <Form.Control defaultValue={props.image} name="image" type="text" onChange={updateValues} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close Modal</Button>
          <Button variant="warning" type="submit" onClick={updateProd}>Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )
}

export default EditProduct
