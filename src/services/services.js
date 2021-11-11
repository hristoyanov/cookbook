import { getFirestore, getDoc, getDocs, collection, doc, addDoc } from 'firebase/firestore';
import { app } from '../firebase';


const db = getFirestore(app);

async function getRecipes() {
    try {
        const recipesCol = collection(db, 'recipes');
        const recipeSnapshot = await getDocs(recipesCol);
        const recipeList = recipeSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        console.log(recipeList);

        return recipeList;
    } catch (error) {
        console.log(error);
    }
}

async function getRecipe(id) {
    try {
        const docRef = doc(db, 'recipes', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(docSnap.data());

            return docSnap.data();
        }
    } catch (error) {
        return console.log(error);
    }
}

async function addRecipe(name, imageURL, ingredients, prepTime, preparation, hidden, ownerId) {
    return await addDoc(collection(db, 'recipes'), {
        name,
        imageURL,
        ingredients,
        prepTime,
        preparation,
        hidden,
        ownerId
    });
}

export {
    db,
    getRecipes,
    getRecipe,
    addRecipe
};
