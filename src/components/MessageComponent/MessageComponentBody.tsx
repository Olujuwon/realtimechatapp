import React from 'react';
import MessageBubble from "./MessageBubble";
import {EmptyDiv, MessageBodyWrapper, MessageContainer} from "./Message.Styles";
import {Divider, Skeleton} from "antd";
import moment from "moment";
import {messageType} from "../../types/Message/message";
import {_sortMessagesArray} from "./util";
import {useAppSelector} from "../../hooks/reduxHooks";
import {selectActiveContact} from "../../redux/contactSlice";
import {mainUserUid} from "../../redux/userSlice";
import {useGetAllActiveContactMessageQuery} from "../../redux/appQueryV1";


const MessageComponentBody = (): JSX.Element => {
    const activeContact = useAppSelector(selectActiveContact);
    const {data, error, isLoading} = useGetAllActiveContactMessageQuery(activeContact);
    if (Object.keys(activeContact).length === 0) return <Skeleton/>
    if (data === undefined) return <Skeleton/>
    if (error) return <Skeleton/>
    const preProcessedMessages = !data ? [] : _sortMessagesArray(data);
    // @ts-ignore
    return (
        <MessageBodyWrapper>
            {
                preProcessedMessages.length !== 0 ?
                    preProcessedMessages.map((message: messageType, index: number) => {
                        let now = moment();
                        // @ts-ignore
                        let messagesTime = moment(new Date(message.timeStamp));
                        const {data, sender} = message;
                        const commentTypeValue = sender[0] === mainUserUid ? "from" : "to";
                        return (
                            <div key={index + "_container"}>
                                <Divider
                                    key={index}>{moment(now).isSame(messagesTime, "day") ? "Today" :
                                    messagesTime.from(now)}</Divider>
                                <MessageContainer key={++index}>
                                    <MessageBubble commentType={commentTypeValue} content={data}
                                                   key={--index}/>
                                </MessageContainer>
                            </div>
                        );
                    }) : <EmptyDiv></EmptyDiv>
            }
        </MessageBodyWrapper>
    );
}

export default MessageComponentBody;