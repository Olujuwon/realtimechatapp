import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {contactType} from "../types/Contact/contact";
import {RootState} from "./store";


interface contactsState {
    activeContact: contactType|any
}

let initialState: contactsState = {
    activeContact: {}
}

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        makeContactActive: (state, action: PayloadAction<any>) => {
            state.activeContact = action.payload
        }
    }
})

export const {makeContactActive} = contactSlice.actions
export const selectActiveContact = (state: RootState) => state.contactReducer.activeContact



export default contactSlice.reducer