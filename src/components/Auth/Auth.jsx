import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'


const Auth = props => {

    let [visibleLoginForm, setVisibleLoginForm] = useState(true)

    const changeForm = () => setVisibleLoginForm(!visibleLoginForm)

    if (props.isAuth) {
        return <Redirect to='/content' />
	} 

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