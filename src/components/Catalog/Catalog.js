import { Component } from "react";

import { getRecipes } from '../../services/services';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

import './Catalog.css';

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: []
        }
    }

    componentDidMount() {
        getRecipes()
            .then(res => this.setState({ recipes: res }));
    }

    render() {
        return (
            <section className="catalog">
                <h1 className="catalog-heading">
                    All Recipes
                </h1>
                <ul className="recipes-list">
                    {this.state.recipes.map(x =>
                        <RecipeCard key={x.id} {...x} />
                    )}
                </ul>
            </section>
        );
    }
}

export default Catalog;
