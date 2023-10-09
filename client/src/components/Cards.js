import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom'
import EditProduct from '../components/EditProduct'

const Cards = (props) => {

    const [modelArea, setModel] = useState()

    let navigate = useNavigate();

    const toProduct = () => {
        sessionStorage.setItem('productId', props.productId)
        navigate('/ProductPage')
    }

    const edit = () => {
        setModel(<EditProduct
            close={setModel}
            id={props.productId}
            name={props.name}
            make={props.make}
            model={props.model}
            chasisNumber={props.chasisNumber}
            year={props.year}
            image={props.image}
            editRender={props.editRender}
        />)
    }

    const deleteItem = () => {
        console.log(props.productId)

        if (window.confirm("Are you sure you want to delete: " + props.name) === true) {

            axios.delete('http://localhost:5002/api/deletePart/' + props.productId)
                .then((res) => {
                    console.log('item Deleted')
                    // alert(props.name + ", is deleted")
                    props.editRender(true)
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <div className="col">
            <div className="card h-100" >
                <img variant="top" src={props.image} />
                <div className='card-header' style={{ background: "white", height: "50%" }}>
                    <h5 name="name" className="card-title">{props.name}</h5>
                </div>
                <div className="card-body">
                    <h3>{props.make}</h3>
                    <p className="card-text">Model: {props.model}</p>
                </div>
                <div className='card-footer' style={{ background: "white" }}>
                    <Button id="btnUpdate" onClick={edit} style={{ margin: "2%" }}>Update</Button>
                    <Button id="btnDelete" variant="danger" onClick={deleteItem} style={{ margin: "2%" }}>Delete</Button>
                </div>
                {modelArea}
            </div>
        </div>
    )
}

export default Cards;