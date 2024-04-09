import { createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
    name: "post",
    initialState: {
        likes: 0,
        isLiked: false
    },
    reducers: {
        setLikes: (state, action) => {
            const { likes, isLiked } = action.payload
            state.likes = likes
            state.isLiked = isLiked
        },
        setLikes: (state, action) => {

        }
    }
})

export const { setLikes } = postSlice.actions
export default postSlice.reducer