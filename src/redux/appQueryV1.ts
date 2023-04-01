import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    collection,
    setDoc,
    doc,
    query,
    getDocs,
    where,
    onSnapshot
} from "firebase/firestore";
import FirebaseInit from "../firebase/firebaseInit";
import {messageType} from "../types/Message/message";
import {userType} from "../types/User/user";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import * as cryptoJs from 'crypto-js';

const firebaseInstance = FirebaseInit.getInstance();

export default interface userSigninType {
    email: string,
    password: string
}

export default interface userSignupType {
    email: string,
    password: string
    firstname: string,
    lastname: string,
    phoneNumber: string
}

// @ts-ignore
export const messagingAppApi = createApi({
    reducerPath: "messagingApi",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["message", "user"],
    endpoints: (build) => ({
        sendNewMessage: build.mutation({
            // @ts-ignore
            async queryFn(messageToSend) {
                try {
                    const messagesCollectionRef = collection(firebaseInstance.database, "messages");
                    messageToSend.data = cryptoJs.AES.encrypt(JSON.stringify(messageToSend.data), process.env.REACT_APP_APP_ID as string).toString();
                    await setDoc(doc(messagesCollectionRef, messageToSend.uid), messageToSend);
                    return {newMessage: messageToSend};
                } catch (e: any) {
                    return {error: e.message}
                }
            }, invalidatesTags: ["message"]
        }),
        getAllActiveUserMessage: build.query({
            // @ts-ignore
            async queryFn(activeContact: userType) {
                try {
                    let messagesArray: any = [];
                    const messagesQueryRef = query(collection(firebaseInstance.database, "messages"));
                    const messageQuerySnapshot = await getDocs(messagesQueryRef);
                    messageQuerySnapshot.forEach(messageDoc => messagesArray.push(messageDoc.data()));
                    const messagesToUse = messagesArray.filter((message: messageType) => (message.sender[0] === activeContact.uid) || (message.receiver[0] === activeContact.uid));
                    return {data: messagesToUse};
                } catch (e: any) {
                    return {error: e.message}
                }
            }, providesTags: ["message"]
        }),
        signinUser: build.mutation({
            // @ts-ignore
            async queryFn(userDetails: userSigninType) {
                const {email, password} = userDetails;
                try {
                    const user = await signInWithEmailAndPassword(firebaseInstance.auth, email, password);
                    return {data: user.user};
                } catch (e: any) {
                    return {error: e.message}
                }
            },
            invalidatesTags: ["user"]
        }),
        signupUser: build.mutation({
            // @ts-ignore
            async queryFn(userDetails: userSignUpType) {
                const {email, password} = userDetails;
                delete userDetails.password;
                console.log("From Query signup", userDetails)
                try {
                    await createUserWithEmailAndPassword(firebaseInstance.auth, email, password);
                    return {data: "New user registered successfully"};
                } catch (e: any) {
                    return {error: e.message}
                }
            },
            invalidatesTags: ["user"]
        }),
        listenForNewMessages: build.mutation({
            // @ts-ignore
            async queryFn(user: userType) {
                const collectionRef = collection(firebaseInstance.database, "messages");
                const q = query(collectionRef, where("sender", "array-contains", user.uid));
                const q2 = query(collectionRef, where("receiver", "array-contains", user.uid));
                let latestMessages: Array<messageType> = [];
                try {
                    onSnapshot(q, (querySnapshot) => {
                        querySnapshot.forEach((message) => {
                            console.log("Latest messages000", message.data())
                            latestMessages.push(message.data() as messageType)
                        })
                    });
                    onSnapshot(q2, (querySnapshot) => {
                        querySnapshot.forEach((message) => {
                            console.log("Latest messages001", message.data())
                            latestMessages.push(message.data() as messageType)
                        })
                    });
                } catch (e: any) {
                    return {error: e.message}
                }
            },
            invalidatesTags: ["message"]
        }),
    })
});

export const {
    useSendNewMessageMutation,
    useGetAllActiveUserMessageQuery,
    useSigninUserMutation,
    useSignupUserMutation,
    useListenForNewMessagesMutation,
} = messagingAppApi

// @ts-ignore
export const {endpoints, reducerPath, reducer, middleware} = messagingAppApi