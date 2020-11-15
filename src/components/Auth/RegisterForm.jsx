import { useState } from 'react'
import { connect } from 'react-redux'
import { validateConfirmPassword, validateEmail, validateInput, validatePassword } from '../../utils/validation'
import './Auth.css'
import {registrate} from '../../store/authReducer'


const RegisterForm = props => {

    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')

    const onChangeNameText = e => setName(e.currentTarget.value)
    const onChangeEmailText = e => setEmail(e.currentTarget.value)
    const onChangePasswordText = e => setPassword(e.currentTarget.value)
    const onChangeConfirmPasswordText = e => setConfirmPassword(e.currentTarget.value)

    const registrate = e => {
        e.preventDefault()

        if (!validateInput(name)){
            console.log('err')
        } else if (!validateEmail(email)){
            console.log('err')
        } else if (!validatePassword(password)){
            console.log('err')
        } else if (!validateConfirmPassword(password, confirmPassword)) {
            console.log('err')
        } else {
            props.registrate(name, email, password)
        }
    }


    return (
        <div className='auth-block'>
            <h2 className='auth-title'>Реєстрація</h2>

            <input type='text' value={name} placeholder="Ім'я" onChange={onChangeNameText} className='auth-input' />
            <input type='email' value={email} placeholder='Email' onChange={onChangeEmailText} className='auth-input' />
            <input type='password' value={password} placeholder='Пароль' onChange={onChangePasswordText} className='auth-input' />
            <input type='password' value={confirmPassword} placeholder='Повторіть пароль' onChange={onChangeConfirmPasswordText} className='auth-input' />

            <button onClick={registrate} type='submit' className='auth-btn'>Зареєструватися</button>

            <span className='reg-span' onClick={props.changeForm}>Увійти</span>
        </div>
    )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {
    registrate
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)