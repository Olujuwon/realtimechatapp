import {messageType} from "../types/Message/message";
import {userType} from "../types/User/user";

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
