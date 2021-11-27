import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CheckOut from './CheckOut';
const stripePromise = loadStripe('pk_test_51Jwt8cHOALGgwSxT433XoFEANXb4vKtuofCZVysbdmlBId9qUhdC30xbmNTATciurJ6BWIrhzcfAO6cr34WFzlan00iJjBbgnQ');
const Payment = () => {
    const { paymentId } = useParams()
    const [payment, setPayment] = useState({})
    useEffect(() => {
        fetch(`http://localhost:5000/orders/${paymentId}`)
            .then(res => res.json())
            .then(data => setPayment(data))
    }, [paymentId])
    return (
        <div>
            <h1>Payment for: {paymentId}</h1>
            <p>Pay: {payment.price}</p>
            <Elements stripe={stripePromise}
            >
                <CheckOut
                    payment={payment}
                />
            </Elements>
        </div>
    );
};

export default Payment;