import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebase';


const db = getFirestore(app);

async function getRecipes(db) {
    const recipesCol = collection(db, 'recipes');
    const recipeSnapshot = await getDocs(recipesCol);
    const recipeList = recipeSnapshot.docs.map(doc => doc.data());

    console.log(recipeList);
}

async function addRecipe(name, imageURL, ingredients, prepTime, prepSteps) {
    const newRecipe = await addDoc(collection(db, 'recipes'), {
        name,
        imageURL,
        ingredients,
        prepTime,
        prepSteps
    });

    console.log(newRecipe);
    console.log('Document written with ID: ', newRecipe.id);
}

export {
    db,
    getRecipes,
    addRecipe
};
