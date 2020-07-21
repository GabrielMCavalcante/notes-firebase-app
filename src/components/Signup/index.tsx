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
import emailPlus from '@iconify/icons-mdi/email-plus'
import lockPlus from '@iconify/icons-mdi/lock-plus'

const fields = [{
    label: '',
    name: 'newEmail',
    type: 'email',
    config: { placeholder: 'example@domain.com' },
    validation: /([a-z\d.-]+)@([a-z\d-]+)(\.[a-z]{2,8}(\.[a-z]{2,8})?)/i,
    feedback: 'The email has to be in a valid email format ex.: example@domain.com',
    isValid: false,
    touched: false,
    value: '',
    icon: <Icon icon={emailPlus} />
},
{
    label: '',
    name: 'newPassword',
    type: 'password',
    config: { placeholder: 'abcd1234' },
    validation: /^[a-z0-9]{8,16}$/i,
    feedback: 'The password has to contain 8-16 characters.',
    isValid: false,
    touched: false,
    value: '',
    icon: <Icon icon={lockPlus} />
}]

function Signup(props: any) {
    
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState('')

    function onSignup(fieldsValues: { [key: string]: string }) {
        setLoading(true)
        setFeedback('')
        const userData = {
            email: fieldsValues.newEmail,
            password: fieldsValues.newPassword
        }
        auth.createUserWithEmailAndPassword(userData.email, userData.password)
            .then(() => {
                setLoading(false)
                console.log(props)
                props.history.push('/home/overview')
            })
            .catch(err => {
                setLoading(false)
                setFeedback(err.message)
            })
    }

    return (
        <div className="Signup">
            <h2>Signup</h2>
            <Form
                fields={fields}
                onsubmit={fieldsValues => onSignup(fieldsValues)}
                btnLabel="Signup"
                loading={loading}
            />
            <p className="Feedback">{feedback}</p>
        </div>
    )
}

export default withRouter(Signup)