'use client'
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import { useInitialRender } from "@/utils/useInitialRender";
import { Elements } from '@stripe/react-stripe-js';
import CheckOutElements from '../checkoutelements/page';


const stripePromise = loadStripe('pk_test_51HkHcCFkImA5M2VmSZC1rjcQ404geMGdXbmdp7wC1qLqWfg0n6N1aECcdjvkMFrb83d5pyrPK9dx1MH5iEeNiDLC00jlFpz0yz'); // Replace with your actual publishable key

const Checkout = () => {

    const initialRender = useInitialRender()

    if (!initialRender) return null;

    return (
        <section>
            <div>
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckOutElements />
                    </Elements>
                </div>
            </div>
        </section>
    )
}

export default Checkout