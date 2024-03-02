import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postsStatus: false,
    postsData: null
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        getPostsReducer: (state, action) => {
            state.postsStatus = true;
            state.postsData = action.payload;
        },
        removePostsReducer: (state, action) => {
            state.postsStatus = false;
            state.postsData = null;
        }
    }
})

export const { getPostsReducer, removePostsReducer } = postsSlice.actions;
export default postsSlice.reducer