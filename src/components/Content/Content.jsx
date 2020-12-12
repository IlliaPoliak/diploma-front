import Header from './Header'
import Calculator from './Calculator'
import Footer from './Footer'
import { Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/authReducer'
import History from './History'
import HistoryData from './HistoryData'
import MathModel from './MathModel'
import Welcome from './Welcome'


const Content = props => {

    if (!props.isAuth) {
        return <Redirect to='/auth' />
    }

    return (
        <div className='content_container'>
            <Header logout={props.logout} userRole={props.userRole} />
            
            <main className='main_container'>
                <Switch>
                    <Redirect exact from="/content" to="/content/welcome" />
                    <Route exact path='/content/welcome' render={() => <Welcome />} />
                    <Route exact path='/content/calculator' render={() => <Calculator />} />
                    <Route exact path='/content/math-model' render={() => <MathModel />} />
                    <Route exact path='/content/history' render={() => <History />} />
                    <Route path='/content/history/:id' render={() => <HistoryData />} />

                </Switch>
            </main>
            <Footer />
        </div>
    )
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    userRole: state.auth.user?.role || 'user'
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)