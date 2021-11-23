const UserRecipesSelection = ({
    recipes
}) => {
    return (
        <nav className="recipes-selection-nav">
            <ul className="recipes-selection-nav-list">
                <li className="recipes-selection-nav-list-item">
                    <button className="own-recipes-btn">
                        My recipes
                    </button>
                </li>
                <li className="recipes-selection-nav-list-item">
                    <button className="liked-recipes-btn">
                        My liked recipes
                    </button>
                </li>
            </ul>
        </nav >
    );
}

export default UserRecipesSelection;
