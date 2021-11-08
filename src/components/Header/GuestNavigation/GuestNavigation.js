import { NavLink } from 'react-router-dom';

const GuestNavigation = () => {
    return (
        <ul className="page-header-nav-links-list">
            <li>
                <NavLink to="/sign-up">Sign Up</NavLink>
            </li>
            <li>
                <NavLink to="/sign-in">Sign In</NavLink>
            </li>
        </ul>
    );
}

export default GuestNavigation;
