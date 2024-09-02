import React from 'react'

interface FormData {
    email: string
    password: string
}

interface FormProps {
    title: string
    callback: () => void
    setFormData: (data: FormData) => void
    formData: FormData
    // error: Error
    buttonText: string
}

const Form = ({ title, callback, setFormData, formData, buttonText }: FormProps) => {
    return (
        <section>
            <h3>{title}</h3>
            <div>
                <form onSubmit={callback}>
                    <div>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="**********"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button>
                        {buttonText}
                    </button>
                    {/* {error && (
                        <div>
                            Error: {error.message}
                        </div>
                    )} */}
                </form>
            </div>
        </section>
    )
}

export default Form