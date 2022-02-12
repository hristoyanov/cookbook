import { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

import { useAuthContext } from '../../contexts/AuthContext';
import { getUserProfile, getRecipe, editRecipe, deleteRecipeImage } from '../../services/services';
import RecipeOwnerControl from './RecipeOwnerControl/RecipeOwnerControl';
import RecipeLikes from './RecipeLikes/RecipeLikes';
import CommentSection from './CommentSection/CommentSection';
import ConfirmDialog from '../common/ConfirmDialog/ConfirmDialog';

import './RecipeDetails.css';


const RecipeDetails = ({
    match,
    history
}) => {
    const user = useAuthContext();

    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [image, setImage] = useState();

    useEffect(() => {
        let mounted = true;

        getRecipe(match.params.id)
            .then(res => {
                if (mounted) {
                    setRecipe(res);
                    setIsLoading(false);
                }
            })
            .catch(error => console.log(error));

        if (recipe.ownerId) {
            getUserProfile(recipe.ownerId)
                .then(res => {
                    if (mounted) {
                        setUserProfile(res);
                    }
                })
                .catch(error => console.log(error));
        }

        return () => {
            mounted = false;
        }
    }, [match, recipe.ownerId]);

    const changeImageHandler = () => {
        try {
            const storageRef = ref(storage, `${user.uid}/recipe-images/` + String(Date.now()) + image.name);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on('state_changed', null, null, () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        editRecipe(
                            { imageURL: url }, match.params.id
                        ).then(() => {
                            deleteRecipeImage(recipe.imageURL);
                        }).then(() => {
                            setRecipe({ ...recipe, imageURL: url });
                        }).then(() => setShowDialog(false));
                    });
            });
        } catch (error) {
            console.log(error);
        }
    }

    const onChangeImageClickHandler = (e) => {
        e.preventDefault();

        setImage(e.target.files[0]);
        setShowDialog(true);
    }

    return (
        isLoading
            ? <h1>Loading recipe...</h1>
            :
            recipe.hidden && recipe.ownerId !== user?.uid
                ? <h1>This recipe is private.</h1>
                :
                <section className="recipe-details">
                    <article className="recipe-details-recipe-card">
                        <h1 className="recipe-details-title">
                            {recipe.name}
                        </h1>
                        {user && user.uid === recipe.ownerId ? <RecipeOwnerControl id={match.params.id} ownerId={recipe.ownerId} history={history} recipe={recipe} /> : ''}
                        <div className="recipe-details-prep-time">
                            <i className="far fa-clock"></i>{recipe.prepTime} {recipe.prepTime === 1 ? 'minute' : 'minutes'}
                        </div>
                        <article className="recipe-details-content">
                            <div className="recipe-details-content-img">
                                <img src={recipe.imageURL} alt="recipe-img" />
                                <input type="file" name="image" id="image" accept="image/*" onInputCapture={onChangeImageClickHandler} />
                            </div>
                            <div className="recipe-details-content-ingredients">
                                <h2 className="recipe-details-content-ingredients-heading">
                                    Ingredients:
                                </h2>
                                <ul className="recipe-details-content-ingredients-list">
                                    {recipe.ingredients.map((x, i) =>
                                        <li className="recipe-details-content-ingredients-list-item" key={i}>{x}</li>)}
                                </ul>
                            </div>
                            <div className="recipe-details-content-preparation">
                                <h2 className="recipe-details-content-preparation-heading">
                                    Preparation:
                                </h2>
                                <div className="recipe-details-content-preparation-text">
                                    {recipe.preparation}
                                </div>
                            </div>
                        </article>
                        <div className="recipe-details-author-container">
                            Created by:
                            <Link to={`/users/${recipe.ownerId}/recipes`} className="recipe-details-author">
                                {userProfile.displayName}
                            </Link>
                        </div>
                        {!user || user?.uid === recipe?.ownerId ? null : <RecipeLikes likesArr={recipe.likes} recipeId={match.params.id} />}
                    </article>
                    {!isLoading && !recipe.hidden ? <CommentSection user={user} recipe={recipe} recipeId={match.params.id} /> : null}
                    <ConfirmDialog show={showDialog} onClose={() => { setShowDialog(false); setRecipe({ ...recipe }) }} onSave={changeImageHandler} title="Change recipe image?" />
                </section>
    );
}

export default withRouter(RecipeDetails);
