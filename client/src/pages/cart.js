import React from "react";
import Navbarz from "../components/navbar"
import CheckoutInfo from "../components/checkoutInfo";

function Checkout (){
    return(
        <div>
            <Navbarz />
            <CheckoutInfo />
            <div style={{marginLeft: '30%'}}>
            <div id="paymentinfo" style={{width: "40%"}}>
                <h1> Payment Details: </h1>
                <label class="form-label" for="form1">Card Number</label>
                <input min="0" placeholder='XXXX-XXXX-XXXX' type="number" class="form-control"/>

                <label class="form-label" for="form1">Expiration date</label>
                <input min="0" type="text" class="form-control"/>

                <label class="form-label" for="form1">CVV</label>
                <input min="0" placeholder='XXX' type="number" class="form-control"/>

                <label class="form-label" for="form1">Card Holder name</label>
                <input min="0" placeholder='John Arbuckle' type="text" class="form-control"/>
            </div>
            </div>
        </div>
    )
}
export default Checkout