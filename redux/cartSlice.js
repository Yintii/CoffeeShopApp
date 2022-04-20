import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: []
    },
    reducers: {
        addItem: (state, action) => {
            state.value.push(action.payload);
        },
        removeItem: (state, action) => {
            state.value.splice(action.payload, 1);
        }
    }
})

export const { addItem, removeItem } = cartSlice.actions
export default cartSlice.reducer;