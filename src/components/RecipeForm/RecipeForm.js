import { useState, useEffect } from 'react';

import AlertWindow from '../common/AlertWindow/AlertWindow';
import isAuth from '../../hoc/isAuth';
import { useAuthContext } from '../../contexts/AuthContext';
import { getRecipe, addRecipe, editRecipe } from '../../services/services';
import * as validators from './recipeFormValidators';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

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
    const [errors, setErrors] = useState({ name: false, image: false, ingredients: false, prepTime: false, preparation: false });
    const [image, setImage] = useState();

    useEffect(() => {
        if (mode === 'Edit') {
            getRecipe(match.params.id)
                .then(res => {
                    setRecipe(res);
                    setIsLoaded(true);
                })
                .catch(error => console.log(error));
        }
    }, [match.params.id, mode]);

    const onAlertWindowClose = () => {
        history.push(`/recipes/${recipeId}/details`);
    }

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    async function onSubmitHandler(e) {
        e.preventDefault();

        const name = validators.nameValidator(e.target.name.value.trim());
        const image = e.target.image?.files[0];
        const ingredients = validators.ingredientsValidator(e.target.ingredients.value.split(',').map(x => x.trim()));
        const prepTime = validators.prepTimeValidator(Number(e.target.prepTime.value.trim()));
        const preparation = validators.preparationValidator(e.target.preparation.value.trim());
        const hidden = e.target.visibility.value === 'private' ? true : false;

        if (!name) {
            setErrors(state => ({ ...state, name: 'Name must be between 3 and 30 characters.' }));

            return;
        } else {
            setErrors(state => ({ ...state, name: false }));
        }

        if (mode === 'Add' && !image) {
            setErrors(state => ({ ...state, image: 'Please provide an image for the recipe.' }));

            return;
        } else {
            setErrors(state => ({ ...state, image: false }));
        }

        if (!ingredients) {
            setErrors(state => ({ ...state, ingredients: 'Please enter at least 3 different ingredients.' }));

            return;
        } else {
            setErrors(state => ({ ...state, ingredients: false }));
        }

        if (!prepTime) {
            setErrors(state => ({ ...state, prepTime: 'Preparation time can\'t be less than 5 minutes and greater than 1440 minutes (24 hours).' }));

            return;
        } else {
            setErrors(state => ({ ...state, prepTime: false }));
        }

        if (!preparation) {
            setErrors(state => ({ ...state, preparation: 'Preparation description must be at least 10 characters.' }));

            return;
        } else {
            setErrors(state => ({ ...state, preparation: false }));
        }

        if (mode === 'Add') {
            const ownerId = user.uid;

            try {
                const storageRef = ref(storage, `${user.uid}/recipe-images/` + String(Date.now()) + image.name);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on('state_changed', null, null, () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((url) => {
                            addRecipe(
                                name,
                                url,
                                ingredients,
                                prepTime,
                                preparation,
                                hidden,
                                ownerId
                            ).then((res) => {
                                setRecipeId(res.id);
                                setAlertWindowMessage('Recipe added!');
                                setShowAlertWindow(true);
                            });
                        });
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                editRecipe({
                    name: name,
                    ingredients: ingredients,
                    prepTime: prepTime,
                    preparation: preparation,
                    hidden: hidden
                }, match.params.id)
                    .then(() => {
                        setRecipeId(match.params.id);
                        setAlertWindowMessage('Recipe edited successfully!');
                        setShowAlertWindow(true);
                    });
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
                    <input type="text" name="name" id="recipe-name" defaultValue={loaded ? recipe.name : ''} />
                    <span className={errors.name ? 'error visible' : 'error'}>{errors.name}</span>
                    {mode === 'Add' ?
                        <>
                            <label htmlFor="recipe-img" className="recipe-img-select-label">Select image</label>
                            <input type="file" name="image" id="recipe-img" className="recipe-img-select" accept="image/*" onInputCapture={imageHandler} />
                            {image
                                ?
                                <div className="img-preview">
                                    <img src={URL.createObjectURL(image)} alt="preview" />
                                </div>
                                :
                                null}
                        </>
                        : null
                    }
                    <span className={mode === 'Add' && errors.image ? 'error visible' : 'error'}>{errors.image}</span>
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea name="ingredients" id="ingredients" cols="30" rows="7" placeholder="Please add ingredients separated by comma." defaultValue={loaded ? recipe.ingredients.join(', ') : ''}></textarea>
                    <span className={errors.ingredients ? 'error visible' : 'error'}>{errors.ingredients}</span>
                    <label htmlFor="prep-time">Preparation time (in minutes)</label>
                    <input type="number" name="prepTime" id="prep-time" min="5" defaultValue={loaded ? recipe.prepTime : ''} />
                    <span className={errors.prepTime ? 'error visible' : 'error'}>{errors.prepTime}</span>
                    <label htmlFor="preparation">Preparation</label>
                    <textarea name="preparation" id="preparation" cols="30" rows="7" defaultValue={loaded ? recipe.preparation : ''} placeholder="Instructions as to how to prepare the recipe."></textarea>
                    <span className={errors.preparation ? 'error visible' : 'error'}>{errors.preparation}</span>
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

export default isAuth(RecipeForm);
