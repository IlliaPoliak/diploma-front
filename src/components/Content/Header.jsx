import { NavLink } from "react-router-dom"


const Header = props => {

    return (
        <header>
            <div className='header_wrapper'>
                <span className='logo_title'>ПДТУ</span>
                <div className='links_wrapper'>
                    <NavLink
                        exact
                        to="/content/welcome"
                        className="navbar_link"
                        activeClassName='router_link_active'
                    >
                        Головна
                    </NavLink>
                    <NavLink
                        exact
                        to="/content/calculator"
                        className="navbar_link"
                        activeClassName='router_link_active'
                    >
                        Розрахувати
                    </NavLink>
                    <NavLink
                        to="/content/history"
                        className="navbar_link"
                        activeClassName='router_link_active'
                    >
                        Історія
                    </NavLink>
                    <NavLink
                        to="/content/math-model"
                        className="navbar_link"
                        activeClassName='router_link_active'
                    >
                        Математична модель
                    </NavLink>

                    {props.userRole === 'admin' &&
                        <NavLink
                            to="/admin"
                            className="navbar_link"
                            activeClassName='router_link_active'
                        >
                            Панель керування
                        </NavLink>
                    }

                    <div
                        className='navbar_link'
                        onClick={props.logout}
                    >
                        Вихід
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header