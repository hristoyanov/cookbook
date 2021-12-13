export const displayNameValidator = (string) => {
    return string.length > 2 ? string : false;
}

export const passwordValidator = (string) => {
    return string.length > 5 ? string : false;
}
