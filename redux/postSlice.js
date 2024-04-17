import { createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: []
    },
    reducers: {
        setPostData: (state, action) => {
            state.posts = action.payload.posts
        },
        setLikes: (state, action) => {
            const postId = action.payload.postId;
            const isLiked = action.payload.isLiked;
            const userId = action.payload.userId;
            const post = state.posts.find((data) => { return data.id === postId });
            if (isLiked) {

            }

        },
        removeLike: (state, action) => {
            const { postId, userID } = action.payload;
            console.log(postId, userID)
            const post = state.posts.find((posts) => posts.id == postId);
            post.likes.splice(post.likes.indexOf(userID), 1)
        },
        addLike: (state, action) => {
            const { postId, userID } = action.payload;
            const post = state.posts.find((posts) => posts.id == postId);
            console.log("post in redux ", post)
            post.likes.push(userID)
        }

    }
})

export const { setLikes, setPostData, removeLike, addLike } = postSlice.actions
export const selectPosts = (state) => state.post.posts
export default postSlice.reducer