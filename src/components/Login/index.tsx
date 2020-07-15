import React from 'react'

// Icons
import { MdEmail, MdLock } from 'react-icons/md'

// CSS styles
import './styles.css'

function Login() {
    return (
        <div className="Login">
            <h2>Login</h2>
            <form>
                <div className="Field">
                    <MdEmail />
                    <input name="email" type="text" />
                    <label htmlFor="email" className="label-email">
                        <span className="label-content">Your Email</span>
                    </label>
                </div>
                <div className="Field">
                    <MdLock />
                    <input name="password" type="password" />
                    <label htmlFor="password" className="label-password">
                        <span className="label-content">Your Password</span>
                    </label>
                </div>
            </form>
        </div>
    )
}

export default Login