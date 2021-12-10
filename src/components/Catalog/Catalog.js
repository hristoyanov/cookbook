import { useState, useEffect } from 'react';

import { getLatestRecipes } from '../../services/services';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import recipeSort from '../../utils/recipeSort';

import './Catalog.css';


const Catalog = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortedBy, setSortedBy] = useState('Latest');

    useEffect(() => {
        getLatestRecipes()
            .then(res => {
                setRecipes(res);
                setLoading(false);
            });
    }, []);

    const onSortButtonClick = (sortBy) => {
        const sorter = recipeSort(recipes);
        const sortedRecipes = sorter[sortBy]();

        setRecipes([...sortedRecipes]);
        setSortedBy(sortBy);
    }

    return (
        !loading
        ?
        <section className="catalog">
            <div className="sort-section">
                <button className={sortedBy === 'Latest' ? 'sort-btn active-btn' : 'sort-btn'} onClick={() => onSortButtonClick('Latest')}>Latest</button>
                <button className={sortedBy === 'Most liked' ? 'sort-btn active-btn' : 'sort-btn'} onClick={() => onSortButtonClick('Most liked')}>Most liked</button>
                <button className={sortedBy === 'Most commented' ? 'sort-btn active-btn' : 'sort-btn'} onClick={() => onSortButtonClick('Most commented')}>Most commented</button>
                <button className={sortedBy === 'Quickest' ? 'sort-btn active-btn' : 'sort-btn'} onClick={() => onSortButtonClick('Quickest')}>Quickest</button>
            </div>
            <div className="catalog-recipes">
                <h1 className="catalog-recipes-heading">
                    {sortedBy + ' recipes'}
                </h1>
                <ul className="recipes-list">
                    {recipes.map(x =>
                        <RecipeCard key={x.id} {...x} />
                    )}
                </ul>
            </div>
        </section>
        : null
    );
}

export default Catalog;
