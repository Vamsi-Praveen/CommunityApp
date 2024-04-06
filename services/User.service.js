import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AUTH } from "../config/firebaseConfig";
import { DB } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";


export const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(AUTH, email, password)
            .then((user) => {
                return user
            })
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
