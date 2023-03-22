import React, {useEffect} from 'react';
import styled from "styled-components";

import MessageComponentHeader from "./MessageHeader";
import MessageComponentBody from "./MessageBody";
import MessageComponentInput from "./MessageInput";
import {Col, Row, Card} from "react-bootstrap";

import {userType} from '../../types/User/user';

import {
    MessagesIndexBody,
    MessagesIndexContainer,
    MessagesIndexFooter,
    MessagesIndexHeader
} from './Message.Styles';

interface IComponentProps {
    user: userType
}

const MessageComponent: React.FC<IComponentProps> = ({user}): JSX.Element => {
    return (
        <MessagesIndexContainer>
            <MessagesIndexHeader>
                <MessageComponentHeader user={user}/>
            </MessagesIndexHeader>
            <MessagesIndexBody>
                <MessageComponentBody user={user}/>
            </MessagesIndexBody>
            <MessagesIndexFooter>
                <MessageComponentInput user={user}/>
            </MessagesIndexFooter>
        </MessagesIndexContainer>
    );
}

export default MessageComponent;