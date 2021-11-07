import { db, getRecipes } from '../../services/services';

const LandingPage = () => {
    const  onClickHandler = async () => {
        await getRecipes(db);
    }

    return (
        <div className="btn-container">
            <button className="get-recipes-btn" onClick={onClickHandler}>
                Load Recipes
            </button>
        </div>
    );
}

export default LandingPage;
