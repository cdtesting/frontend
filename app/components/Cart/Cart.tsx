'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { centsToPounds } from '@/utils/centsToDollars'
import { CartItemStyles, CartStyles } from '../compent.styles'
import { useAppContext } from '@/app/context/AppContext'
import { StyledCartFormats } from './Cart.styles'

const CartItem = ({ data }: any) => {
    const { removeItem, singleWeightPrice } = useAppContext();
    const { attributes } = data;
    return (
        <CartItemStyles>
            <div>
                {data && (
                    <>
                        <div>
                            {data.font_name} x {singleWeightPrice}
                        </div>
                    </>
                )}
            </div>
            <div>
                <button onClick={() => removeItem(data)}>
                    Remove
                </button>
            </div>
        </CartItemStyles>
    );
}

export const Cart = () => {
    const router = useRouter()
    const { user, cart, showCart, setShowCart, cartDesktop, cartWeb, cartApp, cartBroadcast } = useAppContext()
    const total = cart.total;

    const loginRedirect = () => {
        router.push('/login')
    }

    const cartRedirect = () => {
        setShowCart(false)
        router.push('/checkout')
    }
    return (
        <CartStyles>
            <div>
                {/* <button onClick={() => setShowCart((prevState: any) => !prevState)}> */}
                <button onClick={() => setShowCart(true)}>
                    Cart
                </button>
                {showCart && (
                    <div>
                        <div>
                            {cartDesktop &&
                                <StyledCartFormats>
                                <h4>Licence formats</h4>
                                {cartDesktop &&
                                    <div>
                                        <span>Desktop:</span> {cartDesktop}
                                    </div>
                                }
                                {cartWeb &&
                                    <div>
                                        <span>Web:</span> {cartWeb}
                                    </div>
                                }
                                {cartApp &&
                                    <div>
                                        <span>App:</span> {cartApp}
                                    </div>
                                }
                                {cartBroadcast &&
                                    <div>
                                        <span>Broadcast:</span> {cartBroadcast}
                                    </div>
                                }
                                </StyledCartFormats>
                            }
                            
                            <ul>
                                {cart.items.map((item, index) => {
                                    // if (item.quantity > 0) {
                                        return <CartItem key={index} data={item} />;
                                    // }
                                    return (
                                        <CartItem key={index} data={item} />
                                    )
                                })}
                            </ul>
                            <p>Total: {centsToPounds(total)}</p>
                        </div>
                        <div>
                            <span>Order Total</span>
                            <span>{centsToPounds(total)}</span>
                        </div>
                        <button onClick={() => (user ? cartRedirect() : loginRedirect())}>
                            {user ? "Continue to Pay" : "Login to Order"}
                        </button>
                    </div>
                )}
            </div>
        </CartStyles>
    )
}

export default Cart