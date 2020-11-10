import React, { useEffect } from 'react';
import { Route, withRouter, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import store from '../store/store';

import Auth from './Auth/Auth'
import Content from './Content/Content'
import { checkAuth } from '../store/authReducer';
import { Spinner } from '../assets/icons/icons'


function App(props) {

  useEffect(() => {
    // props.checkAuth()
  }, [])


  return (
    props.initialize
    ? <Spinner />
    : (
    	<Switch>
    		<Redirect exact from="/" to="/auth" />
    		<Route path='/auth' render={() => <Auth />} />
    		<Route path='/content' render={() => <Content />} />

    		<Route path='*' render={() => props.isAuth ? <Content /> : <Redirect to="/auth" />} />
    	</Switch>
    )
  );
}

const AppContainer = compose(
  connect(state => ({
    // isAuth: state.auth.isAuth,
    // loading: state.auth.loading,
    // initialize: state.auth.initialize,

  }),
  { 
    checkAuth 
  }),
  withRouter
)(App)

const AppWithStore = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store} >
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default AppWithStore;
