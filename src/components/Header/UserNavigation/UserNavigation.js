import { Link, NavLink } from 'react-router-dom';


const UserNavigation = ({
    userProfile
}) => {
    return (
        userProfile.displayName
            ?
            <>
                <li className="user-info-list-item">
                    Signed in as <span className="user-info">{userProfile.displayName}</span>
                </li>
                <li>
                    <NavLink to={`/users/${userProfile.userUID}/recipes`} exact activeClassName="active">My Recipes</NavLink>
                </li>
                <li>
                    <NavLink to={`/users/${userProfile.userUID}/recipes/liked`} exact activeClassName="active">Liked Recipes</NavLink>
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
