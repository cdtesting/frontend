'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import Cookie from 'js-cookie'
import { StyledEmail, StyledNav, StyledOrders } from './Cart/Cart.styles'
import { useQuery } from '@apollo/client'
import { GetUserFontOrdersQuery, GetUserFontOrdersQueryVariables } from '@/src/__generated__/graphql'
import { GET_USER_FONT_ORDERS } from '@/graphql/queries'
import { StlyedFontOrder, StyledFontOrdered } from '../checkoutelements/checkoutelements.styles'

const Navigation = () => {

    const { user, setUser } = useAppContext()
    const [showOrders, setShowOrders] = useState(false)

    const handleLogout = () => {
        setUser(null)
        Cookie.remove('token')
    }

    const { data, loading } = useQuery<
        GetUserFontOrdersQuery,
        GetUserFontOrdersQueryVariables
    >(GET_USER_FONT_ORDERS, {
        variables: { userEmail: user?.email! },
    });

    const userFonts = data?.fontOrders?.data

    const showOrder = (e: any) => {
        e.preventDefault()
        setShowOrders(!showOrders)
    }

    return (
        <StyledNav>
            <nav>
                <div className="siteName">
                    <Link href="/">
                        <h1>Moretype</h1>
                    </Link>
                </div>
                <div>
                    {user ? (
                        <>
                            <div>
                                <button onClick={handleLogout}>
                                    Log Out
                                </button>
                                <StyledEmail>
                                    {user.email}
                                </StyledEmail>
                            </div>
                            <StyledOrders>
                                <a href="/" onClick={showOrder}>Orders</a>

                                {showOrders && userFonts &&
                                    <ul>
                                        {
                                            userFonts.map((font: any) => {
                                                return (
                                                    <StlyedFontOrder key={font.id}>
                                                        <p>{font.attributes.createdAt}</p>
                                                        <StyledFontOrdered>
                                                            {font.attributes.fonts.map((font: any) => {
                                                                return (
                                                                    <li key={font.font_name}>{font.font_name}</li>
                                                                )
                                                            })}
                                                        </StyledFontOrdered>
                                                    </StlyedFontOrder>
                                                )
                                            })
                                        }
                                    </ul>
                                }

                            </StyledOrders>
                        </>
                    ) : (
                        <>
                            <div className="headerLinks">
                                <Link href="/login" className="logIn">
                                    Log In
                                </Link>

                                <Link href="/signup">
                                    Sign Up
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </nav >
        </StyledNav >
    )
}

export default Navigation
