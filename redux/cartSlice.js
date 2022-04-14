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
            console.log("remove item")
        }
    }
})

export const { addItem, removeItem } = cartSlice.actions
export default cartSlice.reducer;