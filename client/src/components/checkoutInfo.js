import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CheckoutInfo() {
    const cartString = sessionStorage.getItem('cart');
    const cartArray = JSON.parse(cartString);

    const [user, setUser] = useState();
    const [userEmail, setUserEmail] = useState();
    const [date, setDate] = useState();
    const [amount, setAmount] = useState();

    const handleClear = (e) => {
        e.preventDefault();
        sessionStorage.removeItem('cart')
        alert("Cart cleared.")
        window.location = "/cart"
    };

    // Creates the invoice
    const invoice = () => {
        const order = sessionStorage.getItem('cart')
        setDate(new Date())

        const payload = {
            user: userName,
            products: order
        }

        axios.post('http://localhost:5002/api/invoices', payload)
            .then(result => console.log(result))
            .catch(err => console.log(err))
        alert('Order Placed!')
    }


    if (cartArray == undefined || cartArray[0] == null) {
        return (
            <div>
                <section class="h-100 gradient-custom">
                    <div class="container py-5">
                        <div class="row d-flex justify-content-center my-4">
                            <div class="col-md-8">
                                <div class="card mb-4">
                                    <div class="card-header py-3">
                                        <h5 class="mb-0">Cart</h5>
                                    </div>

                                    <h2> Cart is empty </h2>

                                </div>

                                <div class="card mb-4 mb-lg-0">
                                    <div class="card-body">
                                        <p><strong>We accept</strong></p>
                                        <img class="me-2" width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                            alt="Visa" />
                                        <img class="me-2" width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                            alt="American Express" />
                                        <img class="me-2" width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                            alt="Mastercard" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    } else {
        const leCartLmao = cartArray.map((carts) => (
            <div class="card-body">
                {/* single item */}
                <div class="row">
                    <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        {/* <!-- Image --> */}
                        <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                            <img src={carts.image}
                                class="w-100" alt={carts.name} />
                            <a href="#!">
                                <div class="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                            </a>
                        </div>
                        {/* <!-- Image --> */}
                    </div>

                    <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        {/* <!-- Data --> */}
                        <p><strong>{carts.name}</strong></p>
                        <p>{carts.category}</p>
                        {/* <!-- Data --> */}
                    </div>

                    <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        {/* <!-- Quantity --> */}
                        <div class="d-flex mb-4" style={{ maxWidth: '300px' }}>
                            <button class="btn btn-primary px-3 me-2"
                                onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                -
                                <i class="fas fa-minus"></i>
                            </button>

                            <div class="form-outline">
                                <input id="form1" min="0" name="quantity" value="1" type="number" class="form-control" />
                                <label class="form-label" for="form1">Quantity</label>
                            </div>

                            <button class="btn btn-primary px-3 ms-2"
                                onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                +
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {/* <!-- Single item --> */}


                <hr class="my-4" />
            </div>
        ))

        return (
            <div>
                <section class="h-100 gradient-custom">
                    <div class="container py-5">
                        <div class="row d-flex justify-content-center my-4">
                            <div class="col-md-8">
                                <div class="card mb-4">
                                    <div class="card-header py-3">
                                        <h5 class="mb-0">Cart</h5>
                                    </div>
                                    {leCartLmao}
                                    <button type="button" class="btn btn-danger btn-sm me-1 mb-2" onClick={handleClear}> Clear cart </button>
                                    <button type="button" class="btn btn-primary btn-sm me-1 mb-2" onClick={invoice}> Checkout </button>
                                </div>

                                <div class="card mb-4 mb-lg-0">
                                    <div class="card-body">
                                        <p><strong>We accept</strong></p>
                                        <img class="me-2" width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                            alt="Visa" />
                                        <img class="me-2" width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                            alt="American Express" />
                                        <img class="me-2" width="45px"
                                            src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                            alt="Mastercard" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

}

export default CheckoutInfo