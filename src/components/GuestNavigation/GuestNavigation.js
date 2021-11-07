import { Link, NavLink } from 'react-router-dom';

const GuestNavigation = () => {
    return (
        <ul className="page-header-nav-links-list">
            <li>
                <NavLink to="/register">Register</NavLink>
            </li>
            <li>
                <NavLink to="#">Sign In</NavLink>
            </li>
        </ul>
    );
}

export default GuestNavigation;
