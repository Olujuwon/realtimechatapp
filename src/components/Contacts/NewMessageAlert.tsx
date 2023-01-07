import React, {useState} from 'react';
import {Avatar, Typography} from "antd";
import {useGetContactsMessagesKeyValueQuery} from "../../redux/appQueryV1";
import {messageType} from "../../types/Message/message";
import {_sortMessagesArray} from "../MessageComponent/util";
import {Badge} from "react-bootstrap";

const {Text} = Typography;

// @ts-ignore
const NewMessageAlert = ({contactUid}) => {
    // @ts-ignore
    const {data, error, isLoading} = useGetContactsMessagesKeyValueQuery();

    if (isLoading) return <Text></Text>
    if (error) return <Text></Text>
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
    const getNumberOfUnreadMessages = () => {
        // @ts-ignore
        const contactsMessagesData = data.get(contactUid) === undefined ? [] : data.get(contactUid);
        const messagesArray: messageType[] = Array.from(contactsMessagesData);
        if (messagesArray.length === 0) {
            return 0;
        } else {
            const sortedContactMessages = _sortMessagesArray(messagesArray);
            const unreadMessage = sortedContactMessages.filter(message => message.status === "unread");
            return unreadMessage.length;
        }
    }

    const unreadMessages = getNumberOfUnreadMessages();

    return (
        <>
            {unreadMessages > 0 ? <Badge bg="success" className="float-end">
                {unreadMessages}
            </Badge> : null}
        </>
    );
};

export default NewMessageAlert;