import { v4 as uuidv4 } from 'uuid';
import {
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
    where,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';


const userProfilesRef = collection(db, 'userProfiles');
const recipesRef = collection(db, 'recipes');

async function createUserProfile(id, name) {
    try {
        return await addDoc(userProfilesRef, {
            userUID: id,
            displayName: name
        });
    } catch (error) {
        console.log(error);
    }
}

async function getUserProfile(id) {
    try {
        const q = query(userProfilesRef, where('userUID', '==', id));
        const querySnapshot = await getDocs(q);
        const userProfile = querySnapshot.docs[0].data();

        return userProfile;
    } catch (error) {
        console.log(error);
    }
}

async function getLatestRecipes() {
    try {
        const q = query(recipesRef, where('hidden', '==', false), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const recipes = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        return recipes;
    } catch (error) {
        console.log(error);
    }
}

async function getUserRecipes(userId, publicOnly = false) {
    try {
        let q = undefined;

        if (publicOnly) {
            q = query(recipesRef, where('ownerId', '==', userId), where('hidden', '==', false), orderBy('createdAt', 'desc'));
        } else {
            q = query(recipesRef, where('ownerId', '==', userId), orderBy('createdAt', 'desc'));
        }
        const recipes = await getDocs(q);

        return recipes.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
        console.log(error);
    }
}

async function getUserLikedRecipes(userId) {
    try {
        const q = query(recipesRef, where('likes', 'array-contains', userId), where('hidden', '==', false));
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
    return await addDoc(recipesRef, {
        name,
        imageURL,
        ingredients,
        prepTime,
        preparation,
        hidden,
        ownerId,
        likes: [],
        comments: [],
        createdAt: Timestamp.now()
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

async function addRecipeComment(recipeId, userId, displayName, content) {
    const recipeRef = doc(db, 'recipes', recipeId);
    const comment = {
        content,
        author: {
            userId,
            displayName
        },
        createdAt: Timestamp.now(),
        editedAt: null,
        id: uuidv4()
    }

    return await updateDoc(recipeRef, {
        comments: arrayUnion(comment)
    });
}

async function modifyRecipeComment(recipeId, user, content, oldComment) {
    const recipeRef = doc(db, 'recipes', recipeId);
    let res = null;

    res = await updateDoc(recipeRef, {
        comments: arrayRemove(oldComment)
    });

    if (content) {
        res = await updateDoc(recipeRef, {
            comments: arrayUnion({
                content,
                author: {
                    userId: user.uid,
                    displayName: user.displayName
                },
                createdAt: oldComment.createdAt,
                editedAt: Timestamp.now(),
                id: oldComment.id
            })
        });
    }

    return res;
}

export {
    db,
    createUserProfile,
    getUserProfile,
    getLatestRecipes,
    getRecipe,
    getUserRecipes,
    getUserLikedRecipes,
    addRecipe,
    editRecipe,
    deleteRecipe,
    updateRecipeLikes,
    addRecipeComment,
    modifyRecipeComment
};
