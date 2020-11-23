import Header from './Header'
import Calculator from './Calculator'
import Footer from './Footer'
import { Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../store/authReducer'
import History from './History'
import HistoryData from './HistoryData'


const Content = props => {

    if (!props.isAuth) {
        return <Redirect to='/auth' />
    }

    return (
        <div className='content_container'>
            <Header logout={props.logout} userRole={props.userRole} />
            
            <main className='main_container'>
                <Switch>
                    <Route exact path='/content' render={() => <Calculator />} />
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