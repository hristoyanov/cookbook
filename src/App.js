import AddRecipe from './components/AddRecipe/AddRecipe';

import { db, getRecipes } from './services/services';

import './App.css';


function App() {
    const onClickHandler = () => {
        getRecipes(db);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    Testing...
                </h1>
            </header>
            <div className="btn-container">
                <button className="get-recipes-btn" onClick={onClickHandler}>
                    Load Recipes
                </button>
            </div>
            <AddRecipe />
        </div >
    );
}

export default App;
