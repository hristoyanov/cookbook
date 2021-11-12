import { getAuth } from '../../firebase';
import { addRecipe } from '../../services/services';

import './AddRecipe.css';

const AddRecipe = ({ history }) => {
    async function onAddRecipeHandler(e) {
        e.preventDefault();

        const auth = getAuth();
        const user = auth.currentUser;

        const name = e.target.name.value.trim();
        const imageURL = e.target.imageURL.value.trim();
        const ingredients = e.target.ingredients.value.split(',').map(x => x.trim());
        const prepTime = Number(e.target.prepTime.value.trim());
        const preparation = e.target.preparation.value.trim();
        const hidden = e.target.visibility.value === 'private' ? true : false;

        const ownerId = user.uid;

        try {
            const res = await addRecipe(
                name,
                imageURL,
                ingredients,
                prepTime,
                preparation,
                hidden,
                ownerId
            );

            alert('Recipe added successfully!');

            e.target.reset();

            history.push('/recipes/details/' + res.id);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="add-recipe">
            <form className="add-recipe-form" onSubmit={onAddRecipeHandler}>
                <legend>Add Recipe</legend>
                <label htmlFor="recipe-name">Recipe Name</label>
                <input type="text" name="name" id="recipe-name" required />
                <label htmlFor="image-url">Image</label>
                <input type="text" name="imageURL" id="image-url" placeholder="Please provide image source." required />
                <label htmlFor="ingredients">Ingredients</label>
                <textarea name="ingredients" id="ingredients" cols="30" rows="7" placeholder="Please add ingredients separated by comma." required></textarea>
                <label htmlFor="prep-time">Preparation time (in minutes)</label>
                <input type="number" name="prepTime" id="prep-time" min="0" required />
                <label htmlFor="preparation">Preparation</label>
                <textarea name="preparation" id="preparation" cols="30" rows="7" required></textarea>
                <label htmlFor="visibility">This recipe should be:</label>
                <select type="text" name="visibility" id="visibility">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
                <button className="submit-btn">Add Recipe</button>
            </form>
        </section>
    );
}

export default AddRecipe;
