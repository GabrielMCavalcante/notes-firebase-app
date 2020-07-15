import React, { useState } from 'react'

// Components
import Login from 'components/Login'
import Signup from 'components/Signup'

// Logo
import logo from 'assets/logo.png'

// CSS styles
import './styles.css'

function Register() {

    const [registerMethod, setRegisterMethod] = useState('login')

    function toggleMethod() {
        setRegisterMethod(registerMethod === 'login' ? 'signup' : 'login')
    }

    return (
        <div className="Register">
            <div className="Content">
                <img src={logo} alt="Logo" />
                {
                    registerMethod === 'login'
                    ? <Login />
                    : <Signup />
                }
                <p className="MethodToggler" onClick={toggleMethod}>
                    {
                        registerMethod === 'login'
                        ? 'I don´t have an account'
                        : 'I have an account'
                    }
                </p>
            </div>
        </div>
    )
}

export default Register