import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export const withAuthRedirect = Component => {
    const RedirectComponent = props => {
        return !props.isAuth ? <Redirect to='/login' /> : <Component {...props} />
    }

    return connect(state => ({ isAuth: state.auth.isAuth }))(RedirectComponent);
}