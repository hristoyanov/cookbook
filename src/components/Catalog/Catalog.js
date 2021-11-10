import { useState, useEffect } from 'react';

import { getRecipes } from '../../services/services';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

import './Catalog.css';

const Catalog = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes()
            .then(res => {setRecipes(res)});
    }, []);

    return (
        <section className="catalog">
            <h1 className="catalog-heading">
                All Recipes
            </h1>
            <ul className="recipes-list">
                {recipes.map(x =>
                    <RecipeCard key={x.id} {...x} />
                )}
            </ul>
        </section>
    );
}

export default Catalog;
