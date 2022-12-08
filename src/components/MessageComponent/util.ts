import {messageType} from "../../types/Message/message";
import moment from "moment/moment";

export const _transformMapToArray = (messagesMap: Map<String, Array<messageType>>) => {
    let transformedMessagesFromMapToArray: {}[] = [];
    messagesMap.forEach((value, key, map) => {
        // @ts-ignore
        transformedMessagesFromMapToArray.push({[key]: Array.from(value)});
    })
    // @ts-ignore
    return transformedMessagesFromMapToArray;
}

export const _transformSortedArrayToMap = (messages: Array<messageType>) => {
    const messagesMap = new Map();
    messages.forEach((message) => {
        const timePeriod = moment(message.timeStamp).format('L');
        if (messagesMap.has(timePeriod)) {
            messagesMap.get(timePeriod).push(message);
        } else {
            messagesMap.set(timePeriod, []);
            messagesMap.get(timePeriod).push(message);
        }
    })
    return messagesMap;
}

export const _sortMessagesArray = (messages: Array<messageType>) => {
    return [...messages].sort((a, b) => {
        if (a.timeStamp > b.timeStamp) {
            return 1;
        } else if (a.timeStamp < b.timeStamp) {
            return -1;
        } else {
            return 0;
        }
    })
}