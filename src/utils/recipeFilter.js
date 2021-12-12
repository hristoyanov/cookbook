const recipeFilter = (recipes, filterBy) => {
    return filterBy === 'public' ? recipes.filter(x => x.hidden === false) : recipes.filter(x => x.hidden === true);
}

export default recipeFilter;
