import React, { useState, useEffect } from 'react'

// Components
import Form from 'components/UI/Form'

// Firebase
import { auth, database } from 'firebase/init'

// Icons
import { Icon } from '@iconify/react' 
import lock from '@iconify/icons-mdi/lock'
import email from '@iconify/icons-mdi/email'
import emailPlus from '@iconify/icons-mdi/email-plus'
import lockPlus from '@iconify/icons-mdi/lock-plus'

// CSS styles
import './styles.css'

function Register(props: any) {

    const [method, setMethod] = useState<"Login" | "Signup">("Login")
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState('')
    const [fields, setFields] = useState([{
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
    }])

    function toggleMethod() {
        const newMethod = method === 'Login' ? 'Signup' : 'Login'
        setFeedback('')
        setMethod(newMethod)
    }

    useEffect(() => {
        const newFields = [...fields]
        newFields.forEach(field => {
            field.icon = <Icon icon={method === 'Login' 
            ? field.name === 'email' ? email : lock 
            : field.name === 'email' ? emailPlus : lockPlus} />
        })
        setFields(newFields)
    }, [method]) // eslint-disable-line

    function onRegisterAction(fieldsValues: { [key: string]: string }) {
        setLoading(true)
        setFeedback('')
        const userData = {
            email: fieldsValues.email,
            password: fieldsValues.password
        }
        if (method === 'Login') {
            auth.signInWithEmailAndPassword(userData.email, userData.password)
                .then(() => {
                    setLoading(false)
                    props.history.push('/home/overview')
                })
                .catch(() => {
                    setLoading(false)
                    setFeedback('Your email or password is incorrect, please try again.')
                })
        } else {
            auth.createUserWithEmailAndPassword(userData.email, userData.password)
                .then(res => {
                    const userId = res.user?.uid
                    database.collection('users').doc(userId).set({ notes: [], trash: [] })
                        .then(() => {
                            setLoading(false)
                            props.history.push('/home/overview')
                        })
                        .catch(err => {
                            setLoading(false)
                            setFeedback(err.message)
                        })
                })
                .catch(err => {
                    setLoading(false)
                    setFeedback(err.message)
                })
        }
    }

    return (
        <div className="Register">
            <div className="Content">
                <div className="Logo"></div>
                <div className="RegisterForm">
                    <h2>{method}</h2>
                    <Form
                        fields={fields}
                        onsubmit={fieldsValues => onRegisterAction(fieldsValues)}
                        btnLabel={method}
                        loading={loading}
                        resetForm
                    />
                    <p className="Feedback">{feedback}</p>
                </div>
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