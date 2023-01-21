import React, {useEffect} from 'react';
import MessageBubble from "./MessageBubble";
import {EmptyDiv, MessageBodyWrapper, MessageContainer} from "./Message.Styles";
import {Divider, Skeleton} from "antd";
import moment from "moment";
import {messageType} from "../../types/Message/message";
import {_sortMessagesArray} from "./util";
import {useAppSelector} from "../../hooks/reduxHooks";
import {selectActiveContact} from "../../redux/contactSlice";
import {mainUserUid} from "../../redux/userSlice";
import {useGetAllActiveContactMessageQuery,useListenForNewMessagesMutation} from "../../redux/appQueryV1";
import {contactType} from "../../types/Contact/contact";
import  useGetmessagesAndListenForNewMessages from "../../hooks/useGetmessagesAndListenForNewMessages"

type componentProps = {
    activeContact: contactType
}
const MessageComponentBody: React.FC<componentProps> = ({activeContact}): JSX.Element => {
    /*const activeContact = useAppSelector(selectActiveContact);*/
    console.log("BOdey messages1", activeContact);
    const {sentMessages, receivedMessages} =  useGetmessagesAndListenForNewMessages(activeContact);
    console.log("MESSAGES", [...sentMessages, ...receivedMessages])
    const {data, error, isLoading} = useGetAllActiveContactMessageQuery(activeContact);
    if (Object.keys(activeContact).length === 0) return <Skeleton/>
    if (data === undefined) return <Skeleton/>
    if (error) return <Skeleton/>
    const preProcessedMessages = _sortMessagesArray([...sentMessages, ...receivedMessages]);
    // @ts-ignore
    return (
        <div>
            {
                preProcessedMessages.length !== 0 ?
                    preProcessedMessages.splice(preProcessedMessages.length-11, preProcessedMessages.length-1).map((message: messageType, index: number) => {
                        // @ts-ignore
                        const {data, sender} = message;
                        const commentTypeValue = sender[0] === "bot" ? "to" : "from";
                        // @ts-ignore
                        return (
                            <div key={index + "_container"}
                                 className="overflow-scroll transparent px-5 w-100 h-auto d-flex flex-column">
                                <div key={++index} className="w-100 h-auto d-flex flex-column">
                                    <MessageBubble commentType={commentTypeValue} content={data}
                                                   key={--index} messagesTime={message.timeStamp} sender={sender[0]}/>
                                </div>
                            </div>
                        );
                    }) : <EmptyDiv></EmptyDiv>
            }
        </div>
    );
}

export default MessageComponentBody;