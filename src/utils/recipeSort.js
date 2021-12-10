const recipeSort = (recipes) => {
    return {
        'Latest': () => recipes.sort((a, b) => b.createdAt - a.createdAt),
        'Most liked': () => recipes.sort((a, b) => b.likes.length - a.likes.length),
        'Most commented': () => recipes.sort((a, b) => b.comments.length - a.comments.length),
        'Quickest': () => recipes.sort((a, b) => a.prepTime - b.prepTime),
    }
}

export default recipeSort;
