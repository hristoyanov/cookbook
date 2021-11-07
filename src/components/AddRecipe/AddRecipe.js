import { addRecipe } from '../../services/services';

import './AddRecipe.css';


const AddRecipe = () => {
     async function onAddRecipeHandler(e) {
        e.preventDefault();

        const name = e.target.name.value.trim();
        const imageURL = e.target.imageURL.value.trim();
        const ingredients = e.target.ingredients.value.trim();
        const prepTime = Number(e.target.prepTime.value.trim());
        const prepSteps = e.target.prepSteps.value.trim();

        await addRecipe(name, imageURL, ingredients, prepTime, prepSteps);
    }

    return (
        <section className="add-recipe">
            <form className="add-recipe-form" onSubmit={onAddRecipeHandler}>
                <legend>Add Recipe</legend>
                <label htmlFor="recipe-name">Recipe Name</label>
                <input type="text" name="name" id="recipe-name" required/>
                <label htmlFor="image-url">Image</label>
                <input type="text" name="imageURL" id="image-url" required/>
                <label htmlFor="ingredients">Ingredients</label>
                <textarea name="ingredients" id="ingredients" cols="30" rows="10" required></textarea>
                <label htmlFor="prep-time">Preparation time (in minutes)</label>
                <input type="number" name="prepTime" id="prep-time" min="0" required/>
                <label htmlFor="prep-steps">Preparation Steps</label>
                <textarea name="prepSteps" id="prep-steps" cols="30" rows="10" required></textarea>
                <button className="submit-btn">Add Recipe</button>
            </form>
        </section>
    );
}

export default AddRecipe;
