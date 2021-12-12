import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import { getUserProfile, getUserRecipes } from '../../services/services';
import RecipeCard from '../RecipeCard/RecipeCard';
import recipeFilter from '../../utils/recipeFilter';

import './UserProfilePage.css';


const UserProfilePage = ({ match }) => {
    const user = useAuthContext();

    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [filteredBy, setFilteredBy] = useState('all');
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        getUserProfile(match.params.id)
            .then(res => {
                setUserProfile(res);
            })
            .catch(error => console.log(error));

        if (user && user.uid === match.params.id) {
            getUserRecipes(match.params.id)
                .then(res => {
                    setRecipes(res);
                    setFilteredRecipes(res);
                })
                .catch(error => console.log(error));
        } else {
            getUserRecipes(match.params.id, true)
                .then(res => {
                    setRecipes(res);
                    setFilteredRecipes(res);
                })
                .catch(error => console.log(error));
        }
    }, [match.params.id]);

    const onFilterButtonClick = (filterBy) => {
        if (filterBy === 'public') {
            setFilteredRecipes(recipeFilter(recipes, 'public'));
            setFilteredBy('public');
        } else if (filterBy === 'private') {
            setFilteredRecipes(recipeFilter(recipes, 'private'));
            setFilteredBy('private');
        } else {
            setFilteredRecipes(recipes);
            setFilteredBy('all');
        }
    }

    return (
        userProfile.displayName
            ?
            <section className="user-recipes">
                {user && user.uid === match.params.id
                    ?
                    <div className="filter-section">
                        <button className={filteredBy === 'all' ? 'filter-btn active-btn' : 'filter-btn'} onClick={() => onFilterButtonClick('all')}>All recipes</button>
                        <button className={filteredBy === 'public' ? 'filter-btn active-btn' : 'filter-btn'} onClick={() => onFilterButtonClick('public')}>Public</button>
                        <button className={filteredBy === 'private' ? 'filter-btn active-btn' : 'filter-btn'} onClick={() => onFilterButtonClick('private')}>Private</button>
                    </div>
                    : null}
                <h1 className="user-recipes-title">
                    {user && user.uid === userProfile.userUID ? 'My recipes' : `${userProfile.displayName}'s recipes`}
                </h1>
                {recipes.length > 0
                    ?
                    <ul className="user-recipes-list">
                        {filteredRecipes.map(x =>
                            <RecipeCard key={x.id} {...x} />
                        )}
                    </ul>
                    :
                    <h3>No recipes yet.</h3>}
                {user.uid !== userProfile.userUID
                    ? <Link to={`/users/${userProfile.userUID}/recipes/liked`} className='user-liked-recipes-link'>View their liked recipes</Link>
                    : null
                }
            </section>
            :
            <h1 className="placeholder-title">
                Loading data...
            </h1>
    );
}

export default UserProfilePage;
