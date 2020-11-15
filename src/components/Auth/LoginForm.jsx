import { useState } from 'react'
import { connect } from 'react-redux'
import { validateEmail, validatePassword } from '../../utils/validation'
import './Auth.css'
import {login} from '../../store/authReducer'


const LoginForm = props => {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    const onChangeEmailText = e => {
        setEmail(e.currentTarget.value)
    }

    const onChangePasswordText = e => {
        setPassword(e.currentTarget.value)
    }

    const login = e => {
        e.preventDefault()

        if (!validateEmail(email)){
            console.log('err')
        } else if (!validatePassword(password)){
            console.log('err')
        } else {
            props.login(email, password)
        }
    }


    return (
        <div className='auth-block'>
            <h2 className='auth-title'>Авторизація</h2>

            <input type='email' value={email} placeholder='Email' onChange={onChangeEmailText} className='auth-input' />
            <input type='password' value={password} placeholder='Пароль' onChange={onChangePasswordText} className='auth-input' />

            <button onClick={login} type='submit' className='auth-btn'>Увійти</button>

            <span className='reg-span' onClick={props.changeForm}>Зареєструватися</span>
        </div>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)