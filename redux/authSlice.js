import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        userId: null,
        details: {}
    },
    reducers: {
        setUser: (state, action) => {
            const { user, details } = action.payload
            console.log("user logged in is: ", user)
            state.isLoggedIn = true
            state.userId = user
            state.details = details
        },
        logoutUser: (state, action) => {
            state.isLoggedIn = false
            state.userId = null
            state.details = {}
        }
    }
})

export const { setUser, logoutUser } = authSlice.actions
export default authSlice.reducer
