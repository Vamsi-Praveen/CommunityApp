import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { DB, STORAGE } from "../config/firebaseConfig";
import { getUser } from "./User.service";

const COLLECTION_NAME = "posts"

export const createPost = async (data) => {
    try {
        return await addDoc(collection(DB, COLLECTION_NAME), data);
    } catch (error) {
        console.log(error)
    }
}

// export const getAllPosts = async () => {
//     try {
//         const posts = []
//         const q = query(collection(DB, COLLECTION_NAME), orderBy("date", "desc"))
//         const allPosts = await getDocs(q)
//         allPosts.docs.map(async (doc) => {
//             const data = doc.data()
//             const userData = await getUser(data.userId)
//             tempData = {
//                 id: doc.id,
//                 username: userData?.username,
//                 fullName: userData?.fullName,
//                 isVerified: userData?.isVerified,
//                 ...data

//             }
//             posts.push(tempData)
//         })
//         return posts
//     } catch (error) {
//         console.log(error)
//     }
// }


export const getAllPosts = async () => {
    try {
        const posts = [];
        const q = query(collection(DB, COLLECTION_NAME), orderBy("date", "desc"));
        const allPosts = await getDocs(q);
        const postPromises = allPosts.docs.map(async (doc) => {
            const data = doc.data();
            const userData = await getUser(data.userId);
            const tempData = {
                id: doc.id,
                username: userData?.username,
                fullName: userData?.fullName,
                isVerified: userData?.isVerified,
                avatar: userData?.avatar,
                ...data
            };
            return tempData;
        });
        posts.push(...(await Promise.all(postPromises)));
        return posts;
    } catch (error) {
        console.log(error);
        return [];
    }
}


export const getSinglePost = async (postId) => {
    try {
        const postRef = doc(DB, COLLECTION_NAME, postId)
        const post = await getDoc(postRef)
        return post
    } catch (error) {
        console.log(error)
    }
}

// export const userPosts = async (userId) => {
//     try {
//         // Get the user document from Firestore using the user's ID
//         const userDoc = await getDoc(doc(DB, 'users', userId));
//         if (!userDoc.exists()) {
//             throw new Error('User not found');
//         }

//         // Access the 'posts' array field from the user document
//         const userPosts = userDoc.data().posts || [];

//         // Get all post documents corresponding to the post IDs in the 'posts' array
//         const posts = [];
//         for (const postId of userPosts) {
//             const postDoc = await getDoc(collection(DB, 'posts', postId));
//             if (postDoc.exists()) {
//                 posts.push(postDoc.data());
//             }
//         }

//         // Return the array of post documents
//         return posts;
//     } catch (error) {
//         console.log(error)
//     }
// }

export const userPosts = async (userId) => {
    try {
        const q = query()
    } catch (error) {
        console.log(error)
    }
}


export const uploadImage = async (image) => {
    try {
        const imageRef = ref(STORAGE, 'uploads/' + new Date().toISOString())
        const response = await fetch(image);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(imageRef)
        return downloadURL

    } catch (error) {
        console.log(error)
    }
}

export const updateLikes = async (likes, id) => {
    try {
        const docref = doc(DB, "posts", id)
        await updateDoc(docref, {
            likes: likes
        })
    } catch (error) {
        console.log(error)
    }
}