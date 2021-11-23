import { Link, NavLink } from 'react-router-dom';

const UserNavigation = ({
    user
}) => {
    return (
        user && user.email
            ?
            <ul className="page-header-nav-links-list">
                <li>
                    Signed in as <span className="user-info">{user.email}</span>
                </li>
                <li>
                    <NavLink to={`/users/${user.uid}/recipes`} activeClassName="active">My Recipes</NavLink>
                </li>
                <li>
                    <NavLink to="/recipes/add" activeClassName="active">Add Recipe</NavLink>
                </li>
                <li>
                    <Link to="/sign-out">Sign Out</Link>
                </li>
            </ul>
            :
            null
    );
}

export default UserNavigation;
