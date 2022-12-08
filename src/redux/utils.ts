import {messageType} from "../types/Message/message";
import {contactType} from "../types/Contact/contact";
import {mainUserUid} from "./userSlice";

export function removeDuplicateFromArray(arrayToCheck: messageType[]) {
    let seen = new Set();
    return arrayToCheck.filter((message, index) => {
        let k = message.uid;
        return seen.has(k) ? false : seen.add(k);
    });
}

export function replacer(key: any, value: any) {
    if(value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else {
        return value;
    }
}

export function reviver(key:any, value:any) {
    if(typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

export function transformContactsMessagesIntoKeyPair(contactsArrayToTransform: Array<contactType>, messagesArrayToTransform: Array<messageType>) {
    let newContactsMessagesPair = new Map<String, messageType[]>();
    contactsArrayToTransform.map(async (item, index) => {
        let messagesArray: any = [];
        messagesArrayToTransform.forEach(message => {
            const {sender, receiver} = message;
            if (sender[0] === item.uid && receiver[0] === mainUserUid) {
                messagesArray.push(message);
            } else if (sender[0] === mainUserUid && receiver[0] === item.uid) {
                messagesArray.push(message);
            }else{
                return;
            }
        });
        let uniqueMessages = removeDuplicateFromArray(messagesArray);
        newContactsMessagesPair.set(item.uid, uniqueMessages);
    });
    return newContactsMessagesPair;
}