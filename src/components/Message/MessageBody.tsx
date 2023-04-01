import React, {useEffect, useRef} from 'react';

import MessageBubble from "./MessageBubble";
import {EmptyDiv, MessageBodyWrapper, MessagesContainer} from "./Message.Styles";

import {_sortMessagesArray} from "./util";

import useGetmessagesAndListenForNewMessages
    from "../../hooks/useGetmessagesAndListenForNewMessages"

import {messageType} from "../../types/Message/message";
import {userType} from "../../types/User/user";

type IComponentProps = {
    user: userType
}
const MessageComponentBody: React.FC<IComponentProps> = ({user}): JSX.Element => {
    const {sentMessages, receivedMessages} = useGetmessagesAndListenForNewMessages(user);
    const preProcessedMessages = _sortMessagesArray([...sentMessages, ...receivedMessages]);
    const scrollToBottomContainerRef = useRef(null);
    const scrollToBottom = () => {
        // @ts-ignore
        scrollToBottomContainerRef.current?.scrollIntoView({behavior: "smooth"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [sentMessages, receivedMessages])

    /*Note: Testing InfiniteScroll component here*/
    return (
        <MessageBodyWrapper
            dataLength={preProcessedMessages.length}
            next={() => null}
            hasMore={false}
            loader={null}
            endMessage={null}
            refreshFunction={() => null}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            inverse={true}>
            {
                preProcessedMessages.length !== 0 ?
                    preProcessedMessages.map((message: messageType, index: number) => {
                        // @ts-ignore
                        const {data, sender} = message;
                        const commentTypeValue = sender[0] === "bot" ? "to" : "from";
                        // @ts-ignore
                        return (
                            <MessagesContainer key={index + "_container_row_"}>
                                <MessageBubble commentType={commentTypeValue} content={data}
                                               key={"__bubble__" + index}
                                               messagesTime={message.timeStamp}
                                               sender={sender[0]} user={user}/>
                            </MessagesContainer>
                        );
                    }) : <EmptyDiv></EmptyDiv>
            }
            <div ref={scrollToBottomContainerRef}/>
        </MessageBodyWrapper>
    );
}

export default MessageComponentBody;