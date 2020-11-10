import { useState } from 'react'
import './Auth.css'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'


const Auth = props => {

    let [visibleLoginForm, setVisibleLoginForm] = useState(true)

    const changeForm = () => setVisibleLoginForm(!visibleLoginForm)

    return (
        <div className='auth-container'>
            {
                visibleLoginForm
                ? <LoginForm changeForm={changeForm} />
                : <RegisterForm changeForm={changeForm} />
            }

        </div>
    )
}

export default Auth