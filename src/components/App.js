import React, { useEffect, useState } from 'react';
import { Route, withRouter, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Provider, connect } from 'react-redux';
import store from '../store/store';

import Auth from './Auth/Auth'
import Content from './Content/Content'
import { checkAuth } from '../store/authReducer';
import { Spinner } from './common/Spinner';


function App(props) {
	const [loading, setLoading] = useState(false)

	const loadData = async () => {
		setLoading(true)
		await props.checkAuth()
		setLoading(false)
	}

	useEffect(() => {
		loadData()
	}, [])


	return (
		loading
			? <Spinner />
			: (
				<Switch>
					<Redirect exact from="/" to="/content" />
					<Route path='/auth' render={() => <Auth isAuth={props.is} />} />
					<Route path='/content' render={() => <Content />} />

					<Route path='*' render={() => props.isAuth ? <Content /> : <Redirect to="/auth" />} />
				</Switch>
			)
	);
}

const mapStateToProps = state => ({
	isAuth: state.auth.isAuth,
})

const mapDispatchToProps = {
    checkAuth
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
