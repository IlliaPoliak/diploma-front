import { connect } from 'react-redux'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import { logout } from '../../store/authReducer'
import UsersList from './UsersList'
import UsersHistory from './UsersHistory'
import { MdArrowBack } from "react-icons/md";

const AdminPanel = props => {


    if (!props.isAuth) {
        return <Redirect to='/auth' />
    }

    return (
        <div className='admin_container'>
            <aside className='aside'>
                <div className='admin_links_wrapper'>
                    <div className='admin_menu_title'>
                        Меню
                    </div>
                    <NavLink
                        exact
                        to="/admin/users"
                        className="aside_link"
                        activeClassName='aside_link_active'
                    >
                        Користувачі
                        </NavLink>
                    <NavLink
                        to="/admin/users/history"
                        className="aside_link"
                        activeClassName='aside_link_active'
                    >
                        Історії
                    </NavLink>

                </div>
                <NavLink
                    to="/content"
                    className="aside_link"
                    activeClassName='aside_link_active'
                >
                    <MdArrowBack /> Повернутися
                </NavLink>
                <div
                    className='aside_link exit'
                    onClick={props.logout}
                >
                    Вихід
                </div>
            </aside>

            <main className='main_admin'>
                <Switch>
                    <Redirect exact from="/admin/" to="/admin/users" />
                    <Route exact path='/admin/users' render={() => <UsersList />} />
                    <Route path='/admin/users/history' render={() => <UsersHistory />} />
                </Switch>
            </main>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)