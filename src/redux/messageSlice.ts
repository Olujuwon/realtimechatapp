import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import {messageType} from "../types/Message/message";
import {RootState} from "./store";
import {createRandomTOMessages, SAMPLEMESSAGES} from "../sampledata/messagesSampleData";
import {collection, doc, setDoc, query, getDocs, where, onSnapshot} from "firebase/firestore";
import FirebaseInit from "../firebase/firebaseInit";
import {mainUserUid, otherUserUid} from "./userSlice";
import {contactType} from "../types/Contact/contact";
import {message} from "antd";

const firebaseInstance = FirebaseInit.getInstance();

interface messagesState {
    allMessages: messageType[],
    activeContactMessages: messageType[]
}

let initialState: messagesState = {
    allMessages: [],
    activeContactMessages: []
}

export const addTestMessagesToFirebase = createAsyncThunk("contacts/addTestContactsToFirebase",
    async (arg, {getState}) => {
        try {
            const messagesCollectionRef = collection(firebaseInstance.database, "messages");
            let allContacts: any = [];
            let allContactsMessages: any = [];
            const contactsQueryRef = query(collection(firebaseInstance.database, "contacts"),
                where("contacts", "array-contains", mainUserUid));
            const querySnapshot = await getDocs(contactsQueryRef);
            querySnapshot.forEach((doc) => {
                allContacts.push(doc.data());
            });
            allContacts.map((contact: contactType) => {
                Array.from({length: 5}).forEach(() => {
                    allContactsMessages.push(createRandomTOMessages(mainUserUid, contact.uid, false));
                    allContactsMessages.push(createRandomTOMessages(mainUserUid, contact.uid, true));
                })
            });
            allContactsMessages.map(async (message: messageType) => {
                const uuid = message.uid;
                // @ts-ignore
                await setDoc(doc(messagesCollectionRef, uuid), message)
                //console.log("Message before adding to firebase", message)
            })
        } catch (e: any) {
            console.log("Error creating test contacts", e)
        }
    })

const updateActiveContactMessages = (messagesUpdateArray: messageType[]) => {
    return messagesUpdateArray.filter((message) => {
        const {sender, receiver} = message;
        return (sender[0] === mainUserUid && receiver[0] === otherUserUid)
    });
}

export const listenToMessagesForLoggedInUser = createAsyncThunk("message/listenToMessagesForLoggedInUser",
    async (arg, {getState}) => {
        const state: any = getState();
        const messagesQuery1 = query(collection(firebaseInstance.database, "messages"),
            where("receiver.uid", "==", mainUserUid));
        const messagesQuery2 = query(collection(firebaseInstance.database, "messages"),
            where("sender.uid", "==", mainUserUid));
        let updatesArray: any = [];
        try {
            const unsubscribe1 = onSnapshot(messagesQuery1, (querySnapshot) => {
                const messages = querySnapshot.docs.map((doc: any) => doc.data());
                updatesArray = [];
                updatesArray = updatesArray.concat(messages);
                console.log("Messages Updates1", updatesArray);
            });
            const unsubscribe2 = onSnapshot(messagesQuery2, (querySnapshot) => {
                const messages = querySnapshot.docs.map((doc: any) => doc.data());
                updatesArray = [];
                updatesArray = updatesArray.concat(messages);
                let testUpdatedMessage = updateActiveContactMessages(updatesArray);
                let newupdateMessagesArray = [...state.messageReducer.activeContactMessages, ...testUpdatedMessage];
                console.log("Messages Updates2", newupdateMessagesArray);
            });
        } catch (e: any) {
            console.log("Error listening to messages", e)
        }
    })

export const fetchAllActiveContactMessages = createAsyncThunk("message/fetchActiveContactMessages",
    async (arg, {getState}) => {
        const state: any = getState();
        const activeContact = state.contactReducer.activeContact;
        const activeContactMessages = state.contactReducer.keyPairContactsMessages;
        return Array.from(activeContactMessages.get(activeContact.uid));
    })

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        allActiveUserMessages: (state, action: PayloadAction<any>) => {
            state.activeContactMessages = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchAllActiveContactMessages.fulfilled, (state, action) => {
            // @ts-ignore
            state.activeContactMessages = action.payload
        })
    }
})


export const {allActiveUserMessages} = messageSlice.actions

export const selectActiveContactMessages = (state: RootState) => state.messageReducer.activeContactMessages


export default messageSlice.reducer