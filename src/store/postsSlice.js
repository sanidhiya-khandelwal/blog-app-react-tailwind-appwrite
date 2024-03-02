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
        }
    }
})

export const { getPostsReducer, removePostsReducer } = postsSlice.actions;
export default postsSlice.reducer;