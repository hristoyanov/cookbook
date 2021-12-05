import { Link, NavLink } from 'react-router-dom';


const UserNavigation = ({
    user
}) => {
    return (
        user && user.email
            ?
            <>
                <li>
                    Signed in as <span className="user-info">{user.email}</span>
                </li>
                <li>
                    <NavLink to={`/users/${user.uid}/recipes`} exact activeClassName="active">My Recipes</NavLink>
                </li>
                <li>
                    <NavLink to={`/users/${user.uid}/recipes/liked`} exact activeClassName="active">Liked Recipes</NavLink>
                </li>
                <li>
                    <NavLink to="/recipes/add" exact activeClassName="active">Add Recipe</NavLink>
                </li>
                <li>
                    <NavLink to="/recipes" exact activeClassName="active">Recipes</NavLink>
                </li>
                <li>
                    <Link to="/sign-out">Sign Out</Link>
                </li>
            </>
            :
            null
    );
}

export default UserNavigation;
