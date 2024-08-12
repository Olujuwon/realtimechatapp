import React, {useState} from 'react';

import {Smile} from "react-feather";
import {
    InputButtonContainer,
    InputContainer,
    StyledInput,
    EmojisButton,
    SendButton
} from './Message.Styles';

import {useSendNewMessageMutation} from "../../redux/appQueryV1";

import {uuidGenerator} from '../../utils/uuidGenerator';
import {userType} from "../../types/User/user";
import {messageType} from "../../types/Message/message";
import messageStatus from "../../utils/messageStatus.json";

interface IComponentProps {
    user: userType
}

const MessageComponentInput: React.FC<IComponentProps> = ({user}): JSX.Element => {
    const [message, setMessage] = useState<string>("");
    const [sendNewMessage] = useSendNewMessageMutation();
    const _handleOnInputChange = (messageFromInput: string) => {
        setMessage(messageFromInput);
    }
    const _handleComposeNewMessage = (messageToCompose: string) => {
        let _composedMessage = {} as messageType;
        _composedMessage.data = messageToCompose;
        _composedMessage.timeStamp = (new Date()).valueOf();
        _composedMessage.uid = uuidGenerator();
        _composedMessage.status = messageStatus["SENT"].value;
        _composedMessage.sender = [user.uid as string];
        _composedMessage.receiver = ["bot"];
        return _composedMessage;
    }

    const _handleSendMessage = async () => {
        const messageToSend = _handleComposeNewMessage(message) as messageType;
        if (user) {
            try {
                await sendNewMessage(messageToSend);
                setMessage("");
            } catch (e) {
                console.error("Message sending failed", e);
                alert("Message sending failed, please try again later");
            }
        } else {
            alert("Unexpected error occurred, please refresh your browser and try again later!");
        }
    }

    return (
        <>
            <InputContainer>
                <EmojisButton size="sm" variant="light">
                    <Smile className="feather" style={{width: "1rem"}}/>
                </EmojisButton>
                <InputButtonContainer>
                    <StyledInput type="text" placeholder="Type your message"
                                 onChange={(event: { target: { value: string; }; }) =>
                                     _handleOnInputChange(event.target.value)} value={message}/>
                    <SendButton variant="primary" onClick={_handleSendMessage}
                                disabled={message.length === 0}
                                style={{backgroundColor: "#3A5A40"}}>Send</SendButton>
                </InputButtonContainer>
            </InputContainer>
        </>
    );
}


export default MessageComponentInput;