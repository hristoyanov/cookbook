import './RecipeForm.css';

const RecipeForm = (props) => {
    return (
        <form className="recipe-form" onSubmit={props.submitHandler}>
            <legend>{props.action === 'add' ? 'Add Recipe' : 'Edit Recipe'}</legend>
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
            <button className="submit-btn">{props.action === 'add' ? 'Add Recipe' : 'Edit Recipe'}</button>
        </form>
    );
}

export default RecipeForm;
