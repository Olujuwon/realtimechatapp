import {useEffect, useState, useCallback} from "react";
import { contactType } from "../types/Contact/contact";
import { messageType } from "../types/Message/message";
import FirebaseInit from "../firebase/firebaseInit";
import {collection, setDoc, doc, query, getDocs, where, addDoc, updateDoc, arrayUnion, onSnapshot} from "firebase/firestore";
const firebaseInstance = FirebaseInit.getInstance();
const  useGetmessagesAndListenForNewMessages = (activeContact: contactType)=>{
    const [sentMessages, setSentMessages] = useState<Array<messageType>>([]);
    const [receivedMessages, setReceivedMessages] = useState<Array<messageType>>([]);
    useEffect(()=>{
        const collectionRef = collection(firebaseInstance.database, "messages");
        const q = query(collectionRef, where("sender", "array-contains", activeContact.uid));
        const q2 = query(collectionRef, where("receiver", "array-contains", activeContact.uid));
        const unsub = onSnapshot(q, (querySnapshot)=>{
            let prevMessages: Array<messageType> = [];
            querySnapshot.forEach((message)=>{
                const latestMessage: messageType = message.data() as messageType;
                prevMessages.push(latestMessage);
            })
            setSentMessages(prevMessages);
        });
        const unsub2 = onSnapshot(q2, (querySnapshot)=>{
            let prevMessages: Array<messageType> = [];
            querySnapshot.forEach((message)=>{
                const latestMessage: messageType = message.data() as messageType;
                prevMessages.push(latestMessage);
            })
            setReceivedMessages(prevMessages);
        });
    }, [activeContact])

    return{sentMessages, receivedMessages}
}

export default useGetmessagesAndListenForNewMessages;
