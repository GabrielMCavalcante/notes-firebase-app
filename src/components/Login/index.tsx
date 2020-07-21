import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

// Firebase
import {auth} from 'firebase/init'  

// Components
import Form from 'components/UI/Form'

// CSS styles
import './styles.css'

// Icons
import { Icon } from '@iconify/react'
import lock from '@iconify/icons-mdi/lock'
import email from '@iconify/icons-mdi/email'

const fields = [{
    label: '',
    name: 'email',
    type: 'email',
    config: { placeholder: 'example@domain.com' },
    validation: /([a-z\d.-]+)@([a-z\d-]+)(\.[a-z]{2,8}(\.[a-z]{2,8})?)/i,
    feedback: 'The email has to be in a valid email format ex.: example@domain.com',
    isValid: false,
    touched: false,
    value: '',
    icon: <Icon icon={email} />
},
{
    label: '',
    name: 'password',
    type: 'password',
    config: { placeholder: 'abcd1234' },
    validation: /^[a-z0-9]{8,16}$/i,
    feedback: 'The password has to contain 8-16 characters.',
    isValid: false,
    touched: false,
    value: '',
    icon: <Icon icon={lock} />
}]

function Login(props: any) {

    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState('')

    function onLogin(fieldsValues: { [key: string]: string }) {
        setLoading(true)
        setFeedback('')
        const userData = {
            email: fieldsValues.email,
            password: fieldsValues.password
        }
        auth.signInWithEmailAndPassword(userData.email, userData.password)
            .then(() => {
                setLoading(false)
                props.history.push('/home/overview')
            })
            .catch(() => {
                setLoading(false)
                setFeedback('Your email or password is incorrect, please try again.')
            })
    }

    return (
        <div className="Login">
            <h2>Login</h2>
            <Form
                fields={fields}
                onsubmit={fieldsValues => onLogin(fieldsValues)}
                btnLabel="Login"
                loading={loading}
                resetForm
            />
            <p className="Feedback">{feedback}</p>
        </div>
    )
}

export default withRouter(Login)