import React, {useEffect, useState} from 'react';

import {Button, Form, InputGroup} from 'react-bootstrap';
import {Smile} from "react-feather";
import styled from "styled-components";

import {contactType} from "../../types/Contact/contact";
import {messageType} from "../../types/Message/message";

import {useAppSelector} from "../../hooks/reduxHooks";
import {selectActiveContact} from "../../redux/contactSlice";
import {useSendNewMessageToContactMutation} from "../../redux/appQueryV1";
import messageStatus from "../../utils/messageStatus.json";
import {InputButtonContainer, InputContainer, StyledInput} from './Message.Styles';

const MessageComponentInput = (): JSX.Element => {

    const [message, setMessage] = useState<string>("");
    const activeContact: contactType = useAppSelector(selectActiveContact);
    const [sendNewMessageToContact] = useSendNewMessageToContactMutation();

    const _handleOnInputChange = (messageFromInput: string) => {
        setMessage(messageFromInput);
    }

    const _handleComposeNewMessage = (messageToCompose: string) => {
        let _composedMessage = {} as messageType;
        _composedMessage.data = messageToCompose;
        _composedMessage.timeStamp = (new Date()).valueOf();
        _composedMessage.uid = "";
        _composedMessage.status = messageStatus["SENT"].value;
        _composedMessage.sender = [activeContact.uid];
        _composedMessage.receiver = ["bot"];
        return _composedMessage;
    }

    const _handleSendMessage = async () => {
        const messageToSend = _handleComposeNewMessage(message) as messageType;
        if (activeContact) {
            try {
                await sendNewMessageToContact(messageToSend);
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
            {Object.keys(activeContact).length === 0 ? null :
                <>
                    <InputContainer>
                        <Button size="sm" variant="primary" className="px-3 me-2">
                            <Smile className="feather"/>
                        </Button>
                        <InputButtonContainer>
                            <StyledInput type="text" placeholder="Type your message"
                                         onChange={(event: { target: { value: string; }; }) =>
                                             _handleOnInputChange(event.target.value)} value={message}/>
                            <Button variant="primary" onClick={_handleSendMessage}
                                    disabled={message.length === 0}
                                    onKeyPress={event => event.key === "Enter" && _handleSendMessage}>Send</Button>
                        </InputButtonContainer>
                    </InputContainer>
                </>}
        </>
    );
}


export default MessageComponentInput;