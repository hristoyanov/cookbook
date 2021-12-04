import { NavLink } from 'react-router-dom';


const GuestNavigation = () => {
    return (
        <ul className="page-header-nav-links-list">
            <li>
                <NavLink to="/sign-up" activeClassName="active">Sign Up</NavLink>
            </li>
            <li>
                <NavLink to="/sign-in" activeClassName="active">Sign In</NavLink>
            </li>
        </ul>
    );
}

export default GuestNavigation;
