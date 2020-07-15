import React, { useState } from 'react'

// Components
import Login from 'components/Login'
import Signup from 'components/Signup'

// Logo
import logo from 'assets/logo.png'

// CSS styles
import './styles.css'

function Register() {

    const [method, setMethod] = useState<"Login" | "Signup">("Login")

    function toggleMethod() {
        const newMethod = method === 'Login' ? 'Signup' : 'Login'
        setMethod(newMethod)
    }

    return (
        <div className="Register">
            <div className="Content">
                <img src={logo} alt="Logo" />
                {method === 'Login' ? <Login /> : <Signup />}
                <p className="MethodToggler" onClick={toggleMethod}>
                    {
                        method === 'Login'
                            ? 'I don´t have an account'
                            : 'I have an account'
                    }
                </p>
            </div>
        </div>
    )
}

export default Register