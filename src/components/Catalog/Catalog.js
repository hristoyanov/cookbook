import { useState, useEffect } from 'react';

import { getLatestRecipes } from '../../services/services';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

import './Catalog.css';

const Catalog = () => {
    const [recipes, setRecipes] = useState([]);
    const [mode, setMode] = useState('latest');

    useEffect(() => {
        getLatestRecipes()
            .then(res => {
                setRecipes(res)
            });
    }, []);

    const sortRecipes = () => {
        if (mode === 'latest') {
            setRecipes([...recipes].sort((a, b) => b.likes.length - a.likes.length));
            setMode('most liked');
        } else {
            setRecipes([...recipes].sort((a, b) => b.createdAt - a.createdAt));
            setMode('latest');
        }
    }

    return (
        <section className="catalog">
            <div className="sort-section">
                <p className="sort-section-text">
                    Sort by:
                </p>
                <button className="sort-btn" onClick={sortRecipes}>{mode === 'latest' ? 'Most liked' : 'Latest'}</button>
            </div>
            <h1 className="catalog-heading">
                {mode === 'latest' ? 'Latest recipes' : 'Most liked recipes'}
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
