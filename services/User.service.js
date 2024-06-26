import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AUTH } from "../config/firebaseConfig";
import { DB } from "../config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";


export const loginUser = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(AUTH, email, password)
    } catch (error) {
        console.log(error)
        return error
    }
}

export const register = async (data) => {
    try {
        // create user in firebase auth
        const result = await createUserWithEmailAndPassword(AUTH, data.email, data.password);
        // save additional info to the database
        const userData = {
            fullName: data.fullName,
            username: data.username,
            bio: '',
            followers: [],
            posts: [],
            following: [],
            savedPosts: [],
            avatar: null,
            isVerified: false,
            createdAt: new Date().toISOString(),
        }
        await setDoc(doc(DB, 'users', result.user.uid), userData)
        return result.user;
    } catch (error) {
        console.log(error)
        return error
    }
}


export const getUser = async (userId) => {
    try {
        const docRef = doc(DB, "users", userId);
        const userData = await getDoc(docRef)
        return userData.data()
    } catch (error) {
        console.log(error)
    }
}