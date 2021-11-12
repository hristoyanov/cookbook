import { addRecipe } from '../../services/services';
import RecipeForm from '../RecipeForm/RecipeForm';

const AddRecipe = (props) => {
    async function onAddRecipeHandler(e) {
        e.preventDefault();

        const name = e.target.name.value.trim();
        const imageURL = e.target.imageURL.value.trim();
        const ingredients = e.target.ingredients.value.split(',').map(x => x.trim());
        const prepTime = Number(e.target.prepTime.value.trim());
        const preparation = e.target.preparation.value.trim();
        const hidden = e.target.visibility.value === 'private' ? true : false;

        const ownerId = props.user.uid;

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

            props.history.push('/recipes/details/' + res.id);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="add-recipe">
            <RecipeForm submitHandler={onAddRecipeHandler} action={props.action}/>
        </section>
    );
}

export default AddRecipe;
