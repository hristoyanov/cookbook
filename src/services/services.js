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

async function createUserProfile(id, name) {
    try {
        return await addDoc(collection(db, 'userProfiles'), {
            userUID: id,
            displayName: name
        });
    } catch (error) {
        console.log(error);
    }
}

async function getUserProfile(id) {
    try {
        const userProfilesRef = collection(db, 'userProfiles');
        const q = query(userProfilesRef, where('userUID', '==', id));
        const querySnapshot = await getDocs(q);
        const userProfile = querySnapshot.docs[0].data();

        return userProfile;
    } catch (error) {
        console.log(error);
    }
}

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

async function getUserRecipes(userId, publicOnly = false) {
    try {
        const recipesRef = collection(db, 'recipes');
        let q = undefined;

        if (publicOnly) {
            q = query(recipesRef, where('ownerId', '==', userId), where('hidden', '==', false));
        } else {
            q = query(recipesRef, where('ownerId', '==', userId));
        }
        const recipes = await getDocs(q);

        return recipes.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
        console.log(error);
    }
}

async function getUserLikedRecipes(userId) {
    try {
        const recipesRef = collection(db, 'recipes');
        const q = query(recipesRef, where('likes', 'array-contains', userId))
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
        ownerId,
        likes: []
    });
}

async function editRecipe(recipe, id) {
    const recipeRef = doc(db, 'recipes', id);

    return await updateDoc(recipeRef, recipe);
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
    createUserProfile,
    getUserProfile,
    getRecipes,
    getRecipe,
    getUserRecipes,
    getUserLikedRecipes,
    addRecipe,
    editRecipe,
    deleteRecipe,
    updateRecipeLikes
};
