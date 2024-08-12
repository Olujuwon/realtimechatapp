import React from 'react';

import {
    MessagesBubbleBody, MessagesBubbleBodyII,
    MessagesBubbleFooter, MessagesBubbleBodyHeader, StyledCommentReceiver, StyledCommentRow,
    StyledCommentSender, StyledMessageContentSpan, StyledMessageTime
} from './Message.Styles';

import {userType} from '../../types/User/user';
import moment from "moment";
import useEncryptionOperations from "../../hooks/useEncryptionOperations";

type IComponentProps = {
    commentType: string,
    content: string,
    messagesTime: any,
    sender: string,
    user: userType,
}

const MessageBubble = ({
                           commentType,
                           content,
                           messagesTime,
                           sender,
                           user,
                       }: IComponentProps): JSX.Element => {
    const now = moment();
    // @ts-ignore
    messagesTime = moment(new Date(messagesTime));
    const {handleDecryptData} = useEncryptionOperations();
    const senderName = user.email;
    const recipientName = "Artificial Intelligence";
    // @ts-ignore
    const SECRET_KEY: string = process.env.REACT_APP_APP_ID;
    const WhichBubble = () => {
        if (commentType === "to") {
            return (
                <StyledCommentReceiver>
                    <MessagesBubbleBodyHeader>
                        {recipientName}
                    </MessagesBubbleBodyHeader>
                    <StyledCommentRow>
                        <MessagesBubbleBody><StyledMessageContentSpan>{handleDecryptData({
                            cipherText: content,
                            secret: SECRET_KEY
                        })}</StyledMessageContentSpan></MessagesBubbleBody>
                    </StyledCommentRow>
                    <MessagesBubbleFooter>
                        <StyledMessageTime>{messagesTime.from(now)}</StyledMessageTime>
                    </MessagesBubbleFooter>
                </StyledCommentReceiver>
            );
        } else {
            return (
                <StyledCommentSender>
                    <MessagesBubbleBodyHeader>
                        {senderName}
                    </MessagesBubbleBodyHeader>
                    <StyledCommentRow>
                        <MessagesBubbleBodyII><StyledMessageContentSpan>{handleDecryptData({
                            cipherText: content,
                            secret: SECRET_KEY
                        })}</StyledMessageContentSpan></MessagesBubbleBodyII>
                    </StyledCommentRow>
                    <MessagesBubbleFooter>
                        <StyledMessageTime>{messagesTime.from(now)}</StyledMessageTime>
                    </MessagesBubbleFooter>
                </StyledCommentSender>
            )
        }
    }
    return <WhichBubble/>;
}

export default MessageBubble;