import React, {useEffect} from 'react';
import MessageBubble from "./MessageBubble";
import {
    EmptyDiv,
    MessageBodyWrapper,
    MessagesBodyRow,
    MessagesContainer
} from "./Message.Styles";
import moment from "moment";
import {messageType} from "../../types/Message/message";
import {_sortMessagesArray} from "./util";
import {useAppSelector} from "../../hooks/reduxHooks";
import {userType} from "../../types/User/user";
import useGetmessagesAndListenForNewMessages
    from "../../hooks/useGetmessagesAndListenForNewMessages"
import InfiniteScroll from 'react-infinite-scroll-component';

type IComponentProps = {
    user: userType
}
const MessageComponentBody: React.FC<IComponentProps> = ({user}): JSX.Element => {
    const {sentMessages, receivedMessages} = useGetmessagesAndListenForNewMessages(user);
    const preProcessedMessages = _sortMessagesArray([...sentMessages, ...receivedMessages]);
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
                                               key={"__bubble__" + index} messagesTime={message.timeStamp}
                                               sender={sender[0]} user={user}/>
                            </MessagesContainer>
                        );
                    }) : <EmptyDiv></EmptyDiv>
            }
        </MessageBodyWrapper>
    );
}

export default MessageComponentBody;