import { NavLink } from "react-router-dom"


const Header = props => {

    return (
        <header>
            <div className='header_wrapper'>
                <span className='logo_title'>ПДТУ</span>
                <div className='links_wrapper'>
                    <NavLink
                        exact
                        to="/content"
                        className="navbar_link"
                        activeClassName='router_link_active'
                    >
                        Головна
                    </NavLink>
                    <NavLink
                        to="/content/history"
                        className="navbar_link"
                        activeClassName='router_link_active'
                    >
                        Історія
                    </NavLink>

                    {props.userRole === 'admin' &&
                        <NavLink
                            to="/admin"
                            className="navbar_link"
                            activeClassName='router_link_active'
                        >
                            Admin
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