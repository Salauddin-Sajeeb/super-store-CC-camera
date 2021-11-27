import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';


const CheckOut = ({ payment }) => {
    const { price, _id, name, email } = payment;
    const stripe = useStripe()
    const elements = useElements()

    const [clientSecret, setClientSecret] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))


    }, [price])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log(error)
        }
        else {
            console.log(paymentMethod)
        }

        //payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );
        if (intentError) {
            console.log(intentError.message)
        }
        else {
            setSuccess('Your payment processed successfully.')
            console.log(paymentIntent)
            //save to database

            const url = `http://localhost:5000/orders/${_id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    payment: {
                        amount: paymentIntent.amount,

                        created: paymentIntent.created,
                    }
                })
            })
                .then(res => res.json())
                .then(data => console.log(data))

        }


    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe || success} >
                    Pay ${price}
                </button>
            </form>
            {
                success && <p style={{ color: 'green' }}>{success}</p>
            }
        </div>
    );
};

export default CheckOut;