"use client"
import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAppContext } from '../context/AppContext';
import { useMutation } from '@apollo/client';
import { CreateFontOrderMutation, CreateFontOrderMutationVariables } from '@/src/__generated__/graphql';
import { CREATE_ORDER } from '@/graphql/queries';
import { StyledSuccess } from './checkoutelements.styles';

const stripePromise = loadStripe('pk_test_51HkHcCFkImA5M2VmSZC1rjcQ404geMGdXbmdp7wC1qLqWfg0n6N1aECcdjvkMFrb83d5pyrPK9dx1MH5iEeNiDLC00jlFpz0yz'); // Replace with your actual publishable key

// Define the function outside the component to avoid re-declaration
const calculateSingleWeightPrice = (item: any) => {
    // Implement your logic to calculate singleWeightPrice
    return item.price; // Example: using price as singleWeightPrice
};

const CheckOutElements = () => {
    const { cart } = useAppContext();
    const stripe = useStripe();
    const elements = useElements();

    const [total, setTotal] = useState('loading');
    const [btnClicked, setBtnClicked] = useState(false);
    const [success, setSuccess] = useState(false);
    const [registerMutation, { loading, error }] = useMutation<CreateFontOrderMutation, CreateFontOrderMutationVariables>(CREATE_ORDER);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const cardElement = elements?.getElement(CardElement);

        if (!stripe || !cardElement) {
            console.error('Stripe or CardElement not loaded');
            return;
        }

        try {
            const cartWithPrices = cart.items.map(item => ({
                ...item,
                // singleWeightPrice: calculateSingleWeightPrice(item) // Calculate or ensure the singleWeightPrice is correct
            }));

            const response = await fetch('http://localhost:1337/api/orders/payment', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cartWithPrices,
                    completeCart: cart
                })
            });

            const data = await response.json();

            if (data.error) {
                console.error('Backend error:', data.message);
                return;
            }

            if (!data.paymentIntent || !data.paymentIntent.client_secret) {
                console.error('Invalid paymentIntent response:', data);
                return;
            }

            // Confirm the card payment
            const result = await stripe.confirmCardPayment(data.paymentIntent.client_secret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: 'Chris',
                        email: 'chris@moretype.co.uk'
                    }
                }
            });

            if (result.error) {
                console.error('Payment confirmation error:', result.error.message);
                return;
            }

            console.log('---cartcart---', cart)

            if (result.paymentIntent?.status === 'succeeded') {
                setSuccess(true);
                registerMutation({
                    variables: {
                        data: {
                            amount: result.paymentIntent.amount,
                            token: result.paymentIntent.id,
                            fonts: cart.items,
                            user: cart.items[0].user.email
                        }
                    }
                });
            } else {
                console.error('Payment not successful:', result.paymentIntent?.status);
            }

        } catch (error) {
            console.error('Error during payment confirmation:', error);
        }
    };

    const handleClick = () => {
        setBtnClicked(true);
    };

    return (
        <div>
            <h3>Total: {total}</h3>
            <form onSubmit={handleSubmit}>
                <CardElement options={{ hidePostalCode: true }} />
                <button onClick={handleClick}>Buy It</button>
                {success &&
                    <StyledSuccess>
                        <h4>Thank you for your order of</h4>
                        <ul>
                            {cart.items.map((item) => (
                                <li key={item.font_name}>
                                    {item.font_name}
                                </li>
                            ))}
                        </ul>
                    </StyledSuccess>
                }
            </form>
        </div>
    );
};

// Wrap the CheckOutElements component in the Elements provider
const WrappedCheckOutElements = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckOutElements />
        </Elements>
    );
};

export default WrappedCheckOutElements;
