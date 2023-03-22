import {useEffect, useState, useCallback} from "react";

import {userType} from "../types/User/user";
import {messageType} from "../types/Message/message";
import FirebaseInit from "../firebase/firebaseInit";

import {
    collection,
    setDoc,
    doc,
    query,
    getDocs,
    where,
    addDoc,
    updateDoc,
    arrayUnion,
    onSnapshot
} from "firebase/firestore";

const firebaseInstance = FirebaseInit.getInstance();
const useGetmessagesAndListenForNewMessages = (user: userType) => {
    const [sentMessages, setSentMessages] = useState<Array<messageType>>([]);
    const [receivedMessages, setReceivedMessages] = useState<Array<messageType>>([]);
    useEffect(() => {
        if (!user) {
            return;
        } else {
            const collectionRef = collection(firebaseInstance.database, "messages");
            const querySenderField = query(collectionRef, where("sender", "array-contains", user.uid));
            const queryRecieverField = query(collectionRef, where("receiver", "array-contains", user.uid));
            const unsub = onSnapshot(querySenderField, (querySnapshot) => {
                let prevMessages: Array<messageType> = [];
                querySnapshot.forEach((message) => {
                    const latestMessage: messageType = message.data() as messageType;
                    prevMessages.push(latestMessage);
                })
                setSentMessages(prevMessages);
            });
            const unsub2 = onSnapshot(queryRecieverField, (querySnapshot) => {
                let prevMessages: Array<messageType> = [];
                querySnapshot.forEach((message) => {
                    const latestMessage: messageType = message.data() as messageType;
                    prevMessages.push(latestMessage);
                })
                setReceivedMessages(prevMessages);
            });
        }

    }, [user])

    return {sentMessages, receivedMessages}
}

export default useGetmessagesAndListenForNewMessages;
