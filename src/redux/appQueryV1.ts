import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import {collection, setDoc, doc, query, getDocs, where, addDoc, updateDoc, arrayUnion, onSnapshot} from "firebase/firestore";
import FirebaseInit from "../firebase/firebaseInit";
import {mainUserUid} from "./userSlice";
import {messageType} from "../types/Message/message";
import {transformContactsMessagesIntoKeyPair} from "./utils";
import {contactType} from "../types/Contact/contact";
import {SAMPLECONTACTS} from "../sampledata/contactsSampleData";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";

const firebaseInstance = FirebaseInit.getInstance();

export default interface userSigninType {
    email: string,
    password: string
}

// @ts-ignore
export const messagingAppApi = createApi({
    reducerPath: "messagingApi",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["contact", "message", "user"],
    endpoints: (build) => ({
        getAllContactsBelongingToUser: build.query({
            // @ts-ignore
            async queryFn() {
                try {
                    const contactsQueryRef = query(collection(firebaseInstance.database, "contacts"),
                        where("contacts", "array-contains", mainUserUid));
                    const querySnapshot = await getDocs(contactsQueryRef);
                    let allContacts: any = [];
                    querySnapshot.forEach((doc) => {
                        allContacts.push(doc.data());
                    });
                    return {data: allContacts};
                } catch (e: any) {
                    console.log("Error getting test contacts", e.message)
                    return {error: e.message}
                }
            }, providesTags: ["contact"]
        }),
        getContactsMessagesKeyValue: build.query({
            //TODO: Make Obsolete
            // @ts-ignore
            async queryFn() {
                let contactsArray: any = [];
                let messagesArray: any = [];
                const messagesQueryRef = query(collection(firebaseInstance.database, "messages"));
                const contactsQueryRef = query(collection(firebaseInstance.database, "contacts"),
                    where("contacts", "array-contains", mainUserUid));
                try {
                    const contactQuerySnapshot = await getDocs(contactsQueryRef);
                    const messageQuerySnapshot = await getDocs(messagesQueryRef);
                    messageQuerySnapshot.forEach(messageDoc => messagesArray.push(messageDoc.data()));
                    contactQuerySnapshot.forEach(contactDoc => contactsArray.push(contactDoc.data()));
                    let contactsMessagesKeyPair: Map<String, messageType[]> =
                        transformContactsMessagesIntoKeyPair(contactsArray, messagesArray);
                    return {data: contactsMessagesKeyPair};
                } catch (e: any) {
                    console.error("Failed to fetch and process contacts and messages")
                    //return {error: e.message}
                }
            }, providesTags: ["contact"]
        }),
        createNewContact: build.mutation({
            // @ts-ignore
            async queryFn(newContactObject) {
                try {
                    const contactRef = await addDoc(collection(firebaseInstance.database, "contacts"), newContactObject);
                    const mainContactRef = doc(firebaseInstance.database, "contacts", mainUserUid);
                    await updateDoc(mainContactRef, {contacts: arrayUnion(contactRef.id)});
                    return {id: contactRef.id};
                } catch (e: any) {
                    console.log(e.message);
                    return {error: e.message}
                }
            }, invalidatesTags: ["contact"]
        }),
        sendNewMessageToContact: build.mutation({
            // @ts-ignore
            async queryFn(messageToSend) {
                try {
                    const messagesCollectionRef = collection(firebaseInstance.database, "messages");
                    await setDoc(doc(messagesCollectionRef), messageToSend)
                    return {newMessage: messageToSend};
                } catch (e: any) {
                    console.log(e.message);
                    return {error: e.message}
                }
            }, invalidatesTags: ["message"]
        }),
        getAllActiveContactMessage: build.query({
            // @ts-ignore
            async queryFn(activeContact: contactType) {
                try {
                    let messagesArray: any = [];
                    const messagesQueryRef = query(collection(firebaseInstance.database, "messages"));
                    //TODO. lis
                    const messageQuerySnapshot = await getDocs(messagesQueryRef);
                    messageQuerySnapshot.forEach(messageDoc => messagesArray.push(messageDoc.data()));
                    const messagesToUse = messagesArray.filter((message: messageType) => message.sender.includes(activeContact.uid) || message.receiver.includes(activeContact.uid));
                    return {data: messagesToUse};
                    /*const messagesQueryRefReciever = query(collection(firebaseInstance.database, "messages"),
                        where("status", "==", "sent"));
                    const messageQuerySnapshot = await getDocs(messagesQueryRefReciever);
                    /!*const messagesQueryRefSender = query(collection(firebaseInstance.database, "messages"),
                        where("sender", "array-contains", activeContact.userUid));
                    const messageQuerySenderSnapshot = await getDocs(messagesQueryRefReciever);*!/
                    messageQuerySnapshot.forEach(messageDoc => messagesArray.push(messageDoc.data()));
                   /!* messageQuerySenderSnapshot.forEach(messageDoc => messagesArray.push(messageDoc.data()));*!/
                    return {data: messagesArray}*/
                } catch (e: any) {
                    console.log(e.message);
                    return {error: e.message}
                }
            }, providesTags: ["message"]
        }),
        createTestContacts: build.mutation({
            // @ts-ignore
            async queryFn() {
                console.log("Hell")
                try {
                    const collectionRef = collection(firebaseInstance.database, "contacts");
                    SAMPLECONTACTS.map(async (value, index) => {
                        const uuid = value.uid;
                        // @ts-ignore
                        await setDoc(doc(collectionRef, uuid), value)
                    });
                    return {data: "OK"};
                } catch (e: any) {
                    console.log(e.message);
                    return {error: e.message}
                }
            }, invalidatesTags: ["contact"]
        }),
        signinUser: build.mutation({
            // @ts-ignore
            async queryFn(userDetails: userSigninType) {
                const {email, password} = userDetails;
                console.log("From Query", userDetails)
                try {
                    const user = await signInWithEmailAndPassword(firebaseInstance.auth, email, password);
                    return {data: user.user};
                } catch (e: any) {
                    console.log(e.message);
                    return {error: e.message}
                }
            },
            invalidatesTags: ["user"]
        }),
        signupUser: build.mutation({
            // @ts-ignore
            async queryFn(userDetails: userSigninType) {
                const collectionRef = collection(firebaseInstance.database, "contacts");
                const {email, password} = userDetails;
                console.log("From Query signup", userDetails)
                try {
                    const user = await createUserWithEmailAndPassword(firebaseInstance.auth, email, password);
                    await setDoc(doc(collectionRef, "uuid"), {})
                    return {data: user.user};
                } catch (e: any) {
                    console.log(e.message);
                    return {error: e.message}
                }
            },
            invalidatesTags: ["user"]
        }),
    })
});

export const {
    useGetAllContactsBelongingToUserQuery,
    useGetContactsMessagesKeyValueQuery,
    useCreateNewContactMutation,
    useSendNewMessageToContactMutation,
    useGetAllActiveContactMessageQuery,
    useCreateTestContactsMutation,
    useSigninUserMutation,
    useSignupUserMutation
} = messagingAppApi

export const {endpoints, reducerPath, reducer, middleware} = messagingAppApi
