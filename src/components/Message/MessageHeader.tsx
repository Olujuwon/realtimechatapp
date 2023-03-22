import React from 'react';

import {Button, Card} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {Phone, Video, MoreHorizontal} from "react-feather";

import {userType} from "../../types/User/user";
import {faker} from '@faker-js/faker';

import {
    MessagesHeaderColumn,
    MessagesHeaderContainer,
    MessagesHeaderUtilities,
    HeaderProfileContainer,
    HeaderProfileImage,
    HeaderProfileEmail,
    HeaderButtons
} from "./Message.Styles";


type IComponentProps = {
    user: userType
}

const MessageComponentHeader: React.FC<IComponentProps> = ({user}): JSX.Element => {
    const emailInitial = user.email.slice(0,2).toUpperCase();
    const avatarUrl = `https://dummyimage.com/500x500/487eb0/fff.jpg&text=${emailInitial}`;
    return (
        <MessagesHeaderContainer>
            <MessagesHeaderColumn sm md lg xl xxl>
                <HeaderProfileContainer>
                    <HeaderProfileImage
                        src={avatarUrl}
                        className="rounded-circle"
                        alt={user.uid}
                    />
                    <HeaderProfileEmail>{user.email}</HeaderProfileEmail>
                </HeaderProfileContainer>
            </MessagesHeaderColumn>
            <MessagesHeaderColumn sm md lg xl xxl>
                <MessagesHeaderUtilities>
                    <HeaderButtons size="sm" variant="primary" className="header-buttons">
                        <Phone className="feather"/>
                    </HeaderButtons>
                    <HeaderButtons
                        size="sm"
                        variant="primary"
                        className=""
                    >
                        <Video className="feather"/>
                    </HeaderButtons>
                    <HeaderButtons size="sm" variant="light" className="border">
                        <MoreHorizontal className="feather"/>
                    </HeaderButtons>
                </MessagesHeaderUtilities>
            </MessagesHeaderColumn>
        </MessagesHeaderContainer>
    );
}


export default MessageComponentHeader;