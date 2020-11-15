import React, { useEffect, useRef, useState } from 'react';
import { Route, withRouter, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import store from '../store/store';
import './App.css'
import Auth from './Auth/Auth'
import Content from './Content/Content'
import { checkAuth } from '../store/authReducer';
import { setError, setMessage } from '../store/appReducer';
import { Spinner } from './common/Spinner';
import AdminPanel from './AdminPanel/AdminPanel';
import Notification from '../components/common/Notification/Notification';


function App(props) {
	const notificationRef = useRef()
	const [loading, setLoading] = useState(false)

	const loadData = async () => {
		setLoading(true)
		await props.checkAuth()
		setLoading(false)
	}

	useEffect(() => {
		loadData()
	}, [])

	const showNotification = () => {
		setTimeout(() => {
			notificationRef.current.style.opacity = 0
			props.setMessage('')
			props.setError('')
		}, 2000)
	}

	useEffect(() => {
		if (props.message || props.error) showNotification()
	}, [props.message, props.error])


	return (
		<>
			{loading
				? <Spinner />
				: (
					<Switch>
						<Redirect exact from="/" to="/auth" />
						<Route path='/auth' render={() => <Auth isAuth={props.isAuth} />} />
						<Route path='/content' render={() => <Content />} />
						<Route path='/admin' render={() => <AdminPanel />} />

						<Route path='*' render={() => props.isAuth ? <Content /> : <Redirect to="/auth" />} />
					</Switch>
				)}
			<Notification ref={notificationRef} text={props.message || props.error} status={props.error ? 'error' : 'success'} />
		</>
	);
}

const mapStateToProps = state => ({
	isAuth: state.auth.isAuth,
	initialize: state.app.initialize,
	error: state.app.error,
	message: state.app.message,
})

const mapDispatchToProps = {
	checkAuth,
	setMessage,
	setError
}

const AppContainer = compose(
	connect(mapStateToProps, mapDispatchToProps),
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
