export const nameValidator = (name) => {
    return name.length > 2 && name.length <= 50 ? name : false;
}

export const ingredientsValidator = (array) => {
    const uniqueIngredients = new Set(array);

    return uniqueIngredients.size > 2 ? Array.from(uniqueIngredients) : false;
}

export const prepTimeValidator = (number) => {
    return number > 4 && number <= 1440 ? number : false;
}

export const preparationValidator = (string) => {
    return string.length > 9 ? string : false;
}
