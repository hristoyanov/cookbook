import { Link, NavLink } from 'react-router-dom';

const UserNavigation = (props) => {
    return (
        <ul className="page-header-nav-links-list">
            <li>
                Signed in as <span className="user-info">{props.user.email}</span>
            </li>
            <li>
                <NavLink to="#">My Recipes</NavLink>
            </li>
            <li>
                <NavLink to="/recipes/add">Add Recipe</NavLink>
            </li>
            <li>
                <Link to="/logout">Sign Out</Link>
            </li>
        </ul>
    );
}

export default UserNavigation;
