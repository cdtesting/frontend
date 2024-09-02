'use client'
import React, { useState } from 'react'
import Form from '../components/Form'
import { useMutation } from '@apollo/client'
import { LOGIN } from '@/graphql/queries'
import { LoginMutation, LoginMutationVariables } from '@/src/__generated__/graphql'
import { useAppContext } from '../context/AppContext'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

const Login = () => {
    const { setUser } = useAppContext()
    const router = useRouter()

    const [formData, setFormData] = useState({ email: '', password: '' })
    const [loginMutation, { loading, error }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN)

    const handelLogin = async () => {
        const { email, password } = formData
        const { data } = await loginMutation({
            variables: { idenifier: email, password: password }
        })
        if (data?.login && data.login.user && data.login.jwt) {
            setUser({ email: data.login.user.username, password: '', username: '' })
            Cookie.set('token', data.login.jwt)
            router.push("/")
        }
    }

    if (loading) return <h1>Loading</h1>

    return (
        <Form
            title="Login"
            buttonText='Login'
            formData={formData}
            setFormData={setFormData}
            callback={handelLogin}
        // error={error}
        />
    )
}

export default Login