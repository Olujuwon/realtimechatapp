import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {contactType} from "../types/Contact/contact";
import {RootState} from "./store";
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import FirebaseInit from "../firebase/firebaseInit";

interface userStateType {
    userFromFirebase: any
}

let initialState: userStateType = {
    userFromFirebase: {}
}

export const mainUserUid = "Cs3yw0WrMSfCVUSuGrZnLNGJhrd2";
export const otherUserUid = "ONk2kVjoDDMTkVV0oOIRstgWBr33";

const firebaseInstance = FirebaseInit.getInstance();
const email = "maintestuser@example.com";
const password = "1234567890"
const email1 = "othertestuser@example.com";
const password1 = "1234567890"

export const registerNewUser = createAsyncThunk("user/registerNewUser", async () => {
    try {
        const registeredUser = await createUserWithEmailAndPassword(firebaseInstance.auth, email, password);
        return registeredUser.user;
    } catch (e: any) {
        console.log('Error creating new user', e.message)
    }
})

export const registerNewTestUsers = createAsyncThunk("user/registerNewUser", async () => {
    try {
        const registeredUserMain = await createUserWithEmailAndPassword(firebaseInstance.auth, email, password);
        const registeredUserOther = await createUserWithEmailAndPassword(firebaseInstance.auth, email1, password1);
        return {mainUser: registeredUserMain.user, otherUser: registeredUserOther.user};
    } catch (e: any) {
        console.log('Error creating new user', e.message)
    }
})

export const fetchSignedInUser = createAsyncThunk("user/fetchsignedInUser", async () => {
    try {
        return onAuthStateChanged(firebaseInstance.auth, (async user => {
            if (user) {
                return user;
            } else {
                const signedInUser = await signInWithEmailAndPassword(firebaseInstance.auth, email, password);
                return signedInUser.user;
            }
        }))
    } catch (e: any) {
        console.log('Error fetching in user', e.message)
    }
})


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getSignedInUser: (state, action: PayloadAction<any>) => {
            state.userFromFirebase = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchSignedInUser.fulfilled, (state, action) => {
            state.userFromFirebase = action.payload
        })
        builder.addCase(registerNewUser.fulfilled, (state, action) => {
            state.userFromFirebase = action.payload
        })
    }
})


export const {getSignedInUser} = userSlice.actions

export const selectUser = (state: RootState) => state.userReducer.userFromFirebase;


export default userSlice.reducer