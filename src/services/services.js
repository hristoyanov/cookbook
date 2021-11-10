import { getFirestore, getDoc, getDocs, collection, doc, addDoc } from 'firebase/firestore';
import { app } from '../firebase';


const db = getFirestore(app);

async function getRecipes() {
    const recipesCol = collection(db, 'recipes');
    const recipeSnapshot = await getDocs(recipesCol);
    const recipeList = recipeSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));

    console.log(recipeList);
    
    return recipeList;
}

async function getRecipe(id) {
    const docRef = doc(db, 'recipes', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(docSnap.data());
        
        return docSnap.data();
    }

    console.log('Wrong recipe id.');
}

async function addRecipe(name, imageURL, ingredients, prepTime, preparation) {
    return await addDoc(collection(db, 'recipes'), {
        name,
        imageURL,
        ingredients,
        prepTime,
        preparation
    });
}

export {
    db,
    getRecipes,
    getRecipe,
    addRecipe
};
