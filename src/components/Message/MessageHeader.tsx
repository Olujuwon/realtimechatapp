import React from 'react';

import {Phone, Video, Power} from "react-feather";
import {
    MessagesHeaderColumn,
    MessagesHeaderContainer,
    MessagesHeaderUtilities,
    HeaderProfileContainer,
    HeaderProfileImage,
    HeaderProfileEmail,
    HeaderButtons
} from "./Message.Styles";

import {userType} from "../../types/User/user";
import useManageAuthUser from "../../hooks/useManageAuthUser";

type IComponentProps = {
    user: userType
}

const MessageComponentHeader: React.FC<IComponentProps> = ({user}): JSX.Element => {
    const {handleLoggingOffAuthUser} = useManageAuthUser();
    const emailInitial = user.email.slice(0, 2).toUpperCase();
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
                    <HeaderButtons size="sm" variant="light">
                        <Phone className="feather" style={{width: "1rem"}}/>
                    </HeaderButtons>
                    <HeaderButtons size="sm" variant="light" className="">
                        <Video className="feather" style={{width: "1rem"}}/>
                    </HeaderButtons>
                    <HeaderButtons size="sm" variant="light">
                        <Power className="feather" style={{width: "1rem"}} onClick={()=>handleLoggingOffAuthUser()}/>
                    </HeaderButtons>
                </MessagesHeaderUtilities>
            </MessagesHeaderColumn>
        </MessagesHeaderContainer>
    );
}


export default MessageComponentHeader;