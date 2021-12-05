import { NavLink } from 'react-router-dom';


const GuestNavigation = () => {
    return (
        <>
            <li>
                <NavLink to="/recipes" exact activeClassName="active">Recipes</NavLink>
            </li>
            <li>
                <NavLink to="/sign-in" activeClassName="active">Sign In</NavLink>
            </li>
            <li>
                <NavLink to="/sign-up" activeClassName="active">Sign Up</NavLink>
            </li>
        </>
    );
}

export default GuestNavigation;
