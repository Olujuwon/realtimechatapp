import React from 'react';
import {useGetContactsMessagesKeyValueQuery} from "../../redux/appQueryV1";
import {messageType} from "../../types/Message/message";
import moment from "moment";
import {_sortMessagesArray} from "../MessageComponent/util";


// @ts-ignore
const LatestContactMessageTime = ({contactUid})=>{
    // @ts-ignore
    const {data, error, isLoading} = useGetContactsMessagesKeyValueQuery();

    if (isLoading) return <h6></h6>
    if (error) return <h6></h6>
    const sortMessagesArray = (messages: Array<messageType>) => {
        return messages.sort((a, b) => {
            if (a.timeStamp > b.timeStamp) {
                return 1;
            } else if (a.timeStamp < b.timeStamp) {
                return -1;
            } else {
                return 0;
            }
        })
    }
    const getContactLastMessageTime = ()=>{
        const contactsMessagesData = data.get(contactUid) === undefined ? [] : data.get(contactUid);
        const messagesArray: messageType[] = Array.from(contactsMessagesData);
        if ( messagesArray.length === 0 ){
            return null;
        }else{
            const sortedContactMessages = _sortMessagesArray(messagesArray);
            const contactMessageData = (sortedContactMessages[sortedContactMessages.length-1]).timeStamp;
            return moment(contactMessageData).format("LT");
        }
    }
    return<h6 style={{fontSize:8, fontWeight:700, alignSelf: "end", marginRight: "5px"}}>{getContactLastMessageTime()}</h6>
};

export default LatestContactMessageTime;