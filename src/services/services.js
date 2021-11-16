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
    arrayRemove,
    query,
    where
} from 'firebase/firestore';
import { app } from '../firebase';


const db = getFirestore(app);

async function getRecipes() {
    try {
        const recipesRef = collection(db, 'recipes');
        const q = query(recipesRef, where('hidden', '==', false));
        const querySnapshot = await getDocs(q);
        const recipes = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        return recipes;
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
