import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import { app } from '../firebase';


const db = getFirestore(app);

async function getRecipes(db) {
    const recipesCol = collection(db, 'recipes');
    const recipeSnapshot = await getDocs(recipesCol);
    const recipeList = recipeSnapshot.docs.map(doc => doc.data());

    console.log(recipeList);
}

export {
    db,
    getRecipes
};
