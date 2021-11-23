import RecipeCard from '../RecipeCard/RecipeCard';

const UserRecipesList = ({
    recipes
}) => {
    return (
        <>
            {recipes.length > 0
                ?
                <ul className="user-recipes-list">
                    {recipes.map(x =>
                        <RecipeCard key={x.id} {...x} />
                    )}
                </ul>
                :
                'No recipes yet.'}
        </>
    );
}

export default UserRecipesList;
