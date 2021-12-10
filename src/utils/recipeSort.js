const recipeSort = (recipes) => {
    return {
        'Latest': () => recipes.sort((a, b) => b.createdAt - a.createdAt),
        'Most liked': () => recipes.sort((a, b) => b.likes.length - a.likes.length),
        'Quickest': () => recipes.sort((a, b) => a.prepTime - b.prepTime)
    }
}

export default recipeSort;
