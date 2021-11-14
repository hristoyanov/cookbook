import {
    getFirestore,
    getDoc,
    getDocs,
    collection,
    doc,
    addDoc,
    deleteDoc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';
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
            return docSnap.data();
        }
    } catch (error) {
        console.log(error);
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

async function deleteRecipe(id) {
    return await deleteDoc(doc(db, 'recipes', id));
}

async function updateRecipeLikes(recipeId, userId, liked) {
    const recipeRef = doc(db, 'recipes', recipeId);

    if (liked) {
        return await updateDoc(recipeRef, {
            likes: arrayRemove(userId)
        });
    } else {
        return await updateDoc(recipeRef, {
            likes: arrayUnion(userId)
        });
    }
}

export {
    db,
    getRecipes,
    getRecipe,
    addRecipe,
    deleteRecipe,
    updateRecipeLikes
};
