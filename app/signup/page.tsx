'use client'
import React, { useState } from 'react'
import Form from '../components/Form'
import { REGISTER_MUTATION } from '@/graphql/queries'
import { useMutation } from '@apollo/client'
import { RegisterMutation, RegisterMutationVariables } from '@/src/__generated__/graphql'
import { useAppContext } from '../context/AppContext'
import Cookie from 'js-cookie'

const SignUp = () => {

    const { setUser } = useAppContext()

    const [formData, setFormData] = useState({ email: '', password: '' })
    const [registerMutation, { loading, error }] = useMutation<RegisterMutation, RegisterMutationVariables>(REGISTER_MUTATION)

    const handleRegister = async () => {
        const { email, password } = formData
        const { data } = await registerMutation({
            variables: {
                username: email, email, password
            }
        })
        if (data?.register.user.username) {
            setUser({ email: data.register.user.username, password: '', username: '' })
            Cookie.set('token', data.register.jwt ?? '')
        }

    }

    return (
        <>
            <Form
                title="Sign Up"
                buttonText="Sign Up"
                formData={formData}
                setFormData={setFormData}
                callback={handleRegister}
            // error={error}
            />
        </>
    )
}

export default SignUp