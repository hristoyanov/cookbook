import { useState, useEffect } from 'react';

import AlertWindow from '../common/AlertWindow/AlertWindow';
import { useAuthContext } from '../../contexts/AuthContext';
import { getRecipe, addRecipe, editRecipe } from '../../services/services';

import './RecipeForm.css';


const RecipeForm = ({
    history,
    match,
    mode
}) => {
    const user = useAuthContext();

    const [recipe, setRecipe] = useState({});
    const [loaded, setIsLoaded] = useState(false);
    const [showAlertWindow, setShowAlertWindow] = useState(false);
    const [alertWindowMessage, setAlertWindowMessage] = useState('');
    const [recipeId, setRecipeId] = useState('');

    useEffect(() => {
        if (mode === 'Edit') {
            getRecipe(match.params.id)
                .then(res => {
                    setRecipe(res);
                    setIsLoaded(true);
                })
                .catch(error => console.log(error));
        }
    }, [match]);

    const onAlertWindowClose = () => {
        history.push(`/recipes/${recipeId}/details`);
    }

    async function onSubmitHandler(e) {
        e.preventDefault();

        const name = e.target.name.value.trim();
        const imageURL = e.target.imageURL.value.trim();
        const ingredients = e.target.ingredients.value.split(',').map(x => x.trim());
        const prepTime = Number(e.target.prepTime.value.trim());
        const preparation = e.target.preparation.value.trim();
        const hidden = e.target.visibility.value === 'private' ? true : false;

        if (mode === 'Add') {
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

                setRecipeId(res.id);
                setAlertWindowMessage('Recipe added!');
                setShowAlertWindow(true);

                e.target.reset();
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await editRecipe({
                    name: name,
                    imageURL: imageURL,
                    ingredients: ingredients,
                    prepTime: prepTime,
                    preparation: preparation,
                    hidden: hidden
                }, match.params.id);

                setRecipeId(match.params.id);
                setAlertWindowMessage('Recipe edited successfully!');
                setShowAlertWindow(true);

                e.target.reset();
            } catch (error) {
                console.log(error);
            }
        }
    }

    if (mode === 'Edit' && user && user.uid !== recipe.ownerId) {
        return !loaded ? null : <h1>You can only edit your own recipes.</h1>;
    }

    return (
        mode === 'Edit' && !loaded
            ?
            null
            :
            <section className={mode[0].toLowerCase() + mode.slice(1) + '-recipe'}>
                <form className="recipe-form" onSubmit={onSubmitHandler}>
                    <legend>{mode + ' recipe'}</legend>
                    <label htmlFor="recipe-name">Recipe Name</label>
                    <input type="text" name="name" id="recipe-name" defaultValue={loaded ? recipe.name : ''} required />
                    <label htmlFor="image-url">Image</label>
                    <input type="text" name="imageURL" id="image-url" placeholder="Please provide image source." defaultValue={loaded ? recipe.imageURL : ''} required />
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea name="ingredients" id="ingredients" cols="30" rows="7" placeholder="Please add ingredients separated by comma." defaultValue={loaded ? recipe.ingredients.join(', ') : ''} required></textarea>
                    <label htmlFor="prep-time">Preparation time (in minutes)</label>
                    <input type="number" name="prepTime" id="prep-time" min="0" defaultValue={loaded ? recipe.prepTime : ''} required />
                    <label htmlFor="preparation">Preparation</label>
                    <textarea name="preparation" id="preparation" cols="30" rows="7" defaultValue={loaded ? recipe.preparation : ''} required></textarea>
                    <label htmlFor="visibility">This recipe should be:</label>
                    <select type="text" name="visibility" id="visibility" defaultValue={!loaded ? null : recipe.hidden ? 'private' : 'public'}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    <button className="submit-btn">Submit</button>
                </form>
                <AlertWindow show={showAlertWindow} onClose={() => {
                    setShowAlertWindow(false);
                    onAlertWindowClose();
                }} title={alertWindowMessage} />
            </section>
    );
}

export default RecipeForm;
